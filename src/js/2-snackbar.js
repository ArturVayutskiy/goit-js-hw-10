import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const delay = parseInt(this.elements.delay.value);
  const state = this.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise.then((delay) => {
    iziToast.success({
      title: 'OK!',
      titleColor: 'white',
      backgroundColor: '#59a10d', 
      message: `Fulfilled promise in ${delay}ms`,
      messageColor: 'white',
      position: 'topCenter',
    });
  }).catch((delay) => {
    iziToast.error({
      title: 'Error!',
      message: `Rejected promise in ${delay}ms`,
      position: 'topCenter',
    });
  });
});

