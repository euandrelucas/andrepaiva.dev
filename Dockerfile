# Use the official Nginx base image
FROM nginx:latest

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Create APP directory
WORKDIR /usr/src/app

# Install Jemalloc
RUN apt-get update && apt-get install libjemalloc-dev -y && apt-get clean
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so" 

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build React app
RUN npm run build

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default for HTTP)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
