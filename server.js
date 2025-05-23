app.post('/callback', (req, res) => {
  const data = req.body;
  const stkCallback = data.Body.stkCallback;

  if (stkCallback.ResultCode === 0) {
    const metadata = stkCallback.CallbackMetadata;
    const mpesaReceipt = metadata.Item.find(i => i.Name === "MpesaReceiptNumber").Value;
    const amount = metadata.Item.find(i => i.Name === "Amount").Value;
    const phone = metadata.Item.find(i => i.Name === "PhoneNumber").Value;

    console.log(`Payment success: ${amount} from ${phone}, Receipt: ${mpesaReceipt}`);
    // Save to DB here (optional)
  } else {
    console.log(`Payment failed with code: ${stkCallback.ResultCode}`);
  }

  res.sendStatus(200);
});