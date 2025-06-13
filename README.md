# 🔐 service-authentication

A secure, scalable authentication microservice built with **Node.js** and **Express**, featuring:

- ✅ JWT-based authentication
- 🔁 Refresh token flow
- 🔒 Password hashing with bcrypt
- 🧰 RESTful API endpoints
- ♻️ Stateless auth system (token-based)

---

## 🚀 Features

- User registration & login
- JWT access and refresh tokens
- Token renewal endpoint
- Secure password storage (bcrypt)
- Environment-based config management
- Express middleware for route protection

---

## 🛠️ Tech Stack

- **Node.js 18+**
- **Express.js**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**
- (Optional) MongoDB / PostgreSQL / Redis

---

## 📦 Getting Started

```bash
git clone https://github.com/your-username/service-authentication.git
cd service-authentication
npm install
cp .env.example .env  # fill in your env variables
npm run dev
