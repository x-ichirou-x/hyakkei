/**
 * 保険料支払い方法登録画面
 *
 * 保険料の支払い方法として「クレジットカード」または「口座振替」を選択・登録する画面。
 * 選択内容は localStorage に保存し、再訪時に復元する。選択肢ごとに同意チェックを設け、
 * 同意が完了した場合にのみ「次へ」を活性化する。
 *
 * 主な仕様:
 * - ルート: /medical/payment
 * - 前後遷移: 戻る=/medical/beneficiary、次へ=現時点ではログ出力のみ
 * - UI: カード/ラジオ/チェック/アラート/ボタン/ステッパー
 * - トンマナ: ガイド準拠（見出し、本文、キャプション、意味色）
 */

"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Stepper from "@/components/ui/stepper"
import SectionHeading from "@/components/ui/section-heading"
import { Phone, ArrowLeft, ArrowRight, Info, CreditCard, Banknote } from "lucide-react"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"
import Image from "next/image"

/**
 * 保存キー
 * @type {string}
 */
const storageKey = "medical_payment_method"

/**
 * 支払い方法の型
 */
type PaymentMethod = "card" | "bank" | ""

/**
 * 画面コンポーネント
 */
export default function PaymentMethodPage() {
  // 選択状態
  const [method, setMethod] = useState<PaymentMethod>("")
  const [agreeCard, setAgreeCard] = useState(false)
  const [agreeBank, setAgreeBank] = useState(false)
  const [cardDialogOpen, setCardDialogOpen] = useState(false)
  const [cardRegistered, setCardRegistered] = useState(false)
  const [cardLast4, setCardLast4] = useState<string | null>(null)
  const [bankDialogOpen, setBankDialogOpen] = useState(false)
  const [bankRegistered, setBankRegistered] = useState(false)
  const [bankLast4, setBankLast4] = useState<string | null>(null)

  // ダイアログ内のカード情報
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvc, setCvc] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [bankErrors, setBankErrors] = useState<Record<string, string>>({})
  const [bankName, setBankName] = useState("")
  const [branchName, setBranchName] = useState("")
  const [accountType, setAccountType] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountHolder, setAccountHolder] = useState("")

  // 初期化: 保存済みの選択を復元
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as { method?: PaymentMethod; agreeCard?: boolean; agreeBank?: boolean; cardRegistered?: boolean; cardLast4?: string; bankRegistered?: boolean; bankLast4?: string }
      if (parsed.method) setMethod(parsed.method)
      if (typeof parsed.agreeCard === "boolean") setAgreeCard(parsed.agreeCard)
      if (typeof parsed.agreeBank === "boolean") setAgreeBank(parsed.agreeBank)
      if (typeof parsed.cardRegistered === "boolean") setCardRegistered(parsed.cardRegistered)
      if (parsed.cardLast4) setCardLast4(parsed.cardLast4)
      if (typeof parsed.bankRegistered === "boolean") setBankRegistered(parsed.bankRegistered)
      if (parsed.bankLast4) setBankLast4(parsed.bankLast4)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("payment:load", { functionName: "useEffect(load)", message })
    }
  }, [])

  // 保存
  const persist = (next: Partial<{ method: PaymentMethod; agreeCard: boolean; agreeBank: boolean; cardRegistered: boolean; cardLast4: string | null; bankRegistered: boolean; bankLast4: string | null }>) => {
    try {
      const snapshot = { method, agreeCard, agreeBank, cardRegistered, cardLast4, bankRegistered, bankLast4, ...next }
      window.localStorage.setItem(storageKey, JSON.stringify(snapshot))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("payment:persist", { functionName: "persist", next, message })
    }
  }

  // 次へ活性条件
  const canProceed = useMemo(() => {
    if (method === "card") return agreeCard && cardRegistered
    if (method === "bank") return agreeBank && bankRegistered
    return false
  }, [method, agreeCard, agreeBank, cardRegistered, bankRegistered])

  // 遷移
  const handleNext = () => {
    try {
      if (!canProceed) return
      console.log("payment:submit", { method, agreeCard, agreeBank })
      // 本人確認書類提出へ
      window.location.href = "/medical/identity"
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("payment:submitError", { functionName: "handleNext", method, agreeCard, agreeBank, message })
    }
  }

  const handleBack = () => {
    window.location.href = "/medical/beneficiary"
  }

  // カード登録ダイアログの検証と登録
  const validateCardForm = (): boolean => {
    const errors: Record<string, string> = {}
    const num = cardNumber.replace(/\s|-/g, "")
    if (!/^\d{14,19}$/.test(num)) errors.cardNumber = "カード番号は14〜19桁の数字で入力してください"
    const m = Number(expiryMonth)
    const y = Number(expiryYear)
    if (!(m >= 1 && m <= 12)) errors.expiry = "有効期限（月/年）を選択してください"
    else {
      const now = new Date()
      const cm = now.getMonth() + 1
      const cy = now.getFullYear() % 100
      if (y < cy || (y === cy && m < cm)) errors.expiry = "有効期限が過去になっています"
    }
    if (!/^\d{3,4}$/.test(cvc)) errors.cvc = "セキュリティコードは3〜4桁で入力してください"
    if (!cardHolder.trim()) errors.cardHolder = "名義人を入力してください"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleRegisterCard = () => {
    if (!validateCardForm()) return
    const last4 = cardNumber.replace(/\s|-/g, "").slice(-4)
    setCardRegistered(true)
    setCardLast4(last4)
    persist({ cardRegistered: true, cardLast4: last4 })
    setCardDialogOpen(false)
  }

  // 口座振替ダイアログの検証と登録
  const validateBankForm = (): boolean => {
    const errors: Record<string, string> = {}
    if (!bankName.trim()) errors.bankName = "金融機関名を入力してください"
    if (!branchName.trim()) errors.branchName = "支店名を入力してください"
    if (!accountType) errors.accountType = "口座種別を選択してください"
    const num = accountNumber.replace(/\D/g, "")
    if (!/^\d{7}$/.test(num)) errors.accountNumber = "口座番号は7桁の数字で入力してください"
    if (!accountHolder.trim()) errors.accountHolder = "口座名義を入力してください"
    setBankErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleRegisterBank = () => {
    if (!validateBankForm()) return
    const last4 = accountNumber.replace(/\D/g, "").slice(-4)
    setBankRegistered(true)
    setBankLast4(last4)
    persist({ bankRegistered: true, bankLast4: last4 })
    setBankDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>

      {/* ステップバー: STEP 5 */}
      <Stepper
        currentStep={5}
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

      <div className="container-responsive pt-2 pb-8 space-y-6">
        {/* タイトル */}
        <div>
          <SectionHeading title="保険料のお支払い方法" className="mb-4" />
          <p className="text-body text-semantic-fg-subtle">
            日頃からご利用のクレジットカードでのお支払いがおすすめです。口座振替もご利用いただけます。
          </p>
        </div>

        {/* 支払い方法の選択 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">保険料の支払い方法をお選びください</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={method} onValueChange={(v) => { setMethod(v as PaymentMethod); persist({ method: v as PaymentMethod }) }} className="space-y-3">
              <div className={`flex items-center justify-between p-3 rounded-md border ${method === 'card' ? 'border-semantic-accent' : 'border-semantic-border'}`}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem id="pm-card" value="card" />
                  <Label htmlFor="pm-card" className="text-body flex items-center space-x-2">
                    <img src="/payment-card.png" alt="クレジットカード" className="h-5 w-auto" />
                    <span>クレジットカード</span>
                  </Label>
                </div>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-md border ${method === 'bank' ? 'border-semantic-accent' : 'border-semantic-border'}`}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem id="pm-bank" value="bank" />
                  <Label htmlFor="pm-bank" className="text-body flex items-center space-x-2">
                    <img src="/payment-bank.png" alt="口座振替" className="h-5 w-auto" />
                    <span>口座振替</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* クレジットカード案内 */}
        {method === "card" && (
          <Card className="card-standard">
            <CardHeader>
              <CardTitle className="text-h2">保険料クレジットカード払いのご案内</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-caption text-semantic-fg-subtle">
                  保険契約者本人名義のクレジットカードをご指定ください。ご利用になれるブランドはお客様のカード会社により異なる場合があります。
                </AlertDescription>
              </Alert>

              {/* 利用できるクレジットカードの種類（呼び出し側に表示） */}
              <div className="space-y-2">
                <p className="text-body text-semantic-fg-subtle">利用できるクレジットカードの種類は以下の通りです。</p>
                <div>
                  <img src="/card-brands.png" alt="利用できるクレジットカードの種類" className="h-12 sm:h-16 w-auto object-contain" />
                </div>
              </div>
              <Dialog open={cardDialogOpen} onOpenChange={setCardDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full py-4 text-body button-standard focus-ring transition-normal bg-green-600 text-white">
                    クレジットカードを登録する
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md modal-standard">
                  <DialogHeader>
                    <DialogTitle>クレジットカードの登録</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-body font-medium">カード番号</Label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        inputMode="numeric"
                        className="input-standard text-body"
                      />
                      {formErrors.cardNumber && (<p className="text-semantic-danger text-caption mt-1">{formErrors.cardNumber}</p>)}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-body font-medium">有効期限（月）</Label>
                        <Select value={expiryMonth} onValueChange={(v) => setExpiryMonth(v)}>
                          <SelectTrigger className="input-standard text-body">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }).map((_, i) => { const mm = String(i + 1).padStart(2, '0'); return (<SelectItem key={mm} value={mm} className="text-body">{mm}</SelectItem>) })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-body font-medium">有効期限（年）</Label>
                        <Select value={expiryYear} onValueChange={(v) => setExpiryYear(v)}>
                          <SelectTrigger className="input-standard text-body">
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 21 }).map((_, i) => { const yy = String((new Date().getFullYear() % 100) + i).padStart(2, '0'); return (<SelectItem key={yy} value={yy} className="text-body">{yy}</SelectItem>) })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {formErrors.expiry && (<p className="text-semantic-danger text-caption">{formErrors.expiry}</p>)}
                    <div>
                      <Label className="text-body font-medium">セキュリティコード（CVC）</Label>
                      <Input
                        placeholder="例) 123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        inputMode="numeric"
                        className="input-standard text-body w-32"
                      />
                      {formErrors.cvc && (<p className="text-semantic-danger text-caption mt-1">{formErrors.cvc}</p>)}
                    </div>
                    <div>
                      <Label className="text-body font-medium">名義人（半角ローマ字推奨）</Label>
                      <Input
                        placeholder="TARO YAMADA"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="input-standard text-body"
                      />
                      {formErrors.cardHolder && (<p className="text-semantic-danger text-caption mt-1">{formErrors.cardHolder}</p>)}
                    </div>
                    <div className="pt-2">
                      <Button onClick={handleRegisterCard} className="w-full py-3 button-standard bg-semantic-accent text-semantic-bg">登録する</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {cardRegistered && cardLast4 && (
                <p className="text-caption text-semantic-fg-subtle">登録済みカード: **** **** **** {cardLast4}</p>
              )}

            </CardContent>
          </Card>
        )}

        {/* 口座振替案内 */}
        {method === "bank" && (
          <Card className="card-standard">
            <CardHeader>
              <CardTitle className="text-h2">口座振替のご案内</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-caption text-semantic-fg-subtle">
                  振替口座の名義は保険契約者本人に限ります。下の「口座情報を登録する」ボタンから口座情報をご登録ください。
                </AlertDescription>
              </Alert>
              <Dialog open={bankDialogOpen} onOpenChange={setBankDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full py-4 text-body button-standard focus-ring transition-normal bg-green-600 text-white">
                    口座情報を登録する
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md modal-standard">
                  <DialogHeader>
                    <DialogTitle>口座情報の登録</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-body font-medium">金融機関名</Label>
                      <Input value={bankName} onChange={(e) => setBankName(e.target.value)} className="input-standard text-body" />
                      {bankErrors.bankName && (<p className="text-semantic-danger text-caption mt-1">{bankErrors.bankName}</p>)}
                    </div>
                    <div>
                      <Label className="text-body font-medium">支店名</Label>
                      <Input value={branchName} onChange={(e) => setBranchName(e.target.value)} className="input-standard text-body" />
                      {bankErrors.branchName && (<p className="text-semantic-danger text-caption mt-1">{bankErrors.branchName}</p>)}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-body font-medium">口座種別</Label>
                        <Select value={accountType} onValueChange={(v) => setAccountType(v)}>
                          <SelectTrigger className="input-standard text-body">
                            <SelectValue placeholder="選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ordinary" className="text-body">普通</SelectItem>
                            <SelectItem value="checking" className="text-body">当座</SelectItem>
                          </SelectContent>
                        </Select>
                        {bankErrors.accountType && (<p className="text-semantic-danger text-caption mt-1">{bankErrors.accountType}</p>)}
                      </div>
                      <div>
                        <Label className="text-body font-medium">口座番号（7桁）</Label>
                        <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} inputMode="numeric" className="input-standard text-body" />
                        {bankErrors.accountNumber && (<p className="text-semantic-danger text-caption mt-1">{bankErrors.accountNumber}</p>)}
                      </div>
                    </div>
                    <div>
                      <Label className="text-body font-medium">口座名義</Label>
                      <Input value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} className="input-standard text-body" />
                      {bankErrors.accountHolder && (<p className="text-semantic-danger text-caption mt-1">{bankErrors.accountHolder}</p>)}
                    </div>
                    <div className="pt-2">
                      <Button onClick={handleRegisterBank} className="w-full py-3 button-standard bg-semantic-accent text-semantic-bg">登録する</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {bankRegistered && bankLast4 && (
                <p className="text-caption text-semantic-fg-subtle">登録済み口座: ****{bankLast4}</p>
              )}

            </CardContent>
          </Card>
        )}

        {/* アクション */}
        <div className="space-y-4">
          <Button onClick={handleNext} className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg" size="lg" disabled={!canProceed}>
            次へ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={handleBack} variant="outline" className="w-full button-standard focus-ring transition-normal" size="lg">
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


