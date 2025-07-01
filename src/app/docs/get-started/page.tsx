import Link from "next/link";

export default function GetStartedPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-12">
      {/* 헤더 */}
      <div className="mb-12 text-center">
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
        <div className="rounded-lg border bg-card p-6">
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
                <div>git clone &lt;your-repo-url&gt;</div>
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
        </div>

        {/* 2단계 */}
        <div className="rounded-lg border bg-card p-6">
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
        </div>

        {/* 3단계 */}
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              3
            </div>
            <h2 className="text-xl font-semibold">스키마 초기화 (1분)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Supabase에서 스키마를 생성하고 초기화합니다.
            </p>
            <div className="rounded-md bg-muted p-4 font-mono text-sm">
              <div className="mb-2 text-xs text-muted-foreground">CLI 명령어:</div>
              <div className="space-y-2">
                <div className="text-green-600"># 스키마 초기화</div>
                <div>pnpm run schema:init</div>
                <div className="text-green-600"># 스키마 목록 확인</div>
                <div>pnpm run schema:list</div>
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
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm">
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    중요:
                  </div>
                  <div className="text-blue-800 dark:text-blue-200">
                    Supabase 대시보드에서 먼저 스키마를 생성한 후 명령어를 실행하세요.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4단계 */}
        <div className="rounded-lg border bg-card p-6">
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
        </div>
      </div>

      {/* 다음 단계 */}
      <div className="mt-12 rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">다음 단계</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/docs/advanced"
            className="flex items-center gap-3 rounded-md border p-4 transition-colors hover:bg-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-primary"
            >
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
            <div>
              <div className="font-medium">고급 사용법</div>
              <div className="text-sm text-muted-foreground">
                CLI 도구와 마이그레이션 관리
              </div>
            </div>
          </Link>
          <Link
            href="/docs/deployment"
            className="flex items-center gap-3 rounded-md border p-4 transition-colors hover:bg-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
            <div>
              <div className="font-medium">배포 가이드</div>
              <div className="text-sm text-muted-foreground">
                Vercel, Netlify 배포 방법
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 문제 해결 */}
      <div className="mt-8 rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">문제가 있나요?</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-muted-foreground"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-muted-foreground">
              스키마를 찾을 수 없습니다 → Supabase 대시보드에서 스키마 생성 후{" "}
              <code className="rounded bg-muted px-1">pnpm run schema:init</code> 실행
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-muted-foreground"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-muted-foreground">
              환경변수 오류 → <code className="rounded bg-muted px-1">.env.local</code> 파일의 모든 필수 변수 확인
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-muted-foreground"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-muted-foreground">
              빌드 실패 → <code className="rounded bg-muted px-1">rm -rf node_modules pnpm-lock.yaml && pnpm install</code> 실행
            </span>
          </div>
        </div>
      </div>

      {/* 홈으로 돌아가기 */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
} 