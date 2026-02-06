# Planora — Task Manager (Full-Stack)

A full-stack task manager application built with **Laravel** (backend) and **Next.js** (frontend).  
This project allows users to create, manage, and track tasks with role-based access. Built for real-time task management with a modern UI.

## Features
- User authentication (JWT / Laravel Passport)
- Task CRUD (Create, Read, Update, Delete)
- Role-based permissions (Admin, User)
- Task categories (optional)
- Dashboard with statistics
- Responsive UI built with Next.js and styled components

## Tech Stack
- Backend: Laravel (PHP)
- Frontend: Next.js (React)
- Database: MySQL
- Authentication: Laravel Passport / JWT

## Project Structure
- `/planora-core` - Laravel API for managing tasks, users, and authentication
- `/planora-next` - Next.js app providing the UI for task management and dashboard

## Getting Started

### Backend
```bash
cd planora-core
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend
```bash
cd planora-next
npm install
npm run dev
```

## Screenshots
![Task List](./screenshots/index.png)
![Login](./screenshots/login.png)
