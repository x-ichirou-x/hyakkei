/**
 * 保険プラン診断API
 * 
 * OpenAI APIを使用してユーザーの回答に基づく保険プランを提案
 * 医療保険専用の診断に対応
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server'

/**
 * 保険プラン診断の実行
 * @param request POSTリクエスト
 * @returns 診断結果
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userAnswers, context } = body
    
    console.log('Request body:', body)
    
    // OpenAI APIキーを環境変数から取得
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('OpenAI API key not configured')
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // 回答の分析
    const analysis = analyzeAnswers(userAnswers, context)
    console.log('分析結果:', JSON.stringify(analysis, null, 2))
    
    // OpenAI APIに送信するプロンプトを作成
    const prompt = createPrompt(userAnswers, analysis, context)
    console.log('生成されたプロンプト長:', prompt.length)
    
    // OpenAI APIを呼び出し
    const diagnosis = await callOpenAI(prompt, apiKey)
    
    console.log('診断完了')
    
    return NextResponse.json({ 
      success: true, 
      diagnosis: diagnosis,
      analysis: analysis
    })
    
  } catch (error) {
    console.error('診断APIエラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '診断の実行に失敗しました' 
      },
      { status: 500 }
    )
  }
}

/**
 * ユーザーの回答を分析
 * @param userAnswers ユーザーの回答
 * @param context 診断のコンテキスト
 * @returns 分析結果
 */
function analyzeAnswers(userAnswers: Record<string, string>, context?: string) {
  const analysis = {
    riskType: '',
    budgetLevel: '',
    priority: '',
    period: '',
    ageGroup: '',
    recommendedServices: [] as string[],
    monthlyBudget: 0,
    context: context || 'general'
  }

  // 医療保険専用の分析
  if (context === 'medical_insurance') {
    // Q1: 医療リスク
    switch (userAnswers.Q1) {
      case 'hosp_costs':
        analysis.riskType = '入院・手術費用リスク'
        analysis.recommendedServices.push('入院給付金', '手術給付金')
        break
      case 'cancer_long':
        analysis.riskType = 'がん・長期治療リスク'
        analysis.recommendedServices.push('がん特約', '長期入院保障')
        break
      case 'female_specific':
        analysis.riskType = '女性特有疾病リスク'
        analysis.recommendedServices.push('女性疾病特約', '女性医療特約')
        break
      case 'advanced_med':
        analysis.riskType = '先進医療リスク'
        analysis.recommendedServices.push('先進医療特約')
        break
      case 'income_drop':
        analysis.riskType = '収入減少リスク'
        analysis.recommendedServices.push('所得補償特約')
        break
    }

    // Q2: 入院期間
    switch (userAnswers.Q2) {
      case 'short':
        analysis.period = '短期入院'
        analysis.recommendedServices.push('短期入院保障')
        break
      case 'mid':
        analysis.period = '中期入院'
        analysis.recommendedServices.push('中期入院保障')
        break
      case 'long':
        analysis.period = '長期入院'
        analysis.recommendedServices.push('長期入院保障', '無制限特約')
        break
    }

    // Q3: 生活費保障
    switch (userAnswers.Q3) {
      case 'minimal':
        analysis.priority = '最低限保障'
        analysis.monthlyBudget = 3000
        break
      case 'some_margin':
        analysis.priority = '余裕ある保障'
        analysis.monthlyBudget = 5000
        break
      case 'keep_level':
        analysis.priority = '生活水準維持'
        analysis.monthlyBudget = 8000
        break
    }

    // Q4: 保険料支払い方針
    switch (userAnswers.Q4) {
      case 'light_monthly':
        analysis.priority = '月額負担軽減'
        break
      case 'finish_early':
        analysis.priority = '早期払込完了'
        break
    }

    // Q5: 保障範囲
    switch (userAnswers.Q5) {
      case 'broad':
        analysis.priority = '幅広い保障'
        analysis.recommendedServices.push('総合医療保障')
        break
      case 'focused':
        analysis.priority = '特定リスク重視'
        analysis.recommendedServices.push('がん特約', '特定疾病特約')
        break
    }

    // Q6: 保険の目的
    switch (userAnswers.Q6) {
      case 'shock_absorb':
        analysis.priority = '経済的ショック軽減'
        break
      case 'build_ahead':
        analysis.priority = '将来への備え'
        break
    }
  } else {
    // 一般的な保険診断の分析（既存のロジック）
    // Q1: リスクタイプ
    switch (userAnswers.Q1) {
      case 'medical':
        analysis.riskType = '医療リスク'
        analysis.recommendedServices.push('医療保険')
        break
      case 'life':
        analysis.riskType = '死亡リスク'
        analysis.recommendedServices.push('生命保険')
        break
      case 'retirement':
        analysis.riskType = '老後リスク'
        analysis.recommendedServices.push('年金保険')
        break
      case 'asset':
        analysis.riskType = '資産形成'
        analysis.recommendedServices.push('変額保険', '外貨建て保険')
        break
    }

    // Q2: 予算レベル
    switch (userAnswers.Q2) {
      case 'low':
        analysis.budgetLevel = '低予算'
        analysis.monthlyBudget = 5000
        break
      case 'medium':
        analysis.budgetLevel = '中予算'
        analysis.monthlyBudget = 10000
        break
      case 'high':
        analysis.budgetLevel = '高予算'
        analysis.monthlyBudget = 22500
        break
      case 'premium':
        analysis.budgetLevel = 'プレミアム'
        analysis.monthlyBudget = 40000
        break
    }

    // Q3: 優先事項
    switch (userAnswers.Q3) {
      case 'protection':
        analysis.priority = '保障重視'
        break
      case 'savings':
        analysis.priority = '貯蓄重視'
        break
      case 'balance':
        analysis.priority = 'バランス重視'
        break
    }

    // Q4: 期間
    switch (userAnswers.Q4) {
      case 'short':
        analysis.period = '短期'
        break
      case 'medium':
        analysis.period = '中期'
        break
      case 'long':
        analysis.period = '長期'
        break
    }

    // Q5: 年齢層
    switch (userAnswers.Q5) {
      case '20s':
        analysis.ageGroup = '20代'
        break
      case '30s':
        analysis.ageGroup = '30代'
        break
      case '40s':
        analysis.ageGroup = '40代'
        break
      case '50s':
        analysis.ageGroup = '50代'
        break
      case '60s':
        analysis.ageGroup = '60代以上'
        break
    }
  }

  return analysis
}

