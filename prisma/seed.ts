import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data in dependency order
  await prisma.phaseMedia.deleteMany();
  await prisma.projectFAQ.deleteMany();
  await prisma.projectAttribute.deleteMany();
  await prisma.projectPhase.deleteMany();
  await prisma.projectModel3D.deleteMany();
  await prisma.projectVideo.deleteMany();
  await prisma.projectMedia.deleteMany();
  await prisma.project.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.fAQType.deleteMany();
  await prisma.category.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.teamMember.deleteMany();

  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@horizonnepal.com.np" },
    update: {},
    create: {
      email: "admin@horizonnepal.com.np",
      name: "Admin",
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
    { title: "Sunrise Residential Complex", cat: "Residential", status: "completed", completion: 100, location: "Lalitpur", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80", alt: "Sunrise Residential Complex", featured: true, order: 1 },
    { title: "Araniko Highway Maintenance", cat: "Road Works", status: "in_progress", completion: 65, location: "Bhaktapur", img: "https://images.unsplash.com/photo-1545972154-9bb223aac798?auto=format&fit=crop&w=900&q=80", alt: "Araniko Highway maintenance", featured: false, order: 2 },
    { title: "New Baneshwor Office Tower", cat: "Commercial", status: "in_progress", completion: 40, location: "Kathmandu", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80", alt: "New Baneshwor office tower", featured: true, order: 3 },
    { title: "Boutique Hotel Interiors", cat: "Interiors", status: "completed", completion: 100, location: "Thamel", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80", alt: "Boutique hotel interior design", featured: false, order: 4 },
    { title: "Patan Heritage Renovation", cat: "Renovation", status: "planning", completion: 0, location: "Patan", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80", alt: "Patan heritage renovation", featured: false, order: 5 },
    { title: "Bagmati Bridge Upgrade", cat: "Road Works", status: "on_hold", completion: 30, location: "Kathmandu", img: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=900&q=80", alt: "Bagmati bridge upgrade", featured: false, order: 6 },
  ];
  for (const p of projectDefs) {
    const slug = p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    await prisma.project.create({
      data: {
        title: p.title,
        slug,
        categoryId: catMap[p.cat],
        status: p.status,
        completion: p.completion,
        location: p.location,
        img: p.img,
        alt: p.alt,
        featured: p.featured,
        order: p.order,
        description: `${p.title} is a ${p.cat.toLowerCase()} project located in ${p.location}.`,
        shortDescription: `${p.cat} project in ${p.location}`,
        budget: Math.floor(Math.random() * 5000000) + 500000,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2025-06-01"),
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
    { author: "Rajesh Maharjan", role: "Homeowner · Lalitpur", company: "", quote: "Horizon Nepal delivered our family home on time and 4% under budget. The weekly updates made everything feel under control.", initials: "RM", order: 1 },
    { author: "Sita Gurung", role: "MD · Annapurna Retail", company: "Annapurna Retail", quote: "We've now done three commercial fit-outs. The attention to structural detail is genuinely unmatched in the valley.", initials: "SG", order: 2 },
    { author: "Bibek Karki", role: "Director · Public Works", company: "Public Works", quote: "Their road maintenance crew finishes ahead of schedule and still passes every inspection.", initials: "BK", order: 3 },
    { author: "Anita Sharma", role: "Hotelier · Thamel", company: "", quote: "The interior renovation was handled with respect for our heritage building. Craftsmanship at a level we hadn't seen before.", initials: "AS", order: 4 },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: { ...t, rating: 5 } });
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
      where: { slug: ft.slug },
      update: { name: ft.name, order: ft.order },
      create: ft,
    });
    faqTypeMap[ft.name] = created.id;
  }

  const faqs = [
    { question: "What types of projects does Horizon Nepal handle?", answer: "Residential homes, commercial buildings, road and bridge infrastructure, interior fit-outs, and heritage renovations across Bagmati and beyond.", order: 1, type: "General" },
    { question: "How long does a typical construction project take?", answer: "A standalone home runs 8–14 months; commercial builds 18–30. We provide a detailed milestone schedule before contract signing.", order: 2, type: "Process" },
    { question: "Do you handle all permits and government approvals?", answer: "Yes. Our in-house liaison team manages municipal approvals, NBC compliance, and utility connections end-to-end.", order: 3, type: "Process" },
    { question: "What makes Horizon Nepal different from competitors?", answer: "Transparent pricing, weekly client reporting, third-party quality inspections, and a 5-year structural warranty as standard.", order: 4, type: "General" },
    { question: "How do I get started with a project consultation?", answer: "Book a free 30-minute consultation through the form below or call our office directly.", order: 5, type: "Process" },
  ];
  for (const f of faqs) {
    await prisma.fAQ.create({
      data: {
        question: f.question,
        answer: f.answer,
        order: f.order,
        faqTypeId: faqTypeMap[f.type],
      },
    });
  }

  const news = [
    { title: "How Earthquake-Resilient Design Is Reshaping Kathmandu Housing", slug: "earthquake-resilient-design-kathmandu", excerpt: "New code-compliant techniques are quietly transforming residential construction across the valley.", category: "Engineering", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80", alt: "Earthquake resilient building design", publishedAt: new Date("2024-03-12") },
    { title: "Inside Our Net-Zero Office Tower Pilot in New Baneshwor", slug: "net-zero-office-tower-banemashwor", excerpt: "From rooftop solar to greywater systems — a look at Nepal's first carbon-neutral commercial build.", category: "Sustainability", image: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=900&q=80", alt: "Net-zero office tower", publishedAt: new Date("2024-02-28") },
    { title: "Why Local Materials Matter: A Field Report from Pokhara", slug: "local-materials-pokhara-field-report", excerpt: "Sourcing stone, slate and timber within 50 km of site is changing project economics.", category: "Field Notes", image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=900&q=80", alt: "Local construction materials in Pokhara", publishedAt: new Date("2024-02-10") },
  ];
  for (const n of news) {
    await prisma.newsArticle.create({ data: { ...n, readingTimeMinutes: 3 } });
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
