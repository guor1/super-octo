<template>
  <el-container>
    <el-aside v-loading="showGrouploading" width="200px">
      <el-container>
        <el-header>
          <el-input v-model="groupFilterText" placeholder="输入关键字进行过滤" clearable />
        </el-header>
        <el-main class="nopadding">
          <el-tree ref="group" class="menu" node-key="id" :data="group" :current-node-key="''" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="groupFilterNode" @node-click="groupClick" />
        </el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left-panel">
          <el-button type="primary" @click="add"><icon-ep-plus /> </el-button>
          <el-button type="danger" plain :disabled="selection.length==0" @click="batch_del"><icon-ep-delete /> </el-button>
          <el-button type="primary" plain :disabled="selection.length==0">分配角色</el-button>
          <el-button type="primary" plain :disabled="selection.length==0">密码重置</el-button>
        </div>
        <div class="right-panel">
          <div class="right-panel-search">
            <el-input v-model="search.name" placeholder="登录账号 / 姓名" clearable />
            <el-button type="primary" @click="upsearch"><icon-ep-search /> </el-button>
          </div>
        </div>
      </el-header>
      <el-main class="nopadding">
        <scTable ref="table" :api-obj="apiObj" stripe remote-sort remote-filter @selection-change="selectionChange">
          <el-table-column type="selection" width="50" />
          <el-table-column label="ID" prop="id" width="80" sortable="custom" />
          <el-table-column label="头像" width="80" column-key="filterAvatar" :filters="[{text: '已上传', value: '1'}, {text: '未上传', value: '0'}]">
            <template #default="scope">
              <el-avatar :src="scope.row.avatar" size="small" />
            </template>
          </el-table-column>
          <el-table-column label="登录账号" prop="userName" width="150" sortable="custom" column-key="filterUserName" :filters="[{text: '系统账号', value: '1'}, {text: '普通账号', value: '0'}]" />
          <el-table-column label="姓名" prop="name" width="150" sortable="custom" />
          <el-table-column label="所属角色" prop="groupName" width="200" sortable="custom" />
          <el-table-column label="加入时间" prop="date" width="150" sortable="custom" />
          <el-table-column label="操作" fixed="right" align="right" width="140">
            <template #default="scope">
              <el-button type="text" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
              <el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
              <el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
                <template #reference>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </scTable>
      </el-main>
    </el-container>
  </el-container>

  <save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSuccess" @closed="dialog.save=false" />
</template>

<script>
import saveDialog from './save.vue'

export default {
  name: 'User',
  components: {
    saveDialog,
  },
  data () {
    return {
      dialog: {
        save: false,
      },
      showGrouploading: false,
      groupFilterText: '',
      group: [],
      apiObj: this.$API.system.user.list,
      selection: [],
      search: {
        name: null,
      },
    }
  },
  watch: {
    groupFilterText (val) {
      this.$refs.group.filter(val)
    },
  },
  mounted () {
    this.getGroup()
  },
  methods: {
    // 添加
    add () {
      this.dialog.save = true
      this.$nextTick(() => {
        this.$refs.saveDialog.open()
      })
    },
    // 编辑
    table_edit (row) {
      this.dialog.save = true
      this.$nextTick(() => {
        this.$refs.saveDialog.open('edit').setData(row)
      })
    },
    // 查看
    table_show (row) {
      this.dialog.save = true
      this.$nextTick(() => {
        this.$refs.saveDialog.open('show').setData(row)
      })
    },
    // 删除
    async table_del (row, index) {
      const reqData = { id: row.id }
      const res = await this.$API.demo.post.post(reqData)
      if (res.code === 200) {
        // 这里选择刷新整个表格 OR 插入/编辑现有表格数据
        this.$refs.table.tableData.splice(index, 1)
        this.$message.success('删除成功')
      }
      else {
        this.$alert(res.message, '提示', { type: 'error' })
      }
    },
    // 批量删除
    async batch_del () {
      this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
        type: 'warning',
      }).then(() => {
        const loading = this.$loading()
        this.selection.forEach((item) => {
          this.$refs.table.tableData.forEach((itemI, indexI) => {
            if (item.id === itemI.id)
              this.$refs.table.tableData.splice(indexI, 1)
          })
        })
        loading.close()
        this.$message.success('操作成功')
      }).catch(() => {

      })
    },
    // 表格选择后回调事件
    selectionChange (selection) {
      this.selection = selection
    },
    // 加载树数据
    async getGroup () {
      this.showGrouploading = true
      const res = await this.$API.system.role.list.get()
      this.showGrouploading = false
      const allNode = { id: '', label: '所有' }
      res.data.unshift(allNode)
      this.group = res.data
    },
    // 树过滤
    groupFilterNode (value, data) {
      if (!value) return true
      return data.label.includes(value)
    },
    // 树点击事件
    groupClick (data) {
      const params = {
        groupId: data.id,
      }
      this.$refs.table.reload(params)
    },
    // 搜索
    upsearch () {
      this.$refs.table.upData(this.search)
    },
    // 本地更新数据
    handleSuccess (data, mode) {
      if (mode === 'add') {
        data.id = new Date().getTime()
        this.$refs.table.tableData.unshift(data)
      }
      else if (mode === 'edit') {
        this.$refs.table.tableData.filter(item => item.id === data.id).forEach((item) => {
          Object.assign(item, data)
        })
      }
    },
  },
}
</script>

<style>
</style>
