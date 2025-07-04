<template>
    <div class="common-header">
        <div class="header-left">
            <el-icon :size="20" class="icon" @click="handlemenu()">
                <Grid />
            </el-icon>
            <ul class="tab-ul">
                <li v-for="item in tags" :key="item.meta.name" :class="{ selected : route.meta.path === item.meta.path}" class="tab-li">
                    <el-icon :size="13">
                        <component :is="item.meta.icon" />
                    </el-icon>
                    <router-link :to="{ path: item.meta.path }" class="text"> {{ item.meta.name }}</router-link>
                    <el-icon :size="13" class="close-icon" @click="closeTab(item)">
                        <Close />
                    </el-icon>
                </li>
            </ul>
        </div>
        <div class="header-right">
            <el-dropdown>
                <div class="el-dropdown-link">
                    <el-avatar src="../assets/vue.svg" />
                    <p class="username">admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { Close, Grid } from '@element-plus/icons-vue';
import { useMenuStore } from '../stores';
import { computed } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const route =useRoute()
const router =useRouter()
const store = useMenuStore()
const handlemenu = () => { store.state.isCollapse = !store.state.isCollapse }
const tags = computed(() => store.state.tags)
console.log(tags)
const closeTab=(item)=>{
    store.closeMenu(item)
    if(item.path != route.path){
        return
    }
    const tagsData =tags.value
    //删除的为最后一个
    if( index===tagsData.length){
        //tagsDats不存在，即删除的为最后一个tag
        if(!tagsData.length){
            router.push({path:"/dashboard"})
        }else{
            //
            router.push({path:tagsData[index-1].path})
        }
    }else{
        router.push({path:tagsData[index].meta.path})
    }
  
}

</script>


<style lang="less" scoped>
.common-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: hwb(177 49% 27%);
    height: 100%;
    padding-right: 5px;

    .header-left {
        height: 100%;
        display: flex;
        align-items: center;
        .icon {
            width: 45px;
            height: 100%;
            margin-right: 5px;
        }
        .icon:hover {
            background-color: #e9f4bf;
            cursor: pointer;
        }
        .tab-ul {
            display: flex;
           align-items: center;
            height: 100%; 
          .tab-li{
           display: flex;
           align-items: center;
            height: 100%; 
            padding: 0 10px;
            margin: 0 auto;
            justify-content: space-between;
         &.selected{
            a{
                color: #56a761;
            }
            i{color:  #31a415 ;}
            background-color:  #fff;
        }
              .text {
                margin: 0 5px;
                color: #333;
    font-size: 15px;
            }
            .close-icon {
                visibility: hidden;
            }
       
          }
            .tab-li:hover {
                background-color: #bedbd3;
                .close-icon {
                    visibility: inherit;
                }
            }
        }

    }

    .header-right {
        margin-right: 10px;

        .el-dropdown-link {
            display: flex;
            align-items: center;

            .username {
                margin-left: 10px;
            }
        }
    }
}
</style>