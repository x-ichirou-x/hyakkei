/**
 * 医療保険 診断API（OpenAI連携）
 *
 * 概要:
 * - クライアントから受け取った簡易回答（proposalSelections 等）をもとに、
 *   OpenAI による診断を行い、比較表に存在する 20 商品の中から 3〜6 件を厳選して返却する。
 * - モデルの出力は厳密な JSON とし、バリデーションで補正。全件一致や全件不一致を避ける。
 *
 * 主な仕様:
 * - 入力: { proposalSelections, age, gender, dailyAmount }
 * - 出力: { success, productIds, aiCriteria, rationale }
 * - productIds は `app/medicalPlanAdvisor/productData.ts` の productCatalog に必ず含まれ、重複なし、3〜6件。
 * - 失敗時や0件時はサーバ側でスコアリングによるフォールバックを実施。
 *
 * 制限事項:
 * - デモ実装。プロンプトは最小限。将来は体系的なスキーマ誘導や関数呼び出しAPIへ移行可能。
 */

import { NextResponse } from 'next/server'
import { productCatalog, type Product, type Gender } from '@/app/medicalPlanAdvisor/productData'

/** AI条件型（クライアントと整合） */
interface AiCriteria {
  needsAdvancedMedical?: boolean
  wantsOutpatient?: boolean
  preferHighMultiplier?: boolean
  requireDeathBenefit?: boolean
  preferHealthBonus?: boolean
  preferredPaymentRoutes?: Array<'account' | 'creditCard'>
  preferredPaymentFrequencies?: Array<'monthly' | 'semiannual' | 'annual'>
  requiredIncludedRiderKeywords?: string[]
}

/** リクエストボディ型 */
interface DiagnoseRequestBody {
  proposalSelections: Record<string, string[] | null | undefined>
  age?: number
  gender?: Gender
  dailyAmount?: number | null
}

/** レスポンス型 */
interface DiagnoseResponseBody {
  success: boolean
  productIds?: string[]
  aiCriteria?: AiCriteria
  rationale?: string
  error?: string
}

/** 先進医療特約の有無 */
function inferHasAdvancedMedical(p: Product): boolean {
  return Boolean(p.riders?.advancedMedicalRider)
}

/** 通院保障の有無 */
function inferHasOutpatient(p: Product): boolean {
  return (p.outpatientCoverage?.outpatientDailyAmount ?? 0) > 0
}

/** 手術倍率が高い型の有無（倍率>=10を高倍率とみなす） */
function inferHasHighMultiplier(p: Product): boolean {
  if (p.surgeryCoverage.surgeryPaymentMethod !== 'multiplier') return false
  const mults = p.surgeryCoverage.surgeryMultipliers ? Object.values(p.surgeryCoverage.surgeryMultipliers) : []
  return mults.some(v => (v ?? 0) >= 10)
}

/** 死亡保障を内包しているか（簡易: 商品名に"死亡"を含む） */
function inferHasDeathBenefit(p: Product): boolean {
  return /死亡/.test(p.productName)
}

/** 健康還付（健康ボーナス）の示唆 */
function inferHasHealthBonus(p: Product): boolean {
  const tags = p.tags ?? []
  if (tags.some(t => t.includes('お金戻ってくる') || t.includes('健康還付'))) return true
  return /リターン/.test(p.productName)
}

/** 払込経路（簡易推定） */
function inferPaymentRoutes(p: Product): Array<'account' | 'creditCard'> {
  if (p.productName.includes('入院一時金保険')) return ['creditCard']
  return ['account', 'creditCard']
}

/** 支払回数（簡易推定） */
function inferPaymentFrequencies(p: Product): Array<'monthly' | 'semiannual' | 'annual'> {
  if (p.paymentMode === 'monthly') return ['monthly']
  if (p.paymentMode === 'yearly') return ['annual']
  return ['monthly']
}

/** 含まれている特約名（表示用の簡易和名） */
function inferIncludedRiders(p: Product): string[] {
  const riders: string[] = []
  if (p.riders?.advancedMedicalRider) riders.push('先進医療')
  if (p.outpatientCoverage && (p.outpatientCoverage.outpatientDailyAmount ?? 0) > 0) riders.push('通院')
  if (p.riders?.waiverRider) riders.push('払込免除')
  if (p.riders?.hospitalizationLumpSumRider) riders.push('入退院一時金')
  if (p.riders?.injuryFractureRider) riders.push('骨折・外傷')
  if (p.riders?.disabilityIncomeOrWorkIncapacityRider) riders.push('就業不能')
  if (p.riders?.womenSpecificRider) riders.push('女性疾病')
  if ((p.riders?.criticalIllnessRiders ?? []).length > 0) riders.push('三大疾病関連')
  return riders
}

