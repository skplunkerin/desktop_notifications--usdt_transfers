const express = require("express");
const app = express();
const notifier = require("node-notifier");
const port = 3000;

app.use(express.json());

// POST /webhook
app.post("/webhook", (req, res) => {
  const webhook = req.body;

  for (const erc20Transfer of webhook.erc20Transfers) {
    // get shortened version of address
    const address = `${erc20Transfer.to.slice(0, 4)}...${erc20Transfer.to.slice(
      38
    )}`;
    // parse amount to have commas
    const amount = Number(erc20Transfer.valueWithDecimals)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    notifier.notify({
      title: "NEW USDT Transfer",
      message: `${address} just sent \n$${amount}`,
    });
  }

  return res.status(200).json();
});

app.listen(port, () => {
  console.log("Listening to streams");
});
