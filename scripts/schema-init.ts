#!/usr/bin/env tsx

/**
 * 현재 프로젝트 스키마 초기화 스크립트 (100점 버전)
 * 
 * 사용법: pnpm run schema:init [--help]
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
현재 프로젝트 스키마 초기화 스크립트
------------------------------
사용법: pnpm run schema:init
옵션:
  --help    : 사용법 출력
`));
}

async function main() {
  if (help) return printHelp();
  let schema = env.NEXT_PUBLIC_SUPABASE_SCHEMA;
  schema = schema.trim().toLowerCase();
  console.log(cyan('🏗️  현재 프로젝트 스키마 초기화 중...'));
  console.log(`📋 스키마명: ${green(schema)}`);
  const start = Date.now();
  try {
    const result = await migrationUtils.initializeCurrentSchema();
    if (result.success) {
      console.log(green('✅'), result.message);
      console.log(cyan('🎉 스키마 초기화가 완료되었습니다!'));
      console.log(cyan(`⏱️  소요 시간: ${(Date.now() - start) / 1000}s`));
      process.exit(0);
    } else {
      console.error(yellow('❌'), result.message);
      if (result.error) console.error(yellow('세부 오류:'), result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error(yellow('❌ 스키마 초기화 중 오류 발생:'), error);
    process.exit(1);
  }
}

main();