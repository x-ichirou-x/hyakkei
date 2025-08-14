/**
 * useMediaQueryフック
 * 
 * 概要:
 * - メディアクエリの状態を監視するカスタムフック
 * - レスポンシブデザインで使用
 * 
 * 主な仕様:
 * - 指定されたメディアクエリの一致状態を返す
 * - SSR対応（初期値はfalse）
 * - ウィンドウサイズの変更を監視
 * 
 * 制限事項:
 * - ブラウザ環境でのみ動作
 */

"use client"

import * as React from "react"

/**
 * メディアクエリの状態を監視するフック
 * 
 * @param query - 監視するメディアクエリ文字列
 * @returns メディアクエリが一致するかどうかのブール値
 */
export function useMediaQuery(query: string): boolean {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener("change", onChange)
    setValue(result.matches)

    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
} 