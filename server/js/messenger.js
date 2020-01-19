import consola from 'consola';
import config from '../config';

class Messenger {

  constructor() {
    this.FB_PAGE_TOKEN = config.fbPageToken;
    this.FB_APP_SECRET = config.fbAppSecret;
    this.FB_VERIFY_TOKEN = config.fbVerifyToken;

    this.sessions = {};
  }

  fbMessage = (id, text) => {
    const body = JSON.stringify({
      recipient: { id },
      message: { text },
    });
    const qs = 'access_token=' + encodeURIComponent(this.FB_PAGE_TOKEN);
    return fetch('https://graph.facebook.com/me/messages?' + qs, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body,
    })
    .then(rsp => rsp.json())
    .then(json => {
      if (json.error && json.error.message) {
      throw new Error(json.error.message);
      }
      return json;
    });
  };

  fbImageMessage = (id, image) => {
    const body = JSON.stringify({
        recipient: {
            id: id
          },
          message: {
            attachment: {
              type: "image",
              payload: {
                url: image.url
              }
            }
          }
    });
    const qs = 'access_token=' + encodeURIComponent(this.FB_PAGE_TOKEN);
    return fetch('https://graph.facebook.com/me/messages?' + qs, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body,
    })
    .then(rsp => rsp.json())
    .then(json => {
        if (json.error && json.error.message) {
        throw new Error(json.error.message);
        }
        return json;
    });
  }

  fbLinkMessage = (id, text, link) => {
    const body = JSON.stringify({
        recipient: {
            id: id
          },
          message: {
            attachment: {
              type: "template",
              payload: {
                template_type: "button",
                text: text,
                buttons:[{
                  type: "web_url",
                  url: link.url,
                  title: link.text
                }]
              }
            }
          }
    });
    const qs = 'access_token=' + encodeURIComponent(this.FB_PAGE_TOKEN);
    return fetch('https://graph.facebook.com/me/messages?' + qs, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body,
    })
    .then(rsp => rsp.json())
    .then(json => {
        if (json.error && json.error.message) {
        throw new Error(json.error.message);
        }
        return json;
    });
  }

  fbInfoCard = (id, text, image, link) => {
    console.log(image, link);
    
    const body = JSON.stringify({
        recipient: {
            id: id
          },
          message: {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                image_aspect_ratio: "square",
                elements: [{
                    title: link.text,
                    image_url: image.url,
                    default_action: {
                    type: "web_url",
                    url: link.url,
                    webview_height_ratio: "tall",
                    }
                }],
              },    
            }
          }
    });
    const qs = 'access_token=' + encodeURIComponent(this.FB_PAGE_TOKEN);
    return fetch('https://graph.facebook.com/me/messages?' + qs, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body,
    })
    .then(rsp => rsp.json())
    .then(json => {
        if (json.error && json.error.message) {
        throw new Error(json.error.message);
        }
        return json;
    });
  }

  findOrCreateSession = (fbid) => {
    let sessionId;
    Object.keys(this.sessions).forEach(k => {
        if (this.sessions[k].fbid === fbid) {
        sessionId = k;
        }
    });
    if (!sessionId) {
        sessionId = new Date().toISOString();
        sessions[sessionId] = {fbid: fbid, context: {}};
    }
    return sessionId;
  };

  verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature"];  
    if (!signature) {
      console.error("Couldn't validate the signature.");
    } else {
      var elements = signature.split('=');
      var method = elements[0];
      var signatureHash = elements[1];
  
      var expectedHash = crypto.createHmac('sha1', this.FB_APP_SECRET)
                          .update(buf)
                          .digest('hex');
  
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }
}

export default Messenger;