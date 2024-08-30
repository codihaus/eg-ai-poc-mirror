export const useNAD = () => {
    const {
        $clientSDK
    } = useNuxtApp()

    return $clientSDK
}
