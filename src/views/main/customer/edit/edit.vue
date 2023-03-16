<template>
  <div class="customerEdit">
    <div class="main">
      <div style="margin: 20px 0px; font-weight: 700; font-size: 1.125rem">
        {{ $t('customerInfo') }}
      </div>
      <el-form
        :model="formModel"
        status-icon
        :rules="rules"
        ref="formRef"
        label-width="100px"
        class="demo-formModel"
      >
        <el-form-item class="editInput" prop="customerName">
          <el-input
            clearable
            :placeholder="$t('customerName')"
            v-model="formModel.customerName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 客户类型 -->
        <el-form-item prop="customerStyle">
          <el-select
            clearable
            v-model="formModel.customerStyle"
            :placeholder="$t('customerStyle')"
          >
            <el-option
              v-for="option in customerStyleArray"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 启用信用 -->
        <el-form-item prop="openCredit">
          <el-select
            v-model="formModel.openCredit"
            :placeholder="$t('openCredit')"
            clearable
          >
            <el-option
              v-for="option in activeFlagArray"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 活动标记 -->
        <el-form-item prop="activeFlag">
          <el-select
            v-model="formModel.activeFlag"
            :placeholder="$t('activeFlag')"
          >
            <el-option
              clearable
              v-for="option in creditArray"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="saveInfo">
          <el-button @click="cancel">{{ $t('cancel') }}</el-button>
          <el-button type="primary" @click="submitForm">{{
            $t('save')
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm } from 'element-plus'
import { customerStyleList, activeFlag, creditList } from '@/constant/option'
export default defineComponent({
  name: 'edit',
  setup() {
    const customerStyleArray = computed(() => customerStyleList)
    const activeFlagArray = computed(() => activeFlag)
    const creditArray = computed(() => creditList)
    const formRef = ref<InstanceType<typeof ElForm>>()
    const router = useRouter()
    const formModel = reactive({
      customerStyle: '',
      customerName: '',
      activeFlag: ''
    })
    const rules = reactive({
      customerName: [{ required: true, trigger: 'change' }],
      customerStyle: [{ required: true, trigger: 'change' }]
    })
    const cancel = () => {
      formRef.value?.resetFields()
      router.push({ name: 'customerMain', path: '/main/customer/' })
    }
    const submitForm = () => {
      formRef.value?.validate((valid) => {
        console.log(valid, 'vaild')
        if (valid) {
          console.log('pass')
        }
      })
    }
    return {
      formModel,
      rules,
      cancel,
      submitForm,
      formRef,
      customerStyleArray,
      activeFlagArray,
      creditArray
    }
  }
})
</script>

<style scoped>
.customerEdit {
  display: flex;
  justify-content: center;
  width: 100%;
}
.main {
  margin-top: 36px;
  padding: 20px 0px;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: rgb(0 1 0 / 13%) 0px 1px 2px;
}
.el-row {
  height: 100%;
  line-height: 500px;
}
::v-deep .el-input__inner {
  border-radius: 1px;
}
::v-deep .el-form-item__content {
  margin-left: 0px !important;
}
.editInput ::v-deep .el-input {
  width: 60% !important;
}
::v-deep .el-select {
  width: 60%;
}
::v-deep .el-form-item__error {
  margin-left: 11.8rem;
}
::v-deep .el-button {
  border-radius: 1px;
}
.saveInfo ::v-deep .el-form-item__content {
  display: flex;
  justify-content: space-around;
}
</style>
