// Mini Inventory Management System

// In this exercise, you'll build a simple inventory management system.
// The system is composed of an item creator, an items manager, and a reports manager.
// The item creator makes sure that all necessary information are present and valid.
// The item manager is responsible for creating items, updating information about items, deleting items, and
// querying information about the items. Finally, the report manager generates reports for a specific item or ALL items.
// Reports for specific items are generated from report objects created from the report manager.
// The report manager is responsible for reports for all items.

// Component Specifications
// Here's all the required information for an item:

// SKU code: This is the unique identifier for a product.
//   It consists of the first 3 letters of the item and the first 2 letters of the category.
//   If the item name consists of two words and the first word consists of two letters only, the next letter is taken from the next word.
// Item name: This is the name of the item. It must consist of a minimum of 5 characters. Spaces are not counted as characters.
// Category: This is the category that the item belongs to. It must consist of a minimum of 5 characters and be only one word.
// Quantity: This is the quantity in stock of an item. This must not be blank. You may assume that a valid number will be provided.

// The following are the methods that the items manager can perform:

// create: This method creates a new item. Returns false if creation is not successful.
// update: This method accepts an SKU Code and an object as an argument and updates any of the information on an item.
//   You may assume valid values will be provided.
// delete: This method accepts an SKU Code and deletes the item from the list. You may assume a valid SKU code is provided.
// items: This property returns all the items.
// inStock: This method list all the items that have a quantity greater than 0.
// itemsInCategory: This method list all the items for a given category

// The following are the methods on the reports managers:

// 1) init: This method accepts the ItemManager object as an argument and assigns it to the items property.
// 2) createReporter: This method accepts an SKU code as an argument and returns an object.
//   The returned object has one method, itemInfo.
//     It logs to the console all the properties of an object as "key:value" pairs (one pair per line).
//     There are no other properties or methods on the returned object (except for properties/methods inherited from Object.prototype).
// 3) reportInStock: Logs to the console the item names of all the items that are in stock as a comma separated values.

// There's no need to add the ability to validate the uniqueness of the SKU code. Given the current description,
//   it's possible that a duplicate will exist.
// Each required piece of information for an item corresponds to one property.
// If any of the require information provided is not valid, the item creator returns an object with a notValid property with a value of true.
// The created item objects should not have any methods/properties on them
//   other than the required information above and those inherited from Object.prototype.
// You may add methods to the item manager as you deem necessary.
// Here is a sample run that you can use a reference:

// ItemManager.create('basket ball', 'sports', 0);           // valid item
// ItemManager.create('asd', 'sports', 0);
// ItemManager.create('soccer ball', 'sports', 5);           // valid item
// ItemManager.create('football', 'sports');
// ItemManager.create('football', 'sports', 3);              // valid item
// ItemManager.create('kitchen pot', 'cooking items', 0);
// ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

// ItemManager.items;
// // returns list with the 4 valid items

// ReportManager.init(ItemManager);
// ReportManager.reportInStock();
// // logs soccer ball,football,kitchen pot

// ItemManager.update('SOCSP', { quantity: 0 });
// ItemManager.inStock();
// // returns list with the item objects for football and kitchen pot
// ReportManager.reportInStock();
// // logs football,kitchen pot
// ItemManager.itemsInCategory('sports');
// // returns list with the item objects for basket ball, soccer ball, and football
// ItemManager.delete('SOCSP');
// ItemManager.items;
// // returns list with the remaining 3 valid items (soccer ball is removed from the list)

// var kitchenPotReporter = ReportManager.createReporter('KITCO');
// kitchenPotReporter.itemInfo();
// // logs
// // skuCode: KITCO
// // itemName: kitchen pot
// // category: cooking
// // quantity: 3

// ItemManager.update('KITCO', { quantity: 10 });
// kitchenPotReporter.itemInfo();
// // logs
// // skuCode: KITCO
// // itemName: kitchen pot
// // category: cooking
// // quantity: 10

// ------------ Own notes and approach -----------

// Understanding:
// rules:
// - item creater validates info (present and valid) (internal helper)
// - item manager does CRUD operations
// - item report manager - logs (generates) reports for one or all items
//   - creates reports OBJECTS from which reports are generated

