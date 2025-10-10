## legal_docs_project

Structured extraction and storage of Arabic legal documents (Fatwas, Judgments, Legislations), Everything runs through Docker Compose, which starts the database and the app that first parses the sample fatwas, then starts the API automatically.

## Overview

  - The database schema is created automatically from SQL during the container’s first startup.
  - parser reads .docx files, extracts structured fields, and inserts them into Postgres.
  - API provides a simple health check and a /fatwas endpoint to list stored fatwas.

## Environment
Environment variables are read from .env when running locally and are passed in automatically through Compose.
database connection string:
  Local:
  DATABASE_URL=postgres://postgres:postgres@localhost:5555/legal_docs

  docker:
  DATABASE_URL=postgres://postgres:postgres@db:5432/legal_docs

variables:
* API port
PORT=3000 

* Postgres connection string
DATABASE_URL  

# Running with Docker:

```
  docker compose up
```

