import { Product } from '@prisma/client';

export interface ExtendedProduct extends Product {
  quantity: number;
}
