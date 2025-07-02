# 🚀 Project Forge 2025 Template

> **Next.js 15.3.4 · React 19 · TypeScript · Supabase · TailwindCSS 4.0 · Shadcn/UI · Framer Motion**

---

## 🏁 1분만에 시작하기 (Quick Start)

```bash
# 1. 프로젝트 클론
$ git clone https://github.com/jisub0906/project-forge.git
$ cd project-forge

# 2. 의존성 설치
$ pnpm install

# 3. 환경변수 설정
$ cp .env.example .env.local
# .env.local 파일을 열어 Supabase 정보 입력

# 4. 스키마 생성 및 초기화 (Supabase 대시보드에서)
# SQL Editor에서 실행:
CREATE SCHEMA IF NOT EXISTS "main";

# 5. CLI로 스키마 초기화 및 확인
$ pnpm run schema:init
$ pnpm run schema:list

# 6. 개발 서버 실행
$ pnpm dev
```

---

## 🧭 템플릿 구조 & 철학 요약

- **폴더 구조**
  - `src/app/` : Next.js App Router, 글로벌 스타일, 레이아웃, 페이지, 온보딩 문서
  - `src/components/ui/` : Shadcn/UI 원자적 컴포넌트 (수정 금지, 컴포지션 확장만 허용)
  - `src/components/providers/` : Query, Theme 등 전역 Provider
  - `src/components/common/` : 공통 컴포넌트 (예: Loading)
  - `src/hooks/` : 커스텀 훅 (단일 책임, use- 접두사)
  - `src/lib/` : Supabase 클라이언트, 환경변수, 미들웨어, 마이그레이션, 유틸, Zod 스키마 등
  - `src/lib/schemas/` : Zod 스키마 (타입 추론, 런타임 검증)

- **핵심 원칙**
  1. **단일 책임 원칙**: 하나의 파일은 하나의 역할만 수행
  2. **Zod-First 타입**: 모든 타입은 Zod 스키마에서 추론
  3. **상태 분류**: URL/로컬/전역/서버 상태를 명확히 구분
  4. **보안/스키마 분리**: Supabase 스키마 자동 주입, 환경별 분리, RLS 정책 강제
  5. **UI/UX 일관성**: Shadcn/UI, TailwindCSS 4.0, Framer Motion, 디자인 시스템
  6. **실전 온보딩**: 누구나 실수 없이 따라할 수 있는 단계별 가이드 제공

---

## 📚 온보딩 & 문서

- **홈페이지**: 프로젝트 철학, 주요 기능, 비용 절감, 구조 안내
- **문서/가이드**: `/docs/get-started`에서 4단계 온보딩 (설치→환경설정→스키마→실행)
- **코드 주석**: 주요 파일마다 실전 팁/주의사항/확장법 안내

---

## 🛠️ 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm lint` | 코드 스타일 검사 |
| `pnpm type-check` | 타입 검사 |
| `pnpm run schema:init` | 현재 스키마 초기화 |
| `pnpm run schema:list` | 모든 스키마 목록 조회 |
| `pnpm run schema:info` | 현재 스키마 상세 정보 |
| `pnpm run schema:create <name>` | 새 스키마 생성 |
| `pnpm run schema:drop <name>` | 스키마 삭제 |

---

## 💡 자주 묻는 질문 (FAQ)

### Q. Supabase 연결이 안 돼요!
- 환경변수(`.env.local`)에 올바른 URL/Key/스키마명을 입력했는지 확인하세요.
- Supabase 대시보드에서 스키마를 먼저 생성했는지 확인하세요.
- 네트워크/방화벽 문제도 점검해보세요.

### Q. 스키마 초기화 명령어가 실패해요!
- Supabase SQL Editor에서 `CREATE SCHEMA IF NOT EXISTS "main";`를 먼저 실행하세요.
- 환경변수의 스키마명이 실제로 존재하는지 확인하세요.

### Q. UI가 깨지거나 스타일이 적용되지 않아요!
- TailwindCSS 4.0이 정상적으로 설치/적용되었는지 확인하세요.
- `src/app/globals.css`가 App Router에 import되어 있는지 확인하세요.

### Q. 컴포넌트/훅/스키마를 추가할 때 규칙은?
- **컴포넌트**: `PascalCase.tsx` (예: `UserProfile.tsx`)
- **훅**: `useCamelCase.ts` (예: `useUserProfile.ts`)
- **스키마**: `kebab-case-schema.ts` (예: `user-schema.ts`)
- **Server Action**: `kebab-case.ts` (예: `create-user.ts`)

### Q. Supabase RLS(보안 정책)는 어떻게 적용하나요?
- 모든 테이블에 RLS를 활성화하고, 정책 예시는 `/lib/env.ts`와 문서 참고

---

## 🧑‍💻 템플릿 철학 (AXIOM Protocol)

- **예측 가능성**: 모든 규칙은 AI/사람 모두가 100% 예측 가능하도록 설계
- **일관성**: 폴더/파일/코드/상태/타입/보안/UX까지 완벽한 일관성
- **확장성**: 실무/교육/사이드 프로젝트 모두에 적합, 중급 이상으로도 바로 확장 가능
- **실전 최적화**: 실무에서 자주 실수하는 부분(환경변수, 스키마, 상태, 타입, 보안 등)까지 모두 가이드
- **초보자 친화**: 단계별 온보딩, 명확한 예시, 실전 팁, FAQ, 트러블슈팅까지 제공

---

## 🏆 추천 사용 시나리오

- 여러 프로젝트/클라이언트를 하나의 Supabase로 운영하고 싶은 스타트업/1인 개발자
- 실무/교육/사이드 프로젝트에서 실수 없이 빠르게 시작하고 싶은 분
- 최신 Next.js/React/Supabase/TailwindCSS/TypeScript 실전 패턴을 배우고 싶은 분

---

## 🆘 트러블슈팅 & 도움말

- **문서**: `/docs/get-started`에서 단계별 가이드 확인
- **이슈**: GitHub Issues에 질문/버그/개선 요청 등록
- **커뮤니티**: Supabase, Next.js, Shadcn/UI 공식 Discord/Slack 등 활용

---

## 📜 라이선스

MIT License

---

> **문의/기여/피드백은 언제든 환영합니다!** 