ARG NODE_VERSION=18.18.0
ARG PORT=3000

# Use the official Node.js image as the base image
FROM node:${NODE_VERSION}-alpine AS build

ENV EXP_PORT=5000


# Set the working directory
WORKDIR /usr/src/frontend

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the app's files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 80
EXPOSE ${EXP_PORT}

# Start Nginx when the container starts
# Run the application.
CMD npm run start