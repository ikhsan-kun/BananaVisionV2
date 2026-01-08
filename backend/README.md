# Express MongoDB API with Prisma

REST API sederhana menggunakan Express, MongoDB, dan Prisma ORM.

## 📦 Library yang Digunakan

- [express](https://expressjs.com/) - Framework utama REST API
- [body-parser](https://www.npmjs.com/package/body-parser) - Parsing request body
- [cors](https://www.npmjs.com/package/cors) - Mengaktifkan CORS
- [express-validator](https://express-validator.github.io/) - Validasi input
- [@prisma/client](https://www.prisma.io/docs/concepts/components/prisma-client) - ORM Prisma Client
- [prisma](https://www.prisma.io/docs/concepts/components/prisma-cli) - CLI Prisma (dev only)
- [mongodb](https://www.npmjs.com/package/mongodb) - Driver MongoDB untuk Node.js
- [nodemon](https://www.npmjs.com/package/nodemon) - Auto-restart server saat development
- [router](https://www.npmjs.com/package/router) - Routing tambahan (opsional)

## 🚀 Instalasi

```bash
npm install express body-parser cors express-validator @prisma/client mongodb router
npm install --save-dev prisma nodemon
```

## ⚡️ Prisma Setup

```bash
npx prisma init
# Edit .env dan schema.prisma sesuai kebutuhan
npx prisma generate
npx prisma db push
```

## 🏃 Menjalankan Server

```bash
npm run dev
# atau
npm start
```

## 📂 Struktur Project

- `app.js` - Entry point aplikasi