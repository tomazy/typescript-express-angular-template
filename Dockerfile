FROM node:boron

RUN mkdir /app
COPY backend/package.json /app/
WORKDIR /app

RUN yarn

COPY backend/dist /app/dist
COPY frontend/dist /app/wwwroot

EXPOSE 3000

CMD ["npm", "start"]
