# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
Kindly find the endpoints for the application in the readme file.

## Database Schema
The database schema contains four tables 
- users table to save users information.
- product table to save products information.
- orders table to save the order main information.
- invoice table to save the items of the order.


#                                     Table "public.product"
  Column  |          Type          | Collation | Nullable |               Default
----------+------------------------+-----------+----------+-------------------------------------
 id       | integer                |           | not null | nextval('product_id_seq'::regclass)
 name     | character varying(500) |           |          |
 price    | numeric(12,2)          |           |          |
 category | character varying(100) |           |          |
Indexes:
    "product_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "invoice" CONSTRAINT "invoice_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT
    TABLE "orders" CONSTRAINT "orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT


#                               Table "public.orders"
    Column    |  Type   | Collation | Nullable |              Default
--------------+---------+-----------+----------+------------------------------------
 id           | integer |           | not null | nextval('orders_id_seq'::regclass)
 product_id   | integer |           |          |
 quantity     | integer |           |          |
 user_id      | integer |           |          |
 order_status | boolean |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
Referenced by:
    TABLE "invoice" CONSTRAINT "invoice_orders_id_fkey" FOREIGN KEY (orders_id) REFERENCES orders(id) ON DELETE RESTRICT


#                                 Table "public.invoice"
   Column   |     Type      | Collation | Nullable |               Default
------------+---------------+-----------+----------+-------------------------------------
 id         | integer       |           | not null | nextval('invoice_id_seq'::regclass)
 product_id | integer       |           | not null |
 orders_id  | integer       |           | not null |
 quantity   | integer       |           | not null |
 unit_price | numeric(12,2) |           | not null |
Indexes:
    "invoice_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "invoice_orders_id_fkey" FOREIGN KEY (orders_id) REFERENCES orders(id) ON DELETE RESTRICT
    "invoice_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT


#                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name | character varying(100) |           |          |
 last_name  | character varying(100) |           |          |
 email      | character varying(100) |           |          |
 password   | character varying(500) |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT

