const digitalTimeElement = document.getElementById('digitalTime');
const hourSelect = document.getElementById('hourSelect');
const minuteSelect = document.getElementById('minuteSelect');
const ampmSelect = document.getElementById('ampmSelect');
const ringtoneSelect = document.getElementById('ringtoneSelect');
const setAlarmBtn = document.getElementById('setAlarmBtn');

const hourHand = document.getElementById('hr');
const minuteHand = document.getElementById('mn');
const secondHand = document.getElementById('sc');

let alarmTime = "";
let isAlarmSet = false;
let ringtone = new Audio(); // Initialize empty ringtone

// Ringtone options
const ringtones = {
  default: "./files/ringtone.mp3",
  ringtone1: "./files/Kola Kalle Ilaa.mp3",
  ringtone2: "./files/Roja Movie-Downringtone.com",
  ringtone3: "./files/ringtone.mp3"
};

// Populate select options
function populateSelects() {
  for (let i = 1; i <= 12; i++) {
    const value = i < 10 ? `0${i}` : i;
    const option = `<option value="${value}">${value}</option>`;
    hourSelect.insertAdjacentHTML("beforeend", option);
  }

  for (let i = 0; i < 60; i++) {
    const value = i < 10 ? `0${i}` : i;
    const option = `<option value="${value}">${value}</option>`;
    minuteSelect.insertAdjacentHTML("beforeend", option);
  }

  const ampmOptions = ['AM', 'PM'];
  ampmOptions.forEach(optionText => {
    const option = `<option value="${optionText}">${optionText}</option>`;
    ampmSelect.insertAdjacentHTML("beforeend", option);
  });
}

// Clock hands movement
const deg = 6;

setInterval(() => {
  const now = new Date();
  const hh = now.getHours() * 30;
  const mm = now.getMinutes() * deg;
  const ss = now.getSeconds() * deg;

  hourHand.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  minuteHand.style.transform = `rotateZ(${mm}deg)`;
  secondHand.style.transform = `rotateZ(${ss}deg)`;
}, 1000);

// Update digital clock every second and check for alarm
setInterval(() => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Format time with leading zeros
  const hourFormatted = hours < 10 ? `0${hours}` : hours;
  const minuteFormatted = minutes < 10 ? `0${minutes}` : minutes;
  const secondFormatted = seconds < 10 ? `0${seconds}` : seconds;

  // Update digital time display
  digitalTimeElement.textContent = `${hourFormatted}:${minuteFormatted}:${secondFormatted} ${ampm}`;

  // Check if it's time for the alarm
  if (alarmTime && alarmTime === `${hourFormatted}:${minuteFormatted} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

// Set or clear the alarm
function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    ringtone.currentTime = 0; // Reset ringtone
    setAlarmBtn.textContent = "Set Alarm";
    isAlarmSet = false;
    return;
  }

  const selectedHour = hourSelect.value;
  const selectedMinute = minuteSelect.value;
  const selectedAmpm = ampmSelect.value;
  const selectedRingtone = ringtoneSelect.value;

  // Validate selected time and ringtone
  if (!selectedHour || !selectedMinute || !selectedAmpm || !selectedRingtone) {
    alert("Please select a valid time and ringtone.");
    return;
  }

  alarmTime = `${selectedHour}:${selectedMinute} ${selectedAmpm}`;
  ringtone.src = ringtones[selectedRingtone]; // Set selected ringtone

  setAlarmBtn.textContent = "Clear Alarm";
  isAlarmSet = true;
}

// Initialize the select options and add event listener for alarm button
populateSelects();
setAlarmBtn.addEventListener('click', setAlarm);
