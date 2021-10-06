# Amazona ECommerce Website 

# Angular & Node Tutorial - Full ECommerce in 5 Hours [2021]
Welcome to my Angular and Node tutorial to build a fully-functional e-commerce website exactly like amazon. Open your code editor and follow me for the next hours to build an e-commerce website using MEAN stack (MongoDB, ExpressJS, Angular and Node.JS).

## Demo Website

- 👉 Heroku : [https://angular-amazona.herokuapp.com](https://angular-amazona.herokuapp.com)


## You Will Learn

- Angular: Components, Services, RXJS
- Node & Express: Web API, Body Parser, File Upload, JWT
- MongoDB: Mongoose, Aggregation
- Development: ESLint, Babel, Git, Github,
- Deployment: Heroku

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:basir/angular-amazona.git
$ cd angular-amazona
```

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/amazona  
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb+srv://your-db-connection

### 3. Run Backend

```
$ cd backend
$ npm install
$ npm start
```

### 4. Run Frontend
open new terminal
```
$ cd frontend
$ npm install
$ npm start
```

### 5. Seed Users and Products

- Run this on chrome: http://localhost:5000/api/users/seed
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products/seed
- It creates 6 sample products

### 6. Admin Login

- Run http://localhost:4200/login
- Enter admin email and password and click login

## Support

- Contact Instructor: [Basir](mailto:basir.jafarzadeh@gmail.com)

## Promo Video Script
Hello and Welcome to my coding course to build an ecommerce website like amazon by MERN Stack. In this course You will learn the essential tools and skills to design, develop and deploy a fully-function website like amazon using Angular in frontend and Node and MongoDB in backend.

My name is Basir and I’ll be your instructor in this course. I have 17 years of coding experience in international companies like ROI Vision in Montreal, 
and now I am a coding instructor with more than 50 thousands students around the world.

I designed this course for anyone seeking to develop a fully-functional ecommerce website like amazon. By the end of this course you’ll be able to design a responsive template, implement a user-friendly frontend and build a scalable backend. Also you can deploy the website on cloud servers like Heroku and connect it to a payment gateways for online payment.

You need to open a code editor along with me and start coding throughout this course.
I teach you:

- Creating components by Angular
- Defining different screens using router
- Using Reactive Form to handle form inputs and fetch backend api
- Handling shopping cart using services and local storage
- Building backend web api by node and express js
- Creating MongoDB database and performing CRUD operations on database models by mongoose
- Handling auth and authorization using JsonWebToken and express middleware
- Creating admin dashboard to show sales charts, manage products and handle orders

Also you will learn how to use online cloud services to:
- Upload product images on Cloudinary
- Email order receipts to customers by Mailgun
- Pay order using PayPal and  Stripe
- Choose shipping address on Google Map
- and Deploy website on Heroku and MongoDB Atlas

I have used the latest version of Angular, node and other package in this course and I keep the update regularly. If you run into any errors or questions you can ask them in Q/A and I answer them on a 1.
Hello and welcome to Food Mine Course a coding course to make a food store using angular and nodejs.
In this course you will learn every bit of what you need to build a fully functional food delivery website from scratch.
2.
My name is Nasir and I'll be your instructor in this course
I have 10 years of experience in the software development industry with hundreds of students around the world.
3.
I designed this course for anyone aiming to develop a delicious web application using angular and node
you'll be able to design a responsive and user friendly frontend and build an scalable backend, also you can connect your food store to payments gateways and publish that on the internet.
4.
you just need to open up the code editor along with me and start coding throughout this course.
I'll teach you:
- Angular basics like creating components and services, working with router, one way and two bindings and how to implement them, 
- Type script basics like creating classes and having strongly type checkings
- CSS Styling for laying out the website to make it beautiful and easy to use
- Node.JS to create backend API  
- Mongodb to create database to save foods and cusotmers
- JWT for implementing the Auth mechanism
- PayPal API to make online payments inside your website


5.
I will update the corresponding videos if there is a new version of any tools that we use in this course,
such as Angular, nodejs, so don't worry, it's going to be an up to date course.
This course is very easy to learn and simple to follow, but if you had any problems, feel free to ask your questions from me, I will answer them in the shortest time possible, Hope to see you in the course.



This course is for anyone who wants to be a developer and find a job in more than 22 mil job opportunities around the world. The only requirement for this course is knowing the Basics of HTML, CSS and JS.
Feel free to take a look at the course preview and enroll if it's along with your enthusiasm.daily basis.

I designed this course for web developers and entrepreneurs.

If you are or want to a web developer, take this course to become a professional web developer, have a great project in your portfolio and get a job in 22 million job opportunities around the world. 

If you are a entrepreneurs, take this course to to launch your startup and sell your products and services using this fully-functional ecommerce website and earn money from your idea.

The only requirement for this course is having basic knowledge on Angular and Node.js.

Feel free to take a look at the course preview and enroll if it is along with your ambitions.

 

## Lessons

1. Introduction
   1. What you will learn
   2. What you will build
   3. What Packages you will use
2. Install Tools
   1. VS Code & Extensions
   2. Chrome
   3. Node.js
   4. MongoDB
3. Create Angular App
   1. ng new angular-amazona -S
   2. add layout component
   3. add header, main and footer
   4. add angular material
   5. add css to header, main and footer
4. Publish On Github
   1. remove .git in frontend folder
   2. copy frontend/.gitignore to parent folder
   3. create github account
   4. click on source control and publish to github
5. List Products
   1. add data.js
   2. add images
   3. render products
6. Create Route For Home Page
   1. create home page component
   2. add routing
   3. copy app to home page
   4. create products.js file

7. Route Product Details Page
   1. Make Product cards linkable
   2. Create /product/[slug] route
   3. find product based on slug
8. Create Product Details Page
   1. Create 3 columns
   2. show image in first column
   3. show product info in second column
   4. show add to cart action on third column
   5. add styles
9.  Add MaterialUI Theme
    1.  create theme
    2.  use theme provider
    3.  add h1 and h2 styles
    4.  set theme colors
10. Create Application Context
    1.  define context and reducer
    2.  set darkMode flag
    3.  create store provider
    4.  use it on layout
11. Connect To MongoDB
    1.  install mongodb
    2.  install mongoose
    3.  define connect and disconnect 
    4.  use it in the api
12. Create Products API
    1.  create product model
    2.  seed sample data
    3.  create /api/products/index.js
    4.  create product api
13. Fetch Products From API
    1. use getServerSideProps()
    2. get product from db
    3. return data as props
    4. use it in product screen too
14. Implement Add to cart
    1.  define cart in context
    2.  dispatch add to cart action
    3.  set click event handler for button
15. Create Cart Screen
    1.  create cart.js
    2.  redirect to cart screen
    3.  use context to get cart items
    4.  list items in cart items
16. Use Dynamic Import In Cart Screen
    1. Use next/dynamic 
    2. Wrap cart in dynamic with out ssr
17. Update Remove Items In Cart
    1.  Implement onChange for Select
    2.  Show notification by notistack
    3.  implement delete button handler
18. Create Login Page
    1.  create form
    2.  add email and password field
    3.  add login button
    4.  style form
19. Create Sample Users
    1.  create user model
    2.  add sample user in seed api
20. Build Login API
    1.  use jsonwebtoken to sign token
    2.  implement login api
21. Complete Login Page
    1.  handle form submission
    2.  add userInfo to context
    3.  save userInfo in cookies
    4.  show user name in nav bar using menu
22. Create Register Page
    1.  create form
    2.  implement backend api
    3.  redirect user to redirect page
23. Login and Register Form Validation
    1.  install react-hook-form
    2.  change input to controller
    3.  use notistack to show errors
24.  Create Shipping Page
    4.  create form
    5.  add address fields
    6.  save address in context
25. Create Payment Page
    1.  create form
    2.  add radio button
    3.  save method in context
26. Create Place Order Page
    1.  display order info
    2.  show order summary
    3.  add place order button
27. Implement Place Order Action
    1.  create click handler
    2.  send ajax request
    3.  clear cart
    4.  redirect to order screen  
    5.  create backend api
28. Create Order Details Page
    1.  create api to order info
    2.  create payment, shipping and items
    3.  create order summary
29. Pay Order By PayPal
    1.  install paypal button
    2.  use it in order screen
    3.  implement pay order api
30. Display Orders History
    1. create orders api
    2. show orders in profile screen
 1.  Update User Profile
    3. create profile screen
    4. create update profile api
 2.  Create Admin Dashboard
    5. Create Admin Menu
    6. Add Admin Auth Middleware  
    7. Implement admin summary api
 3.  List Orders For Admin
     1.  fix isAdmin middleware
     2.  create orders page
     3.  create orders api
     4.  use api in page
 4.  Deliver Order For Admin
     1.  create deliver api
     2.  add deliver button
     3.  implement click handler
 5.  List Products For Admin
     1.  create products page
     2.  create products api
     3.  use api in page
 6.  Create Product Edit Page
     1.  create edit page
     2.  create api for product
     3.  show product data in form
 7.  Update Product
     1.  create form submit handler
     2.  create backend api for update
 8.  Upload Product Image
     1.  create cloudinary account
     2.  get cloudinary keys
     3.  create upload api
     4.  upload files in edit page
 9.  Create And Delete Products
     1.  add create product button
     2.  build new product api
     3.  add handler for delete
     4.  implement delete api
 10. List Users For Admin
     1.  create users page
     2.  create users api
     3.  use api in page
 11. Create User Edit Page
     1.  create edit page
     2.  create api for user
     3.  show user data in form
 12. Deploy on Vercel
     1.  create vercel account
     2.  connect to github
     3.  create altas mongodb db
     4.  push code to github
 13. Review Products
     1.  add reviews model
     2.  create api for reviews
     3.  create review form
     4.  show reviews on home screen
 14. Create Sidebar
     1.  add drawer
     2.  list categories
     3.  redirect to search screen
 15. Create Search Box
     1.  add form
     2.  handle form submit
     3.  redirect to search screen
 16. Create Search Page
     1.  create filters
     2.  list products
     3.  show filters
 17. Add Carousel
     1.  create featured products
     2.  feed carousel data
     3.  show popular products
 18. Choose Location on Map
     1.  add google map
     2.  create map screen
     3.  choose location
     4.  show in order screen
 
 