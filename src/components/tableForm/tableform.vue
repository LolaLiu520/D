<template>
  <div class="tableform">
    <el-form label-position="right" label-width="80px" :model="filterForm">
      <el-row class="main" type="flex" :gutter="20">
        <el-col :span="20">
          <el-form-item>
            <el-input
              v-model="filterForm.keywords"
              :placeholder="$t('keywordsPlaceholder')"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item>
            <el-select
              v-model="filterForm.style"
              :placeholder="$t('customerStyle')"
            >
              <el-option
                v-for="item in customerStyleArray"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option></el-select></el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item>
            <el-select
              v-model="filterForm.style"
              :placeholder="$t('customerStyle')"
            >
              <el-option
                v-for="item in customerStyleArray"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option></el-select></el-form-item
        ></el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { customerStyleList } from '@/constant/option'
export default defineComponent({
  name: 'tableform',
  props: {
    filterForm: {
      type: Object,
      reuqired: true
    }
  },
  setup() {
    const filterForm: any = ref({})
    const customerStyleArray = computed(() => customerStyleList)
    onMounted(() => {
      console.log(2222)
    })
    return { filterForm, customerStyleArray }
  }
})
</script>
<style scoped>
.tableform {
  height: 100%;
  padding: 10px 0px 10px 0px;
  background: #ffffff;
  box-shadow: rgb(0 1 0 / 13%) 0px 1px 2px;
}
::v-deep .el-input__inner {
  border-radius: 1px;
}
.el-row {
  height: 100%;
  line-height: 500px;
}
</style>
