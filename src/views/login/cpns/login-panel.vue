<template>
  <div class="login-panel">
    <!-- <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
      </el-tab-pane>
    </el-tabs> -->
    <login-account ref="accountRef" />
    <!-- <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div> -->

    <el-button type="primary" class="login-btn" @click="handleLoginClick">{{
      $t('loginToSystem')
    }}</el-button>

    <div style="text-align: center; margin-top: 10px">
      <el-link type="primary">{{ $t('ownerApply') }}</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'

export default defineComponent({
  components: {
    LoginAccount
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const currentTab = ref('account')

    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
      }
    }

    return {
      isKeepPassword,
      accountRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.imgContainer {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.login-panel {
  margin-bottom: 150px;
  width: 28%;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
.el-button {
  border-radius: 1px;
}
</style>
