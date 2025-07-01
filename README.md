# 🏛️ Next.js 15 + Supabase 스키마 분리 프로젝트 (2025)

> **🎯 하나의 Supabase로 여러 프로젝트를 안전하게 관리하세요!**  
> 스키마 자동 주입 시스템으로 프로젝트별 완전 데이터 격리 + 비용 90% 절감

## ✨ 주요 특징

### 🎯 **스키마 자동 주입 시스템**
- **코드 수정 없음**: 기존 Supabase 코드를 전혀 수정하지 않아도 됨
- **자동 스키마 적용**: 환경변수만으로 프로젝트별 스키마 자동 선택
- **완전 데이터 격리**: 프로젝트간 데이터 혼재 방지

### 💰 **비용 최적화**
- **하나의 Supabase 인스턴스**로 무제한 프로젝트 운영
- **독립적 스키마**: 각 프로젝트가 완전히 분리된 데이터베이스 공간 사용
- **비용 90% 절감**: $25/월로 여러 프로젝트 운영 가능

### 🚀 **최신 기술 스택**
- **Next.js 15.3.4** (App Router, Server Components, Server Actions)
- **React 19** (useTransition, Suspense, Concurrent Features)
- **Supabase** (PostgreSQL, Auth, RLS, Real-time)
- **TailwindCSS 4.0** (새로운 @theme 방식)
- **TypeScript** (Strict 모드)
- **Shadcn/UI** + **Framer Motion**

---

## 🚀 빠른 시작 (5분)

### 1️⃣ 프로젝트 설치

```bash
# 프로젝트 클론 및 의존성 설치
git clone https://github.com/your-repo/project-forge
cd project-forge
pnpm install
```

### 2️⃣ 환경변수 설정

```bash
# 환경변수 파일 생성
cp .env.example .env.local

# .env.local 편집 (필수 3개 항목)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_SCHEMA=my_awesome_project  # �� 원하는 프로젝트명
```

### 3️⃣ Supabase에서 스키마 생성

**중요**: Supabase 보안 정책으로 인해 스키마는 수동으로 생성해야 합니다.

1. **Supabase Dashboard** → **SQL Editor** 이동
2. 다음 SQL 실행:

```sql
-- 스키마 생성
CREATE SCHEMA IF NOT EXISTS "my_awesome_project";

-- 기본 테이블 생성
CREATE TABLE IF NOT EXISTS "my_awesome_project".users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "my_awesome_project".profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES "my_awesome_project".users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 보안 정책 활성화
ALTER TABLE "my_awesome_project".users ENABLE ROW LEVEL SECURITY;
ALTER TABLE "my_awesome_project".profiles ENABLE ROW LEVEL SECURITY;

-- 기본 보안 정책
CREATE POLICY "Users can view own data" ON "my_awesome_project".users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON "my_awesome_project".users
  FOR UPDATE USING (auth.uid() = id);
```

### 4️⃣ 개발 서버 실행

```bash
pnpm dev
# 🎉 http://localhost:3000 에서 확인!
```

---

## 💻 사용법

### 🎯 핵심: 코드는 그대로, 스키마만 자동!

기존 Supabase 코드를 **전혀 수정하지 않아도** 됩니다:

```typescript
// ✅ 기존 코드 그대로 사용하세요!
import { createClient } from '@/lib/client';

export default function UserList() {
  const supabase = createClient();
  
  // 🎯 이 코드는 자동으로 현재 프로젝트 스키마에서 실행됩니다
  const { data: users } = await supabase.from('users').select('*');
  
  return <div>{/* 사용자 목록 렌더링 */}</div>;
}
```

### 🔧 CLI 관리 도구

```bash
# 📋 스키마 목록 확인
pnpm run schema:list

# 🏗️ 새 프로젝트 스키마 가이드
pnpm run schema:create client_samsung

# 🗑️ 프로젝트 스키마 삭제 가이드
pnpm run schema:drop old_project

# 🔄 현재 프로젝트 초기화
pnpm run schema:init
```

**주의**: CLI 도구는 **가이드**를 제공합니다. 실제 스키마 생성/삭제는 Supabase Dashboard에서 수동으로 진행해야 합니다.

---

## 🏗️ 여러 프로젝트 운영하기

### 💡 실제 사용 예시

```bash
# 회사 프로젝트들
📁 company-projects/
├── ecommerce-site/     # SCHEMA=ecommerce_main
├── admin-dashboard/    # SCHEMA=admin_panel  
├── mobile-app-api/     # SCHEMA=mobile_backend
└── analytics-tool/     # SCHEMA=analytics_db

# 고객별 프로젝트들  
📁 client-projects/
├── client-samsung/     # SCHEMA=samsung_portal
├── client-lg/          # SCHEMA=lg_system
└── client-kakao/       # SCHEMA=kakao_service
```

### 🌍 환경별 스키마 관리

```bash
# .env.local - 환경별 스키마 설정
NEXT_PUBLIC_SUPABASE_SCHEMA=my_project                    # 기본
NEXT_PUBLIC_SUPABASE_SCHEMA_DEV=my_project_dev           # 개발용
NEXT_PUBLIC_SUPABASE_SCHEMA_STAGING=my_project_staging   # 테스트용  
NEXT_PUBLIC_SUPABASE_SCHEMA_PROD=my_project_prod         # 운영용
```

