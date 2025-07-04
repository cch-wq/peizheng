

import { createRouter, createWebHashHistory } from "vue-router";
import Layout from '../views/Main.vue'
import Login from '../views/login.vue'
import Admin from '../views/auth/admin/index.vue'
import Group from '../views/auth/group/index.vue'
import Dashboard from '../views/dashboard/index.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    name: 'main',
    children: [
      {
        path: 'dashboard',
        meta: { id: '1', name: '控制台', icon: 'Platform', path: '/dashboard', describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据' },
        component: Dashboard
      },
      {
        path: 'auth',
        meta: { id: '2', name: '权限管理', icon: 'Grid' },
        children: [
          {
            path: '',
            alias: ['admin'],
            meta: { id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/admin', describe: '管理员可以进行编辑，权限修改后需要登出才会生效' },
            component: Admin
          },
          {
            path: 'group',
            meta: { id: '2', name: '菜单管理', icon: 'Menu', path: '/auth/group', describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取' },
            component: Group
          }
        ]
      }
    ]
  },
  {
    path: '/Login',
    component: Login
  },

]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
export default router