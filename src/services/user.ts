/**
 * 用户相关请求模块
 *  */
import request from '@/utils/request'
import qs from 'qs'

interface submitData {
  phone: string
  password: string
}
export const login = (formData: submitData) => {
  return request({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: '/front/user/login',
    data: qs.stringify(formData) // axios 默认发送的是 application/json 格式的数据
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
