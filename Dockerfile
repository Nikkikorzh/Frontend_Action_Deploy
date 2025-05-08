FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install -g pnpm \
    && pnpm install \
    && pnpm run build


FROM nginx:stable-alpine


RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

