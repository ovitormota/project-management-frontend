<template>
    <div class="container">
        <div class="form-card">
            <h1 class="title">Adicionar novo projeto</h1>

            <form @submit.prevent="addProject" class="form">
                <div class="input-group">
                    <label for="name">Nome do Projeto</label>
                    <InputText id="name" v-model="newProject.name" placeholder="Digite o nome do projeto"
                        class="full-width" required />
                </div>

                <div class="input-group">
                    <label for="description">Descrição (opcional)</label>
                    <InputText id="description" v-model="newProject.description" placeholder="Digite a descrição"
                        class="full-width" />
                </div>

                <div class="input-group">
                    <label for="status">Status</label>
                    <Dropdown id="status" v-model="newProject.status" :options="statusOptions" option-label="label"
                        option-value="value" placeholder="Selecione o status" class="full-width" required />
                </div>

                <div class="input-group">
                    <label for="startDate">Data de Início</label>
                    <InputText id="startDate" v-model="newProject.startDate" type="datetime-local" class="full-width"
                        required />
                </div>

                <div class="input-group">
                    <label for="endDate">Data de Término (opcional)</label>
                    <InputText id="endDate" v-model="newProject.endDate" type="datetime-local" class="full-width" />
                </div>

                <div class="input-group">
                    <label for="clientId">Cliente</label>
                    <Dropdown id="client" v-model="newProject.client" :options="clients" option-label="name"
                        placeholder="Selecione o cliente" class="full-width" required />
                </div>

                <div class="buttons">
                    <router-link to="/projects">
                        <Button label="Voltar" severity="secondary" class="full-width" />
                    </router-link>
                    <Button type="submit" label="Salvar" class="full-width" />
                </div>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import ClientServices from "@/services/clients/ClientServices"; // Serviço para buscar clientes
import ProjectServices from "@/services/projects/ProjectServices";
import { Status, StatusLabels, type Client, type Project } from "@/interfaces/Types";
import { Dropdown } from "primevue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "ProjectCreate",
    components: { InputText, Button, Dropdown },
    setup() {
        const toast = useToast();
        const router = useRouter();
        const newProject = ref<Project>({
            name: "",
            description: null,
            status: "",
            startDate: "",
            endDate: null,
            client: null,
        });

        const statusOptions = Object.keys(Status).map((key) => ({
            label: StatusLabels[Status[key as keyof typeof Status]],
            value: Status[key as keyof typeof Status]
        }));

        const clients = ref<Client[]>([]);

        const fetchClients = async () => {
            try {
                const response = await ClientServices.getClients();
                clients.value = response;
            } catch (error) {
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: "Ocorreu um erro ao carregar os clientes.",
                    life: 3000,
                });
                console.error("Error fetching clients:", error);
            }
        };

        onMounted(() => {
            fetchClients();
        });

        const addProject = async () => {
            try {
                if (newProject.value.startDate) {
                    newProject.value.startDate = new Date(newProject.value.startDate + ":00Z").toISOString(); // Adiciona "00" aos minutos e "Z" para UTC
                }

                if (newProject.value.endDate) {
                    newProject.value.endDate = new Date(newProject.value.endDate + ":00Z").toISOString();
                }

                await ProjectServices.createProject(newProject.value);

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Projeto adicionado com sucesso!",
                    life: 3000,
                });

                router.push("/projects");
            } catch (error) {
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: "Ocorreu um erro ao adicionar o projeto.",
                    life: 3000,
                });

                console.error("Error adding project:", error);
            }
        };

        return { newProject, addProject, statusOptions, clients };
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
