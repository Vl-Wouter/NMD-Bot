class BotResponse {
  constructor(message, image=null, code=200) {
    this.message = message;
    this.image = image;
  }
}

export default BotResponse;