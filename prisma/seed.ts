import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.phaseMedia.deleteMany();
  await prisma.projectFAQ.deleteMany();
  await prisma.projectAttribute.deleteMany();
  await prisma.projectPhase.deleteMany();
  await prisma.projectModel3D.deleteMany();
  await prisma.projectVideo.deleteMany();
  await prisma.projectMedia.deleteMany();
  await prisma.sectionContent.deleteMany();
  await prisma.project.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.fAQType.deleteMany();
  await prisma.category.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.siteSetting.deleteMany();

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@horizonnepal.com.np" },
    update: {},
    create: {
      email: "admin@horizonnepal.com.np",
      name: "Admin",
      role: "admin",
      hashedPassword,
    },
  });

  const categoryData = [
    { name: "Buildings", slug: "buildings", order: 1, children: [
      { name: "Residential", slug: "residential", order: 1 },
      { name: "Commercial", slug: "commercial", order: 2 },
    ]},
    { name: "Road Works", slug: "road-works", order: 2 },
    { name: "Interiors", slug: "interiors", order: 3 },
    { name: "Renovation", slug: "renovation", order: 4 },
  ];
  const catMap: Record<string, string> = {};
  for (const c of categoryData) {
    const parent = await prisma.category.create({ data: { name: c.name, slug: c.slug, order: c.order } });
    catMap[c.name] = parent.id;
    if (c.children) {
      for (const child of c.children) {
        const childCat = await prisma.category.create({ data: { ...child, parentId: parent.id } });
        catMap[child.name] = childCat.id;
      }
    }
  }

  const projectDefs = [
    { title: "Sunrise Residential Complex", cat: "Residential", status: "completed", completion: 100, location: "Lalitpur", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80", alt: "Sunrise Residential Complex", featured: true, order: 1, shortDescription: "A 24-unit modern residential complex with green spaces, rooftop gardens, and earthquake-resistant design." },
    { title: "Araniko Highway Maintenance", cat: "Road Works", status: "in_progress", completion: 65, location: "Bhaktapur", img: "https://images.unsplash.com/photo-1545972154-9bb223aac798?auto=format&fit=crop&w=900&q=80", alt: "Araniko Highway maintenance", featured: false, order: 2, shortDescription: "Ongoing maintenance and widening of a major highway corridor connecting Bhaktapur to the eastern region." },
    { title: "New Baneshwor Office Tower", cat: "Commercial", status: "in_progress", completion: 40, location: "Kathmandu", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80", alt: "New Baneshwor office tower", featured: true, order: 3, shortDescription: "A 12-storey commercial office tower with net-zero energy features and smart building technology." },
    { title: "Boutique Hotel Interiors", cat: "Interiors", status: "completed", completion: 100, location: "Thamel", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80", alt: "Boutique hotel interior design", featured: false, order: 4, shortDescription: "Complete interior design and fit-out for a 20-room boutique hotel blending Nepali craftsmanship with modern luxury." },
    { title: "Patan Heritage Renovation", cat: "Renovation", status: "planning", completion: 0, location: "Patan", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80", alt: "Patan heritage renovation", featured: false, order: 5, shortDescription: "Sensitive restoration of a historic Patan courtyard palace into a cultural centre and museum." },
    { title: "Bagmati Bridge Upgrade", cat: "Road Works", status: "on_hold", completion: 30, location: "Kathmandu", img: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=900&q=80", alt: "Bagmati bridge upgrade", featured: false, order: 6, shortDescription: "Structural upgrade and seismic retrofitting of a key bridge over the Bagmati river." },
    { title: "Pokhara Lakeside Villa", cat: "Residential", status: "completed", completion: 100, location: "Pokhara", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80", alt: "Lake view villa", featured: false, order: 7, shortDescription: "A custom-designed lakeside villa with panoramic Himalayan views, outdoor terraces, and sustainable materials." },
    { title: "Chitwan Eco Resort", cat: "Commercial", status: "planning", completion: 15, location: "Chitwan", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80", alt: "Eco resort design", featured: false, order: 8, shortDescription: "Eco-friendly resort development using local materials, solar energy, and rainwater harvesting systems." },
  ];
  for (const p of projectDefs) {
    const slug = p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    await prisma.project.create({
      data: {
        title: p.title, slug, categoryId: catMap[p.cat],
        status: p.status, completion: p.completion, location: p.location,
        img: p.img, alt: p.alt, featured: p.featured, order: p.order,
        description: `${p.title} is a ${p.cat.toLowerCase()} project located in ${p.location}.`,
        shortDescription: p.shortDescription,
        budget: Math.floor(Math.random() * 5000000) + 500000,
        startDate: new Date("2024-01-01"), endDate: new Date("2025-06-01"),
        published: true,
      },
    });
  }

  const team = [
    { name: "Arun Thapa", role: "Lead Architect", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", alt: "Portrait of Arun Thapa", order: 1 },
    { name: "Priya Shrestha", role: "Project Manager", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", alt: "Portrait of Priya Shrestha", order: 2 },
    { name: "Bikash Tamang", role: "Civil Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", alt: "Portrait of Bikash Tamang", order: 3 },
    { name: "Sunita Rai", role: "Interior Designer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", alt: "Portrait of Sunita Rai", order: 4 },
  ];
  for (const m of team) {
    await prisma.teamMember.create({ data: m });
  }

  const testimonials = [
    { author: "Rajesh Maharjan", role: "Homeowner · Lalitpur", company: "", quote: "Horizon Nepal delivered our family home on time and 4% under budget. The weekly updates made everything feel under control.", initials: "RM", order: 1, rating: 5 },
    { author: "Sita Gurung", role: "MD · Annapurna Retail", company: "Annapurna Retail", quote: "We've now done three commercial fit-outs. The attention to structural detail is genuinely unmatched in the valley.", initials: "SG", order: 2, rating: 5 },
    { author: "Bibek Karki", role: "Director · Public Works", company: "Public Works", quote: "Their road maintenance crew finishes ahead of schedule and still passes every inspection.", initials: "BK", order: 3, rating: 5 },
    { author: "Anita Sharma", role: "Hotelier · Thamel", company: "", quote: "The interior renovation was handled with respect for our heritage building. Craftsmanship at a level we hadn't seen before.", initials: "AS", order: 4, rating: 5 },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  const faqTypes = [
    { name: "General", slug: "general", order: 1 },
    { name: "Technical", slug: "technical", order: 2 },
    { name: "Pricing", slug: "pricing", order: 3 },
    { name: "Process", slug: "process", order: 4 },
  ];
  const faqTypeMap: Record<string, string> = {};
  for (const ft of faqTypes) {
    const created = await prisma.fAQType.upsert({
      where: { slug: ft.slug }, update: { name: ft.name, order: ft.order }, create: ft,
    });
    faqTypeMap[ft.name] = created.id;
  }

  const faqs = [
    { question: "What types of projects does Horizon Nepal handle?", answer: "We specialise in residential house construction, interior design, material cost consultation, and site feasibility assessments. From single-family homes to multi-unit complexes, our team has the expertise to deliver quality results across a wide range of project sizes and scopes.", order: 1, type: "General" },
    { question: "How long does a typical construction project take?", answer: "Timelines vary depending on the size and complexity of the project. A standard single-family home typically takes 8-14 months from ground-breaking to handover. We provide a detailed milestone schedule during the planning phase and keep you updated throughout the build.", order: 2, type: "Process" },
    { question: "Do you handle all permits and government approvals?", answer: "Yes. We manage the entire permit and approval process on your behalf, including building permits, environmental clearances, and municipal approvals. Our team is well-versed in Kathmandu Valley's regulatory requirements and ensures all documentation is in order.", order: 3, type: "Process" },
    { question: "What makes Horizon Nepal different from other construction companies?", answer: "We combine engineering excellence with design sensitivity and transparent business practices. Every project includes a detailed Bill of Quantities (BoQ), fixed-price contracts, regular progress updates, and third-party quality inspections. We don't just build structures — we build trust.", order: 4, type: "General" },
    { question: "How do I get started with a project consultation?", answer: "Simply book a free consultation through our website or call us directly. We'll visit your site, discuss your vision, assess feasibility, and provide a clear outline of next steps — all without any obligation.", order: 5, type: "Process" },
    { question: "What materials do you recommend for construction in Nepal?", answer: "We recommend a combination of locally sourced materials (stone, brick, timber) and modern alternatives (reinforced concrete, structural steel) based on your project's requirements, budget, and location. Our material cost consultation service provides transparent pricing from trusted suppliers.", order: 6, type: "Technical" },
    { question: "How do you ensure quality control during construction?", answer: "Quality is embedded in every phase. We use third-party material testing, regular structural inspections, milestone-based sign-offs, and a dedicated project supervisor on-site. Our teams follow strict safety protocols and maintain detailed progress documentation.", order: 7, type: "Technical" },
    { question: "Can I make changes to the design after construction starts?", answer: "Yes, but changes may affect the timeline and budget. We recommend finalising all design decisions before breaking ground. If changes are needed mid-build, we assess the impact, provide a revised cost estimate, and proceed only with your written approval.", order: 8, type: "Pricing" },
    { question: "What is included in your interior design service?", answer: "Our interior design service covers space planning, material and finish selection, furniture design, lighting layout, kitchen and bathroom design, and project management. We work closely with you to create spaces that reflect your personality and lifestyle.", order: 9, type: "General" },
    { question: "Do you offer post-construction support or maintenance?", answer: "Yes. We provide a structural warranty and offer post-handover support for any issues that arise. Our maintenance services include plumbing, electrical, waterproofing, and general repairs to keep your home in excellent condition for years to come.", order: 10, type: "General" },
  ];
  for (const f of faqs) {
    await prisma.fAQ.create({ data: { question: f.question, answer: f.answer, order: f.order, faqTypeId: faqTypeMap[f.type] } });
  }

  const news = [
    { title: "How Earthquake-Resilient Design Is Reshaping Kathmandu Housing", slug: "earthquake-resilient-design-kathmandu", excerpt: "New code-compliant techniques are quietly transforming residential construction across the valley.", category: "Engineering", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80", alt: "Earthquake resilient building design", publishedAt: new Date("2024-03-12") },
    { title: "Inside Our Net-Zero Office Tower Pilot in New Baneshwor", slug: "net-zero-office-tower-banemashwor", excerpt: "From rooftop solar to greywater systems — a look at Nepal's first carbon-neutral commercial build.", category: "Sustainability", image: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=900&q=80", alt: "Net-zero office tower", publishedAt: new Date("2024-02-28") },
    { title: "Why Local Materials Matter: A Field Report from Pokhara", slug: "local-materials-pokhara-field-report", excerpt: "Sourcing stone, slate and timber within 50 km of site is changing project economics.", category: "Field Notes", image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=900&q=80", alt: "Local construction materials in Pokhara", publishedAt: new Date("2024-02-10") },
    { title: "5 Interior Design Trends Shaping Nepali Homes in 2025", slug: "interior-design-trends-nepal-2025", excerpt: "From biophilic design to modular kitchens — discover the trends that are redefining how Nepali families live and entertain.", category: "Design", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80", alt: "Interior design trends", publishedAt: new Date("2024-01-20") },
    { title: "A Complete Guide to Construction Permits in Kathmandu Valley", slug: "construction-permits-kathmandu-guide", excerpt: "Navigating the permit process can be daunting. We break down every step from application to approval.", category: "Guide", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80", alt: "Construction permits", publishedAt: new Date("2024-01-05") },
    { title: "Building on a Slope: Engineering Challenges and Solutions", slug: "building-on-slope-engineering", excerpt: "Steep terrain doesn't mean you can't build your dream home. Learn about the engineering techniques that make hillside construction possible.", category: "Engineering", image: "https://images.unsplash.com/photo-1541888946425-d81bb9f3e9b3?auto=format&fit=crop&w=900&q=80", alt: "Building on slope", publishedAt: new Date("2023-12-15") },
  ];
  for (const n of news) {
    await prisma.newsArticle.create({ data: { ...n, readingTimeMinutes: 3 } });
  }

  const sectionContent: Array<{ section: string; key: string; valueEn: string; valueNp: string; mediaUrl: string | null; mediaType: string | null; order: number }> = [
    { section: "hero", key: "label", valueEn: "Engineering · Design · Construction", valueNp: "इन्जिनियरिङ · डिजाइन · निर्माण", mediaUrl: null, mediaType: null, order: 1 },
    { section: "hero", key: "h1", valueEn: "Building Your Dream Home, One Brick at a Time", valueNp: "तपाईंको सपनाको घर, एक इँटा एक पल्ट", mediaUrl: null, mediaType: null, order: 2 },
    { section: "hero", key: "subtitle", valueEn: "From concept to completion — Horizon Nepal delivers quality home construction, bespoke interior design, and reliable material cost consultation across Nepal.", valueNp: "अवधारणादेखि पूर्णतासम्म — होराइजन नेपालले गुणस्तरीय घर निर्माण, अनुकूल आन्तरिक डिजाइन, र नेपालभर विश्वसनीय सामग्री मूल्य परामर्श प्रदान गर्दछ।", mediaUrl: null, mediaType: null, order: 3 },
    { section: "hero", key: "cta", valueEn: "Get Started", valueNp: "सुरु गर्नुहोस्", mediaUrl: null, mediaType: null, order: 4 },
    { section: "hero", key: "cta2", valueEn: "View Projects", valueNp: "हाम्रा कामहरू हेर्नुहोस्", mediaUrl: null, mediaType: null, order: 5 },
    { section: "services", key: "label", valueEn: "Our Services", valueNp: "हाम्रा सेवाहरू", mediaUrl: null, mediaType: null, order: 1 },
    { section: "services", key: "h2", valueEn: "What We Build & Design", valueNp: "हामी के बनाउँछौं र डिजाइन गर्छौं", mediaUrl: null, mediaType: null, order: 2 },
    { section: "services", key: "subtitle", valueEn: "Focused expertise in residential construction, interior design, and construction material consultation across Nepal.", valueNp: "नेपालभर आवासीय निर्माण, आन्तरिक डिजाइन, र निर्माण सामग्री परामर्शमा केन्द्रित विशेषज्ञता।", mediaUrl: null, mediaType: null, order: 3 },
    { section: "services", key: "explore", valueEn: "Explore More", valueNp: "थप हेर्नुहोस्", mediaUrl: null, mediaType: null, order: 4 },
    { section: "portfolio", key: "label", valueEn: "Our Portfolio", valueNp: "हाम्रो पोर्टफोलियो", mediaUrl: null, mediaType: null, order: 1 },
    { section: "portfolio", key: "h2", valueEn: "Explore Our Works", valueNp: "हाम्रा कामहरू हेर्नुहोस्", mediaUrl: null, mediaType: null, order: 2 },
    { section: "portfolio", key: "viewAll", valueEn: "View All Projects", valueNp: "सबै परियोजनाहरू हेर्नुहोस्", mediaUrl: null, mediaType: null, order: 3 },
    { section: "portfolio", key: "viewProject", valueEn: "View Project", valueNp: "परियोजना हेर्नुहोस्", mediaUrl: null, mediaType: null, order: 4 },
    { section: "news", key: "label", valueEn: "Latest Updates", valueNp: "पछिल्लो अपडेट", mediaUrl: null, mediaType: null, order: 1 },
    { section: "news", key: "h2", valueEn: "Read Our Latest Articles", valueNp: "हाम्रा पछिल्ला लेखहरू पढ्नुहोस्", mediaUrl: null, mediaType: null, order: 2 },
    { section: "news", key: "readMore", valueEn: "Read More", valueNp: "थप पढ्नुहोस्", mediaUrl: null, mediaType: null, order: 3 },
    { section: "news", key: "viewAll", valueEn: "View All News", valueNp: "सबै समाचार हेर्नुहोस्", mediaUrl: null, mediaType: null, order: 4 },
    { section: "faq", key: "label", valueEn: "FAQ", valueNp: "प्रश्नोत्तर", mediaUrl: null, mediaType: null, order: 1 },
    { section: "faq", key: "h2", valueEn: "Answers to Your Construction Questions", valueNp: "तपाईंको निर्माण प्रश्नहरूको जवाफ", mediaUrl: null, mediaType: null, order: 2 },
    { section: "faq", key: "subtitle", valueEn: "Everything you need to know about working with Horizon Nepal — from first call to final inspection.", valueNp: "होराइजन नेपालसँग काम गर्ने बारे जान्न आवश्यक सबै कुरा — पहिलो कलदेखि अन्तिम निरीक्षणसम्म।", mediaUrl: null, mediaType: null, order: 3 },
    { section: "faq", key: "ask", valueEn: "Ask Us Anything", valueNp: "हामीलाई केही सोध्नुहोस्", mediaUrl: null, mediaType: null, order: 4 },
    { section: "faq", key: "viewAll", valueEn: "View All FAQs", valueNp: "सबै प्रश्नोत्तर हेर्नुहोस्", mediaUrl: null, mediaType: null, order: 5 },
    { section: "testimonials", key: "label", valueEn: "Client Stories", valueNp: "ग्राहक अनुभव", mediaUrl: null, mediaType: null, order: 1 },
    { section: "testimonials", key: "h2", valueEn: "What Our Customers Are Saying", valueNp: "हाम्रा ग्राहकहरू के भन्छन्", mediaUrl: null, mediaType: null, order: 2 },
    { section: "testimonials", key: "prev", valueEn: "Previous testimonial", valueNp: "अघिल्लो प्रशंसापत्र", mediaUrl: null, mediaType: null, order: 3 },
    { section: "testimonials", key: "next", valueEn: "Next testimonial", valueNp: "अर्को प्रशंसापत्र", mediaUrl: null, mediaType: null, order: 4 },
    { section: "process", key: "label", valueEn: "How We Work", valueNp: "हाम्रो कार्य प्रणाली", mediaUrl: null, mediaType: null, order: 1 },
    { section: "process", key: "h2", valueEn: "Building Your Home in 3 Simple Steps", valueNp: "तपाईंको घर ३ सरल चरणमा", mediaUrl: null, mediaType: null, order: 2 },
    { section: "process", key: "subtitle", valueEn: "A transparent, milestone-based process built around your peace of mind — from first conversation to keys in hand.", valueNp: "तपाईंको मानसिक शान्तिको वरिपरि निर्मित पारदर्शी, माइलस्टोन-आधारित प्रक्रिया — पहिलो कुराकानीदेखि साँचो हातमा।", mediaUrl: null, mediaType: null, order: 3 },
    { section: "process", key: "simpleSteps", valueEn: "simple steps", valueNp: "सरल चरणहरू", mediaUrl: null, mediaType: null, order: 4 },
  ];
  for (const sc of sectionContent) {
    await prisma.sectionContent.create({ data: sc });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
