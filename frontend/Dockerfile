# Development Dockerfile with hot-reloading support
FROM node:20-alpine

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server with external host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
