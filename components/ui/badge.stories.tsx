/**
 * BadgeコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - バッジまたはバッジのように見えるコンポーネントを表示
 * - ステータス、カテゴリ、通知数などの表示に使用
 * - 様々なバリアントとカスタマイズオプションをサポート
 * 
 * 主な仕様:
 * - variant: "default" | "secondary" | "destructive" | "outline" - バッジのスタイル
 * - asChild: 他のコンポーネントをバッジとして表示
 * - className: カスタムスタイル用クラス
 * - アイコン: Lucide Reactアイコンをサポート
 * 
 * 制限事項:
 * - asChildを使用する場合、子要素は1つのみ
 */

import type { Meta, StoryObj } from "@storybook/react"
import { 
  AlertCircleIcon, 
  BadgeCheckIcon, 
  CheckIcon,
  StarIcon,
  HeartIcon,
  MessageCircleIcon,
  BellIcon,
  XCircleIcon,
  InfoIcon
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

/**
 * Badgeコンポーネントのメタデータ
 */
const meta: Meta<typeof Badge> = {
  title: "Components/UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      description: "バッジのバリアント",
      options: ["default", "secondary", "destructive", "outline"],
    },
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
 * 基本的なバッジストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-wrap gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="flex w-full flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-semantic-accent text-semantic-bg"
          >
            <BadgeCheckIcon />
            Verified
          </Badge>
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
            8
          </Badge>
          <Badge
            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
          >
            99
          </Badge>
          <Badge
            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="outline"
          >
            20+
          </Badge>
        </div>
      </div>
    )
  },
}

/**
 * 異なるバリアントのバッジストーリー
 */
export const Variants: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    )
  },
}

/**
 * アイコン付きのバッジストーリー
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge>
          <CheckIcon className="mr-1 h-3 w-3" />
          Completed
        </Badge>
        <Badge variant="secondary">
          <StarIcon className="mr-1 h-3 w-3" />
          Featured
        </Badge>
        <Badge variant="destructive">
          <AlertCircleIcon className="mr-1 h-3 w-3" />
          Error
        </Badge>
        <Badge variant="outline">
          <HeartIcon className="mr-1 h-3 w-3" />
          Favorite
        </Badge>
        <Badge>
          <BadgeCheckIcon className="mr-1 h-3 w-3" />
          Verified
        </Badge>
      </div>
    )
  },
}

/**
 * 通知数のバッジストーリー
 */
export const NotificationCount: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          1
        </Badge>
        <Badge 
          variant="destructive" 
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
        >
          5
        </Badge>
        <Badge 
          variant="secondary" 
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
        >
          12
        </Badge>
        <Badge 
          variant="outline" 
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
        >
          99+
        </Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          <BellIcon className="h-3 w-3" />
        </Badge>
      </div>
    )
  },
}

/**
 * ステータスバッジストーリー
 */
export const Status: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-semantic-success text-semantic-bg hover:brightness-95">
          <CheckIcon className="mr-1 h-3 w-3" />
          Active
        </Badge>
        <Badge className="bg-semantic-warning text-semantic-bg hover:brightness-95">
          <AlertCircleIcon className="mr-1 h-3 w-3" />
          Pending
        </Badge>
        <Badge className="bg-semantic-danger text-semantic-bg hover:brightness-95">
          <XCircleIcon className="mr-1 h-3 w-3" />
          Inactive
        </Badge>
        <Badge className="bg-semantic-accent text-semantic-bg hover:brightness-95">
          <InfoIcon className="mr-1 h-3 w-3" />
          Draft
        </Badge>
      </div>
    )
  },
}

/**
 * カテゴリバッジストーリー
 */
export const Categories: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">Technology</Badge>
        <Badge variant="outline">Design</Badge>
        <Badge variant="outline">Marketing</Badge>
        <Badge variant="outline">Development</Badge>
        <Badge variant="outline">Business</Badge>
        <Badge variant="outline">Finance</Badge>
        <Badge variant="outline">Health</Badge>
        <Badge variant="outline">Education</Badge>
      </div>
    )
  },
}

/**
 * カスタムスタイルのバッジストーリー
 */
export const CustomStyle: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Gradient
        </Badge>
        <Badge className="border-2 border-semantic-accent bg-semantic-bg text-semantic-accent">
          Custom Border
        </Badge>
        <Badge className="shadow-lg bg-semantic-bg text-semantic-fg border">
          Shadow
        </Badge>
        <Badge className="bg-black text-white dark:bg-white dark:text-black">
          Dark Mode
        </Badge>
        <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold">
          Premium
        </Badge>
      </div>
    )
  },
}

/**
 * サイズの異なるバッジストーリー
 */
export const DifferentSizes: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="text-xs px-2 py-1">Small</Badge>
        <Badge>Default</Badge>
        <Badge className="text-base px-3 py-1">Large</Badge>
        <Badge className="text-lg px-4 py-2">Extra Large</Badge>
      </div>
    )
  },
}

/**
 * インタラクティブなバッジストーリー
 */
export const Interactive: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge className="cursor-pointer hover:brightness-95 bg-semantic-accent text-semantic-bg transition-colors">
          Clickable
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-semantic-border/30 transition-colors"
        >
          Hover Effect
        </Badge>
        <Badge 
          variant="secondary" 
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          Scale Effect
        </Badge>
        <Badge 
          variant="destructive" 
          className="cursor-pointer hover:bg-red-700 transition-colors"
        >
          Destructive
        </Badge>
      </div>
    )
  },
}

/**
 * 複合的なバッジストーリー
 */
export const Complex: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-semantic-success text-semantic-bg">
            <CheckIcon className="mr-1 h-3 w-3" />
            Published
          </Badge>
          <Badge variant="outline">
            <MessageCircleIcon className="mr-1 h-3 w-3" />
            Comments: 5
          </Badge>
          <Badge variant="secondary">
            <StarIcon className="mr-1 h-3 w-3" />
            Featured
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="h-6 min-w-6 rounded-full px-2 font-mono tabular-nums bg-semantic-accent text-semantic-bg">
            12
          </Badge>
          <Badge className="h-6 min-w-6 rounded-full px-2 font-mono tabular-nums bg-semantic-danger text-semantic-bg">
            3
          </Badge>
          <Badge className="h-6 min-w-6 rounded-full px-2 font-mono tabular-nums bg-semantic-success text-semantic-bg">
            8
          </Badge>
        </div>
      </div>
    )
  },
} 