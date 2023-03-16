<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>

        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    border-radius: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
    width: 100%;
  }
}
shadow::before {
  content: '';
  box-shadow: 0 0 18px -28px #ccc;
  position: fixed;
  width: 100%;
}
shadow::after {
  content: '';
  background: #f3f4f6;
  position: absolute;
  height: 15px;
  width: 100%;
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 68px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #0d213b;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
::v-deep .el-menu-item {
  font-weight: 500;
  font-size: 0.825rem;
  color: #98a6b2 !important;
}
::v-deep .el-menu-item i {
  color: #98a6b2 !important;
}
::v-deep .el-submenu {
  color: #98a6b2 !important;
  font-weight: 500;
}
::v-deep .el-submenu i {
  color: #98a6b2 !important;
}
::v-deep .el-submenu__title {
  color: #98a6b2 !important;
  font-size: 0.825rem;
}
::v-deep .nav-menu .el-menu-item.is-active i {
  color: #fff !important;
}
::v-deep .el-menu-item:hover i {
  color: #fff !important;
}
::v-deep .el-submenu__title:hover i {
  color: #fff !important;
}
::v-deep .el-submenu__title:hover span {
  color: #fff !important;
}
::v-deep .el-submenu__icon-arrow {
  display: none;
}
</style>
