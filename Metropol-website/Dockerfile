# Step 1: Build React
FROM node:20 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --force

# Copy source code and build React
COPY . .
RUN npm run build

# Step 2: Run with Express
FROM node:20
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/build ./build
COPY --from=build /app/server.js ./
COPY package*.json ./

# Install only production deps
RUN npm install --force --omit=dev

ENV PORT=8080 
EXPOSE 8080
CMD ["npm", "start"]
