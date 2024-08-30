import { defineStore, acceptHMRUpdate } from "pinia";

interface Lang {
    code: string;
    name: string;
    direction: string;
}

export const useConfigStore = defineStore("config", () => {
    const languages = ref<Lang[]>([]);
    const currentLanguage = ref<Lang | null>(null);
    const menus = ref<any>([])

    const setCurrentLanguage = (code: string = "vi") => {
        const index = languages.value.findIndex((lang) =>
            lang.code.startsWith(code)
        );
        if (index !== -1) {
            currentLanguage.value = languages.value[index];
        }
    };

    return {
        languages,
        currentLanguage,
        setCurrentLanguage,
        menus
    };
});

// Enable Hot Module Replacement (HMR)
if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot));
