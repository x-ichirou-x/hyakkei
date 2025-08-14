/**
 * 受取人・指定代理請求人の登録画面
 *
 * 申込フローにおいて、保険金受取人と指定代理請求人（受取人が請求できない場合の代理請求人）
 * の基本情報を登録する画面。各セクションで氏名、氏名（カナ）、生年月日、性別、続柄を入力する。
 *
 * 主な仕様:
 * - ルート: /medical/beneficiary
 * - 前後遷移: 戻る=/medical/notice、次へ=現時点ではログ出力のみ
 * - 入力検証: 必須・形式（カナ/日付）・範囲（年齢0–120）
 * - 保存: localStorage に入力内容を保存/復元
 * - ステップ: ダミーのステッパーでSTEP 5として表示
 */

"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Stepper from "@/components/ui/stepper"
import { Phone, ArrowLeft, ArrowRight, Info } from "lucide-react"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"
import SectionHeading from "@/components/ui/section-heading"
import Image from "next/image"

/**
 * 個人情報の型
 * @property {string} lastName 姓（漢字）
 * @property {string} firstName 名（漢字）
 * @property {string} lastNameKana セイ（全角カナ）
 * @property {string} firstNameKana メイ（全角カナ）
 * @property {string} dateOfBirth 生年月日(YYYY-MM-DD)
 * @property {"male"|"female"|""} gender 性別
 * @property {string} relation 続柄
 */
interface PersonInfo {
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  dateOfBirth: string
  gender: "male" | "female" | ""
  relation: string
}

/** 保存キー */
const storageKey = "medical_beneficiary_info"

/** 続柄の選択肢 */
const relationOptions = [
  { value: "spouse", label: "配偶者" },
  { value: "child", label: "子" },
  { value: "parent", label: "父母" },
  { value: "sibling", label: "兄弟姉妹" },
  { value: "other", label: "その他" },
]

/**
 * 画面コンポーネント
 */
