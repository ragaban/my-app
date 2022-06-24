<template>
  <ToolBar />
  <AboutMe />
</template>

<script>
import ToolBar from "@/components/ToolBar.vue";
import AboutMe from "@/components/AboutMe.vue";
import Feedback from "@/components/Feedback.vue"

export default {
    components: {
    ToolBar,
    AboutMe,
    Feedback,
  },
};
</script>