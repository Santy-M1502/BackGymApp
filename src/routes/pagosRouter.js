const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const ACCESS_TOKEN = "TEST-2694413962692171-080817-c8476ebbcb55291a02dcebb13f99292e-1285096370";

router.post('/crear-preferencia', async (req, res) => {
  try {
    const { tipoPlan } = req.body;
    const precios = { semanal: 7500, mensual: 25000, anual: 280000 };

    if (!precios[tipoPlan]) return res.status(400).json({ error: 'Tipo de plan inválido' });

    const preference = {
      items: [
        {
          title: `Plan ${tipoPlan}`,
          quantity: 1,
          unit_price: precios[tipoPlan],
          currency_id: 'ARS'
        }
      ],
      back_urls: {
        success: 'http://localhost:5501/html/success.html',
        failure: 'http://localhost:5501/html/failure.html',
        pending: 'http://localhost:5501/html/pending.html'
      }
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preference)
    });
    const data = await response.json();
    
    res.json({ id: data.id, init_point: data.init_point });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la preferencia' });
  }
});

module.exports = router;
