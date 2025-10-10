# legal_docs_project

Structured extraction and storage of legal documents (Fatwas, Judgments, Legislations) with a Node/TypeScript parser, an Express API, and a PostgreSQL database. Docker Compose orchestrates the DB and an app service that ingests sample fatwas then runs the API.

## Overview

- Parser reads ".docx" files, extracts structured fields, and writes to Postgres.
- API exposes health and a fatwa listing endpoint.
- Database schema is created via SQL on container init.

## Repository Layout

- API: "src/api/index.ts" (Express + "pg")
- Parser entry: "src/parser/main.ts" (accepts one or more ".docx" paths)
- Parser DB writer: "src/parser/parserDbWriter/fatwaDbWriter.ts" (uses "DATABASE_URL" directly)
- Extractors: "src/parser/extractors/*"
- SQL init scripts: "sql/init.sql" (applied by the Postgres container on first boot)
- Docker: "docker-compose.yml", "Dockerfile"

## Environment

Environment variables are read from ".env" when running locally, and are provided via Compose when running in containers.

Important keys:

- "PORT=3000" — API port
- "DATABASE_URL" — Postgres connection string
  - Local host (matches published DB port): "postgres://postgres:postgres@localhost:5555/legal_docs"
  - In Compose (used by "app" service): "postgres://postgres:postgres@db:5432/legal_docs"

Notes:

- Both the API ("src/api/index.ts") and the parser DB writer use "DATABASE_URL".

## Run with Docker Compose

Quick start — build and run both services:

##bash
docker compose up --build


What happens:

- "db" service starts Postgres on host "localhost:5555".
- "app" service waits for DB health, then runs the fatwa parser over "data/fatwas/*.docx" and finally starts the API on "http://localhost:3000".


Schema initialization:

- On first DB start, "sql/init.sql" is executed automatically by the Postgres image.

## Run the API

### A) Run Locally

1) Install deps:

"""bash
npm install
"""

2) Ensure DB is up ("docker compose up -d db") and ".env" is configured.

3) Start the API (choose one):

"""bash
# Using ts-node with dotenv
npx ts-node -r dotenv/config src/api/index.ts

# Or build then run from dist
npm run build
node dist/api/index.js
"""

The API listens on "http://localhost:3000".

Endpoints:

- "GET /" — health check (returns database time via "SELECT NOW()")
- "GET /fatwas" — lists stored fatwas with key fields

### B) Run in a Container (via Compose)

Compose already overrides the image command to first ingest fatwas, then start the API. Use "docker compose up --build" and access the API at "http://localhost:3000".

## Run the Parser

The parser accepts one or more ".docx" paths and will attempt to detect the document type. Currently, 
Fatwas are inserted into the DB; other types are skipped.
Fatwas Insertion to the db is idempotent as required in the requirement file


Behavior:

- Extracts content and detects type ("fatwa" | "judgment" | "legislation").
- For "fatwa", writes a row into "document" and then "fatwa" tables (with upsert behavior on unique keys) inside a transaction.
- Writes a JSON sidecar of the structured extraction next to the input file (e.g., "fatwa1.json").

## Database Schema

- Schema is defined in "sql/init.sql".
- Tables include "document" and type-specific tables: "fatwa" (with "issuer", "principle" and unique "fatwa_number"), "judgment", "judgment_principle", "legislation", "legislation_article".
- Container applies this automatically on first boot.

Quick "psql" example:

"""bash
psql "postgres://postgres:postgres@localhost:5555/postgres" \
  -c 'SELECT 1;'
"""

## Troubleshooting

- Connection refused / ECONNREFUSED:
  - Ensure the DB container is running and listening on "localhost:5555".
  - Confirm ".env" is loaded (API and parser both read "DATABASE_URL").
  - For Compose, ensure "app" depends_on shows DB healthy before start (already configured).

- API not starting in container:
  - Check "docker compose logs -f app" — the service first ingests fatwas, then starts the API.

- Schema vs insert mismatch:
  - The current schema includes "issuer" and "principle" in the "fatwa" table and unique constraints on "title" and "fatwa_number". Keep inserts aligned.

## What It Does

- Parses Arabic legal documents from ".docx" using "mammoth" and custom extractors.
- Normalizes and stores data in Postgres with a minimal schema for documents and per-type tables.
- Exposes a simple REST API for health and fatwa listing.


## Future Work

- Expand parsing and DB writes for judgments and legislations and add endpoints for them.
- add indexes for frequent queries.
- Improve Arabic text normalization and label detection; handle more document layout variants.
- Implement auth, validation for the API
- Add unit tests for extractors and integration tests for DB writers
- add structured logs
