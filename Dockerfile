# Use Node base image
FROM node:18-alpine

# Set workdir
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build TS if precompiled, or use ts-node in CMD
RUN npm run build

CMD ["node", "dist/index.js"]
