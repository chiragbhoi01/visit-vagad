
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin" passHref>
            <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
          </Link>
          <Link href="/admin/destinations" passHref>
            <Button variant="ghost" className="w-full justify-start">Destinations</Button>
          </Link>
          <Link href="/admin/events" passHref>
            <Button variant="ghost" className="w-full justify-start">Events</Button>
          </Link>
          <Link href="/admin/food" passHref>
            <Button variant="ghost" className="w-full justify-start">Food</Button>
          </Link>
          <Link href="/admin/hotels" passHref>
            <Button variant="ghost" className="w-full justify-start">Hotels</Button>
          </Link>
        </nav>
        <Separator className="my-4" />
        {/* We will add a logout button here later */}
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
