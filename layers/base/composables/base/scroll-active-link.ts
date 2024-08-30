import { ref, onMounted, onBeforeUnmount } from "vue";
import { useDebounceFn } from "@vueuse/core";

export const useScrollActiveLink = () => {
    const currentHash = ref("");
    const scrollPosition = ref(0);

    const handleScroll = () => {
        const newScrollPosition = window.scrollY + 100;

        if (newScrollPosition !== scrollPosition.value) {
            scrollPosition.value = newScrollPosition;

            const sections = document.getElementsByClassName("section");

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const { offsetTop, offsetHeight }: any = section;
                const top = offsetTop;
                const bottom = top + offsetHeight;
                if (
                    scrollPosition.value >= top &&
                    scrollPosition.value <= bottom
                ) {
                    currentHash.value = `#${section.id}`;
                    console.log(currentHash.value);
                }
            }
        }
    };

    // Sử dụng useDebounceFn để tối ưu hóa hàm handleScroll
    const debouncedHandleScroll = useDebounceFn(handleScroll, 100);

    // Thêm sự kiện scroll khi component được mount
    onMounted(() => {
        window.addEventListener("scroll", debouncedHandleScroll);
        handleScroll(); // Gọi ngay từ đầu để xử lý trạng thái ban đầu

        // Cuộn xuống section nếu có hash khi component được mount
        if (window.location.hash.substr(1)) {
            currentHash.value = window.location.hash.substr(1);
            const targetSection = document.getElementById(currentHash.value);
            if (targetSection) {
                targetSection.scrollIntoView();
            }
        }
    });

    // Xóa sự kiện scroll khi component bị unmounted
    onBeforeUnmount(() => {
        window.removeEventListener("scroll", debouncedHandleScroll);
    });

    return { currentHash };
};
