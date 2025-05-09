FROM node:20-alpine as builder

WORKDIR /app
COPY . .
RUN npm install -g pnpm \
  && pnpm install \
  && pnpm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
