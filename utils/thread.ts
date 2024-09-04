export function getThreadParamID(threadID:string = '') {
    return threadID?.replace('thread_', '')
}

export function getThreadID(threadParamID:string = '') {
    return `thread_${threadParamID}`
}