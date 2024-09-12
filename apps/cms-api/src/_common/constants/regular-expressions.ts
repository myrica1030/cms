export const REGEXP = {
  /** The username only allows alphanumeric characters (0-9, a-z, A-Z), underscore (_), hyphen (-), and space */
  USERNAME: String.raw`^[\w. -]+$`,
  /** The key field only allows alphanumeric characters (0-9, a-z, A-Z), and hyphen (-) */
  KEY: String.raw`^[\dA-Za-z-]+$`,
} as const
