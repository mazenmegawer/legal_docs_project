## legal_docs_project

Structured extraction and storage of Arabic legal documents (Fatwas, Judgments, Legislations) using Node.js + TypeScript, an Express API, and a PostgreSQL database.
Everything runs through Docker Compose, which spins up the database and the app that first parses the sample fatwas, then starts the API automatically.

## Overview

  - The database schema is created automatically from SQL during the container’s first startup.
  - parser reads .docx files, extracts structured fields, and inserts them into Postgres.
  - API provides a simple health check and a /fatwas endpoint to list stored fatwas.

## Environment
Environment variables are read from .env when running locally and are passed in automatically through Compose.