import type { UserSession } from "~/lib/schemas"
import { UserSessionSchema } from "~/lib/schemas"
import type { ApiResponse } from "~/lib/types/api"

/**
 * Authentication composable for managing user sessions.
 *
 * This composable provides functionality to:
 * - Log in a user with email and password
 * - Log out the current user
 * - Check if a user is logged in
 * - Manage user session data in state and localStorage
 * - Load existing sessions from localStorage
 *
 * @example
 * ```ts
 * const { login, logout, isLoggedIn, session } = useAuth()
 *
 * // Login with credentials
 * await login('user@example.com', 'password123')
 *
 * // Check login status
 * if (isLoggedIn.value) {
 *   console.log('User is logged in:', session.value)
 * }
 *
 * // Log out
 * logout()
 * ```
 *
 * @returns {Object} Authentication utilities
 * @returns {Ref<UserSession|null>} session - Reactive user session state
 * @returns {ComputedRef<boolean>} isLoggedIn - Computed property indicating if user is logged in
 * @returns {Function} login - Async function to authenticate a user
 * @returns {Function} logout - Function to end the current session
 * @returns {Function} loadSession - Function to load and validate saved session
 */
export const useAuth = () => {
    const session = useState<UserSession | null>("session", () => null)
    const login = async (email: string, password: string) => {
        try {
            const { data, status, error } = await useFetch<ApiResponse<UserSession>>("/api/user/auth/login", {
                method: "POST",
                credentials: "omit",
                ignoreResponseError: true,
                body: {
                    email,
                    password,
                },
                headers: {
                    "Content-Type": "application/json",
                },
                onResponse({ response }) {
                    if (response.status >= 500) {
                        console.log("Login request failed:", response)
                        throw new Error("Server error.")
                    }
                },
            })

            if (status.value === "success" && data.value) {
                if (data.value.code === "OK") {
                    const result = UserSessionSchema.safeParse(data.value.data)
                    if (result.success) {
                        session.value = result.data
                        console.log("Parsed session data:", result.data)
                        console.log(`Set localStorage["session"] to ${JSON.stringify(result.data)}.`)
                        if (import.meta.client) {
                            localStorage.setItem("session", JSON.stringify(result.data))
                        }
                    } else {
                        console.error("Login request success, but the response.data is corrupted", result)
                        throw new Error("Invalid session data")
                    }
                } else {
                    console.error("Login failed:", data.value.message)
                    throw new Error(data.value.message)
                }
                console.log("Session data:", data.value)
                console.log("Token: ", data.value.data.token)
            } else {
                console.error("Login failed with error", error.value)
                throw new Error("Login failed")
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Login error:", error)
                throw new Error(error.message)
            } else {
                console.error("Login error:", error)
                throw new Error("An unknown error occurred")
            }
        }
    }

    const isLoggedIn = computed(() => !!session.value)

    // Logout function
    // Clears the session from localStorage
    // and sets the token to null in the apiClient
    const logout = () => {
        if (!import.meta.client) {
            console.error("logout: not in client context")
            return null
        }
        session.value = null
        localStorage.removeItem("session")
        navigateTo("/")
    }

    // Load session from localStorage
    // and set the token in the apiClient
    // this function is called by ~/plugins/auth.ts
    // on every app load
    const loadSession = () => {
        if (!import.meta.client) {
            return null
        }
        const raw = localStorage.getItem("session")
        if (raw) {
            const result = UserSessionSchema.safeParse(JSON.parse(raw))
            if (result.success) {
                session.value = result.data
                return session.value
            }
        }
        return null
    }

    return {
        session,
        isLoggedIn,
        login,
        logout,
        loadSession,
    }
}
