export default async function handler(req, res) {
  const { valor } = req.body;

  const response = await fetch("https://api.misticpay.com/api/transactions/create", {
    method: "POST",
    headers: {
      "ci": process.env.CI,
      "cs": process.env.CS,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: valor,
      payerName: "Cliente",
      payerDocument: "12345678909",
      transactionId: "tx-" + Date.now(),
      description: "Pagamento IPTV"
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
