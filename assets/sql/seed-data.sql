use bamazonDB; 

insert into products (product_name, department_name, price, stock_quantity)
values ("MacBook Pro", "Laptops", 1000.00, 12);
insert into products (product_name, department_name, price, stock_quantity)
values ("Samsung Galaxy S8", "Cell Phones", 800.00, 15);
insert into products (product_name, department_name, price, stock_quantity)
values ("iPhone 8", "Cell Phones", 350.00, 18);
insert into products (product_name, department_name, price, stock_quantity)
values ("HP laptop", "Laptops", 500.00, 120);
insert into products (product_name, department_name, price, stock_quantity)
values ("Dell Laptop", "Laptops", 850.00, 52);

select * from products;
