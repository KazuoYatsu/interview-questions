/**
 * S and T are strings composed of lowercase letters. In S, no letter occurs more than once.

S was sorted in some custom order previously. We want to permute the characters of T so that they match the order that S was sorted. More specifically, if x occurs before y in S, then x should occur before y in the returned string.

Return any permutation of T (as a string) that satisfies this property.

Example :
Input: 
S = "cba"
T = "abcd"
Output: "cbad"
Explanation: 
"a", "b", "c" appear in S, so the order of "a", "b", "c" should be "c", "b", and "a". 
Since "d" does not appear in S, it can be at any position in T. "dcba", "cdba", "cbda" are also valid outputs.
 

Note:

S has length at most 26, and no character is repeated in S.
T has length at most 200.
S and T consist of lowercase letters only.
 */

/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
var customSortString = function (S, T) {
  const mapped = [];
  const rest = [];

  for (let c of T) {
    if (!S.includes(c)) {
      rest.push(c);
    } else {
      mapped.push(c);
    }
  }

  const orderMap = {};

  for (let i = 0; i < S.length; i++) {
    orderMap[S[i]] = i;
  }

  const sortedMapped = quicksort(mapped, 0, mapped.length - 1, orderMap);
  const sortedRest = quicksort(rest, 0, rest.length - 1);

  return getStringFromArray(sortedMapped.concat(sortedRest));
};

function quicksort(array, leftIndex, rightIndex, orderMap) {
  if (leftIndex >= rightIndex) {
    return array;
  }

  const pivot = orderMap ? orderMap[array[rightIndex]] : array[rightIndex];
  let swapPosition = leftIndex;

  for (let i = leftIndex; i <= rightIndex; i++) {
    const value = orderMap ? orderMap[array[i]] : array[i];
    if (value <= pivot) {
      let aux = array[i];
      array[i] = array[swapPosition];
      array[swapPosition] = aux;
      swapPosition++;
    }
  }

  quicksort(array, leftIndex, swapPosition - 2, orderMap);
  quicksort(array, swapPosition, rightIndex, orderMap);

  return array;
}

function getStringFromArray(array) {
  let str = '';
  array.forEach(value => str += value);
  return str;
}
