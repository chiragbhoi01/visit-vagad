

import React from 'react';
import { getDestinationById } from '@/lib/queries';
import { notFound } from 'next/navigation';
import EditDestinationForm from './EditDestinationForm';

interface EditDestinationPageProps {
  params: {
    id: string;
  };
}

const EditDestinationPage = async ({ params }: EditDestinationPageProps) => {
  const destination = await getDestinationById(params.id);

  if (!destination) {
    notFound();
  }

  return <EditDestinationForm destination={destination} />;
};

export default EditDestinationPage;
