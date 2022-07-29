/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let res = [];
    let bstop = false;
    for (let i=0; i<nums.length; i++) {
        if (bstop) break
        for (let j=0; j<nums.length; j++) 
            if (i!==j && nums[i] + nums[j] === target) {
                res.push(i);
                res.push(j);
                bstop = true;
                break;
            }
    }
    return res;
};

console.log(twoSum([2,7,11,15], 9));
console.log(twoSum([3,2,4], 6));
console.log(twoSum([3,3], 6));