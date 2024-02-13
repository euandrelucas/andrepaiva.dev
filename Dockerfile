FROM --platform=linux/amd64 node:20

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

# Install serve
RUN npm install -g serve

# Expose port 4568
EXPOSE 4568

# Start the app
CMD ["npm", "run", "prod"]