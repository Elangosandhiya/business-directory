-- Seed Data for Business Directory
-- Fictional businesses located in Coimbatore, Tamil Nadu, India

-- Clear existing data
TRUNCATE TABLE businesses, categories RESTART IDENTITY CASCADE;

-- Insert 6 Categories
INSERT INTO categories (id, name) VALUES
(1, 'Restaurants & Cafes'),
(2, 'Healthcare & Hospitals'),
(3, 'IT & Software Services'),
(4, 'Retail & Shopping'),
(5, 'Automotive Services'),
(6, 'Education & Coaching');

-- Reset category sequence
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

-- Insert 15 Fictional Coimbatore Businesses
INSERT INTO businesses (
    name,
    description,
    category_id,
    address,
    location,
    contact_number,
    whatsapp_number,
    website_url,
    image_url,
    is_featured,
    created_at,
    updated_at
) VALUES
-- 1. Featured Restaurant in RS Puram (with image & website)
(
    'Kongu Aromas Traditional Bistro',
    'Authentic Kongunadu cuisine serving traditional millets, herbal soups, and signature vegetarian thalis crafted with heritage recipes.',
    1,
    '45 Diwan Bahadur Road, Near Post Office, RS Puram, Coimbatore - 641002',
    'RS Puram',
    '+91 422 2541234',
    '+91 98421 23456',
    'https://konguaromas.example.com',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    true,
    '2026-01-10 10:00:00+05:30',
    '2026-01-10 10:00:00+05:30'
),
-- 2. Featured IT Company in Peelamedu (with image & website)
(
    'Kovai Cloud Works',
    'Specialized cloud infrastructure, DevOps consulting, and full-stack enterprise web and mobile application engineering.',
    3,
    '102 Avinashi Road, Opposite PSG Tech, Peelamedu, Coimbatore - 641004',
    'Peelamedu',
    '+91 422 4398700',
    '+91 98940 33445',
    'https://kovaicloudworks.example.com',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    true,
    '2026-01-12 11:30:00+05:30',
    '2026-01-12 11:30:00+05:30'
),
-- 3. Featured Healthcare in Race Course (with image & website)
(
    'Marutham Holistic Wellness Clinic',
    'Advanced multi-specialty wellness centre offering preventative care, physiotherapy, clinical nutrition, and chronic pain management.',
    2,
    '18 Race Course Road, Near Thomas Park, Race Course, Coimbatore - 641018',
    'Race Course',
    '+91 422 2221199',
    '+91 94433 99881',
    'https://maruthamwellness.example.com',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    true,
    '2026-01-15 09:15:00+05:30',
    '2026-01-15 09:15:00+05:30'
),
-- 4. Featured Retail in Gandhipuram (with image & website)
(
    'Siruvani Silks & Heritage Weaves',
    'Exclusive boutique showroom featuring handwoven Kanchipuram silk sarees, soft silks, organic cottons, and festive bridal ensembles.',
    4,
    '28 Cross Cut Road, 7th Street Corner, Gandhipuram, Coimbatore - 641012',
    'Gandhipuram',
    '+91 422 2495566',
    '+91 98432 77889',
    'https://siruvanisilks.example.com',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    true,
    '2026-01-20 14:00:00+05:30',
    '2026-01-20 14:00:00+05:30'
),
-- 5. Featured Education in Saibaba Colony (with image, NO website)
(
    'Apex Academy for STEM & Robotics',
    'Hands-on robotics, coding, and competitive science training for school students with certified lab instructors and project mentorship.',
    6,
    '88 NSR Road, Above HDFC Bank, Saibaba Colony, Coimbatore - 641011',
    'Saibaba Colony',
    '+91 422 2448822',
    '+91 97890 12345',
    NULL,
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    true,
    '2026-01-25 16:45:00+05:30',
    '2026-01-25 16:45:00+05:30'
),
-- 6. Non-featured Cafe in RS Puram (with image & website)
(
    'Filter Kaapi House & Bakery',
    'Freshly brewed Kumbakonam degree coffee paired with wood-fired sourdough buns, tea cakes, and savory evening snacks.',
    1,
    '12 East Sambandam Road, RS Puram, Coimbatore - 641002',
    'RS Puram',
    '+91 422 2549988',
    '+91 98425 66778',
    'https://filterkaapihouse.example.com',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    false,
    '2026-02-01 08:30:00+05:30',
    '2026-02-01 08:30:00+05:30'
),
-- 7. Non-featured IT in Saravanampatti (NO image, with website)
(
    'Vellalore Software Labs',
    'SaaS product development firm focusing on AI logistics automation, supply chain tracking, and data integrations.',
    3,
    'SEZ Tech Park, Keeranatham Road, Saravanampatti, Coimbatore - 641035',
    'Saravanampatti',
    '+91 422 6601200',
    '+91 99440 11223',
    'https://vellaloresoftware.example.com',
    NULL,
    false,
    '2026-02-03 10:20:00+05:30',
    '2026-02-03 10:20:00+05:30'
),
-- 8. Non-featured Automotive in Ramanathapuram (with image & website)
(
    'Precision Wheel & Auto Care',
    'Computerized wheel alignment, computerized 3D balancing, tyre repairs, periodic oil change, and ceramic detailing services.',
    5,
    '310 Trichy Road, Opposite Alvernia School, Ramanathapuram, Coimbatore - 641045',
    'Ramanathapuram',
    '+91 422 2315544',
    '+91 97500 44556',
    'https://precisionautocare.example.com',
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    false,
    '2026-02-05 11:00:00+05:30',
    '2026-02-05 11:00:00+05:30'
),
-- 9. Non-featured Healthcare in Singanallur (NO image, NO website)
(
    'Singai Family Dental Care',
    'Gentle and budget-friendly dental clinic providing scaling, painless extractions, cosmetic fillings, and pediatric dentistry.',
    2,
    '64 Kamarajar Road, Near Singanallur Bus Stand, Singanallur, Coimbatore - 641005',
    'Singanallur',
    '+91 422 2573322',
    '+91 98430 88990',
    NULL,
    NULL,
    false,
    '2026-02-08 17:15:00+05:30',
    '2026-02-08 17:15:00+05:30'
),
-- 10. Non-featured Retail in Town Hall (with image, NO website)
(
    'Raja Street Copper & Brass Emporium',
    'Heritage brass cookware, traditional bronze utensils, pooja lamps, and artistic metal home decor directly from local artisans.',
    4,
    '112 Raja Street, Opp. Clock Tower, Town Hall, Coimbatore - 641001',
    'Town Hall',
    '+91 422 2390011',
    '+91 94421 33221',
    NULL,
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    false,
    '2026-02-10 12:40:00+05:30',
    '2026-02-10 12:40:00+05:30'
),
-- 11. Non-featured Automotive in Gandhipuram (NO image, with website)
(
    'City Motors Bike Workshop',
    'Authorized two-wheeler servicing, quick carburetor tuning, electrical repairs, and genuine spare parts replacement.',
    5,
    '52 5th Street, Cross Cut Road, Gandhipuram, Coimbatore - 641012',
    'Gandhipuram',
    '+91 422 2490055',
    '+91 98422 55443',
    'https://citymotorsbike.example.com',
    NULL,
    false,
    '2026-02-12 15:30:00+05:30',
    '2026-02-12 15:30:00+05:30'
),
-- 12. Non-featured Education in Peelamedu (with image & website)
(
    'Coimbatore School of Spoken English & IELTS',
    'Interactive corporate communication coaching, Cambridge language preparation, and certified IELTS score booster batches.',
    6,
    '210 Nava India Road, Near KR Hospital, Peelamedu, Coimbatore - 641004',
    'Peelamedu',
    '+91 422 4355522',
    '+91 96001 77889',
    'https://coimbatoreschoolenglish.example.com',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    false,
    '2026-02-14 09:45:00+05:30',
    '2026-02-14 09:45:00+05:30'
),
-- 13. Non-featured Restaurant in Saibaba Colony (with image, NO website)
(
    'Ananya Sweets & Chaat Corner',
    'Fresh ghee Mysore Pak, badam halwa, dry fruit sweets, and hygienic North Indian evening snacks and chaats.',
    1,
    '34 Alagesan Road, Saibaba Colony, Coimbatore - 641011',
    'Saibaba Colony',
    '+91 422 2445566',
    '+91 98944 66778',
    NULL,
    'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    false,
    '2026-02-16 18:00:00+05:30',
    '2026-02-16 18:00:00+05:30'
),
-- 14. Non-featured Retail in Ramanathapuram (NO image, NO website)
(
    'Green Grocers Organic Superstore',
    'Farm-fresh zero pesticide vegetables, country eggs, cold-pressed wood chekku oils, and stone-ground organic flours.',
    4,
    '15 Puliakulam Main Road, Ramanathapuram, Coimbatore - 641045',
    'Ramanathapuram',
    '+91 422 2319988',
    '+91 97877 11223',
    NULL,
    NULL,
    false,
    '2026-02-18 07:30:00+05:30',
    '2026-02-18 07:30:00+05:30'
),
-- 15. Non-featured IT in Saravanampatti (with image & website)
(
    'BluePeak Mobile App Studio',
    'Cross-platform React Native and Flutter mobile app design, testing, UI/UX prototyping, and cloud maintenance contracts.',
    3,
    '44 Sathy Road, Near CHIL SEZ, Saravanampatti, Coimbatore - 641035',
    'Saravanampatti',
    '+91 422 4981122',
    '+91 98433 22110',
    'https://bluepeakstudio.example.com',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    false,
    '2026-02-20 14:15:00+05:30',
    '2026-02-20 14:15:00+05:30'
);
