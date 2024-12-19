# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./
# If you're using yarn:
# COPY yarn.lock ./

# Install dependencies
RUN npm install --force
# If you're using yarn:
# RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set the environment variable to development
ENV NODE_ENV=development

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]
# If you're using yarn:
# CMD ["yarn", "dev"]
