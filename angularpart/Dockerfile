# Step 1
FROM node:20.10 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR /app/dist/angularpart/browser

RUN chmod -R 755 .

# Step 2
FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/angularpart/browser /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html

COPY custom.conf /etc/nginx/conf.d/custom.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
