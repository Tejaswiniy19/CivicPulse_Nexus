# CivicPulse Nexus — Windows Setup (MySQL Workbench)

## 1. Required software
- JDK 21
- MySQL Server 8.x (your `MySQL84` service is already running)
- MySQL Workbench
- Node.js LTS + npm

Docker is **not required**. Global Maven is **not required** because `backend\mvnw.cmd` is included.

## 2. Database
Open MySQL Workbench and run:
```sql
CREATE DATABASE IF NOT EXISTS civicpulse_db;
CREATE USER IF NOT EXISTS 'civicpulse'@'localhost' IDENTIFIED BY 'password';
ALTER USER 'civicpulse'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON civicpulse_db.* TO 'civicpulse'@'localhost';
FLUSH PRIVILEGES;
```

## 3. Backend
```powershell
cd C:\Users\yerra\Downloads\CivicPulse_Nexus\backend
.\mvnw.cmd clean spring-boot:run
```

## 4. Frontend
```powershell
cd C:\Users\yerra\Downloads\CivicPulse_Nexus\frontend
npm install
npm run dev
```
