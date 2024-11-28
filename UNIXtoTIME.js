function unixToUtc(unixTime) {
  if (isNaN(unixTime) || unixTime < 0) {
    return "Invalid Unix timestamp";
  }
  const date = new Date(unixTime * 1000);
  return date.toISOString();
}

document.getElementById("Unix_form").addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    const unixTime = document.getElementById("Unix_form").value;
    const utcTime = unixToUtc(unixTime);
    if (utcTime === "Invalid Unix timestamp") {
      alert(utcTime);
    }else{
      document.getElementById("UTC_time").innerHTML = utcTime;
    }
   }
});
