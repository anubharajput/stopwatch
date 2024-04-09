const start = document.getElementById("start-btn");
const stop = document.getElementById("stop-btn");
const reset = document.getElementById("reset-btn");
const lap = document.getElementById("lap-btn");
const lapContainerBG = document.querySelector(".lap-content-container");
const displayTime = document.querySelector(".output");
const lapContainer = document.querySelector(".lap-container");
const lapHeadings = document.querySelectorAll(".heading");
let day=document.getElementById("dy");
let hr = document.getElementById("hr");
let mint = document.getElementById("min");
let sec = document.getElementById("sec");
let mili = document.getElementById("count");
start.style.display = "block";
stop.style.display = "none";
reset.style.display = "none";
lap.style.display = "none";

let startTime;
let elapsedTime = 0;
let timeInterval;
let lapCounter = 0;
let lapStartTime = 0;
//handle stopwatch start function
start.addEventListener("click", () => {
    start.style.display = "none";
    stop.style.display = "block";
    reset.style.display = "block";
    lap.style.display = "block";
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        const time = timeFormate(elapsedTime);
        console.log(time);
        const { daycount, hours, minutes, seconds, milliseconds } = time;
        day.innerHTML=digitHandler(daycount);
        hr.innerHTML = digitHandler(hours);
        mint.innerHTML = digitHandler(minutes);
        sec.innerHTML = digitHandler(seconds);
        mili.innerHTML = digitHandler(milliseconds);
    }, 10);
    lapStartTime = startTime;
});
//handle stopwatch pause function
stop.addEventListener("click", () => {
    clearInterval(timeInterval);
    start.style.display = "block";
    stop.style.display = "none";
    reset.style.display = "block";
    lap.style.display = "none";
});
//handle stopwatch reset function
reset.addEventListener("click", () => {
    clearInterval(timeInterval);
    day.innerHTML="00";
    hr.innerHTML = "00";
    mint.innerHTML = "00";
    sec.innerHTML = "00";
    mili.innerHTML = "00";
    elapsedTime = 0;
    totalLapElpasedTime = 0;
    start.style.display = "block";
    stop.style.display = "none";
    reset.style.display = "none";
    lap.style.display = "none";
    lapCounter = 0;
    lapContainerBG.style.display = "none";
    lapHeadings[0].style.display = "none";
    lapHeadings[1].style.display = "none";
    lapHeadings[2].style.display = "none";
    lapContainer.innerHTML = "";
});
//to handle stopwatch lap function
lap.addEventListener("click", () => {
    lapCounter++;
    let { lapTime, totalLapTime } = getLapTime();
    if (lapCounter > 0) {
        lapContainerBG.style.display = "flex";
        lapHeadings[0].style.display = "block";
        lapHeadings[1].style.display = "block";
        lapHeadings[2].style.display = "block";
    }
    const lapDiv = document.createElement("div");
    lapDiv.classList.add("lap");
    const lapCounterDiv = document.createElement("div");
    lapCounterDiv.classList.add("lap-number");
    const lapTimeDiv = document.createElement("div");
    lapTimeDiv.classList.add("lap-time");
    const lapTotelTimeDiv = document.createElement("div");
    lapTotelTimeDiv.classList.add("total-lap-time");
    lapCounterDiv.innerHTML = `Lap ${digitHandler(lapCounter)}`;
    displayFormattedTime(lapTimeDiv, lapTime);
    displayFormattedTime(lapTotelTimeDiv, totalLapTime);
    lapContainer.appendChild(lapDiv);
    lapDiv.appendChild(lapCounterDiv);
    lapDiv.appendChild(lapTimeDiv);
    lapDiv.appendChild(lapTotelTimeDiv);
});
let totalLapElpasedTime = 0;
//to get the lap time and totel lap time
const getLapTime = () => {
    const elapsedLapTime = Date.now() - lapStartTime;
    const lapTime = timeFormate(elapsedLapTime);
    lapStartTime = Date.now();
    totalLapElpasedTime += elapsedLapTime;
    const totalLapTime = timeFormate(totalLapElpasedTime);
    return { lapTime, totalLapTime };
};


//convert the miliseconds into hours, mintues , seconds and miliseconds
const timeFormate = (elapsedTime) => {
    const date = new Date(elapsedTime);
    let daycount=date.getDate()-1;
    let hours = date.getUTCHours();
    let minutes = date.getUTCMonth();
    let seconds = date.getUTCSeconds()
    let milliseconds = Math.floor(date.getMilliseconds() / 10);
    return {daycount, hours, minutes, seconds, milliseconds };
};
//to handle two digit number
const digitHandler = (time) => {
    if (time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
};
//to display lap time formate
const displayFormattedTime = (div, time) => {
    const {daycount, hours, minutes, seconds, milliseconds } = time;
    div.innerHTML = `${digitHandler(daycount    )}:${digitHandler(hours)}:${digitHandler(
        minutes
    )}:${digitHandler(seconds)}:${digitHandler(milliseconds)}`;
};