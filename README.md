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

## Steps to Run the Database

1.  **Start Database Docker**
    ```bash
    docker compose up -d
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
