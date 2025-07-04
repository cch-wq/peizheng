<template>
    <div class="common-header">
        <div class="header-left">
            <el-icon :size="20" class="icon" @click="handlemenu()">
                <Grid />
            </el-icon>
            <ul class="tab-ul">
                <li v-for="item in tags" :key="item.meta.name" class="tab-li">
                    <el-icon :size="13">
                        <component :is="item.meta.icon" />
                    </el-icon>
                  <router-link :to="{path:item.meta.path}" class="text">  {{ item.meta.name }}</router-link>
                    <el-icon :size="13" class="close-icon">
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

const store = useMenuStore()
const handlemenu = () => { store.state.isCollapse = !store.state.isCollapse }
const tags = computed(() => store.state.tags)
console.log(tags)

</script>


<style lang="less" scoped>
.common-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: hwb(0 91% 5%);
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
            background-color: #e2c3c3;
            cursor: pointer;
        }

        .tab-ul {
            display: flex;
            align-items: center;
            height: 100%;
            gap: 20px;
            .text{
                
            }
             .close-icon{
                visibility: hidden;
             }
             .close-icon:hover{
                visibility:inherit;
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