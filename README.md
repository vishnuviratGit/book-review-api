## 📚 Book Review API

A RESTful API for managing books and user reviews, built using **Node.js**, **Express**, **MongoDB**, and **JWT** authentication.

---

## 🚀 Features

- JWT-based user authentication
- Add, view, update, and delete books
- Submit and manage reviews (1 per user per book)
- Book search by title or author
- Pagination for books and reviews


---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js (for password hashing)

---

## 📆 Project Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/vishnuviratGit/book-review-api.git
   cd book-review-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` File**

   ```bash
   touch .env
   ```

   Add the following to your `.env` file:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the Server**

   ```bash
   node index.js
   ```

   Server will start on `http://localhost:5000`.

---

## 📬 API Endpoints

### 🔐 Authentication

- **POST /signup**
  ```json
  {
    "name" : "vishnu",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /login**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

---

### 📚 Books

> Requires `Authorization: Bearer <token>`

- **POST /books** – Add a new book  
- **GET /books** – Get all books  
  Optional query params: `?author=name&genre=genre&page=1&limit=10`
- **GET /books/:id** – Get book by ID, includes:
  - Average rating
  - Paginated reviews: `?page=1&limit=5`

---

### 💬 Reviews

> Requires `Authorization: Bearer <token>`

- **POST /books/:id/reviews** – Submit a review (only one per user)
- **PUT /reviews/:id** – Update your own review
- **DELETE /reviews/:id** – Delete your own review

---

### 🔍 Search

- **GET /search?q=keyword**  
  Searches by title or author (case-insensitive)

---

## 📄 Example `curl` Commands

**Login and get a token**

```bash
curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{"email":"kiran@gmail.com", "password":"123"}'
```

**Add a book (authenticated)**

```bash
curl -X POST http://localhost:5000/books -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title":"Lord of Rings","author":"Tolkin","genre":"Fiction"}'
```
**Add a review (authenticated)**

```bash
curl -X POST http://localhost:5000/books/:id/reviews -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"rating":"4","comment":"Best book ever read"}'
```

**Search books**

```bash
curl http://localhost:5000/search?q=chetan
```

---

## 🧠 Design Decisions and Assumptions

- **JWT** is stored in the `Authorization` header as `Bearer <token>`.
- Each user can submit only **one review per book**.
- Passwords are securely hashed using **bcrypt**.
- MongoDB is used due to its document-based flexibility for reviews and nested data.

---

## 📃 Database Schema (MongoDB)

### 📘️ Book

```js
{
  title: String,
  author: String,
  genre: String,
  reviews: [ObjectId] // Reference to Review
}
```

### 👤 User

```js
{
  name: String,
  email: String,
  password: String
}
```

### ✍️ Review

```js
{
  book: ObjectId, // Reference to Book
  user: ObjectId, // Reference to User
  rating: Number,
  comment: String
}
```

---





