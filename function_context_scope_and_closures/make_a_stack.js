Make a Stack

A stack is a compound data type like an array.
The difference between an array and a stack is that in an array you can insert and remove elements
in any order you want, but a stack has a rule whereby you can only add new elements at the end and
remove the last inserted element.

Create a function newStack, that when called returns a stack object with three methods:
push, pop, and printStack.
push takes a value and insert it at the end of the stack.
pop removes the last element from the stack.
printStack logs each remaining element of the stack on its own line.

Internally, use an array to implement the stack.
Make sure that the array is not accessible from outside the methods.

--------- Solution ---------

function newStack() {
  const ary = [];
  return {
    push(value) {
      return ary.push(value);
    },
    pop() {
      return ary.pop();
    },
    printStack() {
      return ary.forEach(num => console.log(num));
    }
  };
}

const stack = newStack();
stack.push(5);
stack.push(6);
stack.push(7);
stack.pop();
stack.printStack();

------- Discussion --------

The detail to watch out for in this exercise is keeping array from being acessible from the outside. 
The solution achieves this by using the concept of closures to create the stack array that is only 
accessible to the returned objects of the newStack function.