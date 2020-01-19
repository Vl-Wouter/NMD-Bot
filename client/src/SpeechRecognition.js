class SpeechRecognition {
  constructor() {
    if (!("webkitSpeechRecognition" in window)) {
      //Speech API not supported
      this.browserCompatible = false;
    } else {
      this.browserCompatible = true;
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = "nl-BE";
      this.recognition.maxAlternatives = 1;
      this.recording = false;
    }
  }
}

export default SpeechRecognition;
