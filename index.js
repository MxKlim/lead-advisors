window.addEventListener('DOMContentLoaded', () => {
  const dedline = '2022-12-31';
  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date()),
    days = Math.floor(total / 1000 / 60 / 60 / 24),
    hours = Math.floor((total / 1000 / 60 / 60) % 60),
    minutes = Math.floor((total / 1000 / 60 ) % 60),
    seconds = Math.floor((total / 1000 ) % 60), 
    daysString = days < 10 ? `0${days}` : days,
    hoursString = hours < 10 ? `0${hours}` : hours,
    minutesString = minutes < 10 ? `0${minutes}` : minutes,
    secondsString = seconds < 10 ? `0${seconds}` : seconds;
    return { 
      total,
      daysString, 
      hoursString, 
      minutesString, 
      secondsString
    };
  }
  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('.days'),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timerInterval = setInterval(upDateClock, 1000);

      function upDateClock() {
        const totalTime = getTimeRemaining(endTime);
        const {
          daysString, 
          hoursString, 
          minutesString, 
          secondsString, 
          total 
        } = totalTime;
        days.innerHTML = daysString;
        hours.innerHTML = hoursString;
        minutes.innerHTML = minutesString;
        seconds.innerHTML = secondsString;
        
        if (total < 0) {
          clearInterval(timerInterval);
        }
      }
  }
  function validateForm(selector) {
    const form = document.querySelector(selector),
    emailInput = form.querySelector('#email'),
    btnSubmit = form.querySelector('.btn-submit');
    emailInput.addEventListener('input', validateInputEmail);
    btnSubmit.addEventListener('click', (Event)=> {emptyForm(Event);});
    
    function validateInputEmail() {
      const value = emailInput.value.trim();
      const results = 
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
        .test(value);
      results ? formSuccess (form, btnSubmit) : formError (form, btnSubmit);
    }

    function formError (parent, btnElement) {
      parent.classList.contains('validate') 
      ? form.classList.remove('validate') 
      : form.classList.add('invalidate');
      btnElement.setAttribute('disabled', true);
    }

    function formSuccess (parent, btnElement) {
      parent.classList.contains('invalidate') 
      ? form.classList.remove('invalidate') 
      : form.classList.add('validate');
      btnElement.removeAttribute('disabled');
    }

    function clearForm(parent, btnElement) {
      btnElement.removeAttribute('disabled');
      if ( parent.classList.contains('invalidate')) 
        parent.classList.remove('invalidate');
      if ( parent.classList.contains('validate')) 
        parent.classList.remove('validate');
    }

    function emptyForm(event) {
      event.preventDefault();
      const value = emailInput.value.trim();
      value.length === 0 
        ? emailInput.placeholder = "Enter email example@mail.com" 
        : submitForm(form);
      form.reset();
      clearForm(form, btnSubmit);
    }
  }

  function showPopap(selector, message, status) {
    const popap = document.querySelector(selector),
      close = popap.querySelector('.close-popap img'),
      massg = popap.querySelector('.page-text'),
      stat = popap.querySelector('.popap-title'),
      popapBtn = popap.querySelector('.popap-btn');

    massg.innerText = message;
    stat.innerText = status;

    const closeElements = [close, popapBtn, popap];
    const param = { popap, close, popapBtn };
    popap.classList.add("active-popap");

    closeElements.forEach(item => item.addEventListener('click', (Event) => {
      hidePopap(Event, param);}));
  }

  function hidePopap(Event, arg) {
    const {popap, close, popapBtn} = arg;
    if (
      Event.target === popap 
      || Event.target === close 
      || Event.target === popapBtn 
    )
    popap.classList.remove("active-popap");
  }

  function submitForm(form) {
    const message = { 
      error: 'Sorry something went wrong. You try again',
      success: 'You have successfully subscribed to the email newsletter'  
    },
    status = ['success', 'error'],
    preloder = document.querySelector('.preloder');
    showPopap('.overlay', message.error, status[1]);
    const formData = new FormData(form);

    const request = new XMLHttpRequest();
    request.open('POST', 'mail.php', true);
    request.send(formData);
    
    request.onreadystatechange = () => {
      
      
      if (request.readyState === 1) preloder.classList.remove('hide-preloder');
      

      if (request.readyState === 4) {
        preloder.classList.add('hide-preloder');
        if (request.status === 200) {
          showPopap('.overlay', message.success, status[0]);
        } 
      }
    }


  }
  
  setClock('.timer', dedline);
  validateForm('#emailForm');
});