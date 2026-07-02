# ConstraintEngine
ConstraintEngine is an AI-powered full-stack application built for Software applications to extract constraints and analyze architecture.

<!-- ## Constraints simulated
- rate limiting
- latency measurement
- retry and failure recovery
- context window management
- async/queue based agentic cycle handling
- token/cost budgeting -->

## Tech Stack
- Backend
  - Node.js / Express.js
  - Typescript
  - Zod
  - Postgresql / Prisma ORM

- Agentic Layer
  - Fastapi (server)
  - Agno (agentic framework)
  - Google: ("gemini-2.5-flash")
  - Pydantic (schema validations)

- Frontend
  - Next.js
  - tailwind CSS

- Infrastructure
  - JWT (authentication)
  - REST API

---

## Features

### Project management
- user and guest user support
- project version & architecture tracking

### Project Constraint Extraction
- project requirement parsing
- structured constraint generation
- constraint validation using schemas

### Project Architecture analysis
- project architecture context management
- structured architecture recommendation
- flexible state modification on demand

---

<!-- ## General questions
- What if i ask/give input unrelated to project? (input validation and sanitization: zod schema->input length, code validation->llm content validation)
- what if i try to create unnecessary 10 projects? (rate limiting) -->
