<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/Slice-logo-1.png" alt="logo" />
      <!-- <span v-if="!collapse" class="title">Darwynn</span> -->
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0d213b"
      text-color="#ffffff"
      unique-opened="true"
      @select="handleOpen"
      active-text-color="#2752bfc"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-submenu :index="item.id + ''">
            <template #title>
              <i style="color: #ffffff" v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <div v-if="subitem.display">
                <el-menu-item
                  :index="subitem.id + ''"
                  @click="handleMenuItemClick(subitem)"
                >
                  <i
                    style="color: #ffffff"
                    v-if="subitem.icon"
                    :class="subitem.icon"
                  ></i>
                  <span>{{ subitem.name }}</span>
                </el-menu-item>
              </div>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i style="color: #ffffff" v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'
import { number } from 'echarts'
import { toRaw } from '@vue/reactivity'
// vuex - typescript  => pinia

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    let defaultValue = ref()
    const currentPathList = currentPath ? currentPath.split('/') : []
    if (currentPathList.length > 3) {
      defaultValue = ref(currentPathList[2] + '')
    }
    const menu = pathMapToMenu(userMenus.value, currentPath)
    if (menu) {
      defaultValue = ref(menu.id + '')
    }
    const handleOpen = (key: any, keyPath: any) => {
      if (keyPath.length === 1) {
        router.push({
          path: `/main/${key}`
        })
      }
    }
    // event handle
    const handleMenuItemClick = (item: any) => {
      console.log('--------')
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      defaultValue,
      handleMenuItemClick,
      handleOpen
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #0d213b;

  .logo {
    display: flex;
    height: 48px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #0d213b !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0d213b !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #0d213b !important;
    .el-icon-arrow-down {
      color: #fff;
    }
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #2752bf !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
