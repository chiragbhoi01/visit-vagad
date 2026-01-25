'use client';

import React from 'react';
import { DestinationForm } from '@/components/admin/DestinationForm';
import { updateDestination } from '../../actions';
import { Destination } from '@/lib/schemas';
import { toast } from 'sonner';

interface EditDestinationFormProps {
  destination: Destination;
}

const EditDestinationForm: React.FC<EditDestinationFormProps> = ({ destination }) => {
  // Use `bind` to pre-fill the `id` argument of the server action.
  const updateDestinationWithId = updateDestination.bind(null, destination.$id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit {destination.name}</h1>
      <DestinationForm 
        action={updateDestinationWithId} 
        defaultValues={destination} 
      />
    </div>
  );
};

export default EditDestinationForm;