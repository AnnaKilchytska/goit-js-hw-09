const formEl = document.querySelector('.form');
let position = 1;

formEl.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = getFormData(e);

  for (position = 0; position < amount; position++) {
    const promiseComputedDelay = delay + step * position;
    console.log(promiseComputedDelay);
    createPromise(position, promiseComputedDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function getFormData(e) {
  const delay = Number(e.target[0].value);
  const step = Number(e.target[1].value);
  const amount = Number(e.target[2].value);

  console.log(delay, step, amount);

  return { delay, step, amount };
}
