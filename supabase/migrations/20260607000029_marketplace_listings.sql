CREATE TABLE public.marketplace_listings (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE, -- Nullable if freelance individual
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- For freelancers
    listing_type TEXT NOT NULL CHECK (listing_type IN ('venue', 'vendor', 'freelancer')),
    category TEXT NOT NULL, -- e.g., 'Photography', 'Marquee'
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    location TEXT NOT NULL, -- City
    area TEXT, -- Specific neighborhood
    coordinates JSONB, -- {lat: 31.5, lng: 74.3}
    starting_price NUMERIC(10, 2) DEFAULT 0.00,
    price_unit TEXT DEFAULT 'event', -- 'event', 'head', 'day', 'hour'
    rating NUMERIC(2, 1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    images TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;

-- Policies

-- Public can read published listings
CREATE POLICY "Public can view published marketplace listings"
    ON public.marketplace_listings FOR SELECT
    USING (is_published = true);

-- Organization members can manage their own listings
CREATE POLICY "Users can manage their organization's listings"
    ON public.marketplace_listings FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
        )
    )
    WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
        )
    );

-- Freelancers can manage their own listings
CREATE POLICY "Freelancers can manage their own listings"
    ON public.marketplace_listings FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Triggers for updated_at
CREATE TRIGGER update_marketplace_listings_updated_at
    BEFORE UPDATE ON public.marketplace_listings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
