FROM  node:latest
LABEL version="1.0" 
LABEL maintainer="Enes Sertkan enessertkan451@gmail.com"
LABEL description="NodeJS, Express, ReactJS, MongoDB and Docker containerized frontend for the MERN stack application."

WORKDIR /app

COPY    package*.json .

RUN     npm install

COPY    . .

EXPOSE  3000

CMD     ["npm", "start"]
