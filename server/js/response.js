class Response {
  constructor(message, code=200) {
    this.message = message;
    this.code = code;
  }
}

export default Response;