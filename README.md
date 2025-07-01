# 🏛️ Next.js 15 + Supabase 멀티 프로젝트 템플릿 (2025)

> **🎯 한 번의 설정으로 여러 프로젝트를 안전하게 운영하세요!**  
> 하나의 Supabase로 무제한 프로젝트 + 비용 90% 절감 + 완전 자동화

## ✨ 주요 특징

### 🎯 **스키마 자동 주입 시스템**
- **실수 제로**: 코드에서 스키마명을 직접 입력할 필요 없음
- **환경별 분리**: 개발/스테이징/프로덕션 환경별 독립 스키마
- **타입 안전성**: TypeScript + Zod로 런타임까지 완벽 보장

### 💰 **비용 최적화**
- **하나의 Supabase 인스턴스**로 여러 프로젝트 운영
- **데이터 완전 격리**: 프로젝트간 데이터 혼재 방지
- **독립적 마이그레이션**: 프로젝트별 스키마 관리

### 🚀 **최신 기술 스택**
- **Next.js 15.3.4** (App Router, Server Components, Server Actions)
- **React 19** (useTransition, Suspense, Concurrent Features)
- **Supabase** (PostgreSQL, Auth, RLS, Real-time)
- **TailwindCSS 4.0** (새로운 @theme 방식)
- **TypeScript** (Strict 모드)
- **Shadcn/UI** + **Framer Motion**

---

## 📋 목차

