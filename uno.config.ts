// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
    // @ts-ignore
} from "unocss";

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            extraProperties: {
                color: "inherit",
                "min-width": "1.2em",
            },
        }),
        presetTypography(),
        presetWebFonts(),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    shortcuts: [
        {
            "flex-center": "flex items-center justify-center",
            "flex-items": "flex items-center",
            "flex-between": "flex items-center justify-between",
            "flex-start": "flex items-start justify-start",
            "flex-end": "flex items-end justify-end",
            "flex-around": "flex items-center justify-around",
        },
    ],
    theme: {
        colors: {
            primary: "#2ECDA7",
            "100": "#CBF3E9",
        },
        fontSize: {},
        container: {
            center: true,
            padding: {
                DEFAULT: "0.9375rem",
                sm: "1rem",
                lg: "1.5rem",
                xl: "2rem",
                xxl: "2.5rem",
            },
            maxWidth: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                xxl: "1536px",
            },
        },
        breakpoints: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            xxl: "1536px",
        },
        fontFamily: {},
    },
});
