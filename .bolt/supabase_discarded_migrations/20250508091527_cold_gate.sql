/*
  # Add industry translations

  1. New Table
    - `industry_translations` - Stores translations for industry names in different languages
  
  2. Features
    - Supports multiple languages (sl, en, it)
    - Links to industries table via industry_id
    - Includes language code and translated name
*/

-- Create industry_translations table if it doesn't exist
CREATE TABLE IF NOT EXISTS industry_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id uuid NOT NULL REFERENCES industries(id) ON DELETE CASCADE,
  language_code text NOT NULL CHECK (language_code IN ('sl', 'en', 'it')),
  translated_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(industry_id, language_code)
);

-- Add comment to the table
COMMENT ON TABLE industry_translations IS 'Stores translations for industry names in different languages';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS industry_translations_industry_id_idx ON industry_translations(industry_id);
CREATE INDEX IF NOT EXISTS industry_translations_language_code_idx ON industry_translations(language_code);

-- Enable row level security
ALTER TABLE industry_translations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin users can manage industry translations"
  ON industry_translations
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "Enable public read access for industry translations"
  ON industry_translations
  FOR SELECT
  TO public
  USING (true);

-- Insert initial translations for existing industries
-- This will only run if the industry_translations table is empty
DO $$
DECLARE
  industry_record RECORD;
