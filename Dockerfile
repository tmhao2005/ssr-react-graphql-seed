FROM  node:12
# Set the working dir
WORKDIR /usr/src/app

# Copy main file
COPY package.json yarn.lock ./

# Run required commands
RUN yarn

# Copy all file from current folder to working dir
# COPY ./build .

# Port will be used needing to be exposed
EXPOSE 3000

# CMD ["node", "server.js"]

# Build your app
# $ docker build -t tmhao/go1player .

# Run
# $ docker run -p 3001:3000 -d tmhao/go1player

# View logs to see the log of server started mostly: `npm start`
# $ docker logs <YOUR_CONTAINER_ID>

# Access to the container 
# $ docker exec -it <YOUR_CONTAINER_ID> /bin/bash

# Rename your repository/tag
# $ docker tag <YOUR_3_FIRST_DIGIT_OF_YOUR_IMAGE> tmhao/graphql-seed-app

# Stop a container
# $ docker stop <YOUR_CONTAINER_ID>
