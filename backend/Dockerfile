# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV POSTGRE_HOST=${POSTGRE_HOST}
ENV POSTGRE_PORT=${POSTGRE_PORT}
ENV POSTGRE_USER=${POSTGRE_USER}
ENV POSTGRE_PASSWORD=${POSTGRE_PASSWORD}
ENV POSTGRE_DATABASE=${POSTGRE_DATABASE}
ENV POSTGRES_SOCKET_PATH=${POSTGRES_SOCKET_PATH}

# Expose the port that the application listens on
EXPOSE 8080

# Start the Node.js application
CMD ["npm", "start"]
