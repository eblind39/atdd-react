/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let strRes = s.replace(/IV/gi, '+4')
				.replace(/IX/gi, '+9')
				.replace(/XL/gi, '+40')
				.replace(/XC/gi, '+90')
				.replace(/CD/gi, '+400')
				.replace(/CM/gi, '+900')
				.replace(/I/gi, '+1')
				.replace(/V/gi, '+5')
				.replace(/X/gi, '+10')
				.replace(/L/gi, '+50')
				.replace(/C/gi, '+100')
				.replace(/D/gi, '+500')
				.replace(/M/gi, '+1000');
    
    return parseInt(eval(strRes));
};

console.log(romanToInt('III'));		// 3
console.log(romanToInt('LVIII'));	// 58
console.log(romanToInt('MCMXCIV'));	// 1994