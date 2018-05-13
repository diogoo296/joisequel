FROM node:8.11.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Bundle app source
COPY . .
