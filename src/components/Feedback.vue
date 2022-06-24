<template>
  <ToolBar ref="toolBar"></ToolBar>
  <div class="container content">
    <div class="row">
      <div class="col-sm-12 tittle">
        <h4>Напишите мне</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <input
          class="feedEmail"
          type="email"
          placeholder="Ваш Email"
          v-model="email"
        />
        <input
          class="feedEmail"
          type="text"
          placeholder="Ваше имя"
          v-model="name"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <textarea
          cols="60"
          rows="10"
          placeholder="Ваше сообщение"
          v-model="message"
        ></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <p class="error" v-if="ifError">{{ ifError }}</p>
        <button class="feedBtn" @click="SendFeedback()">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar.vue";
import axios from "axios";

export default {
  mounted() {
    setTimeout(() => {
      document.body.style.background = "#202124";
      this.$refs.toolBar.setStylesFeedback();
    }, 10);
  },

  components: {
    ToolBar,
  },

  data() {
    return {
      message: "",
      email: "",
      name: "",
      ifError: false,
    };
  },

  methods: {
    CheckCookie() {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            "Message".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    async SendFeedback() {
      if (this.message.length < 2 || this.message.length > 200)
        this.ifError =
          "Ваше сообщение слишком короткое или длинное. Введите от 2 до 200 символов.";
      else if (this.CheckCookie()) this.ifError = "Вы слишком часто пишете";
      else {
        this.ifError = false;
        try {
          const response = await axios.post(
            "http://ragaban.zzz.com.ua/chatapi/feedback.php",
            {
              message: this.message,
              email: this.email,
              name: this.name,
              feedback: 1,
            }
          );
          console.log(response);
          if (response.data == "succes") {
            this.message = "";
            this.name = "";
            this.email = "";
            document.cookie = "Message=1; max-age=10";
            alert("Спасибо! Я постараюсь ответить в ближайшее время.");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.tittle {
  margin-top: 50px;
  color: rgb(177, 176, 176);
}
.content {
  text-align: center;
}
.feedEmail {
  background-color: rgb(77, 77, 77);
  color: rgb(221, 221, 221);
  border: none;
  box-shadow: 0px 1px 10px #000;
  resize: none;
  margin-bottom: 10px;
  margin-left: 15px;
}
.content textarea {
  background-color: rgb(77, 77, 77);
  color: rgb(221, 221, 221);
  border: none;
  box-shadow: 0px 1px 10px #000;
  resize: none;
  font-weight: bold;
}
.feedBtn {
  transition: 0.5s;
  border: 1px rgb(0, 97, 157) solid;
  margin-top: 20px;
  padding: 5px 10px;
  background-color: rgb(77, 77, 77);
  color: rgb(221, 221, 221);
}
.feedBtn:hover {
  background-color: rgb(127, 126, 126);
}
.error {
  margin: 0px;
  color: red;
}
</style>
