/*
function isPrime(num) {
  // 素数判定関数
  for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
  if(num % i === 0) return false; 
  return num > 1;
}

function generatePrimeNumbers() {
  const upperLimit = document.getElementById('upperLimit').value;
  let primeNumbers = [];

  for (let i = 2; i <= upperLimit; i++) {
    if (isPrime(i)) {
      primeNumbers.push(i);
    }
  }
}
*/
function generatePrimeNumbers() {
  const upperLimit = parseInt(document.getElementById('upperLimit').value);
  const primes = Array(upperLimit + 1).fill(true);
  primes[0] = primes[1] = false;

  for (let p = 2; p * p <= upperLimit; p++) {
    if (primes[p]) {
      for (let i = p * p; i <= upperLimit; i += p) {
        primes[i] = false;
      }
    }
  }

  const primeNumbers = [];
  for (let i = 2; i <= upperLimit; i++) {
    if (primes[i]) {
      primeNumbers.push(i);
    }
  }
  // CSV形式に変換
  const csvContent = primeNumbers.join(`\n`);
  // ダウンロードリンクの作成
  const downloadLink = document.createElement('a');
  downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
  downloadLink.download='primeNumbers.csv'
  downloadLink.click();
}
