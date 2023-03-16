<template>
  <div class="customer">
    <page-search
      :searchFormConfig="searchFormConfig"
      v-bind="btnConfig"
      @resetAddClick="handleAddClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      :tableData="tableData"
      @selectionRow="selectionRow"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <el-dialog
      :title="$t('importCustomer')"
      v-model="importDialogVisible"
      width="40%"
    >
      <div class="download">
        <span>{{ $t('downloadTips_1') }} </span
        ><span>{{ $t('downloadTips_2') }}</span>
      </div>
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button size="small" @click="importDialogVisible = false">{{
            $t('cancel')
          }}</el-button>
          <el-button
            size="small"
            type="primary"
            @click="importDialogVisible = false"
            >{{ $t('confirm') }}</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import PageSearch from '@/components/page-search'
import { ElTree, ElUpload } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { searchFormConfig } from '../config/search.config'
import { defineComponent, computed, ref, nextTick } from 'vue'
import { customerStyleList, activeFlag, creditList } from '@/constant/option'
import { usePageSearch } from '@/hooks/use-page-search'
import PageContent from '@/components/page-content'
import { usePageModal } from '@/hooks/use-page-modal'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { useI18n } from 'vue-i18n'
import { UploadFilled } from '@element-plus/icons-vue'
import { modalConfig } from '../config/modal.config'
export default defineComponent({
  name: 'main',
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    const router = useRouter()
    let importDialogVisible = ref(false)
    const customerStyleArray = computed(() => customerStyleList)
    const activeFlagArray = computed(() => activeFlag)
    const creditArray = computed(() => creditList)
    const { t } = useI18n()
    const handleRow = (rowData: any, label: any) => {
      console.log(rowData, label)
    }
    const selectionRow = (row: any) => {
      console.log(row, '父组件选择')
    }
    const handleBtn = (label: any) => {
      if (label === t('import')) {
        importDialogVisible.value = true
        console.log(importDialogVisible.value, 'importDialogVisible1')
      }
      console.log(label, '1111')
    }
    const contentTableConfig = {
      propList: [
        {
          prop: 'name',
          label: t('customerName'),
          minWidth: '100'
        },
        {
          prop: 'type',
          label: t('customerStyle'),
          minWidth: '100',
          type: 'select',
          option: customerStyleArray
        },
        {
          prop: 'status',
          label: t('openCredit'),
          minWidth: '100',
          type: 'select',
          option: creditArray
        },
        {
          prop: 'activeFlag',
          label: t('activeFlag'),
          type: 'select',
          minWidth: '100',
          option: activeFlagArray
        }
      ],
      showIndexColumn: false,
      showSelectColumn: true,
      childrenProps: {
        rowKey: 'id',
        treeProp: {
          children: 'children'
        }
      },
      border: false,
      showFooter: true,
      isOperation: true,
      operation: {
        label: t('operation'),
        width: '200',
        cols: [
          {
            label: t('edit'),
            type: 'primary',
            handleRow: handleRow
          },
          {
            label: t('delete'),
            type: 'danger',
            handleRow: handleRow
          },
          {
            label: t('open'),
            type: 'danger',
            handleRow: handleRow
          }
        ]
      },
      totalCount: 12
    }
    const btnConfig = {
      isActions: true,
      actions: [
        {
          label: t('import'),
          type: 'primary',
          style: 'plain',
          handleBtn: handleBtn
        },
        {
          label: t('export'),
          type: 'primary',
          style: 'plain',
          handleBtn: handleBtn
        }
      ]
    }
    const tableData = ref([
      {
        name: '王小虎',
        type: 1,
        url: 'http:baidu.com',
        activeFlag: 1,
        status: 2,
        startTime: '1676263246000'
      },
      {
        name: '王1',
        type: 2,
        url: 'http:baidu.com',
        activeFlag: 2,
        status: 1,
        startTime: '1678682446000'
      }
    ])
    const store = useStore()
    const otherInfo = ref({})
    const menus = computed(() => store.state.entireMenu)
    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [defaultInfo, handleNewData, handleEditData] = usePageModal(
      undefined,
      editCallback
    )
    const handleQueryClick = (val: any) => {
      console.log(val, '查询query')
    }
    const handleAddClick = (val: any) => {
      router.push({ name: 'customerEdit', path: '/main/customer/edit' })
    }
    const [handleResetClick] = usePageSearch()
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      customerStyleArray,
      handleQueryClick,
      handleResetClick,
      searchFormConfig,
      handleNewData,
      defaultInfo,
      modalConfig,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef,
      contentTableConfig,
      tableData,
      handleRow,
      t,
      activeFlagArray,
      creditArray,
      handleBtn,
      selectionRow,
      btnConfig,
      handleAddClick,
      importDialogVisible,
      UploadFilled,
      ElUpload
    }
  }
})
</script>
<style scoped>
.customer {
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
.download {
  text-align: left;
}
.download span:first-child {
  margin-right: 5px;
  color: #409eff;
}
::v-deep .el-button {
  border-radius: 1px;
}
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
.dialog-footer button {
  width: 120px;
}
.el-dialog__body {
  margin-top: -10px;
}
</style>
