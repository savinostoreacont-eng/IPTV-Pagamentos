export default async function handler(req, res) {
  const { plano } = req.body;

  // 🔒 valores definidos no servidor (seguro)
  const planos = {
    "Mensal": 15,
    "Trimestral": 45,
    "Anual": 160
  };

  const valor = planos[plano];

  if (!valor) {
    return res.status(400).json({ error: "Plano inválido" });
  }

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
      description: "Pagamento IPTV - " + plano
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
