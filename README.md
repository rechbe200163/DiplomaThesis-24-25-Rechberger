# Setup Guide

This guide will help you set up and run the project locally using `pnpm`.

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- Install `pnpm` globally if not already installed:
  ```bash
  npm install -g pnpm
  ```

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/rechbe200163/DiplomaThesis-24-25-Rechberger.git
   cd DiplomaThesis-24-25-Rechberger
   ```

2. **change Directory**:

   ```bash
   cd verca-commerce
   ```

## Configure Environment Variables

### Expample `.env` file

```env
#DB
DATABASE_URL_DEV=postgresql://admin:adminpassword@localhost:5432/admin_panel_db

#STRIPE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=change_this_to_your_stripe_publishable_key
STRIPE_SECRET_KEY=change_this_to_your_stripe_secret_key

#NEXT
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_DOMAIN=https://yourdomain.com


```

### example `.env.local` file

```env
AUTH_SECRET=your-auth-secret

NEXT_PUBLIC_SUPABASE_URL="https://youre-object-storage-url.com"
NEXT_PUBLIC_SUPABASE_SECRET_KEY="your-supabase-secret-key"
SUPABASE_IMAGE_BUCKET="images"
SUPABASE_INVOICE_BUCKET="invoices"
STRIPE_SECRET_KEY=your-stripe-secret-key

```

## Steps to Run the Database

1.  **Start Database Docker**

    ```bash
    docker compose up -d
    ```

2.  **push the Database Schema to the Database**

    ```bash
    pnpm prisma db push
    ```

3.  **generate Prisma Client**
    ```bash
    pnpm prisma generate
    ```

## Steps to Run the Forntend

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

2. **Start the Development Server**:
   ```bash
   pnpm run dev
   ```

# Important Notes

- The webshop will only function correctly if the admin panel is properly configured. Ensure that all necessary settings and configurations are completed before running the application.
