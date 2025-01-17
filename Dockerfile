# The default version is used in case it is not provided
ARG NODE_VERSION=21-alpine3.19
# Use the official Node.js image with version from the argument
FROM node:${NODE_VERSION}

# Create app directory to hold the application code inside the image
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json /app/

# Install only the dependencies and clean the cache
# RUN npm install --only=production && npm cache clean --force
RUN npm install

# Copy the application code (except files in .dockerignore)
COPY . .

# For extra security, add a new user and use it
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup
#USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Application start default (it can be overridden) 
CMD ["npm", "run", "dev"]