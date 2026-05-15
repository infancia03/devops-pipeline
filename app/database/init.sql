-- Database initialization script
-- Runs automatically when PostgreSQL container starts for the first time

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Items table
CREATE TABLE IF NOT EXISTS items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data
INSERT INTO users (name, email) VALUES
    ('Alice Dev', 'alice@example.com'),
    ('Bob Ops', 'bob@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO items (title, description, user_id)
SELECT 'Sample Item 1', 'Created during DB init', id FROM users WHERE email = 'alice@example.com';

INSERT INTO items (title, description, user_id)
SELECT 'Sample Item 2', 'Created during DB init', id FROM users WHERE email = 'bob@example.com';