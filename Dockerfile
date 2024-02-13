# Use the official Node.js base image
FROM node:latest

# Install Jemalloc
RUN apt-get update && apt-get install libjemalloc-dev -y && apt-get clean
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so" 

# Create APP directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Add teser
RUN npm add -D terser

# Build React app
RUN npm run build

# Use the official Nginx base image
FROM nginx:latest

# Install Jemalloc
RUN apt-get update && apt-get install libjemalloc-dev -y && apt-get clean
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so" 

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the Node.js image
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 (default for HTTP)
EXPOSE 80

# Start Nginx
CMD ["LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2", "nginx", "-g", "daemon off;"]
