/**
 * Comboboxコンポーネント
 * 
 * 概要:
 * - 自動補完入力とコマンドパレット機能を持つコンポーネント
 * - PopoverとCommandコンポーネントを組み合わせて実装
 * - 検索可能なドロップダウン選択機能
 * 
 * 主な仕様:
 * - 検索機能付きのドロップダウン
 * - キーボードナビゲーション対応
 * - カスタマイズ可能なオプション
 * - フォーム統合対応
 * 
 * 制限事項:
 * - PopoverとCommandコンポーネントに依存
 * - データの形式に依存
 */

"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/**
 * Comboboxオプションの型定義
 */
export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

/**
 * Comboboxコンポーネントのプロパティ
 */
export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

/**
 * Comboboxコンポーネント
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
 * @param contentClassName - ポップオーバーコンテンツのクラス名
 */
export function Combobox({
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
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedOption = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between min-w-[200px]",
            triggerClassName
          )}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0", contentClassName)}>
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
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 