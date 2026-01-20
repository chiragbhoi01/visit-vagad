
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Destination } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteDestination } from './actions';
import { toast } from 'sonner';

interface DestinationsListProps {
  destinations: Destination[];
}

const DestinationsList: React.FC<DestinationsListProps> = ({ destinations }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteDestination(id);
      toast.success('Destination deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete destination.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.map((destination) => (
            <TableRow key={destination.$id}>
              <TableCell>{destination.name}</TableCell>
              <TableCell>{destination.district}</TableCell>
              <TableCell>{destination.category}</TableCell>
              <TableCell>{destination.isFeatured ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/destinations/${destination.$id}/edit`} passHref>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        destination and its associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(destination.$id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DestinationsList;
