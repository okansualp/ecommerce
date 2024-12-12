# 1. Build aşaması
FROM node:18 AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılık dosyalarını kopyala ve bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# Proje dosyalarını kopyala ve üretim için derle
COPY . .
RUN npm run build

# 2. Production aşaması
FROM nginx:1.23-alpine AS production

# Nginx için çalışma dizinini ayarla
WORKDIR /usr/share/nginx/html

# Build aşamasındaki çıktı dosyalarını nginx'e kopyala
COPY --from=builder /app/dist .

# Varsayılan Nginx yapılandırmasını kaldır ve yeni bir yapılandırma ekle
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Nginx'i başlat
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]