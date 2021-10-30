import express from "express";
import mail from "./mail/mail";
import { urlencoded } from "body-parser";
import test from "./test/test";
import create_token from "./token/token";
import database from "./database/database";

const app = express();
const port = 3000;

app.use(urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`The Passwordless API runs on port: ${port}.`);
});

app.post("/api/send_code/", (req, res) => {
  if (test({ adress: String(req.body.adress) })) {
    const adress = req.body.adress;
    const pin = parseInt(create_token({ type: "pin" }));
    const name = ((req.body.adress).split("@")[0].split(".")[0] + " " + (req.body.adress).split("@")[0].split(".")[1]).toLowerCase()

    database({pin, mail: adress, role: "", name })

    mail({
      message: "Das wird mal der Code" + pin,
      adress,
    }).catch();
    res.send(
      "Auth code was sent to user.");
  } else {
       res.send("Error");
  }
});

app.post("/api/register", (req, res) => {
  const pin = req.body.pin;
  console.log(pin);
  res.sendStatus(200)

});


app.post("/api/validate", (req, res) => {
  const pin = req.body.pin;
  res.sendStatus(200)

})
