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

# 4. 개발 서버 실행 (Turbopack 사용)
$ pnpm dev
```

---

## 🧭 템플릿 구조 & 철학 요약

### 📁 **폴더 구조**
```
src/
├── app/                    # Next.js 15 App Router
│   ├── globals.css        # TailwindCSS 4.0 설정
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── docs/              # 문서 페이지
├── components/
│   ├── ui/                # Shadcn/UI 컴포넌트 (수정 금지)
│   ├── auth/              # 인증 관련 컴포넌트
│   ├── providers/         # Context 프로바이더
│   └── common/            # 공통 컴포넌트
├── hooks/                 # 커스텀 훅 (use- 접두사)
├── lib/                   # 핵심 라이브러리
│   ├── schemas/           # Zod 스키마 정의
│   ├── client.ts          # 클라이언트 Supabase
│   ├── server.ts          # 서버 Supabase
│   ├── env.ts             # 환경변수 검증
│   └── utils.ts           # 유틸리티 함수
└── middleware.ts          # Next.js 미들웨어
```

### 🎯 **핵심 원칙**
1. **단일 책임 원칙**: 하나의 파일은 하나의 역할만 수행
2. **Zod-First 타입**: 모든 타입은 Zod 스키마에서 추론
3. **상태 분류**: URL/로컬/전역/서버 상태를 명확히 구분
4. **Supabase 올인원**: 인증, DB, 스토리지, 실시간 모든 기능 활용
5. **UI/UX 일관성**: Shadcn/UI + TailwindCSS 4.0 + Framer Motion
6. **초보자 친화**: 복잡한 설정 없이 바로 시작 가능

---

## 🛠️ 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 (Turbopack) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 프로덕션 서버 실행 |
| `pnpm lint` | ESLint 검사 |
| `pnpm type-check` | TypeScript 타입 검사 |
| `pnpm validate` | 전체 검증 (타입+린트+빌드) |

---

## 🤖 Supabase MCP Server 활용

이 템플릿은 **Supabase MCP Server**와 완벽하게 통합되어 있습니다:

### 🚀 **주요 기능**
- **AI 기반 데이터베이스 관리**: 스키마 생성, 테이블 관리, 마이그레이션
- **실시간 개발 지원**: Cursor/Claude에서 직접 DB 작업 가능
- **보안 정책 자동화**: RLS 정책 생성 및 관리
- **올인원 백엔드**: 인증, DB, 스토리지, 실시간, 이메일 모든 기능

### 💡 **사용 예시**
```typescript
// Cursor/Claude에서 자연어로 요청
"사용자 테이블을 만들고 기본 RLS 정책을 설정해줘"
"블로그 포스트 테이블 구조를 설계해줘"
"현재 데이터베이스 상태를 확인해줘"
"댓글 기능을 추가해줘"
```

---

## 📚 온보딩 & 문서

- **🏠 홈페이지**: 프로젝트 소개 및 주요 기능 안내
- **📖 가이드**: `/docs/get-started`에서 3단계 온보딩
- **💡 코드 주석**: 주요 파일마다 실전 팁과 사용법 제공
- **🔧 설정 가이드**: 환경변수부터 배포까지 단계별 안내

---

## 🎉 Supabase 올인원 장점

### 기존 방식 vs Supabase 올인원
| 구분 | 기존 방식 | Supabase 올인원 |
|------|----------|----------------|
| 백엔드 설정 | 복잡한 서버 구성 | 즉시 사용 가능 |
| 인증 시스템 | 직접 구현 | 내장 Auth |
| 데이터베이스 | 별도 설정 | PostgreSQL 제공 |
| 실시간 기능 | WebSocket 구현 | Realtime 내장 |
| 파일 업로드 | 스토리지 서비스 | Storage 내장 |
| 이메일 발송 | 외부 서비스 | Auth Email 내장 |
| 개발 속도 | 느림 | 10배 빠름 |
| 학습 곡선 | 높음 | 낮음 |

### 🔥 **실제 사용 예시**
```typescript
// 기존 방식 (복잡)
- 백엔드 서버 구축
- 데이터베이스 설정
- 인증 시스템 구현
- API 엔드포인트 작성
- 보안 정책 설정

