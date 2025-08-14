/**
 * SkeletonコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのSkeletonコンポーネントのStorybookストーリーです。
 * ローディング状態のプレースホルダーとして使用される様々なパターンを確認できます。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./skeleton"

/**
 * Skeletonコンポーネントのメタデータ定義
 */
const meta: Meta<typeof Skeleton> = {
  title: "Components/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: "text",
      description: "スケルトンに適用するカスタムTailwind CSSクラス",
    },
  },
}
export default meta

/**
 * Storyの型定義
 */
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

/**
 * 基本的なスケルトンストーリー
 */
export const Default: Story = {
  args: {
    className: "h-4 w-[250px]",
  },
  render: (args) => (
    <Skeleton {...args} />
  ),
}

/**
 * 円形のスケルトンストーリー
 */
export const Circular: Story = {
  args: {
    className: "h-12 w-12 rounded-full",
  },
  render: (args) => (
    <Skeleton {...args} />
  ),
}

/**
 * カード形式のスケルトンストーリー
 */
export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

/**
 * プロフィールカードのスケルトンストーリー
 */
export const ProfileCard: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

/**
 * テーブル行のスケルトンストーリー
 */
export const TableRow: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[80px]" />
    </div>
  ),
}

/**
 * リストアイテムのスケルトンストーリー
 */
export const ListItem: Story = {
  render: () => (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <Skeleton className="h-10 w-10 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  ),
}

/**
 * フォームのスケルトンストーリー
 */
export const Form: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="h-10 w-24" />
    </div>
  ),
}

/**
 * ダッシュボードカードのスケルトンストーリー
 */
export const DashboardCard: Story = {
  render: () => (
    <div className="p-6 border rounded-lg w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
  ),
}

/**
 * サイドバーメニューのスケルトンストーリー
 */
export const SidebarMenu: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  ),
}

/**
 * 記事カードのスケルトンストーリー
 */
export const ArticleCard: Story = {
  render: () => (
    <div className="max-w-sm border rounded-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  ),
}

/**
 * 検索結果のスケルトンストーリー
 */
export const SearchResults: Story = {
  render: () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

/**
 * チャットメッセージのスケルトンストーリー
 */
export const ChatMessage: Story = {
  render: () => (
    <div className="space-y-4">
      {/* 受信メッセージ */}
      <div className="flex items-start space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <div className="bg-muted rounded-lg p-3 max-w-xs">
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
      
      {/* 送信メッセージ */}
      <div className="flex items-start space-x-2 justify-end">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 ml-auto" />
          <div className="bg-primary rounded-lg p-3 max-w-xs">
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  ),
}

/**
 * プログレスバーのスケルトンストーリー
 */
export const ProgressBar: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>
  ),
}

/**
 * 統計カードのスケルトンストーリー
 */
export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-8 w-20 mb-1" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="p-4 border rounded-lg">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  ),
}

/**
 * ナビゲーションバーのスケルトンストーリー
 */
export const NavigationBar: Story = {
  render: () => (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  ),
}

/**
 * モーダルのスケルトンストーリー
 */
export const Modal: Story = {
  render: () => (
    <div className="border rounded-lg p-6 w-[500px]">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  ),
}

/**
 * カスタムサイズのスケルトンストーリー
 */
export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-16" />
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>
    </div>
  ),
} 