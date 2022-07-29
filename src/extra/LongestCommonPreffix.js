/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  	let il = 1;
  	let prf = '';
  	let bOk = true;
  	let mySet = new Set(strs);
	  strs = Array.from(mySet);
  
  	if (strs.length === 1) return strs[0];
  	do {
      let prefxs = strs.filter(x => x.slice(0, il) === strs[0].slice(0, il));
      if (prefxs.length !== strs.length) bOk = false; 
      else prf = strs[0].slice(0, il);
      il++;
  	} while(bOk);
  
  	return prf;
};

console.log(longestCommonPrefix(["aaa","aa","aaa"]));
console.log(longestCommonPrefix(["a"]));
console.log(longestCommonPrefix(["flower","flow","flight"]));
console.log(longestCommonPrefix(["dog","racecar","car"]));
console.log(longestCommonPrefix(["abca","abc"]));