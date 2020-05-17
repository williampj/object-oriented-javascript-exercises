coBuggy Code 2

A grocery store uses a JavaScript function to calculate discounts on various items.
They are testing out various percentage discounts but are getting unexpected results.
Go over the code, and identify the reason why they aren't getting the expected discounted prices from the function.
Then, modify the code so that it produces the correct results.

let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    var discount = (this.price * percent) / 100;
    this.price -= discount;
    return this.price;
  }
};
console.log(item.discount(20)); // should return 40
// = 40
console.log(item.discount(50)); // should return 25
// = 20
console.log(item.discount(25)); // should return 37.5
// = 15

------- Solution ------

The problem is that the discount method is mutating the item object. 
Recall that objects are mutable, and as such, changes made to the property of the item object 
are compounded every time that the discount method is called because item.price is being reassigned.
To resolve this, the discount method should be modified so that it doesn't mutate the object. 

Here's one approach:

function discountItem(item, percent) {
  var discount = item.price * percent / 100;
  return item.price - discount;
}

let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    var discount = (this.price * percent) / 100;
    return this.price - discount;
  }
};
console.log(item.discount(20)); // should return 40
// = 40
console.log(item.discount(50)); // should return 25
// = 25
console.log(item.discount(25)); // should return 37.5
// = 37.5