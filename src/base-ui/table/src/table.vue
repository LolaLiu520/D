<template>
  <div class="hy-table">
    <el-table
      :data="listData"
      :border="border"
      size="mini"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 表头 -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot
              v-if="propItem.type === 'select'"
              :name="propItem.slotName"
              :row="scope.row"
            >
              {{ filters(scope.row[propItem.prop], propItem.option) }}
            </slot>
            <slot
              v-else-if="propItem.type === 'time'"
              :name="propItem.slotName"
              :row="scope.row"
            >
              {{ timeFilters(scope.row[propItem.prop]) }}
            </slot>
            <slot
              v-else-if="propItem.type === 'image'"
              :name="propItem.slotName"
              :row="scope.row"
            >
              <img
                :src="scope.row[propItem.prop]"
                style="width: 30px; height: 30px"
              />
            </slot>
            <slot v-else :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <!-- 操作列 -->
      <el-table-column
        fixed="right"
        :label="operation.label"
        :width="operation.width"
        align="center"
        v-if="isShow"
      >
        <template #default="scope">
          <!-- 操作列超过3个，用更多下拉显示 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more el-icon--right more"></i>
            </span>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in operation.cols"
                  :key="item.label"
                  @click="item.handleRow(scope.row, item.label)"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { formatDate } from '@/utils/format-date'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    totalCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    isOperation: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    operation: {
      type: Object,
      required: true
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const isShowOperationCols = computed(() => {
      let list = props.operation.cols
      return list.length && list.length > 0
    })
    const isShow = computed(() => {
      return props.isOperation && props.operation.cols.length
    })
    const filters = (row: any, options: any) => {
      let list = options.value.filter((e: any) => e.value === row)
      return list.length > 0 ? list[0].label : '--'
    }
    const timeFilters = (row: any) => {
      if (row) {
        return formatDate(row)
      }
      return '--'
    }
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      isShowOperationCols,
      isShow,
      filters,
      timeFilters
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
.el-button {
  border-radius: 1px;
}
.more {
  transform: rotate(90deg);
}
::v-deep .cell {
  color: #262e36;
}
.el-dropdown-menu__item {
  font-size: 0.65rem;
}
</style>
