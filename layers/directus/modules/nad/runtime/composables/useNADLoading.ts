export const useNADLoading = () => {
    const loading = ref(false)

    const process = async (callback: Function) => {
        loading.value = true
        const response = await callback()
        loading.value = false
        return response
    }

    return {
        loading,
        process
    }
}
