import React from 'react';
import Link from 'next/link';
import { getDestinations, getCollectionTotal } from '@/lib/queries';
import { Button } from '@/components/ui/button';
import DestinationsList from './DestinationsList';
import { serverEnv } from '@/lib/env';

const ITEMS_PER_PAGE = 10;

interface DestinationsPageProps {
    searchParams: {
        page?: string;
    };
}

const DestinationsPage = async ({ searchParams }: DestinationsPageProps) => {
  const page = Number(searchParams?.page) || 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const [destinations, total] = await Promise.all([
    getDestinations({ limit: ITEMS_PER_PAGE, offset }),
    getCollectionTotal(serverEnv.APPWRITE_COLLECTION_DESTINATIONS_ID),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Destinations</h1>
        <Button asChild>
            <Link href="/admin/destinations/new">Create New</Link>
        </Button>
      </div>
      <DestinationsList 
        destinations={destinations}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DestinationsPage;
