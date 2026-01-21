import React from 'react';
import { DestinationForm } from '@/components/admin/DestinationForm';
import { createDestination } from '../actions';

const NewDestinationPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Destination</h1>
      <DestinationForm action={createDestination} />
    </div>
  );
};

export default NewDestinationPage;