/**
 * 申込内容確認画面
 *
 * これまでの入力内容を一覧で確認し、申込を確定する最終確認画面。
 * 各画面で localStorage に保存されたデータを読み込み、見やすく整形して表示する。
 * 未保存の項目はダミー例を表示する。
 */

"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
// 確認画面はステップ非表示のため、Stepperの読み込みを削除
import SectionHeading from "@/components/ui/section-heading"
import { Phone, ArrowLeft, Info } from "lucide-react"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"
import Image from "next/image"

interface BeneficiaryInfo {
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  dateOfBirth: string
  gender: string
  relation: string
}

interface BeneficiaryStorage {
  beneficiary?: BeneficiaryInfo
  agent?: BeneficiaryInfo
  sameAsBeneficiary?: boolean
}

export default function ConfirmPage() {
  // 各画面の保存データ
  const [notice, setNotice] = useState<{ recentHospitalization?: string; pastCancer?: string; bloodPressureSystolic?: string; bloodPressureDiastolic?: string }>({})
  const [beneficiary, setBeneficiary] = useState<BeneficiaryStorage>({})
  const [payment, setPayment] = useState<{ method?: string; cardLast4?: string | null; bankLast4?: string | null }>({})
  const [kyc, setKyc] = useState<{ method?: string; docType?: string; frontName?: string; backName?: string }>({})

  useEffect(() => {
    try {
      const n = window.localStorage.getItem("medical_notice_answers")
      if (n) setNotice(JSON.parse(n))
    } catch {}
    try {
      const b = window.localStorage.getItem("medical_beneficiary_info")
      if (b) setBeneficiary(JSON.parse(b))
    } catch {}
    try {
      const p = window.localStorage.getItem("medical_payment_method")
      if (p) setPayment(JSON.parse(p))
    } catch {}
    try {
      const k = window.localStorage.getItem("medical_kyc_state")
      if (k) setKyc(JSON.parse(k))
    } catch {}
  }, [])

  const handleBack = () => {
    window.history.back()
  }

  const handleSubmit = () => {
    console.log("confirm:submit", { notice, beneficiary, payment, kyc })
    alert("申込を受け付けました。ありがとうございました。")
    window.location.href = "/medical/complete"
  }

  // 表示用ユーティリティ
  const relationLabel: Record<string, string> = {
    spouse: "配偶者",
    child: "子",
    parent: "父母",
    sibling: "兄弟姉妹",
    other: "その他",
  }

  const genderLabel = (g?: string) => (g === "male" ? "男性" : g === "female" ? "女性" : "—")
  
  // クレジットカード番号のマスク表示（例: xxxx-xxxx-xxxx-1234）
  const formatMaskedCard = (last4?: string | null): string => {
    if (!last4) return "—"
    const match = String(last4).match(/(\d{4})$/)
    return match ? `xxxx-xxxx-xxxx-${match[1]}` : "—"
  }

  // ダミー表示（常にこの値を表示。連動は現段階では行わない）
  const dummyBeneficiary = {
    lastName: "山田",
    firstName: "花子",
    lastNameKana: "ヤマダ",
    firstNameKana: "ハナコ",
    dateOfBirth: "1990-05-12",
    gender: "female",
    relation: "spouse",
  }

  const dummyAgent = {
    lastName: "山田",
    firstName: "次郎",
    lastNameKana: "ヤマダ",
    firstNameKana: "ジロウ",
    dateOfBirth: "2010-08-02",
    gender: "male",
    relation: "child",
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>

      {/* 確認画面はステップバーを表示しない */}

      <div className="container-responsive pt-2 pb-8 space-y-6">
        <SectionHeading title="申込内容の最終確認" className="mb-2" />
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-caption text-semantic-fg-subtle">
            表示内容をご確認ください。修正が必要な場合は、各セクションの「戻る」ボタンで該当画面へ戻って修正してください。
          </AlertDescription>
        </Alert>

        {/* お客様情報 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">お客様情報</CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <div className="border rounded-md divide-y">
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">氏名（漢字）</div>
                <div className="col-span-2 p-2">山田 太郎</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">氏名（カナ）</div>
                <div className="col-span-2 p-2">ヤマダ タロウ</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">生年月日</div>
                <div className="col-span-2 p-2">1988/04/12</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">契約年齢</div>
                <div className="col-span-2 p-2">36歳</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">性別</div>
                <div className="col-span-2 p-2">男性</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">税制上の居住地国</div>
                <div className="col-span-2 p-2">日本</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">特定米国人に該当しますか？</div>
                <div className="col-span-2 p-2">いいえ</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">郵便番号</div>
                <div className="col-span-2 p-2">100-0001</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">自宅住所</div>
                <div className="col-span-2 p-2">東京都千代田区丸の内1-1-1 ○○マンション101</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">携帯電話番号</div>
                <div className="col-span-2 p-2">090-1234-5678</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">自宅電話番号</div>
                <div className="col-span-2 p-2">03-1234-5678</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">メールアドレス</div>
                <div className="col-span-2 p-2">taro@example.com</div>
              </div>
            </div>
          </CardContent>
        </Card>

        

        {/* 告知内容 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">健康状態に関する告知</CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <div className="border rounded-md divide-y">
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">直近3か月以内の入院・手術</div>
                <div className="col-span-2 p-2">{notice.recentHospitalization === "yes" ? "はい" : notice.recentHospitalization === "no" ? "いいえ" : "—"}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">過去5年以内のがん罹患歴</div>
                <div className="col-span-2 p-2">{notice.pastCancer === "yes" ? "はい" : notice.pastCancer === "no" ? "いいえ" : "—"}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">血圧</div>
                <div className="col-span-2 p-2">{notice.bloodPressureSystolic || "—"}/{notice.bloodPressureDiastolic || "—"} mmHg</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 受取人・指定代理請求人 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">受取人・指定代理請求人</CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <div className="space-y-4">
              {/* 受取人ブロック */}
              <div>
                <div className="text-caption font-medium text-semantic-fg-subtle mb-2">受取人</div>
                <div className="border rounded-md divide-y">
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">氏名</div>
                    <div className="col-span-2 p-2">{`${dummyBeneficiary.lastName} ${dummyBeneficiary.firstName}`}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">氏名（カナ）</div>
                    <div className="col-span-2 p-2">{`${dummyBeneficiary.lastNameKana} ${dummyBeneficiary.firstNameKana}`}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">生年月日</div>
                    <div className="col-span-2 p-2">{dummyBeneficiary.dateOfBirth}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">性別</div>
                    <div className="col-span-2 p-2">{genderLabel(dummyBeneficiary.gender)}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">続柄</div>
                    <div className="col-span-2 p-2">{relationLabel[String(dummyBeneficiary.relation) as keyof typeof relationLabel]}</div>
                  </div>
                </div>
              </div>

              {/* 指定代理請求人ブロック */}
              <div>
                <div className="text-caption font-medium text-semantic-fg-subtle mb-2">指定代理請求人</div>
                <div className="border rounded-md divide-y">
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">氏名</div>
                    <div className="col-span-2 p-2">{`${dummyAgent.lastName} ${dummyAgent.firstName}`}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">氏名（カナ）</div>
                    <div className="col-span-2 p-2">{`${dummyAgent.lastNameKana} ${dummyAgent.firstNameKana}`}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">生年月日</div>
                    <div className="col-span-2 p-2">{dummyAgent.dateOfBirth}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">性別</div>
                    <div className="col-span-2 p-2">{genderLabel(dummyAgent.gender)}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">続柄</div>
                    <div className="col-span-2 p-2">{relationLabel[String(dummyAgent.relation) as keyof typeof relationLabel]}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 支払い方法 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">保険料の支払方法</CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <div className="border rounded-md divide-y">
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">方法</div>
                <div className="col-span-2 p-2">{payment.method === "card" ? "クレジットカード" : payment.method === "bank" ? "口座振替" : "—"}</div>
              </div>
              {payment.method === "card" && (
                <div className="grid grid-cols-3">
                  <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">カード下4桁</div>
                  <div className="col-span-2 p-2">{formatMaskedCard(payment.cardLast4)}</div>
                </div>
              )}
              {payment.method === "bank" && (
                <div className="grid grid-cols-3">
                  <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">口座番号下4桁</div>
                  <div className="col-span-2 p-2">{payment.bankLast4 || "—"}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 本人確認書類 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">本人確認書類</CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <div className="border rounded-md divide-y">
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">提出方法</div>
                <div className="col-span-2 p-2">{kyc.method === "upload-later" ? "あとで提出" : "画像を提出"}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">書類の種類</div>
                <div className="col-span-2 p-2">{kyc.docType || "—"}</div>
              </div>
              {kyc.method !== "upload-later" && (
                <div className="grid grid-cols-3">
                  <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">ファイル</div>
                  <div className="col-span-2 p-2">表面／裏面</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 申込プラン（ダミー例） */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">申込プラン</CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <div className="border rounded-md divide-y text-semantic-fg-subtle">
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">主契約</div>
                <div className="col-span-2 p-2">入院給付金 日額5,000円 / 支払日数60日 / 手術Ⅱ型</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">特約</div>
                <div className="col-span-2 p-2">先進医療特約、がん一時給付特約</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-semantic-fg-subtle bg-table-header px-2 py-3 h-full flex items-center">月額保険料</div>
                <div className="col-span-2 p-2">6､580円</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アクション */}
        <div className="space-y-4">
          <Button onClick={handleSubmit} className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg" size="lg">
            この内容で申込する
          </Button>
          <Button onClick={handleBack} variant="outline" className="w-full button-standard focus-ring transition-normal" size="lg">
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


