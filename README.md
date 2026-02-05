# 🚨 Sistema de Alertas de Criptomonedas con SendGrid

Sistema completo para recibir alertas por email cuando las criptomonedas crucen umbrales de precio configurados.

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- Cuenta gratuita en SendGrid
- Navegador web moderno

## 🚀 Configuración Paso a Paso

### 1️⃣ Configurar SendGrid

1. **Crear cuenta gratuita en SendGrid:**
   - Ve a: https://signup.sendgrid.com/
   - Plan gratuito: 100 emails/día de forma permanente

2. **Verificar tu email de remitente:**
   - Ve a: https://app.sendgrid.com/settings/sender_auth
   - Clic en "Verify a Single Sender"
   - Completa el formulario con tu email (este será el remitente de las alertas)
   - Revisa tu email y haz clic en el enlace de verificación

3. **Obtener tu API Key:**
   - Ve a: https://app.sendgrid.com/settings/api_keys
   - Clic en "Create API Key"
   - Nombre: "Crypto Alerts" (o el que prefieras)
   - Permisos: "Full Access" o al menos "Mail Send"
   - Copia la API Key (solo se muestra una vez)

### 2️⃣ Configurar el Backend

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**

Opción A - Crear archivo `.env`:
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus datos:
```
SENDGRID_API_KEY=SG.tu_api_key_aqui
FROM_EMAIL=tu-email-verificado@ejemplo.com
PORT=3000
```

Opción B - Variables de entorno del sistema:
```bash
export SENDGRID_API_KEY="SG.tu_api_key_aqui"
export FROM_EMAIL="tu-email-verificado@ejemplo.com"
```

3. **Iniciar el servidor:**
```bash
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
📧 Email configurado desde: tu-email@ejemplo.com
```

### 3️⃣ Usar la Aplicación Web

1. **Abrir la aplicación:**
   - Abre `crypto-alerts-sendgrid.html` en tu navegador

2. **Probar conexión con el servidor:**
   - La app intentará conectarse automáticamente a `http://localhost:3000`
   - Si ves "🟢 Conectado y funcionando" = todo OK

3. **Configurar tu email:**
   - Ingresa tu email (donde recibirás las alertas)
   - Clic en "Guardar"
   - Clic en "📨 Enviar Email de Prueba" para verificar

4. **Crear alertas:**
   - Selecciona una criptomoneda
   - Define umbrales (uno o ambos):
     - **Umbral inferior**: alerta cuando el precio BAJE de este valor
     - **Umbral superior**: alerta cuando el precio SUBA de este valor
   - Clic en "Crear Alerta"

5. **Monitoreo:**
   - La app revisa precios cada 10 segundos
   - Cuando se cruza un umbral, recibirás un email

## 📁 Estructura de Archivos

```
.
├── server.js                      # Backend Node.js con SendGrid
├── package.json                   # Dependencias del proyecto
├── .env.example                   # Plantilla de configuración
├── crypto-alerts-sendgrid.html    # Aplicación web frontend
└── README.md                      # Este archivo
```

## 🎯 Características

✅ **Monitoreo en tiempo real** - Precios actualizados cada 10 segundos
✅ **Emails profesionales** - Diseño HTML responsive
✅ **Múltiples activos** - Configura alertas para 10+ criptomonedas
✅ **Umbrales flexibles** - Superior, inferior o ambos
✅ **Historial completo** - Registro de todas las alertas
✅ **Notificaciones del navegador** - Además de emails
✅ **Sin duplicados** - Cooldown de 5 minutos entre alertas

## 🛠️ Solución de Problemas

### El servidor no inicia

**Error:** `Cannot find module '@sendgrid/mail'`
```bash
npm install
```

**Error:** `SENDGRID_API_KEY is not defined`
- Verifica que creaste el archivo `.env` o exportaste las variables

### No recibo emails

1. **Verificar API Key:**
   - ¿Copiaste la API Key completa?
   - ¿Tiene permisos de "Mail Send"?

2. **Verificar email remitente:**
   - ¿Completaste la verificación en SendGrid?
   - Revisa: https://app.sendgrid.com/settings/sender_auth

3. **Revisar consola del servidor:**
   - Busca mensajes de error en la terminal donde corre `npm start`

4. **Revisar spam:**
   - Los primeros emails pueden caer en spam

### La app web no se conecta al servidor

1. **¿Está corriendo el servidor?**
```bash
npm start
```

2. **¿Puerto correcto?**
   - Verifica que la app apunte a `http://localhost:3000`
   - O cambia el puerto en `.env` y en la app web

3. **CORS:**
   - El servidor ya tiene CORS habilitado
   - Si usas un dominio diferente, ajusta la configuración

## 📊 API Endpoints

### POST `/api/send-alert`
Envía un email de alerta.

**Body:**
```json
{
  "to": "destinatario@email.com",
  "subject": "Asunto del email",
  "text": "Contenido en texto plano",
  "html": "<html>Contenido HTML</html>"
}
```

### POST `/api/test-email`
Envía un email de prueba.

**Body:**
```json
{
  "to": "destinatario@email.com"
}
```

### GET `/health`
Verifica que el servidor esté funcionando.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-02-05T10:30:00.000Z"
}
```

## 🌐 Despliegue en Producción

### Opciones de hosting gratuito:

1. **Railway** (Recomendado)
   - https://railway.app
   - Variables de entorno en el dashboard
   - Deploy con GitHub

2. **Render**
   - https://render.com
   - Plan gratuito disponible
   - Auto-deploy desde GitHub

3. **Heroku**
   - https://heroku.com
   - Plan gratuito limitado
   - Requiere tarjeta de crédito

### Pasos generales:

1. Sube el código a GitHub
2. Conecta tu repositorio al servicio de hosting
3. Configura las variables de entorno:
   - `SENDGRID_API_KEY`
   - `FROM_EMAIL`
   - `PORT` (usualmente asignado automáticamente)
4. Actualiza la URL del servidor en `crypto-alerts-sendgrid.html`

## 🔒 Seguridad

⚠️ **IMPORTANTE:**
- NUNCA subas tu archivo `.env` a GitHub
- NUNCA expongas tu `SENDGRID_API_KEY` públicamente
- Añade `.env` a tu `.gitignore`

## 📝 Límites de SendGrid (Plan Gratuito)

- 100 emails/día (permanentemente gratis)
- Single Sender Verification solamente
- Sin soporte prioritario

Para más emails, considera actualizar a un plan de pago.

## 🤝 Contribuciones

¿Ideas para mejorar? ¡Son bienvenidas!

## 📄 Licencia

MIT License - Libre de usar y modificar

## 🆘 Soporte

Si tienes problemas:
1. Revisa la sección "Solución de Problemas"
2. Verifica la consola del navegador (F12)
3. Verifica los logs del servidor
4. Consulta la documentación de SendGrid: https://docs.sendgrid.com

---

¡Disfruta de tus alertas automáticas de criptomonedas! 🚀
