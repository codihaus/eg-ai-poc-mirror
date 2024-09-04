export const useNAD = () => {
    const {
        $userClient
    } = useNuxtApp()

    console.log('$userClient', $userClient)

    return $userClient
}
