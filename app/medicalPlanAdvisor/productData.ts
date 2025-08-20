/**
 * 医療保険 商品データ（デモ用）
 *
 * 概要:
 * - 比較シミュレーション用の静的カタログ。
 * - 実商品の正式情報ではなく、UI/ロジック検証を目的としたサンプルデータ。
 *
 * 主な仕様:
 * - lowerCamelCase のキー命名。
 * - 各プロパティに日本語のTSDocを付与。
 *
 * 制限事項:
 * - 保険料や条件はダミー。将来、外部API/実データに置換可能な構造とする。
 */

/** 性別型 */
export type Gender = "male" | "female"

/** 年齢レンジ */
export interface AgeRange {
  /** 最小年齢 */
  min: number
  /** 最大年齢 */
  max: number
}

/** 入院保障 */
export interface HospitalizationCoverage {
  /** 入院日額（円） */
  hospitalizationDailyAmount: number
  /** 1入院の支払限度（例: 60_days / 90_days / unlimited 等） */
  hospitalizationLimitPerHospitalization: string
  /** 通算支払限度（例: 1000_days 等） */
  hospitalizationLimitTotal: string
  /** 注記 */
  hospitalizationNotes?: string
}

/** 手術保障 */
export interface SurgeryCoverage {
  /** 給付方式（multiplier | fixed） */
  surgeryPaymentMethod: "multiplier" | "fixed"
  /** 手術分類ごとの倍率（例: { A: 20, B: 10, C: 5 }） */
  surgeryMultipliers?: Record<string, number>
  /** 入院/外来の差異説明 */
  surgeryInpatientOutpatientDiff?: string
  /** 注記 */
  surgeryNotes?: string
}

/** 通院保障 */
export interface OutpatientCoverage {
  /** 通院日額（円） */
  outpatientDailyAmount?: number
  /** 対象期間（例: pre_30_post_60 等） */
  outpatientEligiblePeriod?: string
  /** 支払限度（日数/回数） */
  outpatientLimitDays?: number
  /** 注記 */
  outpatientNotes?: string
}

/** 特約群 */
export interface Riders {
  /** 先進医療特約 */
  advancedMedicalRider?: boolean
  /** 三大疾病/がん関連 */
  criticalIllnessRiders?: string[]
  /** 女性疾病特約 */
  womenSpecificRider?: boolean
  /** 入退院一時金 */
  hospitalizationLumpSumRider?: boolean
  /** 特定疾病保険料払込免除 */
  waiverRider?: boolean
  /** 骨折・外傷 等 */
  injuryFractureRider?: boolean
  /** 就業不能 等 */
  disabilityIncomeOrWorkIncapacityRider?: boolean
  /** その他 */
  otherRiders?: string[]
}

/** 付帯サービス */
export interface Services {
  /** セカンドオピニオン */
  secondOpinion?: boolean
  /** 健康/医療相談 */
  healthConsultation?: boolean
  /** その他 */
  others?: string[]
}

/** 保険料情報 */
export interface PremiumInfo {
  /** 月額保険料（例示額） */
  sampleMonthlyPremium: number
  /** 算出条件（例: 35歳 男性） */
  premiumConditions?: { age: number; gender: Gender }
  /** 更新時変動リスク */
  premiumChangeRisk?: string
}

/** 引受条件 */
export interface Underwriting {
  /** 待機期間（例: { cancer: 90 }） */
  waitingPeriod?: Record<string, number>
  /** 告知要件（概要） */
  disclosureRequirements?: string
  /** 支払対象外事由 */
  exclusions?: string[]
}

/** 商品 */
export interface Product {
  /** 商品ID */
  productId: string
  /** 商品名 */
  productName: string
  /** 保険会社名 */
  insurerName: string
  /** 保険タイプ（終身/定期） */
  policyType: "wholeLife" | "term"
  /** 更新区分（更新型/非更新） */
  renewalType: "renewable" | "level"
  /** 払込期間 */
  payingPeriod: string
  /** 払込方法 */
  paymentMode: "monthly" | "yearly"
  /** 加入可能年齢 */
  entryAgeRange: AgeRange
  /** 入院保障 */
  hospitalizationCoverage: HospitalizationCoverage
  /** 手術保障 */
  surgeryCoverage: SurgeryCoverage
  /** 通院保障 */
  outpatientCoverage?: OutpatientCoverage
  /** 特約 */
  riders?: Riders
  /** 付帯サービス */
  services?: Services
  /** 保険料情報 */
  premiumInfo: PremiumInfo
  /** 引受条件 */
  underwriting?: Underwriting
  /** 人気度（並び替え用） */
  popularity: number
  /** 見積・申込URL（任意） */
  applyUrl?: string
  /** 資料請求URL（任意） */
  brochureUrl?: string
  /** タグ（ハイライト/検索用） */
  tags?: string[]
  /** ロゴの代替表示テキスト */
  logoText?: string
  /** キャンペーン/実施状況の文言 */
  campaign?: string
}

/**
 * デモ用商品カタログ
 * - 値はダミー。多様なパターンを持つように分布させる。
 */
