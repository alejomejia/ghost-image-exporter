function createErrorFactory(name: string) {
  return class CustomError extends Error {
    data: Record<string, unknown>

    constructor(message: string, data: Record<string, unknown>) {
      super(message)
      this.name = name
      this.data = data
      this.stack = ''
    }
  }
}

export const EnvironmentVariablesError = createErrorFactory('EnvironmentVariablesError')

// export const ValidationError = createErrorFactory('ValidationError')
// export const EmailError = createErrorFactory('EmailError')
// export const ParseError = createErrorFactory('ParseError')
// export const BrowserError = createErrorFactory('BrowserError')
