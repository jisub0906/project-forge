import Link from "next/link";
import { Database, BookOpen, Zap, Shield, Users, Bot, Code2, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* 히어로 섹션 */}
      <header className="container mx-auto px-6 py-12 text-center">
        <div className="mx-auto max-w-3xl">
          <Badge variant="secondary" className="mb-4">2025 Template · Next.js 15 · Supabase MCP Server · TailwindCSS 4</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Project Forge <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">2025 Template</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            AI와 함께하는 새로운 개발 경험<br />
            <span className="font-semibold text-primary">Supabase MCP Server로 10배 빠른 풀스택 개발</span>
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/docs/get-started">
                <BookOpen className="mr-2 h-5 w-5" />
                3분만에 시작하기
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
          <h2 className="mb-2 text-2xl font-bold">AI 기반 개발 워크플로우</h2>
          <p className="text-muted-foreground">Supabase MCP Server와 완벽 통합된 차세대 개발 환경</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>자연어 데이터베이스 관리</CardTitle>
              <CardDescription>복잡한 SQL 없이 AI와 대화로</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs bg-muted rounded p-3 overflow-x-auto">
                <div className="text-blue-600 mb-1">👤 You:</div>
                <div className="mb-2">"사용자 테이블을 만들고 기본 RLS 정책을 설정해줘"</div>
                <div className="text-green-600 mb-1">🤖 AI:</div>
                <div>✅ 테이블 생성 완료<br />✅ 보안 정책 적용 완료</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>실시간 스키마 관리</CardTitle>
              <CardDescription>브랜치 기반 개발 환경</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>개발/스테이징/프로덕션 분리</li>
                <li>마이그레이션 자동화</li>
                <li>롤백 및 브랜치 관리</li>
                <li>실시간 스키마 동기화</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>완벽한 타입 안전성</CardTitle>
              <CardDescription>Zod + TypeScript + AI</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted rounded p-3 overflow-x-auto">
{`// AI가 자동 생성
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  created_at: z.date()
});

type User = z.infer<typeof userSchema>;`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 주요 기능/강점 */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">주요 기능 & 강점</h2>
          <p className="text-muted-foreground">AI와 함께하는 차세대 개발 경험</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-2">
                <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>AI 기반 데이터베이스</CardTitle>
              <CardDescription>자연어로 스키마 생성, 마이그레이션, 보안 정책 관리</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded bg-muted p-2 text-xs">
                <div className="text-blue-600 mb-1">"블로그 시스템을 만들어줘"</div>
                <div className="text-muted-foreground">→ posts, comments, users 테이블 자동 생성</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 mb-2">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>10배 빠른 개발</CardTitle>
              <CardDescription>복잡한 설정 없이 바로 시작하는 풀스택 개발</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>기존 방식</span>
                  <span className="text-red-600">2-3일</span>
                </div>
                <div className="flex justify-between">
                  <span>MCP Server</span>
                  <span className="text-green-600">30분</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 mb-2">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>자동화된 보안</CardTitle>
              <CardDescription>AI가 RLS 정책과 권한 관리를 자동으로 설정</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>RLS 정책 자동 생성</li>
                <li>권한 기반 접근 제어</li>
                <li>보안 취약점 자동 탐지</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900 mb-2">
                <Database className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>브랜치 기반 개발</CardTitle>
              <CardDescription>개발/스테이징/프로덕션 환경 완벽 분리</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>독립적인 개발 환경</li>
                <li>안전한 배포 파이프라인</li>
                <li>실시간 동기화</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900 mb-2">
                <Users className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <CardTitle>초보자 친화적</CardTitle>
              <CardDescription>복잡한 설정 없이 바로 시작</CardDescription>
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
              <CardTitle>최신 기술 스택</CardTitle>
              <CardDescription>Next.js 15, React 19, TailwindCSS 4, Shadcn/UI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1">
                <div>• App Router, Server Actions</div>
                <div>• Strict TypeScript</div>
                <div>• Framer Motion</div>
                <div>• 실전 디자인 시스템</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* MCP Server 비교 */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">기존 방식 vs MCP Server</h2>
          <p className="text-muted-foreground">개발 경험이 완전히 달라집니다</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">😰 기존 방식</CardTitle>
              <CardDescription>복잡하고 시간이 오래 걸리는 전통적인 개발</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>복잡한 SQL 직접 작성</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>수동 마이그레이션 관리</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>보안 정책 수동 설정</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>환경별 설정 복잡</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>높은 학습 곡선</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">🚀 MCP Server</CardTitle>
              <CardDescription>AI와 함께하는 차세대 개발 경험</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>자연어로 스키마 생성</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>AI 기반 마이그레이션</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>보안 정책 자동화</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>브랜치 기반 환경 관리</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>즉시 시작 가능</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 실전 온보딩 요약 */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">3분만에 시작하기</h2>
          <p className="text-muted-foreground">클론 → 설치 → 환경 → 실행, 4단계로 끝!</p>
        </div>
        <ol className="mx-auto max-w-2xl space-y-2 text-sm list-decimal pl-6">
          <li>프로젝트 클론: <span className="font-mono">git clone ...</span></li>
          <li>의존성 설치: <span className="font-mono">pnpm install</span></li>
          <li>환경변수 설정: <span className="font-mono">cp .env.example .env.local</span></li>
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
          <p className="text-muted-foreground">AI와 함께 개발하면서 자주 묻는 질문들</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-2">
                <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>MCP Server 연결 방법</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>Cursor/Claude에서 자동 연결</li>
                <li>환경변수 설정 확인</li>
                <li>Supabase 프로젝트 활성화</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 mb-2">
                <HelpCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>AI 명령어 사용법</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>"테이블을 만들어줘"</li>
                <li>"보안 정책을 설정해줘"</li>
                <li>"마이그레이션을 실행해줘"</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 mb-2">
                <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>브랜치 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>개발 브랜치 생성</li>
                <li>프로덕션 배포</li>
                <li>롤백 및 복구</li>
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
        <p className="mb-4 text-muted-foreground">AI와 함께하는 개발 경험을 공유해주세요!</p>
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