---

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js 15 App Router
│   ├── globals.css        # TailwindCSS 4.0 설정
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/
│   ├── ui/                # Shadcn/UI 컴포넌트 (수정 금지)
│   ├── providers/         # Context 프로바이더들
│   └── common/            # 공통 컴포넌트
├── hooks/                 # 커스텀 훅
│   └── use-auth.ts       # 인증 관련 훅
├── lib/
│   ├── schemas/           # Zod 스키마 정의
│   ├── env.ts            # 환경변수 검증 (스키마 분리 지원)
│   ├── client.ts         # 클라이언트 Supabase (스키마 자동 주입)
│   ├── server.ts         # 서버 Supabase (스키마 자동 주입)
│   ├── middleware.ts     # 미들웨어 (스키마 자동 주입)
│   ├── migrations.ts     # 스키마별 마이그레이션 도구
│   └── utils.ts          # 유틸리티 함수
└── scripts/              # CLI 관리 도구
    ├── schema-create.ts  # 스키마 생성 가이드
    ├── schema-drop.ts    # 스키마 삭제 가이드
    ├── schema-init.ts    # 스키마 초기화
    └── schema-list.ts    # 스키마 목록 조회
```

---

## 🎮 개발 명령어

```bash
# 🚀 개발 서버
pnpm dev              # Turbopack (빠른 개발 - 권장)
pnpm dev:webpack      # Webpack (안정성 우선)

# 🔍 코드 품질
pnpm type-check       # TypeScript 오류 확인
pnpm lint            # 코드 스타일 검사
pnpm build           # 프로덕션 빌드

# 🎯 스키마 관리
pnpm run schema:list # 스키마 목록 보기
pnpm run schema:init # 현재 스키마 초기화

# ✅ 전체 검증
pnpm run validate    # 타입체크 + 린트 + 빌드 테스트
```

---

## 🚀 배포 가이드

### Vercel 배포

```bash
# Vercel 배포
vercel

# 환경변수 설정 (Vercel 대시보드)
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
NEXT_PUBLIC_SUPABASE_SCHEMA=production_schema
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

### 환경별 배포

```bash
# 개발 환경
NEXT_PUBLIC_SUPABASE_SCHEMA=project_dev

# 스테이징 환경  
NEXT_PUBLIC_SUPABASE_SCHEMA=project_staging

# 프로덕션 환경
NEXT_PUBLIC_SUPABASE_SCHEMA=project_prod
```

---

## 🆘 문제 해결

### 🔧 자주 묻는 질문

#### ❓ "스키마를 찾을 수 없습니다" 오류

```bash
# 1. 환경변수 확인
echo $NEXT_PUBLIC_SUPABASE_SCHEMA

# 2. Supabase Dashboard에서 스키마 생성 확인
# 3. 스키마 목록 확인
pnpm run schema:list

# 4. 스키마 초기화 가이드 실행
pnpm run schema:init
```

#### ❓ "권한이 없습니다" 오류

1. Supabase Dashboard → Settings → API 이동
2. `service_role` 키를 `.env.local`에 `SUPABASE_SERVICE_ROLE_KEY`로 설정
3. 개발 서버 재시작: `pnpm dev`

#### ❓ 여러 프로젝트 데이터가 섞임

**절대 섞이지 않습니다!** 각 프로젝트는 완전히 독립된 스키마를 사용합니다.
- `.env.local`의 `NEXT_PUBLIC_SUPABASE_SCHEMA` 값을 확인하세요
- 브라우저 콘솔에서 현재 스키마 확인: `console.log(process.env.NEXT_PUBLIC_SUPABASE_SCHEMA)`

#### ❓ CLI 도구가 실제로 스키마를 생성하지 않음

**정상입니다!** Supabase 보안 정책으로 인해 스키마 생성/삭제는 수동으로만 가능합니다.
- CLI 도구는 **상세한 가이드**를 제공합니다
- 실제 작업은 Supabase Dashboard에서 SQL을 복사해서 실행하세요

### 🚨 응급처치

```bash
# 모든 것을 초기화하고 다시 시작
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run schema:init
pnpm dev
```

---

## 🔒 보안 고려사항

### RLS (Row Level Security) 설정

모든 테이블에 RLS를 활성화하고 적절한 정책을 설정하세요:

```sql
-- RLS 활성화
ALTER TABLE "your_schema".your_table ENABLE ROW LEVEL SECURITY;

-- 기본 보안 정책
CREATE POLICY "Users can only see own data" ON "your_schema".your_table
  FOR SELECT USING (auth.uid() = user_id);
```

### 환경변수 보안

- **절대** 서비스 롤 키를 클라이언트에 노출하지 마세요
- `.env.local` 파일은 Git에 커밋하지 마세요
- 프로덕션에서는 별도의 스키마를 사용하세요

---

## 📚 기술 스택 상세

- **Next.js 15.3.4**: App Router, Server Components, Server Actions
- **React 19**: useTransition, Suspense, Concurrent Features  
- **TypeScript**: Strict 모드 활성화
- **TailwindCSS 4.0**: @theme inline, oklch 색상
- **Supabase**: SSR 지원, RLS 보안, 스키마 분리
- **상태관리**: TanStack Query + Zustand
- **폼**: React Hook Form + Zod 검증
- **애니메이션**: Framer Motion
- **UI**: Shadcn/UI + Radix 기반

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 📖 학습 리소스

### 공식 문서
- [Next.js 15 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [TailwindCSS 4.0 문서](https://tailwindcss.com/docs)

### 커뮤니티
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Supabase GitHub](https://github.com/supabase/supabase)
- [Discord 커뮤니티](https://discord.gg/supabase)

---

**🎯 이 프로젝트로 비용을 절감하면서도 안전하고 확장 가능한 멀티 프로젝트를 구축하세요!**

> **주의**: 이 프로젝트는 Supabase의 보안 정책을 존중하며, 모든 스키마 관리는 Supabase Dashboard를 통해 수동으로 진행됩니다. CLI 도구는 명확한 가이드를 제공하여 실수를 방지합니다.