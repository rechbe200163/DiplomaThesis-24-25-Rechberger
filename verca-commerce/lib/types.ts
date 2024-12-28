import { Prisma } from '@prisma/client';
import { Eye } from 'lucide-react';

//! SHOP

const productWithCategoryNames = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    categories: {
      select: {
        category: {
          select: {
            name: true,
          },
        },
      },
    },
  },
});

export type ProductWithCategoryNames = Prisma.ProductGetPayload<
  typeof productWithCategoryNames
>;

const siteConfigWithAddress = Prisma.validator<Prisma.SiteConfigDefaultArgs>()({
  include: {
    address: true,
  },
});

export type SiteConfigWithAddress = Prisma.SiteConfigGetPayload<
  typeof siteConfigWithAddress
>;

const cartWithProducts = Prisma.validator<Prisma.CartDefaultArgs>()({
  include: {
    products: {
      select: {
        quantity: true,
        product: true,
      },
    },
    _count: {
      select: {
        products: true,
      },
    },
  },
});

export type CartWithProducts = Prisma.CartGetPayload<typeof cartWithProducts>;

const cartCount = Prisma.validator<Prisma.CartDefaultArgs>()({
  include: {
    _count: {
      select: {
        products: true,
      },
    },
    products: {
      select: {
        quantity: true,
        productId: true,
      },
    },
  },
});

export type CartCount = Prisma.CartGetPayload<typeof cartCount>;

const cartProductInfo = Prisma.validator<Prisma.CartDefaultArgs>()({
  select: {
    products: {
      select: {
        productId: true,
        quantity: true,
        product: {
          select: {
            stock: true,
          },
        },
      },
    },
  },
});

export type CartProductDetails = {
  productId: string;
  quantity: number;
  product: {
    stock: number;
  };
};

//! DASHBOARD

const orderDetails = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: {
    products: {
      include: {
        product: true,
      },
    },
    invoice: true,
  },
});

export type OrderDetails = Prisma.OrderGetPayload<typeof orderDetails>;
