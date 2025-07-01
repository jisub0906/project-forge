#!/usr/bin/env tsx

/**
 * 현재 프로젝트 스키마 초기화 스크립트
 * 
 * 사용법: pnpm run schema:init
 */

import { migrationUtils } from '../src/lib/migrations';
import { env } from '../src/lib/env';

async function main() {
  console.log('🏗️  현재 프로젝트 스키마 초기화 중...');
  console.log(`📋 스키마명: ${env.NEXT_PUBLIC_SUPABASE_SCHEMA}`);
  
  try {
    const result = await migrationUtils.initializeCurrentSchema();
    
    if (result.success) {
      console.log('✅', result.message);
      console.log('🎉 스키마 초기화가 완료되었습니다!');
    } else {
      console.error('❌', result.message);
      if (result.error) {
        console.error('세부 오류:', result.error);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 스키마 초기화 중 오류 발생:', error);
    process.exit(1);
  }
}

main();