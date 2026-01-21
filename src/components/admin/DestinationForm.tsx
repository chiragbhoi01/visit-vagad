
'use client';

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Destination } from '@/lib/types';
import Image from 'next/image';
import { getAppwriteFilePreviewUrl } from '@/lib/storage';
import { toast } from 'sonner';

interface DestinationFormProps {
  action: (formData: FormData) => Promise<any>;
  defaultValues?: Destination;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Destination'}
    </Button>
  );
}

export const DestinationForm: React.FC<DestinationFormProps> = ({ action, defaultValues }) => {
  const [state, formAction] = useFormState(action, { message: null, errors: null });
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.coverImageId ? getAppwriteFilePreviewUrl(defaultValues.coverImageId, 200, 200).href : null
  );

  useEffect(() => {
    if (state?.message) {
        if(state.errors) {
            toast.error(state.message);
        } else {
            toast.success(state.message);
        }
    }
  }, [state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(defaultValues?.coverImageId ? getAppwriteFilePreviewUrl(defaultValues.coverImageId, 200, 200).href : null);
    }
  };

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="name" className="font-medium">Name</label>
        <Input id="name" name="name" defaultValue={defaultValues?.name} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="slug" className="font-medium">Slug</label>
        <Input id="slug" name="slug" defaultValue={defaultValues?.slug} required />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="font-medium">Description</label>
        <Textarea id="description" name="description" defaultValue={defaultValues?.description} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="district" className="font-medium">District</label>
        <select id="district" name="district" defaultValue={defaultValues?.district} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="">Select District</option>
          <option value="Banswara">Banswara</option>
          <option value="Dungarpur">Dungarpur</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="font-medium">Category</label>
        <select id="category" name="category" defaultValue={defaultValues?.category} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="">Select Category</option>
          <option value="Nature">Nature</option>
          <option value="Heritage">Heritage</option>
          <option value="Spiritual">Spiritual</option>
          <option value="Adventure">Adventure</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="shortDescription" className="font-medium">Short Description</label>
        <Textarea id="shortDescription" name="shortDescription" defaultValue={defaultValues?.shortDescription} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="bestTime" className="font-medium">Best Time to Visit</label>
        <Input id="bestTime" name="bestTime" defaultValue={defaultValues?.bestTime} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="latitude" className="font-medium">Latitude</label>
          <Input id="latitude" name="latitude" type="number" step="any" defaultValue={defaultValues?.latitude} required />
        </div>
        <div className="space-y-2">
          <label htmlFor="longitude" className="font-medium">Longitude</label>
          <Input id="longitude" name="longitude" type="number" step="any" defaultValue={defaultValues?.longitude} required />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="isFeatured" name="isFeatured" value="true" defaultChecked={defaultValues?.isFeatured}/>
        <label htmlFor="isFeatured" className="font-medium">Featured</label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="isNationalMonumnet" name="isNationalMonumnet" value="true" defaultChecked={defaultValues?.isNationalMonumnet}/>
        <label htmlFor="isNationalMonumnet" className="font-medium">National Monument</label>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="coverImage" className="font-medium">Cover Image</label>
        <Input id="coverImage" name="coverImage" type="file" onChange={handleImageChange} accept="image/*" />
      </div>

      {imagePreview && (
        <div className="mt-4">
          <p>Image Preview:</p>
          <Image src={imagePreview} alt="Cover image preview" width={200} height={200} className="rounded-lg object-cover" />
        </div>
      )}

      <SubmitButton />
    </form>
  );
};
