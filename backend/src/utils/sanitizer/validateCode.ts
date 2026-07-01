// flag markdown, gibbrish texts, symbols and codes

const regex = {
  md: /^#{1,6}\s/m,
  repeated: /(.)\1{9,}/,
  html: /<\/?[a-z][\s\S]*>/i,
  symbol: /^[^a-zA-Z0-9\s]{10,}$/,
  sql: /\b(select|insert|update|delete|create|drop|alter)\b/i,
  js: /\b(function|const|let|var|import|export|class)\b/,
  random: /^[a-z]{5,}$/i
};

export const validateCode = (input: string) => {
  for (const [r, val] of Object.entries(regex)) {
    if (input.match(val)) {
      return {
        passed: false,
        code: `regex.${r}`,
        message: "Invalid input format."
      }
    }
  }

  return { passed: true };
}