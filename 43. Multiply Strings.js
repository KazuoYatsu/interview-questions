/**
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
Note:

The length of both num1 and num2 is < 110.
Both num1 and num2 contain only digits 0-9.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
You must not use any built-in BigInteger library or convert the inputs to integer directly.
 */

//////////////////////////////////////////////////
// First version -- doesn't work with big numbers
//////////////////////////////////////////////////

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// var multiply = function(num1, num2) {
//     const result = convertToNumber(num1) * convertToNumber(num2);
//     return convertToString(result);
// };

// function convertToNumber(str) {
//     let number = 0;
//     let multiplier = 1;

//     for(let i = str.length - 1; i >= 0; i--) {
//         number += (str[i].charCodeAt() - 48) * multiplier;
//         multiplier *= 10;
//     }

//     return number;
// }

// function convertToString(num) {
//     let string = '';
//     let number = num;
//     let length = 0;

//     while(number >= 1) {
//         length++;
//         number /= 10;
//     }

//     let divisor = Math.pow(10, length - 1);

//     for(let i = 0; i < length; i++) {
//         const value = (num - num % divisor) / divisor;
//         string += String.fromCharCode(value + 48);
//         num -= divisor * value;
//         divisor /= 10;
//     }

//     return string || '0';
// }

// second version - handmade like multiplication - do works with big numbers
var multiply = function (num1, num2) {
  const intermediateNumbers = [];

  for (let i = num1.length - 1; i >= 0; i--) {
    const multiplier1 = num1.charCodeAt(i) - 48;
    for (let j = num2.length - 1; j >= 0; j--) {
      const multiplier2 = num2.charCodeAt(j) - 48;

      const position = num1.length - 1 - i + num2.length - 1 - j;
      const oldValue = intermediateNumbers[position] || 0;

      intermediateNumbers[position] = multiplier1 * multiplier2 + oldValue;
    }
  }

  const numbers = [];
  let overflow = 0;

  intermediateNumbers.forEach(intermediateNumber => {
    const sum = intermediateNumber + overflow;
    numbers.push(sum % 10);
    overflow = Math.floor(sum / 10);
  });

  if (overflow !== 0) {
    numbers.push(overflow);
  }

  let string = '';
  for (let i = numbers.length - 1; i >= 0; i--) {
    if (string || numbers[i]) {
      string += String.fromCharCode(numbers[i] + 48);
    }
  }

  return string || '0';
};
