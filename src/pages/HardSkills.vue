<template>
  <div>
    <ToolBar ref="child"></ToolBar>
    <div class="wrapper" v-bind:style="styles">
      <div class="container">
        <div class="row">
          <div class="top-text">
            <p>
              В процессе изучения фреймворка Vue.js решил сделать это
              приложение. Это первое моё приложение на Vue. В процессе
              разработки познакомился с переиспользуемыми компонентами, научился
              передавать данные между компонентами приложения, познакомился с
              термином "реактивность", научился пользоваться axios для общения с
              сервером, и многими другими фишками Vue.js На стороне сервера использовал PHP+MySQL.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 tab">
            <UserUI
              ref="userUI"
              @LoadingStart="LoadingStart"
              @LoadingStop="LoadingStop"
            ></UserUI>
          </div>
          <transition name="chat" v-if="this.swapContent">
            <div class="col-lg-8 tab-center" v-if="showChat">
              <Chat ref="chat"></Chat>
            </div>
          </transition>
          <transition name="chat" v-if="!this.swapContent">
            <div class="col-lg-8 tab controller">
              <ChatController></ChatController>
            </div>
          </transition>
        </div>
      </div>
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
import ChatController from "@/components/ChatController.vue";
import Chat from "@/components/Chat.vue";
import ToolBar from "@/components/ToolBar.vue";
import UserUI from "@/components/UserUI.vue";

export default {
  mounted() {
    document.body.style.background = "#fff";
    // document.body.style.overflow = "hidden";
    setTimeout(() => {
      this.$refs.child.setStylesSkills();
      this.styles = "";
    }, 10);
    setTimeout(() => {
      this.showChat = true;
    }, 100);
  },

  components: {
    ToolBar,
    Chat,
    UserUI,
    ChatController,
  },

  data() {
    return {
      styles: "",
      showChat: false,
      swapContent: true,
    };
  },
  
  methods: {
    swapContents(el) {
      if (this.swapContent == true) el.target.innerHTML = "Чат";
      else el.target.innerHTML = "Управление MySQL";
      this.swapContent = !this.swapContent;
    },
    LoadingStart() {
      this.$refs.loadingWrap.style.display = "block";
    },
    LoadingStop() {
      this.$refs.loadingWrap.style.display = "none";
    },
  },
};
</script>

<style>
.wrapper {
  transition: 0.5s;
}
.top-text {
  background-color: #ccc;
  padding-top: 15px;
  padding-bottom: 50px;
}
.tab {
  background-color: #fff;
}
.tab-center {
  margin-top: 20px;
  background-color: #fff;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 1px 10px #000;
  padding: 0;
}

/* animations */

@media (max-width: 1000px) {
  body {
    overflow: visible !important;
  }
  .controller {
    margin-top: 30px;
  }
}
@media (min-width: 1000px) {
  .tab-center {
    top: -50px;
  }
  .controller {
    top: -30px;
  }
  .chat-enter-from {
    transform: translateY(110px);
  }
  .chat-enter-active {
    transition: all 1s;
  }
}
.loading-wrap {
  display: none;
  background-color: #ccc;
  opacity: 0.3;
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.loader {
  position: absolute;
  left: 45%;
  top: 40%;
  --b: 10px; /* border thickness */
  --n: 10; /* number of dashes*/
  --g: 10deg; /* gap between dashes*/
  --c: red; /* the color */

  width: 100px; /* size */
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px;
  background: conic-gradient(#0000, var(--c)) content-box;
  -webkit-mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg calc(360deg / var(--n) - var(--g) - 1deg),
      #0000 calc(360deg / var(--n) - var(--g)) calc(360deg / var(--n))
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(98% - var(--b)),
      #000 calc(100% - var(--b))
    );
  mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg calc(360deg / var(--n) - var(--g) - 1deg),
      #0000 calc(360deg / var(--n) - var(--g)) calc(360deg / var(--n))
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(98% - var(--b)),
      #000 calc(100% - var(--b))
    );
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: load 1s infinite steps(var(--n));
}
@keyframes load {
  to {
    transform: rotate(1turn);
  }
}
.controller {
  transition: 1s;
  padding-right: 0px !important;
  background: none;
  position: relative;
}
</style>
