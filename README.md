# 🚀 Project Forge 2025 Template

> **Next.js 15.3.4 · React 19 · TypeScript · Supabase MCP Server · TailwindCSS 4.0 · Shadcn/UI · Framer Motion**

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

# 4. Supabase MCP Server 연결 확인
# Cursor/Claude에서 Supabase MCP 도구 사용 가능

# 5. 개발 서버 실행
$ pnpm dev
```

---

## 🧭 템플릿 구조 & 철학 요약

- **폴더 구조**
  - `src/app/` : Next.js App Router, 글로벌 스타일, 레이아웃, 페이지
  - `src/components/ui/` : Shadcn/UI 원자적 컴포넌트 (수정 금지, 컴포지션 확장만 허용)
  - `src/components/providers/` : Query, Theme 등 전역 Provider
  - `src/components/common/` : 공통 컴포넌트 (예: Loading)
  - `src/hooks/` : 커스텀 훅 (단일 책임, use- 접두사)
  - `src/lib/` : Supabase 클라이언트, 환경변수, 미들웨어, 유틸, Zod 스키마 등
  - `src/lib/schemas/` : Zod 스키마 (타입 추론, 런타임 검증)

- **핵심 원칙**
  1. **단일 책임 원칙**: 하나의 파일은 하나의 역할만 수행
  2. **Zod-First 타입**: 모든 타입은 Zod 스키마에서 추론
  3. **상태 분류**: URL/로컬/전역/서버 상태를 명확히 구분
  4. **Supabase MCP 활용**: AI 기반 데이터베이스 관리 및 개발
  5. **UI/UX 일관성**: Shadcn/UI, TailwindCSS 4.0, Framer Motion, 디자인 시스템
  6. **실전 온보딩**: 누구나 실수 없이 따라할 수 있는 단계별 가이드 제공

---

## 📚 온보딩 & 문서

- **홈페이지**: 프로젝트 철학, 주요 기능, 구조 안내
- **문서/가이드**: `/docs/get-started`에서 3단계 온보딩 (설치→환경설정→실행)
- **코드 주석**: 주요 파일마다 실전 팁/주의사항/확장법 안내

---

## 🛠️ 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm lint` | 코드 스타일 검사 |
| `pnpm type-check` | 타입 검사 |

---

## 🤖 Supabase MCP Server 활용

이 템플릿은 **Supabase MCP Server**와 완벽하게 통합되어 있습니다:

### 주요 기능
- **AI 기반 데이터베이스 관리**: 스키마 생성, 테이블 관리, 마이그레이션
- **실시간 개발 지원**: Cursor/Claude에서 직접 DB 작업 가능
- **보안 정책 자동화**: RLS 정책 생성 및 관리
- **브랜치 기반 개발**: 개발/스테이징/프로덕션 환경 분리

### 사용 예시
```typescript
// Cursor/Claude에서 자연어로 요청
"사용자 테이블을 만들고 기본 RLS 정책을 설정해줘"
"댓글 기능을 위한 테이블 구조를 설계해줘"
"현재 데이터베이스 상태를 확인해줘"
```

---

## 💡 자주 묻는 질문 (FAQ)

### Q. Supabase 연결이 안 돼요!
- 환경변수(`.env.local`)에 올바른 URL/Key를 입력했는지 확인하세요.
- Supabase 프로젝트가 활성 상태인지 확인하세요.
- 네트워크/방화벽 문제도 점검해보세요.

### Q. MCP Server를 어떻게 활용하나요?
- Cursor/Claude에서 자연어로 데이터베이스 작업을 요청하세요.
- 스키마 생성, 테이블 관리, 마이그레이션이 AI로 자동화됩니다.
- 복잡한 SQL 작성 없이도 데이터베이스 구조를 설계할 수 있습니다.

### Q. UI가 깨지거나 스타일이 적용되지 않아요!
- TailwindCSS 4.0이 정상적으로 설치/적용되었는지 확인하세요.
- `src/app/globals.css`가 App Router에 import되어 있는지 확인하세요.

### Q. 컴포넌트/훅/스키마를 추가할 때 규칙은?
- **컴포넌트**: `PascalCase.tsx` (예: `UserProfile.tsx`)
- **훅**: `useCamelCase.ts` (예: `useUserProfile.ts`)
- **스키마**: `kebab-case-schema.ts` (예: `user-schema.ts`)
- **Server Action**: `kebab-case.ts` (예: `create-user.ts`)

---

## 🧑‍💻 템플릿 철학 (AXIOM Protocol)

- **예측 가능성**: 모든 규칙은 AI/사람 모두가 100% 예측 가능하도록 설계
- **일관성**: 폴더/파일/코드/상태/타입/보안/UX까지 완벽한 일관성
- **확장성**: 실무/교육/사이드 프로젝트 모두에 적합, 중급 이상으로도 바로 확장 가능
- **AI 친화적**: Supabase MCP Server와 완벽 통합, AI 기반 개발 워크플로우
- **초보자 친화**: 단계별 온보딩, 명확한 예시, 실전 팁, FAQ, 트러블슈팅까지 제공

---

## 🏆 추천 사용 시나리오

- **AI 기반 개발**: Cursor/Claude와 함께 빠른 프로토타입 개발
- **스타트업/1인 개발자**: 복잡한 설정 없이 바로 시작하는 풀스택 개발
- **교육/학습**: 최신 Next.js/React/Supabase 실전 패턴 학습
- **사이드 프로젝트**: 빠른 MVP 개발 및 배포

---

## 🚀 Supabase MCP Server 장점

### 기존 방식 vs MCP Server
| 구분 | 기존 방식 | MCP Server |
|------|----------|------------|
| 스키마 관리 | 수동 SQL 작성 | AI 자동 생성 |
| 마이그레이션 | 복잡한 스크립트 | 자연어 명령 |
| 보안 정책 | 수동 RLS 설정 | AI 기반 자동화 |
| 개발 속도 | 느림 | 10배 빠름 |
| 학습 곡선 | 높음 | 낮음 |

### 실제 사용 예시
```typescript
// 기존 방식 (복잡)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);

// MCP Server 방식 (간단)
"사용자 테이블을 만들고 기본 보안 정책을 설정해줘"
```

---

## 🆘 트러블슈팅 & 도움말

- **문서**: `/docs/get-started`에서 단계별 가이드 확인
- **이슈**: GitHub Issues에 질문/버그/개선 요청 등록
- **커뮤니티**: Supabase, Next.js, Shadcn/UI 공식 Discord/Slack 등 활용
- **MCP Server**: Cursor/Claude에서 직접 도움 요청

---

## 📜 라이선스

MIT License

---

> **AI와 함께하는 새로운 개발 경험을 시작해보세요!** 
> **문의/기여/피드백은 언제든 환영합니다!** 