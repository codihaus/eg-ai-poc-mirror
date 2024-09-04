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

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import { presetFluid } from 'unocss-preset-fluid'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            extraProperties: {
                display: "inline-block",
                color: "inherit",
            },
            prefix: 'i-',
            collections: {
                custom: FileSystemIconLoader(
                    './app/icons',
                    (svg) => {
                        svg = svg.replace(/\s+width="(.*?)"/, '').replace(/\s+height="(.*?)"/, '');
                        svg = svg.replace(/\s+width=\'(.*?)\'/, '').replace(/\s+height=\'(.*?)\'/, '');
                        return svg.search('data-keep') > 0 ? svg.replace('data-keep', '') : svg.replace(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/gim, 'currentColor')
                    },
                ),
            },
        }),
        presetTypography(),
        presetWebFonts(),
        presetFluid()
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
            base: {
                0: "#929FB1",
                900: "#181D25",
                800: "#404B5A",
                700: "#606E80",
                600: "#929FB1",
                500: "#B0BECB",
                400: "#C3CED7",
                300: "#D3DBE4",
                200: "#E1E5EA",
                100: "#EDF0F2",
                50: "#F6F7F9",
            },
            primary: {
                DEFAULT: "#6E41E2",
                subtle: "#8155F2",
                soft: "#E9E4F8",
            },
            secondary: {
                DEFAULT: "#00A1B7",
            },
            warning: {
                DEFAULT: "#EB7F00",
                subtle: "#F88B0D",
                soft: "#FFE3C2",
            },
            success: {
                DEFAULT: "#5DCA07",
                subtle: "#7CD735",
                soft: "#E9FFD7",
                400: "#167C49",
            },
            danger: {
                DEFAULT: "#F55656",
                subtle: "#FE7575",
                soft: "#FFCFCF",
            },
            link: {
                DEFAULT: "#3971FF",
                subtle: "#0162DD",
            },
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
