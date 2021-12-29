import { validatePassword, validateUsername } from './utils.js'

// validatePassword()

// validateUsername()



const expect = (expression) => {

  return {
    toBe: (expectation) => {
      let expAlias = expression;
      if (Array.isArray(expression)) {
        expAlias = 'invalid'
      }

      let result = expAlias === expectation; 
      if (result) {
        console.log('passed');
        return;
      } else {
        console.log(`FAILED!  
          expected: ${expectation} 
          but got: ${JSON.stringify(expression)}`)
        return;
      }
    }
  }
}
// expect(validateUsername('aaaaaaaa')).toBe('valid')
// expect(validateUsername('12345678')).toBe('invalid')
// expect(validateUsername('00000000')).toBe('invalid')
// expect(validateUsername('abcd1234%')).toBe('invalid')
// expect(validateUsername('5 ablks#fcs')).toBe('invalid')
// expect(validateUsername('lejasldkjfkdewedrwwe')).toBe('valid')
// expect(validateUsername('')).toBe('invalid')

// expect(validatePassword('')).toBe('invalid')
// expect(validatePassword('abcdefgh')).toBe('valid')
// expect(validatePassword('12345$56')).toBe('invalid')
// expect(validatePassword('mis4mancy!')).toBe('valid')
// expect(validatePassword('MMis4mannncy!')).toBe('invalid')
// expect(validatePassword('12345!a!a!a!')).toBe('valid')
// expect(validatePassword('')).toBe()
