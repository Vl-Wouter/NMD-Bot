<template>
  <main id="app">
    <section class="info">
      <h1>NMD-Bot</h1>
      <p>
        NMD-Bot is a simple chatbot, ready to (try to...) answer any question
        you want to ask.
      </p>
      <main class="info__stats">
        <h3>Stats</h3>
        <p>
          Connection:
          <span class="status" :class="isConnected ? 'success' : 'danger'">{{
            isConnected ? "Connected" : "Disconnected"
          }}</span>
        </p>
        <p>
          Active session: <br />
          {{ activeSession ? activeSession : "None" }}
        </p>
        <p>
          Active Conversation:
          {{ activeConversation ? activeConversation : "None" }}
        </p>
        <p>
          Active Language:
          {{ activeLanguage ? activeLanguage : "None specified" }}
        </p>
      </main>
    </section>
    <main class="chat">
      <section class="chat__window">
        <main class="chat__history">
          <message
            :message="message"
            v-for="(message, index) in chat"
            :key="index"
          />
          <message v-if="isTyping" :message="loader" />
        </main>
        <section class="chat__action">
          <chat-form @submit.native.prevent="submitMessage" />
        </section>
      </section>
    </main>
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
    isTyping: false,
    activeConversation: null,
    activeSession: null,
    activeLanguage: null,
    loader: { message: "...", author: "bot" },
    chat: []
  }),
  methods: {
    submitMessage() {
      const msgContainer = document.querySelector("#chatMessage");
      this.chat.push({
        message: msgContainer.value,
        author: "client"
      });
      this.$socket.emit("message", msgContainer.value);
      this.isTyping = true;
      msgContainer.value = "";
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
      this.sessionID = null;
    },
    reply(msg) {
      this.chat.push({ ...msg.reply, author: "bot" });
      if (msg.session.sessionID) this.activeSession = msg.session.sessionID;
      console.table(msg);
      this.updateChatScroll();
      this.isTyping = false;
      this.activeConversation = msg.session.active_conversation
        ? msg.session.active_conversation.intent
        : null;
      if (msg.session.language) {
        this.activeLanguage = msg.session.language;
      } else {
        this.activeLanguage = null;
      }
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

img.emoji {
  height: 1em;
  width: 1em;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #edf7fa;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.info {
  flex: 0 0 30%;
  box-sizing: border-box;
  padding: 32px 32px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: left;

  &__stats {
    padding: 16px;
    border-radius: 16px;
    background: #5f6caf;
    color: #fefefe;

    .status {
      padding: 8px;
      border-radius: 8px;

      &.success {
        background: rgb(174, 230, 174);
        color: rgb(32, 68, 32);
      }

      &.danger {
        background: rgb(230, 174, 174);
        color: rgb(68, 32, 32);
      }
    }
  }
}

.chat {
  flex: 0 0 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__window {
    border-radius: 16px;
    box-sizing: border-box;
    padding: 32px;
    height: 80%;
    width: 60%;
    background: #fff;
    box-shadow: 0 5px 10px #00000020;
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