/**
 * OpenAI APIに送信するプロンプトを作成
 * @param userAnswers ユーザーの回答
 * @param analysis 分析結果
 * @param context 診断のコンテキスト
 * @returns プロンプト文字列
 */
function createPrompt(userAnswers: Record<string, string>, analysis: any, context?: string) {
  if (context === 'medical_insurance') {
    // 医療保険専用のプロンプト
    return `あなたは医療保険の専門家です。以下のユーザーの回答に基づいて、最適な医療保険プランを提案してください。

## ユーザーの回答
Q1. 今、一番心配している医療リスクは何ですか？
回答: ${userAnswers.Q1}

Q2. 入院はどのくらいの期間まで備えたいと思いますか？
回答: ${userAnswers.Q2}

Q3. 入院中や治療中の生活費について、どちらの考えに近いですか？
回答: ${userAnswers.Q3}

Q4. 今後の保険料の支払いは、どちらを優先したいですか？
回答: ${userAnswers.Q4}

Q5. 保険で優先したいのはどちらですか？
回答: ${userAnswers.Q5}

Q6. 保険に入る目的はどちらに近いですか？
回答: ${userAnswers.Q6}

## 分析結果
- リスクタイプ: ${analysis.riskType}
- 入院期間: ${analysis.period}
- 生活費保障: ${analysis.priority}
- 支払い方針: ${analysis.priority}
- 保障範囲: ${analysis.priority}
- 保険の目的: ${analysis.priority}
- 推奨サービス: ${analysis.recommendedServices.join(', ')}
- 月額予算: ${analysis.monthlyBudget.toLocaleString()}円

## 要求事項
以下の形式で医療保険プランを提案してください：

### 1. 診断理由（200文字程度）
ユーザーの回答から分析した結果を、親しみやすく優しい口調で200文字程度にまとめてください。
「〜ですね」「〜と思います」「〜がおすすめです」のような親しみやすい表現を使用してください。
ただし、診断結果には「200文字」や「文字数制限」などの説明は含めないでください。

### 2. 提案プラン（適用可能な形で厳密にコントロール）
以下の形式で具体的なプランを提案してください：

**プラン名**: 具体的なプラン名
**主契約**: 
- 入院給付金日額: [選択肢: 3,000円/5,000円/7,000円/10,000円]
- 支払日数限度: [選択肢: 30日/60日/120日]
- 手術給付金: [選択肢: 手術Ⅰ型/手術Ⅱ型/手術Ⅲ型]
- 放射線治療: [選択肢: あり/なし]
- 払込期間: [選択肢: 60歳/65歳/70歳/終身]

**推奨特約**:
- [選択肢から最大3つまで選択]
  - 入院一時給付特約: [選択肢: 10万円/20万円/30万円]
  - 女性疾病特約: [選択肢: 10万円/20万円/30万円]
  - がん一時給付特約: [選択肢: 50万円/100万円/200万円]
  - 先進医療特約: [選択肢: あり/なし]
  - 通院特約: [選択肢: 2,000円/3,000円/5,000円]

**月額保険料**: [具体的な金額]円（年齢・性別を考慮）

**このプランがおすすめの理由**: 親しみやすく優しい口調で2-3行で説明してください。

回答は日本語で、保険の専門家として親切で分かりやすい説明を心がけてください。
特に、女性の保険担当者がお客様に直接説明するような親しみやすく優しい口調で書いてください。
「〜ですね」「〜と思います」「〜がおすすめです」「〜で安心できますよ」のような表現を使用してください。
提案するプランは、現在の医療保険システムで実際に選択可能な項目のみを含めてください。
診断理由は200文字以内に制限し、提案プランは具体的で適用可能な形で提示してください。`
  } else {
    // 一般的な保険診断のプロンプト（既存のロジック）
    return `あなたは保険の専門家です。以下のユーザーの回答に基づいて、最適な保険プランを提案してください。

## ユーザーの回答
Q1. 今、一番心配している保険リスクは何ですか？
回答: ${userAnswers.Q1}

Q2. 保険料の月額予算はどの程度を想定していますか？
回答: ${userAnswers.Q2}

Q3. 保険で優先したいのはどちらですか？
回答: ${userAnswers.Q3}

Q4. 保険期間はどの程度を希望しますか？
回答: ${userAnswers.Q4}

Q5. 現在の年齢は？
回答: ${userAnswers.Q5}

## 分析結果
- リスクタイプ: ${analysis.riskType}
- 予算レベル: ${analysis.budgetLevel}
- 優先事項: ${analysis.priority}
- 期間: ${analysis.period}
- 年齢層: ${analysis.ageGroup}
- 推奨サービス: ${analysis.recommendedServices.join(', ')}
- 月額予算: ${analysis.monthlyBudget.toLocaleString()}円

## 要求事項
以下の形式で保険プランを提案してください：

1. **診断結果の要約** (2-3行)
2. **推奨プラン** (具体的なプラン名と特徴)
3. **保障内容の詳細** (主な保障項目)
4. **保険料の目安** (月額)
5. **このプランがおすすめの理由** (2-3行)
6. **注意点・補足** (1-2行)

回答は日本語で、保険の専門家として親切で分かりやすい説明を心がけてください。
保険料は現実的な範囲で提案してください。
現在利用可能な医療保険サービスを中心に提案し、将来実装予定のサービスについては言及してください。`
  }
}

/**
 * OpenAI APIを呼び出し
 * @param prompt プロンプト
 * @param apiKey OpenAI APIキー
 * @returns 診断結果
 */
async function callOpenAI(prompt: string, apiKey: string): Promise<string> {
  console.log('OpenAI API呼び出し開始')
  console.log('プロンプト長:', prompt.length)
  console.log('プロンプト内容:', prompt.substring(0, 500) + '...')
  
  const requestBody = {
    model: 'gpt-5-mini',
    messages: [
      {
        role: 'system',
        content: 'あなたは保険の専門家です。ユーザーのニーズに合わせて最適な保険プランを提案してください。'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_completion_tokens: 1500,
    reasoning_effort: 'minimal',
    verbosity: 'medium'
  }
  
  console.log('リクエストボディ:', JSON.stringify(requestBody, null, 2))
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  console.log('OpenAI API レスポンスステータス:', response.status)
  console.log('OpenAI API レスポンスヘッダー:', Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const errorText = await response.text()
    console.error('OpenAI API エラーレスポンス:', errorText)
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  console.log('OpenAI API 成功レスポンス:', JSON.stringify(data, null, 2))
  
  return data.choices[0]?.message?.content || '診断結果を生成できませんでした。'
}
