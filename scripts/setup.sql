-- Run this to create the PostgreSQL database with pgvector extension
CREATE DATABASE personal_website;

\c personal_website;

CREATE EXTENSION IF NOT EXISTS vector;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
