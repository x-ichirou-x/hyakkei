/**
 * 告知画面（段階表示）
 *
 * 参考サンプルに基づき、以下の3設問を順に表示する告知入力画面。
 * 1) 直近3か月以内の入院・手術の有無（はい/いいえ）
 * 2) 過去5年以内のがん罹患歴の有無（はい/いいえ）
 * 3) 血圧（最高/最低）の数値入力
 *
 * 仕様:
 * - 設問は1つ回答すると次の設問が下に現れる段階表示
 * - すべて完了で「次へ」活性
 * - 現時点では「次へ」は遷移なし（仕様決定後に接続）
 * - 戻るは /medical/pre-notice-check
 * - 入力は localStorage に保存・復元
 */

"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Stepper from "@/components/ui/stepper"
import SectionHeading from "@/components/ui/section-heading"
import { Phone, ArrowLeft, ArrowRight, Info } from "lucide-react"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"
import Image from "next/image"

/**
 * 画面内で使用する型定義
 */
interface NoticeAnswers {
  recentHospitalization: "yes" | "no" | ""
  pastCancer: "yes" | "no" | ""
  bloodPressureSystolic: string
  bloodPressureDiastolic: string
}

/** ローカルストレージキー */
const storageKey = "medical_notice_answers"

/**
 * 告知画面 ルートコンポーネント
 */
