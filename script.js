let contdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = (seconds) => {
  //Clear any existing timer
  clearInterval(contdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  //testing if time entered is valid
  const endTestTime = new Date(then);
  if (endTestTime == 'Invalid Date') {
    timerDisplay.innerHTML = 'Please enter a valid time in minutes';
    timerDisplay.classList.add('small-font');
    endTime.textContent = '';
  } else {
    timerDisplay.classList.remove('small-font');
    displayTimeLeft(seconds);
    displayEndTime(then);

    contdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      //Check if we should stop it
      if (secondsLeft < 0) {
        clearInterval(contdown);
        return;
      }
      //display it
      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  displayTimeLeft(seconds);
  displayEndTime(then);

  contdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //Check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(contdown);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log(seconds);
  if (seconds == '0') {
    timerDisplay.innerHTML = "<p>It's time to take a break</p>";
    endTime.innerHTML = '<p display: none></p>';
  }
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const adjustedMinutes = minutes === 0 ? '00' : minutes < 10 ? '0' + minutes : minutes;
  endTime.textContent = `Be back at ${adjustedHour}:${adjustedMinutes}`;
};

const startTimer = () => {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
};

buttons.forEach((button) => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const mins = parseInt(this.minutes.value, 10);
  timer(mins * 60);
  this.reset();
});
