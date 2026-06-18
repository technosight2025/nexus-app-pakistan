/**
 * Feature Flag Keys — canonical list of all feature flags in the system.
 * Default values are the fallback when no DB override exists.
 */
export const FEATURE_FLAGS = {
  // AI Features
  AI_ASSISTANT: 'ai_assistant',
  AI_QUOTE_GENERATION: 'ai_quote_generation',
  AI_LEAD_SCORING: 'ai_lead_scoring',

  // Modules
  MODULE_DIGITAL_DISPLAYS: 'module_digital_displays',
  MODULE_CLIENT_PORTAL: 'module_client_portal',
  MODULE_PHOTO_SELECTION: 'module_photo_selection',
  MODULE_VIDEO_REVIEW: 'module_video_review',

  // Platform
  BETA_DASHBOARD: 'beta_dashboard',
  ADVANCED_REPORTING: 'advanced_reporting',
  REAL_TIME_NOTIFICATIONS: 'real_time_notifications',
  AUDIT_LOG_UI: 'audit_log_ui',
  MULTI_ORG_SWITCH: 'multi_org_switch',
} as const

export type FeatureFlagKey = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS]

/**
 * Default values for each flag.
 * These are used when no DB override is found and no env variable is set.
 */
export const FLAG_DEFAULTS: Record<FeatureFlagKey, boolean> = {
  [FEATURE_FLAGS.AI_ASSISTANT]: true,
  [FEATURE_FLAGS.AI_QUOTE_GENERATION]: false,
  [FEATURE_FLAGS.AI_LEAD_SCORING]: false,
  [FEATURE_FLAGS.MODULE_DIGITAL_DISPLAYS]: true,
  [FEATURE_FLAGS.MODULE_CLIENT_PORTAL]: true,
  [FEATURE_FLAGS.MODULE_PHOTO_SELECTION]: true,
  [FEATURE_FLAGS.MODULE_VIDEO_REVIEW]: true,
  [FEATURE_FLAGS.BETA_DASHBOARD]: false,
  [FEATURE_FLAGS.ADVANCED_REPORTING]: true,
  [FEATURE_FLAGS.REAL_TIME_NOTIFICATIONS]: true,
  [FEATURE_FLAGS.AUDIT_LOG_UI]: false,
  [FEATURE_FLAGS.MULTI_ORG_SWITCH]: false,
}