export const productCatalog: Product[] = [
  {
    productId: "p001",
    productName: "メディカルガードα",
    insurerName: "A社",
    policyType: "wholeLife",
    renewalType: "level",
    payingPeriod: "to_age_65",
    paymentMode: "monthly",
    entryAgeRange: { min: 0, max: 80 },
    hospitalizationCoverage: {
      hospitalizationDailyAmount: 10000,
      hospitalizationLimitPerHospitalization: "60_days",
      hospitalizationLimitTotal: "1000_days"
    },
    surgeryCoverage: {
      surgeryPaymentMethod: "multiplier",
      surgeryMultipliers: { A: 20, B: 10, C: 5 },
      surgeryInpatientOutpatientDiff: "入院中は倍率高、外来は低め"
    },
    outpatientCoverage: {
      outpatientDailyAmount: 5000,
      outpatientEligiblePeriod: "pre_30_post_60",
      outpatientLimitDays: 60
    },
    riders: {
      advancedMedicalRider: true,
      criticalIllnessRiders: ["cancer", "heart", "stroke"],
      waiverRider: true
    },
    services: { secondOpinion: true, healthConsultation: true },
    premiumInfo: { sampleMonthlyPremium: 2500, premiumConditions: { age: 35, gender: "male" } },
    underwriting: { waitingPeriod: { cancer: 90 } },
    popularity: 95,
    applyUrl: "#",
    brochureUrl: "#",
    tags: ["#日額1万円", "#終身", "#先進医療"],
    logoText: "A",
    campaign: "実施中"
  },
  {
    productId: "p002",
    productName: "医療エールNeo",
    insurerName: "B社",
    policyType: "wholeLife",
    renewalType: "renewable",
    payingPeriod: "lifetime",
    paymentMode: "monthly",
    entryAgeRange: { min: 0, max: 85 },
    hospitalizationCoverage: {
      hospitalizationDailyAmount: 5000,
      hospitalizationLimitPerHospitalization: "90_days",
      hospitalizationLimitTotal: "unlimited"
    },
    surgeryCoverage: { surgeryPaymentMethod: "fixed", surgeryNotes: "手術ごとに定額" },
    outpatientCoverage: { outpatientDailyAmount: 3000, outpatientLimitDays: 30 },
    riders: { advancedMedicalRider: true, hospitalizationLumpSumRider: true },
    services: { secondOpinion: true },
    premiumInfo: { sampleMonthlyPremium: 1800, premiumConditions: { age: 35, gender: "female" } },
    popularity: 88,
    applyUrl: "#",
    brochureUrl: "#",
    tags: ["#日額5千円", "#更新型", "#一時金"],
    logoText: "B",
    campaign: "実施中"
  },
  {
    productId: "p003",
    productName: "スマイルメディカル",
    insurerName: "C社",
    policyType: "term",
    renewalType: "renewable",
    payingPeriod: "years_10",
    paymentMode: "monthly",
    entryAgeRange: { min: 15, max: 70 },
    hospitalizationCoverage: {
      hospitalizationDailyAmount: 10000,
      hospitalizationLimitPerHospitalization: "120_days",
      hospitalizationLimitTotal: "1000_days"
    },
    surgeryCoverage: { surgeryPaymentMethod: "multiplier", surgeryMultipliers: { A: 20, B: 10 } },
    riders: { waiverRider: true },
    premiumInfo: { sampleMonthlyPremium: 2200 },
    popularity: 80,
    applyUrl: "#",
    brochureUrl: "#",
    tags: ["#定期10年", "#日額1万円"],
    logoText: "C"
  },
  {
    productId: "p004",
    productName: "終身メディケア",
    insurerName: "D社",
    policyType: "wholeLife",
    renewalType: "level",
    payingPeriod: "years_10",
    paymentMode: "monthly",
    entryAgeRange: { min: 0, max: 75 },
    hospitalizationCoverage: {
      hospitalizationDailyAmount: 20000,
      hospitalizationLimitPerHospitalization: "60_days",
      hospitalizationLimitTotal: "1000_days"
    },
    surgeryCoverage: { surgeryPaymentMethod: "multiplier", surgeryMultipliers: { A: 30, B: 15, C: 5 } },
    riders: { advancedMedicalRider: true, criticalIllnessRiders: ["cancer"] },
    premiumInfo: { sampleMonthlyPremium: 3600 },
    popularity: 92,
    applyUrl: "#",
    brochureUrl: "#",
    tags: ["#日額2万円", "#終身", "#がん"],
    logoText: "D",
    campaign: "実施中"
  },
  {
    productId: "p005",
    productName: "アクセスメディカル",
    insurerName: "E社",
    policyType: "term",
    renewalType: "renewable",
    payingPeriod: "years_10",
    paymentMode: "monthly",
    entryAgeRange: { min: 20, max: 60 },
    hospitalizationCoverage: {
      hospitalizationDailyAmount: 5000,
      hospitalizationLimitPerHospitalization: "60_days",
      hospitalizationLimitTotal: "730_days"
    },
    surgeryCoverage: { surgeryPaymentMethod: "fixed" },
    outpatientCoverage: { outpatientDailyAmount: 0 },
    premiumInfo: { sampleMonthlyPremium: 1500 },
    popularity: 70,
    applyUrl: "#",
    brochureUrl: "#",
    tags: ["#定期10年", "#日額5千円"],
    logoText: "E"
  },
  {
    productId: "p006",
    productName: "ライトケア",
    insurerName: "F社",
    policyType: "wholeLife",
    renewalType: "level",
    payingPeriod: "to_age_60",
    paymentMode: "monthly",
    entryAgeRange: { min: 0, max: 85 },
    hospitalizationCoverage: {
      hospitalizationDailyAmount: 10000,
      hospitalizationLimitPerHospitalization: "90_days",
      hospitalizationLimitTotal: "unlimited"
    },
    surgeryCoverage: { surgeryPaymentMethod: "fixed" },
    riders: { advancedMedicalRider: false },
    premiumInfo: { sampleMonthlyPremium: 2000 },
    popularity: 75,
    applyUrl: "#",
    brochureUrl: "#",
    tags: ["#終身", "#定額手術"],
    logoText: "F"
  }
]