// - each item:
//   - identifier (5 character SKU code): 3 first letters of item + 2 first letters of category
//     - if compound name with less than three letters in first word, use from second word
//   - item name: minimum 5 chars. Spaces not counted as chars
//   - category item belongs to: minimum 5 chars, only one word.
//   - quantity: quantity in stock of item. Cannot be blank. Assume valid number provided.

// - item manager methods
//   -1. create - creates new item. Return false if not succesful.
//   -2. update - accepts 2 args(SKU code + object), and updates info on item. Assume valid values provided.
//   -3. delete - accepts SKU code and deletes item from list. Assume valid SKU code provided.
//   -4. items - returns all items
//   -5. inStock - lists all items with quantity greater than 0
//   -6. itemsInCategory - lists all items for given category

// - reports manager methods:
//   -1. init - accepts ItemManager object argument and assigns it to the items property.
//   -2. createReporter - accepts SKU code argument and returns an object.
//     - returned object has one method - itemInfo
//       - itemInfo logs to console all properties of an object as key:value pairs (one per line)
//       - no other own properties/methods on returned object (only inherited from Object.prototype)
//   -3. reportInStock - logs to console all item names of all items in stock as comma-separated values

// - other notes:
//   - No need to add ability to validate uniqueness of SKU code (accept possible duplicated)
//   - each item info corresponds to one property
//   - if any required info is not valid, item creator returns object with 'notValid' property with value of true
//   - created item objects should not have methods/property besides required info above and those inherited from Object.prototype
//   - you may add methods to item manager as you deem necessary.

// Data Structures:
// - OLOO object creation approach on Item, ReportManager and ItemManager
// - item object
//   - 4 properties (SKU, name, category, quantity)
// - ItemManager object
//   - items array containing item objects
//   - 6 methods that relate to items array
// - ReportManager object
//   - 3 methods
//   - items property = array with ItemManager objects
//   - createReporter return object
//     - 1 method

// Algorithm:
// - define Item creator object (to be called from ItemManager)
//   - set Item equal to IIFE with validator methods in the closure to be called from init method
//     - method to validate 3 explicit arguments (name, category, quantity)
//     - method to validate name has min 5 non-space chars
//     - method to validate category min 5 chars and one word only
//     - isInValid method that calls the other two
//   - return object with init method
//   - calls the validators to determine which valid item
//     - returns object with
//       - 'notValid' property set to true (if failed validation) or
//       - 4 set properties (SKU, name, category, quantity)
// - define ItemManager object (no creator, there's just one that works from the get-go)
//   - set ItemManager equal to IIFE with items array privat variable in closure
//   - returns object with 6 CRUD methods (no need for init method, it's already expected to be working). NB: no logging, only returning
//     -1. create - (creates new item. Return false if not succesful.)
//       - sets item creator variable to Object.create on Item Creator
//       - calls init on item and forwards arguments
//       - returns 'false' if the property 'notValid' is present on item, otherwise push to items array
//     -2. update - accepts 2 args(SKU code + object), and updates info on item. Assume valid values provided.
//       - find index of items array element with that SKU code
//       - iterate passed in object
//         - update item properties to argument properties
//       - reassign that element to passed in object
//     -3. delete - accepts SKU code and deletes item from list. Assume valid SKU code provided.
//       - find index of items array element with that SKU code
//       - remove that index using splice method
//     -4. items - returns all items
//       - map the items array to the name property of each element
//     -5. inStock - lists all items with quantity greater than 0
//       - filter items array to those elements with quantity greater than zero
//     -6. itemsInCategory - lists all items for given category
//       - filter items with given category name

// - define ReportManager object
//   - return object with 3 methods
//     - init method
//       - set this.items property and initialize to passed in arg
//     - createReporter method
//       - retrieve item from items property method using SKU code
//       - prepare return object with itemInfo method
//         - iterate the properties of the items (Object.entries) and
//             log to console (items will remain in the itemInfo closure)
//     - reportInStock method
//       - logs return of calling inStock method on the items property

// ------------ My 1st Solution -----------

const ItemCreator = (function ItemCreator() {
  const hasExplicitArguments = (...args) =>
    args.every(arg => arg !== undefined);
  const isValidName = name => name.replace(/\s/g, '').length >= 5;
  const oneWord = name => !/\S\s+\S/.exec(name);
  const isValidCategory = category =>
    isValidName(category) && oneWord(category);
  const isInvalidItem = (...args) =>
    !hasExplicitArguments(...args) ||
    !isValidName(args[0]) ||
    !isValidCategory(args[1]);

  return {
    init(itemName, category, quantity) {
      if (isInvalidItem(itemName, category, quantity)) {
        return { notValid: 'true' };
      }
      return {
        skuCode: itemName
          .slice(0, 3)
          .concat(category.slice(0, 2))
          .toUpperCase(),
        itemName,
        category,
        quantity
      };
    }
  };
})();

