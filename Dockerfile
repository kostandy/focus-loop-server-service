# Use the official Node.js image.
FROM node:lts-alpine

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm ci

# Copy the rest of the application code.
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Define the command to run the app.
CMD ["npm", "start"]