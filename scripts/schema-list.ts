#!/usr/bin/env tsx

/**
 * 스키마 목록 조회 스크립트
 * 
 * 사용법: pnpm run schema:list
 */

import { migrationUtils } from '../src/lib/migrations';
import { env } from '../src/lib/env';

async function main() {
  console.log('📋 스키마 목록 조회 중...');
  
  try {
    const schemas = await migrationUtils.listCustomSchemas();
    
    console.log('\n🗄️  커스텀 스키마 목록:');
    
    if (schemas.length === 0) {
      console.log('   (커스텀 스키마가 없습니다)');
    } else {
      schemas.forEach((schema, index) => {
        const isCurrent = schema === env.NEXT_PUBLIC_SUPABASE_SCHEMA;
        const marker = isCurrent ? '👉' : '  ';
        const suffix = isCurrent ? ' (현재 프로젝트)' : '';
        console.log(`${marker} ${index + 1}. ${schema}${suffix}`);
      });
    }
    
    console.log(`\n📍 현재 프로젝트 스키마: ${env.NEXT_PUBLIC_SUPABASE_SCHEMA}`);
    console.log('✅ 스키마 목록 조회 완료');
  } catch (error) {
    console.error('❌ 스키마 목록 조회 중 오류 발생:', error);
    process.exit(1);
  }
}

main(); 