export default async function handler(req, res) {
  const { transactionId } = req.body;

  const response = await fetch("https://api.misticpay.com/api/transactions/check", {
    method: "POST",
    headers: {
      "ci": process.env.CI,
      "cs": process.env.CS,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ transactionId })
  });

  const data = await response.json();
  res.status(200).json(data);
}
