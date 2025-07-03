
<template>
  <div class="common-layout">
    <el-container>
            <CommonAside/>
      <el-container class="common-right">
        <el-header>
          <common-header/>
        </el-header>
        <el-main>
           <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue';
import CommonHeader from '../components/CommonHeader.vue';
</script>

<style lang="less" scoped>
.common-layout{
    height: 100%;
    .el-container{
        height: 100%;
    }
}


</style>