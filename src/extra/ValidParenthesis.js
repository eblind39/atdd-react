/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let arr1 = s.split('');
    let arr2 = [], clss = '';
    let bOk = undefined, iCtl = 0;
    if (s.length % 2 !== 0) return false;
    for (let i=0; i<arr1.length; i++) {
        if (['(','{','['].includes(arr1[i])) { arr2.push(arr1[i]); iCtl++; }
        if ([')','}',']'].includes(arr1[i])) {
            clss = arr2.pop();
            switch(arr1[i]) {
                case ')':
                    bOk = (clss === '(');
                    iCtl--;
                    break;
                case '}':
                    bOk = (clss === '{');
                    iCtl--;
                    break;
                case ']':
                    bOk = (clss === '[');
                    iCtl--;
                    break;
            }
        }
        // console.log(bOk, clss, arr1[i]);
        if (bOk===false) break;
    }
    return (typeof bOk === 'undefined' || iCtl !== 0 ? false : bOk);
};

console.log(isValid('['));
console.log(isValid('(('));
console.log(isValid('[[[]'));
console.log(isValid('()'));
console.log(isValid('()[]{}'));
console.log(isValid('(]'));
console.log(isValid('({[()]}[])'));