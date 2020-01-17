<template>
  <div class="message" :class="message.author">
    <div class="message__bubble">
      <img
        v-if="message.image && message.image.is_accessory"
        :src="message.image.url"
        :alt="message.image.text"
        class="accessory__image"
      />
      <p v-emoji>{{ message.message }}</p>
      <p v-if="message.link">
        <a :href="message.link.url">{{ message.link.text }}</a>
      </p>
    </div>
    <div
      v-if="message.image && message.image.is_accessory == false"
      class="message__attachment"
    >
      <a :href="message.image.url" target="_blank">
        <img :src="message.image.url" :alt="message.image.text" />
      </a>
    </div>
    <p class="message__author">
      {{ message.author === "bot" ? "NMD-Bot" : "You" }}
    </p>
  </div>
</template>

<script>
import twemoji from "twemoji";
export default {
  name: "Message",
  props: {
    message: Object
  },
  directives: {
    emoji: {
      inserted(el) {
        el.innerHTML = twemoji.parse(el.innerHTML);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.accessory__image {
  flex: 0 0 72px;
  width: 72px;
  border-radius: 16px;
}
.message {
  &__bubble {
    padding: 8px 16px;
    border-radius: 16px;
    background: #ededed;
    max-width: 55%;
    display: flex;
  }

  &__attachment {
    max-height: 200px;
    max-width: 30%;
    border-radius: 16px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__author {
    font-size: 12px;
    color: #565656;
  }

  &.bot {
    text-align: left;

    .message__bubble {
      background: #f2f2f2;
      flex-direction: column;
      color: #232323;
      border-bottom-left-radius: 0;
      a {
        color: #5f6caf;
        text-decoration: none;
        font-weight: 700;
        transition: all 150ms ease-in-out;

        &:hover {
          color: lighten(#5f6caf, 10%);
          transition: all 150ms ease-in-out;
        }
      }
    }
  }

  &.client {
    text-align: right;

    .message__bubble {
      background: #5f6caf;
      color: #fff;
      border-bottom-right-radius: 0;
      margin-left: auto;
      margin-right: 0;
    }
  }
}
</style>