BEGIN
  -- Only proceed if the table is empty
  IF (SELECT COUNT(*) FROM industry_translations) = 0 THEN
    -- For each industry in the industries table
    FOR industry_record IN SELECT id, translation_key FROM industries LOOP
      -- Insert Slovenian translation
      INSERT INTO industry_translations (industry_id, language_code, translated_name)
      VALUES (
        industry_record.id, 
        'sl', 
        CASE 
          WHEN industry_record.translation_key = 'dental' THEN 'Zobozdravniki'
          WHEN industry_record.translation_key = 'physiotherapy' THEN 'Fizioterapije'
          WHEN industry_record.translation_key = 'beauty_salon' THEN 'Kozmetični saloni'
          WHEN industry_record.translation_key = 'hair_salon' THEN 'Frizerski saloni'
          WHEN industry_record.translation_key = 'fitness' THEN 'Fitnesi in vadbeni studii'
          WHEN industry_record.translation_key = 'auto_repair' THEN 'Mehanične delavnice'
          WHEN industry_record.translation_key = 'real_estate_agency' THEN 'Agencije za nepremičnine'
          WHEN industry_record.translation_key = 'restaurant' THEN 'Restavracije in kavarne'
          WHEN industry_record.translation_key = 'hotel' THEN 'Hoteli in apartmaji'
          WHEN industry_record.translation_key = 'private_clinic' THEN 'Zasebne klinike'
          WHEN industry_record.translation_key = 'law_firm' THEN 'Odvetniške pisarne'
          WHEN industry_record.translation_key = 'veterinary' THEN 'Veterinarji'
          WHEN industry_record.translation_key = 'construction' THEN 'Gradbena podjetja'
          WHEN industry_record.translation_key = 'cleaning' THEN 'Čistilni servisi'
          WHEN industry_record.translation_key = 'personal_trainer' THEN 'Osebni trenerji'
          WHEN industry_record.translation_key = 'wellness' THEN 'Wellness in joga studii'
          WHEN industry_record.translation_key = 'event_organizer' THEN 'Organizatorji dogodkov'
          WHEN industry_record.translation_key = 'car_dealership' THEN 'Avtohiše'
          WHEN industry_record.translation_key = 'language_school' THEN 'Jezikovne šole'
          WHEN industry_record.translation_key = 'tattoo' THEN 'Tattoo studii'
          WHEN industry_record.translation_key = 'general' THEN 'Splošno'
          WHEN industry_record.translation_key = 'education' THEN 'Izobraževanje'
          WHEN industry_record.translation_key = 'hospitality' THEN 'Gostinstvo'
          WHEN industry_record.translation_key = 'healthcare' THEN 'Zdravstvo'
          WHEN industry_record.translation_key = 'retail' THEN 'Trgovina na drobno'
          WHEN industry_record.translation_key = 'beauty' THEN 'Lepotne storitve'
          WHEN industry_record.translation_key = 'automotive' THEN 'Avtomobilska industrija'
          WHEN industry_record.translation_key = 'business_services' THEN 'Poslovne storitve'
          WHEN industry_record.translation_key = 'real_estate' THEN 'Nepremičnine'
          WHEN industry_record.translation_key = 'poslovne' THEN 'Poslovne storitve'
          WHEN industry_record.translation_key = 'lepota' THEN 'Lepotne storitve'
          WHEN industry_record.translation_key = 'gostinstvo' THEN 'Gostinstvo'
          WHEN industry_record.translation_key = 'avtoservisi' THEN 'Avtoservisi'
          WHEN industry_record.translation_key = 'zdravje' THEN 'Zdravstvene storitve'
          WHEN industry_record.translation_key = 'nepremicnine' THEN 'Nepremičnine'
          ELSE industry_record.translation_key
        END
      );
      
      -- Insert English translation
      INSERT INTO industry_translations (industry_id, language_code, translated_name)
      VALUES (
        industry_record.id, 
        'en', 
        CASE 
          WHEN industry_record.translation_key = 'dental' THEN 'Dental Clinics'
          WHEN industry_record.translation_key = 'physiotherapy' THEN 'Physiotherapy Centers'
          WHEN industry_record.translation_key = 'beauty_salon' THEN 'Beauty Salons'
          WHEN industry_record.translation_key = 'hair_salon' THEN 'Hair Salons'
          WHEN industry_record.translation_key = 'fitness' THEN 'Fitness Centers'
          WHEN industry_record.translation_key = 'auto_repair' THEN 'Auto Repair Shops'
          WHEN industry_record.translation_key = 'real_estate_agency' THEN 'Real Estate Agencies'
          WHEN industry_record.translation_key = 'restaurant' THEN 'Restaurants'
          WHEN industry_record.translation_key = 'hotel' THEN 'Hotels & Accommodations'
          WHEN industry_record.translation_key = 'private_clinic' THEN 'Private Clinics'
          WHEN industry_record.translation_key = 'law_firm' THEN 'Law Firms'
          WHEN industry_record.translation_key = 'veterinary' THEN 'Veterinary Clinics'
          WHEN industry_record.translation_key = 'construction' THEN 'Construction Companies'
          WHEN industry_record.translation_key = 'cleaning' THEN 'Cleaning Services'
          WHEN industry_record.translation_key = 'personal_trainer' THEN 'Personal Trainers'
          WHEN industry_record.translation_key = 'wellness' THEN 'Wellness & Yoga Studios'
          WHEN industry_record.translation_key = 'event_organizer' THEN 'Event Organizers'
          WHEN industry_record.translation_key = 'car_dealership' THEN 'Car Dealerships'
          WHEN industry_record.translation_key = 'language_school' THEN 'Language Schools'
          WHEN industry_record.translation_key = 'tattoo' THEN 'Tattoo Studios'
          WHEN industry_record.translation_key = 'general' THEN 'General'
          WHEN industry_record.translation_key = 'education' THEN 'Education'
          WHEN industry_record.translation_key = 'hospitality' THEN 'Hospitality'
          WHEN industry_record.translation_key = 'healthcare' THEN 'Healthcare'
          WHEN industry_record.translation_key = 'retail' THEN 'Retail'
          WHEN industry_record.translation_key = 'beauty' THEN 'Beauty Services'
          WHEN industry_record.translation_key = 'automotive' THEN 'Automotive'
          WHEN industry_record.translation_key = 'business_services' THEN 'Business Services'
          WHEN industry_record.translation_key = 'real_estate' THEN 'Real Estate'
          WHEN industry_record.translation_key = 'poslovne' THEN 'Business Services'
          WHEN industry_record.translation_key = 'lepota' THEN 'Beauty Services'
          WHEN industry_record.translation_key = 'gostinstvo' THEN 'Hospitality'
          WHEN industry_record.translation_key = 'avtoservisi' THEN 'Auto Repair'
          WHEN industry_record.translation_key = 'zdravje' THEN 'Healthcare'
          WHEN industry_record.translation_key = 'nepremicnine' THEN 'Real Estate'
          ELSE industry_record.translation_key
        END
      );
      
      -- Insert Italian translation
      INSERT INTO industry_translations (industry_id, language_code, translated_name)
      VALUES (
        industry_record.id, 
        'it', 
        CASE 
          WHEN industry_record.translation_key = 'dental' THEN 'Cliniche Dentali'
          WHEN industry_record.translation_key = 'physiotherapy' THEN 'Centri di Fisioterapia'
          WHEN industry_record.translation_key = 'beauty_salon' THEN 'Saloni di Bellezza'
          WHEN industry_record.translation_key = 'hair_salon' THEN 'Saloni di Parrucchiere'
          WHEN industry_record.translation_key = 'fitness' THEN 'Centri Fitness'
          WHEN industry_record.translation_key = 'auto_repair' THEN 'Officine Auto'
          WHEN industry_record.translation_key = 'real_estate_agency' THEN 'Agenzie Immobiliari'
          WHEN industry_record.translation_key = 'restaurant' THEN 'Ristoranti'
          WHEN industry_record.translation_key = 'hotel' THEN 'Hotel e Alloggi'
          WHEN industry_record.translation_key = 'private_clinic' THEN 'Cliniche Private'
          WHEN industry_record.translation_key = 'law_firm' THEN 'Studi Legali'
          WHEN industry_record.translation_key = 'veterinary' THEN 'Cliniche Veterinarie'
          WHEN industry_record.translation_key = 'construction' THEN 'Aziende di Costruzione'
          WHEN industry_record.translation_key = 'cleaning' THEN 'Servizi di Pulizia'
          WHEN industry_record.translation_key = 'personal_trainer' THEN 'Personal Trainer'
          WHEN industry_record.translation_key = 'wellness' THEN 'Centri Benessere e Yoga'
          WHEN industry_record.translation_key = 'event_organizer' THEN 'Organizzatori di Eventi'
          WHEN industry_record.translation_key = 'car_dealership' THEN 'Concessionarie Auto'
          WHEN industry_record.translation_key = 'language_school' THEN 'Scuole di Lingue'
          WHEN industry_record.translation_key = 'tattoo' THEN 'Studi di Tatuaggio'
          WHEN industry_record.translation_key = 'general' THEN 'Generale'
          WHEN industry_record.translation_key = 'education' THEN 'Istruzione'
          WHEN industry_record.translation_key = 'hospitality' THEN 'Ospitalità'
          WHEN industry_record.translation_key = 'healthcare' THEN 'Sanità'
          WHEN industry_record.translation_key = 'retail' THEN 'Vendita al Dettaglio'
          WHEN industry_record.translation_key = 'beauty' THEN 'Servizi di Bellezza'
          WHEN industry_record.translation_key = 'automotive' THEN 'Automobilistico'
          WHEN industry_record.translation_key = 'business_services' THEN 'Servizi per le Aziende'
          WHEN industry_record.translation_key = 'real_estate' THEN 'Immobiliare'
          WHEN industry_record.translation_key = 'poslovne' THEN 'Servizi per le Aziende'
          WHEN industry_record.translation_key = 'lepota' THEN 'Servizi di Bellezza'
          WHEN industry_record.translation_key = 'gostinstvo' THEN 'Ristorazione'
          WHEN industry_record.translation_key = 'avtoservisi' THEN 'Servizi Automobilistici'
          WHEN industry_record.translation_key = 'zdravje' THEN 'Servizi Sanitari'
          WHEN industry_record.translation_key = 'nepremicnine' THEN 'Immobiliare'
          ELSE industry_record.translation_key
        END
      );
    END LOOP;
  END IF;
END $$;