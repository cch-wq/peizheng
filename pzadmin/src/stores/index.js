import { defineStore } from "pinia";
import { ref } from 'vue'
function initState() {
    return {
        isCollapse: false,
        tags: []
    }
}
export const useMenuStore = defineStore('menu', () => {
    const state = ref(initState());
    function addMenu(val) {
       if( state.value.tags.findIndex(item => item.meta.name === val.meta.name) ===-1){
        state.value.tags.push(val)
       }
    }
  function closeMenu(item){
    const index = state.value.tags.findIndex(val => val.name === item.name)
   
    
    state.value.tags.splice(index, 1)
  }
    return {
        state, addMenu,closeMenu
    }
})