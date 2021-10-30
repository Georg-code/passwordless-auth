import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
export interface create_tokenProps {
     type: "pin" | "token";
     email?: string,

}

const create_token = (props) => {
     if (props.type === "token") {
          return(jwt.sign({ mail: props.mail, exp: Math.floor(Date.now() / 1000) + 5*86400 }, 'secret'));
  } else if (props.type == "pin") {
    const min = 100000;
    const max = 999999;
    return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(
      -6
    );
  }
};

export default create_token;
