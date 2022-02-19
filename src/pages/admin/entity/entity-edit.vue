<template>
  <el-main>
    <el-card shadow="never">
      <el-tabs tab-position="top">
        <el-tab-pane label="基本信息">
          <el-form ref="form" label-width="200px" class="pt-20px max-w-1000px">
            <el-form-item label="图标">
              <sc-icon-select v-model="form.icon" clearable :disabled="disabled" />
            </el-form-item>
            <el-form-item label="实体名称">
              <el-input v-model="form.entityLabel" />
            </el-form-item>
            <el-form-item label="内部标识">
              <el-input v-model="form.entityName" disabled />
            </el-form-item>
            <el-form-item label="名称字段">
              <el-select v-model="value" placeholder="默认" class="w-500px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="el-form-item-msg">
                名称字段应该清晰的体现记录本身，如客户中的客户名称
              </div>
            </el-form-item>
            <el-form-item label="快速查询字段">
              <el-select v-model="value" multiple placeholder="默认" class="w-500px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="el-form-item-msg">
                用于列表、表单引用字段等处的快速查询
              </div>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.entityName" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary">
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="字段管理" />
        <el-tab-pane label="表单设计" /><el-tab-pane label="高级配置" />
      </el-tabs>
    </el-card>
  </el-main>
</template>
<script setup>
const form = reactive({
  entityLabel: '促销活动',
  entityName: 'cuxiaohuodong (999)',
  icon: '',
})

const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>
