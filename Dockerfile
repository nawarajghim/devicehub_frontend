# Stage 1: Build
FROM node:23-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Accept VITE_API_URL and VITE_SOCKET_URL as build args
ARG VITE_API_URL
ARG VITE_SOCKET_URL

# Create a .env file for Vite
RUN echo "VITE_API_URL=$VITE_API_URL" >> .env && \
    echo "VITE_SOCKET_URL=$VITE_SOCKET_URL" >> .env

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
