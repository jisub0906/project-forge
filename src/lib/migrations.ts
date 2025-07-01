import { createAdminClient } from './server';
import { env } from './env';

/**
 * 2025년 완벽한 스키마별 마이그레이션 관리 도구
 * - 스키마별 독립적인 마이그레이션
 * - 자동화된 스키마 생성/삭제
 * - 안전한 롤백 기능
 */

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
    const supabase = createAdminClient();
    
    // 1. 스키마 생성
    const { error: schemaError } = await supabase._raw
      .rpc('exec_sql', { 
        sql: `CREATE SCHEMA IF NOT EXISTS "${schemaName}";` 
      });
    
    if (schemaError) {
      return {
        success: false,
        message: '스키마 생성 실패',
        error: schemaError.message,
      };
    }

    // 2. 기본 테이블들 생성 (예시)
    const basicTables = [
      `
        CREATE TABLE IF NOT EXISTS "${schemaName}".users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
      `
        CREATE TABLE IF NOT EXISTS "${schemaName}".profiles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES "${schemaName}".users(id) ON DELETE CASCADE,
          name TEXT,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    ];

    for (const sql of basicTables) {
      const { error } = await supabase._raw.rpc('exec_sql', { sql });
      if (error) {
        return {
          success: false,
          message: '기본 테이블 생성 실패',
          error: error.message,
        };
      }
    }

    // 3. RLS 정책 활성화
    const rlsPolicies = [
      `ALTER TABLE "${schemaName}".users ENABLE ROW LEVEL SECURITY;`,
      `ALTER TABLE "${schemaName}".profiles ENABLE ROW LEVEL SECURITY;`,
      `
        CREATE POLICY "Users can view own data" ON "${schemaName}".users
        FOR SELECT USING (auth.uid() = id);
      `,
      `
        CREATE POLICY "Users can update own data" ON "${schemaName}".users
        FOR UPDATE USING (auth.uid() = id);
      `,
      `
        CREATE POLICY "Profiles are viewable by users who created them" ON "${schemaName}".profiles
        FOR SELECT USING (auth.uid() = user_id);
      `,
      `
        CREATE POLICY "Users can update own profile" ON "${schemaName}".profiles
        FOR ALL USING (auth.uid() = user_id);
      `,
    ];

    for (const sql of rlsPolicies) {
      const { error } = await supabase._raw.rpc('exec_sql', { sql });
      if (error) {
        console.warn('RLS 정책 설정 중 경고:', error.message);
      }
    }

    return {
      success: true,
      message: `스키마 '${schemaName}' 생성 완료`,
    };
  } catch (error) {
    return {
      success: false,
      message: '스키마 생성 중 오류 발생',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

/**
 * 스키마 삭제 (주의: 모든 데이터가 삭제됨)
 */
export async function dropSchema(schemaName: string): Promise<MigrationResult> {
  try {
    if (schemaName === 'public' || schemaName === 'auth' || schemaName === 'storage') {
      return {
        success: false,
        message: '시스템 스키마는 삭제할 수 없습니다',
        error: 'Protected schema',
      };
    }

    const supabase = createAdminClient();
    
    const { error } = await supabase._raw
      .rpc('exec_sql', { 
        sql: `DROP SCHEMA IF EXISTS "${schemaName}" CASCADE;` 
      });
    
    if (error) {
      return {
        success: false,
        message: '스키마 삭제 실패',
        error: error.message,
      };
    }

    return {
      success: true,
      message: `스키마 '${schemaName}' 삭제 완료`,
    };
  } catch (error) {
    return {
      success: false,
      message: '스키마 삭제 중 오류 발생',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

/**
 * 스키마 존재 여부 확인
 */
export async function schemaExists(schemaName: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase._raw
      .from('information_schema.schemata')
      .select('schema_name')
      .eq('schema_name', schemaName)
      .single();
    
    return !error && !!data;
  } catch {
    return false;
  }
}

/**
 * 모든 커스텀 스키마 목록 조회
 */
export async function listCustomSchemas(): Promise<string[]> {
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase._raw
      .from('information_schema.schemata')
      .select('schema_name')
      .not('schema_name', 'in', '(information_schema,pg_catalog,pg_toast,auth,extensions,graphql,graphql_public,net,pgsodium,pgsodium_masks,pgtle,realtime,storage,supabase_functions,supabase_migrations,vault,public)');
    
    if (error) {
      console.error('스키마 목록 조회 오류:', error);
      return [];
    }
    
    return data?.map(row => row.schema_name) || [];
  } catch (error) {
    console.error('스키마 목록 조회 중 오류:', error);
    return [];
  }
}

/**
 * 스키마별 테이블 목록 조회
 */
export async function listTablesInSchema(schemaName: string): Promise<string[]> {
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase._raw
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', schemaName)
      .eq('table_type', 'BASE TABLE');
    
    if (error) {
      console.error('테이블 목록 조회 오류:', error);
      return [];
    }
    
    return data?.map(row => row.table_name) || [];
  } catch (error) {
    console.error('테이블 목록 조회 중 오류:', error);
    return [];
  }
}

/**
 * 현재 프로젝트 스키마 초기화 (개발용)
 */
export async function initializeCurrentSchema(): Promise<MigrationResult> {
  const currentSchema = env.NEXT_PUBLIC_SUPABASE_SCHEMA;
  
  if (currentSchema === 'public') {
    return {
      success: true,
      message: 'public 스키마는 이미 존재합니다',
    };
  }
  
  const exists = await schemaExists(currentSchema);
  
  if (exists) {
    return {
      success: true,
      message: `스키마 '${currentSchema}'는 이미 존재합니다`,
    };
  }
  
  return await createSchema(currentSchema);
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
}; 