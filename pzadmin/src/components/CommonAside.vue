<template>
  <el-aside class="tac" :width="width">
    <el-menu   background-color="#545c64"  :default-active="active"
    text-color="#fff" active-text-color="red" :collapse="isCollapse" :collapse-transition="false">
      <h5 class="mb-2" v-show="!isCollapse">DIDI陪诊</h5>
      <h5 class="mb-2" v-show="isCollapse">DIDI</h5>
      <TreeMenu :menuData="menuData" :index="1" />
    </el-menu>
  </el-aside>
</template>
<script setup>
import TreeMenu from './TreeMenu.vue';
import {  useRouter } from 'vue-router';
import { computed, reactive, ref } from 'vue';
import { useMenuStore } from '../stores';
import { watch } from 'vue';
const router = useRouter()

const menuData = reactive(router.options.routes[0].children)
console.log(router)
console.log(menuData)
const active =ref(router.path)
watch(()=>router.path,(newPath)=>{
  active.value =newPath
})
const store = useMenuStore()
const isCollapse = computed(() => store.state.isCollapse)
const width = computed(() => store.state.isCollapse ? '64px' : '180px')

</script>
<style lang="less" scoped>
.tac {
  height: 100%;
  background: #545c64;
  .mb-2 {
    line-height: 50px;
    text-align: center;
    color: #fff
  }
}
</style>