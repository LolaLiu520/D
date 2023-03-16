<template>
  <div class="overview"></div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue'
import { ElSteps } from 'element-plus'
import { log } from 'console'
export default defineComponent({
  name: 'overview',
  setup() {
    const { t } = useI18n()
    const tableData = [
      {
        date: '201610201',
        name: 'Lola',
        address: '上海市普陀区金沙江路 1518 弄',
        type: 'vip'
      },
      {
        date: '201610202',
        name: 'Xiaobazai',
        address: '上海市普陀区金沙江路 1517 弄',
        type: 'vip'
      },
      {
        date: '201610205',
        name: 'Suwenyan',
        address: '上海市普陀区金沙江路 1519 弄',
        type: 'normal'
      },
      {
        date: '201610208',
        name: 'Xiaobazai',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'vip'
      },
      {
        date: '201610208',
        name: 'Xiaobazai',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'vip'
      },
      {
        date: '201610208',
        name: 'Xiaobazai',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'vip'
      },
      {
        date: '201610208',
        name: 'Xiaobazai',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'vip'
      }
    ]
    const handleEdit = (index: any, row: any) => {
      console.log(index, row)
    }
    const handleSizeChange = (val: any) => {
      console.log(`每页 ${val} 条`)
    }
    return { t, tableData, handleEdit }
  }
})
</script>
<style scoped>
.overview {
  font-family: 'Lato', sans-serif !important;
}
</style>
