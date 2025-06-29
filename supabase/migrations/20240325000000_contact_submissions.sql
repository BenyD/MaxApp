-- Create an enum for submission status
CREATE TYPE submission_status AS ENUM ('new', 'replied', 'archived');

-- Create the contact submissions table
CREATE TABLE contact_submissions (
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

-- Create an admin role for managing submissions
CREATE ROLE admin;

-- Create policies for contact submissions
-- Anonymous users can only insert
CREATE POLICY "Allow anonymous insert" ON contact_submissions
    FOR INSERT 
    WITH CHECK (true);

-- Only admins can view all submissions
CREATE POLICY "Allow admins to view submissions" ON contact_submissions
    FOR SELECT
    TO admin
    USING (true);

-- Only admins can update submissions
CREATE POLICY "Allow admins to update submissions" ON contact_submissions
    FOR UPDATE
    TO admin
    USING (true)
    WITH CHECK (true);

-- Only admins can delete submissions
CREATE POLICY "Allow admins to delete submissions" ON contact_submissions
    FOR DELETE
    TO admin
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