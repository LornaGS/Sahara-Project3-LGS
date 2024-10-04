# Build Stage
# Step 1: Use the official Node.js image as a base
FROM node:16 AS builder
# Step 2: Set the working directory in the container
WORKDIR /app
# Step 3: Copy package.json and package-lock.json
COPY package*.json ./
# Step 4: Install dependencies
RUN npm install
# Step 5: Copy the rest of your application code
COPY . .
# Step 6: Build the React application
RUN npm run build

# Production Stage
FROM node:16
WORKDIR /app
COPY --from=builder /app/build ./build
# Step 7: Install a simple server to serve the build files
RUN npm install -g serve
# Step 8: Expose port 3000
EXPOSE 3000
# Step 9: Command to run the server
CMD ["serve", "-s", "build"]
