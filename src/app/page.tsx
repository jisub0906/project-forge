import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-20 text-center">
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-12 w-12"
          fill="none"
        >
          <circle cx="16" cy="16" r="15" fill="currentColor" className="text-primary"/>
          <path
            d="M8 8h4l8 12V8h4v16h-4L12 12v12H8V8z"
            fill="white"
          />
          <circle cx="24" cy="24" r="3" fill="#3ECF8E"/>
        </svg>
        <span className="text-2xl font-bold">Project Forge</span>
      </div>
      <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
        Supabase 멀티 프로젝트 <br className="hidden sm:inline" /> 템플릿
      </h1>
      <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
        하나의 Supabase 인스턴스로 무제한 프로젝트를 운영하고 비용은 최대
        <span className="font-semibold text-primary"> 90% 절감</span>하세요.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="https://github.com/jisub0906/project-forge"
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          GitHub에서 보기
        </Link>
        <Link
          href="/docs/get-started"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          3분 시작 가이드
        </Link>
      </div>
      <ul className="grid max-w-3xl grid-cols-1 gap-4 pt-10 sm:grid-cols-2">
        {[
          "스키마 자동 주입 시스템",
          "환경별 독립 스키마",
          "TailwindCSS 4 + Shadcn/UI",
          "React 19 & Server Actions",
          "자동 마이그레이션 CLI",
          "PWA & SEO 최적화",
        ].map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 rounded-md border p-4 text-sm shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-primary"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M9 12.75L4.75 8.5 3.5 9.75l5.5 5.5 11-11L18.75 3 9 12.75z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <footer className="mt-20 flex flex-col items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-6">
          <Link
            href="https://nextjs.org"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js 15
          </Link>
          <span>•</span>
          <Link
            href="https://supabase.com"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supabase
          </Link>
          <span>•</span>
          <Link
            href="https://tailwindcss.com"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            TailwindCSS 4
          </Link>
        </div>
        <p>© 2025 Project Forge. Built with modern web technologies.</p>
      </footer>
    </main>
  );
}
