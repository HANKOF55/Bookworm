# 📚 Book Management Application (Full Stack)

This is a full-stack book management application built with a **React.js frontend** and a **Node.js + Express.js backend**.  
The project is currently under active development with a focus on building **clean, scalable, and production-ready backend logic** along with a modern frontend.

At the current stage:
- The frontend is initialized using React.js.
- The backend contains basic API routes and controllers for managing books (CRUD operations).

---

## 🗂 Project Structure

```javascript
    root/
├─ frontend/ # React.js frontend
├─ backend/ # Node.js + Express.js backend
└─ README.md
```

---

## 🌐 Frontend

### 📁 Folder Structure

```javascript
frontend/
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ App.jsx
│ └─ main.jsx
└─ package.json
```


### 🛠 Technologies Used
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3

### 🧩 Components
Reusable UI elements used across the application.

- **Navbar** – Handles navigation across pages  
- **BookCard** – Displays individual book details  
- **Pagination** – Handles paginated book listing  

*(Components will expand as the project grows.)*

---

### 📄 Pages
Pages represent complete views of the application.

- **Home Page** – Displays a paginated list of books  
- **Book Details Page** – Displays details of a single book  
- **Create / Update Book Page** – Form to add or edit a book  

*(UI implementation is in progress.)*

---

## 🧠 Backend

### 📁 Folder Structure

```javascript
backend/
├─ controllers/
│ └─ book.controller.js
├─ routes/
│ └─ book.routes.js
├─ models/
│ └─ book.model.js
├─ app.js
└─ server.js
```


### 🛠 Technologies Used
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JavaScript

---

## 🔗 API Routes Overview

Base URL:

`/api/v1/books`


### 📌 Book Routes & Controllers

- **GET `/api/v1/books`**  
  → `getBooks` controller  
  → Fetches all books with pagination and limit support  

- **GET `/api/v1/books/:id`**  
  → `getBookById` controller  
  → Fetches a single book by its ID  

- **POST `/api/v1/books`**  
  → `postBook` controller  
  → Creates a new book  

- **PATCH `/api/v1/books/:id`**  
  → `updateBook` controller  
  → Updates an existing book  

- **DELETE `/api/v1/books/:id`**  
  → `deleteBook` controller  
  → Deletes a book by ID  

---

## 🎯 Current Status

- ✅ Project structure initialized
- ✅ React frontend setup
- ✅ Express backend setup
- ✅ Book CRUD controllers implemented
- 🚧 Frontend UI and advanced backend features in progress

---

## 🚀 Future Improvements

- Authentication & authorization
- Advanced filtering & search
- Global error handling
- Service-layer architecture
- UI/UX enhancements
- Deployment setup

---

## 👨‍💻 Author

**Harish**  
MERN Stack Developer  
Focused on building clean, scalable, and production-ready applications.

---

## 📄 License

This project is open-source and available for learning and development purposes.

