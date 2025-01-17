function open_csv() {
  const parameter1 = document.getElementById("parameter1").value;
  const parameter2 = document.getElementById("parameter2").value;
  if((!Number.isInteger(Number(parameter1))||!Number.isInteger(Number(parameter2)))||(parameter1<1||parameter2<1)){
    alert("Please set the parameters to natural number!")
    return;
  }

  let csvContent = "a,b,c\n";

  for (let b = 1; b <= parameter1; b++) {
    for (let a = b; a <= parameter2; a++) {
      const aSquared = a * a;
      const cSquared = aSquared + b * b;
      if (Number.isInteger(Math.sqrt(cSquared))) {
        const c = Math.sqrt(cSquared);
        csvContent += `${a},${b},${c}\n`;
      }
    }
  }

  // Blobを作成し、ダウンロードリンクを作成
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pythagorean_numbers.csv';
  link.click();
}
