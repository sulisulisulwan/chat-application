const validateUsername = (username) => {

  const invalidReasons  = [];
  if (username.length < 8 || username.length > 20) {
    invalidReasons.push('have between 8 and 20 characters')
  }

  let letters = 0;
  let containsSpaces = false
  let invalidChar = false;
  const regex = /[a-zA-Z]/

  for (let i = 0; i < username.length; i += 1) {
    const char = username[i]
    if (regex.test(char)) {
      letters += 1;
      continue;
    }
    if (parseInt(char) >= 0) {
      continue;
    }
    if (char === ' ')  {
      containsSpaces = true;
      continue;
    }
    if (char === '.' || char === '@' || char === '_' || char === '-') {
      continue;
    }
    invalidChar = true;
  }

  if (!letters) {
    invalidReasons.push('contain at least one letter')
  }
  if (containsSpaces) {
    invalidReasons.push('NOT contain any spaces')
  }
  if (invalidChar) {
    invalidReasons.push('only contain letters, numbers, and special characters @.-_')
  }
  return invalidReasons.length ? invalidReasons : 'valid';

}

const validatePassword = (password) => {
  let invalidReasons = [];
  if (password.length < 8 || password.length > 15) {
    invalidReasons.push('have between 8 to 15 characters.')
  }
  let lowerCase = 0;
  let upperCase = 0;
  let letters = 0;
  let numbers = 0;
  let specialChars = 0;
  let threeInRow =  false;
  let inRowCount = [0, null];
  const specialCharsRegex = /^[^a-zA-Z]+$/;

  for (let i = 0; i < password.length; i += 1) {
    let char = password[i]

    if (char === ' ') {
      invalidReasons.push('have no spaces.');
    }

    if (isNaN(Number(char))) {
      if (specialCharsRegex.test(char)) {
        specialChars += 1
      } else {
        letters += 1;
        char === char.toUpperCase() ? upperCase += 1 : lowerCase += 1;
      }
    } else {
      numbers += 1;
    }

    if (char === inRowCount[1]) {
      inRowCount[0] += 1
    } else {
      inRowCount[0] = 1
      inRowCount[1] = char;
    } 
    if (inRowCount[0] === 3) {
      threeInRow = true;
    }
  }
  if (threeInRow) {
    invalidReasons.push('NOT have 3 of the same characters in a row')
  }

  if (letters < 3) {
    invalidReasons.push('have at least 3 letters.')
  }
  let atLeastThree = 0;
  const neededAtLeastThreeOf = [];
  lowerCase ? atLeastThree += 1 : neededAtLeastThreeOf.push('have a lower case letter')
  upperCase ? atLeastThree += 1 : neededAtLeastThreeOf.push('have an upper case letter')
  numbers ? atLeastThree += 1 : neededAtLeastThreeOf.push('have a number')
  specialChars ? atLeastThree += 1 : neededAtLeastThreeOf.push('have a special character')

  if (!invalidReasons.length && atLeastThree >= 3) {
    return 'valid';
  }

  if (atLeastThree < 3) {
    invalidReasons.push('have at least three of the following: ')
    invalidReasons = invalidReasons.concat(neededAtLeastThreeOf);
  }
  return invalidReasons;
}

export {
  validateUsername, validatePassword
}