//("0"+num).slice(-2) なんかスライスでパディングできるっぽいね
function showTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = ("0"+(now.getMonth()+1)).slice(-2);
  var date = ("0"+now.getDate()).slice(-2);
  var hours = ("0"+now.getHours()).slice(-2);
  var minutes = ("0"+now.getMinutes()).slice(-2);
  var seconds = ("0"+now.getSeconds()).slice(-2);
  var after_decimal = ((Date.now()%1000/1000).toFixed(3)).slice(-4)
  var text = year+"/"+month+"/"+date+" "+ hours + ":" + minutes + ":" + seconds+after_decimal;
  document.getElementById("Local_time").innerHTML = text;
}
setInterval(showTime, 23);
