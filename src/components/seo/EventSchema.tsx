
import React from 'react';
import { FAIRS } from '@/data';

type Fair = (typeof FAIRS)[0];

interface EventSchemaProps {
  fair: Fair;
}

const EventSchema: React.FC<EventSchemaProps> = ({ fair }) => {
  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: fair.title,
    startDate: fair.date, // For simplicity; ideally format as ISO 8601
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: fair.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vagad',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
    },
    image: [fair.imageUrl],
    description: fair.description,
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: 'https://www.example.com/tickets', // Replace with a real URL if applicable
      },
    organizer: {
        '@type': 'Organization',
        name: 'Vagad Tourism',
        url: 'https://www.example.com', // Replace with your site URL
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
    />
  );
};

export default EventSchema;