export default function BeneficiaryPage() {
  /** 入力状態 */
  const [beneficiary, setBeneficiary] = useState<PersonInfo>({
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    dateOfBirth: "",
    gender: "",
    relation: "",
  })
  const [agent, setAgent] = useState<PersonInfo>({
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    dateOfBirth: "",
    gender: "",
    relation: "",
  })

  /** 各種フラグ */
  // 指定代理請求人は受取人と同一にできる（既定で同一）
  const [sameAsBeneficiary, setSameAsBeneficiary] = useState(true)

  /** エラー/表示制御 */
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [showAllErrors, setShowAllErrors] = useState(false)
  const sameCheckboxRef = useRef<HTMLInputElement | null>(null)

  /** 保存の復元 */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as {
          beneficiary?: PersonInfo
          agent?: PersonInfo
          sameAsBeneficiary?: boolean
        }
        if (parsed.beneficiary) setBeneficiary(parsed.beneficiary)
        if (parsed.agent) setAgent(parsed.agent)
        if (typeof parsed.sameAsBeneficiary === "boolean") setSameAsBeneficiary(parsed.sameAsBeneficiary)
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("beneficiary:load", { functionName: "useEffect(load)", message })
    }
  }, [])

  /** 保存 */
  const persist = (next: Partial<{ beneficiary: PersonInfo; agent: PersonInfo; sameAsBeneficiary: boolean }>) => {
    try {
      const snapshot = {
        beneficiary,
        agent,
        sameAsBeneficiary,
        ...next,
      }
      window.localStorage.setItem(storageKey, JSON.stringify(snapshot))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("beneficiary:persist", { functionName: "persist", next, message })
    }
  }

  /** 入力更新 */
  const updateBeneficiary = (patch: Partial<PersonInfo>) => {
    const next = { ...beneficiary, ...patch }
    setBeneficiary(next)
    persist({ beneficiary: next })
    const [key, val] = Object.entries(patch)[0] as [keyof PersonInfo, any]
    if (key) validateField('beneficiary', key, String(val ?? ''))
  }
  const updateAgent = (patch: Partial<PersonInfo>) => {
    const next = { ...agent, ...patch }
    setAgent(next)
    persist({ agent: next })
    const [key, val] = Object.entries(patch)[0] as [keyof PersonInfo, any]
    if (key) validateField('agent', key, String(val ?? ''))
  }

  /** 純粋関数: 入力値からエラーを計算 */
  const getPersonErrors = (who: 'beneficiary' | 'agent', person: PersonInfo): Record<string, string> => {
    const prefix = who === 'beneficiary' ? '受取人' : '指定代理請求人'
    const localErrors: Record<string, string> = {}
    const isKanji = (v: string) => /^[\u4e00-\u9faf]+$/.test(v)
    const isKana = (v: string) => /^[\u30A0-\u30FF]+$/.test(v)

    if (!person.lastName) localErrors[`${who}.lastName`] = `${prefix}の姓を入力してください`
    else if (!isKanji(person.lastName)) localErrors[`${who}.lastName`] = `${prefix}の姓は漢字で入力してください`

    if (!person.firstName) localErrors[`${who}.firstName`] = `${prefix}の名を入力してください`
    else if (!isKanji(person.firstName)) localErrors[`${who}.firstName`] = `${prefix}の名は漢字で入力してください`

    if (!person.lastNameKana) localErrors[`${who}.lastNameKana`] = `${prefix}のセイを入力してください`
    else if (!isKana(person.lastNameKana)) localErrors[`${who}.lastNameKana`] = `${prefix}のセイは全角カナで入力してください`

    if (!person.firstNameKana) localErrors[`${who}.firstNameKana`] = `${prefix}のメイを入力してください`
    else if (!isKana(person.firstNameKana)) localErrors[`${who}.firstNameKana`] = `${prefix}のメイは全角カナで入力してください`

    if (!person.dateOfBirth) localErrors[`${who}.dateOfBirth`] = `${prefix}の生年月日を入力してください`
    else {
      const d = new Date(person.dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - d.getFullYear()
      const m = today.getMonth() - d.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--
      if (isNaN(d.getTime())) localErrors[`${who}.dateOfBirth`] = `${prefix}の生年月日が正しくありません`
      else if (age < 0 || age > 120) localErrors[`${who}.dateOfBirth`] = `${prefix}の生年月日が正しくありません`
    }

    if (!person.gender) localErrors[`${who}.gender`] = `${prefix}の性別を選択してください`
    if (!person.relation) localErrors[`${who}.relation`] = `${prefix}との続柄を選択してください`

    return localErrors
  }

  /** 単一フィールドの再計算 */
  const validateField = (who: 'beneficiary' | 'agent', field: keyof PersonInfo, value: string) => {
    const snapshot = who === 'beneficiary' ? { ...beneficiary, [field]: value } : { ...agent, [field]: value }
    const next = getPersonErrors(who, snapshot)
    setErrors((prev) => {
      const cleared = { ...prev }
      Object.keys(prev).forEach((k) => { if (k.startsWith(`${who}.`)) delete (cleared as any)[k] })
      return { ...cleared, ...next }
    })
  }

  /** 完了可否 */
  const canProceed = useMemo(() => {
    const e1 = getPersonErrors('beneficiary', beneficiary)
    const e2 = sameAsBeneficiary ? {} : getPersonErrors('agent', agent)
    return Object.keys(e1).length === 0 && Object.keys(e2).length === 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beneficiary, agent, sameAsBeneficiary])


  /** 次へ */
  const handleNext = () => {
    try {
      const e1 = getPersonErrors('beneficiary', beneficiary)
      const e2 = sameAsBeneficiary ? {} : getPersonErrors('agent', agent)
      const merged = { ...e1, ...e2 }
      setErrors(merged)
      setShowAllErrors(true)
      if (Object.keys(merged).length > 0) return
      console.log('beneficiary:submit', { beneficiary, agent, sameAsBeneficiary })
      // 次へ（支払い方法の登録）
      window.location.href = '/medical/payment'
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("beneficiary:submitError", {
        functionName: "handleNext",
        beneficiary,
        agent,
        sameAsBeneficiary,
        message,
      })
    }
  }

  const handleBack = () => {
    window.location.href = "/medical/notice"
  }

  /** 受取人入力フォーム（レンダラ） */
  const renderBeneficiaryForm = () => (
    <Card className="card-standard">
      <CardHeader>
        <CardTitle className="text-h2">受取人情報の入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-body font-medium">氏名（漢字）</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="例) 保険" value={beneficiary.lastName} onChange={(e) => updateBeneficiary({ lastName: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['beneficiary.lastName']: true }))} className="input-standard text-body" />
              <Input placeholder="例) 太郎" value={beneficiary.firstName} onChange={(e) => updateBeneficiary({ firstName: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['beneficiary.firstName']: true }))} className="input-standard text-body" />
            </div>
            {errors["beneficiary.lastName"] && (touched['beneficiary.lastName'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["beneficiary.lastName"]}</p>}
            {errors["beneficiary.firstName"] && (touched['beneficiary.firstName'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["beneficiary.firstName"]}</p>}
          </div>

          <div>
            <Label className="text-body font-medium">氏名（カナ）</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="例) ホケン" value={beneficiary.lastNameKana} onChange={(e) => updateBeneficiary({ lastNameKana: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['beneficiary.lastNameKana']: true }))} className="input-standard text-body" />
              <Input placeholder="例) タロウ" value={beneficiary.firstNameKana} onChange={(e) => updateBeneficiary({ firstNameKana: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['beneficiary.firstNameKana']: true }))} className="input-standard text-body" />
            </div>
            {errors["beneficiary.lastNameKana"] && (touched['beneficiary.lastNameKana'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["beneficiary.lastNameKana"]}</p>}
            {errors["beneficiary.firstNameKana"] && (touched['beneficiary.firstNameKana'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["beneficiary.firstNameKana"]}</p>}
          </div>

          <div>
            <Label className="text-body font-medium">生年月日</Label>
            <Input type="date" value={beneficiary.dateOfBirth} onChange={(e) => updateBeneficiary({ dateOfBirth: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['beneficiary.dateOfBirth']: true }))} className="input-standard text-body" />
            {errors["beneficiary.dateOfBirth"] && (touched['beneficiary.dateOfBirth'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["beneficiary.dateOfBirth"]}</p>}
          </div>

          <div>
            <Label className="text-body font-medium">性別</Label>
            <RadioGroup value={beneficiary.gender} onValueChange={(v) => { updateBeneficiary({ gender: v as PersonInfo["gender"] }); setTouched((t) => ({ ...t, ['beneficiary.gender']: true })) }} className="flex items-center space-x-6 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id={`beneficiary-male`} value="male" />
                <Label htmlFor={`beneficiary-male`} className="text-body">男性</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id={`beneficiary-female`} value="female" />
                <Label htmlFor={`beneficiary-female`} className="text-body">女性</Label>
              </div>
            </RadioGroup>
            {errors["beneficiary.gender"] && (touched['beneficiary.gender'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["beneficiary.gender"]}</p>}
          </div>

          <div>
            <Label className="text-body font-medium">被保険者からみた続柄</Label>
            <Select value={beneficiary.relation} onValueChange={(v) => { updateBeneficiary({ relation: v }); setTouched((t) => ({ ...t, ['beneficiary.relation']: true })) }}>
              <SelectTrigger className="input-standard text-body">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {relationOptions.map((opt) => (
                  <SelectItem key={`beneficiary-${opt.value}`} value={opt.value} className="text-body">{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["beneficiary.relation"] && (touched['beneficiary.relation'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["beneficiary.relation"]}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  /** 指定代理請求人入力フォーム（レンダラ） */
  const renderAgentForm = () => (
    <Card className="card-standard">
      <CardHeader>
        <CardTitle className="text-h2">指定代理請求人情報の入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id={`agent-same`}
            checked={sameAsBeneficiary}
            ref={sameCheckboxRef as any}
            onCheckedChange={(c) => {
              const v = Boolean(c)
              const currentY = window.scrollY
              setSameAsBeneficiary(v)
              persist({ sameAsBeneficiary: v })
              if (v) {
                // 同一の場合は指定代理請求人のエラー/タッチ状態をクリア
                setErrors((prev) => {
                  const cleared = { ...prev }
                  Object.keys(prev).forEach((k) => { if (k.startsWith('agent.')) delete (cleared as any)[k] })
                  return cleared
                })
                setTouched((prev) => {
                  const cleared: Record<string, boolean> = { ...prev }
                  Object.keys(prev).forEach((k) => { if (k.startsWith('agent.')) delete cleared[k] })
                  return cleared
                })
              }
              // 再描画後にスクロール位置を維持
              requestAnimationFrame(() => {
                window.scrollTo({ top: currentY, left: 0 })
                try { sameCheckboxRef.current?.focus({ preventScroll: true } as any) } catch {}
              })
            }}
          />
          <label htmlFor={`agent-same`} className="text-body">受取人と同一</label>
        </div>

        {!sameAsBeneficiary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-body font-medium">氏名（漢字）</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="例) 保険" value={agent.lastName} onChange={(e) => updateAgent({ lastName: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['agent.lastName']: true }))} className="input-standard text-body" />
                <Input placeholder="例) 太郎" value={agent.firstName} onChange={(e) => updateAgent({ firstName: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['agent.firstName']: true }))} className="input-standard text-body" />
              </div>
              {errors["agent.lastName"] && <p className="text-semantic-danger text-caption mt-1">{errors["agent.lastName"]}</p>}
              {errors["agent.firstName"] && <p className="text-semantic-danger text-caption mt-1">{errors["agent.firstName"]}</p>}
            </div>

            <div>
              <Label className="text-body font-medium">氏名（カナ）</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="例) ホケン" value={agent.lastNameKana} onChange={(e) => updateAgent({ lastNameKana: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['agent.lastNameKana']: true }))} className="input-standard text-body" />
                <Input placeholder="例) タロウ" value={agent.firstNameKana} onChange={(e) => updateAgent({ firstNameKana: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['agent.firstNameKana']: true }))} className="input-standard text-body" />
              </div>
              {errors["agent.lastNameKana"] && <p className="text-semantic-danger text-caption mt-1">{errors["agent.lastNameKana"]}</p>}
              {errors["agent.firstNameKana"] && <p className="text-semantic-danger text-caption mt-1">{errors["agent.firstNameKana"]}</p>}
            </div>

            <div>
              <Label className="text-body font-medium">生年月日</Label>
              <Input type="date" value={agent.dateOfBirth} onChange={(e) => updateAgent({ dateOfBirth: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, ['agent.dateOfBirth']: true }))} className="input-standard text-body" />
              {errors["agent.dateOfBirth"] && (touched['agent.dateOfBirth'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["agent.dateOfBirth"]}</p>}
            </div>

            <div>
              <Label className="text-body font-medium">性別</Label>
              <RadioGroup value={agent.gender} onValueChange={(v) => { updateAgent({ gender: v as PersonInfo["gender"] }); setTouched((t) => ({ ...t, ['agent.gender']: true })) }} className="flex items-center space-x-6 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id={`agent-male`} value="male" />
                  <Label htmlFor={`agent-male`} className="text-body">男性</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id={`agent-female`} value="female" />
                  <Label htmlFor={`agent-female`} className="text-body">女性</Label>
                </div>
              </RadioGroup>
              {errors["agent.gender"] && (touched['agent.gender'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["agent.gender"]}</p>}
            </div>

            <div>
              <Label className="text-body font-medium">被保険者からみた続柄</Label>
              <Select value={agent.relation} onValueChange={(v) => { updateAgent({ relation: v }); setTouched((t) => ({ ...t, ['agent.relation']: true })) }}>
                <SelectTrigger className="input-standard text-body">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {relationOptions.map((opt) => (
                    <SelectItem key={`agent-${opt.value}`} value={opt.value} className="text-body">{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors["agent.relation"] && (touched['agent.relation'] || showAllErrors) && <p className="text-semantic-danger text-caption mt-1">{errors["agent.relation"]}</p>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>


      {/* ステップバー: STEP 4 */}
      <Stepper
        currentStep={4}
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
        <div className="mb-2">
          <SectionHeading title="受取人・指定代理請求人の入力" className="mb-4" />
          <p className="text-body text-semantic-fg-subtle">
            受取人は保険金の受取先、指定代理請求人は受取人が請求できない場合に代わって請求できる方です。各項目をご入力ください。
          </p>
        </div>

        {/* 受取人（必須） */}
        {renderBeneficiaryForm()}

        {/* 指定代理請求人（受取人と同一がデフォルト。同一の場合は非表示） */}
        {renderAgentForm()}

        {/* 注意 */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-caption text-semantic-fg-subtle">
            続柄や氏名に誤りがあると、お支払いの遅延やお取扱いができない場合があります。正確にご入力ください。
          </AlertDescription>
        </Alert>

        {/* アクション */}
        <div className="mt-4 space-y-4">
          <Button onClick={handleNext} className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg" size="lg" disabled={!canProceed}>
            入力内容の確認へ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={handleBack} variant="outline" className="w-full button-standard focus-ring transition-normal" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
        </div>
      </div>

      {/* フッター */}
      <div className="bg-white border-t mt-12"></div>
      <MedicalFooter />
    </div>
  )
}


