
const create_token = () => {
     return (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 255));
}

export default create_token;