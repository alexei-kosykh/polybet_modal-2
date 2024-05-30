const form_modal = document.getElementById('data-send');
const name_modal = document.getElementById('name-modal');
const email_modal = document.getElementById('email-modal');

const modal_ok = document.getElementById('data-ok');
const modal_join = document.getElementById('data-join');
const modal_form = document.getElementById('data-form');
const modal_main = document.getElementById('data-main');

const inputName = document.getElementById('name-modal');
const inputEmail = document.getElementById('email-modal');
const button_mod = document.getElementById('button-modal');
const button_join = document.getElementById('button-first');
const button_ok = document.getElementById('button-ok');
const button = document.getElementById('submit');

const joinButton = document.querySelector('[ modal_join="#modalJoin"]');

const sendModalForm = () => {
  let ebody = `
      <h1>Username: </h1>
      <p>${name_modal.value}</p>
      <h1>Email: </h1>${email_modal.value}</p>
      `;

  Email.send({
    SecureToken: '63793c49-17f8-46a1-8401-ce424743df94',
    To: 'info@polyway.investments',
    From: 'info@polyway.investments',
    Subject: 'User data from modal yez casino',
    Body: ebody,
  }).then((message) => {
    console.log(message);
    form_modal.style.display = 'none';
    modal_ok.style.display = 'block';
  });
};

// validation style
inputName.nextElementSibling.style.display = 'none';
inputEmail.nextElementSibling.style.display = 'none'; // modal

const eventListener = (input, validity) => {
  input.addEventListener('input', function (event) {
    if (validity) {
      input.nextElementSibling.style.display = 'none';
      input.parentNode.style.marginBottom = '15px';
      input.parentNode.style.border = 'none';
      input.style.color = 'white';
    } else {
      showError(input);
    }
  });
};

eventListener(inputName, ValidEmpty(inputName.value));
eventListener(inputEmail, !ValidAllInOne(inputEmail.value));

button_mod.addEventListener('click', function (event) {
  event.preventDefault();
  if (!inputName.value) {
    inputName.setCustomValidity('Please fill the required fields');
    showError(inputName);
  } else if (!inputEmail.value) {
    inputEmail.setCustomValidity('Please fill the required fields');
    inputEmail.nextElementSibling.textContent =
      'Please fill the required fields';
    showError(inputEmail);
  } else if (!ValidAllInOne(inputEmail.value)) {
    inputEmail.setCustomValidity('Incorrect format');
    inputEmail.nextElementSibling.textContent = 'Incorrect format';
    showError(inputEmail);
  } else {
    sendModalForm();
  }
});

let backgroundImage = '';

button_join.addEventListener('click', function (event) {
  modal_form.style.display = 'block';
  modal_join.style.display = 'none';
  backgroundImage = modal_main.style.backgroundImage;
  modal_main.style.backgroundImage = 'none';
  modal_main.style.backgroundColor = '#242424';
});

button_ok.addEventListener('click', function (event) {
  modal_form.style.display = 'none';
  modal_join.style.display = 'block';
  modal_main.style.backgroundImage = `${backgroundImage}`;
  modal_main.style.backgroundColor = '#ffffff1a';
});

function showError(input) {
  input.nextElementSibling.style.display = 'block';
  input.parentNode.style.marginBottom = '30px';
  input.parentNode.style.border = '1px solid rgba(255, 115, 123, 1)';
  input.style.color = 'rgba(255, 115, 123, 1)';
}

function ValidMail(text) {
  var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  var valid = re.test(text);
  return valid;
}

function ValidPhone(text) {
  var re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
  var valid = re.test(text);
  return valid;
}

function ValidEmpty(text) {
  var re = /^\s*$/;
  var valid = re.test(text);
  return valid;
}

function ValidTelegram(text) {
  var re = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,32}$/;
  var valid = re.test(text);
  return valid;
}

function ValidAllInOne(text) {
  var re =
    /(^[\d\+][\d\(\)\ -]{4,10}$)|(^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$)|(^\@?[a-zA-Z0-9-_\.]{2,32}$)/i;
  // phone | email | telegram
  var valid = re.test(text);
  return valid;
}
