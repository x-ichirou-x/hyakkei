/**
 * CardコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ヘッダー、コンテンツ、フッターを持つカードを表示
 * - 情報の整理と表示に使用
 * - 様々なレイアウトとコンテンツをサポート
 * 
 * 主な仕様:
 * - Card: メインのカードコンテナ
 * - CardHeader: カードのヘッダー部分
 * - CardTitle: カードのタイトル
 * - CardDescription: カードの説明文
 * - CardAction: カードのアクション
 * - CardContent: カードのメインコンテンツ
 * - CardFooter: カードのフッター部分
 * 
 * 制限事項:
 * - 各セクションは任意で使用可能
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  HeartIcon, 
  ShareIcon, 
  BookmarkIcon,
  StarIcon,
  CalendarIcon,
  MapPinIcon
} from "lucide-react"

/**
 * Cardコンポーネントのメタデータ
 */
const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "カスタムスタイル用クラス",
    },
  },
}

export default meta
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

/**
 * 基本的なカードストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    )
  },
}

/**
 * シンプルなカードストーリー
 */
export const Simple: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>シンプルなカード</CardTitle>
          <CardDescription>
            これは基本的なカードの例です。ヘッダー、コンテンツ、フッターを含んでいます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>カードのメインコンテンツがここに表示されます。</p>
        </CardContent>
        <CardFooter>
          <Button>アクション</Button>
        </CardFooter>
      </Card>
    )
  },
}

/**
 * プロダクトカードストーリー
 */
export const ProductCard: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="aspect-square rounded-lg mb-4 flex items-center justify-center bg-semantic-border">
            <span className="text-semantic-fg-subtle">商品画像</span>
          </div>
          <CardTitle>プロダクト名</CardTitle>
          <CardDescription>
            素晴らしいプロダクトの説明文がここに表示されます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <StarIcon className="h-4 w-4 text-semantic-border" />
              <span className="text-caption text-semantic-fg-subtle">(4.0)</span>
            </div>
            <Badge variant="secondary">¥2,980</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <HeartIcon className="h-4 w-4 mr-1" />
            お気に入り
          </Button>
          <Button size="sm">
            カートに追加
          </Button>
        </CardFooter>
      </Card>
    )
  },
}

/**
 * ユーザープロフィールカードストーリー
 */
export const UserProfile: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle>田中太郎</CardTitle>
          <CardDescription>フロントエンド開発者</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center text-caption">
              <MapPinIcon className="h-4 w-4 mr-2 text-semantic-fg-subtle" />
              <span>東京, 日本</span>
            </div>
            <div className="flex items-center text-caption">
              <CalendarIcon className="h-4 w-4 mr-2 text-semantic-fg-subtle" />
              <span>2020年からメンバー</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" className="w-full">
            プロフィールを見る
          </Button>
        </CardFooter>
      </Card>
    )
  },
}

/**
 * 統計カードストーリー
 */
export const StatsCard: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <Badge variant="secondary">+20.1%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥45,231.89</div>
            <p className="text-xs text-muted-foreground">
              前月比 +180.1%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">サブスクリプション</CardTitle>
            <Badge variant="secondary">+180.1%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              前月比 +180.1%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アクティブユーザー</CardTitle>
            <Badge variant="secondary">+19%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              前月比 +19%
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
}

/**
 * 記事カードストーリー
 */
export const ArticleCard: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">技術</Badge>
            <Badge variant="outline">React</Badge>
          </div>
          <CardTitle>React 18の新機能について</CardTitle>
          <CardDescription>
            React 18で導入された新機能について詳しく解説します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            React 18では、Concurrent Features、Automatic Batching、Transitionsなど、
            多くの新機能が追加されました。これらの機能により、より良いユーザー体験を
            提供できるようになります...
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">田中太郎</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <HeartIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ShareIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <BookmarkIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  },
}

/**
 * 設定カードストーリー
 */
export const SettingsCard: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>アカウント設定</CardTitle>
          <CardDescription>
            アカウントの基本情報を管理します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">表示名</Label>
              <Input id="name" placeholder="表示名を入力" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" placeholder="メールアドレスを入力" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">自己紹介</Label>
              <Input id="bio" placeholder="自己紹介を入力" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">キャンセル</Button>
          <Button>保存</Button>
        </CardFooter>
      </Card>
    )
  },
}

/**
 * カスタムスタイルのカードストーリー
 */
export const CustomStyle: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <Card className="border-semantic-accent/30 bg-semantic-bg">
          <CardHeader>
            <CardTitle className="text-semantic-accent">青いカード</CardTitle>
            <CardDescription className="text-semantic-fg">
              カスタムスタイルが適用されたカードです。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-semantic-fg">
              このカードは青いテーマでカスタマイズされています。
            </p>
          </CardContent>
        </Card>
        <Card className="border-semantic-success/30 bg-semantic-bg">
          <CardHeader>
            <CardTitle className="text-semantic-success">緑のカード</CardTitle>
            <CardDescription className="text-semantic-fg">
              別のカスタムスタイルの例です。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-semantic-fg">
              このカードは緑のテーマでカスタマイズされています。
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
} 