// Supabase 올인원 (간단)
const supabase = createClient();
const { data } = await supabase.from('users').select('*');
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
- TailwindCSS 4.0이 정상적으로 설치되었는지 확인하세요.
- `src/app/globals.css`가 올바르게 import되어 있는지 확인하세요.
- 개발 서버를 재시작해보세요.

### Q. 컴포넌트/훅/스키마를 추가할 때 규칙은?
- **컴포넌트**: `PascalCase.tsx` (예: `UserProfile.tsx`)
- **훅**: `useCamelCase.ts` (예: `useUserProfile.ts`)
- **스키마**: `kebab-case.ts` (예: `auth.ts`)
- **Server Action**: `kebab-case.ts` (예: `create-user.ts`)

### Q. 인증 시스템은 어떻게 구현하나요?
- Supabase Auth를 사용하여 간단히 구현 가능합니다.
- 이메일/비밀번호, 소셜 로그인, 매직 링크 모두 지원합니다.
- 기본 인증 컴포넌트가 `src/components/auth/`에 준비되어 있습니다.

---

## 🧑‍💻 템플릿 철학 (AXIOM Protocol)

- **🎯 예측 가능성**: 모든 규칙은 AI/사람 모두가 100% 예측 가능하도록 설계
- **🔄 일관성**: 폴더/파일/코드/상태/타입/보안/UX까지 완벽한 일관성
- **📈 확장성**: 실무/교육/사이드 프로젝트 모두에 적합
- **🤖 AI 친화적**: Supabase MCP Server와 완벽 통합
- **👶 초보자 친화**: 단계별 온보딩, 명확한 예시, 실전 팁 제공

---

## 🏆 추천 사용 시나리오

- **🚀 AI 기반 개발**: Cursor/Claude와 함께 빠른 프로토타입 개발
- **💼 스타트업/1인 개발자**: 복잡한 설정 없이 바로 시작하는 풀스택 개발
- **📚 교육/학습**: 최신 Next.js/React/Supabase 실전 패턴 학습
- **🎨 사이드 프로젝트**: 빠른 MVP 개발 및 배포
- **🏢 기업 프로젝트**: 검증된 패턴으로 안정적인 개발

---

## 🔧 기술 스택 상세

### **Frontend**
- **Next.js 15.3.4**: App Router, Server Components, Turbopack
- **React 19**: 최신 훅, Suspense, Concurrent Features
- **TypeScript**: Strict 모드, 완전한 타입 안전성
- **TailwindCSS 4.0**: @theme inline, oklch 색상 시스템
- **Shadcn/UI**: Radix 기반 고품질 컴포넌트
- **Framer Motion**: 부드러운 애니메이션

### **Backend & Database**
- **Supabase**: PostgreSQL, Auth, Storage, Realtime, Edge Functions
- **Zod**: 런타임 타입 검증 및 스키마 정의
- **TanStack Query**: 서버 상태 관리 및 캐싱
- **Zustand**: 클라이언트 상태 관리

### **Development Tools**
- **ESLint**: 코드 품질 관리
- **TypeScript**: 컴파일 타임 타입 검사
- **Turbopack**: 빠른 개발 서버
- **Supabase MCP Server**: AI 기반 데이터베이스 관리

---

## 🆘 트러블슈팅 & 도움말

- **📖 문서**: `/docs/get-started`에서 단계별 가이드 확인
- **🐛 이슈**: GitHub Issues에 질문/버그/개선 요청 등록
- **💬 커뮤니티**: Supabase, Next.js, Shadcn/UI 공식 커뮤니티 활용
- **🤖 MCP Server**: Cursor/Claude에서 직접 도움 요청

---

## 📜 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

---

## 🙏 기여하기

프로젝트 개선에 기여해주세요!

1. **Fork** 이 저장소
2. **Feature branch** 생성 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항 (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

---

> **🚀 AI와 함께하는 새로운 개발 경험을 시작해보세요!**  
> **💬 문의/기여/피드백은 언제든 환영합니다!** 