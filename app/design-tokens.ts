/**
 * デザイントンマナガイドに基づくデザイン定数定義
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 * @description CSSデザイントンマナガイドに準拠したデザインシステム定数
 */

/**
 * カラートークン定義
 * セマンティックファーストの設計原則に基づく
 */
export const COLORS = {
  // セマンティックカラー
  semantic: {
    bg: '#FFFFFF',           // ページ/カード背景
    fg: '#222222',           // 主要テキスト
    fgSubtle: '#666666',     // 補足テキスト
    border: '#E5E7EB',       // 枠線・区切り
    brand: '#005BAC',        // ブランド
    accent: '#0A74DA',       // 強調CTA
    success: '#2E7D32',      // 完了/OK
    warning: '#F59E0B',      // 注意
    danger: '#D32F2F',       // エラー
  },
  
  // 拡張カラー（必要に応じて）
  extended: {
    borderDark: '#D1D5DB',   // 濃い枠線（特例許可）
    tableHeader: '#F9FAFB',  // テーブルヘッダー背景
    skeleton: '#F3F4F6',     // スケルトン背景
    alertSuccess: '#ECFDF5', // 成功アラート背景
    alertWarning: '#FFFBEB', // 警告アラート背景
    alertDanger: '#FEF2F2',  // エラーアラート背景
  }
} as const

/**
 * タイポグラフィ定義
 * 4段階のフォントスケール
 */
export const TYPOGRAPHY = {
  // フォントサイズ（px）
  fontSize: {
    h1: 24,      // 画面タイトル
    h2: 20,      // セクション
    body: 16,    // 本文/入力ラベル
    caption: 14, // 補足/ヘルプ
    display: 28, // LP用（例外規定）
  },
  
  // フォントウェイト
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // 行間
  lineHeight: {
    heading: 1.3,  // 見出し
    body: 1.6,     // 本文
    caption: 1.5,  // 補足
  },
  
  // Tailwindクラス対応
  classes: {
    h1: 'text-2xl font-semibold leading-tight',      // 24px, 600, 1.3
    h2: 'text-xl font-semibold leading-tight',       // 20px, 600, 1.3
    body: 'text-base font-normal leading-relaxed',    // 16px, 400, 1.6
    caption: 'text-sm font-normal leading-snug',      // 14px, 400, 1.5
    display: 'text-2xl font-semibold leading-tight', // 28px, 600, 1.3
  }
} as const

/**
 * スペーシング定義
 * 8pxグリッドベース
 */
export const SPACING = {
  // 基本値（px）
  base: 8,
  
  // スペーシング値
  values: {
    1: 8,   // アイコン/小要素間
    2: 12,  // ラベルと入力欄間
    3: 16,  // 要素間の基本
    4: 24,  // セクション間の基本
    5: 32,  // 大見出し後
    6: 40,  // ヒーロー/大区切り
  },
  
  // Tailwindクラス対応
  classes: {
    1: 'space-y-2',      // 8px
    2: 'space-y-3',      // 12px
    3: 'space-y-4',      // 16px
    4: 'space-y-6',      // 24px
    5: 'space-y-8',      // 32px
    6: 'space-y-10',     // 40px
  },
  
  // パディング・マージン
  padding: {
    1: 'p-2',      // 8px
    2: 'p-3',      // 12px
    3: 'p-4',      // 16px
    4: 'p-6',      // 24px
    5: 'p-8',      // 32px
    6: 'p-10',     // 40px
  },
  
  margin: {
    1: 'm-2',      // 8px
    2: 'm-3',      // 12px
    3: 'm-4',      // 16px
    4: 'm-6',      // 24px
    5: 'm-8',      // 32px
    6: 'm-10',     // 40px
  }
} as const

/**
 * レイアウト定義
 * グリッドシステムとブレークポイント
 */
export const LAYOUT = {
  // コンテナ
  container: {
    maxWidth: 1120,
    padding: 16,
  },
  
  // グリッド
  grid: {
    columns: 12,
    gutter: 16,
  },
  
  // ブレークポイント（px）
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  
  // 最大幅（文字数）
  maxWidth: {
    content: '72ch', // 72-80字推奨
  }
} as const

/**
 * コーナー・影定義
 */
