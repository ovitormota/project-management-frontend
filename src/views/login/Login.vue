<template>
  <div class="login-container">
    <Card class="login-card">
      <template #title>Login</template>
      <template #content>
        <form @submit.prevent="login">
          <div class="p-field">
            <label for="username">Usuário</label>
            <InputText v-model="username" id="username" required autofocus class="full-width" />
          </div>
          <div class="p-field">
            <label for="password">Senha</label>
            <Password v-model="password" id="password" required toggleMask fluid :feedback="false" class="full-width" />
          </div>
          <Button type="submit" label="Entrar" icon="pi pi-sign-in" class="p-mt-2 full-width login-button" />
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <div class="p-mt-3">
          <router-link to="/users/create">
            <Button label="Criar Novo Usuário" icon="pi pi-user-plus" class="full-width" outlined />
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import AuthService from "@/services/auth/AuthService";
import { setAuth } from "@/store/Auth";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Card,
    InputText,
    Password,
    Button,
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        const authToken = await AuthService.login(username.value, password.value);

        if (authToken) {
          localStorage.setItem("authToken", authToken);
          setAuth(true);
          router.push("/home");
        }
      } catch (error: Error | any) {
        setAuth(false);
        errorMessage.value = error.message || "Credenciais inválidas!";
      }
    };

    return {
      username,
      password,
      errorMessage,
      login,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.login-card {
  width: 400px;
  padding: 2rem;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.p-field {
  margin-bottom: 1.5rem;
  text-align: left;
}

.full-width {
  width: 100%;
}

.error-message {
  color: red;
  margin-top: 1rem;
  text-align: center;
}

.p-mt-3 {
  margin-top: 1.5rem;
}
</style>
