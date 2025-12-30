# Multi-stage build for Vite React app
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./

# Minimal SPA fallback
RUN printf 'server {\\n  listen 80;\\n  server_name _;\\n  root /usr/share/nginx/html;\\n  include /etc/nginx/mime.types;\\n  location / { try_files $uri $uri/ /index.html; }\\n}\\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
