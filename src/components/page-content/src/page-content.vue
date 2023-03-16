<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      @selectionChange="selectionChange"
    >
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

import HyTable from '@/base-ui/table'

export default defineComponent({
  components: {
    HyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    },
    tableData: {
      type: Array,
      require: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick', 'selectionRow'],
  setup(props, { emit }) {
    const dataList = ref(props.tableData)
    const store = useStore()
    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    const selectionChange = (val: any) => {
      emit('selectionRow', val)
    }
    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex中获取数据
    // const dataList = computed(() =>
    //   store.getters[`system/pageListData`](props.pageName)
    // )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      isCreate,
      isUpdate,
      isDelete,
      handleNewClick,
      handleEditClick,
      selectionChange
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 13px;
  background-color: #ffffff;
  border-top: 20px solid #f5f5f5;
}
</style>
