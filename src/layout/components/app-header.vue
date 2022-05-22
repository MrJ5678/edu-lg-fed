<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          size="small"
          :src="userInfo.portrait || require('@/assets/default-avatar.png')"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { getUserInfo } from '@/services/user'
import { userInfo } from '@/db/user'

export default Vue.extend({
  name: 'AppHeader',
  data() {
    return {
      userInfo: {}
    }
  },
  async created() {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo() {
      try {
        // const { data } = await getUserInfo()
        const data: Record<string, unknown> = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(userInfo)
          }, 2000)
        })
        this.userInfo = data
      } catch (error) {
        await new Promise((resolve, reject) => {
          this.$message.error('获取用户信息失败, 请重新登录')
          setTimeout(() => {
            resolve(1)
          }, 2000)
        })
        this.$router.push({ name: 'login' })
      }
    },

    async logout() {
      try {
        await this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
        // 清除用户登录状态
        this.$store.commit('setUser', null)
        // 跳转到登录页
        this.$router.push({ name: 'login' })
        this.$message({
          type: 'success',
          message: '已退出!'
        })
      } catch (error) {
        // this.$message({
        //   type: 'info',
        //   message: '取消退出'
        // })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;

  .el-breadcrumb {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .el-dropdown {
    height: 100%;
    display: flex;
    align-items: center;

    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
