<template>
  <main id="app">
    <section class="info">
      <h1>NMD-Bot</h1>
      <p>
        NMD-Bot is a simple chatbot, ready to (try to...) answer any question
        you want to ask.
      </p>
      <p>Current status: {{ isConnected ? "Connected" : "Disconnected" }}</p>
    </section>
    <section class="chat__window">
      <main class="chat__history">
        <message
          :message="message"
          v-for="(message, index) in chat"
          :key="index"
        />
      </main>
      <section class="chat__action">
        <chat-form @submit.native.prevent="submitMessage" />
      </section>
    </section>
  </main>
</template>

<script>
import Message from "./components/Message";
import ChatForm from "./components/ChatForm";
export default {
  name: "app",
  components: {
    Message,
    ChatForm
  },
  data: () => ({
    isConnected: false,
    chat: []
  }),
  methods: {
    submitMessage() {
      const msg = document.querySelector("#chatMessage").value;
      this.chat.push({
        message: msg,
        author: "client"
      });
      this.$socket.emit("message", msg);
      this.updateChatScroll();
    },
    updateChatScroll() {
      const chat = document.querySelector(".chat__history");
      chat.scrollTop = chat.scrollHeight;
    }
  },
  sockets: {
    connect() {
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    reply(msg) {
      this.chat.push({ ...msg, author: "bot" });
      this.updateChatScroll();
    }
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  display: flex;
}

.info {
  flex: 0 0 30%;
  background: #edf7fa;
  box-sizing: border-box;
  padding: 32px 16px;
}

.chat {
  &__window {
    box-sizing: border-box;
    padding: 16px;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  &__history {
    height: calc(100% - 64px);
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    overflow: auto;

    & > :first-child {
      margin-top: auto;
    }
  }

  &__action {
    height: 64px;
    width: 100%;
  }
}
</style>
