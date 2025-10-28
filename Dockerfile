# Stage 1: Build
FROM node:23-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Accept build args for API & WebSocket URLs
ARG VITE_API_URL
ARG VITE_SOCKET_URL

# Create a proper .env file for Vite
RUN echo "VITE_API_URL=$VITE_API_URL" > .env && \
    echo "VITE_SOCKET_URL=$VITE_SOCKET_URL" >> .env

# Make sure the .env is in the root directory where vite.config.js exists
RUN ls -l .env

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
 