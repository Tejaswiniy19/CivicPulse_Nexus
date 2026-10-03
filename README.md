# CivicPulse Nexus

Six-phase Executive Governance & Analytics platform.

## Stack
- Frontend: React + TypeScript + Vite
- Backend: Spring Boot + Spring Data JPA
- Database: MySQL 8.x (works with MySQL Workbench)

## Requirements
- JDK 21
- MySQL Server 8.x (MySQL84 is supported)
- Node.js + npm
- Internet access for the first Maven wrapper run and `npm install`

## 1. Create the database in MySQL Workbench
```sql
CREATE DATABASE IF NOT EXISTS civicpulse_db;
CREATE USER IF NOT EXISTS 'civicpulse'@'localhost' IDENTIFIED BY 'password';
ALTER USER 'civicpulse'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON civicpulse_db.* TO 'civicpulse'@'localhost';
FLUSH PRIVILEGES;
USE civicpulse_db;
```
Do not manually create the application tables. Hibernate creates/updates them on startup.

## 2. Start the backend (Windows)
```powershell
cd backend
.\mvnw.cmd clean spring-boot:run
```
No global Maven installation is required because the project includes the Maven Wrapper.

Backend: `http://localhost:8081`

## 3. Start the frontend
Open a second PowerShell:
```powershell
cd frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`

## 4. Verify MySQL
In Workbench:
```sql
USE civicpulse_db;
SHOW TABLES;
```
After the backend starts, Hibernate will have created the CivicPulse tables and the seed data will be inserted.

## Environment overrides
The backend accepts:
- `DB_URL` (default: `jdbc:mysql://localhost:3306/civicpulse_db?useSSL=false&serverTimezone=Asia/Kolkata&allowPublicKeyRetrieval=true`)
- `DB_USERNAME` (default: `civicpulse`)
- `DB_PASSWORD` (default: `password`)
- `PORT` (default: `8081`)
