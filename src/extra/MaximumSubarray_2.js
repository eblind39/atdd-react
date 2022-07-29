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
    	for (let i=0; i<nums.length; i++) {
        let t = nums.slice(i, i+len);
        if (t.length === len) {
          let suma = t.reduce((p, c) => p + c, 0);
          if (suma > summax) summax = suma;
        } else break;
      }
		len++;
  } while (len <= nums.length);
  
  return summax;
};

// maxSubArray([5, 4, -1, 7, 8]);
// maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);
maxSubArray([5,4,-1,7,8]);
// maxSubArray([1]);