export const EFFECTS = {
  // 角丸（px）
  radius: {
    sm: 8,   // 入力部品、タグ
    md: 12,  // カード、モーダル
    lg: 16,  // ヒーロー/大型カード
  },
  
  // 影
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,.06)',   // ボタン/小要素
    md: '0 2px 8px rgba(0,0,0,.08)',   // カード
    lg: '0 6px 20px rgba(0,0,0,.12)',  // モーダル
  },
  
  // Tailwindクラス対応
  radiusClasses: {
    sm: 'rounded-lg',    // 8px
    md: 'rounded-xl',    // 12px
    lg: 'rounded-2xl',   // 16px
  },
  
  shadowClasses: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  }
} as const

/**
 * インタラクション定義
 */
export const INTERACTIONS = {
  // トランジション
  transition: {
    duration: {
      fast: 150,
      normal: 200,
      slow: 250,
    },
    easing: 'cubic-bezier(.2,.8,.2,1)',
  },
  
  // フォーカス
  focus: {
    outline: '2px solid rgba(0,91,172,.4)',
    offset: '2px',
  },
  
  // ホバー効果
  hover: {
    opacityChange: 0.08, // 5-8%の明度変化
  }
} as const

/**
 * コンポーネント規格定義
 */
export const COMPONENTS = {
  // ボタン
  button: {
    height: 44,
    padding: {
      horizontal: 16,
      horizontalWithIcon: 12, // アイコン付きの場合
    },
    iconSize: 20,
    radius: 'md', // --radius-md
    shadow: 'sm', // --shadow-sm
  },
  
  // 入力フィールド
  input: {
    height: 44,
    radius: 'sm', // --radius-sm
    border: 1,
    padding: {
      horizontal: 16,
      vertical: 12,
    }
  },
  
  // カード
  card: {
    padding: 24,
    radius: 'md', // --radius-md
    shadow: 'md', // --shadow-md
    spacing: 16,  // カード間隔
  },
  
  // モーダル
  modal: {
    width: 'min(640px, 90vw)',
    radius: 'md', // --radius-md
    shadow: 'lg', // --shadow-lg
    padding: {
      header: 24,
      body: 24,
      footer: 16,
    }
  },
  
  // アラート
  alert: {
    padding: 16,
    radius: 'sm', // --radius-sm
  },
  
  // テーブル
  table: {
    rowHeight: 44,
    headerBackground: '#F9FAFB',
    border: 1,
    hoverOpacity: 0.02,
  }
} as const

/**
 * Z-Index定義
 */
export const Z_INDEX = {
  base: 0,        // 基本要素
  header: 10,     // 固定ヘッダ
  dropdown: 20,   // ドロップダウン等
  modal: 30,      // 最前面
} as const

/**
 * フォーム構造定義
 */
export const FORMS = {
  // 間隔
  spacing: {
    inputGroup: 16,    // 入力要素間
    sectionGroup: 24,  // セクション間
  },
  
  // 必須表示
  required: {
    symbol: '*',
    color: 'danger',
  }
} as const

/**
 * ユーティリティ関数
 */
export const UTILS = {
  // カラー取得
  getColor: (category: keyof typeof COLORS, name: string) => {
    return COLORS[category][name as keyof typeof COLORS[typeof category]]
  },
  
  // スペーシング取得
  getSpacing: (size: keyof typeof SPACING.values) => {
    return SPACING.values[size]
  },
  
  // フォントサイズ取得
  getFontSize: (type: keyof typeof TYPOGRAPHY.fontSize) => {
    return TYPOGRAPHY.fontSize[type]
  }
} as const

/**
 * デフォルト値
 */
export const DEFAULTS = {
  // デフォルトカラー
  color: COLORS.semantic.fg,
  backgroundColor: COLORS.semantic.bg,
  borderColor: COLORS.semantic.border,
  
  // デフォルトスペーシング
  spacing: SPACING.values[3], // 16px
  
  // デフォルトフォント
  fontSize: TYPOGRAPHY.fontSize.body, // 16px
  fontWeight: TYPOGRAPHY.fontWeight.normal, // 400
  lineHeight: TYPOGRAPHY.lineHeight.body, // 1.6
  
  // デフォルト角丸
  radius: EFFECTS.radius.md, // 12px
  
  // デフォルト影
  shadow: EFFECTS.shadow.md, // カード用
} as const
