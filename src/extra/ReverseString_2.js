//User function Template for javascript

/**
 * @param {string} str
 * @return {string}
*/

class Solution {
    reverseWord(str){
        let arr = new Array();
      	for (let i in str) arr.unshift(str.slice(+i, +i+1));
      	return arr.join('');
    }
}

let sol = new Solution();
console.log(sol.reverseWord('Amor a Roma'));
console.log(sol.reverseWord('Ernesto'));
console.log(sol.reverseWord('Alvison'));
console.log(sol.reverseWord('Cyrius'));