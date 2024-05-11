FROM node:20.12.2-alpine3.19 AS BASEIMAGE

WORKDIR /app
COPY package*.json ./
COPY . .
RUN if [[ ! -d ./node_modules ]]; then npm ci; fi;
RUN npm run build
RUN npm ci --omit=dev

FROM node:20.12.2-alpine3.19

WORKDIR /app
COPY --from=BASEIMAGE /app /app

# Set Timezone
RUN apk add --no-cache tzdata
ENV TZ=Asia/Jakarta

EXPOSE 4002

CMD ["node", "dist/main.js"]
