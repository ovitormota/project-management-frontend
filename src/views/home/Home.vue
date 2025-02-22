<template>
    <div class="dashboard-container">
        <section class="section">
            <h2 class="section-title"> <i class="pi pi-briefcase"></i> Projetos</h2>
            <div class="cards-container">
                <Skeleton v-if="loading" v-for="i in 4" :key="'skeleton-project-' + i" width="180px" height="108px" />
                <Card v-for="(count, status) in dashboardIndicators?.projectStatusCounts" :key="'project-' + status"
                    :class="getCardClass(status)">
                    <template #content>
                        <div class="card-content">
                            <i :class="getIconClass(status)" class="indicator-icon"></i>
                            <p class="status-title">{{ translateKey(status) }}</p>
                            <p class="status-count">{{ count }}</p>
                        </div>
                    </template>
                </Card>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title"> <i class="pi pi-list"></i> Atividades</h2>
            <div class="cards-container">
                <Skeleton v-if="loading" v-for="i in 4" :key="'skeleton-activity-' + i" width="180px" height="108px" />
                <Card v-for="(count, status) in dashboardIndicators?.activityStatusCounts" :key="'activity-' + status"
                    :class="getCardClass(status)">
                    <template #content>
                        <div class="card-content">
                            <i :class="getIconClass(status)" class="indicator-icon"></i>
                            <p class="status-title">{{ translateKey(status) }}</p>
                            <p class="status-count">{{ count }}</p>
                        </div>
                    </template>
                </Card>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import type { DashboardIndicators } from "@/interfaces/Types";
import DashboardServices from "@/services/dasboard/DashboardServices";
import "primeicons/primeicons.css";
import Card from "primevue/card";
import Skeleton from "primevue/skeleton";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "Home",
    components: { Card, Skeleton },
    setup() {
        const dashboardIndicators = ref<DashboardIndicators | null>(null);
        const loading = ref(true);

        const fetchDashboardIndicators = async () => {
            try {
                dashboardIndicators.value = await DashboardServices.getDashboardIndicators();
            } catch (error) {
                console.error("Erro ao buscar indicadores do dashboard:", error);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchDashboardIndicators);

        const translateKey = (key: string): string => {
            const translations: { [key: string]: string } = {
                OPEN: "Aberto",
                IN_PROGRESS: "Em Progresso",
                COMPLETED: "Concluído",
                PENDING: "Pendente"
            };
            return translations[key] || key;
        };

        const getIconClass = (status: string): string => {
            const iconClasses: { [key: string]: string } = {
                OPEN: "pi pi-folder-open",
                IN_PROGRESS: "pi pi-spinner",
                COMPLETED: "pi pi-check-circle",
                PENDING: "pi pi-clock"
            };
            return iconClasses[status] || "pi pi-question";
        };

        const getCardClass = (status: string): string => {
            const cardClasses: { [key: string]: string } = {
                OPEN: "card-open",
                IN_PROGRESS: "card-in-progress",
                COMPLETED: "card-completed",
                PENDING: "card-pending"
            };
            return cardClasses[status] || "";
        };

        return { dashboardIndicators, loading, translateKey, getIconClass, getCardClass };
    },
});
</script>

<style scoped>
.dashboard-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    margin: 0 auto;
    max-height: calc(100vh - 66px);
}

.section-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    text-align: left;

    i {
        font-size: 1.2rem;
        margin-right: 5px;
    }
}

.cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(198px, 1fr));
    gap: 18px;
    justify-content: center;
    align-items: stretch;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.indicator-icon {
    font-size: 2.2rem;
    color: #555;
}

.status-title {
    font-size: 1rem;
    font-weight: 600;
    color: #444;
}

.status-count {
    font-size: 1.8rem;
    font-weight: bold;
    color: #222;
}

.card-open {
    background: linear-gradient(135deg, #e3f2fd, #bbdefb22);
    border-left: 5px solid #3498db;
}

.card-in-progress {
    background: linear-gradient(135deg, #fff3e0, #ffcc801d);
    border-left: 5px solid #f39c12;
}

.card-completed {
    background: linear-gradient(135deg, #e8f5e9, #a5d6a71e);
    border-left: 5px solid #4CAF50;
}

.card-pending {
    background: linear-gradient(135deg, #ffebee, #ef9a9a1c);
    border-left: 5px solid #e74c3c;
}

/* Responsividade */
@media (max-width: 600px) {
    .cards-container {
        grid-template-columns: 1fr;
    }
}
</style>