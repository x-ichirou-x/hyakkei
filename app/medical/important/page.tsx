/**
 * 重要事項確認画面
 *
 * 保険申込に際して事前にご確認いただく重要事項を、
 * セクション単位のアコーディオンで提示し、
 * 各項目に対して「確認・理解しました」のチェックを必須とする画面。
 * 全項目の確認が完了するまで「次へ」は非活性とし、
 * 状態は localStorage に保存して再訪時に復元する。
 *
 * 主な仕様:
 * - ルート: /medical/important
 * - 前後遷移: 戻る=/medical/customer-info, 次へ=/medical
 * - UI: 既存の UI コンポーネント（accordion, checkbox, button, card, dialog）を再利用
 * - トンマナ: `guide/toneAndMannerCssDesign.md` と `guide/toneAndMannerService.md` に準拠
 * - ステップ表示: 共通 `Stepper` を使用（本画面は STEP 2-2 の想定）
 *
 * 制限事項:
 * - PDFはダミー表示（実ファイルへのリンクは未接続）
 * - トラッキングは本画面では未実装
 */

"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Stepper from "@/components/ui/stepper"
import SectionHeading from "@/components/ui/section-heading"
import { FileText, Phone, ArrowLeft, ArrowRight, Info } from "lucide-react"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"
import Image from "next/image"

/**
 * ローカルストレージのキー
 * @type {string}
 */
const storageKey = "medical_important_ack"

/**
 * 確認セクションの定義型
 * @property {string} id セクション識別子
 * @property {string} title 見出し
 * @property {string[]} bullets 要点（本文の要約）
 * @property {string} detail 詳細本文（アコーディオン内に表示）
 */
interface ImportantSection {
  id: string
  title: string
  bullets: string[]
  detail: string
}

/**
 * ダミーの重要事項コンテンツ（保険らしい文体で作成）
 */
const sections: ImportantSection[] = [
  {
    id: "eligibility",
    title: "ご加入いただけない場合について",
    bullets: [
      "入院中・妊娠中・手術予定等の場合はお申込みいただけないことがあります",
      "直近の健康状態・通院状況により、引受を見合わせることがあります",
      "反社会的勢力との関係が判明した場合はお引受けできません",
    ],
    detail:
      "現在入院中、医師の診察・検査・治療・投薬を受けている、または手術の予定がある等の場合は、ご加入いただけないことがあります。妊娠・出産に関する状況等も含め、当社所定の告知事項に該当する場合には、お引受けを見合わせることがあります。あらかじめご了承ください。",
  },
  {
    id: "hospitalization",
    title: "入院・手術・通院のご確認",
    bullets: [
      "最近3か月以内の入院・手術・検査の有無を確認します",
      "既往症や慢性疾患がある場合は、内容を正確にご申告ください",
      "告知内容により、保障の一部不担保や条件付き承諾となる場合があります",
    ],
    detail:
      "申込時点における過去の入院・手術・通院・検査の有無、及び既往症の状況について確認します。記載内容に不備・虚偽がある場合、保険金・給付金をお支払いできないことがあります。",
  },
  {
    id: "exclusions",
    title: "免責・不担保事項",
    bullets: [
      "責任開始日前に発生した傷病は支払対象外となります",
      "特定の疾病や妊娠・出産等に関する給付はお支払い対象外となる場合があります",
      "約款に定める免責事由（故意・重大な過失等）に該当する場合は不担保です",
    ],
    detail:
      "責任開始日前に発生した疾病・傷害、または約款に定める免責事由に該当する場合は、給付金の対象外です。詳細は重要事項説明書および約款をご確認ください。",
  },
  {
    id: "privacy",
    title: "個人情報の取り扱い",
    bullets: [
      "契約の引受判断・保険金支払・各種ご案内等の目的で利用します",
      "業務委託先等へ必要な範囲で提供することがあります",
      "法令に基づく場合を除き、ご本人の同意なく第三者へ提供しません",
    ],
    detail:
      "当社は、取得した個人情報を、契約の引受判断、保険金・給付金のお支払い、アフターサービス、商品・サービスのご案内等の目的で利用します。取扱いの詳細は個人情報保護方針をご確認ください。",
  },
  {
    id: "electronic",
    title: "約款・重要事項の電子交付について",
    bullets: [
      "本サービスでは、約款・重要事項説明書等を電子的に交付します",
      "内容はPDFにて随時ご確認いただけます",
      "紙面での交付をご希望の場合は別途お手続きが必要です",
    ],
    detail:
      "申込手続きに関する各種書面は電子交付（PDF）により提供します。通信環境により閲覧できない場合は、紙面交付への切替をサポートいたします。",
  },
]

/**
 * 重要事項確認 画面コンポーネント
 * @returns JSX.Element
 */
