import Link from "next/link";
import { ArrowRight, Database, Shield, Zap, Users, DollarSign, Code2, Settings, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* 헤더 */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Database className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Project Forge</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/docs/get-started" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              문서
            </Link>
            <Button asChild>
              <Link href="/docs/get-started">
                시작하기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* 메인 히어로 섹션 */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            🎯 Next.js 15 + Supabase 스키마 분리
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            하나의 Supabase로{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              무제한 프로젝트
            </span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            스키마 자동 주입 시스템으로 프로젝트별 완전 데이터 격리 + 비용 90% 절감
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/docs/get-started">
                <BookOpen className="mr-2 h-5 w-5" />
                5분만에 시작하기
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/your-repo/project-forge">
                <Code2 className="mr-2 h-5 w-5" />
                GitHub 보기
              </Link>
            </Button>
          </div>
        </div>

        {/* 비용 비교 카드 */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <CardHeader>
                <CardTitle className="text-red-900 dark:text-red-100">❌ 기존 방식</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-200">
                  프로젝트마다 별도 Supabase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-red-800 dark:text-red-200">
                  <div>프로젝트A → $25/월</div>
                  <div>프로젝트B → $25/월</div>
                  <div>프로젝트C → $25/월</div>
                  <div className="border-t border-red-300 pt-2 font-bold">
                    총 비용: $75/월 💸
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="text-green-900 dark:text-green-100">✅ Project Forge</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-200">
                  하나의 Supabase + 스키마 분리
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                  <div>프로젝트A → $25/월</div>
                  <div>프로젝트B → 무료! 🎉</div>
                  <div>프로젝트C → 무료! 🎉</div>
                  <div className="border-t border-green-300 pt-2 font-bold">
                    총 비용: $25/월 (90% 절감)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 주요 특징 */}
      <section className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">왜 Project Forge인가요?</h2>
          <p className="text-lg text-muted-foreground">
            개발 생산성과 비용 효율성을 동시에 달성하는 스키마 분리 시스템
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>스키마 자동 주입</CardTitle>
              <CardDescription>
                코드 수정 없이 환경변수만으로 프로젝트별 스키마 자동 적용
              </CardDescription>
            </CardHeader>
            <CardContent>
                             <div className="rounded-md bg-muted p-3 font-mono text-sm">
                 <div className="text-green-600">{`// 기존 코드 그대로!`}</div>
                 <div>{`supabase.from('users').select('*')`}</div>
                 <div className="text-muted-foreground">{`// 자동으로 current_schema.users`}</div>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>비용 90% 절감</CardTitle>
              <CardDescription>
                하나의 Supabase 인스턴스로 무제한 프로젝트 운영
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>기존 3개 프로젝트</span>
                  <span className="text-red-600">$75/월</span>
                </div>
                <div className="flex justify-between">
                  <span>Project Forge</span>
                  <span className="text-green-600">$25/월</span>
                </div>
                <div className="border-t pt-2 font-bold text-green-600">
                  연간 $600 절약!
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>완전 데이터 격리</CardTitle>
              <CardDescription>
                프로젝트간 데이터 혼재 방지 + RLS 보안 정책 자동 적용
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>스키마별 완전 분리</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>RLS 정책 자동 적용</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>권한 기반 접근 제어</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>최신 기술 스택</CardTitle>
              <CardDescription>
                Next.js 15 + React 19 + TypeScript + TailwindCSS 4.0
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <Badge variant="secondary">Next.js 15.3.4</Badge>
                <Badge variant="secondary">React 19</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">TailwindCSS 4.0</Badge>
                <Badge variant="secondary">Shadcn/UI</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900">
                <Settings className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle>CLI 관리 도구</CardTitle>
              <CardDescription>
                스키마 생성, 삭제, 목록 조회를 위한 직관적인 CLI 도구
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-3 font-mono text-xs">
                <div>pnpm run schema:list</div>
                <div>pnpm run schema:create client_a</div>
                <div>pnpm run schema:drop old_project</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>멀티 프로젝트 지원</CardTitle>
              <CardDescription>
                개발/스테이징/프로덕션 환경별 독립 스키마 관리
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                <div className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-900">
                  client_samsung_dev
                </div>
                <div className="rounded bg-yellow-100 px-2 py-1 dark:bg-yellow-900">
                  client_samsung_staging
                </div>
                <div className="rounded bg-green-100 px-2 py-1 dark:bg-green-900">
                  client_samsung_prod
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 실제 사용 예시 */}
      <section className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">실제 사용 예시</h2>
          <p className="text-lg text-muted-foreground">
            하나의 Supabase로 여러 프로젝트를 어떻게 관리하는지 확인해보세요
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 구조 예시</CardTitle>
              <CardDescription>
                실제 개발 환경에서 사용하는 스키마 분리 구조
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-blue-600">회사 프로젝트들</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">ecommerce_main</Badge>
                      <span className="text-muted-foreground">이커머스 플랫폼</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">admin_panel</Badge>
                      <span className="text-muted-foreground">관리자 대시보드</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">mobile_backend</Badge>
                      <span className="text-muted-foreground">모바일 앱 API</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">analytics_db</Badge>
                      <span className="text-muted-foreground">분석 도구</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-3 font-semibold text-green-600">고객별 프로젝트들</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">samsung_portal</Badge>
                      <span className="text-muted-foreground">삼성 포털</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">lg_system</Badge>
                      <span className="text-muted-foreground">LG 시스템</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">kakao_service</Badge>
                      <span className="text-muted-foreground">카카오 서비스</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">지금 시작해보세요!</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            5분만에 설정 완료하고 바로 멀티 프로젝트 개발을 시작할 수 있습니다
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/docs/get-started">
                <BookOpen className="mr-2 h-5 w-5" />
                빠른 시작 가이드
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/your-repo/project-forge">
                GitHub에서 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-primary" />
              <span className="font-semibold">Project Forge</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/docs/get-started" className="hover:text-foreground">
                문서
              </Link>
              <Link href="https://github.com/your-repo/project-forge" className="hover:text-foreground">
                GitHub
              </Link>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
