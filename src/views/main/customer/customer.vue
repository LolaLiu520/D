<template>
  <div class="customer">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'customer',
  setup() {
    return {}
  }
})
</script>
<style scoped>
.customer {
  height: 100%;
  width: 100%;
  padding: 10px 0px 10px 0px;
  /* box-shadow: rgb(0 1 0 / 13%) 0px 1px 2px; */
}
</style>
