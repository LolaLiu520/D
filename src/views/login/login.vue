<template>
  <div class="login">
    <div class="imgContainer">
      <div class="imgBox">
        <img class="img" src="~@/assets/img/Slice-logo-1.png" alt="logo" />
        <div>Darwynn Fulfillment Platform</div>
      </div>
    </div>

    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  // background: url('../../assets/img/login-bg.svg');
}
.imgContainer {
  width: 100%;
  margin-top: -97px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
  background-image: linear-gradient(to top, #6a85b6 0%, #bac8e0 100%);
}
.imgBox {
  width: 27%;
  padding: 20px;
  border: 1px solid #ffffff;
  display: flex;
  height: 21%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  .img {
    width: 200px;
  }
}
</style>
