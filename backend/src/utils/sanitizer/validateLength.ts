const countWord = (input: string) => {
  return input
    .split(/\s+/)
    .filter(w => w !== "")
    .length;
}

export const validateLength = (
  input: string,
  MIN_LEN: number,
  MAX_LEN: number
) => {
  if (input.length < MIN_LEN) {
    return {
      passed: false,
      code: "TOO_SHORT",
      message: "Give little more detail."
    }
  }

  if (input.length > MAX_LEN) {
    return {
      passed: false,
      code: "TOO_LONG",
      message: "Input exceeds the allowed length."
    }
  }

  return { passed: true };
}

export const validateWordCount = (
  input: string,
  MIN_COUNT: number,
  MAX_COUNT: number
) => {
  if (countWord(input) < MIN_COUNT) {
    return {
      passed: false,
      code: "MIN_WORD_COUNT",
      message: "Describe your project in a little more detail."
    }
  }

  if (countWord(input) > MAX_COUNT) {
    return {
      passed: false,
      code: "MAX_WORD_COUNT",
      message: "Project description exceeds the allowed word count."
    }
  }

  return { passed: true };
}