FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR '/app'

COPY package.json package-lock.json .  

RUN npm install --legacy-peer-deps  

COPY . .

CMD ["npm", "run", "dev"]