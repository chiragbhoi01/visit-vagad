
'use client';

import React from 'react';
import { DestinationForm } from '@/components/admin/DestinationForm';
import { createDestination } from '../actions';
import { toast } from 'sonner';

const NewDestinationPage = () => {
  const handleSubmit = async (values: any) => {
    try {
      await createDestination(values);
      toast.success('Destination created successfully!');
    } catch (error) {
      toast.error('Failed to create destination.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Destination</h1>
      <DestinationForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewDestinationPage;
