import React, { useEffect } from 'react';

export const SEOHead: React.FC = () => {
  useEffect(() => {
    // Inject Schema.org JSON-LD Graph
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
          "@id": "https://soulmediagroup.com/#organization",
          "name": "Soul Media",
          "alternateName": "Soul Media Agency",
          "url": "https://soulmediagroup.com",
          "logo": "https://soulmediagroup.com/brand/soul-media-og-card.png",
          "email": "soulmediagroup.info@gmail.com",
          "description": "Soul Media is a video production, 3D modeling, visual editing, and executive media agency serving Tampa Bay, Clearwater, and nationwide.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Clearwater",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 27.96585,
            "longitude": -82.8001
          },
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": "Tampa Bay Area, FL"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Clearwater / St. Petersburg, FL"
            },
            {
              "@type": "Country",
              "name": "United States"
            }
          ],
          "founder": {
            "@type": "Person",
            "name": "Jada Brown",
            "jobTitle": "Founder & Executive Producer"
          },
          "employee": [
            {
              "@type": "Person",
              "name": "Isaiah Chandler",
              "jobTitle": "Systems & Operations Director"
            },
            {
              "@type": "Person",
              "name": "Joe Irizarry",
              "jobTitle": "Director of Photography & Videography"
            }
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://soulmediagroup.com/#website",
          "url": "https://soulmediagroup.com",
          "name": "Soul Media",
          "publisher": {
            "@id": "https://soulmediagroup.com/#organization"
          }
        }
      ]
    };

    let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);
  }, []);

  return null;
};
