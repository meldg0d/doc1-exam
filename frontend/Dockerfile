# Use Node.js 18 with Alpine Linux (lightweight base image)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
# This is done separately to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies for development)
RUN npm install

# Copy all remaining source code into the container
COPY . .

# Expose port 5173 (Vite's default development server port)
EXPOSE 5173

# Start the Vite development server with host flag
# --host makes the server accessible from outside the container
CMD ["npm", "run", "dev", "--", "--host"]