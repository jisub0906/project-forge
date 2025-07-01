#!/usr/bin/env tsx

/**
 * 스키마 목록 조회 스크립트 (100점 버전)
 * 
 * 사용법: pnpm run schema:list [--help]
 */
import 'dotenv/config' 
import { migrationUtils } from '../src/lib/migrations';
import { env } from '../src/lib/env';

function color(msg: string, code: string) {
  return `\x1b[${code}m${msg}\x1b[0m`;
}
const green = (msg: string) => color(msg, '32');
const yellow = (msg: string) => color(msg, '33');
const cyan = (msg: string) => color(msg, '36');

const args = process.argv.slice(2);
const help = args.includes('--help');

function printHelp() {
  console.log(cyan(`
스키마 목록 조회 스크립트
----------------------
사용법: pnpm run schema:list
옵션:
  --help    : 사용법 출력
`));
}

async function main() {
  if (help) return printHelp();
  
  console.log(cyan('📋 스키마 목록 조회 중...'));
  
  try {
    const currentSchemaName = env.NEXT_PUBLIC_SUPABASE_SCHEMA.trim().toLowerCase();
    
    // 현재 프로젝트 스키마 존재 여부 확인
    const currentSchemaExists = await migrationUtils.schemaExists(currentSchemaName);
    
    // 모든 커스텀 스키마 목록 조회
    const schemas = (await migrationUtils.listCustomSchemas()) ?? [];
    
    console.log('\n🗄️  커스텀 스키마 목록:');
    if (schemas.length === 0) {
      console.log(yellow('   (커스텀 스키마가 없습니다)'));
      if (!currentSchemaExists) {
        console.log(yellow('   💡 현재 프로젝트 스키마도 아직 생성되지 않았습니다.'));
        console.log(cyan('   👉 pnpm run schema:init 명령으로 초기화하세요.'));
      }
    } else {
      schemas.forEach((schema, index) => {
        const isCurrent = schema === currentSchemaName;
        const marker = isCurrent ? green('👉') : '  ';
        const suffix = isCurrent ? green(' (현재 프로젝트)') : '';
        console.log(`${marker} ${index + 1}. ${schema}${suffix}`);
      });
    }
    
    console.log(`\n📍 현재 프로젝트 설정:`);
    console.log(`   스키마명: ${green(currentSchemaName)}`);
    console.log(`   상태: ${currentSchemaExists ? green('✅ 존재함') : yellow('❌ 존재하지 않음')}`);
    
    if (!currentSchemaExists) {
      console.log(`\n💡 ${yellow('현재 프로젝트 스키마가 존재하지 않습니다.')}`);
      console.log(`   ${cyan('pnpm run schema:init')} 명령으로 초기화하세요.`);
    }
    
    console.log(green('\n✅ 스키마 목록 조회 완료'));
    process.exit(0);
  } catch (error) {
    console.error(yellow('❌ 스키마 목록 조회 중 오류 발생:'), error);
    process.exit(1);
  }
}

main(); 