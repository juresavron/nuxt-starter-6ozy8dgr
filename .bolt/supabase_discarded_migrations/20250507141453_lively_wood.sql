/*
  # Add custom fields and custom feedback options to companies table

  1. New Columns
    - `custom_fields` (jsonb) - Company-specific custom fields 
    - `custom_feedback_options` (jsonb) - Company-specific custom feedback options
  
  2. Default Values
    - Both columns default to empty JSON objects: '{}'
*/

-- Add custom_fields column with default value
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'custom_fields'
  ) THEN
    ALTER TABLE companies 
    ADD COLUMN custom_fields JSONB DEFAULT '{}';
  END IF;
END $$;

-- Add custom_feedback_options column with default value
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'custom_feedback_options'
  ) THEN
    ALTER TABLE companies 
    ADD COLUMN custom_feedback_options JSONB DEFAULT '{}';
  END IF;
END $$;

-- Create indexes for better query performance on JSONB fields
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE indexname = 'companies_custom_fields_idx'
  ) THEN
    CREATE INDEX companies_custom_fields_idx ON companies USING gin (custom_fields);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE indexname = 'companies_custom_feedback_options_idx'
  ) THEN
    CREATE INDEX companies_custom_feedback_options_idx ON companies USING gin (custom_feedback_options);
  END IF;
END $$;

-- Add comment explaining the purpose of these columns
COMMENT ON COLUMN companies.custom_fields IS 'JSON object containing company-specific custom fields';
COMMENT ON COLUMN companies.custom_feedback_options IS 'JSON object containing company-specific custom feedback options';