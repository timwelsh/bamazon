var inquirer = require("inquirer");
var mysql = require("mysql");
require("dotenv").config();
var keys = require("./keys.js");
var strpad = require('strpad');

// const connection = mysql.createConnection(keys.dbaccess); 
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "bamazonDB"
});

  connection.connect(function(err) {
    if (err) console.log(err);
    showProducts();
  });

function updateQty (id, quantity, callback) {
  connection.query(`Update products Set stock_quantity = ${quantity} where id = ${id}`, callback);
}

function getProduct (id, callback) {
  connection.query(`Select * From products where id = ${id}`, callback);
}

function showProducts() {
  connection.query(`Select id, product_name, price From products where stock_quantity > 0`, (err, res) => {
      if(err) console.log(err);
      console.log(res);
      // for (let i = 0; i < res.length; i ++) {
      //   console.log(`${strpad.center(res[i].id, 6)} 
      //   | ${strpad.right(res[i].product_name, 20)} 
      //   | ${strpad.right(res[i].department_name, 20)} 
      //   | ${strpad.left(res[i].price.toFixed(2), 8)} 
      //   | ${strpad.left(res[i].stock_quantity, 4)}`);
      // }
      begin();
  });
}

function begin() {
    inquirer
    .prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the item you would like to buy'
        },
        {
          type: 'input',
          name: 'quantity',
          message: 'Quantity to buy?'  
        }
    ])
    .then(function(res) {

      getProduct (res.id, function(err, products) {

        if(err) throw err;
          console.log(products);
          const qty = products[0].stock_quantity;
          const price = products[0].price;

          if ( qty < res.quantity ) {
            console.log(`Only ${qty} left, bye bye`);
            connection.end();
          } else {
            const newQty = qty - res.quantity;

            updateQty (res.id, newQty, function(err) {
              if(err) console.log(err);
                console.log(`Your total is $${price * res.quantity} for ${res.quantity} of ${products[0].product_name}`);
                connection.end();

                inquirer
                  .prompt([
                    {
                      type: 'confirm',
                      name: 'confirm',
                      message: 'Are you sure?',
                    }
                  ])
                  .then (function(res) {
                    if (res.confirm === true) {
                      console.log(`A ${products[0].product_name} is on the way`);
                    } else {
                      console.log(`You changed your mind`);
                    }
                  })
            });
          }
        });
    });
}