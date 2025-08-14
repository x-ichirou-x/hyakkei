/**
 * Responsive Comboboxコンポーネント
 * 
 * 概要:
 * - レスポンシブ対応のComboboxコンポーネント
 * - デスクトップではPopover、モバイルではDrawerを使用
 * - 画面サイズに応じて自動的に切り替わる
 * 
 * 主な仕様:
 * - デスクトップ（768px以上）: Popover
 * - モバイル（768px未満）: Drawer
 * - メディアクエリによる自動切り替え
 * - 統一されたインターフェース
 * 
 * 制限事項:
 * - Popover、Command、Drawerコンポーネントに依存
 * - ブラウザ環境でのみ動作
 */

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

/**
 * Responsive Comboboxオプションの型定義
 */
export interface ResponsiveComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

/**
 * Responsive Comboboxコンポーネントのプロパティ
 */
export interface ResponsiveComboboxProps {
  options: ResponsiveComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
  align?: "start" | "center" | "end"
}

/**
 * Responsive Comboboxコンポーネント
 * 
 * @param options - 選択可能なオプションの配列
 * @param value - 現在選択されている値
 * @param onValueChange - 値が変更された時のコールバック
 * @param placeholder - トリガーボタンのプレースホルダー
 * @param searchPlaceholder - 検索入力のプレースホルダー
 * @param emptyMessage - 結果が見つからない時のメッセージ
 * @param disabled - 無効化フラグ
 * @param className - コンテナのクラス名
 * @param triggerClassName - トリガーボタンのクラス名
 * @param contentClassName - ポップオーバー/ドロワーコンテンツのクラス名
 * @param align - ポップオーバーの配置
 */
export function ResponsiveCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  align = "start",
}: ResponsiveComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const selectedOption = options.find((option) => option.value === value)

  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className={cn(
        "w-full justify-between min-w-[150px]",
        triggerClassName
      )}
      disabled={disabled}
    >
      {selectedOption ? selectedOption.label : placeholder}
    </Button>
  )

  const content = (
    <Command>
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              onSelect={(currentValue) => {
                onValueChange?.(currentValue === value ? "" : currentValue)
                setOpen(false)
              }}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {triggerButton}
        </PopoverTrigger>
        <PopoverContent 
          className={cn("w-[200px] p-0", contentClassName)} 
          align={align}
        >
          {content}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {triggerButton}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          {content}
        </div>
      </DrawerContent>
    </Drawer>
  )
} 