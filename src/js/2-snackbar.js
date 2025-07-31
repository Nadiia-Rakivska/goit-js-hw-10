import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", e =>{
  e.preventDefault();
   const delay =e.currentTarget.elements.delay.value;
   const state = e.currentTarget.elements.state.value;
   if (delay&&state&&delay>=0) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state==="fulfilled") {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise in ${delay}ms`);
        }
      }, delay);
      form.reset();
});
promise
  .then(value => {
    iziToast.success({
      message: value,
      icon:false,
      position: 'topRight',    
});
  }) 
  .catch(reject => {
    iziToast.error({
      message: reject,
      position: 'topRight',
      icon:false,
    });
  }) 
   }
  
})


