const timeRunning = document.getElementById("time");
const endTime = document.getElementById("endTime");
const playing = document.getElementById("play");
const pausing = document.getElementById("pause");
const resetting = document.getElementById("reset");


let countdown;


function startTimer(e) {
  e.preventDefault();
  const min = Math.abs(this.minutes.value);
  timer(min * 60);
  this.reset();
  playing.innerHTML = "Playing";
  if (pausing.textContent === "Paused" || reset === true) {
    pausing.innerHTML = "Pause";
    endTime.classList.remove("timeStyle");
  }
}
function play() {
  if (playing) {
    let timeNow = timeRunning.innerHTML;
    let timeLeft = parseInt(timeNow + 0.5);
    timer(timeLeft * 60);
    pausing.innerHTML = "Pause";
  } 
}

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const reminderSeconds = seconds % 60;
  const display = `${minutes}:${
    reminderSeconds < 10 ? "0" : ""
  }${reminderSeconds}`;
  timeRunning.textContent = display;
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minute = end.getMinutes();
  endTime.textContent = `The time will stop by: ${adjustedHour}:${
    minute < 10 ? "0" : ""
  }${minute}`;
}

let paused = false; // is the timer paused?

function pause() {
  if (!paused) {
    pausing.textContent = "Paused";
    endTime.textContent = "the time have been paused";
    clearInterval(countdown); // stop the clock
    playing.innerHTML = "Resume";
  }
}

let reset = false;

function resetTimer() {
  clearInterval(countdown); // clear the timer and so stop the clock
  timeRunning.innerText = `00:00`;
  endTime.classList.add("timeStyle");
  reset = true;
}

playing.addEventListener("click", play);
pausing.addEventListener("click", pause);
resetting.addEventListener("click", resetTimer);
document.customForm.addEventListener("submit", startTimer);