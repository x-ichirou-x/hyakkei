/**
 * アプリケーション全体で使用する定数定義
 *
 * @author Medical Insurance System
 * @version 2.0.0
 * @description デザイントンマナガイドに準拠したデザインシステム定数
 */

// デザイントークンのインポート
import { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  LAYOUT, 
  EFFECTS, 
  INTERACTIONS, 
  COMPONENTS, 
  Z_INDEX, 
  FORMS, 
  UTILS, 
  DEFAULTS 
} from './design-tokens'

// デザイントークンのエクスポート
export { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  LAYOUT, 
  EFFECTS, 
  INTERACTIONS, 
  COMPONENTS, 
  Z_INDEX, 
  FORMS, 
  UTILS, 
  DEFAULTS 
}

/**
 * 文字サイズ定数定義（デザイントンマナガイド準拠）
 * 用途別に統一された文字サイズを管理
 *
 * サイズ体系（デザイントンマナガイド準拠）:
 * - 極小・補足文: text-xs (14px) - 備考、ラベルなど（最低限）
 * - 小さめ・補助的本文: text-sm (16px) - キャプション、注釈など
 * - 本文（標準）: text-base (18px) - 通常の段落文、リスト
 * - 強調本文・見出し: text-lg (20px) - キービジュアル横の文章など
 * - 小見出し: text-xl (24px) - セクション見出しなど
 * - 中見出し: text-2xl (30px) - トップページ内の重要見出し
 * - 大見出し: text-3xl (36px) - ページタイトルなど
 * - Heroタイトル等: text-4xl (48px) - ヒーローセクションなどに使う大型タイトル
 */
export const TEXT_SIZES = {
  // 見出し（デザイントンマナガイド準拠）
  heading: {
    hero: "text-3xl sm:text-4xl lg:text-4xl", // Heroタイトル等 (36px/48px)
    h1: "text-2xl sm:text-3xl lg:text-3xl",   // 大見出し・ページタイトル (24px/36px)
    h2: "text-xl sm:text-2xl lg:text-2xl",    // 中見出し・重要見出し (20px/30px)
    h3: "text-lg sm:text-xl lg:text-xl",      // 小見出し・セクション見出し (18px/24px)
    h4: "text-base sm:text-lg lg:text-lg",    // 強調本文・見出し (16px/20px)
  },

  // 本文（デザイントンマナガイド準拠）
  body: {
    large: "text-lg sm:text-lg lg:text-lg",   // 強調本文・見出し (18px)
    medium: "text-base sm:text-base lg:text-base", // 本文（標準） (16px)
    small: "text-sm sm:text-sm lg:text-sm",   // 小さめ・補助的本文 (14px)
    tiny: "text-xs sm:text-xs lg:text-xs",   // 極小・補足文 (12px)
  },

  // フォーム要素（デザイントンマナガイド準拠）
  form: {
    label: "text-sm sm:text-sm lg:text-sm",   // ラベル (14px)
    input: "text-base sm:text-base lg:text-base", // 入力フィールド (16px)
    select: "text-base sm:text-base lg:text-base", // セレクトボックス (16px)
    button: "text-base sm:text-base lg:text-base", // ボタン (16px)
  },

  // 特殊用途（デザイントンマナガイド準拠）
  special: {
    price: "text-base sm:text-base lg:text-base", // 価格表示 (16px)
    badge: "text-xs sm:text-xs lg:text-xs",      // バッジ (12px)
    tooltip: "text-sm sm:text-sm lg:text-sm",    // ツールチップ (14px)
    caption: "text-sm sm:text-sm lg:text-sm",    // キャプション (14px)
    note: "text-xs sm:text-xs lg:text-xs",      // 備考・注釈 (12px)
  }
} as const

/**
 * アプリケーション全体で使用するその他の定数
 */
export const APP_CONSTANTS = {
  // アプリケーション名
  APP_NAME: "Medical Insurance System",

  // バージョン
  VERSION: "4.2.0",

  // デフォルト設定
  DEFAULTS: {
    // ページネーション
    PAGE_SIZE: 10,

    // タイムアウト
    TIMEOUT: 30000,

    // 日付フォーマット
    DATE_FORMAT: "yyyy/MM/dd",
    DATETIME_FORMAT: "yyyy/MM/dd HH:mm",
  }
} as const

/**
 * レガシー互換性のためのエイリアス
 * 既存のコードとの互換性を保つため
 */
export const LEGACY_ALIASES = {
  // 旧TEXT_SIZESとの互換性
  FONT_SIZES: TEXT_SIZES,

  // 旧カラー定数との互換性
  OLD_COLORS: {
    primary: COLORS.semantic.brand,
    secondary: COLORS.semantic.accent,
    success: COLORS.semantic.success,
    warning: COLORS.semantic.warning,
    error: COLORS.semantic.danger,
    text: COLORS.semantic.fg,
    textSecondary: COLORS.semantic.fgSubtle,
    border: COLORS.semantic.border,
    background: COLORS.semantic.bg,
  }
} as const
