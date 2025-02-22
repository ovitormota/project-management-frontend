import ActivityCreate from "@/views/activity/ActivityCreate.vue";
import ActivityList from "@/views/activity/ActivityList.vue";
import ClientsCreate from "@/views/client/ClientsCreate.vue";
import ClientsList from "@/views/client/ClientsList.vue";
import Home from "@/views/home/Home.vue";
import Login from "@/views/login/Login.vue";
import ProjectCreate from "@/views/project/ProjectCreate.vue";
import ProjectsList from "@/views/project/ProjectsList.vue";
import UserCreate from "@/views/user/UserCreate.vue";
import UserList from "@/views/user/UserList.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/home", name: "Home", component: Home },
  { path: "/clients", component: ClientsList },
  { path: "/clients/create", component: ClientsCreate },
  { path: "/projects", name: "Projects", component: ProjectsList },
  {
    path: "/projects/create",
    name: "ProjectsCreate",
    component: ProjectCreate,
  },
  { path: "/activities", component: ActivityList },
  { path: "/activities/create", component: ActivityCreate },
  { path: "/users", name: "Users", component: UserList },
  { path: "/users/create", name: "UsersCreate", component: UserCreate },
  { path: "/", redirect: "/home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem("authToken");

  if (to.path !== "/login" && to.path !== "/users/create" && !authToken) {
    next("/login");
  } else {
    next();
  }
});

export default router;
