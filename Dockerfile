# Frontend Dockerfile
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .
RUN npm run build -- --configuration=production

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/angular-frontend /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80