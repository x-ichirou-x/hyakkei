# 医療保険 商品比較ガイド（カテゴリ定義）

- 出典: [コのほけん！ 医療保険 比較シミュレーション](https://konohoken.com/medical/compare/)
- 目的: 医療保険の商品比較における「縦軸（比較項目）」の標準化。医療保険プランアドバイザーのUI/データモデル設計の参照とする。
- 対象: 医療保険（入院・手術・通院を核とした保障）。初期は終身/定期・更新/非更新・特約の有無を含む一般的な範囲。
- 注意: 掲載の内容はデモ設計用の一般化。実商品の正式仕様は各社資料・約款を参照すること。

---

## 1. 商品一覧で想定されるプロダクトの型

- 保険期間/タイプ
  - 終身型、定期型（10年更新等）
  - 更新型/非更新（レベル型）
- 給付の核
  - 入院給付（日額ベース）
  - 手術給付（倍率方式/定額方式、入院/外来区分）
  - 通院給付（入院前後/退院後のみ 等の対象期間）
- 特約の組み合わせ
  - 先進医療、三大疾病・がん関連、女性疾病、入退院一時金、払込免除 等
- 付帯サービス
  - セカンドオピニオン、健康/医療相談、各種サポート

---

## 2. 比較表の縦軸（主要カテゴリ）

### 2.1 基本情報
- productName: 商品名
- insurerName: 保険会社名
- policyType: 保険タイプ（終身/定期）
- renewalType: 更新区分（更新型/非更新）
- payingPeriod: 払込期間（終身払/◯年払/◯歳払 等）
- paymentMode: 払込方法（月払/年払 等）
- entryAgeRange: 加入可能年齢

### 2.2 入院保障（Core: hospitalizationCoverage）
- hospitalizationDailyAmount: 入院日額（例: 5,000/10,000/20,000円）
- hospitalizationLimitPerHospitalization: 1入院の支払限度日数（例: 60/90/120/無制限）
- hospitalizationLimitTotal: 通算支払限度日数（例: 1,000日 等）
- hospitalizationNotes: 疾病・事故・精神等に関する制限/注記

### 2.3 手術保障（surgeryCoverage）
- surgeryPaymentMethod: 給付方式（倍率/定額）
- surgeryMultipliers: 手術分類ごとの倍率（例: A/B/C 等の倍率表）
- surgeryInpatientOutpatientDiff: 入院中/外来手術での差異
- surgeryNotes: 対象範囲・除外等

### 2.4 通院保障（outpatientCoverage）
- outpatientDailyAmount: 通院日額
- outpatientEligiblePeriod: 対象期間（入院前後◯日/退院後◯日 等）
- outpatientLimitDays: 支払限度（日数/回数）
- outpatientNotes: 注記

### 2.5 特約・オプション（riders）
- advancedMedicalRider: 先進医療
- criticalIllnessRiders: 三大疾病/がん関連（診断一時金、通院、再発/長期化 等）
- womenSpecificRider: 女性疾病
- hospitalizationLumpSumRider: 入院/退院一時金
- waiverRider: 特定疾病保険料払込免除
- injuryFractureRider: 骨折・外傷 等
- disabilityIncomeOrWorkIncapacityRider: 就業不能 等
- otherRiders: その他の特約

### 2.6 付帯サービス（services）
- secondOpinion: セカンドオピニオン
- healthConsultation: 健康/医療相談
- others: その他サポート

### 2.7 保険料情報（premiumInfo）
- sampleMonthlyPremium: 月額保険料例（想定条件付き）
- premiumConditions: 算出条件（年齢/性別/プラン 等）
- premiumChangeRisk: 更新時の保険料変動リスク（更新型の場合）

### 2.8 申込・引受条件（underwriting）
- waitingPeriod: 待機期間（がん等）
- disclosureRequirements: 告知要件（概要）
- exclusions: 支払対象外事由

### 2.9 免責・注意（disclaimer）
- notes: 表示の前提（掲載時点、条件による差異 等）
- references: 公式資料の確認喚起

---

## 3. 比較ビュー設計の例（縦軸）

1. 基本情報（商品名/保険会社/タイプ/更新/払込/加入年齢）
2. 入院（日額/1入院限度/通算限度/注記）
3. 手術（方式/倍率/入外差/注記）
4. 通院（日額/対象期間/限度/注記）
5. 特約（先進医療/三大疾病・がん/女性疾病/一時金/払込免除/その他）
6. 付帯サービス（セカンドオピニオン/健康相談/他）
7. 保険料（例示額/算出条件/変動リスク）
8. 申込・引受（待機/告知/除外）
9. 免責・注意（注記/参照）

---

## 4. 入力→比較項目のマッピング（初期案）

- 年齢/性別/家族構成/職業/既往・通院/予算 → sampleMonthlyPremium, underwriting, riders の要否
- ニーズ（入院日額希望/通院の重要度/先進医療/三大疾病/払込免除） → hospitalizationDailyAmount, outpatientCoverage, advancedMedicalRider, criticalIllnessRiders, waiverRider
- 優先基準（価格/バランス/手厚さ） → プランテンプレ選択 + riders の採否

---

## 5. データモデル（JSONキー例：lowerCamelCase）

```json
{
  "productId": "string",
  "productName": "string",
  "insurerName": "string",
  "policyType": "wholeLife | term",
  "renewalType": "renewable | level",
  "payingPeriod": "lifetime | years_10 | to_age_65",
  "paymentMode": "monthly | yearly",
  "entryAgeRange": { "min": 0, "max": 85 },
  "hospitalizationCoverage": {
    "hospitalizationDailyAmount": 10000,
    "hospitalizationLimitPerHospitalization": "60_days | 90_days | 120_days | unlimited",
    "hospitalizationLimitTotal": "1000_days",
    "hospitalizationNotes": "string"
  },
  "surgeryCoverage": {
    "surgeryPaymentMethod": "multiplier | fixed",
    "surgeryMultipliers": { "A": 20, "B": 10, "C": 5 },
    "surgeryInpatientOutpatientDiff": "string",
    "surgeryNotes": "string"
  },
  "outpatientCoverage": {
    "outpatientDailyAmount": 5000,
    "outpatientEligiblePeriod": "pre_30_post_60",
    "outpatientLimitDays": 60,
    "outpatientNotes": "string"
  },
  "riders": {
    "advancedMedicalRider": true,
    "criticalIllnessRiders": ["cancer", "heart", "stroke"],
    "womenSpecificRider": false,
    "hospitalizationLumpSumRider": false,
    "waiverRider": true,
    "injuryFractureRider": false,
    "disabilityIncomeOrWorkIncapacityRider": false,
    "otherRiders": []
  },
  "services": {
    "secondOpinion": true,
    "healthConsultation": true,
    "others": []
  },
  "premiumInfo": {
    "sampleMonthlyPremium": 2500,
    "premiumConditions": { "age": 35, "gender": "male" },
    "premiumChangeRisk": "renewal_may_increase"
  },
  "underwriting": {
    "waitingPeriod": { "cancer": 90 },
    "disclosureRequirements": "summary string",
    "exclusions": ["pre_existing_conditions"]
  },
  "disclaimer": {
    "notes": "表示は一例。条件により異なる。",
    "references": ["official_brochure_url"]
  }
}
```

---

## 6. 備考
- 比較表の具体的な行・文言はUI/紙面幅に応じて調整する。
- 商品によっては該当しない項目があるため、未設定値は非表示/注記に切替える。
- 実装時は型定義（TypeScript）とJSDoc/TSDocで各項目の意味と単位を明示する。

---

最終更新: 2025-08-（作成日）
