import type { NitroFetchOptions, NitroFetchRequest } from "nitropack"
import type { UserSession } from "~/lib/schemas"
import type { ApiResponse } from "~/lib/types/api"

export function _useApi<T>(url: string, options: NitroFetchOptions<NitroFetchRequest> = {}) {
    const session = useState<UserSession | null>("session", () => null)
    const token = session.value?.token || null
    const data = ref<T | null>(null)

    const pending = ref(true)
    const error = ref<Error | null>(null)
    const status = ref<number | null>(null)

    const load = async () => {
        pending.value = true
        try {
            console.log("Fetching data from:", url)
            const res = await $fetch.raw<ApiResponse<T>>(url, {
                ...options,
                headers: {
                    ...(token ? { Authorization: token } : {}),
                    "Content-Type": "application/json",
                },
                credentials: "omit",
            })
            console.log("Response:", res)
            status.value = res.status

            if (status.value >= 0 && status.value <= 299 && res._data && res._data.code === "OK") {
                data.value = res._data.data
            } else {
                console.error("API error:", res._data)
                throw new Error(res._data!.message || `Request to ${url} failed.`)
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = err
            } else {
                error.value = new Error("Unknown error occurred")
            }
            status.value = null
        } finally {
            pending.value = false
        }
    }

    load()

    return {
        data,
        status,
        error,
        pending,
        refresh: load,
    }
}

export function useGet<T, Q extends Record<string, unknown> = Record<string, unknown>>(url: string, query?: Q) {
    return _useApi<T>(url, {
        method: "GET",
        query,
    })
}

export function usePost<T, B extends Record<string, unknown> = Record<string, unknown>>(url: string, body?: B) {
    return _useApi<T>(url, {
        method: "GET",
        body,
    })
}

export function useDelete<T, Q extends Record<string, unknown> = Record<string, unknown>>(url: string, query?: Q) {
    return _useApi<T>(url, {
        method: "GET",
        query,
    })
}

export function usePatch<T, B extends Record<string, unknown> = Record<string, unknown>>(url: string, body?: B) {
    return _useApi<T>(url, {
        method: "PATCH",
        body,
    })
}
