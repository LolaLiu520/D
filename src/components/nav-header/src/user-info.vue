<template>
  <div class="user-info">
    <el-dropdown style="margin-right: 15px">
      <span class="el-dropdown-link">
        <svg
          t="1675223411282"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6686"
          width="24"
          height="24"
        >
          <path
            d="M512 85.333333C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333z m294.4 256H682.666667c-12.8-51.2-34.133333-102.4-59.733334-153.6 76.8 29.866667 145.066667 81.066667 183.466667 153.6zM512 170.666667c34.133333 51.2 64 106.666667 81.066667 170.666666h-162.133334c17.066667-59.733333 46.933333-119.466667 81.066667-170.666666zM183.466667 597.333333c-8.533333-25.6-12.8-55.466667-12.8-85.333333s4.266667-59.733333 12.8-85.333333h145.066666c-4.266667 29.866667-4.266667 55.466667-4.266666 85.333333s4.266667 55.466667 4.266666 85.333333H183.466667z m34.133333 85.333334H341.333333c12.8 51.2 34.133333 106.666667 59.733334 153.6-76.8-29.866667-145.066667-81.066667-183.466667-153.6zM341.333333 341.333333H217.6c42.666667-72.533333 106.666667-123.733333 183.466667-153.6C375.466667 238.933333 358.4 290.133333 341.333333 341.333333z m170.666667 512c-34.133333-51.2-64-106.666667-81.066667-170.666666h162.133334c-17.066667 59.733333-46.933333 119.466667-81.066667 170.666666z m98.133333-256H413.866667c-4.266667-29.866667-8.533333-55.466667-8.533334-85.333333s4.266667-59.733333 8.533334-85.333333h200.533333c4.266667 25.6 8.533333 55.466667 8.533333 85.333333s-8.533333 55.466667-12.8 85.333333z m12.8 238.933334c25.6-46.933333 46.933333-98.133333 59.733334-153.6h123.733333c-38.4 68.266667-106.666667 123.733333-183.466667 153.6z m76.8-238.933334c4.266667-29.866667 4.266667-55.466667 4.266667-85.333333s-4.266667-55.466667-4.266667-85.333333h145.066667c8.533333 25.6 12.8 55.466667 12.8 85.333333s-4.266667 59.733333-12.8 85.333333h-145.066667z"
            p-id="6687"
            fill="#45505b"
          ></path>
        </svg>
      </span>
      <template #dropdown>
        <el-dropdown-menu v-for="item in languageList" :key="item.value">
          <el-dropdown-item @click="changeLanguage(item.value)">{{
            item.label
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <span class="el-dropdown-link">
        <svg
          t="1675223718349"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="16190"
          width="24"
          height="24"
        >
          <path
            d="M484.072727 46.545455c-256 0-465.454545 209.454545-465.454545 465.454545 0 130.327273 55.854545 251.345455 144.290909 335.127273l69.818182 55.854545c69.818182 46.545455 158.254545 74.472727 251.345454 74.472727s181.527273-27.927273 251.345455-74.472727c23.272727-13.963636 46.545455-32.581818 69.818182-55.854545 88.436364-83.781818 144.290909-204.8 144.290909-335.127273 0-256-209.454545-465.454545-465.454546-465.454545z m0 851.781818c-79.127273 0-153.6-23.272727-218.763636-69.818182 46.545455-65.163636 125.672727-111.709091 218.763636-111.709091 88.436364 0 167.563636 46.545455 218.763637 111.709091-65.163636 41.890909-139.636364 69.818182-218.763637 69.818182z m-162.909091-446.836364c0-88.436364 74.472727-162.909091 162.909091-162.909091s162.909091 74.472727 162.909091 162.909091-74.472727 162.909091-162.909091 162.909091c-88.436364-4.654545-162.909091-74.472727-162.909091-162.909091z m442.181819 321.163636c-37.236364-51.2-88.436364-93.090909-148.945455-116.363636 69.818182-41.890909 121.018182-121.018182 121.018182-209.454545 0-134.981818-111.709091-242.036364-246.690909-242.036364s-251.345455 111.709091-251.345455 246.690909c0 88.436364 46.545455 162.909091 121.018182 209.454546-60.509091 23.272727-111.709091 65.163636-153.6 116.363636-65.163636-69.818182-102.4-162.909091-102.4-260.654546 0-209.454545 172.218182-381.672727 381.672727-381.672727s381.672727 172.218182 381.672728 381.672727c0 97.745455-37.236364 186.181818-102.4 256z"
            p-id="16191"
            fill="#45505b"
          ></path>
        </svg>
        <!-- <span>{{ name }}</span> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ $t('useInformation') }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('paymentMethod') }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('accountFunds') }}</el-dropdown-item>
          <el-dropdown-item>{{
            $t('multiAddressInformation')
          }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('messageNotifications') }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('modifyPassword') }}</el-dropdown-item>
          <el-dropdown-item @click="handleExitClick">{{
            $t('logOut')
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { language } from '@/constant/option'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    const languageList = computed(() => language)
    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    const changeLanguage = (item: any) => {
      sessionStorage.setItem('locales', item)
      location.reload()
    }
    return {
      name,
      handleExitClick,
      languageList,
      changeLanguage
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
