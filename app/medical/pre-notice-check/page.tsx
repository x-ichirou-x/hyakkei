/**
 * 告知前の確認画面
 *
 * 告知入力に進む前に、確認していただきたい事項をまとめて提示する画面。
 * 本画面ではチェック操作は不要で、画面下部の「同意して次へ」ボタン自体が
 * 同意の意思表示となります（現時点では次画面への遷移アクションなし）。
 *
 * 主な仕様:
 * - ルート: /medical/pre-notice-check
 * - 前後遷移: 戻る=/medical/important、次へ=アクション無し（ボタン表示のみ）
 * - UI: `card-standard`で5つの確認ブロックを表示
 * - ステッパー: 共通 `Stepper` を使用（ダミー表示）
 * - スタイル: トンマナガイド（`guide/toneAndMannerCssDesign.md`）に準拠
 */

"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Stepper from "@/components/ui/stepper"
import SectionHeading from "@/components/ui/section-heading"
import { Phone, ArrowLeft, ArrowRight, Info } from "lucide-react"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"
import Image from "next/image"

/**
 * セクション定義
 * @property {string} id セクションID
 * @property {string} title 見出し
 * @property {string[]} bullets 箇条書きの要点
 * @property {string} detail 詳細本文
 */
interface PreNoticeSection {
  id: string
  title: string
  bullets: string[]
  detail: string
}

/**
 * 表示する確認セクション（文面は保険らしい事実ベースの表現に整備）
 */
const sections: PreNoticeSection[] = [
  {
    id: "selfEntry",
    title: "被保険者ご本人が入力してください",
    bullets: [
      "ご本人以外の入力は、申込のお取扱いができない場合があります",
      "正確な情報の申告が必要です",
    ],
    detail:
      "告知内容は、被保険者ご本人の健康状態等に関する重要な情報です。必ずご本人が入力してください。代理入力や不正確な情報の記載があった場合、保険金・給付金をお支払いできないことがあります。",
  },
  {
    id: "preparation",
    title: "保険契約のお申込み前の準備物について、ご確認ください",
    bullets: [
      "健康診断結果票やお薬手帳など、最近の受診・服薬状況が分かる資料をご用意ください",
      "過去の入院・手術・通院歴が分かるメモ等があると入力がスムーズです",
    ],
    detail:
      "入力にあたり、直近の健康診断結果や処方内容、通院履歴等の情報が必要となる場合があります。事前にお手元にご準備ください。",
  },
  {
    id: "accuracy",
    title: "正確な情報をご入力ください",
    bullets: [
      "虚偽や重大な記載漏れがあった場合、保険金・給付金をお支払いできないことがあります",
      "告知内容は申込の引受審査に使用します",
    ],
    detail:
      "告知は約款で定める重要事項です。事実と異なる入力や重大な記載漏れがある場合、契約が解除となることや保険金・給付金をお支払いできないことがあります。",
  },
  {
    id: "noticeHandling",
    title: "告知整理について",
    bullets: [
      "入力いただいた内容は、お申込み手続きの中で当社所定の方法により確認します",
      "途中保存や再開の機能は、別途提供されるマイページからご利用いただけます",
    ],
    detail:
      "本画面でご確認いただいた後の告知情報は、当社所定の仕組みにより審査・管理します。進行状況に応じて、後続の画面で内容を確認いただけます。",
  },
  {
    id: "healthInfoUse",
    title: "お客様の健康状態・傷病歴等に関する情報の取扱いについて",
    bullets: [
      "利用目的：引受審査、保険金・給付金の支払、アフターサービスの提供等",
      "法令に基づく場合を除き、ご本人の同意なく第三者へ提供しません",
    ],
    detail:
      "取得した個人情報（健康情報を含む）は、契約の引受判断、保険金・給付金のお支払い、各種ご案内等の目的で利用します。詳細は当社の個人情報保護方針をご確認ください。",
  },
]

/**
 * 告知前の確認 画面コンポーネント
 * @returns JSX.Element
 */
export default function PreNoticeCheckPage() {
  /**
   * 戻るボタンのハンドラ
   * @returns void
   */
  const handleBack = () => {
    window.location.href = "/medical/important"
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>

      {/* ステップバー: STEP 3 */}
      <Stepper
        currentStep={3}
        totalSteps={6}
        stepLabels={[
          "お客様\n情報登録",
          "重要事項\n確認",
          "告知",
          "受取人\n登録",
          "支払方法\n登録",
          "本人確認",
        ]}
      />

      <div className="container-responsive pt-2 pb-8">
        {/* タイトル */}
        <div className="mb-8">
          <SectionHeading title="告知に関する重要事項" className="mb-4" />
          <p className="text-body text-semantic-fg-subtle">
            告知の前に、以下の内容をご確認ください。内容に同意いただける場合は、画面下部の「同意して次へ」を押してください。
          </p>
        </div>

        {/* 確認セクション */}
        <div className="space-y-4">
          {sections.map((section) => (
            <Card className="card-standard" key={section.id}>
              <CardHeader>
                <CardTitle className="text-h2 text-semantic-fg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside text-body text-semantic-fg-subtle space-y-1">
                  {section.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="text-body text-semantic-fg-subtle leading-relaxed">
                  {section.detail}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 補足案内 */}
        <div className="mt-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-caption text-semantic-fg-subtle">
              ご不明点がある場合は、上部のコールセンターまでお問い合わせください。
            </AlertDescription>
          </Alert>
        </div>

        {/* アクションボタン */}
        <div className="mt-8 space-y-4">
          <Button 
            onClick={() => (window.location.href = "/medical/notice")}
            className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg"
            size="lg"
          >
            同意して次へ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button 
            onClick={handleBack}
            variant="outline" 
            className="w-full button-standard focus-ring transition-normal"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
        </div>
      </div>

      {/* 旧フッター余白・罫線を削除 */}
      <div className="bg-white border-t"></div>
      <MedicalFooter />
    </div>
  )
}


