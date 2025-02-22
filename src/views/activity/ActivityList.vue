<template>
    <div class="container">
        <div class="header">
            <h1 class="title">Atividades</h1>
            <router-link to="/activities/create">
                <Button label="Adicionar nova atividade" icon="pi pi-plus" class="add-activity-btn" />
            </router-link>
        </div>

        <DataTable v-if="activities.length" :value="activities" class="data-table">
            <Column field="description" header="Descrição" class="column-header" />

            <Column field="status" header="Status" class="column-header">
                <template #body="slotProps">
                    <span :class="getStatusClass(slotProps.data.status)">
                        {{ translateStatus(slotProps.data.status) }}
                    </span>
                </template>
            </Column>

            <Column field="startDate" header="Data de Início" class="column-header">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.startDate) }}
                </template>
            </Column>

            <Column field="endDate" header="Data de Término" class="column-header">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.endDate) }}
                </template>
            </Column>

            <Column header="Ações" class="column-header actions-column">
                <template #body="slotProps">
                    <div class="p-button-group">
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text"
                            @click="deleteActivity(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>

        <p v-else class="no-activities-msg">Nenhuma atividade cadastrada</p>
    </div>
</template>

<script lang="ts">
import type { Activity } from "@/interfaces/Types";
import ActivityServices from "@/services/activity/ActivityServices";
import { Column, DataTable, useToast } from "primevue";
import Button from "primevue/button";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "ActivityList",
    components: { DataTable, Column, Button },
    setup() {
        const toast = useToast();
        const activities = ref<Activity[]>([]);

        const fetchActivities = async () => {
            try {
                activities.value = await ActivityServices.getActivities();
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        const formatDate = (date: string) => {
            return new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
        };

        const translateStatus = (status: string) => {
            const translations: { [key: string]: string } = {
                OPEN: "Aberto",
                IN_PROGRESS: "Em Progresso",
                COMPLETED: "Concluído",
                PENDING: "Pendente"
            };
            return translations[status] || status;
        };

        const getStatusClass = (status: string) => {
            const statusClasses: { [key: string]: string } = {
                OPEN: "status-open",
                IN_PROGRESS: "status-in-progress",
                COMPLETED: "status-completed",
                PENDING: "status-pending"
            };
            return statusClasses[status] || "";
        };

        const deleteActivity = async (id: number) => {
            try {
                await ActivityServices.deleteActivity(id);
                await fetchActivities();

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Atividade excluida com sucesso",
                    life: 3000
                })
            } catch (error) {
                console.error("Erro ao excluir atividade:", error);
            }
        };

        onMounted(fetchActivities);

        return { activities, formatDate, translateStatus, getStatusClass, deleteActivity };
    },
});
</script>

<style scoped>
.container {
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: white;
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

.add-activity-btn {
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.data-table {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-top: 24px;
}

.column-header {
    font-weight: 500;
    color: #4a5568;
}

.no-activities-msg {
    color: #a0aec0;
    text-align: center;
    margin-top: 20px;
}

/* Status styles */
.status-open {
    background: #e3f2fd;
    color: #1e88e5;
    padding: 5px 10px;
    border-radius: 4px;
}

.status-in-progress {
    background: #fff3e0;
    color: #fb8c00;
    padding: 5px 10px;
    border-radius: 4px;
}

.status-completed {
    background: #e8f5e9;
    color: #2e7d32;
    padding: 5px 10px;
    border-radius: 4px;
}

.status-pending {
    background: #ffebee;
    color: #d32f2f;
    padding: 5px 10px;
    border-radius: 4px;
}
</style>