export default function MedicalNoticePage() {
  // 回答状態
  const [answers, setAnswers] = useState<NoticeAnswers>({
    recentHospitalization: "",
    pastCancer: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
  })

  // 入力エラー
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // 段階表示のアニメーション制御
  const [mountQ2, setMountQ2] = useState(false)
  const [mountQ3, setMountQ3] = useState(false)
  const [animateQ2, setAnimateQ2] = useState(false)
  const [animateQ3, setAnimateQ3] = useState(false)

  // 初期化：保存状態を復元
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<NoticeAnswers>
        setAnswers((prev) => ({ ...prev, ...parsed }))
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("notice:load", { functionName: "useEffect(load)", message })
    }
  }, [])

  // 保存
  const save = (next: NoticeAnswers) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("notice:save", { functionName: "save", next, message })
    }
  }

  /** 値変更の共通ハンドラ */
  const update = (patch: Partial<NoticeAnswers>) => {
    const next = { ...answers, ...patch }
    setAnswers(next)
    save(next)
  }

  // 表示フラグ（回答済みで次問を表示）
  const showQ2 = answers.recentHospitalization !== ""
  const showQ3 = answers.pastCancer !== ""

  // マウントとふわっと表示のトリガ
  useEffect(() => {
    if (showQ2 && !mountQ2) {
      setMountQ2(true)
      setTimeout(() => setAnimateQ2(true), 40)
    }
  }, [showQ2, mountQ2])

  useEffect(() => {
    if (showQ3 && !mountQ3) {
      setMountQ3(true)
      setTimeout(() => setAnimateQ3(true), 40)
    }
  }, [showQ3, mountQ3])

  /** 血圧入力の検証 */
  const validateBloodPressure = (): boolean => {
    const systolic = Number(answers.bloodPressureSystolic)
    const diastolic = Number(answers.bloodPressureDiastolic)
    const newErrors: { [key: string]: string } = {}

    if (!Number.isFinite(systolic)) {
      newErrors.bloodPressureSystolic = "最高血圧は数値で入力してください"
    } else if (systolic < 70 || systolic > 260) {
      newErrors.bloodPressureSystolic = "最高血圧は70〜260の範囲で入力してください"
    }

    if (!Number.isFinite(diastolic)) {
      newErrors.bloodPressureDiastolic = "最低血圧は数値で入力してください"
    } else if (diastolic < 40 || diastolic > 160) {
      newErrors.bloodPressureDiastolic = "最低血圧は40〜160の範囲で入力してください"
    }

    if (!newErrors.bloodPressureSystolic && !newErrors.bloodPressureDiastolic) {
      if (systolic <= diastolic) {
        newErrors.bloodPressureSystolic = "最高血圧は最低血圧より大きい値を入力してください"
      }
    }

    setErrors((prev) => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  /** 完了可否（全回答済み＋血圧妥当） */
  const canProceed = useMemo(() => {
    if (!answers.recentHospitalization) return false
    if (!answers.pastCancer) return false
    if (!answers.bloodPressureSystolic || !answers.bloodPressureDiastolic) return false
    return validateBloodPressure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers])

  /** 次へ（現時点ではログのみ） */
  const handleNext = () => {
    try {
      if (!canProceed) return
      // console.log("notice:submit", answers)
      // 次画面へ遷移（受取人・指定代理請求人の入力）
      window.location.href = "/medical/beneficiary"
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("notice:submitError", { functionName: "handleNext", answers, message })
    }
  }

  const handleBack = () => {
    window.location.href = "/medical/pre-notice-check"
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>

      {/* ステップバー: STEP 3（告知） */}
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
          <SectionHeading title="健康状態に関する告知の入力" className="mb-4" />
          <p className="text-body text-semantic-fg-subtle">
            入院・手術・疾病の告知と血圧のご入力をお願いします。1つ回答すると、次の設問が表示されます。
          </p>
        </div>

        {/* 設問1 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">直近3か月以内の入院・手術について</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-body text-semantic-fg-subtle">
              直近3か月以内に、医師により入院・手術（カテーテル・レーザー・内視鏡などを含む）をすすめられたことはありますか？
            </p>
            <RadioGroup
              value={answers.recentHospitalization}
              onValueChange={(v) => update({ recentHospitalization: v as "yes" | "no" })}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem id="q1-no" value="no" />
                <Label htmlFor="q1-no" className="text-body">いいえ</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem id="q1-yes" value="yes" />
                <Label htmlFor="q1-yes" className="text-body">はい</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* 設問2：設問1の回答後に表示 */}
        {mountQ2 && (
          <div className={`mt-4 transform transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
            animateQ2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
          }`}>
            <Card className="card-standard">
              <CardHeader>
                <CardTitle className="text-h2">過去5年以内にがんに罹患したことがありますか</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-body text-semantic-fg-subtle">
                  過去5年以内に、医師から「がん（上皮内がん・早期がんを含む）」の診断を受けた、
                  または治療・経過観察を受けたことがありますか。
                </p>
                <RadioGroup
                  value={answers.pastCancer}
                  onValueChange={(v) => update({ pastCancer: v as "yes" | "no" })}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem id="q2-no" value="no" />
                    <Label htmlFor="q2-no" className="text-body">いいえ</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem id="q2-yes" value="yes" />
                    <Label htmlFor="q2-yes" className="text-body">はい</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 設問3：設問2の回答後に表示 */}
        {mountQ3 && (
          <div className={`mt-4 transform transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
            animateQ3 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
          }`}>
            <Card className="card-standard">
              <CardHeader>
                <CardTitle className="text-h2">血圧の入力</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-body text-semantic-fg-subtle">
                  最近の測定結果をご入力ください。単位はmmHgです。半角数字で、概数でも構いません。
                  医療機関で治療中の場合は、普段の安定時の値をご記入ください。
                </p>
                <div>
                  <Label className="text-body font-medium">最高血圧（mmHg）</Label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="例) 130"
                    value={answers.bloodPressureSystolic}
                    onChange={(e) => update({ bloodPressureSystolic: e.target.value })}
                    className="input-standard text-body w-40"
                  />
                  {errors.bloodPressureSystolic && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.bloodPressureSystolic}</p>
                  )}
                </div>
                <div>
                  <Label className="text-body font-medium">最低血圧（mmHg）</Label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="例) 85"
                    value={answers.bloodPressureDiastolic}
                    onChange={(e) => update({ bloodPressureDiastolic: e.target.value })}
                    className="input-standard text-body w-40"
                  />
                  {errors.bloodPressureDiastolic && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.bloodPressureDiastolic}</p>
                  )}
                </div>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-caption text-semantic-fg-subtle">
                    数値は最近の測定結果をご入力ください。概数でも構いません。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}

        {/* アクションボタン */}
        <div className="mt-8 space-y-4">
          <Button 
            onClick={handleNext}
            className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg"
            size="lg"
            disabled={!canProceed}
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
        </div>
      </div>

      {/* 旧フッター余白・罫線を削除 */}
      <div className="bg-white border-t"></div>
      <MedicalFooter />
    </div>
  )
}


