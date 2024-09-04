<template>
	<NaiveConfig :theme-config="themeOverrides">
        <NMessageProvider>
            <NNotificationProvider>
                <NuxtLoadingIndicator color="#181D25" />
                <NuxtLayout>
                    <NuxtPage />
                </NuxtLayout>
            </NNotificationProvider>
        </NMessageProvider>
    </NaiveConfig>
</template>
<script lang="ts" setup>
import type { GlobalThemeOverrides } from "naive-ui";
interface TypeThemeOverrides {
    shared: GlobalThemeOverrides;
}

const themeOverrides: TypeThemeOverrides = {
    shared: {
        common: {
            baseColor: "#ffffff",
            primaryColor: "#6E41E2",
            primaryColorHover: "#8155F2",
            primaryColorPressed: "#6E41E2",
            primaryColorSuppl: "#6E41E2",
            infoColor: "#181D25",
            infoColorHover: "#404B5A",
            infoColorPressed: "#181D25",
            infoColorSuppl: "#181D25",
            successColor: "#5DCA07",
            successColorHover: "#7CD735",
            successColorPressed: "#5DCA07",
            successColorSuppl: "#5DCA07",
            errorColor: "#F55656",
            errorColorHover: "#FE7575",
            errorColorPressed: "#F55656",
            errorColorSuppl: "#F55656",
            // warningColor: string;
            // warningColorHover: string;
            // warningColorPressed: string;
            // warningColorSuppl: string;

            // textColorBase: string;
            // textColor1: string;
            // textColor2: string;
            // textColor3: string;
            // textColorDisabled: string;
            // placeholderColor: string;
            // placeholderColorDisabled: string;
            // iconColor: string;
            // iconColorHover: string;
            // iconColorPressed: string;
            // iconColorDisabled: string;
            // opacity1: string;
            // opacity2: string;
            // opacity3: string;
            // opacity4: string;
            // opacity5: string;
            // dividerColor: string;
            // borderColor: string;
            // closeIconColor: string;
            // closeIconColorHover: string;
            // closeIconColorPressed: string;
            // closeColorHover: string;
            // closeColorPressed: string;
            // clearColor: string;
            // clearColorHover: string;
            // clearColorPressed: string;
            // scrollbarColor: string;
            // scrollbarColorHover: string;
            // scrollbarWidth: string;
            // scrollbarHeight: string;
            // scrollbarBorderRadius: string;
            // progressRailColor: string;
            // railColor: string;
            // popoverColor: string;
            // tableColor: string;
            // cardColor: string;
            // modalColor: string;
            // bodyColor: string;
            // tagColor: string;
            // avatarColor: string;
            // invertedColor: string;
            // inputColor: string;
            // codeColor: string;
            // tabColor: string;
            // actionColor: string;
            // tableHeaderColor: string;
            // hoverColor: string;
            // tableColorHover: string;
            // tableColorStriped: string;
            // pressedColor: string,
            // opacityDisabled: string;
            // inputColorDisabled: string;
            // buttonColor2: "#6E41E2",
            // buttonColor2Hover: string;
            // buttonColor2Pressed: string;
            // boxShadow1:
            //     "box-shadow: 0px 0px 0px 2px var(--main-colors-primary, #6E41E2), 0px 0px 0px 1px #FFF",
            // boxShadow2: string;
            // boxShadow3: string;
            fontFamily: "inherit",
            // fontFamilyMono: string;
            // fontWeight: string;
            // fontWeightStrong: string;
            // cubicBezierEaseInOut: string;
            // cubicBezierEaseOut: string;
            // cubicBezierEaseIn: string;
            borderRadius: "8px",
            // borderRadiusSmall: string;
            fontSize: "15px",
            // fontSizeMini: string;
            // fontSizeTiny: string;
            // fontSizeSmall: string;
            // fontSizeMedium: string;
            // fontSizeLarge: string;
            // fontSizeHuge: string;
            // lineHeight: string;
            // heightMini: string;
            // heightTiny: string;
            // heightSmall: string;
            // heightMedium: string;
            // heightLarge: string;
            // heightHuge: string;
        },
        Button: {
            waveOpacity: "0",
            colorHover: "#0000",
            colorPressed: "#0000",
            colorFocus: "#0000",
            colorDisabled: "#0000",
            heightMedium: "40px",
            heightSmall: "32px",
            paddingMedium: "0 12px",
            iconMarginMedium: "0 10px 0 10px",
            fontWeight: 500,
        },
        Input: {
            boxShadowFocus: "0px 0px 0px 1px #FFF, 0px 0px 0px 2px  #6E41E2",
            borderFocus: "#E1E5EA",
            textColor: "#181D25",
            fontSizeMedium: "15px",
            placeholderColor: "#929FB1",
            heightMedium: "40px",
            iconSizeMedium: "20px",
            paddingMedium: "8px 10px",
            suffixTextColor: "#929FB1",
            groupLabelBorder: "1px  solid #E1E5EA",
        },

        Select: {
            textColor: "#181D25",
        },
        InternalSelectMenu: {
            optionFontSizeLarge: "15px",
            paddingLarge: "8px",
            optionHeightLarge: "36px",
            optionTextColor: "#181D25",
            optionTextColorActive: "#181D25",
            optionCheckColor: "#3971ff",
            optionPaddingLarge: "8px",
        },

        Form: {
            labelFontSizeTopMedium: "15px",
            labelFontWeight: "500",
            feedbackTextColorError: "#F55656",
            feedbackFontSizeMedium: "13px",
            feedbackTextColor: "#929FB1",
            feedbackPadding: "6px 0",
        },
        Tooltip: {
            fontSize: "13px",
            padding: "10px 12px",
        },
        Popover: {
            padding: " 12px",
            boxShadow: "0px 4px 12px 0px rgba(64, 64, 64, 0.12)",
        },
        Steps: {
            indicatorSizeMedium: "32px",
            indicatorBorderColorWait: "#A1AEBE",
            indicatorBorderColorProcess: "#0162DD",
            indicatorBorderColorFinish: "#0162DD",
            headerTextColorProcess: "#0162DD",
            splitorColorFinish: "#0162DD",
            splitorColorProcess: "#A1AEBE",
        },
        Tabs: {
            tabFontSizeMedium: "15px",
            tabFontWeight: "600",
            tabFontWeightActive: "600",
            tabTextColorLine: "#606E80",
            tabTextColorHoverLine: "#606E80",
        },
        Popselect: {
            fontSize: "15px",
            color: "#181D25",
        },
        Pagination: {
            itemBorderRadius: "0px",
            itemBorderDisabled: "1px solid #ccc",
            itemColorActive: "#6E41E2",
            itemTextColorActive: "#fff",
            itemColorActiveHover: "#6E41E2",
            itemTextColorActiveHover: "#fff",
            itemBorder: "1px solid #E1E5EA",
            itemBorderHover: "1px solid #E1E5EA",
            itemMarginMedium: "0",
        },
        Tag: {
            fontSize: "15px",
            padding: " 12px 8px 12px 12px",
            borderRadius: "50px",
            border: "1px solid #EDF0F2",
            closeBorderRadius: "50px",
            closeIconColor: "#181D25",
            closeIconColorHover: "#181D25",
            closeMargin: "0 0 0 8px",
            textColor: "#181D25",
        },
    },
};

</script>
