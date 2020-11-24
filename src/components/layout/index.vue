<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2019/11/07
 * desc: 布局
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';


@Component({
  name: 'layout',
})
export default class Layout extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private activeIndex = '1';
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private handleSelect(key: string, keyPath: string) {
    console.log(key, keyPath);
  }
}

</script>

<template>
<div class="module_layout">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">处理中心</el-menu-item>
  </el-menu>

</div>
</template>

<style lang="stylus" scoped>

.module_index
  pass

</style>
