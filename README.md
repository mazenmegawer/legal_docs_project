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
  git clone https://github.com/mazenmegawer/legal_docs_project
  cd legal_docs_project
  docker compose up --build
```

### once docker is up:

1. The db service starts Postgres on localhost:5555.

2. The app service waits for the DB to be ready.

3. It runs the fatwa parser over all the documents in the directory data/fatwas/*.docx files, extract then data and add each field to the corresponding column in the database

4. When done, it starts the API at http://localhost:3000 and currently the only api functionality is to retrieve jsons of all the fatwa documents extracted

5. the end point `http://localhost:3000/fatwas` returns all the fatwas that has been fed into the database

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

3. run the parser:

````
npx ts-node src/parser/main.ts data/fatwas/*.docx
````
4. run the api 
```
  # Run directly with ts-node
npx ts-node -r dotenv/config src/api/index.ts

# Or build and run from dist
npm run build
node dist/api/index.js

```

## Database Schema:

<img width="561" height="842" alt="legal_docs - public" src="https://github.com/user-attachments/assets/f8e2e849-f543-4fd5-bce8-d1e77a6056ff" />

## Future improvements: 

Add parsing for judgments and legislations (and matching DB writes).

Extend the API with /judgments and /legislations.

Improve Arabic text normalization and label detection.

Add indexes and optimize frequent queries.

Implement authentication and request validation for the API.

Add unit and integration tests.

Improve logs and error handling.


