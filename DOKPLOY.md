# Deploy len Dokploy

Project nay da duoc chuan bi de deploy bang `Docker Compose` tren Dokploy.

## 1. Tao app trong Dokploy

- Chon **Compose**
- Ket noi repo nay
- Compose file: `docker-compose.yml`
- Branch: branch ban muon deploy

## 2. Khai bao environment variables

Can thiet:

- `PORT=3000`

Neu dung tinh nang quen mat khau qua Gmail:

- `GMAIL_USER=your-account@gmail.com`
- `GMAIL_APP_PASSWORD=your-16-character-app-password`

Neu muon tu dong nang quyen admin cho mot hay nhieu tai khoan:

- `ADMIN_EMAILS=admin1@example.com,admin2@example.com`

## 3. Storage can luu du lieu

Compose da khai bao san 2 volumes:

- `app_data` luu file SQLite trong `/app/data`
- `app_uploads` luu anh upload admin trong `/app/public/uploads`

Nho 2 volume nay, deploy lai se khong mat database va media da upload.

## 4. Domain va port

- Container lang nghe o port `3000`
- Trong Dokploy chi can map domain vao service `app`

## 5. Luu y

- App su dung `Next.js standalone`, build tu `Dockerfile`
- Healthcheck da dung chinh `node` trong container, khong phu thuoc `wget/curl`
- Neu ban thay doi schema hoac xoa volume `app_data`, SQLite se duoc tao lai tu dau
