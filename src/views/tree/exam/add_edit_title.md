<script lang="ts">
/* COMPONENT DOCUMENT
 * author: jean-lee
 * date: 2019/11/06
 * desc: 新增编辑标题
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { ElInput } from 'element-ui/types/input';


@Component({
  name: 'add-edit-title',
})
export default class AddEditTitle extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({ type: Array, default: () => [] }) private questionsNameArr!: any;
  @Prop({ type: Object, default: () => {} }) private data!: object;

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private name_has_change: boolean = false;
  private show_input: boolean = false;
  private new_name: string = '';

  // 除自己以外的 name
  get other_name() {
    const my_name = this.typename || '';
    const my_index = this.questionsNameArr.indexOf(my_name);

    if (my_index === -1) {
      return this.questionsNameArr;
    }

    const new_arr = [...this.questionsNameArr];

    new_arr.splice(my_index, 1);

    return new_arr;
  }
  // 名称已存在
  get name_is_exist() {
    return this.other_name.includes(this.new_name.trim()) && this.name_has_change;
  }
  /* ------------------------ WATCH ------------------------ */
  @Watch('new_name') private new_name_change(val: any){
    this.name_has_change = true;
  }
  /* ------------------------ METHODS ------------------------ */
  // 修改某个大题 name (显示 input)
  private show_edit_this_name_input(typename: string) {
    this.new_name = typename || '';
    this.show_input = true;

    this.$nextTick(() => {
      const $input = this.$refs['name_input'] || {};

      ($input as ElInput).focus && ($input as ElInput).focus();
    });
  }
    // 修改某个大题 name (确定提交)
  private edit_this_name_sure(old_name: string) {
    if (this.name_is_exist) {
      return false;
    }
    const new_name = this.new_name;

    this.$store.dispatch('rename_big_question_of_storage', { old_name, new_name });
    this.new_name = '';
    this.show_input = false;
    this.name_has_change = false;
  }
  // 删除大题
  private delete_this_qs(name: string) {
    this.$alert('是否要删除这个大题!', '提示', { type: 'warning' })
      .then(() => {
        this.$store.dispatch('delete_big_question_of_storage', name);
      })
      .catch(() => {});

  }
  // 大题移动
  private move_qs(name: string, is_down = true) {
    this.$emit('move');
    this.$store.dispatch('move_big_question_of_storage', { name, is_down });
  }
}

</script>

<template>
<div class="module_add_edit_title">
  <div class="edit_title">
      <i :style="{opacity: data.questions && data.questions.length ? 1 : 0}" class="el-icon-caret-right"></i>
      <span class="name_text" v-if=" ! show_input" :title="data.typename">{{ data.typename }}</span>
      <input ref="name_input" @click.stop="() => {}" class="name_input" v-else type="text" v-model="new_name"
        @blur="edit_this_name_sure(data.typename)">
      <span class="danger_hint" v-show="name_is_exist">名称已存在</span>
      <span class="content_icon_wrapper">
        <i class="node_edit" @click.stop="show_edit_this_name_input(data.typename)"></i>
        <i class="node_delete" @click.stop="delete_this_qs(data.typename)"></i>
        <i v-if="questionsNameArr.indexOf(data.typename) !== 0" class="node_up"
          @click.stop="move_qs(data.typename, false)"></i>
        <i v-if="questionsNameArr.indexOf(data.typename) !== (questionsNameArr.length - 1)" class="node_down"
          @click.stop="move_qs(data.typename, true)"></i>
      </span>
    </div>
</div>
</template>

<style lang="stylus" scoped>

.module_add_edit_title
  pass

</style>
