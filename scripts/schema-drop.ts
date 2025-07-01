#!/usr/bin/env tsx

/**
 * 커스텀 스키마 삭제 가이드 스크립트 (2025 완벽 버전)
 * 
 * 사용법: pnpm run schema:drop my_project [--help]
 * 
 * ⚠️  주의: 스키마 삭제는 되돌릴 수 없습니다!
 * Supabase 보안 정책으로 인해 스키마 삭제는 수동으로 진행됩니다.
 */
import 'dotenv/config' 
import { migrationUtils } from '../src/lib/migrations';
import { env } from '../src/lib/env';
import readline from 'node:readline';

function color(msg: string, code: string) {
  return `\x1b[${code}m${msg}\x1b[0m`;
}
const red = (msg: string) => color(msg, '31');
const green = (msg: string) => color(msg, '32');
const yellow = (msg: string) => color(msg, '33');
const cyan = (msg: string) => color(msg, '36');
const blue = (msg: string) => color(msg, '34');
const magenta = (msg: string) => color(msg, '35');

const args = process.argv.slice(2);
let schema = args.find(arg => !arg.startsWith('--'));
const help = args.includes('--help');

function printHelp() {
  console.log(cyan(`
🗑️  커스텀 스키마 삭제 가이드
----------------------------
사용법: pnpm run schema:drop <스키마명>
예시:  pnpm run schema:drop old_project

⚠️  경고: 스키마 삭제는 되돌릴 수 없습니다!
📋 이 스크립트는 Supabase Dashboard에서 수행할 작업을 안내합니다.
   (보안상 스키마 삭제는 수동으로만 가능합니다)

옵션:
  --help    : 사용법 출력
`));
}

async function confirm(question: string): Promise<boolean> {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, answer => {
      rl.close();
      resolve(/^y(es)?$/i.test(answer.trim()));
    });
  });
}

async function main() {
  if (help) return printHelp();
  
  if (!schema) {
    console.error(red('❌ 스키마명을 입력하세요.'));
    console.log(cyan('📖 사용법: pnpm run schema:drop my_project'));
    console.log(cyan('📖 예시:   pnpm run schema:drop old_project'));
    process.exit(1);
  }
  
  schema = schema.trim().toLowerCase();
  
  // 보호된 스키마 확인
  const protectedSchemas = ['public', 'auth', 'storage', 'postgres', 'information_schema'];
  if (protectedSchemas.includes(schema)) {
    console.error(red(`❌ '${schema}' 스키마는 시스템 스키마로 삭제할 수 없습니다.`));
    console.log(yellow('🔒 보호된 스키마: public, auth, storage, postgres, information_schema'));
    process.exit(1);
  }
  
  // 현재 사용 중인 스키마 확인
  const currentSchema = env.NEXT_PUBLIC_SUPABASE_SCHEMA.trim().toLowerCase();
  if (schema === currentSchema) {
    console.error(red(`❌ '${schema}' 스키마는 현재 사용 중입니다.`));
    console.log(yellow('💡 다른 스키마로 변경한 후 삭제하세요:'));
    console.log(cyan('   1. .env.local에서 NEXT_PUBLIC_SUPABASE_SCHEMA 변경'));
    console.log(cyan('   2. 개발 서버 재시작: pnpm dev'));
    console.log(cyan('   3. 다시 삭제 시도'));
    process.exit(1);
  }
  
  console.log(magenta(`🗑️  [${red(schema)}] 스키마 삭제 가이드`));
  console.log('━'.repeat(50));
  
  try {
    // 1. 스키마 존재 여부 확인
    console.log(yellow('🔍 스키마 존재 여부 확인 중...'));
    const exists = await migrationUtils.schemaExists(schema);
    
    if (!exists) {
      console.log(yellow(`⚠️  스키마 '${schema}'가 존재하지 않습니다.`));
      console.log(cyan('💡 사용 가능한 스키마 목록을 확인하세요:'));
      console.log(cyan('   pnpm run schema:list'));
      process.exit(0);
    }
    
    console.log(green('✅ 스키마 발견됨'));
    
    // 2. 스키마 내 테이블 확인
    console.log(yellow('📋 스키마 내 테이블 확인 중...'));
    const tables = await migrationUtils.listTablesInSchema(schema);
    
    if (tables.length > 0) {
      console.log(red(`⚠️  삭제될 테이블: ${tables.join(', ')}`));
    } else {
      console.log(green('✅ 테이블이 없거나 접근할 수 없음'));
    }
    
    // 3. 최종 확인
    console.log('\n' + red('🚨 최종 경고:'));
    console.log(red(`   스키마 '${schema}'와 모든 데이터가 영구 삭제됩니다!`));
    console.log(red('   이 작업은 되돌릴 수 없습니다!'));
    
    const confirmed = await confirm(yellow('\n정말로 삭제하시겠습니까? (y/N): '));
    
    if (!confirmed) {
      console.log(green('✅ 삭제가 취소되었습니다.'));
      process.exit(0);
    }
    
    // 4. 수동 삭제 가이드 제공
    console.log('\n' + yellow('📋 다음 단계를 따라 주세요:'));
    console.log('━'.repeat(30));
    
    console.log(cyan('\n1. Supabase Dashboard 열기'));
    console.log('   🌐 https://supabase.com/dashboard');
    console.log('   📂 프로젝트 선택');
    
    console.log(cyan('\n2. SQL Editor로 이동'));
    console.log('   📝 좌측 메뉴 → SQL Editor 클릭');
    
    console.log(cyan('\n3. 스키마 삭제 SQL 실행'));
    console.log('   📋 다음 코드를 복사해서 실행하세요:');
    
    if (tables.length > 0) {
      console.log('\n' + blue('   -- 테이블별 삭제 (안전한 방법)'));
      for (const table of tables) {
        console.log(blue(`   DROP TABLE IF EXISTS "${schema}"."${table}" CASCADE;`));
      }
      console.log('\n' + blue('   -- 또는 스키마 전체 삭제 (빠른 방법)'));
    } else {
      console.log('\n' + blue('   -- 스키마 삭제'));
    }
    
    console.log(red(`   DROP SCHEMA IF EXISTS "${schema}" CASCADE;`));
    
    console.log(cyan('\n4. 환경변수 정리 (선택사항)'));
    console.log('   📝 .env.local에서 관련 설정 제거');
    
    console.log('\n' + green('🎉 완료되면 다음 명령으로 확인하세요:'));
    console.log(cyan('   pnpm run schema:list'));
    
    console.log('\n' + yellow('💡 팁:'));
    console.log('   • CASCADE 옵션은 관련된 모든 객체를 함께 삭제합니다');
    console.log('   • 테이블별 삭제는 더 안전하지만 시간이 오래 걸립니다');
    console.log('   • 삭제 전에 중요한 데이터는 백업하세요');
    
    process.exit(0);
  } catch (error) {
    console.error(red('❌ 스키마 삭제 가이드 중 오류 발생:'), error);
    process.exit(1);
  }
}

main(); 