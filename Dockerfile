FROM node:21-alpine
WORKDIR /usr/src/app
COPY . .

RUN npx prisma migrate dev --name init
RUN npx prisma db seed

COPY package*.json ./
RUN npm install
RUN npm i pm2 -g

EXPOSE 5005
CMD ["pm2-runtime","process.json"]