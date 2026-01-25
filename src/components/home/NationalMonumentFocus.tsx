// src/components/home/NationalMonumentFocus.tsx
import React from 'react';
import Image from 'next/image';
import { getAppwriteFilePreviewUrl } from '@/lib/storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface NationalMonumentFocusProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  content: {
    title: string;
    description: string;
  };
}

const NationalMonumentFocus: React.FC<NationalMonumentFocusProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  content,
}) => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">{subtitle}</p>
        </div>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <Image
                src={imageUrl}
                alt={imageAlt}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
            <div className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#004D40]">{content.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {content.description}
                </CardDescription>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NationalMonumentFocus;
