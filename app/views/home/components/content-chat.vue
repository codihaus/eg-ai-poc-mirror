<template>
    <div class="rounded-3xl overflow-hidden bg-white flex relative">
        <img v-if="!isHaveConversations && !pending" src="/images/start-icon.svg" class="w-full absolute inset-x-0 top-0" >
        
        <ContentChatHeader v-if="isHaveConversations || pending" class="absolute top-0 w-full right-0 left-0 z-9 ease duration-500 " />
        <div class="flex-1 flex pt-14 pb-15">
            <NScrollbar class="flex-1 w-full mx-4">
                <div class="max-w-3xl mx-auto pb-20">
                    <ContentChatConversations :coversations="conversations" :loading="pending"/>
                    <ContentChatStart v-if="!isHaveConversations && !pending" @on-submit="handleSubmit" />
                </div>
            </NScrollbar>

            <div :class="isHaveConversations ? 'w-70' : 'w-0'" class="relative overflow-hidden ease duration-500 ">
                <ContentChatSuggestion class="absolute left-0 top-4 px-4 bottom-0 w-70" />
            </div>
        </div>

        <div v-if="isHaveConversations" class="absolute bg-white pb-2 bottom-0 w-full right-0 left-0 z-9 flex">
            <ContentChatInput @on-submit="handleSubmit" class="max-w-3xl mx-auto flex-1" />
            <div :class="isHaveConversations ? 'w-70' : 'w-0'" class="duration-500"></div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import ContentChatHeader from './content-chat-header.vue';
import ContentChatStart from './content-chat-start.vue';
import ContentChatInput from './content-chat-input.vue';
import ContentChatSuggestion from './content-chat-suggestion.vue';
import ContentChatConversations from './content-chat-conversations.vue';
import { customEndpoint } from '@directus/sdk';
import { get, last, uniqBy } from 'lodash-es';
import { destr } from 'destr'

const route = useRoute()
const router = useRouter()
const api = useNAD()

// const conversations = ref<any>([]);






const { data: conversations, pending, refresh } = await useAsyncData(
    () => route?.params?.id && route?.params?.id !== '+' ? api.request(
        customEndpoint({
            method: 'GET',
            path: `/chat/message/${getThreadID(route?.params?.id)}`
        })
    ) : {},
	{
        server: false,
		transform: (response) => {
            console.log('response', response)
            let allMessage = (response?.messages || [])?.sort((a, b) => a.created_at - b.created_at)
            let output = allMessage?.filter((mess,index) => {
                mess.index = index
                return index % 2 === 0
            })?.map((mess, index) => {

                let content = get(allMessage, `${mess?.index+1}.content.0.text.value`)?.replace(/\s+$/, '')
                let message = get(mess?.content, '0.text.value')?.replace(/\s+$/, '')
                let sources = get(allMessage, `${mess?.index+1}.files`)?.map(({file}) =>({
                    name: file.filename
                }))
                // let sources = get(mess?.content, '0.text.annotations')?.map((item) => {
                    
                //     return {
                //         name: item?.file_citation?.file_id,
                //         text: item?.text
                //         // link: item?.text
                //     }
                // })

                // sources = uniqBy(sources, 'name') || null

                // sources?.map((item, index) => {
                //     content = content?.replaceAll(item?.text, ` [(${index+1})](#)`)
                // })

                return {
                    // user: mess?.role === 'user' ? user : userAI,
                    type: 'text',
                    message,
                    // attachments: mess.attachments?.map((attachment) => attachment?.file_id),
                    sources,
                    content,
                    id: mess?.id
                }
            })
            
            if( route.params?.id && route.params?.id !== '+' ) {
                return output?.length ? output : []
            }
            return []
        },
        default: () => []
	}
)

function addMessage(data) {
    console.log(data)
    let lastMessage = last(conversations.value)
    let lastMessageIndex = conversations.value?.length - 1

    if( !lastMessage || !lastMessage?.stream ) {
        conversations.value.push({
            message: data?.message,
            sources: data?.files || [],
            date: "20:22",
            type: "text",
            loading: true,
            stream: true,
            content: ``
        })
        return
    }

    conversations.value[lastMessageIndex] = {
        ...lastMessage,
        sources: uniqBy([...(data?.files || []), ...(lastMessage?.files || [])], 'name'),
        loading: false,
        stream: data?.stream,
        content: lastMessage.content + (data?.content || '')
    }
}


