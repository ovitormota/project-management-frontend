<template>
    <div class="container">
        <div class="form-card">
            <h1 class="title">Adicionar nova atividade</h1>

            <form @submit.prevent="addActivity" class="form">
                <div class="input-group">
                    <label for="name">Nome</label>
                    <InputText id="name" v-model="newActivity.name" placeholder="Digite o nome" class="full-width"
                        required />
                </div>

                <div class="input-group">
                    <label for="description">Descrição</label>
                    <InputText id="description" v-model="newActivity.description" placeholder="Digite a descrição"
                        class="full-width" required />
                </div>

                <div class="input-group">
                    <label for="status">Status</label>
                    <Dropdown id="status" v-model="newActivity.status" :options="statusOptions" option-label="label"
                        option-value="value" placeholder="Selecione o status" class="full-width" required />
                </div>

                <div class="input-group">
                    <label for="startDate">Data de Início</label>
                    <InputText id="startDate" v-model="newActivity.startDate" type="datetime-local" class="full-width"
                        required />
                </div>

                <div class="input-group">
                    <label for="endDate">Data de Término (opcional)</label>
                    <InputText id="endDate" v-model="newActivity.endDate" type="datetime-local" class="full-width" />
                </div>

                <div class="input-group">
                    <label for="project">Projeto</label>
                    <Dropdown id="project" v-model="newActivity.project" :options="projects" option-label="name"
                        placeholder="Selecione o projeto" class="full-width" required />
                </div>

                <div class="buttons">
                    <router-link to="/activities">
                        <Button label="Voltar" severity="secondary" class="full-width" />
                    </router-link>
                    <Button type="submit" label="Salvar" class="full-width" />
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Status, StatusLabels, type Activity, type Project } from "@/interfaces/Types";
import ActivityServices from "@/services/activity/ActivityServices";
import ProjectServices from "@/services/projects/ProjectServices";
import { Dropdown } from "primevue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "ActivityCreate",
    components: { InputText, Button, Dropdown },
    setup() {
        const toast = useToast();
        const router = useRouter();
        const newActivity = ref<Activity>({
            name: "",
            description: "",
            status: "",
            startDate: "",
            endDate: null,
            project: null,
        });

        const statusOptions = Object.keys(Status).map((key) => ({
            label: StatusLabels[Status[key as keyof typeof Status]],
            value: Status[key as keyof typeof Status]
        }));

        const projects = ref<Project[]>([]);

        const fetchProjects = async () => {
            try {
                const response = await ProjectServices.getProjects();
                projects.value = response;
            } catch (error) {
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: "Ocorreu um erro ao carregar os projetos.",
                    life: 3000,
                });
                console.error("Error fetching projects:", error);
            }
        };

        onMounted(() => {
            fetchProjects();
        });

        const addActivity = async () => {
            try {
                if (newActivity.value.startDate) {
                    newActivity.value.startDate = new Date(newActivity.value.startDate + ":00Z").toISOString();
                }

                if (newActivity.value.endDate) {
                    newActivity.value.endDate = new Date(newActivity.value.endDate + ":00Z").toISOString();
                }

                await ActivityServices.createActivity(newActivity.value);

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Atividade adicionada com sucesso!",
                    life: 3000,
                });

                router.push("/activities");
            } catch (error) {
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: "Ocorreu um erro ao adicionar a atividade.",
                    life: 3000,
                });

                console.error("Error adding activity:", error);
            }
        };

        return { newActivity, addActivity, statusOptions, projects };
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
