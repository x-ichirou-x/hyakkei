# ログシステム

## 概要

このログシステムは、アプリケーション全体で統一されたログ出力を提供し、環境に応じてログレベルを制御できます。

## 特徴

- **4つのログレベル**: ERROR, PLAN, INFO, DEBUG
- **環境別設定**: 開発・本番・テスト環境で異なる設定
- **動的制御**: 実行時にログレベルを変更可能
- **コンテキスト情報**: ログにコンテキスト情報を付加
- **タイムスタンプ**: ログにタイムスタンプを自動付加

## ログレベル

### ERROR（エラー）
- **用途**: エラーや例外の記録
- **出力**: 常に出力（`console.error`）
- **例**: API呼び出しエラー、バリデーションエラー

### PLAN（計画・処理）
- **用途**: 重要な処理の開始・完了、ビジネスロジック
- **出力**: 本番環境でも出力（`console.log`）
- **例**: 保険プラン計算開始、AI診断完了

### INFO（情報）
- **用途**: デバッグに有用な情報
- **出力**: 開発環境のみ（`console.info`）
- **例**: API呼び出し詳細、ユーザー操作

### DEBUG（デバッグ）
- **用途**: 詳細なデバッグ情報
- **出力**: 開発環境のみ（`console.debug`）
- **例**: 内部状態、パフォーマンス計測

## 基本的な使用方法

### インポート
```typescript
import { logError, logPlan, logInfo, logDebug } from '@/lib/logger'
```

### 基本的なログ出力
```typescript
// エラーログ
logError('ユーザー認証に失敗しました', error, 'Authentication')

// 計画ログ
logPlan('保険プランの計算を開始', { planType: 'medical' }, 'PlanCalculation')

// 情報ログ
logInfo('API呼び出しの詳細', { endpoint: '/api/diagnose' }, 'APICall')

// デバッグログ
logDebug('選択状態の変更', { questionId: 'Q1' }, 'UserSelection')
```

## ログ設定

### 環境別の自動設定
```typescript
import { initializeLogger } from '@/lib/logger'

// アプリケーション起動時に初期化
initializeLogger()
```

### 手動での設定変更
```typescript
import { updateLoggerConfig, LogLevel } from '@/lib/logger'

// 特定のログレベルを無効化
updateLoggerConfig({
  levels: {
    [LogLevel.DEBUG]: false,
    [LogLevel.INFO]: false
  }
})
```

### 機能別の設定
```typescript
import { featureConfigs } from '@/lib/logger-config'

// AI診断機能用の設定を適用
updateLoggerConfig(featureConfigs.aiDiagnosis)
```

## 設定オプション

### LoggerConfig
```typescript
interface LoggerConfig {
  enabled: boolean           // ログ機能全体の有効/無効
  levels: {                  // 各ログレベルの有効/無効
    [LogLevel.ERROR]: boolean
    [LogLevel.PLAN]: boolean
    [LogLevel.INFO]: boolean
    [LogLevel.DEBUG]: boolean
  }
  includeTimestamp: boolean  // タイムスタンプの表示
  includeContext: boolean    // コンテキスト情報の表示
}
```

## 環境別のデフォルト設定

### 開発環境
- すべてのログレベルが有効
- タイムスタンプとコンテキスト情報を表示

### 本番環境
- ERRORとPLANのみ有効
- タイムスタンプは表示、コンテキスト情報は非表示

### テスト環境
- すべてのログを無効化

## 使用例

### AI診断機能での使用
```typescript
// 診断開始
logPlan('AI診断を開始', { context: 'medical_insurance' }, 'AIDiagnosis')

// ユーザー回答の処理
logInfo('ユーザー回答を処理中', userAnswers, 'UserAnswers')

// API呼び出し
logDebug('OpenAI API呼び出し', { model: 'gpt-5-mini' }, 'OpenAIAPI')

// 診断完了
logPlan('AI診断が完了', { diagnosisTime: '2.3s' }, 'AIDiagnosis')
```

### エラーハンドリングでの使用
```typescript
try {
  // 何らかの処理
} catch (error) {
  logError('処理中にエラーが発生', error, 'ProcessError')
  
  if (process.env.NODE_ENV === 'development') {
    logDebug('エラーの詳細情報', { stack: error.stack }, 'ErrorDetails')
  }
}
```

### パフォーマンス計測での使用
```typescript
const startTime = performance.now()

// 処理実行
const result = await someProcess()

const duration = performance.now() - startTime
logInfo('処理時間の計測', { duration: `${duration.toFixed(2)}ms` }, 'Performance')

if (duration > 100) {
  logPlan('処理時間が閾値を超過', { duration: `${duration.toFixed(2)}ms` }, 'PerformanceWarning')
}
```

## ベストプラクティス

1. **適切なログレベルを使用**
   - ERROR: エラーや例外のみ
   - PLAN: 重要なビジネスロジック
   - INFO: デバッグに有用な情報
   - DEBUG: 詳細な内部情報

2. **コンテキスト情報を活用**
   - ログの分類と検索を容易にする
   - 例: 'Authentication', 'PlanCalculation', 'APICall'

3. **機密情報の除外**
   - パスワード、APIキー、個人情報は含めない
   - 必要に応じてマスク処理を実施

4. **パフォーマンスを考慮**
   - 大量のログ出力は避ける
   - 本番環境では必要最小限のログのみ

## トラブルシューティング

### ログが出力されない
1. ログ機能が有効になっているか確認
2. ログレベルが有効になっているか確認
3. 環境変数`NODE_ENV`が正しく設定されているか確認

### ログレベルが期待通りに動作しない
1. `initializeLogger()`が呼ばれているか確認
2. 設定が正しく適用されているか確認
3. 環境別の設定が正しいか確認

