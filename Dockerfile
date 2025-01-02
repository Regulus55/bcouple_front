# Use the latest LTS version of Node.js
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]