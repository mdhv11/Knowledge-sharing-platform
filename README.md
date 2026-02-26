# Knowledge Sharing Platform with AI Assist (CDAC 2026)

This workspace contains:
- `backend/` - Express + MySQL + OpenAI API integration
- `frontend/` - React + rich text editor (React Quill)

## Quick Start
1. Setup MySQL and run [`backend/sql/schema.sql`](/home/mdhv11/Codes/Assignment/backend/sql/schema.sql)
2. Configure env files:
- `backend/.env` (use `.env.example`)
- `frontend/.env` (use `.env.example`)
3. Run backend:
```bash
cd backend
npm install
npm run dev
```
4. Run frontend:
```bash
cd frontend
npm install
npm run dev
```

## Required Demo Flow Checklist
- Signup/Login
- Create article with rich editor
- Use “Improve with AI” and “Preview Summary”
- Edit/Delete own article from dashboard
- Search and filter on home page
