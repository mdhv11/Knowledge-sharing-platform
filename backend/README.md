# Knowledge Sharing Platform - Backend

## Approach
- Stack: Node.js, Express, MySQL, JWT, OpenAI SDK.
- API-first architecture with clear separation: `routes -> controllers -> services -> db`.
- AI integrations are centralized in `src/services/aiService.js`.

## Folder Structure
- `src/config`: database config
- `src/controllers`: API handlers
- `src/middleware`: auth and error handling
- `src/routes`: route definitions
- `src/services`: AI integrations
- `src/utils`: helpers
- `sql/schema.sql`: DB schema

## Key Design Decisions
- JWT auth with middleware-protected routes.
- Author-only edit/delete checks in backend controllers.
- Summary generation is automatic on create/update.
- OpenAI model and key are environment-driven.

## AI Usage (Mandatory)
- AI tools used during development: ChatGPT.
- AI helped with:
  - Express project structure and route planning
  - CRUD/API design and error flow drafting
  - OpenAI integration pattern for rewrite/summary/tag suggestion
  - README drafting and assignment checklist mapping
- Manual review/corrections:
  - Tightened authorization checks (`author_id` validation)
  - Added fallback behavior when OpenAI key is missing
  - Refined SQL schema and indexing

## Setup Instructions
### Prerequisites
- Node.js 18+
- MySQL 8+

### Environment Variables
1. Copy `.env.example` to `.env`
2. Fill DB and OpenAI values

### Database Setup
1. Create database and tables:
```sql
SOURCE sql/schema.sql;
```

### Install & Run
```bash
cd backend
npm install
npm run dev
```

### Base URL
- `http://localhost:5000`

### Main APIs
- Auth: `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`
- Articles: `GET /api/articles`, `GET /api/articles/:id`, `POST /api/articles`, `PUT /api/articles/:id`, `DELETE /api/articles/:id`, `GET /api/articles/mine/list`
- AI: `POST /api/ai/improve`, `POST /api/ai/summary`, `POST /api/ai/tags`
