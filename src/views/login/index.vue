<template>
  <div class="login-container">
    <div class="login">
      <div class="login-header">Edu boss 管理系统</div>

      <div class="login-main">
        <div class="board-title">登录</div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          label-position="top"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="onSubmit"
              :loading="isLoginLoading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="login-footer">
        <el-button>
          <i class="el-icon-back"></i>
          回到客户端
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { login } from '@/services/user'
import { Form } from 'element-ui'
import { content } from '@/db/user/index'

export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  // mounted() {
  //   console.log(this)
  // },
  methods: {
    async onSubmit() {
      // console.log('submit!')
      // 1. 表单验证
      try {
        await (this.$refs.form as Form).validate()
        this.isLoginLoading = true
      } catch (error) {
        return this.$message.error('请检查提交内容')
      }
      // 2. 验证通过 => 提交表单
      try {
        // const { data } = await login(this.form)
        // if(data.state !== 1) {
        //   this.isLoginLoading = false
        //   return this.$message.error(data.message)
        // }
        // 登录成功记录登录状态 此状态需要全局的组件能够访问到 => 放 vuex 里
        // 在访问需要登录的页面时 判断登录状态
        await new Promise((resolve) => {
          setTimeout(() => {
            this.$store.commit('setUser', content)
            resolve(1)
          }, 2000)
        })
        this.isLoginLoading = false
        this.$message.success('登录成功')
        // this.$router.push({ name: 'home' })
        this.$router.push(this.$route.query.redirect as string || '/')
      } catch (error: unknown) {
        // console.log(error)
        this.isLoginLoading = false
        return this.$message.error(error as string)
        // }
        // 3. 处理请求结果
        //  失败: 给出提示
        // console.log(data)
        // if (true) {
        // return window.alert(data.message)
        // return this.$message.error('data')
        // }
        //  成功: 跳转到首页

        // await new Promise((resolve) => {
        //   setTimeout(() => {
        //     console.log(1)
        //     resolve(1)
        //   }, 2000)
        // })
        // this.isLoginLoading = false
        // this.$message.success('登录成功')
        // this.$router.push({ name: 'home' })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login {
    width: 346px;
    padding: 0 50px;

    .login-header {
      margin-bottom: 50px;
      text-align: center;
      font-size: 50px;
      font-weight: 200;
      color: $info-color;
    }

    .login-main {
      background-color: #fff;
      padding: 20px;

      .board-title {
        margin-bottom: 10px;
        font-size: 1.2rem;
      }

      .login-btn {
        width: 100%;
      }
    }

    .login-footer {
      width: 100%;
      margin-top: 30px;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
