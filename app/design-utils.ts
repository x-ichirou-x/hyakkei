/**
 * デザイントークンを使用するためのユーティリティ関数
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 * @description デザイントークンとTailwind CSSの連携を簡単にするユーティリティ
 */

import { 
  COLORS, 
  SPACING, 
  TYPOGRAPHY, 
  EFFECTS, 
  COMPONENTS,
  LAYOUT 
} from './design-tokens'

/**
 * カラーユーティリティ
 */
export const ColorUtils = {
  /**
   * セマンティックカラーの取得
   */
  getSemanticColor: (colorName: keyof typeof COLORS.semantic) => {
    return COLORS.semantic[colorName]
  },

  /**
   * 拡張カラーの取得
   */
  getExtendedColor: (colorName: keyof typeof COLORS.extended) => {
    return COLORS.extended[colorName]
  },

  /**
   * カラーをTailwindクラスに変換
   */
  toTailwindClass: (colorName: keyof typeof COLORS.semantic, type: 'bg' | 'text' | 'border' = 'text') => {
    const colorMap = {
      bg: 'bg-semantic-',
      text: 'text-semantic-',
      border: 'border-semantic-'
    }
    return `${colorMap[type]}${colorName}`
  }
} as const

/**
 * スペーシングユーティリティ
 */
export const SpacingUtils = {
  /**
   * スペーシング値の取得
   */
  getSpacing: (size: keyof typeof SPACING.values) => {
    return SPACING.values[size]
  },

  /**
   * パディングクラスの取得
   */
  getPaddingClass: (size: keyof typeof SPACING.values) => {
    return SPACING.padding[size]
  },

  /**
   * マージンクラスの取得
   */
  getMarginClass: (size: keyof typeof SPACING.values) => {
    return SPACING.margin[size]
  },

  /**
   * スペーシングクラスの取得
   */
  getSpacingClass: (size: keyof typeof SPACING.values) => {
    return SPACING.classes[size]
  }
} as const

/**
 * タイポグラフィユーティリティ
 */
export const TypographyUtils = {
  /**
   * フォントサイズの取得
   */
  getFontSize: (type: keyof typeof TYPOGRAPHY.fontSize) => {
    return TYPOGRAPHY.fontSize[type]
  },

  /**
   * フォントウェイトの取得
   */
  getFontWeight: (weight: keyof typeof TYPOGRAPHY.fontWeight) => {
    return TYPOGRAPHY.fontWeight[weight]
  },

  /**
   * 行間の取得
   */
  getLineHeight: (type: keyof typeof TYPOGRAPHY.lineHeight) => {
    return TYPOGRAPHY.lineHeight[type]
  },

  /**
   * Tailwindクラスの取得
   */
  getTailwindClass: (type: keyof typeof TYPOGRAPHY.classes) => {
    return TYPOGRAPHY.classes[type]
  }
} as const

/**
 * エフェクトユーティリティ
 */
export const EffectUtils = {
  /**
   * 角丸の取得
   */
  getRadius: (size: keyof typeof EFFECTS.radius) => {
    return EFFECTS.radius[size]
  },

  /**
   * 影の取得
   */
  getShadow: (size: keyof typeof EFFECTS.shadow) => {
    return EFFECTS.shadow[size]
  },

  /**
   * Tailwind角丸クラスの取得
   */
  getRadiusClass: (size: keyof typeof EFFECTS.radius) => {
    return EFFECTS.radiusClasses[size]
  },

  /**
   * Tailwind影クラスの取得
   */
  getShadowClass: (size: keyof typeof EFFECTS.shadow) => {
    return EFFECTS.shadowClasses[size]
  }
} as const

/**
 * コンポーネントユーティリティ
 */
export const ComponentUtils = {
  /**
   * ボタンスタイルの取得
   */
  getButtonStyles: () => {
    return {
      height: COMPONENTS.button.height,
      padding: `0 ${COMPONENTS.button.padding.horizontal}px`,
      borderRadius: EFFECTS.radius[COMPONENTS.button.radius],
      boxShadow: EFFECTS.shadow[COMPONENTS.button.shadow],
    }
  },

  /**
   * 入力フィールドスタイルの取得
   */
  getInputStyles: () => {
    return {
      height: COMPONENTS.input.height,
      padding: `${COMPONENTS.input.padding.vertical}px ${COMPONENTS.input.padding.horizontal}px`,
      border: `${COMPONENTS.input.border}px solid ${COLORS.semantic.border}`,
      borderRadius: EFFECTS.radius[COMPONENTS.input.radius],
    }
  },

  /**
   * カードスタイルの取得
   */
  getCardStyles: () => {
    return {
      padding: COMPONENTS.card.padding,
      borderRadius: EFFECTS.radius[COMPONENTS.card.radius],
      boxShadow: EFFECTS.shadow[COMPONENTS.card.shadow],
      backgroundColor: COLORS.semantic.bg,
    }
  }
} as const

/**
 * レイアウトユーティリティ
 */
export const LayoutUtils = {
  /**
   * コンテナスタイルの取得
   */
  getContainerStyles: () => {
    return {
      maxWidth: LAYOUT.container.maxWidth,
      padding: `0 ${LAYOUT.container.padding}px`,
      margin: '0 auto',
    }
  },

  /**
   * レスポンシブブレークポイントの取得
   */
  getBreakpoint: (size: keyof typeof LAYOUT.breakpoints) => {
    return LAYOUT.breakpoints[size]
  }
} as const

/**
 * 統合ユーティリティ
 */
export const DesignUtils = {
  /**
   * セマンティックカラーテキストクラスの取得
   */
  textColor: (colorName: keyof typeof COLORS.semantic) => 
    ColorUtils.toTailwindClass(colorName, 'text'),

  /**
   * セマンティックカラーバックグラウンドクラスの取得
   */
  bgColor: (colorName: keyof typeof COLORS.semantic) => 
    ColorUtils.toTailwindClass(colorName, 'bg'),

  /**
   * セマンティックカラーボーダークラスの取得
   */
  borderColor: (colorName: keyof typeof COLORS.semantic) => 
    ColorUtils.toTailwindClass(colorName, 'border'),

  /**
   * 標準ボタンクラスの取得
   */
  button: () => 'button-standard',

  /**
   * 標準入力クラスの取得
   */
  input: () => 'input-standard',

  /**
   * 標準カードクラスの取得
   */
  card: () => 'card-standard',

  /**
   * 標準モーダルクラスの取得
   */
  modal: () => 'modal-standard',

  /**
   * 標準アラートクラスの取得
   */
  alert: () => 'alert-standard',

  /**
   * 標準テーブルクラスの取得
   */
  table: () => 'table-standard',

  /**
   * フォーカスリングクラスの取得
   */
  focusRing: () => 'focus-ring',

  /**
   * トランジションクラスの取得
   */
  transition: (speed: 'fast' | 'normal' | 'slow' = 'normal') => 
    `transition-${speed}`,

  /**
   * レスポンシブコンテナクラスの取得
   */
  container: () => 'container-responsive',

  /**
   * フォームグループクラスの取得
   */
  formGroup: (type: 'input' | 'section' = 'input') => 
    `form-${type}-group`,

  /**
   * 必須表示クラスの取得
   */
  required: () => 'form-required'
} as const

/**
 * デフォルトエクスポート
 */
export default DesignUtils
