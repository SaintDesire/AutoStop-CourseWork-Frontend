# Используем образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Сборка Next.js приложения
RUN npm run build

# Указываем порт, который будет использоваться
EXPOSE 3000

# Запуск Next.js в production-режиме
CMD ["npm", "start"]
