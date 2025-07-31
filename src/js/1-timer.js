import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  dateTimeElem : document.querySelector("#datetime-picker"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
} 
let userSelectedDate="";
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
  },
};
const btnElem = document.querySelector("[data-start]");
btnElem.disabled = true;
let result =0;
const fp = flatpickr(refs.dateTimeElem, options);
refs.dateTimeElem.addEventListener("input", e=>{
  const time =fp.selectedDates[0].getTime()
  console.log();
  const timeNow = Date.now();
  console.log(timeNow);
  result = time - timeNow;
  console.log(result);
  if (result>0) {
    btnElem.disabled = false;
  }
  else{
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  }
 
})  
 btnElem.addEventListener("click", e=>{
    btnElem.disabled = true;
    refs.dateTimeElem.disabled = true;
    const intervalId = setInterval(()=>{
      const convertDateTime= convertMs(result);
   updateTimerDisplay(convertDateTime);
      if (result<1000) {
        clearInterval(intervalId);
        refs.dateTimeElem.disabled = false;
      }
      result-=1000;
    },1000)
  })
function updateTimerDisplay({days, hours,minutes, seconds}) {
     refs.days.textContent = String(days).padStart(2, "0");
      refs.minutes.textContent =String(minutes).padStart(2, "0");
      refs.hours.textContent =String(hours).padStart(2, "0");
      refs.seconds.textContent =String(seconds).padStart(2, "0");
}  
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}




