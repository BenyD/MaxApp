-- Create an enum for submission status if it doesn't exist
DO $$ BEGIN
    CREATE TYPE submission_status AS ENUM ('new', 'replied', 'archived');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous insert" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to update submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to delete submissions" ON contact_submissions;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS handle_updated_at();

-- Create or replace the contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    status submission_status NOT NULL DEFAULT 'new',
    replied_at TIMESTAMPTZ,
    replied_by UUID REFERENCES auth.users(id),
    reply_message TEXT
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for contact submissions
-- Anonymous users can only insert
CREATE POLICY "Allow anonymous insert" ON contact_submissions
    FOR INSERT 
    WITH CHECK (true);

-- Allow authenticated users to view and manage submissions
CREATE POLICY "Allow authenticated users to view submissions" ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated users to update submissions
CREATE POLICY "Allow authenticated users to update submissions" ON contact_submissions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow authenticated users to delete submissions
CREATE POLICY "Allow authenticated users to delete submissions" ON contact_submissions
    FOR DELETE
    TO authenticated
    USING (true);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at(); 