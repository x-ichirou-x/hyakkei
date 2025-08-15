/**
 * ログ関数の使用例
 * 
 * 各ログレベルの使用方法と、実際の使用シーンを示す
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 */

import { 
  logError, 
  logPlan, 
  logInfo, 
  logDebug, 
  updateLoggerConfig,
  LogLevel,
  initializeLogger 
} from './logger'
import { getEnvironmentConfig, featureConfigs } from './logger-config'

/**
 * ログ関数の基本的な使用例
 */
export function basicLoggingExamples(): void {
  // エラーログ（常に出力）
  logError('ユーザー認証に失敗しました', { userId: '12345', reason: 'Invalid token' }, 'Authentication')
  
  // 計画ログ（本番環境でも出力）
  logPlan('保険プランの計算を開始', { planType: 'medical', coverage: 'comprehensive' }, 'PlanCalculation')
  
  // 情報ログ（開発環境のみ）
  logInfo('API呼び出しの詳細', { endpoint: '/api/diagnose', method: 'POST' }, 'APICall')
  
  // デバッグログ（開発環境のみ）
  logDebug('選択状態の変更', { questionId: 'Q1', optionId: 'hosp_costs' }, 'UserSelection')
}

/**
 * AI診断機能でのログ使用例
 */
export function aiDiagnosisLoggingExamples(): void {
  // 診断開始
  logPlan('AI診断を開始', { context: 'medical_insurance', questionCount: 5 }, 'AIDiagnosis')
  
  // ユーザー回答の処理
  logInfo('ユーザー回答を処理中', { 
    Q1: 'hosp_costs', 
    Q2: 'mid', 
    Q3: 'some_margin' 
  }, 'UserAnswers')
  
  // API呼び出し
  logDebug('OpenAI API呼び出し', { 
    model: 'gpt-5-mini', 
    maxTokens: 1500 
  }, 'OpenAIAPI')
  
  // 診断完了
  logPlan('AI診断が完了', { 
    diagnosisTime: '2.3s', 
    resultLength: 450 
  }, 'AIDiagnosis')
}

/**
 * エラーハンドリングでのログ使用例
 */
export function errorHandlingLoggingExamples(): void {
  try {
    // 何らかの処理
    throw new Error('API接続エラー')
  } catch (error) {
    // エラーログ（常に出力）
    logError('API呼び出し中にエラーが発生', error, 'APICall')
    
    // エラーの詳細情報（開発環境のみ）
    logDebug('エラーの詳細情報', {
      stack: error instanceof Error ? error.stack : 'Unknown',
      timestamp: new Date().toISOString()
    }, 'ErrorDetails')
  }
}

/**
 * パフォーマンス計測でのログ使用例
 */
export function performanceLoggingExamples(): void {
  const startTime = performance.now()
  
  // 何らかの処理
  setTimeout(() => {
    const endTime = performance.now()
    const duration = endTime - startTime
    
    // パフォーマンス情報（開発環境のみ）
    logInfo('処理時間の計測', { 
      duration: `${duration.toFixed(2)}ms`,
      threshold: '100ms'
    }, 'Performance')
    
    // パフォーマンス警告（本番環境でも出力）
    if (duration > 100) {
      logPlan('処理時間が閾値を超過', { 
        duration: `${duration.toFixed(2)}ms`,
        threshold: '100ms'
      }, 'PerformanceWarning')
    }
  }, 150)
}

/**
 * ログ設定の動的変更例
 */
export function dynamicLoggingConfigExamples(): void {
  // 現在の設定を取得
  const currentConfig = getEnvironmentConfig()
  
  // 特定の機能でログレベルを変更
  updateLoggerConfig(featureConfigs.aiDiagnosis)
  
  // ログ出力
  logInfo('AI診断機能のログ設定を適用', currentConfig, 'LoggerConfig')
  
  // 特定のログレベルを無効化
  import { disableLogLevels } from './logger'
  disableLogLevels([LogLevel.DEBUG])
  
  // デバッグログは出力されない
  logDebug('このログは出力されません', {}, 'DebugDisabled')
}

/**
 * 環境別のログ設定例
 */
export function environmentSpecificLoggingExamples(): void {
  // 開発環境での設定
  if (process.env.NODE_ENV === 'development') {
    updateLoggerConfig({
      levels: {
        [LogLevel.ERROR]: true,
        [LogLevel.PLAN]: true,
        [LogLevel.INFO]: true,
        [LogLevel.DEBUG]: true
      },
      includeTimestamp: true,
      includeContext: true
    })
    
    logInfo('開発環境用のログ設定を適用', {}, 'EnvironmentConfig')
  }
  
  // 本番環境での設定
  if (process.env.NODE_ENV === 'production') {
    updateLoggerConfig({
      levels: {
        [LogLevel.ERROR]: true,
        [LogLevel.PLAN]: true,
        [LogLevel.INFO]: false,
        [LogLevel.DEBUG]: false
      },
      includeTimestamp: true,
      includeContext: false
    })
    
    logPlan('本番環境用のログ設定を適用', {}, 'EnvironmentConfig')
  }
}

/**
 * ログの初期化例
 */
export function initializeLoggingSystem(): void {
  // ログシステムを初期化
  initializeLogger()
  
  // 初期化完了のログ
  logPlan('ログシステムの初期化が完了', {
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  }, 'SystemInitialization')
}