/** 選択肢からAI条件を構成（クライアントの buildCriteriaFromSelections に整合） */
function buildCriteriaFromSelections(selections: Record<string, string[] | null | undefined>): AiCriteria {
  const get = (qid: string) => Array.from(new Set(selections[qid] ?? []))
  const c: AiCriteria = {}
  const q1 = get('q1')
  if (q1.includes('advanced_med')) c.needsAdvancedMedical = true
  if (q1.includes('cancer_long')) c.preferHighMultiplier = true
  if (q1.includes('income_drop')) c.wantsOutpatient = true
  const q2 = get('q2')
  if (q2.includes('long')) c.preferHighMultiplier = true
  const q3 = get('q3')
  if (q3.includes('light_monthly')) { c.preferredPaymentFrequencies = ['monthly']; c.preferredPaymentRoutes = ['creditCard'] }
  if (q3.includes('finish_early')) { c.preferredPaymentFrequencies = ['annual']; c.preferredPaymentRoutes = ['account'] }
  const q8 = get('q8')
  if (q8.includes('rider_advanced')) (c.requiredIncludedRiderKeywords ??= []).push('先進医療')
  if (q8.includes('rider_outpatient')) (c.requiredIncludedRiderKeywords ??= []).push('通院')
  if (q8.includes('rider_waiver')) (c.requiredIncludedRiderKeywords ??= []).push('払込免除')
  const q10 = get('q10')
  if (q10.includes('freq_month')) c.preferredPaymentFrequencies = ['monthly']
  if (q10.includes('freq_annual')) c.preferredPaymentFrequencies = ['annual']
  return c
}

/** サーバ側スコアリング（ハードマッチ数重視） */
function scoreProductByCriteria(p: Product, criteria: AiCriteria): { score: number; hardMatches: number } {
  let score = 0
  let hardMatches = 0
  if (criteria.needsAdvancedMedical) { const ok = inferHasAdvancedMedical(p); if (ok) { score += 2; hardMatches += 1 } }
  if (criteria.wantsOutpatient) { const ok = inferHasOutpatient(p); if (ok) { score += 1; hardMatches += 1 } }
  if (criteria.preferHighMultiplier) { const ok = inferHasHighMultiplier(p); if (ok) { score += 1; hardMatches += 1 } }
  if (criteria.requireDeathBenefit) { const ok = inferHasDeathBenefit(p); if (ok) { score += 1; hardMatches += 1 } }
  if (criteria.preferHealthBonus) { const ok = inferHasHealthBonus(p); if (ok) { score += 1; hardMatches += 1 } }
  if (Array.isArray(criteria.preferredPaymentRoutes) && criteria.preferredPaymentRoutes.length > 0) {
    const have = inferPaymentRoutes(p)
    const ok = criteria.preferredPaymentRoutes.some(r => have.includes(r))
    if (ok) { score += 1; hardMatches += 1 }
  }
  if (Array.isArray(criteria.preferredPaymentFrequencies) && criteria.preferredPaymentFrequencies.length > 0) {
    const have = inferPaymentFrequencies(p)
    const ok = criteria.preferredPaymentFrequencies.some(f => have.includes(f))
    if (ok) { score += 1; hardMatches += 1 }
  }
  if (Array.isArray(criteria.requiredIncludedRiderKeywords) && criteria.requiredIncludedRiderKeywords.length > 0) {
    const hay = inferIncludedRiders(p).join(' ')
    const ok = criteria.requiredIncludedRiderKeywords.every(kw => hay.includes(kw))
    if (ok) { score += 1; hardMatches += 1 }
  }
  score += Math.min(1, Math.max(0, p.popularity / 100))
  return { score, hardMatches }
}

/** OpenAI への呼び出し */
async function callOpenAI(prompt: string, apiKey: string): Promise<string> {
  const body = {
    model: 'gpt-5-mini',
    messages: [
      { role: 'system', content: 'あなたは医療保険の専門家かつ厳密なJSON出力ができるアシスタントです。' },
      { role: 'user', content: prompt }
    ],
    max_completion_tokens: 800,
    reasoning_effort: 'minimal',
    verbosity: 'low'
  }
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!resp.ok) {
    const t = await resp.text()
    throw new Error(`OpenAI API error: ${resp.status} - ${t}`)
  }
  const json = await resp.json()
  return json.choices?.[0]?.message?.content ?? ''
}

/** JSON抽出（モデルの出力から最初のJSONオブジェクトを抜き出す） */
function extractJson(text: string): any | null {
  if (!text) return null
  const m = text.match(/\{[\s\S]*\}/)
  if (!m) return null
  try { return JSON.parse(m[0]) } catch { return null }
}

