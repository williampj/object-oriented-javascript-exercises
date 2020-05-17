Anonymizer

Using OLOO create an Account prototype object that anonymizes user objects on init.
The created object should not have access to the function that anonymizes a user other than 
through the init and reanonymize methods.
The function that anonymizes creates a 16 character sequence composed of letters and numbers.
The following are the properties and methods on the Account object:

init: The init method sets the email, password, firstName, lastName, and displayName of user.
  The displayName is a 16 character sequence generated for the user. It's used as the display name of a user.
reanonymize: This method generates a new 16 character sequence and reassigns it to the displayName property
  if the password provided is valid. Returns true if successfully re-anonymized.
  Returns 'Invalid Password' if the password provided is not valid.
resetPassword: This method asks the user for a new password and reassigns it to the password property.
  To reset the password, the user must provide the current password.
  Returns 'Invalid Password' if the password provided is not valid. Returns true if the password is successfully reset.
firstName: This method returns the first name of the user if the password provided is valid.
  Returns 'Invalid Password' if the password provided is not valid.
lastName: This method returns the last name of the user if the password provided is valid.
  Returns 'Invalid Password' if the password provided is not valid.
email: This method returns the email name of the user if the password provided is valid.
  Returns 'Invalid Password' if the password provided is not valid.
displayName: This property returns the displayName — the 16 character sequence.

Other than the above properties, methods, and properties inherited from Object.prototype,
no other method or property should exist on the object returned by the Account prototype object.

Here's a sample for your reference:

var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

var displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false


----------- Solution ----------

IIFE to create closure with private data for the returned Account object

const Account = (function() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;
  const ERROR_MESSAGE = 'Invalid Password';

  function generateChar() {
    const TOP = 122;
    const BOTTOM = 48;
    const RANGE = TOP - BOTTOM + 1;
    const charCode = Math.floor(Math.random() * RANGE) + BOTTOM;
    const char = String.fromCharCode(charCode);
    return /[a-z0-9]/i.exec(char) ? char : generateChar();
  }
  function generateName() {
    let name = '';
    for (let i = 0; i < 16; i += 1) {
      name += generateChar(); 
    }
    return name; 
  }
  function isValidPassword(password) {
    return userPassword === password;
  }
  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = generateName();
      return this;
    },
    firstName(password) {
      if (isValidPassword(password)) {
        return userFirstName;
      }
      return ERROR_MESSAGE;
    },
    lastName(password) {
      if (isValidPassword(password)) {
        return userLastName;
      }
      return ERROR_MESSAGE;
    },
    email(password) {
      if (isValidPassword(password)) {
        return userEmail;
      }
      return ERROR_MESSAGE;
    },
    reanonymize(password) {
      if (isValidPassword(password)) {
        this.displayName = generateName();
        return true;
      }
      return ERROR_MESSAGE;
    },
    resetPassword(passwordAttempt, newPassword) {
      if (isValidPassword(passwordAttempt)) {
        userPassword = newPassword;
        return true;
      }
      return ERROR_MESSAGE;
    }
  };
})();

const fooBar = Object.create(Account).init(
  'foo@bar.com',
  '123456',
  'foo',
  'bar'
);
console.log(fooBar.displayName);
console.log(fooBar.displayName);
console.log(fooBar.displayName);
console.log(fooBar);
console.log(fooBar.firstName); // returns the firstName function
console.log(fooBar.email); // returns the email function
console.log(fooBar.firstName('123456')); // logs 'foo'
console.log(fooBar.firstName('abc')); // logs 'Invalid Password'
console.log(fooBar.lastName('abc')); // logs 'Invalid Password
console.log(fooBar.lastName('123456')); // logs 'Invalid Password
console.log(fooBar.displayName); // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc')); // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')); // logs true
console.log(fooBar.firstName('abc')); // logs 'foo'
const { displayName } = fooBar;
console.log(fooBar.reanonymize('abc')); // returns true
console.log(fooBar.displayName);
console.log(displayName === fooBar.displayName); // logs false


------------- LS Solution (similar) --------------

