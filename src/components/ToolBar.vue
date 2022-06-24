<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light nav-app"
    ref="toolBar"
    v-bind:style="styles"
  >
    <div class="container container-app">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li @click="$router.push('/')" class="nav-item">
            <span class="navbar_btn">About me</span>
          </li>
          <li @click="$router.push('/hardskills')" class="nav-item">
            <span class="navbar_btn">Hard skills</span>
          </li>
          <li @click="$router.push('/feedback')" class="nav-item">
            <span class="navbar_btn">Feedback</span>
          </li>
        </ul>
      </div>
      <div class="nav-icons">
        <a href="https://github.com/ragaban/" target="_blank"><img class="nav-bar-icons" src="@/res/git-icon.png" alt="GitHub" /></a>
        <a href="https://anton_parfilo@gmail.com" target="_blank"><img class="nav-bar-icons" src="@/res/gmail-icon.png" alt="Gmail" /></a>
        <a href="https://t.me/Anton_Parfilo" target="_blank"><img class="nav-bar-icons" src="@/res/telegram-icon.png" alt="Gmail" /></a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      styles: "background-color: #343434;",
    };
  },

  methods: {
    setStylesSkills() {
      this.styles += "background-color: #7952B3;";
      this.styles += "margin-bottom: 0px;";
      this.styles += "box-shadow: 0px 1px 10px #000;";
      this.styles += "border-bottom: none;";
    },

    setStylesFeedback() {
      this.styles += "background-color: rgb(0, 97, 157);";
      this.styles += "margin-bottom: 0px;";
      this.styles += "box-shadow: 0px 1px 10px #000;";
      this.styles += "border-bottom: none;";
    },
  },
};
</script>

<style>
.nav-app {
  background-color: rgb(0, 97, 157);
  background-color: #343434;
  transition: 0.5s;
  width: 100%;
  margin-bottom: 15px;
  border-bottom: 1px solid #c1c0c0;
}
.navbar a {
  font-weight: bold !important;
  color: rgb(240, 248, 255) !important;
}
.dropdown-menu {
  background-color: #343434 !important;
}
.dropdown-menu a:hover {
  background-color: rgb(35, 35, 35);
}
.nav-bar-icons {
  margin-left: 15px;
}
.nav-bar-icons:hover {
  cursor: pointer;
}
.nav-icons {
  float: right;
}
.navbar-toggler {
  color: #f0f8ff !important;
}
.navbar_btn {
  color: #ccc;
  transition: 0.4s;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 20px;
  font-size: 16px;
}
.navbar_btn:hover {
  color: #fff;
  cursor: pointer;
}
@media (max-width: 990px) {
  .navbar-nav {
    padding-top: 20px;
    padding-bottom: 15px;
  }
  .nav-item {
    margin-top: 15px;
  }
}
</style>
