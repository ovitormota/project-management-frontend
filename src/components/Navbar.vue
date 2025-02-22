<template>
    <Menubar :model="menuItems" class="navbar p-4 shadow-xl">
        <template #end>
            <div class="flex align-items-center gap-2">
                <Button :label="itemLogout[0].label" :icon="itemLogout[0].icon" class="p-button-text p-button-plain"
                    @click="itemLogout[0].command" />
            </div>
        </template>
    </Menubar>
</template>

<script lang="ts">
import { setAuth } from "@/store/Auth";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Navbar",
    components: { Menubar, Button },
    setup() {
        const router = useRouter();

        const logout = () => {
            localStorage.removeItem('authToken');
            setAuth(false);
            router.push("/login");
        };

        const itemLogout = ref([
            { label: "Sair", icon: "pi pi-sign-out", command: logout }
        ]);

        const items = ref([
            { label: "Início", to: "/", icon: "pi pi-home" },
            { label: "Clientes", to: "/clients", icon: "pi pi-users" },
            { label: "Projetos", to: "/projects", icon: "pi pi-briefcase" },
            { label: "Atividades", to: "/activities", icon: "pi pi-list" },
            { label: "Usuários", to: "/users", icon: "pi pi-users" }
        ]);

        const menuItems = items.value.map(item => ({
            label: item.label,
            icon: item.icon,
            command: () => router.push(item.to)
        }));

        return { menuItems, itemLogout };
    },
});
</script>

<style scoped>
.navbar {
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navbar .p-menubar .p-menuitem {
    font-size: 1rem;
    font-weight: 500;
    padding: 10px 20px;
}

.navbar .p-menubar .p-menuitem:hover {
    background-color: #4b5563;
    transition: background-color 0.3s ease;
}

.navbar .p-menubar .p-menuitem .p-menuitem-text {
    margin-left: 10px;
}

.navbar .p-menubar .p-menuitem-icon {
    color: #3b82f6;
}

.navbar .p-menubar .p-menuitem:hover .p-menuitem-icon {
    color: #34d399;
}
</style>