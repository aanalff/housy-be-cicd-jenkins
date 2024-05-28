# Gunakan image node versi 14 berbasis Alpine
FROM node:10.23.0-alpine

# Tentukan direktori kerja
WORKDIR /app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Install sequelize-cli secara global
RUN npm install -g sequelize-cli

# Salin semua file ke dalam image
COPY . .

# Jalankan migrasi database
RUN npx sequelize db:migrate

# Buka port 5000 untuk aplikasi
EXPOSE 5000

# Tentukan perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
