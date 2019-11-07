<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2019/11/06
 * desc: 试卷标题
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { ElInput } from 'element-ui/types/input';


@Component({
  name: 'exam-title',
})
export default class ExamTitle extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({ type: String, default: ''}) private title!: string;
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private exam_title: string = '';
  private input_focus: boolean = false; // 试卷名称展示状态

  /* ------------------------ WATCH ------------------------ */
    @Watch('title') private title_change(val: string) {
      if ( ! val && ! val.length) {
        return false;
      }
      this.exam_title = val || '';
    }
    @Watch('input_focus') private input_focus_change(val: string) {
      if ( ! val) {
        return false;
      }

      this.$nextTick(() => {
        const $input = this.$el.querySelector('input') || {};

        ($input as ElInput).focus && ($input as ElInput).focus();
      });
    }
  /* ------------------------ METHODS ------------------------ */
  private change_val() {
    this.input_focus = false;
    this.$store.dispatch('set_exam_title', this.exam_title.trim());
  }
}

</script>

<template>
<div class="module_exam_title">
  <el-input ref="name_input" v-if="input_focus" placeholder="请输入试卷名称" class="no_name" autofocus v-model="exam_title"
    @blur="change_val"
    @keyup.enter.native="change_val" />

  <div v-else class="show_name">
    <h3 class="name" v-if="title.length">{{ title }}</h3>
    <p class="title_edit" @click.stop="input_focus = true"><i></i>编辑试卷名称</p>
  </div>
</div>
</template>

<style lang="stylus" scoped>

.module_exam_title
  .exampreview_title
  padding-left 20px
  width 600px
  height 40px
  margin-bottom 33px
  .show_name
    .name
      display inline-block
      font-size $big_title_size
      color $black_font_color
      margin-right 10px
      width 400px
      text_overflow()
    .title_edit
      display inline-block
      width 120px
      height 20px
      font-size $normal_font_size
      color $grey_font_color
      cursor pointer
      vertical-align middle
      i
        display inline-block
        margin 0 3px
        width 16px
        height 19px
        // background url('~@/assets/images/questions/icon_edit.png') no-repeat
        vertical-align middle
      &.title_edit:hover
        color $main_color
      &.title_edit:hover i
        // background url('~@/assets/images/questions/icon_edit_active.png') no-repeat
  .el-input
    width 300px

</style>
