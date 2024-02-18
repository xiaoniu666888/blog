import { xnRequestOne } from '@/request'


export function getArticle(params) {
    return xnRequestOne.get({
        url: '/articles/article',
        params
    })
}