var Account = (function() {
  var userEmail;
  var userPassword;
  var userFirstName;
  var userLastName;

  function isValidPassword(testPassword) {
    return userPassword === testPassword;
  }

  function getRandomLetterNumber() {
    var randomIndex = Math.floor(Math.random() * 62);
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890'[randomIndex];
  }

  function anonymize() {
    var result = '';
    var i;

    for (i = 0; i < 16; i += 1) {
      result += getRandomLetterNumber();
    }

    return result;
  }

  return {
    init: function(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    reanonymize: function(password) {
      if (isValidPassword(password)) {
        this.displayName = anonymize();
        return true
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword: function(currentPassword, newPassword) {
      if (isValidPassword(currentPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    firstName: function(password) {
      if (isValidPassword(password)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName: function(password) {
      if (isValidPassword(password)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email: function(password) {
      if (isValidPassword(password)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    },
  };
})();

---------- Discussion ------------

The key part of this solution is the use of an IIFE to create a private scope that is only accessible 
to the object returned when executing Object.create(Account).

-------- BAD SOLUTION - Attempt to combine OLOO with IIFE to create private data -------

PROS of solution:
- meaningful prototype (fooBar.__proto__ === Account)
  - shared/delegated behavior of the prototype (init, reanonymize, resetPassword)

CON:
- shared private data (private password and helper methods shared among all instances)
  - means that this approach is useless
- Every instance gets its own copy of email, firstName, lastName methods 

const Account = (function Account() { 
  let privatePassword = '';  // shared among all instances 
  function generateChar() {
    const START_CODE = 48;
    const END_CODE = 122;
    const RANGE = END_CODE - START_CODE;
    const randomChar = function randomChar() {
      return String.fromCharCode(
        Math.floor(Math.random() * (RANGE + 1)) + START_CODE
      );
    };
    let char = randomChar();
    while (/[^0-9a-z]/i.test(char)) {
      char = randomChar();
    }
    return char;
  }
  function generateName() {
    let name = '';
    for (let i = 0; i < 16; i += 1) {
      name = name.concat(generateChar());
    }
    return name;
  }
  function isValidPassword(attempt) {
    return attempt === privatePassword;
  }
  const INVALID_PASSWORD = 'Invalid Password';
  return {
    init(email, password, firstName, lastName) {
      privatePassword = password;
      this.email = function(passwordAttempt) {
        if (isValidPassword(passwordAttempt)) {
          return email;
        }
        return INVALID_PASSWORD;
      };
      this.firstName = function(passwordAttempt) {
        return isValidPassword(passwordAttempt) ? firstName : INVALID_PASSWORD;
      };
      this.lastName = function(passwordAttempt) {
        if (isValidPassword(passwordAttempt)) {
          return lastName;
        }
        return INVALID_PASSWORD;
      };
      this.displayName = this.displayName || generateName(); // 16 char sequence, letter and numbers
      return this;
    },
    reanonymize(passwordAttempt) {
      if (isValidPassword(passwordAttempt)) {
        this.displayName = generateName();
        return true;
      }
      return INVALID_PASSWORD;
    },
    resetPassword(passwordAttempt, newPassword) {
      if (isValidPassword(passwordAttempt)) {
        privatePassword = newPassword;
        return true;
      }
      return INVALID_PASSWORD;
    }
  };
})();

const fooBar = Object.create(Account).init(
  'foo@bar.com',
  '123456',
  'foo',
  'bar'
);

const bazqux = Object.create(Account).init(
  'baz@qux.com',
  '654321',
  'baz',
  'qux'
);

console.log(fooBar.firstName('123456')); // Invalid Password (shared password changed by bazqux from 123456 to 654321)

-------- Further Exploration --------

This solution works but it only works for one set of private data. 
Here's an extended version of the example run:

var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

var displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

var bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'baz' but should log foo.
console.log(fooBar.email('abc'));                  // 'baz@qux.com' but should 'foo@bar.com'

Modify the solution so that it can accommodate creating multiple objects with their own private data.

--------------  MY FE Solution -------------- 
keeping private data in the parameter list of init (in every method closure) 
and then define every method in the init so their closures encompasses parameterlist 

PROS:
- the required values are private 
- All objects have Account as their true prototype object (follows OLOO pattern)
- some shared behavior (helper methods) in the outer closure (the IIFE): generateChar, generateName, INVALID_PASSWORD

CONS: 
- every instance has its own copy of the six methods (init method ) - but that was part of the requirement here  

const Account = (function Account() {
  function generateChar() {
    const TOP = 122;
    const BOTTOM = 48;
    const LENGTH = TOP - BOTTOM + 1;
    const charCode = Math.floor(Math.random() * LENGTH) + BOTTOM;
    const char = String.fromCharCode(charCode);
    return /[a-z0-9]/i.exec(char) ? char : generateChar();
  }
  function generateName() {
    let name = '';
    for (let i = 0; i < 16; i += 1) {
      name = name.concat(generateChar());
    }
    return name;
  }
  const INVALID_PASSWORD = 'Invalid Password';
  return {
    init(email, password, firstName, lastName) {
      // stores these four values here in the parameterlist, part of closure to every method
      this.email = function(attempt) {
        if (attempt === password) {
          return email;
        }
        return INVALID_PASSWORD;
      };

      this.firstName = function(attempt) {
        if (attempt === password) {
          return firstName;
        }
        return INVALID_PASSWORD;
      };

      this.lastName = function(attempt) {
        if (attempt === password) {
          return lastName;
        }
        return INVALID_PASSWORD;
      };

      this.displayName = generateName();

      this.reanonymize = function(attempt) {
        if (attempt === password) {
          this.displayName = generateName();
          return true;
        }
        return INVALID_PASSWORD;
      };
      this.resetPassword = function(attempt, newPassword) {
        if (attempt === password) {
          password = newPassword;
          return true;
        }
        return INVALID_PASSWORD;
      };
      return this;
    }
  };
})();




-------------- Student solutions - FE --------------


// 1 Pete Hanson: ES6 syntax - enlightening use of data {} object with identifier to store each instance in this shared object 
// PROS: 
// - individual data stored in a shared storage in the closure 
// - all behavior is shared (each instance only has a displayName property after init) 

const INVALID_PASSWORD = 'Invalid password.';

const Account = (function Account() {
  const data = {};

  const isInvalidPassword = (password, displayName) => (
    password !== data[displayName].password
  );

  const randomString = () => {
    const RESULT_LENGTH = 16;
    const DIGITS        = '0123456789';
    const LOWERCASE     = 'abcdefghijklmnopqrstuvwxyz';
    const UPPERCASE     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ELIGIBLE      = DIGITS + LOWERCASE + UPPERCASE;

    let result = '';
    for (let i = 0; i < RESULT_LENGTH; i += 1) {
      const randomIndex = Math.floor(Math.random() * ELIGIBLE.length);
      result += ELIGIBLE.charAt(randomIndex);
    }

    return result;
  };

  const anonymize = () => {
    const displayName = randomString();
    data[displayName] = {};
    return displayName;
  };

  return {
    email(password) {
      if (isInvalidPassword(password, this.displayName)) {
        return INVALID_PASSWORD;
      }

      return data[this.displayName].email;
    },

    firstName(password) {
      if (isInvalidPassword(password, this.displayName)) {
        return INVALID_PASSWORD;
      }

      return data[this.displayName].firstName;
    },

    init(email, password, firstName, lastName) {
      this.displayName = anonymize();
      data[this.displayName] = {
        email,
        password,
        firstName,
        lastName,
      };

      return this;
    },

    lastName(password) {
      if (isInvalidPassword(password, this.displayName)) {
        return INVALID_PASSWORD;
      }

      return data[this.displayName].lastName;
    },

    reanonymize(password) {
      if (isInvalidPassword(password, this.displayName)) {
        return INVALID_PASSWORD;
      }

      const oldDisplayName = this.displayName;
      this.displayName = anonymize();
      data[this.displayName] = data[oldDisplayName];
      delete data[oldDisplayName];

      return true;
    },

    resetPassword(password, newPassword) {
      if (isInvalidPassword(password, this.displayName)) {
        return INVALID_PASSWORD;
      }

      data[this.displayName].password = newPassword;
      return true;
    },
  };
}());

// 3) overdone! 


var Account = (function () {

  const ERROR_MESSAGE = 'Invalid Password';
  const SEQUENCE_LENGTH = 16;

  var storage = {};

  //-------- RANDOMIZER ------------//

  const randomChar = function randomChar() {
    const number = function () {
      return (Math.floor(Math.random() * 10));
    };
    const upperLetter = function () {
      return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    };
    const lowerLetter = function () {
      return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
    };
    const randomCharType = function () {
      return Math.floor(Math.random() * 3);
    };
    const charTypes = [number, upperLetter, lowerLetter];
    return charTypes[randomCharType()]();
  }

  //-------- ANONYMIZER ------------//

  const forgeAnonymity = function forgeAnonymity() {
    var sequence = [];

    while (sequence.length < SEQUENCE_LENGTH) {
      sequence.push(randomChar());
    }
    return sequence.join('');
  };

  //--------- METHODS --------------//

  const setNewSequence = function setNewSequence() {
    let newSequence = forgeAnonymity();
    var newStorage = Object.create(storage[this.displayName]); // linkage of the successive storages
    this.displayName = newSequence;
    storage[newSequence] = newStorage;
    return true;
  };

  const getUserMail = function () {
    return storage[this.displayName].userInfos[0];
  };

  const getUserFirstName = function () {
    return storage[this.displayName].userInfos[1];
  };

  const getUserLastName = function () {
    return storage[this.displayName].userInfos[2];
  };


  const setPassword = function setPassword(newPwd) {
    storage[this.displayName].password = newPwd;
    return true
  };

  //------------ FACTORY ----------------------------//

  const isValidPwd = function isValidPwd(pwd) {
    return storage[this.displayName].password === pwd;
  }
  const ifValidPwdDo = function ifValidPwdDo(func) {
    return function (pwd, ...arguments) {
      if (isValidPwd.call(this, pwd)) {
        return func.call(this, ...arguments);
      } else {
        return ERROR_MESSAGE;
      }
    }
  };

  return {

    init: function (mail, password, fName, lName) {
      var address = forgeAnonymity(); // this address is used as an idenfier for the object and also for the vault in storage
      var newVault;
      this.displayName = address;

      storage[address] = {}; // create a unique storage for the new object initialized
      newVault = storage[address];
      newVault.userInfos = [mail, fName, lName]
      newVault.password = password;

      return this;
    },

    email: ifValidPwdDo(getUserMail), // call methods that return methods using argument as closure variable 

    firstName: ifValidPwdDo(getUserFirstName),

    lastName: ifValidPwdDo(getUserLastName),

    resetPassword: ifValidPwdDo(setPassword),

    reanonymize: ifValidPwdDo(setNewSequence),
  }
}());

//// 4) Kelvin Wong - interesting use of partial function

I created this solution based on this fantastically detailed post by Ben Rodenhaeuser on a similar problem, 
and the subsequent discussions immediately below Ben's post. 
In particular, I adapted Ben's solution from his 'Approach 3' section.

Just as he mentioned, this solution isn't perfect, for (at least) 2 reasons:

Each instance of the Account constructor object contains a partially applied copy of Account's methods, 
so there's still memory inefficiency.
While subsequent changes to the Account constructor object's existing methods do propagate to all its instances, 
any new methods added to Account later will not work properly for instances that have already been initialized.

I'm aware Ben did eventually come up with a solution using new ES6 syntax which fully satisfies his requirements 
(scroll to the very end of the discussion). 
I didn't try to adapt that solution to this problem - perhaps somebody else can attempt this!

var Account = (function () {
  function generateDisplayName() {
    var i;
    var lettersAndNumbers =
      'abcdefghijklmnopqrstuvwxyz' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      '0123456789';
    var len = lettersAndNumbers.length;
    var newChar;
    var newDisplayName = '';

    for (i = 1; i <= 16; i += 1) {
      newChar = lettersAndNumbers[Math.floor(Math.random() * len)];
      newDisplayName += newChar;
    }

    return newDisplayName;
  }

  function isValidPassword(correctPassword, passwordInput) {
    return correctPassword === passwordInput;
  }

  function partiallyApply(constructorObject, methodKey, data, context) {
    return function (...args) {
      return constructorObject[methodKey].apply(context, [data].concat(args));
    };
  }

  return {
    init: function (email, password, firstName, lastName) {
      var accountData = { email, password, firstName, lastName }; // capturing parameterlist closure in an object
      var propName;

      this.displayName = generateDisplayName();

      for (propName in Account) {
        if (typeof Account[propName] === 'function' && propName !== 'init') {
          this[propName] = partiallyApply(Account, propName, accountData, this); // copying Account methods to each object
        }                                                                        // passing accoundData (parameterlist closure) to each method as first argument
      }                                                                          // plus any user arguments to that method 

      return this;
    },

    reanonymize: function (accountData, passwordInput) {  // accountData arg is already provided to each method 
      if (isValidPassword(accountData.password, passwordInput)) {
        this.displayName = generateDisplayName();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword: function (accountData, passwordInput, newPassword) {
      if (isValidPassword(accountData.password, passwordInput)) {
        accountData.password = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    firstName: function (accountData, passwordInput) {
      if (isValidPassword(accountData.password, passwordInput)) {
        return accountData.firstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName: function (accountData, passwordInput) {
      if (isValidPassword(accountData.password, passwordInput)) {
        return accountData.lastName;
      } else {
        return 'Invalid Password';
      }
    },

    email: function (accountData, passwordInput) {
      if (isValidPassword(accountData.password, passwordInput)) {
        return accountData.email;
      } else {
        return 'Invalid Password';
      }
    },
  };
})();

var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                      // returns the firstName function
console.log(fooBar.email);                          // returns the email function
console.log(fooBar.firstName('123456'));            // logs 'foo'
console.log(fooBar.firstName('abc'));               // logs 'Invalid Password'
console.log(fooBar.displayName);                    // logs 16-character sequence
console.log(fooBar.resetPassword('123', 'abc'));    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')); // logs true

var displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));             // logs true
console.log(displayName === fooBar.displayName);    // logs false

var bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));               // logs 'foo'.
console.log(fooBar.email('abc'));                   // logs 'foo@bar.com'

console.log(bazQux.firstName('123456'));            // logs 'baz'
console.log(bazQux.lastName('123456'));             // logs 'qux'
console.log(bazQux.email('123456'));                // logs 'baz@qux.com'
console.log(bazQux.resetPassword('123', 'abc'));    // logs 'Invalid Password'
console.log(bazQux.resetPassword('123456', 'abc')); // logs true
console.log(bazQux.displayName);                    // logs 16-character sequence
console.log(bazQux.reanonymize('abc'));             // logs true
console.log(bazQux.displayName);                    // logs new 16-character sequen