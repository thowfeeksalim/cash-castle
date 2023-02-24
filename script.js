'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/*
?This is a banking application with hardcoded user accounts.

The following are the main components of the code:The Data: 
It contains four hardcoded bank accounts with details like owner name, account movements, interest rate, and PIN.

?The Elements: It contains all the DOM elements required for the banking application to work.
?For example, the labelWelcome element displays a welcome message, and labelSumIn displays the total deposit amount for the logged-in user.

The Functions: This section contains all the functions required for the banking application.
For example, displayMovements function displays the transactions of the logged-in user.

?The Event Handlers: It contains event listeners that listen to user interaction with the banking application.
?For example, the btnLogin event listener listens to the login button click.The application allows users to log in and view their transactions, balance, and other banking-related details. Users can also perform money transfers, loans, and account closure.
*/

//!BANKIST APP

/////////////////////////////////////////////////
// create one  object named "account1" and add 4 properties
const account1 = {
  owner: 'thowfeek salim',
  movements: [20000, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1234,
};
// create one  object named "account2" and add 4 properties
const account2 = {
  owner: 'shafeek s',
  movements: [50000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 7695,
};
// create one  object named "account3" and add 4 properties
const account3 = {
  owner: 'sammed n j',
  movements: [20000, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
// create one  object named "account4" and add 4 properties
const account4 = {
  owner: 'julie jose',
  movements: [43000, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 6656,
};
// create an array named "accounts" and add the above 4 objects
const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
//!  HTML elements

//select an HTML element on a webpage with a class name of "welcome" and assigns it to a variable called "labelWelcome".
//querySelector is a method available on the document and element objects in Js that allows to select HTML elements on a web page using a CSS selector.
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
//! Functions
//movements=array
const displayMovements = function (movements, sort = false) {
  //inner html simlar to textContent
  //remove all the content inside the containerMovements element.
  containerMovements.innerHTML = '';
  //innerHTML is a property available on the Element object in JavaScript that allows you to get or set the HTML content of an element.

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //i=index mov=current movement
  movs.forEach(function (mov, i) {
    //teranory operation
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //` `=template literals   // create a html template
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    //insertAdjacentHTML this method accept 2 strings
    //1st string=afterbegin(position)
    //afterbegin is used to get movements in correct order
    //insert the HTML markup contained in the html string at the beginning of the containerMovements element.
    containerMovements.insertAdjacentHTML('afterbegin', html);
    //insertAdjacentHTML is a method available on the Element object in JavaScript that allows you to insert HTML markup into the DOM
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  //abs=remove -ve sign
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      //interest  added for deposit when individual deposit interst greater than 1
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
//create username first lowercase the full username then split by there spaces(' ') then take first letter of each word
//eg:thowfeek salim=>ts
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
//! Event handlers

let currentAccount;
//!Login
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});
//!Transfer Money
btnTransfer.addEventListener('click', function (e) {
  //prevent relaoding the page
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    //Conditions for transfer Money
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

//!Request Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  //clear the input field
  inputLoanAmount.value = '';
});

//!account close
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
