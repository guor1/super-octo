<template>
  <promoter v-if="nodeConfig.type==0" v-model="nodeConfig" />

  <approver v-if="nodeConfig.type==1" v-model="nodeConfig" />

  <send v-if="nodeConfig.type==2" v-model="nodeConfig" />

  <branch v-if="nodeConfig.type==4" v-model="nodeConfig">
    <template #default="slot">
      <node-wrap v-if="slot.node" v-model="slot.node.childNode" />
    </template>
  </branch>

  <node-wrap v-if="nodeConfig.childNode" v-model="nodeConfig.childNode" />
</template>

<script>
import approver from './nodes/approver.vue'
import promoter from './nodes/promoter.vue'
import branch from './nodes/branch.vue'
import send from './nodes/send.vue'

export default {
  components: {
    approver,
    promoter,
    branch,
    send,
  },
  props: {
    modelValue: { type: Object, default: () => {} },
  },
  emits: ['update:modelValue'],
  data () {
    return {
      nodeConfig: {},
    }
  },
  watch: {
    modelValue (val) {
      this.nodeConfig = val
    },
    nodeConfig (val) {
      this.$emit('update:modelValue', val)
    },
  },
  mounted () {
    this.nodeConfig = this.modelValue
  },
  methods: {

  },
}
</script>

<style>
</style>
