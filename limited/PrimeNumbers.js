function generatePrimeNumbers() {
  // 区切り文字を設定
  const delimiter_select = document.getElementById("delimiter").value;
  let delimiter_txt;
  if (delimiter_select === "enter") {
    delimiter_txt = "\n";
  } else {
    delimiter_txt = ",";
  }

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
  const csvContent = primeNumbers.join(delimiter_txt);

  // ダウンロードリンクの作成
  const downloadLink = document.createElement('a');
  downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
  downloadLink.download = 'primeNumbers.csv';
  downloadLink.click();
}
