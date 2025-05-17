<script setup lang="ts">
import { h, resolveComponent } from "vue"
import type { TableColumn } from "@nuxt/ui"
import type { ProjectList } from "~/lib/schemas"

const props = defineProps<{
    type: "own" | "shared" | "all"
}>()

const route = useRoute()
const username = computed(() => route.params.user)

const {
    data: projects,
    error,
    status,
    pending,
} = useGet<ProjectList>("/api/project/list/", {
    username: username.value,
    type: props.type,
})

watchEffect(() => {
    console.log("Formatted table data:", projects.value)
    console.log("Error:", error.value)
    console.log("status:", status.value)
    console.log("pending:", pending.value)
})

const tabData = computed(() => {
    if (!projects.value) return []
    return projects.value.map((project) => ({
        name: `${project.owner.username}/${project.name}`,
        UUID: project.uuid,
        status: project.private ? "private" : "public",
        updatedAt: project.updatedAt,
    }))
})

const UBadge = resolveComponent("UBadge")
const ULink = resolveComponent("ULink")

const columns: TableColumn<{
    name: string
    UUID: string
    status: string
    updatedAt: string
}>[] = [
    {
        accessorKey: "name",
        header: "Project Name",
        cell: ({ row }) => {
            const name = row.getValue("name") as string
            return h(ULink, { to: name }, () => name)
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const color = {
                private: "warning" as const,
                public: "success" as const,
            }[row.getValue("status") as string]

            return h(
                UBadge,
                {
                    class: "capitalize",
                    variant: "subtle",
                    color,
                },
                () => row.getValue("status")
            )
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
            return new Date(row.getValue("updatedAt")).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        },
    },
]
</script>

<template>
    <div class="w-full">
        <div v-if="pending">
            Loading...
        </div>
        <div v-else-if="error">
            Error: {{ error.message }}
        </div>
        <UTable v-else :data="tabData" :columns="columns" class="flex-1" />
    </div>
</template>

<style scoped>
.projects-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;
}
</style>
