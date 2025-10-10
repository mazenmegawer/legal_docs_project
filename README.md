# legal_docs_project

Structured extraction and storage of Arabic legal documents (Fatwas, Judgments, Legislations), Everything runs through Docker Compose, which starts the database and the app that first parses the sample fatwas, then starts the API automatically.

# Overview

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

# Running with Docker:

```
  docker compose up
```

### once docker is up:

1. The db service starts Postgres on localhost:5555.

2. The app service waits for the DB to be ready.

3. It runs the fatwa parser over all the documents in the directory data/fatwas/*.docx files, extract then data and add each field to the corresponding column in the database

4. When done, it starts the API at http://localhost:3000 and currently the only api functionality is to retrieve jsons of all the fatwa documents extracted

---------------------------------

## running locally:

1. ***install dependecies and start database*** 

```
npm install

docker compose up -d db
```
2. make sure environment file is setup correctly with port and db connection
```
   **Main variables:**
- `PORT=3000` → API port  
- `DATABASE_URL` → Postgres connection string  
```
