/*
  # Add language settings to companies table

  1. New Columns
    - `languages` (jsonb) - Available languages for the company
    - `default_language` (text) - Default language for the company
  
  2. Default Values
    - `languages` defaults to `{"sl": true, "en": false, "it": false}`
    - `default_language` defaults to `'sl'`
*/

-- Add languages column with default value
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'languages'
  ) THEN
    ALTER TABLE companies 
    ADD COLUMN languages JSONB DEFAULT '{"sl": true, "en": false, "it": false}';
  END IF;
END $$;

-- Add default_language column with default value
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'default_language'
  ) THEN
    ALTER TABLE companies 
    ADD COLUMN default_language TEXT DEFAULT 'sl';
  END IF;
END $$;

-- Add check constraint to ensure default_language is one of the supported languages
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'companies' AND constraint_name = 'companies_default_language_check'
  ) THEN
    ALTER TABLE companies 
    ADD CONSTRAINT companies_default_language_check 
    CHECK (default_language IN ('sl', 'en', 'it'));
  END IF;
END $$;