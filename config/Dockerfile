services
  database:
    image: team1
    container_name: database
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: team1
      MYSQL_DATABASE: team1
      MYSQL_USER: team1
      MYSQL_PASSWORD: team1
    ports:
      - '3306:3306'
    volumes:
      - ./mysql/data:/var/lib/mysql
