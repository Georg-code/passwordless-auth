
export interface testProps {
     adress: string,
}

const test = (props) => {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(props.adress)) {

          if (props.adress.endsWith("@kuezh.ch") || props.adress.endsWith("@stud.kuezh.ch")) {
               return true;
          }
     }
}

export default test;