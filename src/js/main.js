
const closeModal = document.querySelector('.modal__btn-close')
const modal = document.querySelector('.modal')
const btns = document.querySelectorAll('.btn')

closeModal.addEventListener('click', () => {
		modal.classList.remove('modal_visible')
})

btns.forEach((el) => {
	el.addEventListener('click', () => {
		modal.classList.add('modal_visible')
	})
})


 // inputmask
 const form = document.querySelectorAll('.form');
 const telSelector = document.querySelector('.modal__input-tel') 
 const inputMask = new Inputmask('+6 (777) 999-99-99');
 inputMask.mask(telSelector);


 const validation = new JustValidate('.form');

 validation
	.addField('.modal__input-name', [
	  {
		 rule: 'minLength',
		 value: 3,
		 errorMessage: 'Name must contain at least 3 letters'
	  },
	  {
		 rule: 'maxLength',
		 value: 30,
	  },
	  {
		 rule: 'required',
		 value: true,
		 errorMessage: 'Enter your name!'
	  }
	])
	.addField('.modal__input-email', [
	  {
		 rule: 'required',
		 value: true,
		 errorMessage: 'Enter your Email',
	  },
	  {
		 rule: 'email',
		 value: true,
		 errorMessage: 'Enter correct Email',
	  },
	])
	.addField('.modal__input-tel', [
	  {
		 rule: 'required',
		 value: true,
		 errorMessage: 'Enter your phone number',
	  },
	  {
		 rule: 'function',
		 validator: function() {
			const phone = telSelector.inputmask.unmaskedvalue();
			return phone.length === 10;
		 },
		 errorMessage: 'Phone number is wrong',
	  },
	]).onSuccess((event) => {
	  console.log('Validation passes and form submitted', event);

	  let formData = new FormData(event.target);

	  console.log(...formData);

	  let xhr = new XMLHttpRequest();

	  xhr.onreadystatechange = function () {
		 if (xhr.readyState === 4) {
			if (xhr.status === 200) {
			  console.log('Отправлено');
			}
		 }
	  }

	  xhr.open('POST', 'mail.php', true);
	  xhr.send(formData);

	  event.target.reset();
	});    