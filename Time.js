//("0"+num).slice(-2)
function showTime(){
  var now = new Date();
  var year = now.getFullYear();
  var month = ("0"+(now.getMonth()+1)).slice(-2);
  var date = ("0"+now.getDate()).slice(-2);
  var hours = ("0"+now.getHours()).slice(-2);
  var minutes = ("0"+now.getMinutes()).slice(-2);
  var seconds = ("0"+now.getSeconds()).slice(-2);
  var after_decimal = ((Date.now()%1000/1000).toFixed(3)).slice(-4)
  var text = year+"/"+month+"/"+date+" " + hours + ":" + minutes + ":" + seconds+after_decimal;
  document.getElementById("Local_time").innerHTML = "Local_time: " + text;
}

function UTCTime(){
  var UTC_now = new Date();
  var UTC_year = UTC_now.getUTCFullYear();
  var UTC_month = ("0"+(UTC_now.getUTCMonth()+1)).slice(-2);
  var UTC_date = ("0"+UTC_now.getUTCDate()).slice(-2);
  var UTC_hours = ("0"+UTC_now.getUTCHours()).slice(-2);
  var UTC_minutes = ("0"+UTC_now.getUTCMinutes()).slice(-2);
  var UTC_seconds = ("0"+UTC_now.getUTCSeconds()).slice(-2);
  var UTC_after_decimal = ((Date.now()%1000/1000).toFixed(3)).slice(-4)
  var UTC_text = UTC_year+"/"+UTC_month+"/"+UTC_date+" " + UTC_hours + ":" + UTC_minutes + ":" + UTC_seconds+UTC_after_decimal;
  document.getElementById("UTC_time").innerHTML = "UTC_time: " + UTC_text;
}

function Unixtime_script(){
  var unixTime = Date.now() / 1000;
  document.getElementById("Unixtime").innerHTML = "Unixtime: " + unixTime.toFixed(3);
  document.getElementById("Unixbinary").innerHTML = "Unixbinary: " + (unixTime-(unixTime%1)).toString(2);
}

setInterval(showTime, 17);
setInterval(UTCTime, 13);
setInterval(Unixtime_script, 13);