const ItemManager = {
  items: [], 
  retrieveItemIndex(skuCode) {
    return this.items.findIndex(item => item.skuCode === skuCode);
  },
  retrieveItem(skuCode) {
    const index = this.retrieveItemIndex(skuCode);
    return this.items[index];
  },
  create(itemName, category, quantity) {
    const itemCreator = Object.create(ItemCreator);
    const item = itemCreator.init(itemName, category, quantity);
    if (item.notValid) {
      return false;
    }
    this.items.push(item);
  },
  update(skuCode, object) {
    const index = this.retrieveItemIndex(skuCode);
    Object.keys(object).forEach(property => {
      this.items[index][property] = object[property];
    });
  },
  delete(skuCode) {
    const index = this.retrieveItemIndex(skuCode);
    this.items.splice(index, 1);
  },
  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },
  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  }
};

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },
  createReporter(skuCode) {
    const item = this.items.retrieveItem(skuCode);
    return {
      itemInfo() {
        Object.entries(item).forEach(pair => {
          console.log(`${pair[0]}: ${pair[1]}`);
        });
      }
    };
  },
  reportInStock() {
    console.log(
      this.items
        .inStock()
        .map(item => item.itemName)
        .join(', ')
    );
  }
};

ItemManager.create('basket ball', 'sports', 0); // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5); // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3); // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3); // valid item

ItemManager.items;
// returns list with the 4 valid items  CHECK

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// // logs soccer ball,football,kitchen pot  CHECK

ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock();
// // returns list with the item objects for football and kitchen pot CHECK
ReportManager.reportInStock();
// // logs football,kitchen pot CHECK
ItemManager.itemsInCategory('sports');
// // returns list with the item objects for basket ball, soccer ball, and football CHECK
ItemManager.delete('SOCSP');
ItemManager.items;
// // returns list with the remaining 3 valid items (soccer ball is removed from the list) CHECK

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3
// CHECK

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
// CHECK

---------- MY 2nd Solution ----------
made items private in ItemManager (so it is retrieved with itemManager.items() method from outside instead of itemManager.items)

const ItemCreator = (function() {
  function isInvalidName(itemName) {
    return itemName.replace(' ', '').length < 5;
  }
  function isInvalidCategory(category) {
    return category.replace(' ', '').length < 5 || /^\S[\s]+\S$/.test(category);
  }
  function isInvalidQuantity(quantity) {
    return quantity === undefined;
  }
  function isInvalidItem(itemName, category, quantity) {
    return (
      isInvalidName(itemName) ||
      isInvalidCategory(category) ||
      isInvalidQuantity(quantity)
    );
  }
  function generateSku(itemName, category) {
    return itemName
      .replace(' ', '')
      .slice(0, 3)
      .concat(category.slice(0, 2))
      .toUpperCase();
  }

  return {
    init(itemName, category, quantity) {
      if (isInvalidItem(itemName, category, quantity)) {
        return false;
      }
      const skuCode = generateSku(itemName, category);
      return { skuCode, itemName, category, quantity };
    }
  };
})();

const ItemManager = (function() {
  const items = {}; // items private

  return {
    create(itemName, category, quantity) {
      const item = Object.create(ItemCreator).init(
        itemName,
        category,
        quantity
      );
      if (!item) {
        return false;
      }
      items[item.skuCode] = item;
      return item;
    },
    update(skuCode, object) {
      Object.assign(items[skuCode], object);
      return items[skuCode];
    },
    delete(skuCode) {
      delete items[skuCode];
      return true;
    },
    items() {
      // remove if we don't want access to items from outside
      return items;
    },
    inStock() {
      return Object.keys(items)
        .filter(skuCode => items[skuCode].quantity > 0)
        .map(skuCode => items[skuCode]);
    },
    itemsInCategory(category) {
      return Object.keys(items)
        .filter(skuCode => items[skuCode].category === category)
        .map(skuCode => items[skuCode]);
    },
    getItem(skuCode) {
      return items[skuCode];
    }
  };
})();

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },
  reportInStock() {
    this.items.inStock().forEach(item => {
      console.log(item.itemName);
    });
  },
  createReporter(skuCode) {
    const item = this.items.getItem(skuCode);
    return {
      itemInfo() {
        Object.entries(item).forEach(pair => {
          console.log(`${pair[0]}: ${pair[1]}`);
        });
      }
    };
  }
};

