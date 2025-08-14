/**
 * アプリケーション全体のエクスポート
 * 
 * @author Medical Insurance System
 * @version 2.0.0
 * @description デザイントンマナガイドに準拠したデザインシステム全体をエクスポート
 */

// メイン定数
export { TEXT_SIZES, APP_CONSTANTS, LEGACY_ALIASES } from './constants'

// デザイントークン
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
} from './design-tokens'

// デザインユーティリティ
export { 
  ColorUtils, 
  SpacingUtils, 
  TypographyUtils, 
  EffectUtils, 
  ComponentUtils, 
  LayoutUtils
} from './design-utils'

// デフォルトエクスポート
export { default as DesignUtils } from './design-utils'
