#!/usr/bin/env tsx

/**
 * 스키마 상세 정보 조회 스크립트 (2025 완벽 버전)
 * 
 * 사용법: pnpm run schema:info [스키마명] [--help]
 * 
 * 스키마명을 지정하지 않으면 현재 프로젝트 스키마 정보를 조회합니다.
 */
import 'dotenv/config' 
import { migrationUtils } from '../src/lib/migrations';
import { env } from '../src/lib/env';

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
📋 스키마 상세 정보 조회 스크립트
------------------------------
사용법: pnpm run schema:info [스키마명]
예시:  pnpm run schema:info client_samsung
      pnpm run schema:info              # 현재 프로젝트 스키마

📋 제공 정보:
   • 스키마 존재 여부
   • 테이블 목록 및 구조
   • 현재 프로젝트와의 관계
   • 환경변수 설정 상태

옵션:
  --help    : 사용법 출력
`));
}

async function getTableRowCount(schemaName: string, tableName: string): Promise<number | null> {
  try {
    // 실제 구현에서는 Supabase 클라이언트를 사용하여 카운트 조회
    // 현재는 보안상 제한으로 null 반환
    return null;
  } catch {
    return null;
  }
}

async function main() {
  if (help) return printHelp();
  
  // 스키마명이 지정되지 않으면 현재 프로젝트 스키마 사용
  if (!schema) {
    schema = env.NEXT_PUBLIC_SUPABASE_SCHEMA.trim().toLowerCase();
    console.log(cyan(`📋 현재 프로젝트 스키마 정보 조회: ${green(schema)}`));
  } else {
    schema = schema.trim().toLowerCase();
    console.log(cyan(`📋 스키마 정보 조회: ${blue(schema)}`));
  }
  
  console.log('━'.repeat(50));
  
  try {
    const start = Date.now();
    
    // 1. 기본 정보
    console.log(yellow('🔍 기본 정보 확인 중...'));
    const exists = await migrationUtils.schemaExists(schema);
    const currentSchema = env.NEXT_PUBLIC_SUPABASE_SCHEMA.trim().toLowerCase();
    const isCurrentProject = schema === currentSchema;
    
    console.log(`\n📊 스키마 기본 정보:`);
    console.log(`   이름: ${blue(schema)}`);
    console.log(`   상태: ${exists ? green('✅ 존재함') : red('❌ 존재하지 않음')}`);
    console.log(`   현재 프로젝트: ${isCurrentProject ? green('✅ 현재 사용 중') : yellow('❌ 다른 스키마')}`);
    
    if (!exists) {
      console.log(`\n${red('⚠️  스키마가 존재하지 않습니다.')}`);
      console.log(`${cyan('💡 사용 가능한 스키마 목록을 확인하세요:')}`);
      console.log(`${cyan('   pnpm run schema:list')}`);
      console.log(`${cyan('💡 스키마를 생성하려면:')}`);
      console.log(`${cyan(`   pnpm run schema:create ${schema}`)}`);
      process.exit(0);
    }
    
    // 2. 테이블 정보
    console.log(yellow('\n📋 테이블 정보 확인 중...'));
    const tables = await migrationUtils.listTablesInSchema(schema);
    
    console.log(`\n🗄️  테이블 목록 (${tables.length}개):`);
    if (tables.length === 0) {
      console.log(yellow('   (테이블이 없거나 접근할 수 없습니다)'));
    } else {
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const rowCount = await getTableRowCount(schema, table);
        const countInfo = rowCount !== null ? ` (${rowCount}행)` : ' (행 수 확인 불가)';
        console.log(`   ${i + 1}. ${green(table)}${yellow(countInfo)}`);
      }
    }
    
    // 3. 환경변수 정보
    console.log(yellow('\n⚙️  환경변수 설정 확인 중...'));
    console.log(`\n🔧 환경변수 설정:`);
    console.log(`   NEXT_PUBLIC_SUPABASE_SCHEMA: ${green(currentSchema)}`);
    
    if (isCurrentProject) {
      console.log(`   ${green('✅ 현재 스키마와 환경변수가 일치합니다')}`);
    } else {
      console.log(`   ${yellow('⚠️  현재 조회 중인 스키마와 환경변수가 다릅니다')}`);
      console.log(`   ${cyan('💡 이 스키마로 변경하려면:')}`);
      console.log(`   ${cyan('   1. .env.local에서 다음으로 변경:')}`);
      console.log(`   ${cyan(`      NEXT_PUBLIC_SUPABASE_SCHEMA=${schema}`)}`);
      console.log(`   ${cyan('   2. 개발 서버 재시작: pnpm dev')}`);
    }
    
    // 4. 전체 스키마 컨텍스트
    console.log(yellow('\n🌐 전체 스키마 컨텍스트 확인 중...'));
    const allSchemas = await migrationUtils.listCustomSchemas();
    
    console.log(`\n🗂️  전체 커스텀 스키마 (${allSchemas.length}개):`);
    if (allSchemas.length === 0) {
      console.log(yellow('   (커스텀 스키마가 없습니다)'));
    } else {
      allSchemas.forEach((s, index) => {
        const isCurrent = s === currentSchema;
        const isTarget = s === schema;
        let marker = '  ';
        let suffix = '';
        
        if (isCurrent && isTarget) {
          marker = green('👉');
          suffix = green(' (현재 프로젝트 + 조회 대상)');
        } else if (isCurrent) {
          marker = green('🔸');
          suffix = green(' (현재 프로젝트)');
        } else if (isTarget) {
          marker = blue('🔹');
          suffix = blue(' (조회 대상)');
        }
        
        console.log(`${marker} ${index + 1}. ${s}${suffix}`);
      });
    }
    
    // 5. 권장 작업
    console.log(yellow('\n💡 권장 작업:'));
    
    if (isCurrentProject) {
      console.log(`   ${green('✅ 현재 활성 스키마입니다')}`);
      if (tables.length === 0) {
        console.log(`   ${cyan('💡 테이블이 없습니다. 초기화를 고려해보세요:')}`);
        console.log(`   ${cyan('      pnpm run schema:init')}`);
      }
    } else {
      console.log(`   ${cyan('🔄 이 스키마로 전환하려면:')}`);
      console.log(`   ${cyan(`      1. NEXT_PUBLIC_SUPABASE_SCHEMA=${schema}`)}`);
      console.log(`   ${cyan('      2. pnpm dev')}`);
    }
    
    // 6. 관련 명령어
    console.log(yellow('\n🛠️  관련 명령어:'));
    console.log(`   ${cyan('pnpm run schema:list')}        # 모든 스키마 목록`);
    console.log(`   ${cyan(`pnpm run schema:create ${schema}`)}   # 스키마 생성 가이드`);
    console.log(`   ${cyan(`pnpm run schema:drop ${schema}`)}     # 스키마 삭제 가이드`);
    if (isCurrentProject) {
      console.log(`   ${cyan('pnpm run schema:init')}        # 현재 스키마 초기화`);
    }
    
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`\n${green('✅ 스키마 정보 조회 완료')} ${yellow(`(${elapsed}s)`)}`);
    
    process.exit(0);
  } catch (error) {
    console.error(red('❌ 스키마 정보 조회 중 오류 발생:'), error);
    process.exit(1);
  }
}

main(); 