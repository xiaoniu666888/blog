import { xnRequestOne } from '../request'

// 检查标题是否重复
export function checkTitle(data) {
    return xnRequestOne.post({
        url: '/notes/checktitle',
        data
    })
}

// 笔记
export function upNoteInfo(data) {
    return xnRequestOne.post({
        url: '/notes/info',
        data
    })
}

