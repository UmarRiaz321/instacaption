const ADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true'

export const featureFlags = {
  ads: ADS_ENABLED,
} as const