/** プロンプト生成（20商品の簡易特徴と制約付き指示） */
function createPrompt(selections: Record<string, string[] | null | undefined>, age?: number, gender?: Gender, dailyAmount?: number | null) {
  const criteria = buildCriteriaFromSelections(selections)
  const products = productCatalog.map(p => ({
    productId: p.productId,
    productName: p.productName,
    popularity: p.popularity,
    hasAdvancedMedical: inferHasAdvancedMedical(p),
    hasOutpatient: inferHasOutpatient(p),
    hasHighMultiplier: inferHasHighMultiplier(p),
    hasDeathBenefit: inferHasDeathBenefit(p),
    hasHealthBonus: inferHasHealthBonus(p),
    paymentRoutes: inferPaymentRoutes(p),
    paymentFrequencies: inferPaymentFrequencies(p),
    includedRiders: inferIncludedRiders(p)
  }))

  return `以下は医療保険の商品一覧（20件）です。ユーザーの希望に適合する商品だけを 3〜6 件選び、厳密な JSON のみを出力してください。可能なら 4〜5 件の選定を優先してください（3 未満や 6 超は不可）。

【ユーザー希望（AI条件）】
${JSON.stringify(criteria)}
【年齢/性別/入院日額】
${JSON.stringify({ age, gender, dailyAmount })}

【商品一覧（要約）】
${JSON.stringify(products)}

【出力仕様（厳守）】
1) JSONのみを出力する（説明や前後文は絶対に書かない）
2) 形式: {"productIds": string[], "aiCriteria": AiCriteria, "rationale": string}
3) productIds は上の一覧の productId のみを使用し、重複なし、かつ長さは3〜6（可能なら4〜5件を優先）
4) 全件一致や0件を避ける。適合度の高いものから選ぶ
5) aiCriteria は上記希望を再掲・補足（省略可のキーは省略可）
6) rationale には短い理由を日本語で記述
`
}

export async function POST(request: Request) {
  const start = Date.now()
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'OPENAI_API_KEY が未設定です' } satisfies DiagnoseResponseBody, { status: 500 })
    }

    const body = (await request.json()) as DiagnoseRequestBody
    const { proposalSelections, age, gender, dailyAmount } = body || {}
    if (!proposalSelections || typeof proposalSelections !== 'object') {
      return NextResponse.json({ success: false, error: 'proposalSelections が不正です' } satisfies DiagnoseResponseBody, { status: 400 })
    }

    const prompt = createPrompt(proposalSelections, age, gender, dailyAmount ?? null)
    const raw = await callOpenAI(prompt, apiKey)
    const parsed = extractJson(raw)

    const allIds = new Set(productCatalog.map(p => p.productId))
    const validate = (ids: unknown): string[] => {
      if (!Array.isArray(ids)) return []
      const uniq: string[] = []
      for (const v of ids) {
        if (typeof v === 'string' && allIds.has(v) && !uniq.includes(v)) uniq.push(v)
      }
      return uniq
    }

    let productIds: string[] = validate(parsed?.productIds)
    const aiCriteria: AiCriteria | undefined = parsed?.aiCriteria && typeof parsed.aiCriteria === 'object' ? parsed.aiCriteria : undefined
    const rationale: string | undefined = typeof parsed?.rationale === 'string' ? parsed.rationale : undefined

    // 長さを 3〜6 に補正
    if (productIds.length < 3 || productIds.length > 6) {
      // フォールバック: サーバ側スコアリングで上位から 4 件
      const crit = aiCriteria ?? buildCriteriaFromSelections(proposalSelections)
      const evaluated = productCatalog.map(p => ({ p, ...scoreProductByCriteria(p, crit) }))
      const matched = evaluated.filter(x => x.hardMatches > 0).sort((a, b) => b.score - a.score).map(x => x.p.productId)
      const fallback = (matched.length > 0 ? matched : evaluated.sort((a, b) => b.p.popularity - a.p.popularity).map(x => x.p.productId)).slice(0, 4)
      productIds = fallback
    }

    // 念のため 3〜6 にトリミング
    if (productIds.length > 6) productIds = productIds.slice(0, 6)
    if (productIds.length < 3) {
      // ここまでで不足なら人気順で補完
      for (const p of [...productCatalog].sort((a, b) => b.popularity - a.popularity)) {
        if (!productIds.includes(p.productId)) productIds.push(p.productId)
        if (productIds.length >= 3) break
      }
    }

    const ms = Date.now() - start
    return NextResponse.json({ success: true, productIds, aiCriteria: aiCriteria ?? buildCriteriaFromSelections(proposalSelections), rationale } satisfies DiagnoseResponseBody, { headers: { 'X-Elapsed': String(ms) } })
  } catch (err: any) {
    const message = `[diagnose] エラー: ${(err?.message ?? String(err))}`
    return NextResponse.json({ success: false, error: message } satisfies DiagnoseResponseBody, { status: 500 })
  }
}


