import express from "express";
import mail from "./mail/mail";
import { urlencoded } from "body-parser";
import test from "./test/test";
import create_token from "./token/token";

const app = express();
const port = 3000;

app.use(urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`The Passwordless API runs on port: ${port}.`);
});

app.post("/api/send_code/", (req, res) => {


  if (test({ adress: String(req.body.adress) })) {
    mail({
      message: "Das wird mal der Code",
      adress: req.body.adress,
    }).catch();
    res.send(
      "Auth code was sent to user. Email starts with: " +
        String(req.body.adress).slice(0, 3) + "   TOKEN: " + create_token({type:"token"})
    );
  } else {
       res.send("Error");
  }
});
