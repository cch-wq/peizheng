<template>
<div class="">
<h1>账号管理</h1></div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { authAdmin } from '../../../api';

const paginationData =reactive({
    pageNum:1,
    pageSize:10
})
onMounted(()=>{
    authAdmin(paginationData).then(({data})=>{
        console.log()
    })
})

</script>

<style>

</style>