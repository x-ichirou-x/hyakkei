/**
 * 医療保険プラン選択画面
 * 
 * 主契約と特約の詳細選択を行う画面
 * 各項目の詳細な選択肢を提供
 * 選択した内容に基づく保険料計算機能
 * レスポンシブデザイン対応版
 * Noto Sans JPフォント対応版
 * 
 * @author Medical Insurance System
 * @version 4.2.0
 */

"use client"

import { useState, useCallback, memo, useRef, useEffect } from "react"
 
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import MedicalFooter from "@/components/layout/medical-footer"
import MedicalHeader from "@/components/layout/medical-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { HelpTipIcon, HelpTipLabel } from "@/components/ui/help-tip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"
import { 
  Shield, 
  Heart, 
  Stethoscope, 
  Info,
  ArrowRight,
  Calculator,
  Menu,
  X,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"

// 医療保険専用コンポーネントのインポート
import { SelectionSummary } from "@/components/medical/selection-summary"

/**
 * 主契約選択項目の型定義
 */
interface MainContractSelection {
  hospitalizationDailyAmount: number // 入院給付金日額
  paymentLimitDays: number // 1入院あたりの支払日数の限度
  unlimitedType: 'none' | '3diseases' | '8diseases' // 入院支払日数無制限特約
  surgeryType: 'surgery1' | 'surgery2' | 'surgery3' // 手術給付金の型
  surgeryMultiplier?: number // 手術Ⅱ型の場合の倍数
  radiationTherapy: boolean // 放射線治療給付金
  deathBenefit: boolean // 死亡給付金
  paymentPeriod: number // 保険料払込期間
}

/**
 * 特約選択項目の型定義
 */
interface RiderSelection {
  hospitalizationRider: {
    selected: boolean
    amount?: number // 1回につきの金額
    coverageType?: 'none' | 'continuous' // 保障範囲の型
  }
  womenDiseaseRider: {
    selected: boolean
    amount?: number // 給付金額
  }
  womenMedicalRider: {
    selected: boolean
    amount?: number // 給付金額
  }
  womenCancerSupport: {
    selected: boolean
  }
  outpatientRider: {
    selected: boolean
    amount?: number // 給付金額
  }
  advancedMedicalRider: {
    selected: boolean
  }
  specificDiseaseRider: {
    selected: boolean
    diseaseType?: '3diseases1' | '3diseases3' | '8diseases1' | '8diseases3'
    paymentType?: 'double' | 'same'
    amount?: number // 初回給付金額
  }
  cancerRider: {
    selected: boolean
    amount?: number // 給付金額
  }
  anticancerRider: {
    selected: boolean
    amount?: number // 給付金額
  }
  disabilityRider: {
    selected: boolean
    amount?: number // 給付金額
  }
  specificInjuryRider: {
    selected: boolean
    amount?: number // 給付金額
  }
  premiumExemptionRider: {
    selected: boolean
    diseaseType?: '3diseases1' | '3diseases3' | '8diseases1' | '8diseases3'
    disabilityType?: 'none' | 'with'
  }
}

/**
 * 選択されたプランの型定義
 */
interface SelectedPlans {
  mainContract: MainContractSelection
  riders: RiderSelection
}

/**
 * ヘルプ説明文の定義
 */
const helpTexts = {
  hospitalizationDailyAmount: "入院した際に1日あたり支払われる給付金の金額です。日額が高いほど、入院時の経済的負担を軽減できます。",
  paymentLimitDays: "1回の入院で給付金が支払われる最大日数です。限度日数を超えると給付金は支払われません。",
  unlimitedType: "特定の疾病で入院した場合、支払日数の制限をなくす特約です。3代疾病（がん・急性心筋梗塞・脳卒中）または8代疾病（3代疾病+5つの疾病）が対象です。",
  surgeryType: "手術を受けた際の給付金の計算方法です。手術の種類や入院・外来の別により給付金額が異なります。",
  surgeryMultiplier: "手術Ⅱ型の場合、入院給付金日額に掛ける倍数です。手術の内容により10倍、20倍、60倍から選択できます。",
  radiationTherapy: "放射線治療を受けた際に、入院給付金日額の10倍の給付金が支払われます。",
  deathBenefit: "被保険者が死亡した際に支払われる給付金です。",
  paymentPeriod: "保険料を支払う期間です。期間が長いほど月額保険料は安くなりますが、総支払額は増加します。",
  hospitalizationRider: "入院した際に一時金として支払われる特約です。継続入院保障の有無により給付条件が異なります。",
  womenDiseaseRider: "女性特有の疾病（子宮筋腫、乳がんなど）で入院した際に一時金が支払われる特約です。",
  womenMedicalRider: "女性特有の疾病の治療費を保障する特約です。",
  womenCancerSupport: "女性のがん検診や早期発見をサポートする特約です。",
  outpatientRider: "退院後の通院治療費を保障する特約です。",
  advancedMedicalRider: "先進医療技術による治療費を保障する特約です。",
  cancerRider: "がんと診断された際に一時金が支払われる特約です。",
  disabilityRider: "障害状態や介護状態になった際に一時金が支払われる特約です。",
  specificInjuryRider: "特定の損傷（骨折、脱臼など）で治療を受けた際に一時金が支払われる特約です。"
}

export default function MedicalInsurancePage() {
  // モバイルデバイスかどうかを検出
  const isMobile = useIsMobile()
  
  // ヘルプモーダルの状態管理
  const [helpModalOpen, setHelpModalOpen] = useState(false)
  const [currentHelpKey, setCurrentHelpKey] = useState<keyof typeof helpTexts | null>(null)
  
  // チャット相談ダイアログの状態管理
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({})
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string
    type: 'ai' | 'user'
    content: string
    timestamp: Date
  }>>([])
  
  // 選択状態の管理（専用システム）
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Set<string>>>({})
  const selectedOptionsRef = useRef<Record<string, Set<string>>>({})
  
  // 選択状態の即座更新用の関数（他の処理の影響を受けない）
  const updateSelectionImmediately = useCallback((questionId: string, optionId: string, isMultiSelect: boolean) => {
    const current = selectedOptionsRef.current[questionId] || new Set()
    
    if (isMultiSelect) {
      if (current.has(optionId)) {
        const newSet = new Set(current)
        newSet.delete(optionId)
        selectedOptionsRef.current[questionId] = newSet
      } else {
        const newSet = new Set(current)
        newSet.add(optionId)
        selectedOptionsRef.current[questionId] = newSet
      }
    } else {
      selectedOptionsRef.current[questionId] = new Set([optionId])
    }
    
    // Reactの状態を確実に更新（レンダリング用）
    setSelectedOptions(prev => {
      const newState = { ...prev }
      newState[questionId] = selectedOptionsRef.current[questionId]
      return newState
    })
    
    // 強制的にレンダリングを更新（確実性のため）
    setTimeout(() => {
      setSelectedOptions(prev => ({ ...prev }))
    }, 0)
  }, [])
  
  // 状態の同期を確保
  useEffect(() => {
    selectedOptionsRef.current = selectedOptions
  }, [selectedOptions])
  
  // 選択状態の計算を最適化
  // const selectedOptionsMemo = useMemo(() => selectedOptions, [selectedOptions]) // 削除
  
  // 選択肢コンポーネント（メモ化）
  const OptionButton = memo(({ 
    question, 
    option, 
    isSelected, 
    onToggle 
  }: {
    question: any
    option: any
    isSelected: boolean
    onToggle: () => void
  }) => (
    <Button
      variant="outline"
      className={`w-full text-left justify-start h-10 border-green-200 hover:border-green-300 hover:bg-green-50 transition-none ${
        isSelected ? 'bg-green-100 border-green-400' : ''
      }`}
      onClick={onToggle}
    >
      <div className={`flex-shrink-0 w-4 h-4 border-2 border-green-300 ${
        question.ui === 'multi_select' ? 'rounded' : 'rounded-full'
      } mr-3 ${
        isSelected ? 'bg-green-600 border-green-600' : 'bg-white'
      }`}></div>
      <span className="flex-1 text-left">{option.label}</span>
    </Button>
  ))

  OptionButton.displayName = 'OptionButton'

  // 質問の定義
  const questions = [
    {
      id: 'Q1',
      number: 'Q1',
      question: '今、一番心配している医療リスクは何ですか？\n（あてはまるものをすべて）',
      highlightedWords: [],
      ui: 'multi_select',
      options: [
        { id: 'hosp_costs', label: '入院や手術でかかる費用' },
        { id: 'cancer_long', label: 'がんや重い病気の長期治療' },
        { id: 'female_specific', label: '女性特有の病気やがん' },
        { id: 'advanced_med', label: '先進医療の高額治療費' },
        { id: 'income_drop', label: '生活費が減ること（働けない期間の収入減）' }
      ],
      info: '複数選択可能です',
      illustration: '🏥💊'
    },
    {
      id: 'Q2',
      number: 'Q2',
      question: '入院はどのくらいの期間まで\n備えたいと思いますか？',
      highlightedWords: [],
      ui: 'single_choice',
      options: [
        { id: 'short', label: '短期間（1〜2週間程度）で十分' },
        { id: 'mid', label: '中期（1〜2か月程度）まで' },
        { id: 'long', label: '長期（何か月も）にも備えたい' }
      ],
      info: '入院期間の保障について',
      illustration: '📅🏥'
    },
    {
      id: 'Q3',
      number: 'Q3',
      question: '入院中や治療中の生活費について、\nどちらの考えに近いですか？',
      highlightedWords: [],
      ui: 'single_choice',
      options: [
        { id: 'minimal', label: '最低限あればいい（節約してしのぐ）' },
        { id: 'some_margin', label: '少し余裕を持ちたい（食事・交通・雑費など）' },
        { id: 'keep_level', label: '普段と変わらない生活水準を維持したい' }
      ],
      info: '生活費の保障レベルについて',
      illustration: '💰🏠'
    },
    {
      id: 'Q4',
      number: 'Q4',
      question: '今後の保険料の支払いは、\nどちらを優先したいですか？',
      highlightedWords: [],
      ui: 'single_choice',
      options: [
        { id: 'light_monthly', label: '毎月の負担を軽くして続けやすくしたい' },
        { id: 'finish_early', label: '働いているうちに払い終えて安心したい' }
      ],
      info: '保険料の支払い方針について',
      illustration: '💳📊'
    },
    {
      id: 'Q5',
      number: 'Q5',
      question: '保険で優先したいのはどちらですか？',
      highlightedWords: [],
      ui: 'single_choice',
      options: [
        { id: 'broad', label: '幅広い病気やケガにまんべんなく備える' },
        { id: 'focused', label: '特定のリスク（がん・特定疾病など）に手厚く備える' }
      ],
      info: '保障範囲の考え方について',
      illustration: '🛡️🎯'
    },
    {
      id: 'Q6',
      number: 'Q6',
      question: '保険に入る目的はどちらに近いですか？',
      highlightedWords: [],
      ui: 'single_choice',
      options: [
        { id: 'shock_absorb', label: '万一のときの経済的ショックを減らす' },
        { id: 'build_ahead', label: '将来のために早めに備えを固める' }
      ],
      info: '保険の目的について',
      illustration: '🎯🔮'
    }
  ]
  
  // 選択されたプランの状態管理
  const [selectedPlans, setSelectedPlans] = useState<SelectedPlans>({
    mainContract: {
      hospitalizationDailyAmount: 5000,
      paymentLimitDays: 60,
      unlimitedType: 'none',
      surgeryType: 'surgery2',
      surgeryMultiplier: 10,
      radiationTherapy: true,
      deathBenefit: false,
      paymentPeriod: 65
    },
    riders: {
      hospitalizationRider: { selected: false },
      womenDiseaseRider: { selected: false },
      womenMedicalRider: { selected: false },
      womenCancerSupport: { selected: false },
      outpatientRider: { selected: false },
      advancedMedicalRider: { selected: false },
      specificDiseaseRider: { selected: false },
      cancerRider: { selected: false },
      anticancerRider: { selected: false },
      disabilityRider: { selected: false },
      specificInjuryRider: { selected: false },
      premiumExemptionRider: { selected: false }
    }
  })

  // 選択肢の定義
  const options = {
    hospitalizationDailyAmount: [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
    paymentLimitDays: [30, 60, 120],
    unlimitedType: [
      { value: 'none', label: '無制限なし' },
      { value: '3diseases', label: '3代疾病入院無制限' },
      { value: '8diseases', label: '8代疾病入院無制限' }
    ],
    surgeryType: [
      { value: 'surgery1', label: '手術Ⅰ型' },
      { value: 'surgery2', label: '手術Ⅱ型' },
      { value: 'surgery3', label: '手術Ⅲ型' }
    ],
    surgeryMultiplier: [10, 20, 60],
    paymentPeriod: [60, 65, 70, 75, 80, -1], // -1は終身
    riderAmounts: {
      small: [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000],
      medium: [2000, 3000, 4000, 5000],
      large: [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000],
      disability: [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000],
      injury: [50000, 100000]
    },
    diseaseTypes: [
      { value: '3diseases1', label: '３大疾病Ⅰ型' },
      { value: '3diseases3', label: '３大疾病Ⅲ型' },
      { value: '8diseases1', label: '特定８疾病Ⅰ型' },
      { value: '8diseases3', label: '特定８疾病Ⅲ型' }
    ],
    paymentTypes: [
      { value: 'double', label: '初回2倍型' },
      { value: 'same', label: '同額型' }
    ],
    coverageTypes: [
      { value: 'none', label: '継続入院保障なし' },
      { value: 'continuous', label: '継続入院保障あり' }
    ],
    disabilityTypes: [
      { value: 'none', label: '障害・介護保障なし型' },
      { value: 'with', label: '障害・介護保障あり型' }
    ]
  }

  /**
   * 主契約項目の更新処理
   * @param field 更新するフィールド
   * @param value 新しい値
   */
  const updateMainContract = (field: keyof MainContractSelection, value: any) => {
    setSelectedPlans(prev => ({
      ...prev,
      mainContract: {
        ...prev.mainContract,
        [field]: value
      }
    }))
  }

  /**
   * 特約項目の更新処理
   * @param riderKey 特約のキー
   * @param field 更新するフィールド
   * @param value 新しい値
   */
  const updateRider = (riderKey: keyof RiderSelection, field: string, value: any) => {
    setSelectedPlans(prev => ({
      ...prev,
      riders: {
        ...prev.riders,
        [riderKey]: {
          ...prev.riders[riderKey],
          [field]: value
        }
      }
    }))
  }

  /**
   * 月額保険料の計算（簡易版）
   * @returns 合計月額保険料
   */
  const calculateTotalPremium = (): number => {
    let basePremium = 0
    
    // 主契約の基本保険料計算
    const { hospitalizationDailyAmount, paymentLimitDays, unlimitedType, surgeryType, radiationTherapy, deathBenefit, paymentPeriod } = selectedPlans.mainContract
    
    // 入院給付金日額による基本保険料
    basePremium += hospitalizationDailyAmount * 0.1
    
    // 支払日数限度による調整
    if (paymentLimitDays === 30) basePremium *= 0.8
    else if (paymentLimitDays === 120) basePremium *= 1.2
    
    // 無制限特約による調整
    if (unlimitedType === '3diseases') basePremium *= 1.1
    else if (unlimitedType === '8diseases') basePremium *= 1.2
    
    // 手術給付金による調整
    if (surgeryType === 'surgery1') basePremium *= 1.0
    else if (surgeryType === 'surgery2') basePremium *= 1.1
    else if (surgeryType === 'surgery3') basePremium *= 0.9
    
    // 放射線治療給付金
    if (radiationTherapy) basePremium += 200
    
    // 死亡給付金
    if (deathBenefit) basePremium += 500
    
    // 特約の保険料計算
    let riderPremium = 0
    Object.entries(selectedPlans.riders).forEach(([key, rider]) => {
      if (rider.selected) {
        switch (key) {
          case 'hospitalizationRider':
            riderPremium += 300
            break
          case 'womenDiseaseRider':
            riderPremium += 200
            break
          case 'womenMedicalRider':
            riderPremium += 150
            break
          case 'womenCancerSupport':
            riderPremium += 100
            break
          case 'outpatientRider':
            riderPremium += 250
            break
          case 'advancedMedicalRider':
            riderPremium += 150
            break
          case 'specificDiseaseRider':
            riderPremium += 400
            break
          case 'cancerRider':
            riderPremium += 300
            break
          case 'anticancerRider':
            riderPremium += 200
            break
          case 'disabilityRider':
            riderPremium += 350
            break
          case 'specificInjuryRider':
            riderPremium += 100
            break
          case 'premiumExemptionRider':
            riderPremium += 250
            break
        }
      }
    })
    
    return Math.round(basePremium + riderPremium)
  }

  /**
   * 選択完了率の計算
   * @returns 完了率（0-100）
   */
  const calculateProgress = (): number => {
    let progress = 0
    
    // 主契約の基本項目が選択されているかチェック
    if (selectedPlans.mainContract.hospitalizationDailyAmount > 0) progress += 30
    if (selectedPlans.mainContract.paymentLimitDays > 0) progress += 20
    
    // 特約が選択されているかチェック
    const selectedRiders = Object.values(selectedPlans.riders).filter(rider => rider.selected).length
    if (selectedRiders > 0) progress += 50
    
    return Math.min(progress, 100)
  }

  /**
   * ヘルプモーダルを開く関数
   * @param helpKey ヘルプテキストのキー
   */
  const openHelpModal = (helpKey: keyof typeof helpTexts) => {
    setCurrentHelpKey(helpKey)
    setHelpModalOpen(true)
  }

  /**
   * 選択された主契約のサマリー取得
   * @returns 主契約サマリー
   */
  const getMainContractSummary = () => {
    const { hospitalizationDailyAmount, paymentLimitDays, surgeryType, radiationTherapy, deathBenefit, paymentPeriod } = selectedPlans.mainContract
    
    return {
      id: 'main',
      name: '主契約',
      monthlyPremium: calculateTotalPremium() - Object.values(selectedPlans.riders).filter(r => r.selected).length * 200, // 概算
      details: [
        `入院給付金: 日額${hospitalizationDailyAmount.toLocaleString()}円`,
        `支払日数限度: ${paymentLimitDays}日`,
        `手術給付金: ${surgeryType === 'surgery1' ? '手術Ⅰ型' : surgeryType === 'surgery2' ? '手術Ⅱ型' : '手術Ⅲ型'}`,
        `放射線治療: ${radiationTherapy ? 'あり' : 'なし'}`,
        `死亡給付金: ${deathBenefit ? 'あり' : 'なし'}`,
        `払込期間: ${paymentPeriod === -1 ? '終身' : `${paymentPeriod}歳`}`
      ]
    }
  }

  /**
   * 選択された特約のサマリー取得
   * @returns 特約サマリーリスト
   */
  const getSelectedRidersSummary = () => {
    const selectedRiders: Array<{
      id: string
      name: string
      monthlyPremium: number
      details: string[]
    }> = []
    
    Object.entries(selectedPlans.riders).forEach(([key, rider]) => {
      if (rider.selected) {
        const riderNames: { [key: string]: string } = {
          hospitalizationRider: '入院一時給付特約',
          womenDiseaseRider: '女性疾病入院一次給付特約',
          womenMedicalRider: '女性医療特約',
          womenCancerSupport: '女性ガン早期発見サポート',
          outpatientRider: '退院後通院特約',
          advancedMedicalRider: '先進医療特約',
          specificDiseaseRider: '特定疾病一時給付特約',
          cancerRider: 'がん一時給付特約',
          anticancerRider: '抗がん剤・ホルモン剤治療特約',
          disabilityRider: '障害・介護一時給付特約',
          specificInjuryRider: '特定損傷特約',
          premiumExemptionRider: '保険料免除特約'
        }
        
        selectedRiders.push({
          id: key,
          name: riderNames[key],
          monthlyPremium: 200, // 概算
          details: []
        })
      }
    })
    
    return selectedRiders
  }

  /**
   * ヘルプボタンコンポーネント
   * @param helpKey ヘルプテキストのキー
   * @returns ヘルプボタンのJSX要素
   */
  const HelpButton = ({ helpKey }: { helpKey: keyof typeof helpTexts }) => (
    <HelpTipIcon text={helpTexts[helpKey]} size={"sm"} />
  )

  /**
   * ヘルプ付きラベルコンポーネント
   * @param children ラベルの内容
   * @param helpKey ヘルプテキストのキー
   * @returns ヘルプ付きラベルのJSX要素
   */
  const HelpLabel = ({ children, helpKey }: { children: React.ReactNode, helpKey: keyof typeof helpTexts }) => (
    <HelpTipLabel label={children} text={helpTexts[helpKey]} size={"sm"} />
  )

  /**
   * チャット相談を開始する
   */
  const startChat = () => {
    setChatDialogOpen(true)
    setCurrentQuestion(0)
    setUserAnswers({})
    setChatMessages([])
    setSelectedOptions({})
  }

  /**
   * 選択肢の選択状態を切り替える
   */
  const toggleOption = useCallback((questionId: string, optionId: string, isMultiSelect: boolean) => {
    const startTime = performance.now()
    console.log(`[toggleOption] 開始: ${questionId} - ${optionId}`)
    
    // 選択状態の更新のみを即座に実行（最優先）
    updateSelectionImmediately(questionId, optionId, isMultiSelect)
    
    // 状態更新完了を即座に記録
    const endTime = performance.now()
    const duration = endTime - startTime
    console.log(`[toggleOption] 即座完了: ${questionId} - ${optionId}, 処理時間: ${duration.toFixed(2)}ms`)
    
    // 他の処理は非同期で実行（UIの応答性を向上）
    Promise.resolve().then(() => {
      const asyncStartTime = performance.now()
      
      // ここで他の重い処理を実行（保険料計算など）
      // 現在は何も実行していない
      
      const asyncEndTime = performance.now()
      const asyncDuration = asyncEndTime - asyncStartTime
      const totalDuration = asyncEndTime - startTime
      console.log(`[toggleOption] 非同期処理: ${questionId} - ${optionId}, 非同期処理時間: ${asyncDuration.toFixed(2)}ms, 総処理時間: ${totalDuration.toFixed(2)}ms`)
    })
  }, [updateSelectionImmediately]) // 専用関数への依存を追加

  /**
   * 選択肢が選択されているかチェック（最適化版）
   */
  const isOptionSelected = useCallback((questionId: string, optionId: string): boolean => {
    // useRefを使用して即座に状態を確認（関数呼び出しのオーバーヘッドを最小限に）
    return selectedOptionsRef.current[questionId]?.has(optionId) || false
  }, []) // 依存配列を空にして、関数の再作成を防止

  /**
   * 選択状態の確認を最適化（インライン化）
   */
  const getSelectionState = useCallback((questionId: string, optionId: string): boolean => {
    return selectedOptionsRef.current[questionId]?.has(optionId) || false
  }, [])

  /**
   * 次の質問に進む
   */
  const goToNextQuestion = () => {
    const currentQ = questions[currentQuestion]
    const selectedIds = Array.from(selectedOptions[currentQ.id] || [])
    
    if (selectedIds.length === 0) {
      // 選択されていない場合は進めない
      return
    }
    
    // 選択された選択肢のラベルを取得
    const selectedLabels = selectedIds.map(id => {
      const option = currentQ.options.find(opt => opt.id === id)
      return option?.label || id
    })
    
    // 回答を保存
    const answer = currentQ.ui === 'multi_select' ? selectedLabels : selectedLabels[0]
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: answer }))
    
    // 次の質問に進む
    const nextQuestionIndex = currentQuestion + 1
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(nextQuestionIndex)
    } else {
      // 最後の質問に回答した場合の処理
      setCurrentQuestion(-1) // 結果表示モード
    }
  }

  /**
   * ユーザーの回答を処理する（旧実装、削除予定）
   */
  const handleUserAnswer = (answer: string) => {
    // この関数は使用しない
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t">
        <div className="container-responsive py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-semantic-brand" />
              </div>
              <div>
                <h1 className={`text-h1 font-semibold text-semantic-fg`}>医療保険プラン選択</h1>
                <p className={`text-body text-semantic-fg-subtle`}>ご希望の保障内容をお選びください。</p>
              </div>
            </div>
            
            {/* 相談ボタン */}
            <div className="flex items-center justify-center sm:justify-end space-x-3">
              <div 
                className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={startChat}
              >
                <Image 
                  src="/analisys_button.png" 
                  alt="プラン提案" 
                  width={300} 
                  height={90}
                  className="h-20 w-auto sm:h-20 sm:w-auto md:h-24 md:w-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-responsive py-4 sm:py-6 lg:py-8 pb-64 xl:pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* メインコンテンツ */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* 主契約設定 */}
            <div>
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-semantic-danger" />
                <h2 className={`text-h2 font-semibold`}>主契約設定</h2>
                <Badge className={`ml-2 text-caption bg-semantic-danger text-semantic-bg`}>必須</Badge>
              </div>
              
              <Card className="card-standard">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CardTitle className={`text-h2`}>入院給付金</CardTitle>
                    <HelpButton helpKey="hospitalizationDailyAmount" />
                  </div>
                  <CardDescription className="text-body">入院時の日額給付金を設定してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="mb-3">
                      <HelpLabel helpKey="hospitalizationDailyAmount">
                        <Label className={`text-body font-medium`}>日額</Label>
                      </HelpLabel>
                    </div>
                    <Select 
                      value={selectedPlans.mainContract.hospitalizationDailyAmount.toString()}
                      onValueChange={(value) => updateMainContract('hospitalizationDailyAmount', parseInt(value))}
                    >
                      <SelectTrigger className={`text-body h-10 sm:h-11 input-standard`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options.hospitalizationDailyAmount.map(amount => (
                          <SelectItem key={amount} value={amount.toString()} className={`text-body`}>
                            {amount.toLocaleString()}円
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="mb-3">
                      <HelpLabel helpKey="paymentLimitDays">
                        <Label className={`text-body font-medium`}>1入院あたりの支払日数の限度</Label>
                      </HelpLabel>
                    </div>
                    <Select 
                      value={selectedPlans.mainContract.paymentLimitDays.toString()}
                      onValueChange={(value) => updateMainContract('paymentLimitDays', parseInt(value))}
                    >
                      <SelectTrigger className={`text-body h-10 sm:h-11 input-standard`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options.paymentLimitDays.map(days => (
                          <SelectItem key={days} value={days.toString()} className={`text-body`}>
                            {days}日
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="mb-3">
                      <HelpLabel helpKey="unlimitedType">
                        <Label className={`text-body font-medium`}>入院支払日数無制限特約</Label>
                      </HelpLabel>
                    </div>
                    <Select 
                      value={selectedPlans.mainContract.unlimitedType}
                      onValueChange={(value) => updateMainContract('unlimitedType', value)}
                    >
                      <SelectTrigger className={`text-body h-10 sm:h-11 input-standard`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options.unlimitedType.map(type => (
                          <SelectItem key={type.value} value={type.value} className={`text-body`}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 sm:mt-6 card-standard">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CardTitle className={`text-h2`}>手術給付金</CardTitle>
                    <HelpButton helpKey="surgeryType" />
                  </div>
                  <CardDescription className="text-body">手術時の給付金を設定してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="mb-3">
                      <HelpLabel helpKey="surgeryType">
                        <Label className={`text-body font-medium`}>手術給付金の型</Label>
                      </HelpLabel>
                    </div>
                    <Select 
                      value={selectedPlans.mainContract.surgeryType}
                      onValueChange={(value) => updateMainContract('surgeryType', value)}
                    >
                      <SelectTrigger className={`text-body h-10 sm:h-11 input-standard`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options.surgeryType.map(type => (
                          <SelectItem key={type.value} value={type.value} className={`text-body`}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedPlans.mainContract.surgeryType === 'surgery2' && (
                    <div>
                      <div className="mb-3">
                        <HelpLabel helpKey="surgeryMultiplier">
                          <Label className={`text-body font-medium`}>手術Ⅱ型の倍数</Label>
                        </HelpLabel>
                      </div>
                      <Select 
                        value={selectedPlans.mainContract.surgeryMultiplier?.toString() || '10'}
                        onValueChange={(value) => updateMainContract('surgeryMultiplier', parseInt(value))}
                      >
                        <SelectTrigger className={`text-body h-10 sm:h-11 input-standard`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {options.surgeryMultiplier.map(multiplier => (
                            <SelectItem key={multiplier} value={multiplier.toString()} className={`text-body`}>
                              {multiplier}倍
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-4 sm:mt-6 card-standard">
                <CardHeader>
                  <CardTitle className={`text-h2`}>その他の保障</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                                      <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="radiationTherapy"
                        checked={selectedPlans.mainContract.radiationTherapy}
                        onCheckedChange={(checked) => updateMainContract('radiationTherapy', checked)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <HelpLabel helpKey="radiationTherapy">
                          <Label htmlFor="radiationTherapy" className="text-body">放射線治療給付金（入院給付金日額×10倍）</Label>
                        </HelpLabel>
                      </div>
                    </div>
                  
                                      <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="deathBenefit"
                        checked={selectedPlans.mainContract.deathBenefit}
                        onCheckedChange={(checked) => updateMainContract('deathBenefit', checked)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <HelpLabel helpKey="deathBenefit">
                          <Label htmlFor="deathBenefit" className="text-body">死亡給付金</Label>
                        </HelpLabel>
                      </div>
                    </div>
                  
                  <div>
                    <div className="mb-3">
                      <HelpLabel helpKey="paymentPeriod">
                        <Label className={`text-body font-medium`}>保険料払込期間</Label>
                      </HelpLabel>
                    </div>
                    <Select 
                      value={selectedPlans.mainContract.paymentPeriod.toString()}
                      onValueChange={(value) => updateMainContract('paymentPeriod', parseInt(value))}
                    >
                      <SelectTrigger className={`text-body h-10 sm:h-11 input-standard`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options.paymentPeriod.map(period => (
                          <SelectItem key={period} value={period.toString()} className={`text-body`}>
                            {period === -1 ? '終身' : `${period}歳`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 特約設定 */}
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center space-x-2 mb-6 sm:mb-8">
                <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                <h2 className={`text-h2 font-semibold`}>特約設定</h2>
                <Badge variant="outline" className={`ml-2 text-caption`}>任意</Badge>
              </div>
              
              <Tabs defaultValue="hospitalization" className="w-full">
                <TabsList className={`w-full text-caption`}>
                  <TabsTrigger value="hospitalization" className="focus-ring">入院系</TabsTrigger>
                  <TabsTrigger value="women" className="focus-ring">女性系</TabsTrigger>
                  <TabsTrigger value="medical" className="focus-ring">医療系</TabsTrigger>
                  <TabsTrigger value="other" className="focus-ring">その他</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hospitalization" className="space-y-4 sm:space-y-6 mt-1 sm:mt-2">
                  <Card className="card-standard">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="hospitalizationRider"
                          checked={selectedPlans.riders.hospitalizationRider.selected}
                          onCheckedChange={(checked) => updateRider('hospitalizationRider', 'selected', checked)}
                        />
                        <CardTitle className={`text-h2`}>入院一時給付特約</CardTitle>
                        <HelpButton helpKey="hospitalizationRider" />
                      </div>
                    </CardHeader>
                    {selectedPlans.riders.hospitalizationRider.selected && (
                      <CardContent className="space-y-4 sm:space-y-6">
                        <div>
                          <HelpLabel helpKey="hospitalizationRider">
                            <Label className={`text-body font-medium`}>1回につきの給付金額</Label>
                          </HelpLabel>
                          <Select 
                            value={selectedPlans.riders.hospitalizationRider.amount?.toString() || '10000'}
                            onValueChange={(value) => updateRider('hospitalizationRider', 'amount', parseInt(value))}
                          >
                            <SelectTrigger className={`text-body h-10 sm:h-11 input-standard`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.riderAmounts.small.map(amount => (
                                <SelectItem key={amount} value={amount.toString()} className={`text-body`}>
                                  {amount.toLocaleString()}円
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <HelpLabel helpKey="hospitalizationRider">
                            <Label className={`text-body font-medium`}>保障範囲の型</Label>
                          </HelpLabel>
                          <Select 
                            value={selectedPlans.riders.hospitalizationRider.coverageType || 'none'}
                            onValueChange={(value) => updateRider('hospitalizationRider', 'coverageType', value)}
                          >
                            <SelectTrigger className={`text-body h-10 sm:h-11 input-standard`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.coverageTypes.map(type => (
                                <SelectItem key={type.value} value={type.value} className={`text-body`}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>
                
                <TabsContent value="women" className="space-y-6 mt-1 sm:mt-2">
                  <Card className="card-standard">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="womenDiseaseRider"
                          checked={selectedPlans.riders.womenDiseaseRider.selected}
                          onCheckedChange={(checked) => updateRider('womenDiseaseRider', 'selected', checked)}
                          className="focus-ring"
                        />
                        <CardTitle className="text-h2">女性疾病入院一次給付特約</CardTitle>
                        <HelpButton helpKey="womenDiseaseRider" />
                      </div>
                    </CardHeader>
                    {selectedPlans.riders.womenDiseaseRider.selected && (
                      <CardContent>
                        <div>
                          <Label className="text-body font-medium">給付金額</Label>
                          <Select 
                            value={selectedPlans.riders.womenDiseaseRider.amount?.toString() || '10000'}
                            onValueChange={(value) => updateRider('womenDiseaseRider', 'amount', parseInt(value))}
                          >
                            <SelectTrigger className="text-body input-standard">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.riderAmounts.small.map(amount => (
                                <SelectItem key={amount} value={amount.toString()} className="text-body">
                                  {amount.toLocaleString()}円
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  <Card className="card-standard">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="womenMedicalRider"
                          checked={selectedPlans.riders.womenMedicalRider.selected}
                          onCheckedChange={(checked) => updateRider('womenMedicalRider', 'selected', checked)}
                          className="focus-ring"
                        />
                        <CardTitle className="text-h2">女性医療特約</CardTitle>
                        <HelpButton helpKey="womenMedicalRider" />
                      </div>
                    </CardHeader>
                    {selectedPlans.riders.womenMedicalRider.selected && (
                      <CardContent>
                        <div>
                          <Label className="text-body font-medium">給付金額</Label>
                          <Select 
                            value={selectedPlans.riders.womenMedicalRider.amount?.toString() || '2000'}
                            onValueChange={(value) => updateRider('womenMedicalRider', 'amount', parseInt(value))}
                          >
                            <SelectTrigger className="text-body input-standard">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.riderAmounts.medium.map(amount => (
                                <SelectItem key={amount} value={amount.toString()} className="text-body">
                                  {amount.toLocaleString()}円
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  <Card className="card-standard">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="womenCancerSupport"
                          checked={selectedPlans.riders.womenCancerSupport.selected}
                          onCheckedChange={(checked) => updateRider('womenCancerSupport', 'selected', checked)}
                          className="focus-ring"
                        />
                        <CardTitle className="text-h2">女性ガン早期発見サポート</CardTitle>
                        <HelpButton helpKey="womenCancerSupport" />
                      </div>
                    </CardHeader>
                  </Card>
                </TabsContent>
                
                <TabsContent value="medical" className="space-y-6 mt-1 sm:mt-2">
                  <Card className="card-standard">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="outpatientRider"
                          checked={selectedPlans.riders.outpatientRider.selected}
                          onCheckedChange={(checked) => updateRider('outpatientRider', 'selected', checked)}
                          className="focus-ring"
                        />
                        <CardTitle className="text-h2">退院後通院特約</CardTitle>
                        <HelpButton helpKey="outpatientRider" />
                      </div>
                    </CardHeader>
                    {selectedPlans.riders.outpatientRider.selected && (
                      <CardContent>
                        <div>
                          <Label className="text-body font-medium">給付金額</Label>
                          <Select 
                            value={selectedPlans.riders.outpatientRider.amount?.toString() || '2000'}
                            onValueChange={(value) => updateRider('outpatientRider', 'amount', parseInt(value))}
                          >
                            <SelectTrigger className="text-body input-standard">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.riderAmounts.medium.map(amount => (
                                <SelectItem key={amount} value={amount.toString()} className="text-body">
                                  {amount.toLocaleString()}円
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  <Card className="card-standard">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="advancedMedicalRider"
                          checked={selectedPlans.riders.advancedMedicalRider.selected}
                          onCheckedChange={(checked) => updateRider('advancedMedicalRider', 'selected', checked)}
                          className="focus-ring"
                        />
                        <CardTitle className="text-h2">先進医療特約</CardTitle>
                        <HelpButton helpKey="advancedMedicalRider" />
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="card-standard">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="cancerRider"
                          checked={selectedPlans.riders.cancerRider.selected}
                          onCheckedChange={(checked) => updateRider('cancerRider', 'selected', checked)}
                          className="focus-ring"
                        />
                        <CardTitle className="text-h2">がん一時給付特約</CardTitle>
                        <HelpButton helpKey="cancerRider" />
                      </div>
                    </CardHeader>
                    {selectedPlans.riders.cancerRider.selected && (
                      <CardContent>
                        <div>
                          <Label className="text-body font-medium">給付金額</Label>
                          <Select 
                            value={selectedPlans.riders.cancerRider.amount?.toString() || '100000'}
                            onValueChange={(value) => updateRider('cancerRider', 'amount', parseInt(value))}
                          >
                            <SelectTrigger className="text-body input-standard">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.riderAmounts.large.map(amount => (
                                <SelectItem key={amount} value={amount.toString()} className="text-body">
                                  {amount.toLocaleString()}円
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>
                
                <TabsContent value="other" className="space-y-6 mt-1 sm:mt-2">
                  <Card className="card-standard">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="disabilityRider"
                          checked={selectedPlans.riders.disabilityRider.selected}
                          onCheckedChange={(checked) => updateRider('disabilityRider', 'selected', checked)}
                          className="focus-ring"
                        />
                        <CardTitle className="text-h2">障害・介護一時給付特約</CardTitle>
                        <HelpButton helpKey="disabilityRider" />
                      </div>
                    </CardHeader>
                    {selectedPlans.riders.disabilityRider.selected && (
                      <CardContent>
                        <div>
                          <Label className="text-body font-medium">給付金額</Label>
                          <Select 
                            value={selectedPlans.riders.disabilityRider.amount?.toString() || '100000'}
                            onValueChange={(value) => updateRider('disabilityRider', 'amount', parseInt(value))}
                          >
                            <SelectTrigger className="text-body input-standard">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.riderAmounts.disability.map(amount => (
                                <SelectItem key={amount} value={amount.toString()} className="text-body">
                                  {amount.toLocaleString()}円
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="specificInjuryRider"
                          checked={selectedPlans.riders.specificInjuryRider.selected}
                          onCheckedChange={(checked) => updateRider('specificInjuryRider', 'selected', checked)}
                          className="focus-ring"
                        />
                        <CardTitle className="text-h2">特定損傷特約</CardTitle>
                        <HelpButton helpKey="specificInjuryRider" />
                      </div>
                    </CardHeader>
                    {selectedPlans.riders.specificInjuryRider.selected && (
                      <CardContent>
                        <div>
                          <Label className="text-body font-medium">給付金額</Label>
                          <Select 
                            value={selectedPlans.riders.specificInjuryRider.amount?.toString() || '50000'}
                            onValueChange={(value) => updateRider('specificInjuryRider', 'amount', parseInt(value))}
                          >
                            <SelectTrigger className="text-body input-standard">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.riderAmounts.injury.map(amount => (
                                <SelectItem key={amount} value={amount.toString()} className="text-body">
                                  {amount.toLocaleString()}円
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* サイドバー - 選択内容と保険料（デスクトップ用） */}
          <div className="hidden xl:block space-y-4 sm:space-y-6">
            {/* 選択内容サマリー */}
            <SelectionSummary
              selectedMainPlan={getMainContractSummary()}
              selectedRiders={getSelectedRidersSummary()}
              totalPremium={calculateTotalPremium()}
            />

            {/* 注意事項は非表示化（要望により文言削除） */}

            {/* 次へ進むボタン */}
            <Button 
              className={`w-full text-body py-4 sm:py-6 h-12 sm:h-14 focus-ring transition-normal button-standard bg-semantic-accent text-semantic-bg`} 
              size="lg"
              disabled={calculateProgress() < 30}
              onClick={() => window.location.href = '/medical/customer-info'}
            >
              次へ進む
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* フッター */}
      <div className="bg-white border-t"></div>
      <MedicalFooter />

      {/* モバイル用固定フッター */}
          <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-semantic-bg border-t border-semantic-border shadow-lg z-50">
        <div className="px-4 py-2 space-y-2">
          {/* 選択内容サマリー（コンパクト版） */}
            <div className="rounded-lg p-2 bg-semantic-bg">
            <div className="space-y-0.5">
                  <div className={`flex justify-between text-body`}>
                    <span className="text-semantic-fg-subtle">主契約:</span>
                <span className="font-medium">¥{(calculateTotalPremium() - Object.values(selectedPlans.riders).filter(r => r.selected).length * 200).toLocaleString()}/月</span>
              </div>
                  <div className={`flex justify-between text-body`}>
                    <span className="text-semantic-fg-subtle">特約:</span>
                <span className="font-medium">¥{Object.values(selectedPlans.riders).filter(r => r.selected).length * 200}/月</span>
              </div>
              <Separator />
                  <div className={`flex justify-between text-body font-bold`}>
                <span>合計:</span>
                    <span className="text-semantic-accent">¥{calculateTotalPremium().toLocaleString()}/月</span>
              </div>
            </div>
          </div>

          {/* 次へ進むボタン */}
          <Button 
            className={`w-full text-body py-2 h-10 focus-ring transition-normal button-standard bg-semantic-accent text-semantic-bg`}
            size="lg"
            disabled={calculateProgress() < 30}
            onClick={() => window.location.href = '/medical/customer-info'}
          >
            次へ進む
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ヘルプモーダル（スマホ用） */}
      <Dialog open={helpModalOpen} onOpenChange={setHelpModalOpen}>
        <DialogContent className="max-w-md modal-standard">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Image 
                src="/help-icon.svg" 
                alt="ヘルプ" 
                width={20} 
                height={20} 
                className="h-5 w-5"
              />
              <span>ヘルプ</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
              {currentHelpKey && (
                <p className="text-body">{helpTexts[currentHelpKey!]}</p>
              )}
          </div>
        </DialogContent>
      </Dialog>

      {/* チャット相談ダイアログ */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent className="max-w-2xl flex flex-col max-h-[80vh] p-2">
          <DialogHeader className="pb-2">
            <DialogTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <span>AI保険相談</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
            {/* 結果表示モード */}
            {currentQuestion === -1 ? (
              <Card className="bg-white shadow-sm">
                <CardHeader className="pb-2 text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="text-lg font-semibold text-green-700">診断結果</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 提案理由の表示 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-medium text-blue-800 mb-2">提案理由:</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      あなたの回答から、入院費用とがん治療への備えを重視されていることが分かりました。このプランは、日額8,000円の入院給付金で入院費用をカバーし、がん特約でがん治療にも手厚く備えられます。月額4,500円と比較的負担の軽い保険料で、長期的に継続しやすい設計になっています。
                    </p>
                  </div>
                  
                  {/* 推奨プランの表示 */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h4 className="font-medium text-green-800 mb-2">推奨プラン:</h4>
                    <div className="bg-white rounded p-3">
                      <h5 className="font-bold text-green-700 mb-2">「医療保険プランB」</h5>
                      <div className="space-y-1 text-sm text-gray-700">
                        <div>• 入院給付金: 日額8,000円</div>
                        <div>• 手術給付金: 入院給付金の20倍</div>
                        <div>• 放射線治療: あり</div>
                        <div>• がん特約: あり</div>
                        <div>• 月額保険料: 約4,500円</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* アクションボタン */}
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
                      onClick={() => setChatDialogOpen(false)}
                    >
                      適用しない
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        // プラン適用の処理（将来的に実装）
                        alert('プランが適用されました。詳細は担当者にお問い合わせください。')
                        setChatDialogOpen(false)
                      }}
                    >
                      適用する
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* 質問カードの表示 */
              questions.map((q, index) => (
                <Card key={q.id} className={`bg-white shadow-sm ${index === currentQuestion ? '' : 'hidden'}`}>
                  <CardHeader className="pb-2">
                    {/* 質問番号の円形バッジ */}
                    <div className="flex justify-center mb-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-700 text-white rounded-full">
                        <span className="text-lg font-bold">{q.number}</span>
                      </div>
                    </div>
                    
                    {/* 質問文 */}
                    <div className="space-y-1 text-center">
                      {q.question.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className="text-body text-semantic-fg">
                          {line}
                          {q.highlightedWords && q.highlightedWords.length > 0 && lineIndex === 1 && (
                            <span className="text-green-600 font-medium">
                              {q.highlightedWords.join(' ')}
                            </span>
                          )}
                        </p>
                      ))}
                    </div>
                    
                    {/* イラスト */}
                    <div className="text-4xl my-2 text-center">
                      {q.illustration}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    {/* 選択肢ボタン */}
                    {q.ui === 'multi_select' && q.options && q.options.length > 0 && (
                      <div className="space-y-2">
                        {q.options.map((option, optionIndex) => (
                          <OptionButton
                            key={option.id}
                            question={q}
                            option={option}
                            isSelected={selectedOptions[q.id]?.has(option.id) || false}
                            onToggle={() => toggleOption(q.id, option.id, true)}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* 単一選択肢（single_choice） */}
                    {q.ui === 'single_choice' && q.options && q.options.length > 0 && (
                      <div className="space-y-2">
                        {q.options.map((option, optionIndex) => (
                          <OptionButton
                            key={option.id}
                            question={q}
                            option={option}
                            isSelected={selectedOptions[q.id]?.has(option.id) || false}
                            onToggle={() => toggleOption(q.id, option.id, false)}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* 次へ進むボタン */}
                    {((q.ui === 'single_choice' && selectedOptions[q.id]?.size > 0) || 
                      (q.ui === 'multi_select' && selectedOptions[q.id]?.size > 0)) && (
                      <div className="pt-2">
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 text-white h-10"
                          onClick={goToNextQuestion}
                        >
                          次へ進む
                        </Button>
                      </div>
                    )}
                    
                    {/* 情報セクション */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">i</span>
                        </div>
                        <span className="text-sm text-blue-600">{q.info}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 