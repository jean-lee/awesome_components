<script>
/* COMPONENT DOCUMENT
 * author: jean-lee
 * date: 2019/11/06
 * desc: 可增删改移树示例
 */

import { TREE_DATA } from '@/constant/tree_data.ts';

export default {
  name: 'tree-conf',
  data() {
    return {
      treeData: TREE_DATA,
      add_question_flag: false,
      new_question_name: '',
      tree_key: 0,
      defaultExpand: []
    }
  },
  methods: {
    // 添加新大题
    add_new_question() {
      this.add_question_flag = true
    },

    // 新增 结果确认
    add_question_sure() {
      const nodeObj = {
        id: '',
        label: this.new_question_name,
        isEdit: false,
        children: []
      }

      this.treeData.push(nodeObj)
      this.add_question_flag = false;
      this.new_question_name = '';
    },

    // 新增 取消
    add_question_cancel() {
      this.add_question_flag = false;
      this.new_question_name = '';
    },

    // 试题名称更新
    nodeEdit(ev, store, data) {
      data.isEdit = true;
      this.$nextTick(() => {
        const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input');

        !$input ? '' : $input.focus();
      })
    },

    // 编辑结果确定
    edit_sure(ev, data) {
      const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input');

      if (!$input) {
        return false;
      } else {
        data.label = $input.value;
        data.isEdit = false;
      }
    },

    // 节点删除
    nodeDelete(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    // 编辑
    showOrEdit(data) {
      if (data.isEdit) {
        return <input value={data.label} on-blur={ (ev) => this.edit_sure(ev, data)}/>;
      } else {
        return data.label;
      }
    },

    // 试卷结构树操作
    renderContent(h, {node, data, store}) {
      return (
        <div class='custom_tree_node'>
          <p class='tree_node_name'>
            { this.showOrEdit(data) }
          </p>
          <p class='tree_node_op'>
            <i class='el-icon-edit node_edit' on-click={ (ev) => this.nodeEdit(ev, store, data) }></i>
            <i class='el-icon-delete node_delete' on-click={ () => this.nodeDelete(node, data) }></i>
          </p>
        </div>
      );
    },
  },
};
</script>

<template>
<div class="module_tree_conf">
  <p class="header"><span class="title">试卷结构</span><span class="tip">（可以点击选中对应题目）</span></p>
  <p  class="add_new_question" @click="add_new_question"><i class="add_icon"></i>添加新大题</p>
  <el-row class="add_question" v-show="add_question_flag">
    <el-col :span="12">
      <el-input class="common_input_32" v-model="new_question_name" placeholder="请输入大题名称"></el-input>
    </el-col>

    <el-col :span="12">
      <el-button class="common_btn_32 btn_sure" :disabled="new_question_name.trim() === ''" @click.stop="add_question_sure">确定</el-button>
      <el-button class="common_btn_32 btn_cancel" @click.stop="add_question_cancel">取消</el-button>
    </el-col>
  </el-row>

  <el-tree ref="tree" class="my_tree" :data="treeData" :key="tree_key" node-key="id" :expand-on-click-node="false"
    :default-expanded-keys="defaultExpand" :render-content="renderContent" draggable/>

</div>
</template>

<style lang="stylus" scoped>
@import '~@/assets/styles/var.styl'
@import '~@/assets/styles/_custom_element_ui.styl'

.module_tree_conf
  margin 110px auto
  padding 20px 30px
  width 365px
  background $white_color
  .header
    height 32px
    .title
      font-size $big_title_size
      color $black_font_color
    .tip
      color $grey_font_color
  .add_new_question
    margin-left 12px
    height 48px
    line-height 48px
    font-size $small_title_size
    background $white_font_color
    color $main_color
    cursor pointer
    border_1px(#eee, false, false, true, false)
    .add_icon
      margin-right 10px
      display inline-block
      width 16px
      height 16px
      background url('~@/assets/images/add.png')
      vertical-align middle
  .add_question
    margin-left 12px
    margin-top 12px
    .btn_sure
      color $white_color
      background $main_color
      margin-left 10px
    .btn_cancel
      color $main_color!important
      background $white_color
      border_1px($main_color)


</style>
