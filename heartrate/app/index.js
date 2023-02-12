import { HeartRateSensor } from "heart-rate";
import document from "document";

let hrm = document.getElementById("hrm");
function setHeartRate(val) {
    console.log("心拍数：" + val);
    hrm.text = val;
    if (val > 100) {
        hrm.style.fill = "red";
    } else if (val < 80) {
        hrm.style.fill = "blue";
    } else {
        hrm.style.fill = "black";
    }
    
}

//心拍数
let hr = new HeartRateSensor();
hr.onreading = function () {
    let hrVal = hr.heartRate;
    setHeartRate(hrVal);
    console.log("心拍数：" + hrVal);
}

hr.start();