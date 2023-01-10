import document from "document";
import clock from "clock";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";


let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");

let day = document.getElementById("day");
let date = document.getElementById("date");
let steps = document.getElementById("steps");
let hrm = document.getElementById("hrm");
let btry = document.getElementById("battery")

let page = document.getElementById("page");
let info = document.getElementById("Informations");

// デフォルトで情報は隠す
info.style.display = "none";

// 画面切り替え関数
function toggle(ele){
  ele.style.display = (ele.style.display === "inline") ? "none" : "inline";                 
}

// 画面タップで情報を隠す隠さないの切り替え
page.onclick = function(){
  toggle(info);
}

//時計の針設定
function hoursToAngle(hours, minutes){
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360/ 12 / 60) * minutes;
  return hourAngle + minAngle;
}

function minutesToAngle(minutes){
  return (360 / 60) * minutes;
}

function secondsToAngle(seconds){
  return (360 / 60) * seconds;
}

//日付のテキストセット
function setDate(val) {
  date.text = val;
}

//曜日のテキストセット
//getDayにより0~6で曜日を取得できるためそれぞれを文字に対応
function setDay(val) {
  switch(val){
    case 0:
      day.text="Sun";
      break;
    case 1: 
      day.text="Mon";
      break;
    case 2:
      day.text="Tue";
      break;
    case 3:
      day.text="Wed";
      break;
    case 4:
      day.text="Thu";
      break;
    case 5:
      day.text="Fri";
      break;
    case 6:
      day.text="Sat";
      break;
  }
}

//バッテリーのテキストセット
function setBattery(val){
  btry.text = val;
}

//歩数のテキストセット
function setSteps(val){
  steps.text = val;
}

//心拍数のテキストセット
function setHeartRate(val){
  hrm.text = val;
}

//時計の更新頻度を毎秒に設定
clock.granularity = "seconds";

//秒経過ごとに情報更新
clock.ontick = evt =>{
  let d = evt.date;
  let hours = d.getHours() % 12;
  let mins = d.getMinutes();
  let secs = d.getSeconds();

  //時計針の更新
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);

  //日付
  setDate(d.getDate());
  //曜日
  setDay(d.getDay());
  //バッテリ
  setBattery(Math.floor(battery.chargeLevel))
  //歩数
  setSteps(today.local.steps);

  //心拍数
  var hr = new HeartRateSensor();
  hr.onreading = function() {
    setHeartRate(hr.heartRate);
    //Stop monitoring the sensor
    hr.stop();
    }
  //Begin monitoring the sensor
  hr.start();
}