async function handleSubmit(data: any) {


    addMessage(data)
    let content = data?.message

    let thread_id = getThreadID(route?.params?.id)

    if( route.name === 'home' && ! route?.params?.id ) {
        
        const createdThread = await api.request(customEndpoint({
            method: 'POST',
            path: '/chat/thread',
            body: JSON.stringify({
                title: data?.message || 'New Request'
            })
        }))
        console.log('createdThread', createdThread)

        thread_id = createdThread?.thread?.id;
        // refreshRecentThreads.value = true
    }

    // const { data: createdMessage } = await useAsyncData(async () => {

    //     // return streamResult;
    // })
    let response = await $fetch(`/api/chat/message/stream`, {
        method: 'post',
        responseType: 'stream',
        body: {
            content,
            thread_id,
        },
        transform: (res: any) => destr(res)
    }).catch((e) => {
        console.log('stream_error', e)
        addMessage({
            content: 'Failed to process your request. Please try again!',
            stream: false
        });
        
    })
    const reader = response.getReader();
    const decoder = new TextDecoder('utf-8');
    let streamResult = '';

    let annotations = [];
    let contents = ''

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        let streamEvent = decoder.decode(value, { stream: true })
        
        streamEvent = streamEvent?.startsWith(',') ? streamEvent?.substring(1) : streamEvent
        streamEvent = `[${streamEvent}]`

        if( streamEvent?.includes('thread.run.failed') ) {
            console.log('stream_error:', 'thread.run.failed')
            addMessage({
                type: 'message',
                content: 'Failed to process your request. Please try again!',
            });
            break;
        }

        streamEvent = destr(streamEvent)

        console.log('streamEvent', streamEvent)

        if( !isArray(streamEvent) ) {
            return;
        }
        
        for (let i = 0; i < streamEvent?.length; i++) {
            let event = get(streamEvent[i], 'event')
            let data = get(streamEvent[i], 'data')
            let files = get(streamEvent[i], 'files')

            console.log('files', files)

            if(event === 'thread.run.failed') {
                addMessage({
                    content: 'Failed to process your request. Please try again!',
                });
                break;
            }

            if( data?.length ) {
                
                for(let j=0; j<data.length; j++ ) {
                    let text = get(data[j], 'text.value')
                    let content: string = text || ''
                    // let annotation = get(data[j], 'text.annotations')?.map((item: any) => {
                    //     const existIndex = annotations.findIndex((an) => an.name === item?.file_citation?.file_id)

                    //     if( existIndex < 0 ) {
                    //         annotations.push({
                    //             name: item?.file_citation?.file_id,
                    //             text: item?.text
                    //         })
                    //         content += ` [(${annotations.length})](#)`
                    //     }
                    // })

                    addMessage({
                        content,
                        // annotations,
                        stream: true,
                        files: files?.map(({file}) => ({name: file.filename}))
                    });
                }

            }
            await delay(10)
        }
    }
    addMessage({
        stream: false,
    })
    console.log('submit', data);
    if( route.name === 'home' ) {
        console.log('navigateTo thread', route, thread_id)
        // await navigateTo({
        //     name: 'chat-thread',
        //     params: {
        //         id: getThreadParamID(thread_id)
        //     },
        // }, {
        //     replace: true
        // })
        window.location.href = `/thread/${getThreadParamID(thread_id)}`
    }
}

const _coversations = [
    {
        sender: {
            name: "User Engram AI",
            avatar: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        message: "Top landscape photographers awarded globally in 2024.",
        sources: [],
        date: "20:22",
        type: "text",
        content: `...`
    },
    // {
    //     sender: {
    //         name: "User Engram AI",
    //         avatar: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    //     },
    //     message: "Top landscape photographers awarded globally in 2024.",
    //     sources: [
    //         {
    //             name: "PetaPixel",
    //             link: "https://petapixel.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024/"
    //         },
    //         {
    //             name: "Fstoppers",
    //             link: "https://fstoppers.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024-2/"
    //         },
    //         {
    //             name: "Digital Photography Review",
    //             link: "https://dpreview.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024-3/"
    //         }
    //     ],
    //     date: "20:22",
    //     type: "text",
    //     content: `<p>As our chart isHaveConversationss, a total of six states have enacted right-to-repair laws so far, with five doing so in the past three years. Colorado established the first of these bills in 2022 concerning wheelchair repairs. Another bill expanded this right to agricultural equipment, the most common sector targeted in right-to-repair legislation next to consumer electronics, in 2023, according to the <a href="https://www.ncsl.org/technology-and-communication/right-to-repair-2023-legislation" target="_blank">National Conference of State Legislatures</a>. </p>`
    // }
]


const isHaveConversations = computed(() => {
    return conversations.value.length > 0;
})

// if( route.name === 'chat-thread' && route.params?.id === '+' ) {
//     console.log('clear')
//     conversations.value = []
// }

router.beforeEach((to, from, next) => {
    if( to.name === 'chat-thread' && to.params?.id === '+' ) {
        // conversations.value = []
        // console.log('beforeEach', to)
    }
})

</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>