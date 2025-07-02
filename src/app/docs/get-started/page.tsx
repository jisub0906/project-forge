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
          Project Forge로 멀티 프로젝트 개발을 시작해보세요
        </p>
      </div>

      {/* 진행 상황 표시 */}
      <div className="mb-8 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {step}
              </div>
              {step < 4 && (
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
            <h2 className="text-xl font-semibold">프로젝트 설정 (30초)</h2>
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
                <div className="font-mono">NEXT_PUBLIC_SUPABASE_SCHEMA=main</div>
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
              Supabase 대시보드에서 URL과 Key를 복사하세요
            </div>
          </div>
        </section>

        {/* 3단계 */}
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              3
            </div>
            <h2 className="text-xl font-semibold">스키마 생성 및 초기화 (1분)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Supabase 대시보드에서 <b>스키마를 먼저 생성</b>한 뒤, 아래 CLI 명령어로 초기화 및 상태를 확인하세요.
            </p>
            <div className="rounded-md bg-muted p-4 font-mono text-sm">
              <div className="mb-2 text-xs text-muted-foreground">1. Supabase 대시보드에서 스키마 생성</div>
              <div className="space-y-1">
                <div className="text-green-600"># SQL Editor에서 실행</div>
                <div>CREATE SCHEMA IF NOT EXISTS &quot;main&quot;;</div>
              </div>
            </div>
            <div className="rounded-md bg-muted p-4 font-mono text-sm">
              <div className="mb-2 text-xs text-muted-foreground">2. CLI 명령어로 초기화 및 상태 확인</div>
              <div className="space-y-2">
                <div>
                  <span className="font-mono text-green-700">pnpm run schema:init</span>
                  <span className="ml-2 text-muted-foreground">현재 프로젝트 스키마를 초기화</span>
                </div>
                <div>
                  <span className="font-mono text-blue-700">pnpm run schema:list</span>
                  <span className="ml-2 text-muted-foreground">모든 커스텀 스키마 목록 조회</span>
                </div>
                <div>
                  <span className="font-mono text-purple-700">pnpm run schema:info</span>
                  <span className="ml-2 text-muted-foreground">현재 스키마 상세 정보 조회</span>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-card p-4 font-mono text-xs text-muted-foreground">
              <div># 기타 스키마 관리 예시</div>
              <div className="text-emerald-700">pnpm run schema:create client_samsung</div>
              <div className="text-red-700">pnpm run schema:drop old_project</div>
              <div className="text-purple-700">pnpm run schema:info main</div>
            </div>
            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950 mt-2">
              <div className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-blue-600 dark:text-blue-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm">
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    중요:
                  </div>
                  <div className="text-blue-800 dark:text-blue-200">
                    스키마를 먼저 생성하지 않으면 CLI 명령어가 실패할 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4단계 */}
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              4
            </div>
            <h2 className="text-xl font-semibold">개발 서버 실행 (30초)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              개발 서버를 시작하고 브라우저에서 확인합니다.
            </p>
            <div className="rounded-md bg-muted p-4 font-mono text-sm">
              <div className="mb-2 text-xs text-muted-foreground">개발 서버 시작:</div>
              <div className="space-y-2">
                <div>pnpm dev</div>
                <div className="text-green-600"># 브라우저에서 확인</div>
                <div>open http://localhost:3000</div>
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
                  🎉 완료! 스키마 분리 기능이 활성화된 멀티 프로젝트 환경이 준비되었습니다.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 다음 단계 */}
      <section className="mt-12 rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">다음 단계</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/docs/advanced"
            className="flex items-center gap-3 rounded-md border p-4 transition-colors hover:bg-accent"
          >
            <span className="font-bold text-primary">고급 사용법</span>
            <span className="text-sm text-muted-foreground">CLI 도구와 마이그레이션 관리</span>
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
            <span className="font-bold text-red-600">스키마를 찾을 수 없습니다</span>
            <span className="text-muted-foreground">→ Supabase 대시보드에서 스키마 생성 후 <code className="rounded bg-muted px-1">pnpm run schema:init</code> 실행</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-yellow-600">환경변수 오류</span>
            <span className="text-muted-foreground">→ <code className="rounded bg-muted px-1">.env.local</code> 파일의 모든 필수 변수 확인</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-blue-600">빌드 실패</span>
            <span className="text-muted-foreground">→ <code className="rounded bg-muted px-1">rm -rf node_modules pnpm-lock.yaml &amp;&amp; pnpm install</code> 실행</span>
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