<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item
          :class="{ twoBreadcrumbs: doubleBreadcrumbs }"
          :to="{ path: item.path }"
          >{{ item.name }}</el-breadcrumb-item
        >
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { IBreadcrumb } from '../types'

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup(props) {
    const doubleBreadcrumbs = computed(() => {
      if (props.breadcrumbs && props.breadcrumbs.length > 1) {
        return true
      } else {
        return false
      }
    })
    return {
      doubleBreadcrumbs
    }
  }
})
</script>

<style scoped>
/* ::v-deep .el-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #262e36 !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
}
::v-deep .el-breadcrumb .el-breadcrumb__item:first-child .el-breadcrumb__inner {
  color: #262e36 !important;
  font-weight: 200 !important;
  font-size: 1.1rem !important;
} */
::v-deep .el-breadcrumb__item .el-breadcrumb__inner {
  color: #262e36 !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
}
::v-deep .twoBreadcrumbs:first-child .el-breadcrumb__inner {
  color: #262e36 !important;
  font-weight: 200 !important;
  font-size: 1.1rem !important;
}
::v-deep .twoBreadcrumbs:last-child .el-breadcrumb__inner {
  color: #262e36 !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
}
</style>
