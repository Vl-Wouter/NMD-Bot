class BotResponse {
  constructor(message, image=null, link=null, linkText=null, code=200) {
    this.message = message;
    this.image = image;
    this.link = link;
    this.linkText = linkText;
  }
}

export default BotResponse;