export const spacingTokens = {
    xs: 0.5,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
} as const;

export type SpacingToken = keyof typeof spacingTokens;
