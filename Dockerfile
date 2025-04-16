# Build stage
FROM node:20-slim AS builder

WORKDIR /app
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN echo "The API URL is '$VITE_API_BASE_URL'"

RUN rm -rf node_modules
RUN rm -rf package-lock.json
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