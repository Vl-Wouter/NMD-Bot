<template>
  <form method="post">
    <input type="text" name="message" id="chatMessage" autofocus />
    <button type="submit">Send</button>
  </form>
</template>

<script>
export default {
  name: "ChatForm"
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;

  input {
    flex: 0 0 78%;
    font-size: 16px;
    border-radius: 16px;
    border: none;
    box-shadow: 3px 5px 10px #00000020, -3px -5px 10px #ffffff;
    box-sizing: border-box;
    padding: 16px;
  }

  button {
    flex: 0 0 18%;
    font-size: 16px;
    border-radius: 16px;
    background: #5f6caf;
    border: none;
    box-shadow: 3px 5px 10px #00000020, -3px -5px 10px #ffffff;
    color: #fff;
  }
}
</style>
