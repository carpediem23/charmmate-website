FROM node:20-alpine
WORKDIR /app
ENV API_URL=${API_URL}
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
