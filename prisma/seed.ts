import { prisma } from "@/lib/db/db";

async function main() {
  console.log("Seeding text-content entries...");

  // Quote Banner (main rotating quotes)
  await prisma.textContent.upsert({
    where: { slug: "quote-banner" },
    update: {},
    create: {
      slug: "quote-banner",
      label: "Quote Banner (Rotating)",
      headingEn:
        "Building your home should be one of the most exciting journeys in your life — let us make it unforgettable.",
      headingNp:
        "आफ्नो घर बनाउनु जीवनको सबैभन्दा रोमाञ्चक यात्रा हुनुपर्छ — हामीलाई यसलाई अविस्मरणीय बनाउन दिनुहोस्।",
      subheadingEn: "— Rajesh Shrestha, Founder",
      subheadingNp: "— राजेश श्रेष्ठ, संस्थापक",
    },
  });

  // Quote Banner Secondary (single quote, used on how-we-work etc.)
  await prisma.textContent.upsert({
    where: { slug: "quote-banner-secondary" },
    update: {},
    create: {
      slug: "quote-banner-secondary",
      label: "Quote Banner Secondary",
      headingEn:
        "Every structure we build is a reflection of our passion for quality, our respect for the land, and our commitment to the families who will call it home.",
      headingNp:
        "हामीले बनाएको हरेक संरचना गुणस्तरप्रतिको हाम्रो जोश, जमिनप्रतिको सम्मान र यसलाई घर भन्ने परिवारहरूप्रतिको प्रतिबद्धताको प्रतिबिम्ब हो।",
      subheadingEn: "— Horizon Nepal Team",
      subheadingNp: "— होराइजन नेपाल टोली",
    },
  });

  // How We Work Hero
  await prisma.textContent.upsert({
    where: { slug: "how-we-work-hero" },
    update: {},
    create: {
      slug: "how-we-work-hero",
      label: "How We Work Hero",
      headingEn: "From Blueprint to<br />Keys in Hand",
      headingNp: "ब्लुप्रिन्टदेखि<br />साँचो हातमा",
      subheadingEn:
        "We follow a structured, transparent process that keeps you informed and in control at every stage of your project.",
      subheadingNp:
        "हामी एक संरचित, पारदर्शी प्रक्रिया पछ्याउँछौं जसले तपाईंलाई तपाईंको परियोजनाको हरेक चरणमा सूचित र नियन्त्रणमा राख्दछ।",
    },
  });

  // About Hero
  await prisma.textContent.upsert({
    where: { slug: "about-hero" },
    update: {},
    create: {
      slug: "about-hero",
      label: "About Hero",
      headingEn: "Building Nepal's Future,<br />One Structure at a Time",
      headingNp: "नेपालको भविष्य निर्माण गर्दै,<br />एक पटकमा एक संरचना",
      subheadingEn:
        "For over two decades, Horizon Nepal has been turning dreams into addresses — delivering quality construction, interior design, and material expertise across the country.",
      subheadingNp:
        "दुई दशकभन्दा बढी समयदेखि, होराइजन नेपालले सपनालाई ठेगानामा परिणत गर्दै आएको छ — देशभर गुणस्तरीय निर्माण, आन्तरिक डिजाइन र सामग्री विशेषज्ञता प्रदान गर्दै।",
    },
  });

  // Contact Hero
  await prisma.textContent.upsert({
    where: { slug: "contact-hero" },
    update: {},
    create: {
      slug: "contact-hero",
      label: "Contact Hero",
      headingEn: "Let's Start<br />Your Project",
      headingNp: "तपाईंको परियोजना<br />सुरु गरौं",
      subheadingEn:
        "Whether you have a full blueprint or just a spark of an idea, we are ready to listen, advise, and bring your vision to life.",
      subheadingNp:
        "तपाईंसँग पूर्ण ब्लुप्रिन्ट होस् वा एउटा विचारको चिनगारी मात्र, हामी सुन्न, सल्लाह दिन र तपाईंको दृष्टिलाई जीवनमा ल्याउन तयार छौं।",
    },
  });

  console.log("Seeding section-content entries for Quote Banners...");

  // Section-content for main Quote Banner: store up to 3 quotes as JSON
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "quote-banner", key: "quotes" } },
    update: {},
    create: {
      section: "quote-banner",
      key: "quotes",
      valueEn: JSON.stringify([
        {
          text: "Building your home should be one of the most exciting journeys in your life — let us make it unforgettable.",
          attr: "Rajesh Shrestha, Founder",
        },
        {
          text: "Quality is not an act, it is a habit. At Horizon Nepal, quality is the foundation of everything we build.",
          attr: "Anita Gurung, Project Manager",
        },
        {
          text: "Your dream home is not just walls and a roof — it is where your story unfolds. We treat every project with that belief.",
          attr: "Sagar Thapa, Lead Architect",
        },
      ]),
      valueNp: JSON.stringify([
        {
          text: "आफ्नो घर बनाउनु जीवनको सबैभन्दा रोमाञ्चक यात्रा हुनुपर्छ — हामीलाई यसलाई अविस्मरणीय बनाउन दिनुहोस्।",
          attr: "राजेश श्रेष्ठ, संस्थापक",
        },
        {
          text: "गुणस्तर भनेको कार्य होइन, यो बानी हो। होराइजन नेपालमा, गुणस्तर हामीले निर्माण गर्ने हरेक कुराको जग हो।",
          attr: "अनिता गुरुङ, परियोजना प्रबन्धक",
        },
        {
          text: "तपाईंको सपनाको घर भनेको पर्खाल र छत मात्र होइन — यो तपाईंको कथा खुल्ने ठाउँ हो। हामी हरेक परियोजनालाई त्यही विश्वासका साथ व्यवहार गर्छौं।",
          attr: "सागर थापा, प्रमुख वास्तुकार",
        },
      ]),
      order: 0,
    },
  });

  await prisma.sectionContent.upsert({
    where: { section_key: { section: "quote-banner", key: "bgImage" } },
    update: {},
    create: {
      section: "quote-banner",
      key: "bgImage",
      valueEn: "",
      valueNp: "",
      mediaUrl:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2000&q=80",
      mediaType: "image",
      order: 1,
    },
  });

  // Section-content for Quote Banner Secondary
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "quote-banner-secondary", key: "quoteText" } },
    update: {},
    create: {
      section: "quote-banner-secondary",
      key: "quoteText",
      valueEn:
        "Every structure we build is a reflection of our passion for quality, our respect for the land, and our commitment to the families who will call it home.",
      valueNp:
        "हामीले बनाएको हरेक संरचना गुणस्तरप्रतिको हाम्रो जोश, जमिनप्रतिको सम्मान र यसलाई घर भन्ने परिवारहरूप्रतिको प्रतिबद्धताको प्रतिबिम्ब हो।",
      order: 0,
    },
  });

  await prisma.sectionContent.upsert({
    where: { section_key: { section: "quote-banner-secondary", key: "quoteAttr" } },
    update: {},
    create: {
      section: "quote-banner-secondary",
      key: "quoteAttr",
      valueEn: "Horizon Nepal Team",
      valueNp: "होराइजन नेपाल टोली",
      order: 1,
    },
  });

  console.log("Seeding section-content entries for hero backgrounds...");

  // Homepage Hero bgImage
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "hero", key: "bgImage" } },
    update: {},
    create: {
      section: "hero", key: "bgImage",
      mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
      mediaType: "image", order: 0,
    },
  });

  // About Hero bgImage
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "bgImage" } },
    update: {},
    create: {
      section: "about", key: "bgImage",
      mediaUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80",
      mediaType: "image", order: 0,
    },
  });

  // About gallery images (ImageGrid)
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "gallery" } },
    update: {},
    create: {
      section: "about", key: "gallery",
      valueEn: JSON.stringify([
        { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", alt: "Modern house exterior" },
        { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80", alt: "Luxury home interior" },
        { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80", alt: "Construction site" },
        { src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=600&q=80", alt: "Architectural blueprint" },
        { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80", alt: "Building structure" },
        { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80", alt: "Residential complex" },
        { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80", alt: "Interior design" },
        { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=600&q=80", alt: "Team at construction site" },
      ]),
      order: 1,
    },
  });

  // About team members (TeamSection)
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "team" } },
    update: {},
    create: {
      section: "about", key: "team",
      valueEn: JSON.stringify([
        { name: "Arun Thapa", role: "Lead Architect", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
        { name: "Priya Shrestha", role: "Project Manager", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
        { name: "Bikash Tamang", role: "Civil Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
        { name: "Sunita Rai", role: "Interior Designer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
      ]),
      order: 2,
    },
  });

  // How We Work Hero bgImage
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "how-we-work", key: "bgImage" } },
    update: {},
    create: {
      section: "how-we-work", key: "bgImage",
      mediaUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80",
      mediaType: "image", order: 0,
    },
  });

  // Contact Hero bgImage
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "contact", key: "bgImage" } },
    update: {},
    create: {
      section: "contact", key: "bgImage",
      mediaUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80",
      mediaType: "image", order: 0,
    },
  });

  // Portfolio (projects listing) Hero bgImage + label + h1 + subtitle
  const portfolioItems = [
    { key: "bgImage", valueEn: "", valueNp: "",
      mediaUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80",
      mediaType: "image", order: 0 },
    { key: "label", valueEn: "Our Portfolio", valueNp: "हाम्रो पोर्टफोलियो", order: 1 },
    { key: "h1", valueEn: "All Projects", valueNp: "सबै परियोजनाहरू", order: 2 },
    { key: "subtitle", valueEn: "Explore our completed and ongoing projects across Nepal — from residential villas to commercial towers and infrastructure.",
      valueNp: "नेपालभर हाम्रा पूरा भएका र चलिरहेका परियोजनाहरू हेर्नुहोस् — आवासीय भिलादेखि व्यावसायिक टावर र पूर्वाधारसम्म।", order: 3 },
  ];
  for (const item of portfolioItems) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "portfolio", key: item.key } },
      update: {},
      create: { section: "portfolio", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp,
        mediaUrl: "mediaUrl" in item ? item.mediaUrl : null,
        mediaType: "mediaType" in item ? item.mediaType : null,
        order: item.order },
    });
  }

  // News listing Hero bgImage + label + h1 + subtitle
  const newsItems = [
    { key: "bgImage", valueEn: "", valueNp: "",
      mediaUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
      mediaType: "image", order: 0 },
    { key: "label", valueEn: "Stay Informed", valueNp: "जानकारी रहनुहोस्", order: 1 },
    { key: "h1", valueEn: "All News Articles", valueNp: "सबै समाचार लेखहरू", order: 2 },
    { key: "subtitle", valueEn: "Read the latest updates, insights, and stories from the Horizon Nepal team — covering construction, design, engineering, and more.",
      valueNp: "होराइजन नेपाल टोलीका नवीनतम अपडेट, अन्तर्दृष्टि र कथाहरू पढ्नुहोस् — निर्माण, डिजाइन, इन्जिनियरिङ र थप कुराहरू।", order: 3 },
  ];
  for (const item of newsItems) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "news", key: item.key } },
      update: {},
      create: { section: "news", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp,
        mediaUrl: "mediaUrl" in item ? item.mediaUrl : null,
        mediaType: "mediaType" in item ? item.mediaType : null,
        order: item.order },
    });
  }

  // FAQ Hero bgImage + label + h1 + subtitle
  const faqItems = [
    { key: "bgImage", valueEn: "", valueNp: "",
      mediaUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80",
      mediaType: "image", order: 0 },
    { key: "label", valueEn: "FAQ", valueNp: "प्रायः सोधिने प्रश्नहरू", order: 1 },
    { key: "h1", valueEn: "Frequently Asked Questions", valueNp: "प्रायः सोधिने प्रश्नहरू", order: 2 },
    { key: "subtitle", valueEn: "Everything you need to know about working with Horizon Nepal — from first consultation to final handover and beyond.",
      valueNp: "होराइजन नेपालसँग काम गर्ने बारेमा तपाईंलाई थाहा हुनु आवश्यक सबै कुरा — पहिलो परामर्शदेखि अन्तिम हस्तान्तरण र त्यसपछि पनि।", order: 3 },
  ];
  for (const item of faqItems) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "faq", key: item.key } },
      update: {},
      create: { section: "faq", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp,
        mediaUrl: "mediaUrl" in item ? item.mediaUrl : null,
        mediaType: "mediaType" in item ? item.mediaType : null,
        order: item.order },
    });
  }

  // ──────────────────────────────────────────────
  // HERO (homepage) — text keys
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for hero text...");
  const heroTexts = [
    { key: "label", valueEn: "Nepal's Premier Construction Partner", valueNp: "नेपालको प्रमुख निर्माण साझेदार", order: 1 },
    { key: "h1", valueEn: "Building Nepal's Future,<br />One Structure at a Time", valueNp: "नेपालको भविष्य निर्माण गर्दै,<br />एक पटकमा एक संरचना", order: 2 },
    { key: "subtitle", valueEn: "From residential dreams to commercial landmarks — Horizon Nepal delivers quality construction, interior design, and building materials across the country.", valueNp: "आवासीय सपनादेखि व्यावसायिक स्थलचिह्नसम्म — होराइजन नेपालले देशभर गुणस्तरीय निर्माण, आन्तरिक डिजाइन र निर्माण सामग्री प्रदान गर्दछ।", order: 3 },
    { key: "cta", valueEn: "Start Your Project", valueNp: "तपाईंको परियोजना सुरु गर्नुहोस्", order: 4 },
    { key: "cta2", valueEn: "Explore Our Work", valueNp: "हाम्रो काम हेर्नुहोस्", order: 5 },
    { key: "trustText", valueEn: "Trusted by 50+ clients across Nepal", valueNp: "नेपालभर ५०+ ग्राहकहरूद्वारा विश्वसनीय", order: 6 },
    { key: "cardTitle", valueEn: "Sunrise Residential Complex", valueNp: "सनराइज आवासीय कम्प्लेक्स", order: 7 },
    { key: "cardLocation", valueEn: "Lalitpur, Nepal", valueNp: "ललितपुर, नेपाल", order: 8 },
    { key: "cardStatus", valueEn: "Completed", valueNp: "सम्पन्न", order: 9 },
  ];
  for (const item of heroTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "hero", key: item.key } },
      update: {},
      create: { section: "hero", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  // ──────────────────────────────────────────────
  // SERVICES (homepage)
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for services...");
  const servicesTexts = [
    { key: "label", valueEn: "Our Services", valueNp: "हाम्रो सेवाहरू", order: 1 },
    { key: "h2", valueEn: "Everything You Need for Your Dream Project", valueNp: "तपाईंको सपनाको परियोजनाको लागि सबै आवश्यक कुरा", order: 2 },
    { key: "subtitle", valueEn: "From foundation to finishing — we cover every aspect of modern construction and design.", valueNp: "जगदेखि फिनिशिङसम्म — हामी आधुनिक निर्माण र डिजाइनको हरेक पक्षलाई कभर गर्छौं।", order: 3 },
    { key: "explore", valueEn: "Explore All Services", valueNp: "सबै सेवाहरू हेर्नुहोस्", order: 4 },
  ];
  for (const item of servicesTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "services", key: item.key } },
      update: {},
      create: { section: "services", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  // services: 3D model path
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "services", key: "sandModelPath" } },
    update: {},
    create: { section: "services", key: "sandModelPath", mediaUrl: "", mediaType: "model", order: 5 },
  });

  // services: cards JSON
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "services", key: "cards" } },
    update: {},
    create: {
      section: "services", key: "cards",
      valueEn: JSON.stringify([
        { icon: "Building2", title: "Construction", body: "End-to-end residential and commercial construction — from site preparation to final handover with uncompromising quality." },
        { icon: "Palette", title: "Interior Design", body: "Modern, functional interiors tailored to your taste — combining aesthetics with practicality for every space." },
        { icon: "HardHat", title: "Project Management", body: "Full-spectrum project oversight ensuring timelines, budgets, and quality standards are met at every stage." },
        { icon: "Warehouse", title: "Building Materials", body: "Premium-grade materials sourced from trusted suppliers — ensuring durability, safety, and value for your investment." },
        { icon: "Ruler", title: "Architecture & Design", body: "Innovative architectural solutions that blend modern design with local context and sustainable practices." },
        { icon: "Shield", title: "Quality Assurance", body: "Rigorous quality checks at every milestone — because your peace of mind is as important as the structure itself." },
      ]),
      valueNp: JSON.stringify([
        { icon: "Building2", title: "निर्माण", body: "पूर्ण आवासीय र व्यावसायिक निर्माण — साइट तयारीदेखि अन्तिम हस्तान्तरणसम्म, अविचलित गुणस्तरका साथ।" },
        { icon: "Palette", title: "आन्तरिक डिजाइन", body: "तपाईंको रुचि अनुसार आधुनिक, कार्यात्मक आन्तरिक सजावट — हरेक स्थानको लागि सौन्दर्य र व्यावहारिकताको संयोजन।" },
        { icon: "HardHat", title: "परियोजना व्यवस्थापन", body: "समयसीमा, बजेट र गुणस्तर मापदण्डहरू हरेक चरणमा पूरा भएको सुनिश्चित गर्ने पूर्ण परियोजना निरीक्षण।" },
        { icon: "Warehouse", title: "निर्माण सामग्री", body: "विश्वसनीय आपूर्तिकर्ताहरूबाट प्रिमियम-ग्रेड सामग्री — तपाईंको लगानीको लागि स्थायित्व, सुरक्षा र मूल्य सुनिश्चित गर्दै।" },
        { icon: "Ruler", title: "वास्तुकला र डिजाइन", body: "आधुनिक डिजाइनलाई स्थानीय सन्दर्भ र दिगो अभ्यासहरूसँग मिश्रण गर्ने नवीन वास्तुकला समाधानहरू।" },
        { icon: "Shield", title: "गुणस्तर आश्वासन", body: "हरेक माइलस्टोनमा कठोर गुणस्तर जाँच — किनकि तपाईंको मानसिक शान्ति संरचना जत्तिकै महत्त्वपूर्ण छ।" },
      ]),
      order: 6,
    },
  });

  // ──────────────────────────────────────────────
  // PROCESS (homepage)
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for process...");
  const processTexts = [
    { key: "label", valueEn: "Our Process", valueNp: "हाम्रो प्रक्रिया", order: 1 },
    { key: "h2", valueEn: "How We Bring Your Vision to Life", valueNp: "हामी कसरी तपाईंको दृष्टिलाई जीवनमा ल्याउँछौं", order: 2 },
    { key: "subtitle", valueEn: "A clear, collaborative journey from first conversation to keys in hand.", valueNp: "पहिलो कुराकानीदेखि साँचो हातमा सम्मको स्पष्ट, सहकार्यात्मक यात्रा।", order: 3 },
    { key: "simpleSteps", valueEn: "Simple Steps", valueNp: "सरल चरणहरू", order: 4 },
  ];
  for (const item of processTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "process", key: item.key } },
      update: {},
      create: { section: "process", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  await prisma.sectionContent.upsert({
    where: { section_key: { section: "process", key: "steps" } },
    update: {},
    create: {
      section: "process", key: "steps",
      valueEn: JSON.stringify([
        { title: "Consultation", body: "We sit down with you to understand your vision, requirements, and budget — laying the groundwork for a successful partnership." },
        { title: "Design & Planning", body: "Our architects and engineers create detailed plans, 3D visualizations, and material schedules tailored to your project." },
        { title: "Construction", body: "With a dedicated project manager on-site, we execute with precision — keeping you updated at every milestone." },
        { title: "Handover", body: "We walk you through every detail of your completed project, ensuring everything meets our shared standard of excellence." },
      ]),
      valueNp: JSON.stringify([
        { title: "परामर्श", body: "हामी तपाईंको दृष्टि, आवश्यकता र बजेट बुझ्न तपाईंसँग बस्छौं — सफल साझेदारीको लागि जग बसाल्दै।" },
        { title: "डिजाइन र योजना", body: "हाम्रा वास्तुकार र इन्जिनियरहरूले तपाईंको परियोजना अनुरूप विस्तृत योजना, ३D भिजुअलाइजेसन र सामग्री तालिका सिर्जना गर्छन्।" },
        { title: "निर्माण", body: "समर्पित परियोजना प्रबन्धकको साथ, हामी सटीकताका साथ कार्यान्वयन गर्छौं — हरेक माइलस्टोनमा तपाईंलाई अपडेट राख्दै।" },
        { title: "हस्तान्तरण", body: "हामी तपाईंलाई तपाईंको सम्पन्न परियोजनाको हरेक विवरणमा हिंडाउँछौं, सबै कुरा हाम्रो साझा उत्कृष्टता मापदण्ड अनुसार छ भनी सुनिश्चित गर्दै।" },
      ]),
      order: 5,
    },
  });

  // ──────────────────────────────────────────────
  // PORTFOLIO — homepage section text (h2, viewAll, viewProject)
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for portfolio text...");
  const portfolioTexts = [
    { key: "h2", valueEn: "Our Recent Projects", valueNp: "हाम्रा हालैका परियोजनाहरू", order: 10 },
    { key: "viewAll", valueEn: "View All Projects", valueNp: "सबै परियोजनाहरू हेर्नुहोस्", order: 11 },
    { key: "viewProject", valueEn: "View Project", valueNp: "परियोजना हेर्नुहोस्", order: 12 },
  ];
  for (const item of portfolioTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "portfolio", key: item.key } },
      update: {},
      create: { section: "portfolio", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  // ──────────────────────────────────────────────
  // NEWS — homepage section text (h2, readMore, viewAll) + model path
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for news...");
  const newsTexts = [
    { key: "h2", valueEn: "Latest From Our Blog", valueNp: "हाम्रो ब्लगबाट नवीनतम", order: 10 },
    { key: "readMore", valueEn: "Read More", valueNp: "थप पढ्नुहोस्", order: 11 },
    { key: "viewAll", valueEn: "All News Articles", valueNp: "सबै समाचार लेखहरू", order: 12 },
  ];
  for (const item of newsTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "news", key: item.key } },
      update: {},
      create: { section: "news", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  await prisma.sectionContent.upsert({
    where: { section_key: { section: "news", key: "bridgeModelPath" } },
    update: {},
    create: { section: "news", key: "bridgeModelPath", mediaUrl: "", mediaType: "model", order: 13 },
  });

  // ──────────────────────────────────────────────
  // FAQ — homepage section text (h2, ask, viewAll) + model path
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for faq...");
  const faqTexts = [
    { key: "h2", valueEn: "Frequently Asked Questions", valueNp: "प्रायः सोधिने प्रश्नहरू", order: 10 },
    { key: "ask", valueEn: "Ask a Question", valueNp: "प्रश्न सोध्नुहोस्", order: 11 },
    { key: "viewAll", valueEn: "View All FAQs", valueNp: "सबै FAQ हेर्नुहोस्", order: 12 },
  ];
  for (const item of faqTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "faq", key: item.key } },
      update: {},
      create: { section: "faq", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  await prisma.sectionContent.upsert({
    where: { section_key: { section: "faq", key: "stopModelPath" } },
    update: {},
    create: { section: "faq", key: "stopModelPath", mediaUrl: "", mediaType: "model", order: 13 },
  });

  // ──────────────────────────────────────────────
  // TESTIMONIALS
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for testimonials...");
  const testimonialsTexts = [
    { key: "label", valueEn: "Testimonials", valueNp: "प्रशंसापत्र", order: 1 },
    { key: "h2", valueEn: "What Our Clients Say", valueNp: "हाम्रा ग्राहकहरू के भन्छन्", order: 2 },
    { key: "prev", valueEn: "Previous", valueNp: "अघिल्लो", order: 3 },
    { key: "next", valueEn: "Next", valueNp: "अर्को", order: 4 },
  ];
  for (const item of testimonialsTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "testimonials", key: item.key } },
      update: {},
      create: { section: "testimonials", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  await prisma.sectionContent.upsert({
    where: { section_key: { section: "testimonials", key: "testimonials" } },
    update: {},
    create: {
      section: "testimonials", key: "testimonials",
      valueEn: JSON.stringify([
        { name: "Ramesh Adhikari", role: "Homeowner, Lalitpur", quote: "Horizon Nepal turned our dream home into reality. Their attention to detail and commitment to quality exceeded our expectations.", initials: "RA" },
        { name: "Sita Poudel", role: "Developer, Kathmandu", quote: "We have worked with Horizon on three commercial projects now. Their project management is world-class, and they deliver on time.", initials: "SP" },
        { name: "Deepak Thapa", role: "Architect Partner", quote: "The team at Horizon brings an incredible level of professionalism and technical expertise. A pleasure to collaborate with.", initials: "DT" },
      ]),
      valueNp: JSON.stringify([
        { name: "रमेश अधिकारी", role: "गृहधनी, ललितपुर", quote: "होराइजन नेपालले हाम्रो सपनाको घरलाई वास्तविकतामा परिणत गर्यो। विवरणमा उनीहरूको ध्यान र गुणस्तरप्रतिको प्रतिबद्धताले हाम्रो अपेक्षा पार गर्यो।", initials: "र.अ." },
        { name: "सीता पौडेल", role: "विकासकर्ता, काठमाडौं", quote: "हामीले होराइजनसँग तीन वटा व्यावसायिक परियोजनाहरूमा काम गरिसकेका छौं। उनीहरूको परियोजना व्यवस्थापन विश्वस्तरीय छ, र उनीहरू समयमै डेलिभर गर्छन्।", initials: "सी.पौ." },
        { name: "दीपक थापा", role: "वास्तुकार साझेदार", quote: "होराइजनको टोलीले अविश्वसनीय व्यावसायिकता र प्राविधिक विशेषज्ञता ल्याउँछ। सहकार्य गर्न खुसी लाग्छ।", initials: "दी.था." },
      ]),
      order: 5,
    },
  });

  // ──────────────────────────────────────────────
  // ABOUT — remaining text + JSON keys
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for about...");
  const aboutTexts = [
    // AboutHero
    { key: "label", valueEn: "About Horizon Nepal", valueNp: "होराइजन नेपालको बारेमा", order: 10 },
    { key: "description", valueEn: "For over two decades, Horizon Nepal has been turning dreams into addresses — delivering quality construction, interior design, and material expertise across the country.", valueNp: "दुई दशकभन्दा बढी समयदेखि, होराइजन नेपालले सपनालाई ठेगानामा परिणत गर्दै आएको छ — देशभर गुणस्तरीय निर्माण, आन्तरिक डिजाइन र सामग्री विशेषज्ञता प्रदान गर्दै।", order: 11 },
    { key: "cta", valueEn: "Start Your Project", valueNp: "तपाईंको परियोजना सुरु गर्नुहोस्", order: 12 },
    { key: "ctaAbout", valueEn: "See Our Projects", valueNp: "हाम्रा परियोजनाहरू हेर्नुहोस्", order: 13 },
    // AboutSection
    { key: "aboutLabel", valueEn: "Our Story", valueNp: "हाम्रो कथा", order: 20 },
    { key: "aboutH2", valueEn: "Building Nepal's Future, One Structure at a Time", valueNp: "नेपालको भविष्य निर्माण गर्दै, एक पटकमा एक संरचना", order: 21 },
    { key: "aboutSubtitle", valueEn: "For over two decades, Horizon Nepal has been a trusted name in construction, interior design, and building materials across Nepal.", valueNp: "दुई दशकभन्दा बढी समयदेखि, होराइजन नेपाल नेपालभर निर्माण, आन्तरिक डिजाइन र निर्माण सामग्रीमा विश्वसनीय नाम हो।", order: 22 },
    { key: "storyLabel", valueEn: "Our Approach", valueNp: "हाम्रो दृष्टिकोण", order: 23 },
    { key: "storyTitle", valueEn: "More Than Just Building — We Create Homes", valueNp: "केवल निर्माण होइन — हामी घरहरू सिर्जना गर्छौं", order: 24 },
    { key: "story1", valueEn: "Horizon Nepal was founded with a simple mission: to make quality construction accessible to every Nepali family. What started as a small team of passionate engineers has grown into one of the country's most trusted construction partners.", valueNp: "होराइजन नेपाल एक सरल मिसनको साथ स्थापित भएको थियो: हरेक नेपाली परिवारलाई गुणस्तरीय निर्माण सुलभ बनाउन। जुन एउटा सानो टोलीको रूपमा सुरु भयो, त्यो देशको सबैभन्दा विश्वसनीय निर्माण साझेदारहरू मध्ये एकमा परिणत भएको छ।", order: 25 },
    { key: "story2", valueEn: "Today, we bring together architects, engineers, designers, and project managers who share a single commitment: delivering excellence on every project, regardless of scale.", valueNp: "आज, हामी वास्तुकार, इन्जिनियर, डिजाइनर र परियोजना प्रबन्धकहरूलाई एकसाथ ल्याउँछौं जो एक प्रतिबद्धता साझा गर्छन्: हरेक परियोजनामा, मापनको पर्वाह नगरी, उत्कृष्टता प्रदान गर्ने।", order: 26 },
    { key: "valuesLabel", valueEn: "Our Core Values", valueNp: "हाम्रो मूल मान्यताहरू", order: 27 },
    { key: "valuesTitle", valueEn: "What Drives Us Every Day", valueNp: "हामीलाई हरेक दिन के प्रेरित गर्छ", order: 28 },
    { key: "h2", valueEn: "Building Nepal's Future, One Structure at a Time", valueNp: "नेपालको भविष्य निर्माण गर्दै, एक पटकमा एक संरचना", order: 14 },
    { key: "aboutCta", valueEn: "View Our Projects", valueNp: "हाम्रा परियोजनाहरू हेर्नुहोस्", order: 29 },
    // HelpSection
    { key: "helpLabel", valueEn: "How We Can Help", valueNp: "हामी कसरी मद्दत गर्न सक्छौं", order: 30 },
    { key: "helpHeading", valueEn: "Every Service You Need Under One Roof", valueNp: "तपाईंलाई चाहिने हरेक सेवा एकै छानामुनि", order: 31 },
    { key: "helpSubtitle", valueEn: "Whether you are building from scratch, renovating, or just exploring ideas, our team has the expertise to guide you.", valueNp: "चाहे तपाईं सुरुदेखि निर्माण गर्दै हुनुहुन्छ, नवीकरण गर्दै हुनुहुन्छ, वा केवल विचारहरू खोज्दै हुनुहुन्छ, हाम्रो टोलीसँग तपाईंलाई मार्गदर्शन गर्ने विशेषज्ञता छ।", order: 32 },
  ];
  for (const item of aboutTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "about", key: item.key } },
      update: {},
      create: { section: "about", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  // about: model path
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "aboutModel" } },
    update: {},
    create: { section: "about", key: "aboutModel", mediaUrl: "/glb/house.glb", mediaType: "model", order: 33 },
  });

  // about: heroStats (AboutHero — icon-based)
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "heroStats" } },
    update: {},
    create: {
      section: "about", key: "heroStats",
      valueEn: JSON.stringify([
        { icon: "Shield", label: "25+ Years Experience" },
        { icon: "Award", label: "200+ Projects Done" },
        { icon: "Building2", label: "50+ Team Members" },
        { icon: "Users", label: "15+ Districts" },
      ]),
      valueNp: JSON.stringify([
        { icon: "Shield", label: "२५+ वर्ष अनुभव" },
        { icon: "Award", label: "२००+ परियोजनाहरू" },
        { icon: "Building2", label: "५०+ टोली सदस्यहरू" },
        { icon: "Users", label: "१५+ जिल्लाहरू" },
      ]),
      order: 34,
    },
  });

  // about: stats (AboutSection — numeric value/label)
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "stats" } },
    update: {},
    create: {
      section: "about", key: "stats",
      valueEn: JSON.stringify([
        { value: "25+", label: "Years Experience" },
        { value: "200+", label: "Projects Done" },
        { value: "50+", label: "Team Members" },
        { value: "15+", label: "Districts Served" },
      ]),
      valueNp: JSON.stringify([
        { value: "२५+", label: "वर्ष अनुभव" },
        { value: "२००+", label: "परियोजनाहरू" },
        { value: "५०+", label: "टोली सदस्य" },
        { value: "१५+", label: "जिल्लाहरू" },
      ]),
      order: 35,
    },
  });

  // about: values
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "values" } },
    update: {},
    create: {
      section: "about", key: "values",
      valueEn: JSON.stringify([
        { title: "Quality First", body: "We never compromise on materials, workmanship, or safety. Every project undergoes rigorous quality assurance." },
        { title: "Transparency", body: "From budget breakdowns to project timelines, we keep you informed and involved at every stage." },
        { title: "Innovation", body: "We embrace modern construction techniques, sustainable practices, and cutting-edge design to deliver the best results." },
        { title: "Community", body: "As a Nepali company, we are deeply committed to supporting local talent, suppliers, and the communities we build in." },
      ]),
      valueNp: JSON.stringify([
        { title: "गुणस्तर पहिलो", body: "हामी सामग्री, कारीगरी वा सुरक्षामा कहिल्यै सम्झौता गर्दैनौं। हरेक परियोजना कठोर गुणस्तर आश्वासनबाट गुज्रिन्छ।" },
        { title: "पारदर्शिता", body: "बजेट विवरणदेखि परियोजना समयसीमासम्म, हामी तपाईंलाई हरेक चरणमा सूचित र संलग्न राख्छौं।" },
        { title: "नवीनता", body: "हामी उत्तम परिणामहरू प्रदान गर्न आधुनिक निर्माण प्रविधिहरू, दिगो अभ्यासहरू र अत्याधुनिक डिजाइनलाई अंगाल्छौं।" },
        { title: "समुदाय", body: "नेपाली कम्पनीको रूपमा, हामी स्थानीय प्रतिभा, आपूर्तिकर्ताहरू र हामीले निर्माण गर्ने समुदायहरूलाई समर्थन गर्न प्रतिबद्ध छौं।" },
      ]),
      order: 36,
    },
  });

  // about: helpItems
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "helpItems" } },
    update: {},
    create: {
      section: "about", key: "helpItems",
      valueEn: JSON.stringify([
        { icon: "Building2", title: "New Construction", description: "Build your dream home or commercial property from the ground up with end-to-end support." },
        { icon: "Paintbrush", title: "Renovation & Remodeling", description: "Transform existing spaces with modern design, improved layouts, and upgraded finishes." },
        { icon: "Ruler", title: "Interior Design", description: "Stylish, functional interiors tailored to your taste with expert space planning." },
        { icon: "ShieldCheck", title: "Quality Inspection", description: "Independent quality assessments to ensure your project meets the highest standards." },
        { icon: "MapPin", title: "Site Selection", description: "Expert guidance on choosing the right location for your residential or commercial project." },
        { icon: "Warehouse", title: "Material Supply", description: "Premium construction materials at competitive prices with reliable delivery." },
      ]),
      valueNp: JSON.stringify([
        { icon: "Building2", title: "नयाँ निर्माण", description: "पूर्ण सहयोगको साथ आफ्नो सपनाको घर वा व्यावसायिक सम्पत्ति जगदेखि निर्माण गर्नुहोस्।" },
        { icon: "Paintbrush", title: "नवीकरण", description: "आधुनिक डिजाइन, सुधारिएको लेआउट र अपग्रेड गरिएको फिनिशको साथ अवस्थित स्थानहरू परिवर्तन गर्नुहोस्।" },
        { icon: "Ruler", title: "आन्तरिक डिजाइन", description: "विज्ञ स्पेस योजनाको साथ तपाईंको रुचि अनुरूप स्टाइलिश, कार्यात्मक आन्तरिक सजावट।" },
        { icon: "ShieldCheck", title: "गुणस्तर निरीक्षण", description: "तपाईंको परियोजना उच्चतम मापदण्डहरू पूरा गरेको सुनिश्चित गर्न स्वतन्त्र गुणस्तर मूल्याङ्कन।" },
        { icon: "MapPin", title: "साइट चयन", description: "तपाईंको आवासीय वा व्यावसायिक परियोजनाको लागि सही स्थान छनौट गर्न विशेषज्ञ मार्गदर्शन।" },
        { icon: "Warehouse", title: "सामग्री आपूर्ति", description: "प्रतिस्पर्धी मूल्यहरूमा प्रिमियम निर्माण सामग्री विश्वसनीय डेलिभरीको साथ।" },
      ]),
      order: 37,
    },
  });

  // about: quotes + testimonials (for QuoteBanner + TestimonialsSection on about page)
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "quotes" } },
    update: {},
    create: {
      section: "about", key: "quotes",
      valueEn: JSON.stringify([
        { text: "Quality is not an act, it is a habit. At Horizon Nepal, quality is the foundation of everything we build.", attr: "Anita Gurung, Project Manager" },
        { text: "Your dream home is not just walls and a roof — it is where your story unfolds.", attr: "Sagar Thapa, Lead Architect" },
      ]),
      valueNp: JSON.stringify([
        { text: "गुणस्तर भनेको कार्य होइन, यो बानी हो। होराइजन नेपालमा, गुणस्तर हामीले निर्माण गर्ने हरेक कुराको जग हो।", attr: "अनिता गुरुङ, परियोजना प्रबन्धक" },
        { text: "तपाईंको सपनाको घर भनेको पर्खाल र छत मात्र होइन — यो तपाईंको कथा खुल्ने ठाउँ हो।", attr: "सागर थापा, प्रमुख वास्तुकार" },
      ]),
      order: 38,
    },
  });

  // about: testimonials for TestimonialsSection
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "about", key: "testimonials" } },
    update: {},
    create: {
      section: "about", key: "testimonials",
      valueEn: JSON.stringify([
        { name: "Ramesh Adhikari", role: "Homeowner, Lalitpur", quote: "Horizon Nepal turned our dream home into reality. Their attention to detail and commitment to quality exceeded our expectations.", initials: "RA" },
        { name: "Sita Poudel", role: "Developer, Kathmandu", quote: "We have worked with Horizon on three commercial projects now. Their project management is world-class, and they deliver on time.", initials: "SP" },
        { name: "Deepak Thapa", role: "Architect Partner", quote: "The team at Horizon brings an incredible level of professionalism and technical expertise. A pleasure to collaborate with.", initials: "DT" },
      ]),
      valueNp: JSON.stringify([
        { name: "रमेश अधिकारी", role: "गृहधनी, ललितपुर", quote: "होराइजन नेपालले हाम्रो सपनाको घरलाई वास्तविकतामा परिणत गर्यो। विवरणमा उनीहरूको ध्यान र गुणस्तरप्रतिको प्रतिबद्धताले हाम्रो अपेक्षा पार गर्यो।", initials: "र.अ." },
        { name: "सीता पौडेल", role: "विकासकर्ता, काठमाडौं", quote: "हामीले होराइजनसँग तीन वटा व्यावसायिक परियोजनाहरूमा काम गरिसकेका छौं। उनीहरूको परियोजना व्यवस्थापन विश्वस्तरीय छ, र उनीहरू समयमै डेलिभर गर्छन्।", initials: "सी.पौ." },
        { name: "दीपक थापा", role: "वास्तुकार साझेदार", quote: "होराइजनको टोलीले अविश्वसनीय व्यावसायिकता र प्राविधिक विशेषज्ञता ल्याउँछ। सहकार्य गर्न खुसी लाग्छ।", initials: "दी.था." },
      ]),
      order: 39,
    },
  });

  // about: testimonial text keys
  const aboutTestimonialTexts = [
    { key: "label", valueEn: "Testimonials", valueNp: "प्रशंसापत्र", order: 40 },
    { key: "h2", valueEn: "What Our Clients Say", valueNp: "हाम्रा ग्राहकहरू के भन्छन्", order: 41 },
    { key: "prev", valueEn: "Previous", valueNp: "अघिल्लो", order: 42 },
    { key: "next", valueEn: "Next", valueNp: "अर्को", order: 43 },
  ];
  for (const item of aboutTestimonialTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "about", key: item.key } },
      update: {},
      create: { section: "about", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  // ──────────────────────────────────────────────
  // CONTACT — remaining text + JSON keys
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for contact...");
  const contactTexts = [
    { key: "label", valueEn: "Get in Touch", valueNp: "सम्पर्क गर्नुहोस्", order: 10 },
    { key: "h2", valueEn: "Let's Start Your Project", valueNp: "तपाईंको परियोजना सुरु गरौं", order: 11 },
    { key: "subtitle", valueEn: "Whether you have a full blueprint or just a spark of an idea, we are ready to listen, advise, and bring your vision to life.", valueNp: "तपाईंसँग पूर्ण ब्लुप्रिन्ट होस् वा एउटा विचारको चिनगारी मात्र, हामी सुन्न, सल्लाह दिन र तपाईंको दृष्टिलाई जीवनमा ल्याउन तयार छौं।", order: 12 },
    { key: "submitText", valueEn: "Send Message", valueNp: "सन्देश पठाउनुहोस्", order: 12 },
    { key: "locationLabel", valueEn: "Our Location", valueNp: "हाम्रो स्थान", order: 13 },
    { key: "locationHeading", valueEn: "Visit Our Office", valueNp: "हाम्रो कार्यालय भ्रमण गर्नुहोस्", order: 14 },
    { key: "locationSubtitle", valueEn: "Stop by our office in Tinkune — we would love to meet you and discuss your project.", valueNp: "टिंकुनेमा हाम्रो कार्यालयमा आउनुहोस् — हामी तपाईंलाई भेट्न र तपाईंको परियोजनाको बारेमा छलफल गर्न पाउँदा खुसी हुनेछौं।", order: 15 },
    { key: "galleryLabel", valueEn: "Gallery", valueNp: "ग्यालरी", order: 16 },
    { key: "galleryHeading", valueEn: "Our Projects in Focus", valueNp: "हाम्रा परियोजनाहरू फोकसमा", order: 17 },
  ];
  for (const item of contactTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "contact", key: item.key } },
      update: {},
      create: { section: "contact", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  // contact: formModel path
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "contact", key: "formModel" } },
    update: {},
    create: { section: "contact", key: "formModel", mediaUrl: "/glb/mailbox.glb", mediaType: "model", order: 18 },
  });

  // contact: highlights JSON
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "contact", key: "highlights" } },
    update: {},
    create: {
      section: "contact", key: "highlights",
      valueEn: JSON.stringify([
        { icon: "Phone", label: "Call Us" },
        { icon: "Mail", label: "Email Us" },
        { icon: "MapPin", label: "Visit Us" },
        { icon: "Clock", label: "Office Hours" },
      ]),
      valueNp: JSON.stringify([
        { icon: "Phone", label: "फोन गर्नुहोस्" },
        { icon: "Mail", label: "इमेल गर्नुहोस्" },
        { icon: "MapPin", label: "भेट्नुहोस्" },
        { icon: "Clock", label: "कार्यालय समय" },
      ]),
      order: 19,
    },
  });

  // contact: gallery JSON
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "contact", key: "contactGallery" } },
    update: {},
    create: {
      section: "contact", key: "contactGallery",
      valueEn: JSON.stringify([
        { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", alt: "Modern house exterior" },
        { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", alt: "Luxury living room" },
        { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80", alt: "Construction site" },
        { src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80", alt: "Architectural blueprint" },
        { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", alt: "Building structure" },
        { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", alt: "Residential complex" },
      ]),
      order: 20,
    },
  });

  // ──────────────────────────────────────────────
  // HOW WE WORK — remaining text + JSON keys
  // ──────────────────────────────────────────────
  console.log("Seeding section-content entries for how-we-work...");
  const howWeWorkTexts = [
    // HowWeWorkHero
    { key: "label", valueEn: "How We Work", valueNp: "हामी कसरी काम गर्छौं", order: 10 },
    { key: "subtitle", valueEn: "We follow a structured, transparent process that keeps you informed and in control at every stage of your project.", valueNp: "हामी एक संरचित, पारदर्शी प्रक्रिया पछ्याउँछौं जसले तपाईंलाई तपाईंको परियोजनाको हरेक चरणमा सूचित र नियन्त्रणमा राख्दछ।", order: 11 },
    { key: "cta", valueEn: "Start Your Project", valueNp: "तपाईंको परियोजना सुरु गर्नुहोस्", order: 12 },
    { key: "cta2", valueEn: "Contact Us", valueNp: "हामीलाई सम्पर्क गर्नुहोस्", order: 13 },
    // WelcomeText
    { key: "welcomeLabel", valueEn: "Welcome", valueNp: "स्वागत छ", order: 14 },
    { key: "welcomeH2", valueEn: "We Make Building Simple", valueNp: "हामी निर्माणलाई सरल बनाउँछौं", order: 15 },
    { key: "welcomeBody", valueEn: "At Horizon Nepal, we believe that building your dream home or commercial space should be an exciting journey, not a stressful one. Our proven process ensures clarity, collaboration, and quality from the first meeting to the final walkthrough.", valueNp: "होराइजन नेपालमा, हामी विश्वास गर्छौं कि तपाईंको सपनाको घर वा व्यावसायिक स्थान निर्माण गर्नु एक रोमाञ्चक यात्रा हुनुपर्छ, तनावपूर्ण होइन। हाम्रो सिद्ध प्रक्रियाले पहिलो भेटदेखि अन्तिम वाकथ्रुसम्म स्पष्टता, सहकार्य र गुणस्तर सुनिश्चित गर्दछ।", order: 16 },
    // HowWeWorkProcess
    { key: "processLabel", valueEn: "Our Process", valueNp: "हाम्रो प्रक्रिया", order: 17 },
    { key: "processH2", valueEn: "From Blueprint to Keys in Hand", valueNp: "ब्लुप्रिन्टदेखि साँचो हातमा", order: 18 },
    { key: "processSubtitle", valueEn: "Every project follows our proven 5-step journey — designed to keep you informed, involved, and confident.", valueNp: "हरेक परियोजना हाम्रो सिद्ध ५-चरणीय यात्रा पछ्याउँछ — तपाईंलाई सूचित, संलग्न र विश्वस्त राख्न डिजाइन गरिएको।", order: 19 },
    // HowWeWorkDesignGrid
    { key: "designGridLabel", valueEn: "Our Perspective", valueNp: "हाम्रो दृष्टिकोण", order: 20 },
    { key: "designGridH2", valueEn: "How We Think About Design", valueNp: "हामी डिजाइनको बारेमा कसरी सोच्छौं", order: 21 },
    { key: "designGridSubtitle", valueEn: "Great design is more than aesthetics — it is about understanding how spaces feel, function, and endure over time.", valueNp: "उत्कृष्ट डिजाइन सौन्दर्यशास्त्र भन्दा बढी हो — यो स्पेसहरू कस्तो महसुस हुन्छ, कार्य गर्छ र समयसँगै टिक्छ भन्ने बुझाइको बारेमा हो।", order: 22 },
    // DesignShowcaseSection
    { key: "showcaseLabel", valueEn: "Featured Design", valueNp: "विशेष डिजाइन", order: 23 },
    // FAQSection
    { key: "h2", valueEn: "Frequently Asked Questions", valueNp: "प्रायः सोधिने प्रश्नहरू", order: 24 },
    { key: "ask", valueEn: "Ask a Question", valueNp: "प्रश्न सोध्नुहोस्", order: 25 },
    { key: "viewAll", valueEn: "View All FAQs", valueNp: "सबै FAQ हेर्नुहोस्", order: 26 },
    // QuoteBannerSecondary
    { key: "quoteText", valueEn: "Every structure we build is a reflection of our passion for quality, our respect for the land, and our commitment to the families who will call it home.", valueNp: "हामीले बनाएको हरेक संरचना गुणस्तरप्रतिको हाम्रो जोश, जमिनप्रतिको सम्मान र यसलाई घर भन्ने परिवारहरूप्रतिको प्रतिबद्धताको प्रतिबिम्ब हो।", order: 30 },
    { key: "quoteAttr", valueEn: "Horizon Nepal Team", valueNp: "होराइजन नेपाल टोली", order: 31 },
  ];
  for (const item of howWeWorkTexts) {
    await prisma.sectionContent.upsert({
      where: { section_key: { section: "how-we-work", key: item.key } },
      update: {},
      create: { section: "how-we-work", key: item.key, valueEn: item.valueEn, valueNp: item.valueNp, order: item.order },
    });
  }

  // how-we-work: media paths
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "how-we-work", key: "stopModelPath" } },
    update: {},
    create: { section: "how-we-work", key: "stopModelPath", mediaUrl: "", mediaType: "model", order: 40 },
  });

  await prisma.sectionContent.upsert({
    where: { section_key: { section: "how-we-work", key: "showcaseModel" } },
    update: {},
    create: { section: "how-we-work", key: "showcaseModel", mediaUrl: "/glb/house.glb", mediaType: "model", order: 41 },
  });

  // how-we-work: steps JSON
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "how-we-work", key: "steps" } },
    update: {},
    create: {
      section: "how-we-work", key: "steps",
      valueEn: JSON.stringify([
        { title: "Initial Consultation", body: "We meet to discuss your vision, budget, timeline, and site requirements. This is where we align expectations and explore possibilities." },
        { title: "Design & Estimation", body: "Our team creates detailed architectural drawings, 3D visualizations, and a transparent cost estimate for your approval." },
        { title: "Planning & Permits", body: "We handle all municipal approvals, permits, and documentation — saving you time and navigating complex regulations." },
        { title: "Construction", body: "With a dedicated project manager on-site daily, we execute with precision, quality, and regular progress updates." },
        { title: "Handover & Support", body: "We conduct a final walkthrough, address any punch-list items, and provide post-completion support for your peace of mind." },
      ]),
      valueNp: JSON.stringify([
        { title: "प्रारम्भिक परामर्श", body: "हामी तपाईंको दृष्टि, बजेट, समयसीमा र साइट आवश्यकताहरूबारे छलफल गर्न भेट्छौं। यहाँ हामी अपेक्षाहरू मिलाउँछौं र सम्भावनाहरू खोज्छौं।" },
        { title: "डिजाइन र अनुमान", body: "हाम्रो टोलीले तपाईंको स्वीकृतिको लागि विस्तृत वास्तुकला रेखाचित्र, ३D भिजुअलाइजेसन र पारदर्शी लागत अनुमान सिर्जना गर्दछ।" },
        { title: "योजना र अनुमति", body: "हामी सबै नगरपालिका स्वीकृति, अनुमति र कागजातहरू ह्यान्डल गर्छौं — तपाईंको समय बचत गर्दै र जटिल नियमहरू नेभिगेट गर्दै।" },
        { title: "निर्माण", body: "दैनिक साइटमा समर्पित परियोजना प्रबन्धकको साथ, हामी सटीकता, गुणस्तर र नियमित प्रगति अपडेटको साथ कार्यान्वयन गर्छौं।" },
        { title: "हस्तान्तरण र समर्थन", body: "हामी अन्तिम वाकथ्रु गर्छौं, कुनै पनि पंच-लिस्ट वस्तुहरू सम्बोधन गर्छौं, र तपाईंको मानसिक शान्तिको लागि पूर्णता पछिको समर्थन प्रदान गर्छौं।" },
      ]),
      order: 50,
    },
  });

  // how-we-work: perspectives JSON
  await prisma.sectionContent.upsert({
    where: { section_key: { section: "how-we-work", key: "perspectives" } },
    update: {},
    create: {
      section: "how-we-work", key: "perspectives",
      valueEn: JSON.stringify([
        { num: "01", label: "Form & Function", title: "Beauty That Works", body: "Every design decision balances aesthetic appeal with practical functionality — because a space must not only look good but feel right." },
        { num: "02", label: "Local Context", title: "Built for Nepal", body: "We design with Nepal's climate, culture, and construction traditions in mind — creating structures that are sustainable and contextually appropriate." },
        { num: "03", label: "Future-Ready", title: "Design That Lasts", body: "We anticipate future needs — from expanding families to evolving work patterns — ensuring your space remains relevant for years to come." },
      ]),
      valueNp: JSON.stringify([
        { num: "०१", label: "रूप र कार्य", title: "सुन्दरता जसले काम गर्छ", body: "हरेक डिजाइन निर्णयले सौन्दर्य अपील र व्यावहारिक कार्यक्षमतालाई सन्तुलनमा राख्छ — किनकि ठाउँ राम्रो देखिनु मात्र होइन, सही महसुस पनि हुनुपर्छ।" },
        { num: "०२", label: "स्थानीय सन्दर्भ", title: "नेपालको लागि निर्मित", body: "हामी नेपालको मौसम, संस्कृति र निर्माण परम्परालाई ध्यानमा राखेर डिजाइन गर्छौं — दिगो र सन्दर्भ अनुकूल संरचनाहरू सिर्जना गर्दै।" },
        { num: "०३", label: "भविष्य-तयार", title: "डिजाइन जसले टिक्छ", body: "हामी भविष्यको आवश्यकताको प्रत्याशा गर्छौं — विस्तार हुने परिवारदेखि विकसित हुने कार्य ढाँचासम्म — तपाईंको ठाउँ आउने वर्षहरूमा सान्दर्भिक रहने सुनिश्चित गर्दै।" },
      ]),
      order: 51,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
