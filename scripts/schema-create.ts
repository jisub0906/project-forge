#!/usr/bin/env tsx

/**
 * 새 커스텀 스키마 생성 가이드 스크립트 (2025 완벽 버전)
 * 
 * 사용법: pnpm run schema:create my_project [--help]
 * 
 * Supabase 보안 정책으로 인해 스키마 생성은 수동으로 진행됩니다.
 * 이 스크립트는 명확한 가이드를 제공합니다.
 */
import 'dotenv/config' 
import { migrationUtils } from '../src/lib/migrations';

function color(msg: string, code: string) {
  return `\x1b[${code}m${msg}\x1b[0m`;
}
const red = (msg: string) => color(msg, '31');
const green = (msg: string) => color(msg, '32');
const yellow = (msg: string) => color(msg, '33');
const cyan = (msg: string) => color(msg, '36');
const blue = (msg: string) => color(msg, '34');

const args = process.argv.slice(2);
let schema = args.find(arg => !arg.startsWith('--'));
const help = args.includes('--help');

function printHelp() {
  console.log(cyan(`
🏗️  새 커스텀 스키마 생성 가이드
--------------------------------
사용법: pnpm run schema:create <스키마명>
예시:  pnpm run schema:create client_samsung

📋 이 스크립트는 Supabase Dashboard에서 수행할 작업을 안내합니다.
   (보안상 스키마 생성은 수동으로만 가능합니다)

옵션:
  --help    : 사용법 출력
`));
}

async function main() {
  if (help) return printHelp();
  
  if (!schema) {
    console.error(red('❌ 스키마명을 입력하세요.'));
    console.log(cyan('📖 사용법: pnpm run schema:create my_project'));
    console.log(cyan('📖 예시:   pnpm run schema:create client_samsung'));
    process.exit(1);
  }
  
  schema = schema.trim().toLowerCase();
  
  // 스키마명 유효성 검사
  if (!/^[a-z][a-z0-9_]*$/.test(schema)) {
    console.error(red('❌ 스키마명은 소문자, 숫자, 언더스코어만 사용 가능합니다.'));
    console.log(cyan('✅ 올바른 예: my_project, client_samsung, dev_test'));
    console.log(red('❌ 잘못된 예: My-Project, 123abc, special@chars'));
    process.exit(1);
  }
  
  console.log(cyan(`🏗️  [${blue(schema)}] 스키마 생성 가이드`));
  console.log('━'.repeat(50));
  
  try {
    // 1. 스키마 존재 여부 확인
    console.log(yellow('🔍 스키마 존재 여부 확인 중...'));
    const exists = await migrationUtils.schemaExists(schema);
    
    if (exists) {
      console.log(red(`❌ 스키마 '${schema}'는 이미 존재합니다.`));
      console.log(cyan('💡 다른 이름을 사용하거나, 기존 스키마를 확인하세요:'));
      console.log(cyan('   pnpm run schema:list'));
      process.exit(1);
    }
    
    console.log(green('✅ 스키마명 사용 가능'));
    
    // 2. 수동 작업 가이드 제공
    console.log('\n' + yellow('📋 다음 단계를 따라 주세요:'));
    console.log('━'.repeat(30));
    
    console.log(cyan('\n1. Supabase Dashboard 열기'));
    console.log('   🌐 https://supabase.com/dashboard');
    console.log('   📂 프로젝트 선택');
    
    console.log(cyan('\n2. SQL Editor로 이동'));
    console.log('   📝 좌측 메뉴 → SQL Editor 클릭');
    
    console.log(cyan('\n3. 스키마 생성 SQL 실행'));
    console.log('   📋 다음 코드를 복사해서 실행하세요:');
    
    console.log('\n' + blue('   -- 스키마 생성'));
    console.log(blue(`   CREATE SCHEMA IF NOT EXISTS "${schema}";`));
    
    console.log('\n' + blue('   -- 기본 테이블 생성'));
    console.log(blue(`   CREATE TABLE IF NOT EXISTS "${schema}".users (`));
    console.log(blue('     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,'));
    console.log(blue('     email TEXT UNIQUE NOT NULL,'));
    console.log(blue('     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),'));
    console.log(blue('     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()'));
    console.log(blue('   );'));
    
    console.log('\n' + blue(`   CREATE TABLE IF NOT EXISTS "${schema}".profiles (`));
    console.log(blue('     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,'));
    console.log(blue(`     user_id UUID REFERENCES "${schema}".users(id) ON DELETE CASCADE,`));
    console.log(blue('     name TEXT,'));
    console.log(blue('     avatar_url TEXT,'));
    console.log(blue('     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),'));
    console.log(blue('     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()'));
    console.log(blue('   );'));
    
    console.log('\n' + blue('   -- RLS 보안 정책 활성화'));
    console.log(blue(`   ALTER TABLE "${schema}".users ENABLE ROW LEVEL SECURITY;`));
    console.log(blue(`   ALTER TABLE "${schema}".profiles ENABLE ROW LEVEL SECURITY;`));
    
    console.log('\n' + blue('   -- 기본 보안 정책 생성'));
    console.log(blue(`   CREATE POLICY "Users can view own data" ON "${schema}".users`));
    console.log(blue('     FOR SELECT USING (auth.uid() = id);'));
    console.log(blue(`   CREATE POLICY "Users can update own data" ON "${schema}".users`));
    console.log(blue('     FOR UPDATE USING (auth.uid() = id);'));
    console.log(blue(`   CREATE POLICY "Profiles are viewable by owner" ON "${schema}".profiles`));
    console.log(blue('     FOR SELECT USING (auth.uid() = user_id);'));
    console.log(blue(`   CREATE POLICY "Users can manage own profile" ON "${schema}".profiles`));
    console.log(blue('     FOR ALL USING (auth.uid() = user_id);'));
    
    console.log(cyan('\n4. 환경변수 설정'));
    console.log(`   📝 .env.local 파일에서 다음을 수정:`);
    console.log(blue(`   NEXT_PUBLIC_SUPABASE_SCHEMA=${schema}`));
    
    console.log(cyan('\n5. 개발 서버 재시작'));
    console.log('   🔄 pnpm dev');
    
    console.log('\n' + green('🎉 완료되면 다음 명령으로 확인하세요:'));
    console.log(cyan('   pnpm run schema:list'));
    
    console.log('\n' + yellow('⚠️  주의사항:'));
    console.log('   • SQL은 순서대로 모두 실행해주세요');
    console.log('   • 에러가 발생하면 각 명령을 개별적으로 실행해보세요');
    console.log('   • 스키마명은 변경할 수 없으니 신중히 선택하세요');
    
    process.exit(0);
  } catch (error) {
    console.error(red('❌ 스키마 생성 가이드 중 오류 발생:'), error);
    process.exit(1);
  }
}

main(); 