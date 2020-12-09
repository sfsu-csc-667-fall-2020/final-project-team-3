FROM node:14

RUN mkdir -p /usr/src/app/back_end
WORKDIR /usr/src/app/back_end

COPY package.json ./

RUN npm install
# RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 4000

CMD ["npm", "start"]

