import Link from 'next/link';
import { Destination } from '@/lib/schemas';
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import { DeleteDestinationDialog } from './DeleteDestinationDialog';

interface DestinationsListProps {
  destinations: Destination[];
  page: number;
  totalPages: number;
}

export default async function DestinationsList({ destinations, page, totalPages }: DestinationsListProps) {
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return (
    <div className="space-y-4">
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
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/destinations/${destination.$id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                  <DeleteDestinationDialog destinationId={destination.$id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`/admin/destinations?page=${prevPage}`} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
                <PaginationLink href={`/admin/destinations?page=${p}`} isActive={p === page}>
                    {p}
                </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href={`/admin/destinations?page=${nextPage}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
