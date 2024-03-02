import { defineStore } from 'pinia'
import { local } from '@/utils'
// 用户信息store
export const userStore = defineStore('users', {
  state: () => ({
    userInfo: local.get('userInfo') || {}
  }),
  getters: {
    getUseInfo: (state) => state.userInfo
  },
  actions: {
    delUserInfo() {
      local.delete('userInfo')
      this.userInfo = {}
    }
  }
})

// 文章列表store
export const articleListStore = defineStore('articlelist', {
  state: () => {
    return {
      articleList: local.get('articleList') || [],
    }
  },
  actions: {
    saveArticleList(articleList) {
      local.set('articleList', articleList)
    },
    delArticleList() {
      local.delete('articleList')
      this.articleList = {}
    }
  }
})
