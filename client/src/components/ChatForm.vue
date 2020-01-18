<template>
  <form method="post">
    <div class="inputField">
      <input type="text" name="message" id="chatMessage" autofocus />
      <div>
        <button
          type="button"
          id="microphone"
          v-on:click="toggleRecordSpeech"
          class=""
        >
          <svg
            id="microphone__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              style="fill:#FFFFFF;"
              d="M16 11c0 2.209-1.791 4-4 4s-4-1.791-4-4v-7c0-2.209 1.791-4 4-4s4 1.791 4 4v7zm4-2v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"
            />
          </svg>
        </button>
      </div>
    </div>
    <button type="submit">Send</button>
  </form>
</template>

<script>
import SpeechRecognition from "../SpeechRecognition";
let speechRecognition = new SpeechRecognition();

export default {
  name: "ChatForm",
  methods: {
    toggleRecordSpeech() {
      if (speechRecognition.recording) {
        speechRecognition.recognition.stop();
      } else {
        speechRecognition.recognition.start();
      }
    }
  },
  mounted() {
    if (speechRecognition.browserCompatible) {
      speechRecognition.recognition.onresult = function(event) {
        document.querySelector("#chatMessage").value =
          event.results[0][0].transcript;
      };

      speechRecognition.recognition.onstart = function() {
        document.querySelector("#microphone").classList.add("animating");
      };

      speechRecognition.recognition.onend = function() {
        document.querySelector("#microphone").classList.remove("animating");
      };
    } else {
      console.log("bee");
      document.querySelector("#microphone").classList.add("invisible");
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;

  .inputField {
    display: flex;
    flex: 0 0 78%;
    font-size: 16px;
    border-radius: 16px;
    border: none;
    box-shadow: 3px 5px 10px #00000020, -3px -5px 10px #ffffff;
    box-sizing: border-box;

    input {
      flex: 0 0 80%;
      height: 100%;
      padding: 16px;
      border-radius: 16px;
      box-sizing: border-box;
      border: none;
    }

    div {
      box-sizing: border-box;
      padding: 10px;
      flex: 100%;
      button {
        border-radius: 35px;
        flex: 100%;
        width: 44px;
        height: 100%;
        box-shadow: 3px 5px 10px #00000020, -3px -5px 10px #ffffff;
        outline: none;
        svg {
          color: white;
        }
        &.animating {
          animation-name: recording;
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }
      }
    }

    .invisible {
      display: none;
    }
  }

  button {
    cursor: pointer;
    flex: 0 0 18%;
    font-size: 16px;
    border-radius: 16px;
    background: #5f6caf;
    border: none;
    box-shadow: 3px 5px 10px #00000020, -3px -5px 10px #ffffff;
    color: #fff;
  }

  @keyframes recording {
    0% {
      background-color: #5f6caf;
    }
    50% {
      background-color: #99a2cc;
    }
    100% {
      background-color: #5f6caf;
    }
  }
}
</style>
