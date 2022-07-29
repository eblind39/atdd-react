//	input: nums = [-2,1,-3,4,-1,2,1,-5,4]
//	Output: 6
//	Explanation: [4,-1,2,1] has the largest sum = 6.

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
	let len = 1;
  let tmp = [];
  let summax = -Number.MAX_VALUE;
  do {
    tmp = nums.map((x, i) => nums.slice(i, i+len)).filter(x => x.length == len);
    let tmpsum = tmp.map(x => x.reduce((p, c) => p + c, 0));
    let tmpsort = tmpsum.sort((a, b) => b - a);
    if (tmpsort[0] > summax) summax = tmpsort[0];
  	len++;
  } while (len <= nums.length);
  
  return summax;
};

maxSubArray([5, 4, -1, 7, 8]);
maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);
maxSubArray([5,4,-1,7,8]);
maxSubArray([1]);