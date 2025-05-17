<script setup lang="ts">
import * as z from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"

definePageMeta({
    layout: "default",
    hideFooter: true,
})

const errMsg = ref("")
const toast = useToast()

const fields = [
    {
        name: "email",
        type: "text" as const,
        label: "Email",
        placeholder: "Enter your email",
        required: true,
    },
    {
        name: "password",
        label: "Password",
        type: "password" as const,
        placeholder: "Enter your password",
    },
    {
        name: "remember",
        label: "Remember me",
        type: "checkbox" as const,
    },
]

const providers = [
    {
        label: "Google",
        icon: "i-simple-icons-google",
        onClick: () => {
            toast.add({
                title: "Google",
                description: "Login with Google",
            })
        },
    },
    {
        label: "GitHub",
        icon: "i-simple-icons-github",
        onClick: () => {
            toast.add({
                title: "GitHub",
                description: "Login with GitHub",
            })
        },
    },
]

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log("Submitted", payload)
    apiClient.post("/user/auth/login", payload.data).then((response) => {
        console.debug("Response", response)
        if (response.status === 200) {
            errMsg.value = ""
            console.log("Login successful", response)
            toast.add({
                title: "Login successful",
                description: "Welcome back!",
                icon: "i-lucide-check",
                color: "success",
            })
        } else if (response.status >= 400 && response.status < 500) {
            console.error("Login failed", response)
            errMsg.value =
                response.data?.message || "Login failed. Please try again."
        } else {
            console.error("Unexpected error", response)
            errMsg.value =
                "An unexpected error occurred. Please try again latter."
        }
    })
}
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                :schema="schema"
                :fields="fields"
                :providers="providers"
                title="Welcome aboard!"
                icon="i-lucide-lock"
                @submit="onSubmit"
            >
                <template #description>
                    Already have an account?
                    <ULink to="/login" class="text-primary font-medium">
                        Sign in
                    </ULink>to continue.
                </template>
                <template #password-hint>
                    <ULink
                        to="#"
                        class="text-primary font-medium"
                        tabindex="-1"
                    >
                        Forgot password?
                    </ULink>
                </template>
                <template #validation>
                    <UAlert
                        color="error"
                        icon="i-lucide-info"
                        :title="errMsg"
                    />
                </template>
                <template #footer>
                    By signing in, you agree to our
                    <ULink to="/legal/terms" class="text-primary font-medium">
                        Terms of Service
                    </ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>
