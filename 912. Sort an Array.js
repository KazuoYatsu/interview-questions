/**
 * Given an array of integers nums, sort the array in ascending order.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  quicksort(nums, 0, nums.length - 1);
  return nums;
};

function quicksort(nums, leftIndex, rightIndex) {
  if (leftIndex >= rightIndex) {
    return;
  }

  const pivot = nums[rightIndex];
  let swapPosition = leftIndex;

  for (let i = leftIndex; i <= rightIndex; i++) {
    if (nums[i] <= pivot) {
      let aux = nums[i];
      nums[i] = nums[swapPosition];
      nums[swapPosition] = aux;
      swapPosition++;
    }
  }

  quicksort(nums, leftIndex, swapPosition - 2);
  quicksort(nums, swapPosition, rightIndex);
}
