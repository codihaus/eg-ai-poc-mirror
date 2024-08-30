import { addImportsDir, addPlugin, defineNuxtModule } from "@nuxt/kit";
import { resolve } from "pathe";
import { fileURLToPath } from "url";
export default defineNuxtModule({
    setup(_, nuxt) {
        nuxt.hook("nitro:init", () => {});
        const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
        addPlugin(resolve(runtimeDir, "plugin"));
        addImportsDir(resolve(runtimeDir, "composables"));
    },
});
