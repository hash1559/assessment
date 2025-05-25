FROM node:20.17.0-slim
ENV NODE_ENV=development
COPY . .
RUN npm install
EXPOSE 3000
RUN chmod +x /scripts/startup.sh
RUN npm install --save-dev sequelize-cli
ENTRYPOINT [ "./scripts/startup.sh" ]
