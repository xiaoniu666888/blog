import { xnRequestOne } from '@/request'

/**
 * 
 * @param {object} params => get请求查询参数
 * @param {object} data => post请求携带数据
 */
// 获取文章列表
export function getArticle(params) {
    return xnRequestOne.get({
        url: '/articles/article',
        params
    })
}
// 获取文章的详细数据
export function getArticleDetail(params) {
    return xnRequestOne.get({
        url: '/articles/detail',
        params
    })
}