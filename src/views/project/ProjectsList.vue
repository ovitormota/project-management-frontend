<template>
    <div class="container">
        <div class="header">
            <h1 class="title">Projetos</h1>
            <router-link to="/projects/create">
                <Button label="Adicionar novo projeto" icon="pi pi-plus" class="add-project-btn" />
            </router-link>
        </div>

        <DataTable v-if="projects.length" :value="projects" class="data-table" :expandedRows="expandedRows"
            @rowToggle="onRowToggle">
            <Column expander style="width: 3rem" />
            <Column field="name" header="Cliente" class="column-header" />
            <Column field="description" header="Descrição" class="column-header" />
            <Column field="status" header="Status" class="column-header">
                <template #body="slotProps">
                    <span :class="getStatusClass(slotProps.data.status)">{{ translateStatus(slotProps.data.status)
                    }}</span>
                </template>
            </Column>
            <Column field="startDate" header="Início" class="column-header">
                <template #body="slotProps">{{ formatDate(slotProps.data.startDate) }}</template>
            </Column>
            <Column field="endDate" header="Término" class="column-header">
                <template #body="slotProps">{{ formatDate(slotProps.data.endDate) }}</template>
            </Column>
            <Column header="Ações" style="width: 10rem">
                <template #body="slotProps">
                    <div class="p-button-group">
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text"
                            @click="deleteProject(slotProps.data.id)" />
                    </div>
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="expansion-content">
                    <h3>Atividades</h3>
                    <DataTable v-if="slotProps.data.activities.length" :value="slotProps.data.activities">
                        <Column field="description" header="Descrição" />
                        <Column field="status" header="Status">
                            <template #body="activitySlot">
                                <span :class="getStatusClass(activitySlot.data.status)">
                                    {{ translateStatus(activitySlot.data.status) }}
                                </span>
                            </template>
                        </Column>
                        <Column field="startDate" header="Início">
                            <template #body="activitySlot">{{ formatDate(activitySlot.data.startDate) }}</template>
                        </Column>
                        <Column field="endDate" header="Término">
                            <template #body="activitySlot">{{ formatDate(activitySlot.data.endDate) }}</template>
                        </Column>
                    </DataTable>
                    <p v-else class="no-activities-msg">Nenhuma atividade cadastrada</p>
                </div>
            </template>
        </DataTable>

        <p v-else class="no-projects-msg">Nenhum projeto cadastrado</p>
    </div>
</template>

<script lang="ts">
import type { Project } from "@/interfaces/Types";
import ProjectServices from "@/services/projects/ProjectServices";
import { Column, DataTable, useToast } from "primevue";
import Button from "primevue/button";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "ProjectsList",
    components: { DataTable, Column, Button },
    setup() {
        const toast = useToast();
        const projects = ref<Project[]>([]);
        const expandedRows = ref([]);

        const fetchProjects = async () => {
            try {
                projects.value = await ProjectServices.getProjects();
            } catch (error) {
                console.error("Error fetching projects:", error);
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

        const onRowToggle = (event: any) => {
            expandedRows.value = event.value;
        };

        const deleteProject = async (id: number) => {
            try {
                await ProjectServices.deleteProject(id);
                await fetchProjects();

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

        onMounted(fetchProjects);

        return { projects, expandedRows, formatDate, translateStatus, getStatusClass, onRowToggle, deleteProject };
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

.add-project-btn {
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

/* Status colors */
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

.expansion-content {
    padding: 16px;
    background: #f9f9f9;
    border-radius: 6px;
    margin-top: 10px;
}

.no-activities-msg {
    text-align: center;
    color: #666;
    font-style: italic;
    margin-top: 10px;
}
</style>
