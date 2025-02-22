<template>
    <div class="container">
        <div class="form-card">
            <h1 class="title">Adicionar novo cliente</h1>

            <form @submit.prevent="addClient" class="form">
                <div class="input-group">
                    <label for="name">Nome</label>
                    <InputText id="name" v-model="newClient.name" placeholder="Digite o nome" class="full-width"
                        required />
                </div>

                <div class="input-group">
                    <label for="email">E-mail</label>
                    <InputText id="email" v-model="newClient.email" type="email" placeholder="Digite o e-mail"
                        class="full-width" required />
                </div>

                <div class="input-group">
                    <label for="phone">Celular (opcional)</label>
                    <InputText id="phone" v-model="newClient.phone" placeholder="Digite o celular" class="full-width" />
                </div>

                <div class="buttons">
                    <router-link to="/clients">
                        <Button label="Voltar" severity="secondary" class="full-width" />
                    </router-link>
                    <Button type="submit" label="Salvar" class="full-width" />
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import ClientServices from "@/services/clients/ClientServices";
import type { Client } from "@/interfaces/Client";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";


export default defineComponent({
    name: "ClientsCreate",
    components: { InputText, Button },
    setup() {
        const toast = useToast();
        const router = useRouter();
        const newClient = ref<Client>({ name: "", email: "", phone: "" });

        const addClient = async () => {
            try {
                await ClientServices.createClient(newClient.value);

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Cliente adicionado com sucesso!",
                    life: 3000,
                });

                router.push("/clients");
            } catch (error) {

                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: "Ocorreu um erro ao adicionar o cliente.",
                    life: 3000,
                });

                console.error("Error adding client:", error);
            }
        };

        return { newClient, addClient };
    },
});
</script>

<style scoped>
/* Centralização da tela */
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
