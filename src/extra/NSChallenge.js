/*
<!--  What is a binary gap?
 A binary gap is any sequence of consecutive zeros that is surrounded by ones at both ends.
 For example:
 
 Number 9 has binary representation 1001 and contains a binary gap of length 2.
 
 The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3.
 
 The number 20 has binary representation 10100 and contains one binary gap of length 1.
 
 The number 15 has binary representation 1111 and has no binary gaps. Return 0
 
 The number 32 has binary representation 100000 and has no binary gaps. Return 0
 
 Challenge:
 
 Create a function that returns the length of the longest binary gap of a positive integer.
 
 If there's no binary gap the function should return 0
 No need of edge cases validation (negatives, decimal, etc) assume you will always receive a positive integer -->
*/
// '(())()('
const binaryGap = (number) => {
	let binary = decimal2binary(number)
  let tmpArr = binary.split('')
  let lenBin = tmpArr.length
  let bolLetCountZeros = false
  let tmpTotal = 0
  let totalGap = 0
  
  for (let i=0; i<lenBin; i++) {
  	if (tmpArr[i] === '1' && !bolLetCountZeros) {
      bolLetCountZeros = true
    }
    else if (tmpArr[i] === '1' && bolLetCountZeros) {
    	totalGap += tmpTotal;
      tmpTotal = 0;
      bolLetCountZeros = false;
    }
    else if (tmpArr[i] === '0' && bolLetCountZeros) {
    	tmpTotal++
    }
  }
  
  return totalGap
}

const decimal2binary = (number) => {
	return number.toString(2);
}

console.log(binaryGap(9))
console.log(binaryGap(529))
console.log(binaryGap(20))
console.log(binaryGap(15))
console.log(binaryGap(32))