class BotResponse {
  constructor(message, image=null, link=null, code=200) {
    this.message = message;
    this.image = image;
    this.link = link;
  }
}

export default BotResponse;