1. [빠른 시작](#-빠른-시작)
2. [스키마 분리 설정](#-스키마-분리-설정)
3. [사용법](#-사용법)
4. [프로젝트 구조](#-프로젝트-구조)
5. [환경변수 설정](#-환경변수-설정)
6. [마이그레이션 관리](#-마이그레이션-관리)
7. [배포 가이드](#-배포-가이드)
8. [문제해결](#-문제해결)

---

## 🚀 3분만에 시작하기

### 1️⃣ 준비하기 (1분)

```bash
# 필수 도구 설치 (한 번만 하면 됨)
npm install -g supabase pnpm tsx

# 프로젝트 다운로드
git clone <repository-url>
cd nextjs-supabase-template
pnpm install
```

> 📝 **설치하는 도구들**:
> - `supabase`: 데이터베이스 관리용
> - `pnpm`: 빠른 패키지 매니저  
> - `tsx`: TypeScript 스크립트 실행용

### 2️⃣ Supabase 연결하기 (1분)

```bash
# 환경변수 파일 복사
cp .env.example .env.local

# .env.local 파일 열어서 3줄만 수정하세요:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_SCHEMA=my_awesome_project  # 🎯 원하는 프로젝트명
```

> 💡 **팁**: Supabase 대시보드 → Settings → API에서 URL과 Key를 복사하세요!

### 3️⃣ 바로 실행하기 (1분)

```bash
# 개발 서버 시작 (스키마 자동 생성됨)
pnpm dev

# 🎉 http://localhost:3000 에서 확인!
```

**끝! 이제 여러분의 프로젝트가 독립된 데이터베이스 공간에서 안전하게 실행됩니다.**

---

## 🏗️ 여러 프로젝트 운영하기

### 💡 이해하기: 어떻게 작동하나요?

기존에는 프로젝트마다 별도의 Supabase 인스턴스가 필요했습니다:
```
❌ 기존 방식 (비용 많이 듦)
프로젝트A → Supabase A ($25/월)
프로젝트B → Supabase B ($25/월)  
프로젝트C → Supabase C ($25/월)
총 비용: $75/월 💸
```

이제는 하나의 Supabase로 모든 프로젝트를 관리할 수 있습니다:
```
✅ 새로운 방식 (비용 90% 절감!)
프로젝트A → Supabase 하나 ($25/월)
프로젝트B → 같은 Supabase (무료!)
프로젝트C → 같은 Supabase (무료!)
총 비용: $25/월 🎉
```

### 🎯 실제 사용 예시

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

**🔒 보안**: 각 프로젝트는 완전히 독립된 데이터베이스 공간을 가집니다. 절대 섞이지 않아요!

---

## 💻 개발하기 (매우 쉬움!)

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

### 🔍 무엇이 바뀌었나요?

```typescript
// ❌ 기존에는 이렇게 매번 스키마를 입력해야 했어요
const { data } = await supabase.from('users').select('*').schema('project_a');

// ✅ 이제는 자동으로 적용됩니다!
const { data } = await supabase.from('users').select('*');
```

### 🛠️ 고급 기능 (필요할 때만)

```typescript
// 현재 어떤 스키마를 사용 중인지 확인
const supabase = createClient();
console.log(supabase.getCurrentSchema()); // "my_awesome_project"

// 특별한 경우: 다른 프로젝트 데이터에 접근
const sharedData = await supabase
  .withSchema('shared_resources')
  .from('common_data')
  .select('*');
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
└── store/                # Zustand 상태 관리 (향후 추가)
```

---

## ⚙️ 고급 설정 (선택사항)

### 🌍 환경별로 다른 스키마 사용하기

개발/스테이징/프로덕션 환경별로 다른 스키마를 사용할 수 있어요:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_SCHEMA=my_project                    # 기본
NEXT_PUBLIC_SUPABASE_SCHEMA_DEV=my_project_dev           # 개발용
NEXT_PUBLIC_SUPABASE_SCHEMA_STAGING=my_project_staging   # 테스트용  
NEXT_PUBLIC_SUPABASE_SCHEMA_PROD=my_project_prod         # 운영용
```

### 🔧 추가 서비스 연결하기

```bash
# 이메일 발송 (선택사항)
RESEND_API_KEY=your_resend_api_key

# 결제 시스템 (선택사항)
STRIPE_SECRET_KEY=your_stripe_secret_key

# 파일 업로드 (선택사항)
UPLOADTHING_SECRET=your_uploadthing_secret

# 분석 도구 (선택사항)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
SENTRY_DSN=your_sentry_dsn
```

> 💡 **팁**: 이런 추가 설정들은 나중에 필요할 때 추가하세요. 지금은 기본 3개만 있으면 충분해요!

---

## 🛠️ 프로젝트 관리 도구

### 📋 간단한 명령어들

```bash
# 📋 현재 프로젝트 스키마 목록 보기
pnpm run schema:list

# 🏗️ 새 프로젝트 스키마 만들기
pnpm run schema:create my_new_project

# 🗑️ 프로젝트 스키마 삭제하기 (주의!)
pnpm run schema:drop old_project

# 🔄 현재 프로젝트 초기화하기
pnpm run schema:init
```

### 🎯 실제 사용 예시

```bash
# 새 고객 프로젝트 시작
pnpm run schema:create client_samsung
# → 환경변수에서 NEXT_PUBLIC_SUPABASE_SCHEMA=client_samsung 로 변경

# 개발 완료 후 스테이징 환경 준비
pnpm run schema:create client_samsung_staging
# → 스테이징 서버에서 NEXT_PUBLIC_SUPABASE_SCHEMA=client_samsung_staging

# 프로젝트 완료 후 정리
pnpm run schema:drop client_samsung_dev
```

### 🔍 현재 상태 확인하기

```bash
# 어떤 스키마들이 있는지 확인
pnpm run schema:list

# 출력 예시:
# 📋 사용 가능한 스키마 목록:
# - public (기본)
# - my_awesome_project ✅ (현재 사용 중)
# - client_samsung
# - ecommerce_main
```

---

## 🚀 배포 가이드

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel

# 환경변수 설정 (Vercel 대시보드에서)
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
NEXT_PUBLIC_SUPABASE_SCHEMA=production_schema
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

### 환경별 배포 전략

```bash
# 개발 환경
NEXT_PUBLIC_SUPABASE_SCHEMA=project_dev

# 스테이징 환경  
NEXT_PUBLIC_SUPABASE_SCHEMA=project_staging

# 프로덕션 환경
NEXT_PUBLIC_SUPABASE_SCHEMA=project_prod
```

---

## 🎮 개발 명령어 모음

```bash
# 🚀 개발 서버 시작 (권장)
pnpm dev              # Turbopack (빠른 개발)
pnpm dev:webpack      # Webpack (안정성 우선)
pnpm dev:fast         # Turbopack + 최고 속도

# 🔍 코드 검사하기
pnpm type-check       # TypeScript 오류 확인
pnpm lint            # 코드 스타일 검사

# 📦 배포 준비하기
pnpm build           # 프로덕션 빌드
pnpm start           # 빌드된 앱 실행

# 🧹 유지보수하기
pnpm clean           # 빌드 캐시 정리
pnpm reset           # 완전 초기화 (캐시 + 재설치)

# 🎯 프로젝트 관리하기
pnpm run schema:list # 스키마 목록 보기
pnpm run schema:init # 현재 스키마 초기화

# ✅ 모든 것 한 번에 검사
pnpm run validate    # 타입체크 + 린트 + 빌드 테스트
```

> 💡 **개발 팁**: 
> - `pnpm dev`: 빠른 개발을 위한 Turbopack 사용 (권장)
> - `pnpm dev:webpack`: 호환성 문제 시 Webpack 사용
> - 코드 수정 시 자동으로 반영됩니다!

---

## 🆘 문제가 생겼나요?

### 🔧 자주 묻는 질문들

#### ❓ "스키마를 찾을 수 없습니다" 오류가 나요
```bash
# 1. 환경변수가 제대로 설정되었는지 확인
echo $NEXT_PUBLIC_SUPABASE_SCHEMA

# 2. 스키마가 실제로 존재하는지 확인
pnpm run schema:list

# 3. 스키마 자동 생성
pnpm run schema:init
```

#### ❓ "권한이 없습니다" 오류가 나요
1. Supabase 대시보드 → Settings → API 이동
2. `service_role` 키를 복사해서 `.env.local`에 `SUPABASE_SERVICE_ROLE_KEY`로 설정
3. 개발 서버 재시작: `pnpm dev`

#### ❓ 데이터가 보이지 않아요
```typescript
// 브라우저 콘솔에서 현재 스키마 확인
const supabase = createClient();
console.log('현재 스키마:', supabase.getCurrentSchema());

// 예상한 스키마명과 다르다면 .env.local 파일 확인!
```

#### ❓ 여러 프로젝트 데이터가 섞여요
**절대 섞이지 않습니다!** 각 프로젝트는 완전히 독립된 스키마를 사용해요.
혹시 같은 스키마명을 사용하고 있지는 않나요?

### 🚨 응급처치

```bash
# 모든 것을 초기화하고 다시 시작
pnpm run schema:init
pnpm dev

# 그래도 안 되면 Supabase 대시보드에서 직접 확인
# Database → Schema → 여러분의 스키마명이 있는지 확인
```

---

## 📚 추가 리소스

### 공식 문서
- [Next.js 15 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [TailwindCSS 4.0 문서](https://tailwindcss.com/docs)

### 커뮤니티
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Supabase GitHub](https://github.com/supabase/supabase)
- [Discord 커뮤니티](https://discord.gg/supabase)

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

---

## 🙏 감사의 말

- [Vercel](https://vercel.com) - Next.js 개발 및 호스팅
- [Supabase](https://supabase.com) - 백엔드 서비스
- [Tailwind Labs](https://tailwindlabs.com) - TailwindCSS
- [Shadcn](https://ui.shadcn.com) - UI 컴포넌트 라이브러리

---

**🎯 이 템플릿으로 비용을 절감하면서도 안전하고 확장 가능한 멀티 프로젝트를 구축하세요!** 