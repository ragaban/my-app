import MainPage from "@/pages/MainPage";
import HardSkills from "@/pages/HardSkills";
import Feedback from "@/components/Feedback";
import { createRouter, createWebHistory } from "vue-router";



const routes = [
  {
    path: "/",
    component: MainPage
  },
  {
    path: "/hardskills/",
    component: HardSkills
  },
  {
    path: "/feedback/",
    component: Feedback
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router;