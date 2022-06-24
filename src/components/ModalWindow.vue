<template>
  <div class="modal">
    <div class="content">
      <table v-if="this.base == 'chat-messages'">
        <tr>
          <td>User</td>
          <td><input type="text" ref="user" v-model="this.item.user" /></td>
        </tr>
        <tr>
          <td>Message</td>
          <td>
            <textarea cols="30" rows="6" v-model="this.item.message"></textarea>
          </td>
        </tr>
        <tr>
          <td>Date</td>
          <td><input type="text" ref="user" v-model="this.item.date" /></td>
        </tr>
        <tr>
          <td>Time</td>
          <td><input type="text" ref="user" v-model="this.item.time" /></td>
        </tr>
      </table>
      <table v-if="this.base == 'chat-users'">
        <tr>
          <td>Login</td>
          <td><input type="text" ref="user" v-model="this.item.login" /></td>
        </tr>
        <tr>
          <td>Password</td>
          <td>
            <input type="text" ref="password" v-model="this.item.password" />
          </td>
        </tr>
      </table>
      <button class="loginBtn" @click="EditItem()">Применить</button>
      <button class="loginBtn modalBtn" @click="this.$emit('closeModal')">
        Отмена
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      item: "",
    };
  },

  mounted() {
    this.getItemBase();
  },

  methods: {
    async getItemBase() {
      try {
        const response = await axios.post(
          "http://ragaban.zzz.com.ua/chatapi/db.php",
          { itemId: this.editId, database: this.base, getItem: 1 }
        );
        this.item = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async EditItem() {
      if (window.localStorage.getItem("token")) {
        if (confirm("Внести изменения?")) {
          if (this.base == "chat-messages") {
            try {
              const response = await axios.post(
                "http://ragaban.zzz.com.ua/chatapi/db.php",
                {
                  id: this.item.id,
                  user: this.item.user,
                  message: this.item.message,
                  date: this.item.date,
                  time: this.item.time,
                  editMessages: 1,
                }
              );
              this.$emit("closeModal");
              this.$emit("updateBase");
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              const response = await axios.post(
                "http://ragaban.zzz.com.ua/chatapi/db.php",
                {
                  id: this.item.id,
                  login: this.item.login,
                  password: this.item.password,
                  editUsers: 1,
                }
              );
              this.$emit("closeModal");
              this.$emit("updateBase");
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    },
  },

  props: {
    base: {
      default: "false",
    },
    editId: {
      default: 0,
    },
  },
};
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.content {
  max-width: 800px;
  margin: auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 1px 10px #000;
}
.modalBtn {
  margin-left: 20px;
  background-color: rgb(59, 58, 58) !important;
}
.modalBtn:hover {
  background-color: rgb(109, 108, 108) !important;
}
.items {
  display: inline-block;
}
.items-label {
  display: inline-block;
}
</style>
