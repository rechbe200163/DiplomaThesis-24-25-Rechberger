import { Prisma } from "@prisma/client";

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
        product: {
          select: {
            name: true,
            price: true,
            imagePath: true,
            stock: true,
          },
        },
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
