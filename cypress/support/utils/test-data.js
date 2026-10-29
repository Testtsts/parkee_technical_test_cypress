const standardUser = Object.freeze({
  username: 'standard_user',
  password: 'secret_sauce',
});

const problemUser = Object.freeze({
  username: 'problem_user',
  password: 'secret_sauce',
});

const lockedOutUser = Object.freeze({
  username: 'locked_out_user',
  password: 'secret_sauce',
});

const customer = Object.freeze({
  firstName: 'Cypress',
  lastName: 'Tester',
  postalCode: '12345',
});

module.exports = { standardUser, problemUser, lockedOutUser, customer };
