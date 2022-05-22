import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin() {
  router.push({
    name: 'login',
    query: { redirect: router.currentRoute.fullPath }
  })
}

function refreshToken() {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refresh_token: store.state.user.refresh_token
    })
  })
}

const request = axios.create({})

request.interceptors.request.use(
  (config) => {
    const { user } = store.state
    if (user && user.access_token) {
      config.headers.Authorization = user.access_token
      // return {
      //   ...config,
      //   headers: user.access_token
      // }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let isRefreshing = false
let requests: any[] = [] // 存储刷新token期间过来的请求
request.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response) {
      const { status } = error.response
      if (status === 400) {
        Message.error('请求参数错误')
      } else if (status === 401) {
        // token 无效 (没有提供 token， token 无效， token 过期)
        // 如果有 refresh_token 就用它换取新的 access_token
        //    成功获取 access_token 后, 重新发送这次返回 401 的请求
        //    如果获取 access_token 失败, 跳转到登录页重新登录
        // 如果没有 refresh_token 就跳转到登录页
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }

        // 正在刷新 token
        if (!isRefreshing) {
          isRefreshing = true
          try {
            const { data } = await refreshToken()
            if (!data.success) {
              throw new Error('刷新 token 失败')
            }
            store.commit('setUser', data.content)
            // 把 requests 队列请求重新发出去
            requests.forEach((cb) => cb())
            requests = []
            return request(error.config)
          } catch (error) {
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          } finally {
            isRefreshing = false
          }
        }

        return new Promise((resolve) => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
      } else if (status === 403) {
        Message.error('没有权限, 请联系管理员')
      } else if (status === 404) {
        Message.error('请求资源不存在')
      } else if (status >= 500) {
        Message.error('服务端错误, 请联系管理员')
      }
    } else if (error.request) {
      Message.error('请求超时, 请刷新重试')
    } else {
      Message.error(`请求失败, ${error.message}`)
    }
    return Promise.reject(error)
  }
)

export default request
