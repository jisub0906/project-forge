# 🛠️ 커스텀 스키마 실전 세팅 & 자동화 가이드

> Supabase MCP Server + Next.js 환경에서 public이 아닌 커스텀 스키마(your_schema)로 안전하게 사용자 관리하는 실전 방법을 정리합니다.

---

## 1. 핵심 SQL 예시 위치

- `db/custom-schema-sample.sql`
  - 커스텀 스키마 생성, profiles 테이블, 트리거, RLS, grade 등 **실전 SaaS 필수 SQL** 모두 포함

---

## 2. 적용 방법 (Step by Step)

1. **your_schema**를 원하는 스키마명(예: `company_a`, `tenant1` 등)으로 변경
2. 필요에 따라 컬럼/정책/ENUM 수정
3. Supabase 대시보드 → **SQL Editor**에서 전체 복사/붙여넣기 → 실행
   - 또는 supabase CLI로 실행
4. (선택) 타입스크립트 타입은 직접 정의 (public 스키마만 자동 생성 지원)

---

## 3. 주요 체크리스트

- [ ] **RLS(행 수준 보안) 활성화** 및 정책 적용
- [ ] **트리거/함수**: 회원가입 시 profiles row 자동 생성
- [ ] **grade 컬럼**: 권한/등급 관리
- [ ] **updated_at 트리거**: 자동 타임스탬프 갱신
- [ ] **auth.users와 1:1 매핑** (id uuid PRIMARY KEY REFERENCES auth.users(id))

---

## 4. 실수 방지 체크리스트 (초보자 필독)

> 커스텀 스키마를 쓸 때 초보자가 가장 많이 실수하는 포인트와 실전 팁을 정리했습니다.

### 1) `.schema('your_schema')`를 반드시 붙이기
- Supabase JS 클라이언트에서 **from()만 쓰면 public 스키마**에 접근합니다.
- 커스텀 스키마를 쓸 때는 항상 `.schema('your_schema').from('테이블')`로 시작하세요.

### 2) RLS(행 수준 보안) 정책은 스키마별로 따로 설정
- 스키마마다 RLS를 반드시 활성화하고, 정책을 별도로 작성해야 합니다.
- RLS가 없으면 데이터가 노출되거나, 아예 접근이 안 될 수 있습니다.

### 3) 타입 자동 생성은 public만 지원
- Supabase의 타입 자동 생성(`supabase gen types typescript ...`)은 **public만 지원**. 커스텀 스키마는 직접 타입 정의 필요 (예시 제공 예정)

### 4) REST API는 public만 노출
- Supabase REST API(자동 생성 API)는 public 스키마만 노출됩니다.
- 커스텀 스키마는 JS 클라이언트, SQL, Edge Function 등에서만 접근 가능합니다.

### 5) Foreign Key/참조는 스키마명까지 명시
- 예: `REFERENCES auth.users(id)` 처럼 스키마명을 꼭 써야 합니다.

### 6) 서버/클라이언트 모두 schema() 명시
- 서버/클라이언트 코드 모두 `.schema('your_schema')`를 명시해야 합니다.
- 안 그러면 public 스키마로 접근하게 됩니다.

### 7) 마이그레이션/SQL 실행 시 스키마명 명시
- SQL Editor, migration 도구에서 항상 `your_schema.테이블`로 명시하세요.

### 8) 권한/정책 분리
- 여러 스키마를 쓸 때는 스키마별로 정책/권한을 분리해서 관리해야 합니다.
- (예: 테넌트별 데이터 격리)

### 9) 스키마명을 상수/환경변수로 관리하면 실수 방지
- 코드에서 스키마명을 하드코딩하지 말고, 상수/환경변수로 관리하면 유지보수에 유리합니다.

---

## 5. 고급 실전 팁: 스키마 객체 관리

### 1) 함수/트리거/시퀀스도 스키마에 귀속
- CREATE FUNCTION, CREATE TRIGGER, CREATE SEQUENCE 등은 모두 **스키마별로 생성**됨
- 항상 `your_schema.function_name`처럼 **함수명 앞에 스키마명**을 붙여야 함
- 트리거 함수가 public에 있으면 your_schema 테이블에서 호출 불가
- 예시:
  - `CREATE FUNCTION your_schema.handle_new_user() ...`
  - `CREATE TRIGGER ... EXECUTE FUNCTION your_schema.handle_new_user();`

### 2) View(뷰)·Materialized View도 스키마별로 관리
- CREATE VIEW your_schema.my_view AS ... 처럼 **스키마명 명시**
- 뷰에서 다른 스키마의 테이블을 조인할 때는 반드시 `스키마명.테이블명`으로 접근
- 예시:
  - `CREATE VIEW your_schema.active_users AS SELECT * FROM your_schema.profiles WHERE grade = 'admin';`
  - `SELECT * FROM your_schema.active_users JOIN auth.users ON ...`

> 실전 팁: 모든 객체(함수, 트리거, 시퀀스, 뷰 등)는 스키마별로 관리된다는 점을 항상 기억하세요!

---

## 6. 자주 묻는 질문 (FAQ)

### Q. public이 아닌 스키마에서 타입 자동 생성은?
- A. Supabase 타입 자동 생성(`supabase gen types typescript ...`)은 **public만 지원**. 커스텀 스키마는 직접 타입 정의 필요 (예시 제공 예정)

### Q. profiles 대신 users로 써도 되나?
- A. 가능하지만, Supabase 공식 예제/커뮤니티는 **profiles 분리**를 권장 (auth.users와 1:1 매핑)

### Q. grade(등급/권한) 컬럼은 어떻게 쓰나?
- A. profiles 테이블에 grade 컬럼 추가 + RLS 정책에서 활용 (예: admin만 전체 조회/수정 가능)

### Q. 트리거/함수는 꼭 써야 하나?
- A. 회원가입 시 자동 row 생성, updated_at 자동 갱신 등 실전 SaaS에서는 필수에 가깝게 사용

---

## 7. 실전 예시 코드/쿼리

> **아래 SQL을 복사해서 your_schema만 원하는 이름으로 바꿔서 실행하세요!**

```
-- (자세한 예시는 db/custom-schema-best-practices.sql 참고)

-- 1. 스키마 생성
CREATE SCHEMA IF NOT EXISTS your_schema;

-- 2. profiles 테이블 생성
CREATE TABLE IF NOT EXISTS your_schema.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  avatar_url text,
  grade text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. 회원가입 시 자동 row 생성 트리거/함수
CREATE OR REPLACE FUNCTION your_schema.handle_new_user() ...
CREATE TRIGGER on_auth_user_created ...

-- 4. RLS 정책 (본인만/관리자 전체)
ALTER TABLE your_schema.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY ...;

-- 5. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION your_schema.update_timestamp() ...
CREATE TRIGGER set_timestamp_on_profiles ...

-- 6. (고급) 함수/트리거/뷰/시퀀스도 반드시 your_schema.이름 으로 생성/참조
-- 예시: CREATE FUNCTION your_schema.handle_new_user() ...
-- 예시: CREATE VIEW your_schema.active_users AS SELECT * FROM your_schema.profiles WHERE grade = 'admin';
```

---

## 8. 참고/팁
- **실제 운영에서는 반드시 RLS 정책을 꼼꼼히 검토**
- **ENUM 타입, 추가 컬럼, 정책 등은 서비스에 맞게 커스터마이즈**
- **문서/SQL 예시는 언제든 복사해서 재사용 가능** 