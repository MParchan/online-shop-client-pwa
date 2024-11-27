export const zipcodePatterns: Record<string, RegExp> = {
    Australia: /^\d{4}$/,
    Canada: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    France: /^\d{5}$/,
    Germany: /^\d{5}$/,
    Italy: /^\d{5}$/,
    Poland: /^\d{2}-\d{3}$/,
    "United States": /^\d{5}(-\d{4})?$/
};
