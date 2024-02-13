import { defineStore } from 'pinia'
import { local } from '@/utils'
export const userStore = defineStore('users', {
  state: () => ({
    userInfo: local.get('userInfo') || {}
  }),
  getters: {
    getUseInfo: (state) => state.userInfo
  }
  ,
  actions: {
    delUserInfo() {
      this.userInfo = {}
    }
  }
})