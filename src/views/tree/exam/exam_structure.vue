<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2019/11/06
 * desc: 试卷结构展示
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import StructureEditHeader from './structure_edit_header.vue';
import StructureItem from './structure_item.vue';

@Component({
  name: 'exam-structure',
  components: {
    'structure-edit-header': StructureEditHeader,
    'structure-item': StructureItem,
  },
})
export default class ExamStructure extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({ type: Array, default: () => [] }) private questions!: any;
  @Prop({ type: Array, default: () => []}) private ids!: number[];

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private  collapse_arr: any = [];
  private add_question_flag: boolean = false;
  private new_question_name: string = '';

  // 名称已存在
  get name_is_exist() {
    const name_arr = this.questions.map((i: any) => i.typename);
    const new_name = this.new_question_name.trim();

    return name_arr.includes(new_name);
  }
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  // 根据传入的题型数据，生成每个大题 input 的显示 flag
  private create_edit_show_dat () {
    this.big_qs_input_show = this.questions.reduce((obj: any, big_qs: any) => {
      obj[big_qs.typename] = false

      return obj;
    }, {});
  }
  private add_question_sure() {
    this.add_question_flag = false;
    this.$store.dispatch('add_big_question_to_storage', this.new_question_name.trim());
    this.new_question_name = '';
  }
  private add_question_cancel() {
    this.add_question_flag = false;
    this.new_question_name = '';
  }
}

</script>

<template>
<div class="module_exam_structure">
  <div class="structure_title">
    <h3 class="title" @click.stop="$emit('all-know')">试卷结构</h3>
    <!-- <span class="warm_prompt">（可以点击选中对应题目）</span> -->
    <el-button type="primary" size="small" class="add_new_question" @click.stop="add_question_flag = true">
      <i></i>添加新大题
    </el-button>
  </div>

  <div class="structure_content">
    <el-collapse v-model="collapse_arr" v-if="questions && questions.length">
      <el-collapse-item ref="collapse" v-for="(big_qs, index) in questions"
        :key="big_qs.typename" :name="big_qs.typename">
        <template slot="title">
          <structure-edit-header :data="big_qs" :questions-name-arr="questions.map(i => i.typename)"
            @move="collapse_arr = []" />
        </template>
       <ul>
         <structure-item v-for="(qs, i) in big_qs.questions || []" :key="qs.id"
          :data="qs" :ids="ids" :bigindex="index" :biglen="questions.length"
          :no="ids.findIndex(id => id === qs.id) + 1" />
       </ul>
      </el-collapse-item>
    </el-collapse>

    <el-row class="add_question" v-show="add_question_flag">
      <el-col :span="12">
        <el-input class="name_input" v-model="new_question_name" size="small"
          placeholder="请输入大题名称" :maxlength="30" autofocus></el-input>
        <span v-if="name_is_exist" class="title_tips">大题名称已经存在</span>
      </el-col>
      <el-col :span="12">
        <el-button size="mini" type="primary" :disabled="name_is_exist || !new_question_name.trim().length"
          @click.stop="add_question_sure">确定</el-button>
        <el-button size="mini"
          @click.stop="add_question_cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<style scoped lang="stylus">
// @import '~@/assets/stylus/var'
// @import '~@/assets/stylus/mixin'

.module_exam_structure
  .structure_title
    margin-top 30px
    height 120px
    border-bottom 1px solid $light_grey_color
  .title
    margin-top 30px
    display inline-block
    font-size $normal_title_size
    color $black_font_color
    font-weight 700
    cursor pointer
  .add_new_question
    display block
    margin-top 20px
    color $main_color
    background $white_color
    border none
    font-size $normal_font_size
    &.add_new_question i
      display inline-block
      margin-right 10px
      width 16px
      height 18px
      // background url('~@/assets/images/questions/icon_add_active.png') no-repeat
      vertical-align middle
  .question_item
    cursor pointer
    padding-left 30px
    height 30px
    line-height 30px
  .add_question
    margin-top 20px
    .el-button
      margin-left 16px
      width 60px
      height 32px
      vertical-align middle

</style>
