

//User function Template for javascript

/**
 * @param {string} s
 * @returns {number}
 */

class Solution {
    isValid(s){ 
      let regex = new RegExp(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/gi);
      const test = regex.test(s);
      if(!test) return false;
      let arr1 = s.split('.');
      regex = new RegExp(/^0+\d*$/gi);
      let arr2 = arr1.filter((x) => {
        if (x.length===1 && x==='0') return true;
        return x>=0 && x<=255 && !regex.test(x);
      });
      if (arr1.length === 4 && arr1.length === arr2.length) return true;
      return false;
    }
}

let sol = new Solution();
console.log(sol.isValid('00.00.00.00'));
console.log(sol.isValid('0.0.0.0'));
console.log(sol.isValid('0077.00.004.00'));
console.log(sol.isValid('125.12.23.56'));