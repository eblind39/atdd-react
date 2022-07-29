//User function Template for javascript

/**
 * @param {string} str
 * @return {string}
*/

class Solution {
    reverseWord(str){
        let arr = new Array();
      	let len = str.length;
      	for (let i=0; i<len; i++) arr.push(str.slice(i, i+1));
      	str = '';
      	for (let i=0; i<len; i++) str+=arr.pop();
      	return str;
    }
}

let sol = new Solution();
console.log(sol.reverseWord('Amor a Roma'));
console.log(sol.reverseWord('Ernesto'));
console.log(sol.reverseWord('Alvison'));
console.log(sol.reverseWord('Cyrius'));