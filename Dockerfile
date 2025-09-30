FROM node:22-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

# Copy source files and build the project
COPY src ./src
RUN npm run build

# Expose port and start the application
EXPOSE 3000
CMD ["node", "dist/index.js"]