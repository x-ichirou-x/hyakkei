/**
 * 申込完了画面
 *
 * お申込み手続きが完了したことをお知らせし、申込概要（申込日・告知日・責任開始日・申込番号）を表示する。
 * 現時点ではダミー値を含むが、日付は端末時刻から日本語表記で生成し、申込番号は擬似的に採番して localStorage に保存する。
 *
 * - ルート: /medical/complete
 * - 前後遷移: 戻る=トップ（/）、状況確認=マイページ（未実装のためダミー）
 * - ステップ: 最終ステップのダミー表示
 */

"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// 完了画面はステップ非表示のため、Stepperの読み込みを削除
import { Info, Phone, ExternalLink } from "lucide-react"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"
import Image from "next/image"

/**
 * 日本語の年月日表記に整形する
 * @param date 日付
 * @returns YYYY年M月D日の文字列
 */
const formatDateJp = (date: Date): string => {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}年${m}月${d}日`
}

/**
 * 擬似的な申込番号を生成（12桁、先頭は1固定）
 * @returns 文字列
 */
const generateApplicationNumber = (): string => {
  const head = "1"
  let tail = ""
  for (let i = 0; i < 11; i++) {
    tail += Math.floor(Math.random() * 10).toString()
  }
  return head + tail
}

export default function CompletePage() {
  const [applicationDate, setApplicationDate] = useState<string>("")
  const [noticeDate, setNoticeDate] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [applicationNumber, setApplicationNumber] = useState<string>("")

  useEffect(() => {
    const today = new Date()
    setApplicationDate(formatDateJp(today))
    // 告知日は便宜上、申込日の2日前に設定（例示用）
    const notice = new Date(today)
    notice.setDate(notice.getDate() - 2)
    setNoticeDate(formatDateJp(notice))
    // 責任開始日（例）: 申込日と同日
    setStartDate(formatDateJp(today))

    try {
      const key = "medical_application_number"
      const saved = window.localStorage.getItem(key)
      if (saved) {
        setApplicationNumber(saved)
      } else {
        const gen = generateApplicationNumber()
        window.localStorage.setItem(key, gen)
        setApplicationNumber(gen)
      }
    } catch {
      setApplicationNumber(generateApplicationNumber())
    }
  }, [])

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>

      {/* 完了画面はステップバーを表示しない */}

      <div className="container-responsive py-10 space-y-8">
        {/* メインメッセージ */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-semantic-fg mb-4">お申込み手続きが完了しました</h2>
          <p className="text-body font-medium text-semantic-danger mb-4">
            ※お申込み手続き完了メールを登録メールアドレスに送信しました。
          </p>
          <div className="space-y-2 text-body text-semantic-fg-subtle">
            <p>
              お申込みいただき、誠にありがとうございました。Webでのお申込み手続きが完了しました。
            </p>
            <p>
              ご契約は<strong className="text-semantic-danger">まだ成立しておりません</strong>ので、今しばらくお待ちください。お手続きの状況はWeb申込み専用ページでご確認いただけます。
            </p>
          </div>
        </div>

        {/* 申込概要 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">申込概要</CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <div className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-semantic-border pb-4">
                <div className="text-semantic-fg-subtle">申込日</div>
                <div className="font-medium">{applicationDate}</div>
              </div>
              <div className="flex items-baseline justify-between border-b border-semantic-border pb-4">
                <div className="text-semantic-fg-subtle">告知日</div>
                <div className="font-medium">{noticeDate}</div>
              </div>
              <div className="flex items-baseline justify-between border-b border-semantic-border pb-4">
                <div className="text-semantic-fg-subtle">責任開始日</div>
                <div className="font-medium">{startDate}</div>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-semantic-fg-subtle">申込番号</div>
                <div className="font-mono tracking-wider">{applicationNumber}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            onClick={() => alert("マイページは未実装です")}
            className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg"
            size="lg"
          >
            マイページで状況を確認
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="w-full button-standard focus-ring transition-normal"
            size="lg"
          >
            トップへ戻る
          </Button>
        </div>
      </div>
      <div className="bg-white border-t"></div>
      <MedicalFooter />
    </div>
  )
}