ItemManager.create('basket ball', 'sports', 0); // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5); // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3); // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3); // valid item

const ItemManager = (function() {
  const items = {}; // items private 
  return {
    create(itemName, category, quantity) {
      const item = Object.create(ItemCreator).init(
        itemName,
        category,
        quantity
      );
      if (!item) {
        return false;
      }
      items[item.skuCode] = item;
      return item;
    },
    update(sku, object) {
      Object.assign(items[sku], object);
      return items[sku];
    },
    delete(sku) {
      delete items[sku];
      return true;
    },
    items() {   // remove if we don't want access to items from outside 
      return items;
    },
    inStock() {
      return Object.keys(items)
        .filter(skuCode => items[skuCode].quantity > 0)
        .map(skuCode => items[skuCode]);
    },
    itemsInCategory(category) {
      return Object.keys(items)
        .filter(skuCode => items[skuCode].category === category)
        .map(skuCode => items[skuCode]);
    },
    getItem(skuCode) {
      return items[skuCode];
    }
  };
})();

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },
  reportInStock() {
    this.items.inStock().forEach(item => {
      console.log(item.itemName);
    });
  },
  createReporter(skuCode) {
    const item = this.items.getItem(skuCode);
    return {
      itemInfo() {
        Object.entries(item).forEach(pair => {
          console.log(`${pair[0]}: ${pair[1]}`);
        });
      }
    };
  }
};


------------ LS Solution -------------

