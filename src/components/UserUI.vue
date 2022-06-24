<template>
  <form
    v-if="swapUI == true && ifLogin == false"
    class="login"
    @submit.prevent
    v-on:keypress.enter="CheckDataAuth()"
  >
    <p class="mytext">Login:</p>
    <input v-model="this.Login" type="text" name="login" class="loginInp" />
    <p class="mytext">Password:</p>
    <input
      v-model="this.Password"
      type="password"
      name="password"
      class="passwInp"
    />
    <button @click="CheckDataAuth()" class="loginBtn" name="loginBtn">
      Войти
    </button>
    <span @click="resetUI" class="regLink">Регистрация</span>
  </form>
  <form
    v-if="swapUI == false && ifLogin == false"
    @submit.prevent
    v-on:keypress.enter="CheckDaraReg()"
    class="registration"
  >
    <p class="mytext">Login:</p>
    <input v-model.trim="Login" type="text" name="login" class="loginInp" />
    <p class="mytext">Password:</p>
    <input
      v-model.trim="Password"
      type="password"
      name="password"
      class="passwInp"
    />
    <p class="mytext">Confirm password:</p>
    <input
      v-model.trim="Cpassword"
      type="password"
      name="password"
      class="passwInp"
    />
    <button @click="CheckDataReg()" class="loginBtn" name="loginBtn">
      Регистрация
    </button>
    <span @click="resetUI()" class="regLink">Войти</span>
  </form>
  <div v-if="this.ifLogin" class="welcome">
    <h4>
      Привет, <span>{{ this.Login }}</span>
    </h4>
    <button @click="Logout()" class="loginBtn">Выйти</button>
  </div>
  <p v-if="this.ifError" class="errMess">{{ this.ifError }}</p>
  <form @submit.prevent>
    <textarea
      ref="textMessage"
      v-model="this.Message"
      name="message"
      class="messageText"
      cols="35"
      rows="5"
      placeholder="Новое сообщение"
    ></textarea>
    <div>
      <button @click="SendMessage()" class="loginBtn sendBtn" name="loginBtn">
        Отправить
      </button>
      <button @click="this.$parent.swapContents($event)" class="MyBtn">
        Управление MySQL
      </button>
    </div>
  </form>
</template>

<script>
import Chat from "@/components/Chat.vue";
import axios from "axios";
import sha256 from "js-sha256";
export default {
  emits: ["LoadingStart", "LoadingStop"],

  mounted() {
    this.CheckUser();
  },

  components: {
    Chat,
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

    async SendMessage() {
      this.$emit("LoadingStart");
      if (this.Message.length < 2 || this.Message.length > 200)
        this.ifError =
          "Ваше сообщение слишком короткое или длинное. Введите от 2 до 200 символов.";
      else if (this.CheckCookie()) this.ifError = "Вы слишком часто пишете";
      else {
        this.ifError = false;
        if (this.ifLogin) {
          try {
            var response = await axios.post(
              "http://ragaban.zzz.com.ua/chatapi/index.php",
              {
                message: this.Message,
                username: window.localStorage.getItem("login"),
                newMessage: 1,
              }
            );
            if (response.data.message == "succes") {
              this.Message = "";
              this.$refs.textMessage.value = "";
              this.$parent.$refs.chat.getMessages();
              document.cookie = "Message=1; max-age=10";
            }
          } catch (error) {
            console.log(error);
          }
        } else this.ifError = "Пожалуйста, авторизируйтесь";
      }
      this.$emit("LoadingStop");
    },
    async Auth() {
      this.$emit("LoadingStart");
      try {
        var response = await axios.post(
          "http://ragaban.zzz.com.ua/chatapi/index.php",
          { login: this.Login, password: sha256(this.Password), auth: 1 }
        );
        if (response.data.message == sha256(this.Password)) {
          window.localStorage.setItem("login", this.Login);
          window.localStorage.setItem("token", response.data.message);
          this.ifLogin = true;
          this.ifError = false;
        } else this.ifError = response.data.message;
      } catch (error) {
        console.log(error);
      }
      this.$emit("LoadingStop");
    },

    Logout() {
      window.localStorage.removeItem("login");
      window.localStorage.removeItem("token");
      this.ifLogin = false;
      this.Login = "";
    },

    CheckUser() {
      if (window.localStorage.getItem("token")) {
        this.ifLogin = true;
        this.Login = window.localStorage.getItem("login");
      }
    },

    resetUI() {
      this.swapUI = !this.swapUI;
      console.log(this.swapUI);
      this.ifError = false;
    },

    CheckDataReg() {
      var arr = [
        this.Login.split(" ").join(""),
        this.Password.split(" ").join(""),
        this.Cpassword.trim().split(" ").join(""),
      ];
      var err = false;
      arr.forEach((el) => {
        if (el.length < 3 || el.length > 15 || !/^[a-zA-Z0-9]+$/.test(el)) {
          err = "Только латинские символы и цифры.";
        }
      });
      if (arr[1] !== arr[2]) err = "Пароли не совпадают";
      if (!err) {
        this.regUser();
      } else this.ifError = err;
    },

    CheckDataAuth() {
      var arr = [
        this.Login.split(" ").join(""),
        this.Password.split(" ").join(""),
      ];
      var err = false;
      arr.forEach((el) => {
        if (el.length < 3 || el.length > 15 || !/^[a-zA-Z0-9]+$/.test(el)) {
          err = "Только латинские символы и цифры.";
        }
      });
      if (!err) {
        this.Auth();
      } else this.ifError = err;
    },

    async regUser() {
      this.$emit("LoadingStart");
      try {
        const response = await axios.post(
          "http://ragaban.zzz.com.ua/chatapi/index.php",
          { login: this.Login, password: this.Password, registration: 1 }
        );
        if (response.data.message == "succes") {
          window.localStorage.setItem("login", response.data.login);
          window.localStorage.setItem("token", response.data.token);
          this.login = response.data.login;
          this.ifLogin = true;
          this.ifError = false;
        } else this.ifError = response.data.message;
      } catch (error) {
        console.log(error);
      }
      this.$emit("LoadingStop");
    },
  },

  data() {
    return {
      Message: "",
      ifLoading: false,
      ifError: false,
      ifLogin: false,
      swapUI: true,
      Login: "",
      Password: "",
      Cpassword: "",
    };
  },
};
</script>

<style>
.login {
  padding: 10px;
}
.mytext {
  color: #7952b3;
  margin: 0px;
}
.passwInp {
  display: block;
}
.loginBtn {
  display: inline-block;
  margin-top: 15px;
  background-color: #7952b3;
  border-radius: 5px;
  padding: 5px 20px 5px 20px;
  border: none;
  color: #fff;
}
.loginBtn:hover {
  background-color: #6732b7;
}
.sendBtn {
  display: inline-block !important;
}
.regLink {
  color: #7952b3;
  display: inline-block;
  text-align: right;
  margin-left: 20px;
}
.regLink:hover {
  cursor: pointer;
}
.messageText {
  resize: none;
  margin-top: 10px;
}
.welcome {
  margin-top: 40px;
}
.welcome h4 {
  color: rgb(86, 85, 85);
  display: inline-block;
  margin-right: 20px;
}
.welcome h4 span {
  color: #7952b3;
}
.errMess {
  color: red;
  margin-left: 15px;
  margin-bottom: 0px;
}
.MyBtn {
  display: inline-block;
  margin-top: 15px;
  margin-left: 15px;
  background-color: #393939;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  border: none;
  color: #ccc;
}
.MyBtn:hover {
  color: #fff;
}
</style>
