
import { z } from 'zod';

export const destinationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  district: z.enum(['Banswara', 'Dungarpur']),
  category: z.enum(['Nature', 'Heritage', 'Spiritual', 'Adventure']),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  bestTime: z.string().min(3, 'Best time must be at least 3 characters'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  coverImageId: z.string().optional(),
  coverImage: z.any().optional(),
  galleryImageIds: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
