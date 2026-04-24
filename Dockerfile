# ---------- Build stage ----------
FROM node:24-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json yarn.lock ./

# Устанавливаем все зависимости (включая dev)
RUN yarn install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем приложение
RUN yarn build

# ---------- Production stage ----------
FROM node:24-alpine

WORKDIR /app

# Копируем package.json и yarn.lock
COPY --from=builder /app/package.json /app/yarn.lock ./

# Устанавливаем только production зависимости
RUN yarn install --production --frozen-lockfile

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist

# Копируем public папку (если есть)
COPY --from=builder /app/public ./public

# Копируем node_modules
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start"]