/**
 * ログ管理用の共通関数
 * 
 * ログレベルを管理し、設定に応じてログの出力を制御
 * エラー、計画、Info（Debug用）の3つのレベルをサポート
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 */

/**
 * ログレベルの定義
 */
export enum LogLevel {
  ERROR = 'error',      // エラーログ（常に出力）
  PLAN = 'plan',        // 計画・処理ログ（本番環境でも出力）
  INFO = 'info',        // デバッグ用情報（開発環境のみ）
  DEBUG = 'debug'       // 詳細デバッグ（開発環境のみ）
}

/**
 * ログ設定の型定義
 */
export interface LoggerConfig {
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

/**
 * デフォルトのログ設定
 */
const defaultConfig: LoggerConfig = {
  enabled: true,
  levels: {
    [LogLevel.ERROR]: true,   // エラーは常に有効
    [LogLevel.PLAN]: true,    // 計画ログは常に有効
    [LogLevel.INFO]: process.env.NODE_ENV === 'development',  // 開発環境のみ
    [LogLevel.DEBUG]: process.env.NODE_ENV === 'development'  // 開発環境のみ
  },
  includeTimestamp: true,
  includeContext: true
}

/**
 * ログ設定のインスタンス
 */
let currentConfig: LoggerConfig = { ...defaultConfig }

/**
 * ログ設定を更新
 * @param config 新しいログ設定
 */
export function updateLoggerConfig(config: Partial<LoggerConfig>): void {
  currentConfig = { ...currentConfig, ...config }
}

/**
 * ログ設定を取得
 * @returns 現在のログ設定
 */
export function getLoggerConfig(): LoggerConfig {
  return { ...currentConfig }
}

/**
 * ログ設定をリセット
 */
export function resetLoggerConfig(): void {
  currentConfig = { ...defaultConfig }
}

/**
 * ログ出力の基本関数
 * @param level ログレベル
 * @param message メッセージ
 * @param data 追加データ
 * @param context コンテキスト情報
 */
function log(level: LogLevel, message: string, data?: any, context?: string): void {
  // ログ機能が無効な場合は何もしない
  if (!currentConfig.enabled) return
  
  // 指定されたログレベルが無効な場合は何もしない
  if (!currentConfig.levels[level]) return
  
  // ログメッセージを構築
  let logMessage = `[${level.toUpperCase()}] ${message}`
  
  // タイムスタンプを追加
  if (currentConfig.includeTimestamp) {
    const timestamp = new Date().toISOString()
    logMessage = `[${timestamp}] ${logMessage}`
  }
  
  // コンテキスト情報を追加
  if (currentConfig.includeContext && context) {
    logMessage = `${logMessage} | Context: ${context}`
  }
  
  // ログレベルに応じて出力方法を変更
  switch (level) {
    case LogLevel.ERROR:
      console.error(logMessage, data || '')
      break
    case LogLevel.PLAN:
      console.log(logMessage, data || '')
      break
    case LogLevel.INFO:
      console.info(logMessage, data || '')
      break
    case LogLevel.DEBUG:
      console.debug(logMessage, data || '')
      break
    default:
      console.log(logMessage, data || '')
  }
}

/**
 * エラーログを出力
 * @param message エラーメッセージ
 * @param error エラーオブジェクト
 * @param context コンテキスト情報
 */
export function logError(message: string, error?: any, context?: string): void {
  log(LogLevel.ERROR, message, error, context)
}

/**
 * 計画・処理ログを出力
 * @param message メッセージ
 * @param data 追加データ
 * @param context コンテキスト情報
 */
export function logPlan(message: string, data?: any, context?: string): void {
  log(LogLevel.PLAN, message, data, context)
}

/**
 * 情報ログを出力（デバッグ用）
 * @param message メッセージ
 * @param data 追加データ
 * @param context コンテキスト情報
 */
export function logInfo(message: string, data?: any, context?: string): void {
  log(LogLevel.INFO, message, data, context)
}

/**
 * デバッグログを出力
 * @param message メッセージ
 * @param data 追加データ
 * @param context コンテキスト情報
 */
export function logDebug(message: string, data?: any, context?: string): void {
  log(LogLevel.DEBUG, message, data, context)
}

/**
 * 環境に応じたログ設定の初期化
 */
export function initializeLogger(): void {
  const env = process.env.NODE_ENV || 'development'
  
  if (env === 'production') {
    // 本番環境：エラーと計画ログのみ有効
    updateLoggerConfig({
      levels: {
        [LogLevel.ERROR]: true,
        [LogLevel.PLAN]: true,
        [LogLevel.INFO]: false,
        [LogLevel.DEBUG]: false
      }
    })
  } else if (env === 'development') {
    // 開発環境：すべてのログを有効
    updateLoggerConfig({
      levels: {
        [LogLevel.ERROR]: true,
        [LogLevel.PLAN]: true,
        [LogLevel.INFO]: true,
        [LogLevel.DEBUG]: true
      }
    })
  }
  
  // 初期化完了のログ
  logInfo('Logger initialized', { environment: env, config: currentConfig })
}

/**
 * ログレベルの一括制御
 * @param levels 有効にするログレベルの配列
 */
export function enableLogLevels(levels: LogLevel[]): void {
  const newLevels = { ...currentConfig.levels }
  levels.forEach(level => {
    newLevels[level] = true
  })
  updateLoggerConfig({ levels: newLevels })
}

/**
 * ログレベルの一括無効化
 * @param levels 無効にするログレベルの配列
 */
export function disableLogLevels(levels: LogLevel[]): void {
  const newLevels = { ...currentConfig.levels }
  levels.forEach(level => {
    newLevels[level] = false
  })
  updateLoggerConfig({ levels: newLevels })
}

