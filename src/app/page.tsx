import Link from "next/link";
import { Database, BookOpen, Zap, Shield, Users, DollarSign, Code2, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* 히어로 섹션 */}
      <header className="container mx-auto px-6 py-12 text-center">
        <div className="mx-auto max-w-3xl">
          <Badge variant="secondary" className="mb-4">2025 Template · Next.js 15 · Supabase · TailwindCSS 4</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Project Forge <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">2025 Template</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            멀티 프로젝트, 비용 90% 절감, 실전 온보딩까지<br />
            <span className="font-semibold text-primary">초보자도 실수 없이 시작하는 완벽한 웹앱 템플릿</span>
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/docs/get-started">
                <BookOpen className="mr-2 h-5 w-5" />
                5분만에 시작하기
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/jisub0906/project-forge">
                <Code2 className="mr-2 h-5 w-5" />
                GitHub 보기
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 템플릿 구조/철학 요약 */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">템플릿 구조 & 철학</h2>
          <p className="text-muted-foreground">폴더 구조, 명명 규칙, 타입/상태/보안까지 실전 원칙을 모두 내장</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>폴더 구조</CardTitle>
              <CardDescription>실전/교육/확장 모두 OK</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted rounded p-3 overflow-x-auto">
{`src/
├── app/         # Next.js App Router
├── components/  # UI, Provider, Common
├── hooks/       # 커스텀 훅
├── lib/         # Supabase, env, 스키마, 유틸
│   └── schemas/ # Zod 스키마
`}
              </pre>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>핵심 원칙</CardTitle>
              <CardDescription>AXIOM Protocol</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>단일 책임 원칙</li>
                <li>Zod-First 타입</li>
                <li>상태 분류(로컬/전역/서버/URL)</li>
                <li>보안/스키마 분리</li>
                <li>UI/UX 일관성</li>
                <li>실전 온보딩</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>실전 적용법</CardTitle>
              <CardDescription>누구나 실수 없이 확장</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>컴포넌트: <span className="font-mono">PascalCase.tsx</span></li>
                <li>훅: <span className="font-mono">useCamelCase.ts</span></li>
                <li>스키마: <span className="font-mono">kebab-case-schema.ts</span></li>
                <li>Server Action: <span className="font-mono">kebab-case.ts</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 주요 기능/강점 */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">주요 기능 & 강점</h2>
          <p className="text-muted-foreground">실무에서 바로 통하는 기능과 보안, 비용 절감까지</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-2">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>스키마 자동 주입</CardTitle>
              <CardDescription>환경변수만 바꿔도 프로젝트별 데이터 완전 분리</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded bg-muted p-2 text-xs font-mono">supabase.from('users').select('*')<br /><span className="text-muted-foreground">// → 자동으로 current_schema.users</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 mb-2">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>비용 90% 절감</CardTitle>
              <CardDescription>하나의 Supabase로 무제한 프로젝트 운영</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs">기존 3개 프로젝트 → <span className="text-red-600">$75/월</span><br />Project Forge → <span className="text-green-600">$25/월</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 mb-2">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>완전 데이터 격리</CardTitle>
              <CardDescription>RLS 보안 정책 자동 적용, 권한 기반 접근 제어</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>스키마별 완전 분리</li>
                <li>RLS 정책 자동 적용</li>
                <li>권한 기반 접근 제어</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900 mb-2">
                <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>최신 기술 스택</CardTitle>
              <CardDescription>Next.js 15, React 19, TailwindCSS 4, Shadcn/UI, Framer Motion</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>App Router, Server Actions</li>
                <li>Strict TypeScript</li>
                <li>실전 디자인 시스템</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900 mb-2">
                <Users className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <CardTitle>실전 온보딩</CardTitle>
              <CardDescription>누구나 따라할 수 있는 단계별 가이드 & FAQ</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="sm" className="w-full">
                <Link href="/docs/get-started">
                  3분 시작 가이드 바로가기
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 mb-2">
                <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <CardTitle>실무형 CLI/마이그레이션</CardTitle>
              <CardDescription>스키마 생성/초기화/조회/삭제까지 자동화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs font-mono">pnpm run schema:init<br />pnpm run schema:list<br />pnpm run schema:create &lt;name&gt;</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 실전 온보딩 요약 */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">1분만에 시작하기</h2>
          <p className="text-muted-foreground">클론 → 설치 → 환경 → 스키마 → 실행, 5단계로 끝!</p>
        </div>
        <ol className="mx-auto max-w-2xl space-y-2 text-sm list-decimal pl-6">
          <li>프로젝트 클론: <span className="font-mono">git clone ...</span></li>
          <li>의존성 설치: <span className="font-mono">pnpm install</span></li>
          <li>환경변수 설정: <span className="font-mono">cp .env.example .env.local</span></li>
          <li>스키마 생성/초기화: <span className="font-mono">CREATE SCHEMA ...</span>, <span className="font-mono">pnpm run schema:init</span></li>
          <li>개발 서버 실행: <span className="font-mono">pnpm dev</span></li>
        </ol>
        <div className="mt-4 text-center">
          <Button asChild size="lg">
            <Link href="/docs/get-started">
              자세한 온보딩 가이드 보기
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQ/트러블슈팅 */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">FAQ & 트러블슈팅</h2>
          <p className="text-muted-foreground">실전에서 자주 만나는 문제, 바로 해결!</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900 mb-2">
                <HelpCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle>Supabase 연결 오류</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>.env.local의 URL/Key/스키마명 확인</li>
                <li>스키마를 먼저 생성했는지 확인</li>
                <li>네트워크/방화벽 점검</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900 mb-2">
                <HelpCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle>스키마 초기화 실패</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>Supabase SQL Editor에서 CREATE SCHEMA 실행</li>
                <li>환경변수의 스키마명이 실제로 존재하는지 확인</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-2">
                <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>UI/스타일 문제</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>TailwindCSS 4.0 설치/적용 확인</li>
                <li>globals.css가 App Router에 import되어 있는지 확인</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="sm" variant="outline">
            <Link href="/docs/get-started">문서에서 더 많은 문제 해결 보기</Link>
          </Button>
        </div>
      </section>

      {/* 커뮤니티/문의/기여 안내 */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="mb-2 text-2xl font-bold">문의 · 기여 · 커뮤니티</h2>
        <p className="mb-4 text-muted-foreground">오픈소스 협업, 피드백, 질문 모두 환영합니다!</p>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <Button asChild variant="outline">
            <Link href="https://github.com/jisub0906/project-forge/issues">GitHub 이슈 남기기</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://supabase.com/docs">Supabase 공식 문서</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://ui.shadcn.com/">Shadcn/UI 공식 문서</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
