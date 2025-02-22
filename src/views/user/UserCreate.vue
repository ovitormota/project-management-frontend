<template>
    <div class="container">
        <div class="form-card">
            <h1 class="title">Adicionar novo usuário</h1>

            <form @submit.prevent="addUser" class="form">
                <div class="input-group">
                    <label for="username">Nome de usuário</label>
                    <InputText id="username" v-model="newUser.username" placeholder="Digite o nome de usuário"
                        class="full-width" required />
                </div>

                <div class="input-group">
                    <label for="email">E-mail</label>
                    <InputText id="email" v-model="newUser.email" type="email" placeholder="Digite o e-mail"
                        class="full-width" required />
                </div>



                <div class="input-group">
                    <label for="firstName">Nome</label>
                    <InputText id="firstName" v-model="newUser.firstName" placeholder="Digite o nome"
                        class="full-width" />
                </div>

                <div class="input-group">
                    <label for="lastName">Sobrenome</label>
                    <InputText id="lastName" v-model="newUser.lastName" placeholder="Digite o sobrenome"
                        class="full-width" />
                </div>

                <div class="input-group">
                    <label for="password">Senha</label>
                    <Password v-model="newUser.password" id="password" required toggleMask fluid class="full-width" />
                </div>

                <!-- <div class="input-group">
                    <label for="role">Cargo</label>
                    <InputText id="role" v-model="newUser.role" :value="Role.ADMIN" disabled class="full-width" />
                </div> -->

                <div class="buttons">
                    <router-link to="/users">
                        <Button label="Voltar" severity="secondary" class="full-width" />
                    </router-link>
                    <Button type="submit" label="Salvar" class="full-width" />
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Role, type User } from "@/interfaces/Types";
import AuthService from "@/services/auth/AuthService";
import { Password } from "primevue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "UserCreate",
    components: { InputText, Button, Password },
    setup() {
        const toast = useToast();
        const router = useRouter();
        const newUser = ref<User>({
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: Role.ADMIN
        });

        const addUser = async () => {
            try {
                await AuthService.createUser(newUser.value);

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Usuário adicionado com sucesso!",
                    life: 3000,
                });

                router.push("/users");
            } catch (error) {
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: "Ocorreu um erro ao adicionar o usuário.",
                    life: 3000,
                });

                console.error("Error adding user:", error);
            }
        };

        return { newUser, addUser, Role };
    },
});
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 66px);
    background-color: #f9fafb;
}

.form-card {
    background: #fff;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
}

.title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333;
}

.input-group {
    margin-bottom: 1rem;
}

.input-group label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: #555;
}

.full-width {
    width: 100%;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.buttons a,
.buttons button {
    flex: 1;
}

:deep(.p-inputtext) {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    transition: border-color 0.3s;
    width: 100%;
}

:deep(.p-inputtext:focus) {
    border-color: #3b82f6;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}
</style>
