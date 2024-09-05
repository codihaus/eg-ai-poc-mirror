<template>
    <div class="divide-y">
        <div v-if="!loading">
            <div v-for="(coversation) in coversations" class="py-14">
                <div class="mb-6">
                    <!-- <div class="size-8 object-cover rounded-full overflow-hidden">
                        <img :src="coversation.sender.avatar" class="size-full" />
                    </div> -->
                    <div class="font-semibold text-xl">
                        <template v-if="loading">
                            <n-skeleton :sharp="false" text></n-skeleton>
                        </template>
                        <template v-else>
                            {{ coversation?.message }}
                        </template>
                    </div>
                </div>
    
                <div class="space-y-4 my-6">
                    <div v-if="coversation?.sources?.length" class="font-semibold text-lg line-clamp-1 text-base-700">
                        Sources
                    </div>
                    <ContnetChatDisplayFiles v-if="coversation?.sources?.length" :files="coversation?.sources" />
                </div>
    
                <div class="rounded-2xl overflow-hidden flex">
                    <div class="p-4 bg-base-100">
                        <div class="i-custom-ai text-3xl"></div>
                    </div>
                    <div class="px-4 py-6 bg-base-50 flex-grow">
                        <div class="prose mx-auto">
                            <n-skeleton v-if="coversation?.loading || loading" rounded text :sharp="false"></n-skeleton>
                            <n-skeleton v-if="coversation?.loading || loading" rounded text :sharp="false" class="w-6/10"></n-skeleton>
                            <div v-else v-html="renderMessage(coversation)"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-for="(coversation) in new Array(2).fill({})" class="py-14">
                <div class="mb-6">
                    <!-- <div class="size-8 object-cover rounded-full overflow-hidden">
                        <img :src="coversation.sender.avatar" class="size-full" />
                    </div> -->
                    <div class="font-semibold text-xl">
                        <n-skeleton :sharp="false" text></n-skeleton>
                    </div>
                </div>
    
                <div class="space-y-4 my-6">
                    <div class="font-semibold text-lg line-clamp-1 text-base-700">
                        <n-skeleton :sharp="false" text></n-skeleton>
                    </div>
                    <n-skeleton :sharp="false" text></n-skeleton>
                </div>
    
                <div class="rounded-2xl overflow-hidden flex">
                    <div class="p-4 bg-base-100">
                        <n-skeleton :sharp="false" text height="32px" circle></n-skeleton>
                    </div>
                    <div class="px-4 py-6 bg-base-50 flex-grow">
                        <div class="prose mx-auto">
                            <n-skeleton rounded text :sharp="false"></n-skeleton>
                            <n-skeleton rounded text :sharp="false" class="w-6/10"></n-skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup lang='ts'>
import markdownit from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.min.css'
import { renderMathInText } from './message/render'

import ContnetChatDisplayFiles from './contnet-chat-display-files.vue';

withDefaults(
    defineProps<{
        coversations: any[];
        loading: boolean
    }>(),
    {
        coversations: () => [{}],
        loading: false,
    }
)


const md = new markdownit({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
        }

        return ''; // use external default escaping
    }
});


function renderMessage(messgage) {
    let content = messgage?.content || ''
    
    content = renderMathInText(content, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "\\(", right: "\\)", display: false},
            // LaTeX uses $…$, but it ruins the display of normal `$` in text:
            // {left: "$", right: "$", display: false},
            // $ must come after $$

            // Render AMS environments even if outside $$…$$ delimiters.
            {left: "\\begin{equation}", right: "\\end{equation}", display: true},
            {left: "\\begin{align}", right: "\\end{align}", display: true},
            {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
            {left: "\\begin{gather}", right: "\\end{gather}", display: true},
            {left: "\\begin{CD}", right: "\\end{CD}", display: true},

            {left: "\\[", right: "\\]", display: true},
        ],
        throwOnError: false
    })

    return md.render(content || '')
}

</script>
