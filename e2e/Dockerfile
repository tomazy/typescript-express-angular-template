FROM node:6

RUN mkdir /app
COPY package.json yarn.lock /app/
WORKDIR /app

RUN yarn --pure-lockfile

COPY . /app/
ENV CI=true

CMD ["npm", "run", "test"]
