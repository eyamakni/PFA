FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps || true

COPY . .

RUN npm run build || true

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]