FROM node:lts-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5173

RUN chown -R node /app
USER node

# Start Vite dev server
CMD ["npm", "run", "dev"]
