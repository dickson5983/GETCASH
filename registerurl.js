const axios = require('axios');
const consumerKey = 'PNJmMhWxIyTeR18XjJm2MzQ4F87Ig2bLAaQKvD3cVLFRxdGJ';
const consumerSecret = 'prMOrfBdX9m89Qmw0R9aNrzBKQ01phEPWaumAXiAiT1uqZdkEHXAgjCGthLDLaNB'; // Replace this
const shortCode = '600997';
const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

const confirmationURL = 'https://e7f0-197-136-187-86.ngrok-free.app/confirmation';
const validationURL = 'https://e7f0-197-136-187-86.ngrok-free.app/validation';

async function registerUrls() {
  try {
    const tokenRes = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` }
    });

    const accessToken = tokenRes.data.access_token;

    const registerRes = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
      {
        ShortCode: shortCode,
        ResponseType: 'Completed',
        ConfirmationURL: confirmationURL,
        ValidationURL: validationURL
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    console.log('URL registration response:', registerRes.data);
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
  }
}

registerUrls();