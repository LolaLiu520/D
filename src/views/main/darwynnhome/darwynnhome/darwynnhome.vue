<template>
  <div class="darwynnhome">
    <el-row class="main" type="flex" :gutter="20">
      <el-col :span="24"
        ><div class="grid-content bg-purple-light">dashboard</div></el-col
      >
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'darwynnhome',
  setup() {
    onMounted(() => {
      console.log(1233)
    })

    return {}
  }
})
</script>

<style scoped>
.darwynnhome {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: rgb(0 1 0 / 13%) 0px 1px 2px;
}
.el-row {
  height: 100%;
  line-height: 500px;
}
</style>
