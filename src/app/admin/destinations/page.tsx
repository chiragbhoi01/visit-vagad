
import React from 'react';
import Link from 'next/link';
import { getDestinations } from '@/lib/queries';
import { Button } from '@/components/ui/button';
import DestinationsList from './DestinationsList';

const DestinationsPage = async () => {
  const destinations = await getDestinations();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Destinations</h1>
        <Link href="/admin/destinations/new" passHref>
          <Button>Create New</Button>
        </Link>
      </div>
      <DestinationsList destinations={destinations} />
    </div>
  );
};

export default DestinationsPage;
