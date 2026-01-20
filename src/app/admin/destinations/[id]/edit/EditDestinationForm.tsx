
'use client';

import React from 'react';
import { DestinationForm } from '@/components/admin/DestinationForm';
import { updateDestination } from '../../actions';
import { toast } from 'sonner';
import { Destination } from '@/lib/types';

interface EditDestinationFormProps {
  destination: Destination;
}

const EditDestinationForm: React.FC<EditDestinationFormProps> = ({ destination }) => {

  const handleSubmit = async (values: any) => {
    try {
      await updateDestination(destination.$id, values);
      toast.success('Destination updated successfully!');
    } catch (error) {
      toast.error('Failed to update destination.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Destination</h1>
      <DestinationForm onSubmit={handleSubmit} defaultValues={destination} />
    </div>
  );
};

export default EditDestinationForm;
