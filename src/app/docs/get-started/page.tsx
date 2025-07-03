import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function GetStartedPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-12">
      {/* 헤더 */}
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">온보딩 가이드</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          3분 시작 가이드
        </h1>
        <p className="text-lg text-muted-foreground">
          Project Forge로 AI 기반 풀스택 개발을 시작해보세요
        </p>
      </div>

      {/* 진행 상황 표시 */}
      <div className="mb-8 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {step}
              </div>
              {step < 3 && (
                <div className="mx-2 h-0.5 w-8 bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 단계별 가이드 */}
      <div className="space-y-8">
        {/* 1단계 */}
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              1
            </div>
            <h2 className="text-xl font-semibold">프로젝트 설정 (1분)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              프로젝트를 클론하고 의존성을 설치합니다.
            </p>
            <div className="rounded-md bg-muted p-4 font-mono text-sm">
              <div className="mb-2 text-xs text-muted-foreground">터미널에서 실행:</div>
              <div className="space-y-2">
                <div className="text-green-600"># 프로젝트 클론</div>
                <div>git clone &lt;https://github.com/jisub0906/project-forge.git&gt;</div>
                <div>cd project-forge</div>
                <div className="text-green-600"># 의존성 설치</div>
                <div>pnpm install</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9 12.75L4.75 8.5 3.5 9.75l5.5 5.5 11-11L18.75 3 9 12.75z"
                  clipRule="evenodd"
                />
              </svg>
              완료되면 다음 단계로 진행하세요
            </div>
          </div>
        </section>

        {/* 2단계 */}
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              2
            </div>
            <h2 className="text-xl font-semibold">환경변수 설정 (1분)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Supabase 연결을 위한 환경변수를 설정합니다.
            </p>
            <div className="rounded-md bg-muted p-4 font-mono text-sm">
              <div className="mb-2 text-xs text-muted-foreground">환경변수 파일 생성:</div>
              <div className="space-y-2">
                <div>cp .env.example .env.local</div>
                <div className="text-green-600"># .env.local 파일 편집</div>
                <div>nano .env.local</div>
              </div>
            </div>
            <div className="rounded-md bg-muted p-4">
              <div className="mb-2 text-xs text-muted-foreground">필수 환경변수:</div>
              <div className="space-y-1 text-sm">
                <div className="font-mono">NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</div>
                <div className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</div>
                <div className="font-mono">SUPABASE_SERVICE_ROLE_KEY=your_service_role_key</div>
              </div>
            </div>
            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
              <div className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-blue-600 dark:text-blue-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm">
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    💡 팁:
                  </div>
                  <div className="text-blue-800 dark:text-blue-200">
                    Supabase 대시보드에서 Settings → API에서 URL과 Key를 복사하세요
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3단계 */}
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              3
            </div>
            <h2 className="text-xl font-semibold">개발 서버 실행 & AI 활용 (1분)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              개발 서버를 시작하고 Supabase MCP Server로 AI 기반 개발을 시작합니다.
            </p>
            <div className="rounded-md bg-muted p-4 font-mono text-sm">
              <div className="mb-2 text-xs text-muted-foreground">개발 서버 시작:</div>
              <div className="space-y-2">
                <div>pnpm dev</div>
                <div className="text-green-600"># 브라우저에서 확인</div>
                <div>open http://localhost:3000</div>
              </div>
            </div>
            <div className="rounded-md bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-950 dark:to-purple-950">
              <div className="mb-2 text-sm font-medium text-blue-900 dark:text-blue-100">
                🤖 AI와 함께 개발하기
              </div>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <div>이제 Cursor/Claude에서 자연어로 데이터베이스를 관리할 수 있습니다:</div>
                <div className="ml-4 space-y-1 font-mono text-xs">
                  <div>"사용자 테이블을 만들어줘"</div>
                  <div>"블로그 시스템을 설계해줘"</div>
                  <div>"RLS 보안 정책을 설정해줘"</div>
                  <div>"현재 데이터베이스 상태를 확인해줘"</div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-green-50 p-4 dark:bg-green-950">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-green-600 dark:text-green-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 12.75L4.75 8.5 3.5 9.75l5.5 5.5 11-11L18.75 3 9 12.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm font-medium text-green-900 dark:text-green-100">
                  🎉 완료! AI와 함께하는 10배 빠른 풀스택 개발 환경이 준비되었습니다.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MCP Server 활용 가이드 */}
      <section className="mt-12 rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">🚀 Supabase MCP Server 활용 가이드</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">데이터베이스 관리</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 테이블 생성 및 스키마 설계</li>
              <li>• 관계형 데이터베이스 구조 설정</li>
              <li>• 인덱스 및 제약조건 관리</li>
              <li>• 마이그레이션 자동화</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-primary">보안 및 권한</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• RLS(Row Level Security) 정책 설정</li>
              <li>• 사용자 권한 관리</li>
              <li>• 인증 및 인가 시스템</li>
              <li>• 보안 취약점 자동 탐지</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 다음 단계 */}
      <section className="mt-12 rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">다음 단계</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/docs/mcp-guide"
            className="flex items-center gap-3 rounded-md border p-4 transition-colors hover:bg-accent"
          >
            <span className="font-bold text-primary">MCP Server 완전 활용법</span>
            <span className="text-sm text-muted-foreground">AI 기반 데이터베이스 관리 마스터</span>
          </Link>
          <Link
            href="/docs/deployment"
            className="flex items-center gap-3 rounded-md border p-4 transition-colors hover:bg-accent"
          >
            <span className="font-bold text-primary">배포 가이드</span>
            <span className="text-sm text-muted-foreground">Vercel, Netlify 배포 방법</span>
          </Link>
        </div>
      </section>

      {/* 문제 해결 */}
      <section className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">문제가 있나요?</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-red-600">MCP Server 연결 안됨</span>
            <span className="text-muted-foreground">→ Cursor/Claude에서 Supabase MCP 도구가 활성화되었는지 확인</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-yellow-600">환경변수 오류</span>
            <span className="text-muted-foreground">→ <code className="rounded bg-muted px-1">.env.local</code> 파일의 모든 필수 변수 확인</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-blue-600">AI 명령어 작동 안함</span>
            <span className="text-muted-foreground">→ 자연어로 명확하게 요청하세요. 예: "사용자 테이블을 만들어줘"</span>
          </div>
        </div>
      </section>

      {/* 홈으로 돌아가기 */}
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors hover:bg-accent"
          >
            홈으로 돌아가기
          </Link>
        </Button>
      </div>
    </main>
  );
} 