class Validation {
  constructor(form, fields, formType) {
    this.form = form;
    this.fields = fields;
    this.formType = formType;
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault(); 
      let error = 0;

      this.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (!this.validateFields(input)) {
          error++;
        }
      });

      if (error === 0) {
        const successMessageBox = document.getElementById("successMessage");
        if (this.formType === 'signup') {
          successMessageBox.innerHTML = "SIGN UP SUCCESSFUL!";
        } else if (this.formType === 'login') {
          successMessageBox.innerHTML = "LOGIN SUCCESSFUL!";
        } else if (this.formType === 'reservation') {
          successMessageBox.innerHTML = "BOOKING CONFIRMED!";
        }
        successMessageBox.style.display = "block";
        successMessageBox.classList.add("show");

        const loadingTime = 4000;

        setTimeout(() => {
          successMessageBox.style.display = "none";

          const formWrapper = document.querySelector('.login-wrapper') || document.querySelector('.signup-layout') || document.querySelector('.reservation-wrapper');
          if (formWrapper) {
            formWrapper.style.display = "none";
          }

          const loadingSpinner = document.getElementById("loadingSpinner");
          loadingSpinner.style.display = "block";

          setTimeout(() => {
            if (this.formType === 'signup' || this.formType === 'login') {
              const username = document.querySelector('#username').value;
              window.location.href = `dashboard.html?username=${encodeURIComponent(username)}`;
            } else if (this.formType === 'reservation') {
              window.location.href = "dashboard.html";
            } else {
              window.location.href = "index.html";
            }
          }, loadingTime);
        }, 2000);
      }
    });
  }

  toggleFormDisplay() {
    const formContainers = ['.signup-form-container', '.login-container', '.reservation-container'];
    formContainers.forEach(container => {
      const formElement = document.querySelector(container);
      if (formElement) formElement.style.display = "none";
    });
    document.getElementById("successMessage").style.display = "none";
  }

  validateFields(field) {
    if (field.id === 'username' && field.value.trim() === '') {
      this.setStatus(field, 'USERNAME CANNOT BE EMPTY', 'error', 'username-error-box');
      return false;
    }
    if (field.id === 'name' && field.value.length < 3) {
      this.setStatus(field, `NAME MUST BE AT LEAST 3 CHARACTERS`, 'error', 'name-error-box');
      return false;
    }
    if (field.id === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value)) {
        this.setStatus(field, 'INVALID EMAIL FORMAT', 'error', 'email-error-box');
        return false;
      }
    }
    if (field.id === 'password') {
      if (field.value.trim() === '') {
        this.setStatus(field, 'PASSWORD CANNOT BE EMPTY', 'error', 'password-error-box');
        return false;
      }
      if (field.value.length < 8) {
        this.setStatus(field, 'PASSWORD MUST BE AT LEAST 8 CHARACTERS', 'error', 'password-error-box');
        return false;
      }
    }
    if (field.id === 'password2') {
      const passwordField = document.querySelector('#password');
      if (field.value !== passwordField.value) {
        this.setStatus(field, 'PASSWORDS DO NOT MATCH', 'error', 'password2-error-box');
        return false;
      }
    }
    if (field.id === 'date' && field.value === '') {
      this.setStatus(field, `PLEASE CHOOSE A DATE`, 'error', 'date-error-box');
      return false;
    }
    if (field.id === 'time' && field.value === '') {
      this.setStatus(field, `PLEASE CHOOSE A TIME`, 'error', 'time-error-box');
      return false;
    }
    const [hour, minute] = field.value.split(':').map(Number);
    const totalMinutes = hour * 60 + minute;
    const minMinutes = 8 * 60 + 30;
    const maxMinutes = 22 * 60;
    if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
      this.setStatus(field, `OUR OPERATING HOURS ARE FROM 08:30AM TO 22:00PM`, 'error', 'time-error-box');
      return false;
    }
    if (field.id === 'numberofpax') {
      if (field.value < 1 || field.value > 20) {
        this.setStatus(field, `NUMBER OF PAX MUST BE BETWEEN 1 AND 20`, 'error', 'numberofpax-error-box');
        return false;
      }
    }
    if (field.id === 'phone') {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(field.value)) {
        this.setStatus(field, `INVALID PHONE NUMBER`, 'error', 'phone-error-box');
        return false;
      }
    }
    if (field.id === 'occasion' && field.value.length > 50) {
      this.setStatus(field, `OCCASION MUST BE UNDER 50 CHARACTERS`, 'error', 'occasion-error-box');
      return false;
    }

    this.setStatus(field, null, 'success', `${field.id}-error-box`);
    return true;
  }

  setStatus(field, message, status, errorBoxId) {
    const errorMessageBox = document.getElementById(errorBoxId);
    const successMessageBox = document.getElementById("successMessage");

    if (!errorMessageBox) {
      return;
    }

    if (status === "error") {
      errorMessageBox.innerHTML = message;
      errorMessageBox.style.display = "block";
      field.classList.add('input-error');
      setTimeout(() => errorMessageBox.style.display = "none", 3000);
      if (successMessageBox) successMessageBox.style.display = "none";
    } else if (status === "success") {
      errorMessageBox.style.display = "none";
      field.classList.remove('input-error');
      setTimeout(() => {
        if (successMessageBox) successMessageBox.style.display = "none";
      }, 3000);
    }
  }
}

if (window.location.pathname.includes('dashboard.html')) {
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');
  if (username) {
    const usernameSpan = document.getElementById('username');
    if (usernameSpan) {
      usernameSpan.textContent = username;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let form;
  let fields;
  let formType;

  if (document.querySelector('#signupForm')) {
    form = document.querySelector('#signupForm');
    fields = ['username', 'email', 'password', 'password2'];
    formType = 'signup';
  } else if (document.querySelector('#loginForm')) {
    form = document.querySelector('#loginForm');
    fields = ['username', 'password'];
    formType = 'login';
  } else if (document.querySelector('#reservationForm')) {
    form = document.querySelector('#reservationForm');
    fields = ['name', 'date', 'time', 'numberofpax', 'phone', 'occasion'];
    formType = 'reservation';
  }

  if (form && fields) {
    const validator = new Validation(form, fields, formType);
  }

  const profileIcon = document.getElementById('profile-icon');
  const userMenu = document.getElementById('user-menu');
  if (profileIcon && userMenu) {
    profileIcon.addEventListener('click', function () {
      if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
      } else {
        userMenu.style.display = 'block';
      }
    });
  }

  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      window.location.href = "index.html";
    });
  }
});
