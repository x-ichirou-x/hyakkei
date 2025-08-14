/**
 * 本人確認書類提出画面
 *
 * 申込に必要な本人確認書類（画像）の提出方法を選択し、
 * その場でアップロードするか、後で提出するかを切り替えられる画面。
 * 書類種別の選択と、表面/裏面の画像アップロードをサポートする。
 * 入力内容は localStorage に保存し、再訪時に復元する。
 */

"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Stepper from "@/components/ui/stepper"
import SectionHeading from "@/components/ui/section-heading"
import { Phone, ArrowLeft, ArrowRight, Info, CheckCircle, X } from "lucide-react"
import Image from "next/image"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"

type SubmitMethod = "upload-now" | "upload-later"

interface KycState {
  method: SubmitMethod
  docType: string
  frontName?: string
  backName?: string
}

const storageKey = "medical_kyc_state"

export default function IdentityUploadPage() {
  // 送信方法・書類種別
  const [method, setMethod] = useState<SubmitMethod>("upload-now")
  const [docType, setDocType] = useState("")

  // 画像プレビュー
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)
  const [frontUrl, setFrontUrl] = useState<string | null>(null)
  const [backUrl, setBackUrl] = useState<string | null>(null)

  // 復元
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as KycState
      if (parsed.method) setMethod(parsed.method)
      if (parsed.docType) setDocType(parsed.docType)
    } catch {}
  }, [])

  const persist = (next: Partial<KycState>) => {
    try {
      const snapshot: KycState = {
        method,
        docType,
        frontName: frontFile?.name,
        backName: backFile?.name,
        ...next,
      }
      window.localStorage.setItem(storageKey, JSON.stringify(snapshot))
    } catch {}
  }

  const canProceed = useMemo(() => {
    if (method === "upload-later") return true
    // その場アップロード時は書類種別と表面必須、裏面は種別により任意
    const docRequiredBack = ["運転免許証"].includes(docType)
    const okFront = Boolean(frontFile)
    const okBack = docRequiredBack ? Boolean(backFile) : true
    return docType !== "" && okFront && okBack
  }, [method, docType, frontFile, backFile])

  const handleFront = (file: File | undefined) => {
    if (!file) return
    setFrontFile(file)
    setFrontUrl(URL.createObjectURL(file))
  }
  const handleBack = (file: File | undefined) => {
    if (!file) return
    setBackFile(file)
    setBackUrl(URL.createObjectURL(file))
  }

  const handleNext = () => {
    persist({})
    if (!canProceed) return
    console.log("kyc:submit", { method, docType, front: frontFile?.name, back: backFile?.name })
    // 確認画面へ遷移
    window.location.href = "/medical/confirm"
  }

  const handleBackNav = () => {
    window.location.href = "/medical/payment"
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* import: 共通ヘッダー */}
      {/* @ts-expect-error: next auto import suppressed; using path alias */}
      {/**/}
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>

      {/* ステップバー: STEP 6 */}
      <Stepper
        currentStep={6}
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
          <SectionHeading title="本人確認書類の提出方法の選択" className="mb-4" />
          <p className="text-body text-semantic-fg-subtle">
            お申込みには、本人確認のための書類画像の提出が必要です。提出方法を選択してください。
          </p>
        </div>

        {/* 方法選択 */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2">提出方法</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={method} onValueChange={(v) => { setMethod(v as SubmitMethod); persist({ method: v as SubmitMethod }) }}>
              <div className={`flex items-center space-x-3 p-3 rounded-md border ${method === 'upload-now' ? 'border-semantic-accent' : 'border-semantic-border'}`}>
                <RadioGroupItem id="m-now" value="upload-now" />
                <Label htmlFor="m-now" className="text-body">画像を提出（アップロード）する</Label>
              </div>
              <div className={`mt-2 flex items-center space-x-3 p-3 rounded-md border ${method === 'upload-later' ? 'border-semantic-accent' : 'border-semantic-border'}`}>
                <RadioGroupItem id="m-later" value="upload-later" />
                <Label htmlFor="m-later" className="text-body">あとで提出（アップロード）する</Label>
              </div>
            </RadioGroup>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-caption text-semantic-fg-subtle">
                「あとで提出」を選んだ場合は、申込完了後に届く案内から専用ページでご提出いただきます。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* その場アップロード */}
        {method === "upload-now" && (
          <Card className="card-standard">
            <CardHeader>
              <CardTitle className="text-h2">書類のアップロード</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-body font-medium">本人確認書類の種類を選ぶ</Label>
                <Select value={docType} onValueChange={(v) => { setDocType(v); persist({ docType: v }) }}>
                  <SelectTrigger className="input-standard text-body mt-2">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="運転免許証" className="text-body">運転免許証</SelectItem>
                    <SelectItem value="マイナンバーカード" className="text-body">マイナンバーカード（個人番号カード）</SelectItem>
                    <SelectItem value="健康保険証" className="text-body">健康保険証</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-caption text-semantic-fg-subtle mt-2">※ 種類によっては裏面の提出が必要です。</p>
              </div>

              {/* 表面 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-body font-medium">表面</Label>
                  {frontFile && <span className="inline-flex items-center text-semantic-success text-caption"><CheckCircle className="h-4 w-4 mr-1" />OK</span>}
                </div>
                {!frontUrl ? (
                  <label className="block border border-dashed border-semantic-border rounded-md p-6 text-center cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFront(e.target.files?.[0])} />
                    <span className="text-body">表面をアップロード</span>
                  </label>
                ) : (
                  <div className="relative border border-semantic-border rounded-md p-2">
                    <button className="absolute right-2 top-2" onClick={() => { setFrontFile(null); setFrontUrl(null) }} aria-label="削除"><X className="h-4 w-4" /></button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={frontUrl} alt="表面プレビュー" className="max-h-60 object-contain mx-auto" />
                    <div className="text-center mt-2">
                      <Button variant="outline" size="sm" onClick={() => document.getElementById("frontRe")?.click()}>再度アップロード</Button>
                      <input id="frontRe" type="file" accept="image/*" className="hidden" onChange={(e) => handleFront(e.target.files?.[0])} />
                    </div>
                  </div>
                )}
              </div>

              {/* 裏面（必要に応じて） */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-body font-medium">裏面</Label>
                </div>
                {!backUrl ? (
                  <label className="block border border-dashed border-semantic-border rounded-md p-6 text-center cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleBack(e.target.files?.[0])} />
                    <span className="text-body">裏面をアップロード</span>
                  </label>
                ) : (
                  <div className="relative border border-semantic-border rounded-md p-2">
                    <button className="absolute right-2 top-2" onClick={() => { setBackFile(null); setBackUrl(null) }} aria-label="削除"><X className="h-4 w-4" /></button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={backUrl} alt="裏面プレビュー" className="max-h-60 object-contain mx-auto" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* アクション */}
        <div className="space-y-4">
          <Button onClick={handleNext} className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg" size="lg" disabled={!canProceed}>
            次へ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={handleBackNav} variant="outline" className="w-full button-standard focus-ring transition-normal" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
        </div>
      </div>

      {/* 旧フッター余白・罫線を削除 */}
      <div className="bg-white border-t mt-12"></div>
      <MedicalFooter />
    </div>
  )
}


