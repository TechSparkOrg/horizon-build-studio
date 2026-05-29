export function generateSchemaOrg(settings: Record<string, string>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://horizonnepal.com.np/#business",
    name: settings.site_name ?? "Horizon Nepal",
    description: settings.site_tagline ?? "Engineering, Research & Construction Company",
    url: "https://horizonnepal.com.np",
    telephone: settings.contact_phone ?? "+977 1 441 1222",
    email: settings.contact_email ?? "hello@horizonnepal.com.np",
    foundingDate: "2009",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.contact_address ?? "Tinkune",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    geo: { "@type": "GeoCoordinates", latitude: 27.7172, longitude: 85.324 },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    }],
    priceRange: "$$",
    image: settings.seo_og_image ?? "https://horizonnepal.com.np/og-image.jpg",
    sameAs: [
      settings.social_facebook ?? "https://www.facebook.com/horizonnepal",
      settings.social_instagram ?? "https://www.instagram.com/horizonnepal",
      settings.social_linkedin ?? "https://www.linkedin.com/company/horizonnepal",
      settings.social_youtube ?? "https://www.youtube.com/@horizonnepal",
    ].filter(Boolean),
  };
}
