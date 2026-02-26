# Knowledge Sharing Platform - Frontend

## Approach
- Stack: React + Vite + React Router + Axios + React Quill.
- Focused on assignment-required pages and flows.
- Auth state managed via context and localStorage token.

## Folder Structure
- `src/api`: API wrappers
- `src/components`: shared UI components
- `src/context`: auth context
- `src/pages`: route pages

## Key Design Decisions
- Protected routes for create/edit/dashboard.
- Home page supports search and category filter.
- Rich text editor via React Quill in article form.
- AI helper buttons integrated in create/edit flow.

## AI Usage (Mandatory)
- AI tools used during development: ChatGPT.
- AI helped with:
  - UI page flow design based on assignment requirements
  - Component/module breakdown
  - API integration scaffolding
  - Styling baseline for responsive layout
- Manual review/corrections:
  - Ensured route protection logic
  - Synced field names with backend payloads
  - Added dashboard delete/edit/view actions

## Setup Instructions
### Prerequisites
- Node.js 18+
- Backend running on `http://localhost:5000`

### Environment Variables
1. Copy `.env.example` to `.env`
2. Set `VITE_API_BASE_URL`

### Install & Run
```bash
cd frontend
npm install
npm run dev
```

### Frontend URL
- `http://localhost:5173`
