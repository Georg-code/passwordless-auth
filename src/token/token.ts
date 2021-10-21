import randtoken from 'rand-token';

export interface create_tokenProps {
  type: "pin" | "token";
}

const create_token = (props) => {
  if (props.type === "token") {
 return randtoken.generate(2048);
  } else if (props.type == "pin") {
    const min = 0;
    const max = 999999;
    return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(
      -6
    );
  }
};

export default create_token;
