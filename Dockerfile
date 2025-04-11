# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Serve with nginx
FROM nginx:stable-alpine

# Entfernt default nginx Seite
RUN rm -rf /usr/share/nginx/html/*

# Kopiere Build in nginx Ordner
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: eigene nginx.conf (s. unten)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]