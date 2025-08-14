"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * タブコンポーネントのルート要素
 * タブの状態管理とレイアウトを制御
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * タブリストコンポーネント
 * タブトリガーを横並びに配置するコンテナ
 */
function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex flex-wrap max-w-[500px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * タブトリガーコンポーネント
 * クリック可能なタブヘッダー
 */
function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "flex-1 order-first min-w-[70px] px-4 py-2.5 pb-2 bg-[#f2f2f2] text-[#999] font-semibold text-sm text-center cursor-pointer transition-opacity hover:opacity-80 data-[state=active]:border-b-4 data-[state=active]:border-[#2589d0] data-[state=active]:text-[#2589d0]",
        className
      )}
      {...props}
    />
  )
}

/**
 * タブコンテンツコンポーネント
 * タブが選択された時に表示されるコンテンツエリア
 */
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("w-full px-4 py-6 bg-white", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
