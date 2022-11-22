<script lang="ts" setup>
import { getUserList } from '~/api/ums/user'
import type { Pagination } from '~/types'

// 查询表单
const generateFormModel = () => {
  return {
    username: '',
  }
}
const formModel = ref(generateFormModel())
const resetForm = () => {
  formModel.value = generateFormModel()
}
// 分页参数
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
  total: 0,
}
const pagination = reactive({
  ...basePagination,
})

const tableData = ref<any[]>([])
const fetchTableData = async () => {
  const { data } = await getUserList({
    ...pagination,
    ...formModel.value,
  })
  tableData.value = data.list
  pagination.total = data.totalCount
}

const searchTableData = () => {
  pagination.current = 1
  fetchTableData()
}

onMounted(() => {
  fetchTableData()
})
</script>

<template>
  <div class="layout-content">
    <el-space fill class="w-full">
      <el-card>
        <el-form :model="formModel" :inline="true">
          <el-form-item label="用户名称">
            <el-input v-model="formModel.username" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchTableData">
              查询
            </el-button>
            <el-button @click="resetForm">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <el-space fill class="mb-16px">
          <el-button type="primary">
            新增
          </el-button>
        </el-space>
        <el-table row-key="id" :data="tableData" class="mt-16px">
          <el-table-column prop="id" label="编号" width="180" />
          <el-table-column prop="username" label="用户名" width="180" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="is_active" label="状态" />
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          class="justify-end mt-16px mb-16px"
        />
      </el-card>
    </el-space>
  </div>
</template>
