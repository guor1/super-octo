<!--
 * @Descripttion: 数据表格组件
 * @version: 1.6
 * @Author: sakuya
 * @Date: 2021年11月29日21:51:15
 * @LastEditors: sakuya
 * @LastEditTime: 2021年12月12日12:49:50
-->

<template>
  <div ref="scTableMain" v-loading="loading" class="scTable" :style="{'height':_height}">
    <div class="scTable-table">
      <el-table v-bind="$attrs" :key="toggleIndex" ref="scTable" :data="tableData" :row-key="rowKey" :height="height=='auto'?null:'100%'" :size="config.size" :border="config.border" :stripe="config.stripe" :summary-method="remoteSummary?remoteSummaryMethod:summaryMethod" @sort-change="sortChange" @filter-change="filterChange">
        <slot />
        <template v-for="(item, index) in userColumn" :key="index">
          <el-table-column v-if="!item.hide" :column-key="item.prop" :label="item.label" :prop="item.prop" :width="item.width" :sortable="item.sortable" :fixed="item.fixed" :filters="item.filters" :filter-method="remoteFilter||!item.filters?null:filterHandler" :show-overflow-tooltip="item.showOverflowTooltip">
            <template #default="scope">
              <slot :name="item.prop" v-bind="scope">
                {{ scope.row[item.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
        <el-table-column min-width="1" />
        <template #empty>
          <el-empty :description="emptyText" :image-size="100" />
        </template>
      </el-table>
    </div>
    <div v-if="!hidePagination&&!hideDo" class="scTable-page">
      <div class="scTable-pagination">
        <el-pagination v-if="!hidePagination" v-model:currentPage="currentPage" background :small="true" :layout="paginationLayout" :total="total" :page-size="pageSize" @current-change="paginationChange" />
      </div>
      <div v-if="!hideDo" class="scTable-do">
        <ep-button v-if="!hideRefresh" icon="ep:refresh" circle style="margin-left:15px" @click="refresh" />
        <el-popover v-if="column" placement="top" title="列设置" :width="500" trigger="click" :hide-after="0" @show="customColumnShow=true" @after-leave="customColumnShow=false">
          <template #reference>
            <ep-button icon="ep:set-up" circle style="margin-left:15px" />
          </template>
          <columnSetting v-if="customColumnShow" ref="columnSetting" :column="userColumn" @user-change="columnSettingChange" @save="columnSettingSave" @back="columnSettingBack" />
        </el-popover>
        <el-popover v-if="!hideSetting" placement="top" title="表格设置" :width="400" trigger="click" :hide-after="0">
          <template #reference>
            <ep-button icon="ep:setting" circle style="margin-left:15px" />
          </template>
          <el-form label-width="80px" label-position="left">
            <el-form-item label="表格尺寸">
              <el-radio-group v-model="config.size" size="mini" @change="configSizeChange">
                <el-radio-button label="large">大</el-radio-button>
                <el-radio-button label="medium">中</el-radio-button>
                <el-radio-button label="small">正常</el-radio-button>
                <el-radio-button label="mini">小</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="样式">
              <el-checkbox v-model="config.border" label="纵向边框" />
              <el-checkbox v-model="config.stripe" label="斑马纹" />
            </el-form-item>
          </el-form>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import columnSetting from './columnSetting.vue'
import config from '~/config/table'

export default {
  name: 'ScTable',
  components: {
    columnSetting,
  },
  props: {
    tableName: { type: String, default: '' },
    apiObj: { type: Object, default: () => {} },
    params: { type: Object, default: () => ({}) },
    data: { type: Object, default: () => {} },
    height: { type: [String, Number], default: '100%' },
    size: { type: String, default: 'small' },
    border: { type: Boolean, default: false },
    stripe: { type: Boolean, default: false },
    pageSize: { type: Number, default: config.pageSize },
    rowKey: { type: String, default: '' },
    summaryMethod: { type: Function, default: null },
    column: { type: Object, default: () => {} },
    remoteSort: { type: Boolean, default: false },
    remoteFilter: { type: Boolean, default: false },
    remoteSummary: { type: Boolean, default: false },
    hidePagination: { type: Boolean, default: false },
    hideDo: { type: Boolean, default: false },
    hideRefresh: { type: Boolean, default: false },
    hideSetting: { type: Boolean, default: false },
    paginationLayout: { type: String, default: 'total, prev, pager, next, jumper' },
  },
  data () {
    return {
      isActivat: true,
      emptyText: '暂无数据',
      toggleIndex: 0,
      tableData: [],
      total: 0,
      currentPage: 1,
      prop: null,
      order: null,
      loading: false,
      tableHeight: '100%',
      tableParams: this.params,
      userColumn: [],
      customColumnShow: false,
      summary: {},
      config: {
        size: this.size,
        border: this.border,
        stripe: this.stripe,
      },
    }
  },
  computed: {
    _height () {
      return Number(this.height) ? `${Number(this.height)}px` : this.height
    },
  },
  watch: {
    // 监听从props里拿到值了
    data () {
      this.tableData = this.data
      this.total = this.tableData.length
    },
    apiObj () {
      this.tableParams = this.params
      this.refresh()
    },
  },
  mounted () {
    // 判断是否开启自定义列
    if (this.column)
      this.getCustomColumn()

    else
      this.userColumn = this.column

    // 判断是否静态数据
    if (this.apiObj) {
      this.getData()
    }
    else if (this.data) {
      this.tableData = this.data
      this.total = this.tableData.length
    }
  },
  activated () {
    if (!this.isActivat)
      this.$refs.scTable.doLayout()
  },
  deactivated () {
    this.isActivat = false
  },
  methods: {
    // 获取列
    async getCustomColumn () {
      const userColumn = await config.columnSettingGet(this.tableName, this.column)
      this.userColumn = userColumn
    },
    // 获取数据
    async getData () {
      this.loading = true
      const reqData = {
        [config.request.page]: this.currentPage,
        [config.request.pageSize]: this.pageSize,
        [config.request.prop]: this.prop,
        [config.request.order]: this.order,
      }
      if (this.hidePagination) {
        delete reqData[config.request.page]
        delete reqData[config.request.pageSize]
      }
      Object.assign(reqData, this.tableParams)

      try {
        var res = await this.apiObj.get(reqData)
      }
      catch (error) {
        this.loading = false
        this.emptyText = error.statusText
        return false
      }
      try {
        var response = config.parseData(res)
      }
      catch (error) {
        this.loading = false
        this.emptyText = '数据格式错误'
        return false
      }
      if (response.code != config.successCode) {
        this.loading = false
        this.emptyText = response.msg
      }
      else {
        this.emptyText = '暂无数据'
        if (this.hidePagination)
          this.tableData = response.data || []

        else
          this.tableData = response.rows || []

        this.total = response.total || 0
        this.summary = response.summary || {}
        this.loading = false
      }
      this.$refs.scTable.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
      this.$emit('dataChange', res, this.tableData)
    },
    // 分页点击
    paginationChange () {
      this.getData()
    },
    // 刷新数据
    refresh () {
      this.$refs.scTable.clearSelection()
      this.getData()
    },
    // 更新数据 合并上一次params
    upData (params, page = 1) {
      this.currentPage = page
      this.$refs.scTable.clearSelection()
      Object.assign(this.tableParams, params || {})
      this.getData()
    },
    // 重载数据 替换params
    reload (params, page = 1) {
      this.currentPage = page
      this.tableParams = params || {}
      this.$refs.scTable.clearSelection()
      this.$refs.scTable.clearSort()
      this.$refs.scTable.clearFilter()
      this.getData()
    },
    // 自定义变化事件
    columnSettingChange (userColumn) {
      this.userColumn = userColumn
      this.toggleIndex += 1
    },
    // 自定义列保存
    async columnSettingSave (userColumn) {
      this.$refs.columnSetting.isSave = true
      try {
        await config.columnSettingSave(this.tableName, userColumn)
      }
      catch (error) {
        this.$message.error('保存失败')
        this.$refs.columnSetting.isSave = false
      }
      this.$message.success('保存成功')
      this.$refs.columnSetting.isSave = false
    },
    // 自定义列重置
    async columnSettingBack () {
      this.$refs.columnSetting.isSave = true
      try {
        const column = await config.columnSettingReset(this.tableName, this.column)
        this.userColumn = column
        this.$refs.columnSetting.usercolumn = JSON.parse(JSON.stringify(this.userColumn || []))
      }
      catch (error) {
        this.$message.error('重置失败')
        this.$refs.columnSetting.isSave = false
      }
      this.$refs.columnSetting.isSave = false
    },
    // 排序事件
    sortChange (obj) {
      if (!this.remoteSort)
        return false

      if (obj.column && obj.prop) {
        this.prop = obj.prop
        this.order = obj.order
      }
      else {
        this.prop = null
        this.order = null
      }
      this.getData()
    },
    // 本地过滤
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    // 过滤事件
    filterChange (filters) {
      if (!this.remoteFilter)
        return false

      Object.keys(filters).forEach((key) => {
        filters[key] = filters[key].join(',')
      })
      this.upData(filters)
    },
    // 远程合计行处理
    remoteSummaryMethod (param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = this.summary[column.property]
        if (values)
          sums[index] = values

        else
          sums[index] = ''
      })
      return sums
    },
    configSizeChange () {
      this.$refs.scTable.doLayout()
    },
    // 原生方法转发
    clearSelection () {
      this.$refs.scTable.clearSelection()
    },
    toggleRowSelection (row, selected) {
      this.$refs.scTable.toggleRowSelection(row, selected)
    },
    toggleAllSelection () {
      this.$refs.scTable.toggleAllSelection()
    },
    toggleRowExpansion (row, expanded) {
      this.$refs.scTable.toggleRowExpansion(row, expanded)
    },
    setCurrentRow (row) {
      this.$refs.scTable.setCurrentRow(row)
    },
    clearSort () {
      this.$refs.scTable.clearSort()
    },
    clearFilter (columnKey) {
      this.$refs.scTable.clearFilter(columnKey)
    },
    doLayout () {
      this.$refs.scTable.doLayout()
    },
    sort (prop, order) {
      this.$refs.scTable.sort(prop, order)
    },
  },
}
</script>

<style scoped>
.scTable-table {height: calc(100% - 50px);}
.scTable-page {height:50px;display: flex;align-items: center;justify-content: space-between;padding:0 15px;}
.scTable-do {white-space: nowrap;}
.scTable:deep(.el-table__footer) .cell {font-weight: bold;}
</style>
