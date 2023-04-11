  const delayEl = document.querySelector('input[name="delay"]');
  const stepEl = document.querySelector('input[name="step"]');
  const amountEl = document.querySelector('input[name="amount"]');
  const form = document.querySelector('form');
  console.log(form);

  form.addEventListener('submit', onSubmit);

  function onSubmit(e) {
    e.preventDefault();
    const amount = amountEl.value;
    let delay = Number(delayEl.value);
    const step = Number(stepEl.value);
    for (let i = 0; i < amount; i++) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += step;
    }
  }

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
