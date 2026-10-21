CREATE TABLE IF NOT EXISTS ccgs_guests (
  id text PRIMARY KEY, request_id text UNIQUE NOT NULL,
  first_name text NOT NULL CHECK (length(first_name) BETWEEN 1 AND 80),
  last_name text NOT NULL CHECK (length(last_name) BETWEEN 1 AND 80),
  dietary text NOT NULL CHECK (length(dietary) <= 500), dietary_consent boolean NOT NULL,
  status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled')),
  created_at text NOT NULL, updated_at text NOT NULL, version integer NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS ccgs_sessions (token_hash text PRIMARY KEY, expires bigint NOT NULL);
CREATE TABLE IF NOT EXISTS ccgs_limits (key text PRIMARY KEY, count integer NOT NULL, expires bigint NOT NULL);
