Testing Object Equality

In JavaScript, comparing two objects either with == or === checks for object identity.
In other words, the comparison evaluates to true if it's the same object on either side of == or ===.
This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs.
JavaScript doesn't give us a way to do that.

Write a function objectsEqual that accepts two object arguments and returns true or false depending on whether the objects have the same key/value pairs.

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false

---------- My Solutions ---------

function objectsEqual(objOne, objTwo) {
  if (objOne === objTwo) {
    return true;
  }
  const sortedObjOne = Object.keys(objOne).sort();
  const sortedObjTwo = Object.keys(objTwo).sort();
  return (
    sortedObjOne.length === sortedObjTwo.length &&
    sortedObjOne.every((key, indx) => key === sortedObjTwo[indx]) &&
    sortedObjOne.every(key => sortedObjOne[key] === sortedObjTwo[key])
  );
}

//

function objectsEqual(objOne, objTwo) {
  return (
    Object.keys(objOne).every(key => objOne[key] === objTwo[key]) &&
    Object.keys(objTwo).every(key => objOne[key] === objTwo[key]) &&
    Object.keys(objOne).length === Object.keys(objTwo).length
  );
}

console.log(objectsEqual({ a: 'foo' }, { a: 'foo' })); // true
console.log(objectsEqual({ a: 'foo', b: 'bar' }, { a: 'foo' })); // false
console.log(objectsEqual({}, {})); // true
console.log(objectsEqual({ a: 'foo', b: undefined }, { a: 'foo', c: 1 })); // false

------------ LS Solution -------------

function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }
  
  return (keysMatch(a, b) && valuesMatch(a, b));
}

function keysMatch(a, b) {
  var aKeys = Object.getOwnPropertyNames(a).sort();
  var bKeys = Object.getOwnPropertyNames(b).sort(); 
  
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(function(key, index) {
    return key === bKeys[index];
  });
}

function valuesMatch(a, b) {
  var aKeys = Object.getOwnPropertyNames(a).sort();
  var key;
  
  return aKeys.every(function(key) {
    return a[key] === b[key];
  });
}

---------  Discussion -------

The solution is straightforward, it checks whether the keys are the same and 
the values for the respective keys are the same, and it makes use of helper functions for each. 
The solution also has a guard clause to immediately returns true if the two arguments passed reference the same object.

--------- Futher Exploration --------

A limitation of this function is that it doesn't look for deep equality. 
In other words, if one of the values is an object in both objects, 
this will return false unless that object is identical on both objects.


2 ways to make a deep copy: 

1) JSON

let newObj = JSON.parse(JSON.stringify(obj));

//

2) recursive function: 

function cloneObject(obj) {
  let clone = {};
  for(let i in obj) {
     if(obj[i] != null &&  typeof(obj[i])=="object")
          clone[i] = cloneObject(obj[i]);
      else
          clone[i] = obj[i];
  }
  return clone;
}


--------- Student FE Solutions -------
# 1: 

If a property is assigned to an object, use recursion to see if the properties are equal.

function objectsEqual(object1, object2) {
  function bMatchesA(a, b) {
    let keys = Object.keys(a);

    for (let i = 0; i < keys.length; i += 1) {
      if (typeof (a[keys[i]]) === 'object') {
        if (!objectsEqual(a[keys[i]], b[keys[i]])) return false;
      } else {
        if (a[keys[i]] !== b[keys[i]]) return false;
      }
    }

    return true;
  }

  if (object1 === object2) return true;

  if ((Object.keys(object1).length !== Object.keys(object2).length) ||
      (!bMatchesA(object1, object2)) ||   
      (!bMatchesA(object2, object1))) return false;   // running both instead of just testing if length and keys are equal 

  return true;
}

//

# 2: Further Exploration Works for nested objects and also in the case of undefined value in a tricky case (see tests)

function objectsEqual(obj1, obj2) {
  var keys1 = Object.getOwnPropertyNames(obj1);
  var keys2 = Object.getOwnPropertyNames(obj2);

  function nbPropertiesEqual() {
    return keys1.length === keys2.length;
  }

  function allKeysEqual() {
    return keys1.filter( key => obj2[key] === undefined ).length === 0;
  }

  function allValuesEqual() {
    var test = true;
    var i;
    for ( i = 0; i < keys1.length; i += 1) {
      if (typeof obj1[keys1[i]] === 'object') {
        if (!objectsEqual(obj1[keys1[i]], obj2[keys1[i]])) {
          test = false;
          break;
        }
      } else {
        if (!(obj1[keys1[i]] === obj2[keys1[i]])) {
          test = false;
          break;
        }
      }
    }
    return test;
  }
  return nbPropertiesEqual() && allKeysEqual() && allValuesEqual();
}

//

# 3: Further exploration. Works when values are objects or function literals.

function objectsEqual(obj1, obj2) {
  var keysObj1 = Object.getOwnPropertyNames(obj1).sort();
  var keysObj2 = Object.getOwnPropertyNames(obj2).sort();

  if (obj1 === obj2) return true;
  if (keysObj1.length !== keysObj2.length) return false;

  var sameKeysValues = keysObj1.every(function (ele, idx) {
    if (typeof obj1[ele] === 'function') {
      return keysObj2[idx] === ele 
             && obj1[ele].toString().replace(/\s/g, '') 
             === obj2[ele].toString().replace(/\s/g, '');
    } else if (typeof obj1[ele] === 'object') {
      return objectsEqual(obj1[ele], obj2[ele]);
    } else {
      return obj1[ele] === obj2[ele] && keysObj2[idx] === ele;
    }
  });

  return sameKeysValues;
}