<template>
    <div class="container">
        <div class="header">
            <h1 class="title">Usuários</h1>
            <router-link to="/users/create">
                <Button label="Adicionar novo usuário" icon="pi pi-plus" class="add-user-btn" />
            </router-link>
        </div>

        <DataTable v-if="users.length" :value="users" class="data-table" :expandedRows="expandedRows"
            @rowToggle="onRowToggle">
            <Column expander style="width: 3rem" />
            <Column field="username" header="Nome de Usuário" class="column-header" />
            <Column field="email" header="E-mail" class="column-header" />
            <Column field="firstName" header="Primeiro Nome" class="column-header" />
            <Column field="lastName" header="Último Nome" class="column-header" />
            <Column field="role" header="Função" class="column-header" />
            <Column header="Ações" style="width: 10rem">
                <template #body="slotProps">
                    <div class="p-button-group">
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text"
                            @click="deleteUser(slotProps.data.id)" />
                    </div>
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="expansion-content">
                    <h3>Detalhes do Usuário</h3>
                    <p><strong>Nome de Usuário:</strong> {{ slotProps.data.username }}</p>
                    <p><strong>E-mail:</strong> {{ slotProps.data.email }}</p>
                    <p><strong>Nome Completo:</strong> {{ slotProps.data.firstName }} {{ slotProps.data.lastName }}</p>
                    <p><strong>Função:</strong> {{ slotProps.data.role }}</p>
                </div>
            </template>
        </DataTable>

        <p v-else class="no-users-msg">Nenhum usuário cadastrado</p>
    </div>
</template>

<script lang="ts">
import type { User } from "@/interfaces/Types";
import UserService from "@/services/user/UserService";
import { Column, DataTable, useToast } from "primevue";
import Button from "primevue/button";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "UsersList",
    components: { DataTable, Column, Button },
    setup() {
        const toast = useToast();
        const users = ref<User[]>([]);
        const expandedRows = ref([]);

        const fetchUsers = async () => {
            try {
                users.value = await UserService.getUsers();
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const onRowToggle = (event: any) => {
            expandedRows.value = event.value;
        };

        const deleteUser = async (id: number) => {
            try {
                await UserService.deleteUser(id);
                await fetchUsers();

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Usuário excluído com sucesso",
                    life: 3000
                })
            } catch (error) {
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: "Ocorreu um erro ao excluir o usuário.",
                    life: 3000
                })
            }
        };

        onMounted(fetchUsers);

        return { users, expandedRows, onRowToggle, deleteUser };
    },
});
</script>

<style scoped>
.container {
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.title {
    font-size: 1.5rem;
    font-weight: 600;
}

.add-user-btn {
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.data-table {
    width: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-top: 24px;
}

.column-header {
    font-weight: 500;
    color: #4a5568;
}

.expansion-content {
    padding: 16px;
    background: #f9f9f9;
    border-radius: 6px;
    margin-top: 10px;
}

.no-users-msg {
    text-align: center;
    color: #666;
    font-style: italic;
    margin-top: 10px;
}
</style>
