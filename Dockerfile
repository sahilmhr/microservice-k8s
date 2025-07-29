FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

# ARG DATABASE_URL

# ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate

# RUN npx prisma migrate deploy

EXPOSE 3000

CMD [ "npm", "start" ]