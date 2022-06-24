<template>
  <router-view>

  </router-view>
</template>

<script>
import ToolBar from "@/components/ToolBar.vue";
import AboutMe from "@/components/AboutMe.vue";



export default {
  components: {
    ToolBar,
    AboutMe,
  },

  data() {
    return{
        
    }
  },
  methods:{
    
  }
};
</script>

<style>
body{
  font-family: var(--bs-font-sans-serif);
  background-size: cover;
  background-attachment: fixed;
  background-image: url("@/res/theme1.jpg");
  }
</style>