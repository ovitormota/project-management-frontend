<template>
    <div class="container">
        <div class="header">
            <h1 class="title">Clientes</h1>

            <router-link to="/clients/create">
                <Button label="Adicionar novo cliente" icon="pi pi-plus" class="add-client-btn" />
            </router-link>
        </div>

        <DataTable v-if="clients.length" :value="clients" class="data-table">
            <Column field="name" header="Nome" class="column-header" />
            <Column field="email" header="E-mail" class="column-header" />
            <Column field="phone" header="Celular" :body="phoneTemplate" class="column-header" />

            <!-- Coluna de Ações -->
            <Column header="Ações" class="column-header actions-column">
                <template #body="slotProps">
                    <div class="p-button-group">
                        <!-- Botão de Excluir -->
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text"
                            @click="deleteClient(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>

        <p v-else class="no-clients-msg">Nenhum cliente cadastrado</p>
    </div>
</template>

<script lang="ts">
import type { Client } from "@/interfaces/Types";
import ClientServices from "@/services/clients/ClientServices";
import { Column, DataTable, useToast } from "primevue";
import Button from "primevue/button";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "ClientsList",
    components: { Button, DataTable, Column },
    setup() {
        const toast = useToast();
        const clients = ref<Client[]>([]);

        const fetchClients = async () => {
            try {
                clients.value = await ClientServices.getClients();
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const deleteClient = async (id: number) => {
            try {
                await ClientServices.deleteClient(id);
                // Recarregar a lista após excluir
                await fetchClients();

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Cliente excluido com sucesso",
                    life: 3000
                })
            } catch (error) {
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: "Ocorreu um erro ao excluir o cliente.",
                    life: 3000
                })
            }
        };

        onMounted(fetchClients);

        const phoneTemplate = (rowData: Client) => {
            return rowData.phone || "N/A";
        };

        return { clients, fetchClients, phoneTemplate, deleteClient };
    },
});
</script>

<style scoped>
.container {
    padding: 24px;
    /* background-color: white; */
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

.add-client-btn {
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
    /* Medium gray */
}

.actions-column {
    text-align: center;
}

.no-clients-msg {
    color: #a0aec0;
    /* Light gray */
    text-align: center;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
        align-items: flex-start;
    }

    .add-client-btn {
        margin-top: 12px;
        width: 100%;
    }
}
</style>
