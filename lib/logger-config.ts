/**
 * ログ設定ファイル
 * 
 * 環境別のログ設定を管理
 * 開発・本番・テスト環境で異なるログレベルを設定
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 */

import { LoggerConfig, LogLevel } from './logger'

/**
 * 開発環境のログ設定
 */
export const developmentConfig: LoggerConfig = {
  enabled: true,
  levels: {
    [LogLevel.ERROR]: true,   // エラーは常に有効
    [LogLevel.PLAN]: true,    // 計画ログは有効
    [LogLevel.INFO]: true,    // 情報ログは有効
    [LogLevel.DEBUG]: true    // デバッグログは有効
  },
  includeTimestamp: true,
  includeContext: true
}

/**
 * 本番環境のログ設定
 */
export const productionConfig: LoggerConfig = {
  enabled: true,
  levels: {
    [LogLevel.ERROR]: true,   // エラーは常に有効
    [LogLevel.PLAN]: true,    // 計画ログは有効
    [LogLevel.INFO]: false,   // 情報ログは無効
    [LogLevel.DEBUG]: false   // デバッグログは無効
  },
  includeTimestamp: true,
  includeContext: false       // 本番環境ではコンテキスト情報を省略
}

/**
 * テスト環境のログ設定
 */
export const testConfig: LoggerConfig = {
  enabled: false,             // テスト環境ではログを無効化
  levels: {
    [LogLevel.ERROR]: false,
    [LogLevel.PLAN]: false,
    [LogLevel.INFO]: false,
    [LogLevel.DEBUG]: false
  },
  includeTimestamp: false,
  includeContext: false
}

/**
 * 環境に応じたログ設定を取得
 * @returns 環境に適したログ設定
 */
export function getEnvironmentConfig(): LoggerConfig {
  const env = process.env.NODE_ENV || 'development'
  
  switch (env) {
    case 'production':
      return productionConfig
    case 'test':
      return testConfig
    case 'development':
    default:
      return developmentConfig
  }
}

/**
 * カスタムログ設定の作成
 * @param overrides 上書きする設定
 * @returns カスタム設定
 */
export function createCustomConfig(overrides: Partial<LoggerConfig>): LoggerConfig {
  const baseConfig = getEnvironmentConfig()
  return { ...baseConfig, ...overrides }
}

/**
 * 特定の機能用のログ設定
 */
export const featureConfigs = {
  // AI診断機能用のログ設定
  aiDiagnosis: {
    enabled: true,
    levels: {
      [LogLevel.ERROR]: true,
      [LogLevel.PLAN]: true,
      [LogLevel.INFO]: process.env.NODE_ENV === 'development',
      [LogLevel.DEBUG]: process.env.NODE_ENV === 'development'
    }
  },
  
  // ユーザー操作用のログ設定
  userActions: {
    enabled: true,
    levels: {
      [LogLevel.ERROR]: true,
      [LogLevel.PLAN]: true,
      [LogLevel.INFO]: false,
      [LogLevel.DEBUG]: false
    }
  },
  
  // システム処理用のログ設定
  systemProcess: {
    enabled: true,
    levels: {
      [LogLevel.ERROR]: true,
      [LogLevel.PLAN]: true,
      [LogLevel.INFO]: true,
      [LogLevel.DEBUG]: process.env.NODE_ENV === 'development'
    }
  }
}

