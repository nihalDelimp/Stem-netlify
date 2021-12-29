FROM node:lts-alpine

# Override the base log level (info).
ENV NODE_ENV production

# Copy all local files into the image.
WORKDIR /app
COPY . .

# Install all dependencies of the current project.
RUN yarn install
RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start"]