export default function ImportantNotesPage() {
  // 各セクションの同意状態
  const [agreements, setAgreements] = useState<Record<string, boolean>>({})
  // 初期化完了フラグ
  const [initialized, setInitialized] = useState(false)
  // エラー表示（想定外の例外時）
  const [fatalError, setFatalError] = useState<string | null>(null)

  /**
   * ローカルストレージから状態を読み込む
   * @param key ストレージキー
   */
  const loadFromStorage = (key: string) => {
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) return {}
      const parsed = JSON.parse(raw)
      if (typeof parsed !== "object" || parsed === null) return {}
      return parsed as Record<string, boolean>
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("loadFromStorage:error", { functionName: "loadFromStorage", key, message })
      setFatalError(`重要事項確認の読込に失敗しました（関数: loadFromStorage, key: ${key}, error: ${message}）`)
      return {}
    }
  }

  /**
   * ローカルストレージへ状態を保存する
   * @param key ストレージキー
   * @param value 保存する同意状態
   */
  const saveToStorage = (key: string, value: Record<string, boolean>) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("saveToStorage:error", { functionName: "saveToStorage", key, value, message })
      setFatalError(`重要事項確認の保存に失敗しました（関数: saveToStorage, key: ${key}, error: ${message}）`)
    }
  }

  // 初期化：保存状態を復元
  useEffect(() => {
    const initial = loadFromStorage(storageKey)
    const hydrated: Record<string, boolean> = {}
    sections.forEach((s) => {
      hydrated[s.id] = Boolean(initial[s.id])
    })
    setAgreements(hydrated)
    setInitialized(true)
  }, [])

  // 同意状態の変更ハンドラ
  const handleAgreementChange = (sectionId: string, checked: boolean | string) => {
    try {
      const next = { ...agreements, [sectionId]: Boolean(checked) }
      setAgreements(next)
      saveToStorage(storageKey, next)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("handleAgreementChange:error", { functionName: "handleAgreementChange", sectionId, checked, message })
      setFatalError(`チェックの更新に失敗しました（関数: handleAgreementChange, sectionId: ${sectionId}, checked: ${checked}, error: ${message}）`)
    }
  }

  // 全同意完了かを計算
  const allChecked = useMemo(() => {
    return sections.every((s) => agreements[s.id])
  }, [agreements])

  // 遷移ハンドラ
  const handleNext = () => {
    if (!allChecked) return
    window.location.href = "/medical/pre-notice-check"
  }

  const handleBack = () => {
    window.location.href = "/medical/customer-info"
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>

      {/* ステップバー: STEP 2 */}
      <Stepper
        currentStep={2}
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
        {/* セクションタイトル */}
        <div className="mb-8">
          <SectionHeading title="重要事項のご確認" className="mb-4" />
          <div className="space-y-2 text-body text-semantic-fg-subtle">
            <p>ご契約前に必ずお読みいただき、内容をご確認ください。各事項の下部にあるチェックを付けると、次へ進めます。</p>
            <p>
              約款・重要事項説明書は電子交付でのご案内です。詳細は
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-semantic-accent underline-offset-2 hover:underline inline-flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    重要事項説明書（PDF）を開く
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg modal-standard">
                  <DialogHeader>
                    <DialogTitle>重要事項説明書（PDF）</DialogTitle>
                  </DialogHeader>
                  <div className="text-body text-semantic-fg-subtle">
                    重要事項説明書はPDFで提供しています。内容をご確認のうえ、お手続きください。
                  </div>
                </DialogContent>
              </Dialog>
              からご確認いただけます。
            </p>
          </div>
        </div>

        {/* 重要事項カード */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">ご確認事項一覧</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Accordion type="multiple" className="w-full" defaultValue={sections.map((s) => s.id)}>
              {sections.map((section) => (
                <AccordionItem key={section.id} value={section.id} className="border-semantic-border">
                  <AccordionTrigger className="text-left">
                    <div className="text-left">
                      <p className="text-body font-medium text-semantic-fg">{section.title}</p>
                      <ul className="mt-1 text-caption text-semantic-fg-subtle list-disc list-inside space-y-0.5">
                        {section.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-body text-semantic-fg-subtle leading-relaxed">
                      {section.detail}
                    </div>
                    <div className="mt-4 flex items-center space-x-3">
                      <Checkbox
                        id={`agree_${section.id}`}
                        checked={Boolean(agreements[section.id])}
                        onCheckedChange={(c) => handleAgreementChange(section.id, c)}
                      />
                      <label htmlFor={`agree_${section.id}`} className="text-body">
                        確認・理解しました
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-caption text-semantic-fg-subtle">
                すべての項目にチェックいただくと「次へ」が有効になります。内容にご不明点がある場合は、お電話にてお問い合わせください。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* アクションボタン */}
        <div className="mt-8 space-y-4">
          <Button
            onClick={handleNext}
            className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg"
            size="lg"
            disabled={!initialized || !allChecked}
          >
            次へ
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

          {fatalError && (
            <Alert variant="destructive">
              <AlertDescription className="text-caption">{fatalError}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* 旧フッター余白・罫線を削除 */}
      <div className="bg-white border-t"></div>
      <MedicalFooter />
    </div>
  )
}


