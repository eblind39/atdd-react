/**
 * @param {number[]} nums
 * @return {number}
 * using Kadane’s Algorithm
 */
var maxSubArray = function(nums) {
  let len = nums.length;
  if (len === 1) return nums[0];
  let negs = nums.filter(x => x < 0);
  if (len === negs.length) return Math.max(...nums);
  let maxsum = 0;
  let reslt = -Number.MIN_VALUE;
  for (let i = 0; i < len; i++) {
    maxsum = Math.max(nums[i], nums[i] + maxsum);
    if (maxsum > reslt) reslt = maxsum;
  }
  
  return reslt;
};

maxSubArray([3,-1]);
maxSubArray([-2,-1]);
maxSubArray([-1]);
maxSubArray([5,4,-1,7,8]);
maxSubArray([5, 4, -1, 7, 8]);
maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);
maxSubArray([5,4,-1,7,8,-2,1,-3,4,-1,2,1,-5,4]);
 maxSubArray([1]);