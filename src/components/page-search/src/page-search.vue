<template>
  <div class="page-search">
    <el-row :gutter="20">
      <el-col :span="16">
        <hy-form v-bind="searchFormConfig" v-model="formData"> </hy-form
      ></el-col>
      <el-col :span="8">
        <div class="handle-btns">
          <el-button
            class="querybtn"
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >{{ $t('search') }}</el-button
          >
          <!-- <el-button
            style="margin-right: 10px"
            icon="el-icon-refresh"
            @click="handleResetClick"
            >{{ $t('reset') }}</el-button
          > -->
          <el-button
            class="addBtn"
            style="margin-right: 10px"
            @click="handleAddClick"
            plain
            >{{ $t('add') }}</el-button
          >
          <el-dropdown v-if="isActions">
            <span class="el-dropdown-link">
              {{ $t('batch') }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in actions"
                  :key="item.label"
                  @click="item.handleBtn(item.label)"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <el-row :gutter="20" v-if="isActions">
            <el-col v-for="item in actions" :key="item.label" :span="8">
              <el-button
                v-if="item.style === 'plain'"
                :type="item.type"
                @click="item.handleBtn(item.label)"
                plain
              >
                {{ item.label }}
              </el-button>
              <el-button
                v-else
                :type="item.type"
                size="medium"
                @click="item.handleBtn(item.label)"
              >
                {{ item.label }}
              </el-button>
            </el-col>
          </el-row> -->
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    },
    isActions: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      required: true
    }
  },
  components: {
    HyForm
  },
  emits: ['resetAddClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.优化二: 当用户点击重置
    const handleAddClick = () => {
      // formData.value = formOriginData
      emit('resetAddClick', true)
    }

    // 3.优化三: 当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleAddClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  margin-top: 30px;
}
.el-button {
  border-radius: 1px;
}
.addBtn {
  border: 1px solid #2d8ced;
  color: #2d8ced;
}
</style>
