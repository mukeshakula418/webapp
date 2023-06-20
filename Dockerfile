FROM node:16

# Create an app directory in the container image for the app code
RUN mkdir -p /usr/src/app

# Copy app code (.) to /usr/src/app in the container image
COPY . /usr/src/app

# Set working directory context
WORKDIR /usr/src/app 

# Install app dependencies from the package.json
RUN npm install

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENTRYPOINT [ "node", "main.ts" ]
