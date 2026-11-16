-- Schema for Business Directory
-- PostgreSQL database schema definition

-- Drop existing tables if they exist
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 1. Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Businesses Table
CREATE TABLE businesses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    address TEXT,
    location VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20),
    whatsapp_number VARCHAR(20),
    website_url VARCHAR(255),
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes for Optimized Filtering and Sorting
CREATE INDEX idx_businesses_name ON businesses (name);
CREATE INDEX idx_businesses_category_id ON businesses (category_id);
CREATE INDEX idx_businesses_location ON businesses (location);
CREATE INDEX idx_businesses_featured_created ON businesses (is_featured DESC, created_at DESC);
