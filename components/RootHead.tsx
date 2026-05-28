export default function RootHead() {
  return (
    <head>
      <link rel="preconnect" href="https://pub-a19a6c84befd4048bbb715b4a6d4f307.r2.dev" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://ajax.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://horizonnepal.com.np/#business",
            name: "Horizon Nepal",
            description: "Engineering, Research & Construction Company",
            url: "https://horizonnepal.com.np",
            telephone: "+977 1 441 1222",
            email: "hello@horizonnepal.com.np",
            foundingDate: "2009",
            numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
            address: {
              "@type": "PostalAddress",
              streetAddress: "Tinkune",
              addressLocality: "Kathmandu",
              addressRegion: "Bagmati Province",
              addressCountry: "NP",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 27.7172,
              longitude: 85.324,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
            ],
            priceRange: "$$",
            image: "https://horizonnepal.com.np/og-image.jpg",
            sameAs: [
              "https://www.facebook.com/horizonnepal",
              "https://www.instagram.com/horizonnepal",
              "https://www.linkedin.com/company/horizonnepal",
            ],
          }),
        }}
      />
    </head>
  );
}