var ItemCreator = (function() {
  function generateSkuCode(itemName, category) {
    return (itemName.replace(/\s/g, '').slice(0, 3).toUpperCase() +
            category.replace(/\s/g, '').slice(0, 2).toUpperCase());
  }

  function isValidItemName(itemName) {
    return itemName.replace(/\s/g, '').length >= 5;
  }

  function isValidCategory(category) {
    return category.replace(/\s/g, '').length >= 5 && category.split(' ').length === 1;
  }

  function isQuantityProvided(quantity) {
    return quantity !== undefined
  }

  return function(itemName, category, quantity) {
    if (isValidItemName(itemName) && isValidCategory(category) && isQuantityProvided(quantity)) {
      this.skuCode = generateSkuCode(itemName, category);
      this.itemName = itemName;
      this.category = category;
      this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  };
})();

var ItemManager = {
  items: [],
  getItem: function(skuCode) {
    return this.items.filter(function(item) {
      return item.skuCode === skuCode;
    })[0];
  },

  create: function(itemName, category, quantity) {
    var item = new ItemCreator(itemName, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
    }
  },

  update: function(skuCode, itemInformation) {
    Object.assign(this.getItem(skuCode), itemInformation);
  },

  delete: function(skuCode) {
    this.items.splice(this.items.indexOf(this.getItem(skuCode)), 1);
  },

  list: function() {
    return this.items;
  },

  inStock: function() {
    return this.items.filter(function(item) {
      return item.quantity > 0;
    });
  },

  itemsInCategory: function(category) {
    return this.items.filter(function(item) {
      return item.category === category;
    });
  },
};

var ReportManager = {
  init: function(itemManager) {
    this.items = itemManager;
  },

  createReporter(skuCode) {
    return (function() {
      var item = this.items.getItem(skuCode);
      return {
        itemInfo: function() {
          Object.keys(item).forEach(function(key) {
            console.log(key + ': ' + item[key]);
          });
        },
      };
    }).bind(this)();
  },

  reportInStock: function() {
    console.log(this.items.inStock().map(function(item) {
      return item.itemName;
    }).join(','))
  },
};

---------------  Discussion ---------------

The key take-away for this exercise is practicing creating and using objects that interact or collaborate with each other. 
The notable parts of the solution are the following:

- Using a constructor function that has private methods.
- Having an explicit return value for a constructor function.
- Maintaining a reference to an object using closures (i.e., createReporter method of ReportManager).

----------- Student Solutions -----------

#1: Pete Hanson 

const Item = function (itemName, category, quantity) {
  const okCategory = () => ((category.length >= 5) && !category.match(/ /));
  const okItemName = () => ((itemName.split(/ /).length <= 2) && (itemName.replace(/ /, '').length >= 5));
  const okQuantity = () => ((typeof quantity === 'number') || (quantity instanceof Number));

  const createSKU = () => {
    const sku = itemName.replace(/ /, '').substr(0, 3) + category.substr(0, 2);
    this.skuCode = sku.toUpperCase();
  };

  const initialize = () => {
    createSKU();
    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
    return this;
  };

  if (okItemName() && okCategory() && okQuantity()) {
    return initialize();
  }

  return { notValid: true  };
};

const ItemManager = {
  items: [],

  create(itemName, category, quantity) {
    const item = new Item(itemName, category, quantity);

    if (item.notValid) {
      return false;
    }

    this.items.push(item);
    return item;
  },

  delete(skuCode) {
    this.items = this.items.filter((item) => item.skuCode !== skuCode);
  },

  inStock() {
    return this.items.filter((item) => item.quantity > 0);
  },

  itemsInCategory(category) {
    return this.items.filter((item) => item.category === category);
  },

  itemsWithSKU(skuCode) {
    return this.items.filter((item) => item.skuCode === skuCode);
  },

  update(skuCode, values) {
    const whichItem = this.items.find((item) => item.skuCode === skuCode);

    if (whichItem) {
      Object.assign(whichItem, values);
    }
  },
};

const ReportManager = {
  createReporter(skuCode) {
    const item = this.item.itemsWithSKU(skuCode).pop();
    return {
      itemInfo() {
        const pairs = Object.entries(item);
        pairs.forEach((pair) => console.log(`${pair[0]}: ${pair[1]}`));
      },
    };
  },

  init(itemManager) {
    this.item = itemManager;
  },

  reportInStock() {
    consol.log(this.item.inStock().map((item) => item.itemName).join(','));
  },
};

// # 2: Jeremy Toulouse (strange solutions)

const [ItemManager, ReportManager] = (function () {
  const items = [];
  const helpers = {
      checkNameP: name => /\w{5,}/.test(name),
      checkCatP: cat => /^\w{5,}$/.test(cat),
      checkNumP: num => /^\d{1,}$/.test(num),
  };

  const ReportManager = {
      init: function(manager) { this.items = manager; },

      reportInStock: function () {
          const objInStock = this.items.inStock();
          const names = objInStock.map(it => it.itemName).join(',');
          return names;
      },

      createReporter: function (skuCode) {
          const context = this;
          return {
              itemInfo: function () {
                  const item = context.items.items.find(it => it.skuCode === skuCode);
                  ['skuCode', 'itemName', 'category', 'quantity'].forEach(p => console.log(`${p}: ${item[p]}`));
              },
          }
      },
  };

  const ItemManager = {
      items: items,

      create: function (name, cat, n) {
          const newItem = new ItemCreator(name, cat, n);
          if (newItem.notValid) return false;
          this.store(newItem);
          return true;
      },

      store: item => items.push(item),

      update: function(skuCode, obj) {
          const objToUpdate = items.find(it => it.skuCode === skuCode);
          Object.keys(obj).forEach(key => objToUpdate[key] = obj[key]);
          return this;
      },

      inStock: () => items.filter(it => it.quantity > 0),

      itemsInCategory: cat => items.filter(it => it.category === cat),

      delete: function (skuCode) {
          const idx = items.findIndex(it => it.skuCode === skuCode);
          items.splice(idx, 1);
      },
  };

  const ItemCreator = function (name, cat, n) {
      this.itemName = helpers.checkNameP(name.split(' ').join('')) ? name : null;
      this.category = helpers.checkCatP(cat) ? cat : null;
      this.quantity = helpers.checkNumP(n) ? n : null;
      this.notValid = false;

      if (Object.values(this).some(v => v === null)) {
          this.notValid = true;
          return this;
      }

      if (!this.notValid) {
          this.skuCode = this.generateSKUCode();
      }
  }

  ItemCreator.prototype.generateSKUCode = function () {
      const firstPart = this.itemName.split('').join('').slice(0, 3).toUpperCase();
      const secondPart = this.category.slice(0, 2).toUpperCase();
      return `${firstPart}${secondPart}`;
  }

  return [ItemManager, ReportManager];
}());