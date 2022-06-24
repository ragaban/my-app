<template>
  <div class="c-tittle"><p>My Chat</p></div>
  <div ref="scrollingWrap" class="scroll-wrap" id="chat">
    <div class="c-message" v-for="message in messages" :key="message.id">
      <div style="background-color: #ccc; width: 50%; display: inline-block">
        <p class="c-user-name">{{ message.user }}</p>
      </div>
      <div
        style="
          background-color: #ccc;
          width: 50%;
          display: inline-block;
          text-align: right;
        "
      >
        <p class="c-message-date">{{ message.time }} {{ message.date }}</p>
      </div>
      <p class="c-user-message">{{ message.message }}</p>
    </div>
    <div id="anchor"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.getMessages();
  },

  methods: {
    async getMessages() {
      try {
        const response = await axios.post(
          "http://ragaban.zzz.com.ua/chatapi/index.php",
          { getPosts: 1 }
        );
        this.messages = response.data;
        setTimeout(() => {
          this.$refs.scrollingWrap.scrollTop =
            this.$refs.scrollingWrap.scrollHeight;
        }, 10);
      } catch (error) {
        alert(error);
      }
    },
  },

  data() {
    return {
      messages: {},
    };
  },
};
</script>

<style scoped>
.scroll-wrap {
  overflow-y: scroll;
  height: 400px;
}
.c-tittle {
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  color: white;
  background-color: #7952b3;
}
.c-tittle p {
  font-size: 20px;
  text-align: center;
}
.c-message {
  background-color: #ccc;
  margin: 10px 10px 10px 10px;
  border-radius: 5px;
  padding: 5px;
}
.c-user-name {
  font-weight: bold;
  color: #7952b3;
  margin-bottom: 0;
  display: inline-block;
}
.c-user-message {
  margin: 0;
  font-size: 13px;
}
.c-message-date {
  /* float: right; */

  display: inline-block;
  color: #7952b3;
  font-size: 13px;
  margin: 0;
  text-align: right;
}
</style>
