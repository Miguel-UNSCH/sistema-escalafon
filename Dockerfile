# 1. Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache openssl

# Copiar archivos necesarios
COPY package*.json ./
COPY prisma ./prisma
COPY public ./public
COPY .env .env

# Instalar dependencias
RUN npm install -g prisma && npm install --legacy-peer-deps

# Copiar el resto del código
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# 2. Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Instalar dependencias necesarias y configurar zona horaria
RUN apk add --no-cache openssl tzdata && \
    cp /usr/share/zoneinfo/America/Lima /etc/localtime && \
    echo "America/Lima" > /etc/timezone

# Copiar archivos desde la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/prisma ./prisma

# Exponer el puerto
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "start"]