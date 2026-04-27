FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built application from development stage
COPY --from=development /app/dist ./dist

# Copy other necessary files
COPY config.yaml ./

# Create logs directory if it doesn't exist
RUN mkdir -p logs

CMD [ "npm", "run", "start:prod" ]