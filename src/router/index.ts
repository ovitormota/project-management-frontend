import ActivityCreate from "@/views/activity/ActivityCreate.vue";
import ActivityList from "@/views/activity/ActivityList.vue";
import ClientsCreate from "@/views/client/ClientsCreate.vue";
import ClientsList from "@/views/client/ClientsList.vue";
import Home from "@/views/home/Home.vue";
import ProjectCreate from "@/views/project/ProjectCreate.vue";
import ProjectsList from "@/views/project/ProjectsList.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
  { path: "/", redirect: "/home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
