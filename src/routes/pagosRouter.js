const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const router = express.Router();

// Crear cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: 'TEST-2694413962692171-080817-c8476ebbcb55291a02dcebb13f99292e-1285096370'
});

router.post('/crear-preferencia', async (req, res) => {
  try {
    const { tipoPlan } = req.body;

    const precios = {
      semanal: 7500,
      mensual: 25000,
      anual: 280000
    };

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: `Plan ${tipoPlan}`,
            unit_price: precios[tipoPlan],
            quantity: 1
          }
        ],
        back_urls: {
          success: 'http://localhost:5501/html/success.html',
          failure: 'http://localhost:5501/html/failure.html',
          pending: 'http://localhost:5501/html/pending.html'
        },
      }
    });

    res.json({ id: result.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la preferencia' });
  }
});

module.exports = router;
