/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let digs = [];
    let i = 0;
    if (x<0) return false;
    while(x>0) {
        for(i=0; i<9; i++) {
            if ((x - i) % 10 === 0) {
                digs.push(i);
                break;
            }
        }
        x-=i;
        x/=10;
    }

    let revr = [...digs].reverse();
    let isPal = true;
    for(i=0; i<digs.length; i++) 
        if (digs[i] !== revr[i]) {
            isPal = false;
            break;
        }
    
    return isPal;
};

console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));
console.log(isPalindrome(123474321));
console.log(isPalindrome(12344321));