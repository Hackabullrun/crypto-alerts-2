// server.js - Backend para enviar emails con SendGrid
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración
app.use(cors());
app.use(express.json());
// Health check (para Railway y el panel)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ⚠️ IMPORTANTE: Reemplaza con tu API Key de SendGrid
// Obtén tu API Key en: https://app.sendgrid.com/settings/api_keys
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'TU_API_KEY_AQUI';
const FROM_EMAIL = process.env.FROM_EMAIL || 'tu-email@ejemplo.com'; // Debe estar verificado en SendGrid

sgMail.setApiKey(SENDGRID_API_KEY);

// Endpoint para enviar alertas
app.post('/api/send-alert', async (req, res) => {
    try {
        const { to, subject, text, html } = req.body;

        // Validación
        if (!to || !subject || (!text && !html)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Faltan parámetros requeridos' 
            });
        }

        // Configurar mensaje
        const msg = {
            to,
            from: FROM_EMAIL,
            subject,
            text,
            html: html || text
        };

        // Enviar email
        await sgMail.send(msg);

        console.log(`✅ Email enviado exitosamente a: ${to}`);
        res.json({ 
            success: true, 
            message: 'Email enviado correctamente' 
        });

    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        
        if (error.response) {
            console.error('Error de SendGrid:', error.response.body);
        }

        res.status(500).json({ 
            success: false, 
            error: 'Error al enviar el email',
            details: error.message 
        });
    }
});

// Endpoint de prueba
app.post('/api/test-email', async (req, res) => {
    try {
        const { to } = req.body;

        const msg = {
            to: to || 'test@example.com',
            from: FROM_EMAIL,
            subject: '🧪 Email de Prueba - Alertas Crypto',
            text: 'Este es un email de prueba. Si lo recibes, la configuración funciona correctamente.',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #8b5cf6;">🧪 Email de Prueba</h2>
                        <p>Este es un email de prueba desde tu sistema de alertas de criptomonedas.</p>
                        <p style="color: #10b981; font-weight: bold;">✅ Si recibes este mensaje, la configuración funciona correctamente.</p>
                    </div>
                </div>
            `
        };

        await sgMail.send(msg);

        res.json({ 
            success: true, 
            message: 'Email de prueba enviado' 
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📧 Email configurado desde: ${FROM_EMAIL}`);
    console.log(`\n⚠️  Recuerda configurar tu SENDGRID_API_KEY`);
    console.log(`   Puedes hacerlo con: export SENDGRID_API_KEY="tu-api-key"\n`);
});
