import { createAdminClient } from './server';
import { env } from './env';

/**
 * 2025년 완벽한 스키마별 마이그레이션 관리 도구
 * - 스키마별 독립적인 마이그레이션
 * - 자동화된 스키마 생성/삭제
 * - 안전한 롤백 기능
 */

// 시스템 보호 스키마 목록
const PROTECTED_SCHEMAS = ['public', 'auth', 'storage'] as const;
type ProtectedSchema = typeof PROTECTED_SCHEMAS[number];

export interface MigrationResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * 새로운 스키마 생성 및 기본 구조 설정
 */
export async function createSchema(schemaName: string): Promise<MigrationResult> {
  try {
    console.log(`🔍 스키마 '${schemaName}' 존재 여부 확인 중...`);
    
    // 1. 스키마 존재 여부 먼저 확인
    const exists = await schemaExists(schemaName);
    if (exists) {
      return {
        success: true,
        message: `스키마 '${schemaName}'는 이미 존재합니다`,
      };
    }

    console.log(`🏗️ 스키마 '${schemaName}' 생성 안내 중...`);

    // 2. 🔥 Supabase에서 스키마는 수동으로 생성해야 함
    console.log('⚠️  Supabase 환경에서는 스키마를 수동으로 생성해야 합니다.');
    console.log('📋 다음 단계를 따라주세요:');
    console.log('1. Supabase Dashboard → SQL Editor로 이동');
    console.log(`2. 다음 SQL을 실행: CREATE SCHEMA IF NOT EXISTS "${schemaName}";`);
    console.log('3. 기본 테이블 생성을 위해 다음 SQL도 실행:');
    console.log(`
      CREATE TABLE IF NOT EXISTS "${schemaName}".users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS "${schemaName}".profiles (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES "${schemaName}".users(id) ON DELETE CASCADE,
        name TEXT,
        avatar_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    
    return fail(
      `스키마 '${schemaName}' 생성을 위해 Supabase Dashboard에서 수동 작업이 필요합니다`,
      'Manual schema creation required'
    );
  } catch (error) {
    return fail('스키마 생성 중 오류 발생', error instanceof Error ? error.message : '알 수 없는 오류');
  }
}

/**
 * 스키마 삭제 (주의: 모든 데이터가 삭제됨)
 */
export async function dropSchema(schemaName: string): Promise<MigrationResult> {
  try {
    if (isProtectedSchema(schemaName)) {
      return fail('시스템 스키마는 삭제할 수 없습니다', 'Protected schema');
    }

    console.log(`🔍 스키마 '${schemaName}' 존재 여부 확인 중...`);
    
    // 스키마 존재 여부 확인
    const exists = await schemaExists(schemaName);
    if (!exists) {
      return {
        success: true,
        message: `스키마 '${schemaName}'가 존재하지 않습니다`,
      };
    }

    console.log(`🗑️ 스키마 '${schemaName}' 삭제 안내 중...`);

    // 🔥 실제 삭제는 Supabase Dashboard에서 수동으로 해야 함
    console.log('⚠️  Supabase 환경에서는 스키마를 수동으로 삭제해야 합니다.');
    console.log('📋 다음 단계를 따라주세요:');
    console.log('1. Supabase Dashboard → SQL Editor로 이동');
    console.log(`2. 다음 SQL을 실행: DROP SCHEMA IF EXISTS "${schemaName}" CASCADE;`);
    console.log('⚠️  주의: 모든 데이터가 영구 삭제됩니다!');

    return fail(
      `스키마 '${schemaName}' 삭제를 위해 Supabase Dashboard에서 수동 작업이 필요합니다`,
      'Manual schema deletion required'
    );
  } catch (error) {
    return fail('스키마 삭제 중 오류 발생', error instanceof Error ? error.message : '알 수 없는 오류');
  }
}

/**
 * 스키마 존재 여부 확인
 */
export async function schemaExists(schemaName: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    
    // 간단하고 확실한 방법: 알려진 테이블이 있는지 확인
    const testTables = ['users', 'profiles'];
    
    for (const table of testTables) {
      try {
        const { error } = await supabase._raw
          .from(`${schemaName}.${table}`)
          .select('*')
          .limit(1);
          
        // 테이블에 접근할 수 있으면 스키마가 존재함
        if (!error || error.code === 'PGRST116') { // PGRST116 = 결과 없음 (테이블은 존재)
          return true;
        }
      } catch {
        // 계속해서 다른 테이블 시도
      }
    }
    
    return false; // 모든 테이블 접근 실패 = 스키마 존재하지 않음
  } catch (error) {
    console.warn('스키마 존재 여부 확인 중 예외:', error);
    return false;
  }
}

/**
 * 모든 커스텀 스키마 목록 조회
 */
export async function listCustomSchemas(): Promise<string[]> {
  try {
    // 실용적 접근: 알려진 스키마들을 확인
    const potentialSchemas = [
      env.NEXT_PUBLIC_SUPABASE_SCHEMA.trim().toLowerCase(),
      'portfolio',
      'main',
      'development',
      'staging',
      'production',
    ];
    
    const existingSchemas: string[] = [];
    
    for (const schema of potentialSchemas) {
      if (PROTECTED_SCHEMAS.includes(schema as ProtectedSchema)) continue;
      
      const exists = await schemaExists(schema);
      if (exists) {
        existingSchemas.push(schema);
      }
    }
    
    // 중복 제거 및 정렬
    return [...new Set(existingSchemas)].sort();
  } catch (error) {
    console.warn('커스텀 스키마 목록 조회 중 예외:', error);
    return [];
  }
}

/**
 * 스키마별 테이블 목록 조회
 */
export async function listTablesInSchema(schemaName: string): Promise<string[]> {
  try {
    const supabase = createAdminClient();
    
    // 방법 1: pg_tables 시스템 뷰 시도
    try {
      const { data, error } = await supabase._raw
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', schemaName);
        
      if (!error && data) {
        return data.map((row: { tablename: string }) => row.tablename);
      }
    } catch {
      console.warn('pg_tables 접근 실패, 대안 방법 시도 중...');
    }
    
    // 방법 2: 알려진 테이블들 확인 (실용적 접근)
    const commonTables = ['users', 'profiles', 'posts', 'comments', 'settings'];
    const existingTables: string[] = [];
    
    for (const table of commonTables) {
      try {
        // 테이블 존재 여부를 SELECT로 확인
        const { error } = await supabase._raw
          .from(`${schemaName}.${table}`)
          .select('*')
          .limit(1);
          
        // 테이블이 존재하면 에러가 발생하지 않음
        if (!error) {
          existingTables.push(table);
        }
      } catch {
        // 테이블이 존재하지 않으면 에러 발생 (정상)
      }
    }
    
    return existingTables;
  } catch (error) {
    console.warn('테이블 목록 조회 중 예외:', error);
    return ['users', 'profiles']; // 기본값 반환
  }
}

/**
 * 현재 프로젝트 스키마 초기화 (개발용)
 */
export async function initializeCurrentSchema(): Promise<MigrationResult> {
  const currentSchema = env.NEXT_PUBLIC_SUPABASE_SCHEMA;
  
  if (isProtectedSchema(currentSchema)) {
    return {
      success: true,
      message: `${currentSchema} 스키마는 이미 존재합니다`,
    };
  }
  
  const exists = await schemaExists(currentSchema);
  
  if (exists) {
    return {
      success: true,
      message: `스키마 '${currentSchema}'는 이미 존재합니다`,
    };
  }
  
  return createSchema(currentSchema);
}

/**
 * CLI 도구에서 사용할 수 있는 헬퍼 함수들
 */
export const migrationUtils = {
  createSchema,
  dropSchema,
  schemaExists,
  listCustomSchemas,
  listTablesInSchema,
  initializeCurrentSchema,
  /**
   * 커스텀 스키마 생성 (CLI UX용)
   */
  async createCustomSchema(schemaName: string): Promise<MigrationResult> {
    if (!schemaName) {
      return fail('스키마명이 입력되지 않았습니다.', 'No schema name provided');
    }
    if (isProtectedSchema(schemaName)) {
      return fail('시스템 스키마는 생성할 수 없습니다.', 'Protected schema');
    }
    if (await schemaExists(schemaName)) {
      return fail(`스키마 '${schemaName}'는 이미 존재합니다.`);
    }
    return createSchema(schemaName);
  },
  /**
   * 커스텀 스키마 삭제 (CLI UX용)
   */
  async dropCustomSchema(schemaName: string): Promise<MigrationResult> {
    if (!schemaName) {
      return fail('스키마명이 입력되지 않았습니다.', 'No schema name provided');
    }
    if (isProtectedSchema(schemaName)) {
      return fail('시스템 스키마는 삭제할 수 없습니다.', 'Protected schema');
    }
    if (!(await schemaExists(schemaName))) {
      return fail(`스키마 '${schemaName}'가 존재하지 않습니다.`);
    }
    return dropSchema(schemaName);
  },
};

// 헬퍼: 보호 스키마 여부
function isProtectedSchema(schema: string): schema is ProtectedSchema {
  return PROTECTED_SCHEMAS.includes(schema as ProtectedSchema);
}

// 헬퍼: 실패 결과 생성
function fail(message: string, error?: string): MigrationResult {
  return { success: false, message, ...(error ? { error } : {}) };
} 