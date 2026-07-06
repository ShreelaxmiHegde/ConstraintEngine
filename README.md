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

## Case Studies

### 1. Designing AI Backend That Rejects Bad Requests Before They Reach The LLM
The project ConstraintEngine primarily deals with AI agents for project constraint extraction and making architectural decisions. Every single call to these endpoints, invoke an LLM to produce result. It comes with LLM cost, latency and intended output generations. As inputs will be sent by the user, its crucial to handle <i>What is being fed to the LLM/Agent.</i>.

For example, the possible invalid requests are:
- invalid schema type
- input length/word count
- gibberish texts: "adfj;aksjd adfjsd lj"
- unexpected content: "why is the sky blue?"
etc.

So, the request structure and the inside content should be sanitized and validated.

I designed this pipeline to achieve the goal:

Client Request
1. Schema validation (Zod)
2. Basic input check (length/word count)
3. Gibberish/code detection
4. Light LLM content validation
5. DB save
6. AI Agent invocation

Before the request hits the AI Agent, it should successfully pass all the checks. Failed checks will be rejected ensuring consistant contents only be stored and processed by the AI agent. 

### 2. Rate Limiting Requests With Product POV
In ConstraintEngine, Rate limiting applied 
- to LLM endpoints only
- before validating the request content and processing it

I implemented a custom Rate Limiter using Forward Window Algorithm based on client IP.

There are 2 endpoints which use the rate limiter:
1. project constraint extraction (POST `/projects/`)

here, my rate limiter limits max 2 project creation for a week timeframe. Because a user creating 3+ projects in a week is quite unusual and not reasonable.

2. project architecture decision (POST `/ask/`)

The rate limiter limits at most 5 conversational exchanges a day. The rate limiter counts the valid and invalid requests. So that it can prevent unnecessary content validation requests and promote genuine architectural discussions by users.

*I chose to implement it on my own to understand the mechanism and wanted to keep it lightweight. I had options to use packages like `express-rate-limiter` but for just 2 endpoints, it was kinda overkill..


### 3. Reasons To Structure The AI Agent Endpoints The Way It Is And The Tradeoffs
This is the structure of the AI agent endpoints in ConstraintEngine:

1. Logical Input validation [Validating schema, text length, detecting gibberish]
2. Rate Limiter
3. Light LLM content validation
4. DB save
5. AI Agent invocation
6. DB save

In the higher level pov, they are structured <b>low to high expensive</b> tasks order.

- Why to have rate limiter before the LLM content validation?
the Rate Limiter which runs before LLM content validation to prevent LLM cost on requests.

- Why LLM content validation? why not do at the time of actual agent processing?
This tradeoff comes with small preprocessing cost but significantly reduces unnecessary LLM requests and keeps the database clean. Its was possible to reject when the AI agent finds the request invalid but while reaching there, it already have increased latency, processing cost and have saved inconsistant data in the database.

- Why to save data before and after AI agent response (twice) not doing once after AI agent responds?
After LLM content validation, the backend will save the data and pass the controll to AI agent. And it again makes DB call to save what the AI agent has responded. I implemented this way to have room for retries. i.e, if some internal error happens while AI agent invocation, then the user request also gone if we dont save it. So, here making the tradeoff between the DB calls and Request retry was reasonable.

### 4. Designing Database and Content Schema Compatible To AI Response


### 5. Managing Agent Context


### 6. Managing Agent Output and maintaining consistent structure throughout the application