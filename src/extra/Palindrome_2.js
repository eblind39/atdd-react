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

    let isPal = true, lng = digs.length;
    for(i=0; i<lng; i++) 
        if (digs[i] !== digs[lng - i - 1]) {
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