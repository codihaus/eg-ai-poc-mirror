interface ScrollOptions {
    offsetScroll?: number;
}

export const useHeaderScroll = (
    elementRef: Ref<HTMLElement>,
    options?: ScrollOptions
) => {
    const isScrollLock = ref(true);
    const { y } = useWindowScroll();
    const placement = ref<"top" | "bottom">("top");
    const mergedOptions = {
        offsetScroll: 100,
        ...options,
    };

    const stop = watch(
        () => y.value,
        (scrollY, preSrcollY) => {
            if (!isScrollLock.value) return;
            if (scrollY < mergedOptions.offsetScroll) return;

            if (placement?.value === "top") {
                const shouldAddClass = scrollY > preSrcollY;
                elementRef.value.classList.toggle(
                    "header--scroll-top",
                    shouldAddClass
                );
            } else {
                const shouldAddClass = scrollY > preSrcollY;
                elementRef.value.classList.toggle(
                    "header--scroll-bottom",
                    shouldAddClass
                );
            }
        }
    );

    return {
        placement,
        scrollY: y,
        stop,
        isScrollLock,
    };
};
