# Storefront Backend Project

## Getting Started

This is a Backend project that Represents the backend functionality of store .

# Available Services and endpoints.

Main Endpoint : http://localhost:3030/

# Product Services:
Index : /products [GET]
Show by ID : /products/:id [GET]
Update : /products/:id [PUT]
Create : /products [POST]
Delete : /products/:id [DELETE]
Show Top Five Popular : /topProducts [GET]
Show by Category : /products/:category [GET]

# orders Services:
Index : /orders [GET]
Show by ID : /orders/:id [GET]
Update : /orders/:id [PUT]
Create : /orders [POST]
Delete : /orders/:id [DELETE]
UnCompeleted Order : /currentOrder/:userId [GET]
Compeleted Orders : /completedOrders/:userId [GET]

# users Services:

Show by ID : /users/:id [GET]
Update : /users/:id [PUT]
Create : /users [POST]
Delete : /users/:id [DELETE]
Login : /auth [POST]

# Database Tables:
we have three tables, the creation script could be found in the migration folder under the sql folder.
Users, Orders and product.


# Creating Database and User Needed to run this Project.

To be able to run this project you need to create the database user and give it create database permission.
run the following command on psql server
- `CREATE USER store_front_usr WITH PASSWORD 'store';`
- `alter user store_front_usr createdb;`

run the following command on node server to create the database.
- `db-migrate db:create dev`
- `db-migrate up`

then you can start the project by running the following command:
- `npm run start`

You Can run the Tests using Command:
- `npm run test`

Use Lint using: 
- `npm run lint` 

Run Prettier using:
- `npm run prettier`

-- Note That env file is added to the repo to be able to run this project.
