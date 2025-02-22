import { ref } from "vue";

const isAuthenticated = ref(localStorage.getItem("authToken") !== null);

const setAuth = (auth: boolean) => {
  isAuthenticated.value = auth;
  if (!auth) {
    localStorage.removeItem("authToken");
  }
};

export { isAuthenticated, setAuth };
