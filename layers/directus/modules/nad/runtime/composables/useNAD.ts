export const useNAD = () => {
    const {
        $userClient
    } = useNuxtApp()

    return $userClient
}
