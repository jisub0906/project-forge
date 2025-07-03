-- 커스텀 스키마(your_schema) 사용 시 반드시 챙겨야 할 핵심 SQL 예시
-- (Supabase MCP Server, Next.js, 실전 SaaS 기준)
--
-- [고급 실전 팁]
-- 1. 함수/트리거/시퀀스/뷰 등 모든 객체는 반드시 your_schema.이름 으로 생성/참조해야 함
--    (예: CREATE FUNCTION your_schema.handle_new_user(), CREATE VIEW your_schema.active_users ...)
-- 2. 트리거 함수가 public에 있으면 your_schema 테이블에서 호출 불가 (스키마 불일치 오류)
-- 3. 뷰/머티리얼라이즈드 뷰도 CREATE VIEW your_schema.my_view AS ... 처럼 스키마명 명시
-- 4. 뷰/함수/트리거에서 다른 스키마 객체를 참조할 때는 반드시 스키마명.테이블명으로 접근
-- 5. 실수 방지: SQL Editor, migration, 코드 등 모든 곳에서 스키마명 누락 주의!
-- 6. 권한 부여, 정책, RLS 등도 스키마별로 분리 관리
-- 7. 스키마명은 환경변수/상수로 관리하면 유지보수에 유리
--
-- 예시:
--   CREATE FUNCTION your_schema.handle_new_user() ...
--   CREATE TRIGGER ... EXECUTE FUNCTION your_schema.handle_new_user();
--   CREATE VIEW your_schema.active_users AS SELECT * FROM your_schema.profiles WHERE grade = 'admin';
--   SELECT * FROM your_schema.active_users JOIN auth.users ON ...
--
-- [실전 실수 예시]
--   X: CREATE TRIGGER ... EXECUTE FUNCTION handle_new_user();   -- (public에 있으면 오류)
--   O: CREATE TRIGGER ... EXECUTE FUNCTION your_schema.handle_new_user();
--
-- 아래는 실전에서 바로 쓸 수 있는 커스텀 스키마 SQL 예시입니다.

-- 1. 스키마 생성
CREATE SCHEMA IF NOT EXISTS your_schema;

-- 2. profiles 테이블 생성 (auth.users와 1:1 매핑)
CREATE TABLE IF NOT EXISTS your_schema.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  avatar_url text,
  grade text DEFAULT 'user', -- 등급/권한
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. 회원가입 시 profiles row 자동 생성 트리거/함수 (함수명 앞에 반드시 your_schema. 명시)
CREATE OR REPLACE FUNCTION your_schema.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO your_schema.profiles (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION your_schema.handle_new_user();

-- 4. RLS(행 수준 보안) 활성화 및 정책 (스키마별로 적용)
ALTER TABLE your_schema.profiles ENABLE ROW LEVEL SECURITY;

-- (1) 본인만 조회/수정 가능
CREATE POLICY "Users can view own profile" ON your_schema.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON your_schema.profiles
  FOR UPDATE USING (auth.uid() = id);

-- (2) admin 등급은 전체 조회/수정 가능
CREATE POLICY "Admins can view all profiles" ON your_schema.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM your_schema.profiles
      WHERE id = auth.uid() AND grade = 'admin'
    )
  );
CREATE POLICY "Admins can update all profiles" ON your_schema.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM your_schema.profiles
      WHERE id = auth.uid() AND grade = 'admin'
    )
  );

-- 5. updated_at 자동 갱신 트리거 (함수명 앞에 반드시 your_schema. 명시)
CREATE OR REPLACE FUNCTION your_schema.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_on_profiles ON your_schema.profiles;
CREATE TRIGGER set_timestamp_on_profiles
BEFORE UPDATE ON your_schema.profiles
FOR EACH ROW EXECUTE FUNCTION your_schema.update_timestamp();

-- 6. (선택) grade 컬럼 값 ENUM으로 제한하고 싶을 때 (ENUM도 your_schema에 생성)
-- CREATE TYPE your_schema.user_grade AS ENUM ('user', 'admin', 'premium', 'guest');
-- ALTER TABLE your_schema.profiles ALTER COLUMN grade TYPE your_schema.user_grade USING grade::your_schema.user_grade;

-- 7. (권장) 권한(Privilege) 부여 예시 (스키마별로 관리)
-- Supabase의 서비스 역할(예: authenticated, anon, service_role 등) 또는 특정 사용자/역할에 권한을 부여할 수 있습니다.
-- 예시: authenticated 역할에 read/write 권한 부여
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE your_schema.profiles TO authenticated;
-- 예시: anon 역할에 read-only 권한 부여
GRANT SELECT ON TABLE your_schema.profiles TO anon;
-- 예시: 서비스 역할(service_role)에 모든 권한 부여 (기본적으로 부여되어 있음)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA your_schema TO service_role;

--
-- 사용법:
-- 1. your_schema를 실제 스키마명으로 변경
-- 2. 필요에 따라 컬럼/정책/권한 수정
-- 3. Supabase SQL Editor 또는 CLI로 실행 