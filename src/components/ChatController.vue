<template>
  <ModalWindow
    v-bind:base="this.base"
    v-bind:editId="this.editId"
    v-if="this.showModal"
    @closeModal="this.showModal = false"
    @updateBase="this.getBase()"
  ></ModalWindow>
  <div class="changeBase">
    <button
      @click="selectDB($event.target)"
      ref="chatdb"
      name="chatBut"
      class="dbBut"
      style="background-color: #7952b3"
    >
      Chat
    </button>
    <button
      @click="selectDB($event.target)"
      ref="usersdb"
      name="usersBut"
      class="dbBut"
    >
      Users
    </button>
  </div>
  <div class="db-view">
    <table v-if="this.base == 'chat-messages'">
      <tr class="topDb">
        <td></td>
        <td>id</td>
        <td>user</td>
        <td>message</td>
        <td>date</td>
        <td>time</td>
      </tr>
      <tr class="itemDb" v-for="item in chatMessages" :key="item.id">
        <td>
          <input
            type="checkbox"
            v-on:change="checkedItem($event)"
            v-bind:id="[item.id]"
          />
          <img
            src="@/res/edit.png"
            @click="EditItem($event)"
            v-bind:id="[item.id]"
          />
          <img
            src="@/res/delette.png"
            @click="DeleteItem($event)"
            v-bind:id="[item.id]"
          />
        </td>
        <td>{{ item.id }}</td>
        <td>{{ item.user }}</td>
        <td style="max-width: 130px">{{ item.message }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.time }}</td>
      </tr>
    </table>
    <table v-if="this.base == 'chat-users'">
      <tr class="topDb">
        <td></td>
        <td>id</td>
        <td>login</td>
        <td>password</td>
      </tr>
      <tr class="itemDb" v-for="item in chatUsers" :key="item.id">
        <td>
          <input
            type="checkbox"
            v-on:change="checkedItem($event)"
            v-bind:id="[item.id]"
          />
          <img
            src="@/res/edit.png"
            @click="EditItem($event)"
            v-bind:id="[item.id]"
          />
          <img
            src="@/res/delette.png"
            @click="DeleteItem($event)"
            v-bind:id="[item.id]"
          />
        </td>
        <td>{{ item.id }}</td>
        <td>{{ item.login }}</td>
        <td>{{ item.password }}</td>
      </tr>
    </table>
  </div>
  <div class="dbTools">
    <div @click="DeleteSelected()" class="delete-selected">
      <img src="@/res/delette.png" />Отмеченные удалить
    </div>
  </div>
  <div ref="loadingWrap" class="loading-wrap">
    <div
      class="loader"
      style="--b: 15px; --c: blue; width: 120px; --n: 8"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
import Chat from "@/components/Chat.vue";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  data() {
    return {
      ifLogin: false,
      data: "",
      base: "chat-messages",
      chatMessages: null,
      chatUsers: null,
      checked: [],
      editId: "",
      showModal: false,
    };
  },

  mounted() {
    this.getBase();
  },

  components: {
    Chat,
    ModalWindow,
  },

  methods: {
    EditItem(el) {
      if (window.localStorage.getItem("token")) {
        this.editId = el.target.id;
        this.showModal = true;
      } else alert("Только для авторизированных");
    },

    async DeleteItem(el) {
      if (window.localStorage.getItem("token")) {
        if (confirm("Удалить из базы строку с id - " + el.target.id + "?")) {
          try {
            const response = await axios.post(
              "http://ragaban.zzz.com.ua/chatapi/db.php",
              { id: el.target.id, database: this.base, delete: 1 }
            );
            this.getBase();
          } catch (error) {
            console.log(error);
          }
        }
      } else alert("Только для авторизированных");
    },

    async DeleteSelected() {
      if (window.localStorage.getItem("token")) {
        if (this.checked.length > 0) {
          if (confirm("Удалить из базы строки с id - " + this.checked + "?")) {
            try {
              const response = await axios.post(
                "http://ragaban.zzz.com.ua/chatapi/db.php",
                { id: this.checked, database: this.base, deleteSelected: 1 }
              );
              this.getBase();
              this.checked = [];
            } catch (error) {
              console.log(error);
            }
          }
        } else alert("Вы не выбрали ни одной записи");
      } else alert("Только для авторизированных");
    },

    checkedItem(el) {
      if (el.target.checked) {
        this.checked.push(el.target.id);
      } else {
        this.checked = this.checked.filter(function (f) {
          return f !== el.target.id;
        });
      }
    },

    selectDB(el) {
      if (el.name == "chatBut") {
        this.base = "chat-messages";
        this.$refs.chatdb.style.background = "#7952B3";
        this.$refs.usersdb.style.background = "";
        this.getBase();
        this.checked = [];
      } else {
        this.base = "chat-users";
        this.$refs.chatdb.style.background = "";
        this.$refs.usersdb.style.background = "#7952B3";
        this.getBase();
        this.checked = [];
      }
    },

    async getBase() {
      this.$refs.loadingWrap.style.display = "block";
      try {
        var response = await axios.post(
          "http://ragaban.zzz.com.ua/chatapi/db.php",
          { database: this.base, getDatabase: 1 }
        );
        if (this.base == "chat-messages") this.chatMessages = response.data;
        else this.chatUsers = response.data;
      } catch (error) {
        console.log(error);
      }
      this.$refs.loadingWrap.style.display = "none";
    },
  },
};
</script>

<style scoped>
.c-tittle {
  text-align: center;
  font-size: 20px;
}
.changeBase {
  text-align: center;
}
.dbBut {
  transition: 0.2s;
  border-radius: 3px 3px 0px 0px;
  margin-left: 20px;
  border: 0;
  padding: 3px 10px;
  background-color: #ccc;
}
.dbBut:hover {
  background-color: #bbabd4;
}
.db-view {
  overflow-y: scroll;
  font-size: 12px;

  max-height: 380px;
}
.db-view table {
  border-collapse: collapse;
  width: 100%;
}
.topDb {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(204, 204, 204, 1) 100%
  );
  border-bottom: 1px #ccc solid;
  color: #7952b3;
}
.topDb td {
  border-left: 1px #fff solid;
}
.itemDb {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(204, 204, 204, 1) 100%
  );
}
.itemDb td img {
  margin-left: 10px;
}
.itemDb td img:hover {
  cursor: pointer;
}
.dbTools div {
  color: #7952b3;
  margin: 10px 0px 20px 0px;
  display: inline-block;
}
.dbTools div:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
