<script lang="ts">
/* COMPONENT DOCUMENT
 * author:jean-lee
 * date: 2019/11/06
 * desc: el-tree 树节点增删改移
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
// import * as tsx from 'vue-tsx-support';
// import { Component as tsc } from 'vue-tsx-support';

import { TREE_DATA } from '@/constant/tree_data.ts';
@Component({
  name: 'tree-configurable',
  // mixins: [mixModel],
})
export default class TreeConfigurable extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private add_question_flag: boolean = false;
  private new_question_name: string = '';
  private tree_key = 0;
  private treeData: AC.TreeNodeCfgaType[] = TREE_DATA;
  private defaultExpand: any = [];
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
   // 添加新大题
  private add_new_question() {
    this.add_question_flag = true;
  }
  // 确定添加新大题
  private add_question_sure() {
    const nodeObj: AC.TreeNodeCfgaType = {id: -1, label: this.new_question_name, isEdit: false, children: []}

    this.treeData.push(nodeObj);
    this.add_question_flag = false;
  }

  private add_question_cancel() {
    this.add_question_flag = false;
    this.new_question_name = '';
  }
  // 试题名称更新
  private nodeEdit(ev: any, store: any, data: any) {

    data.isEdit = true;
    this.$nextTick(() => {
      const $input = ev.target.parentNode.parentNode.querySelector('input')
        || ev.target.parentElement.parentElement.querySelector('input')

      !$input ? '' : $input.focus();

    });

  }

  // 编辑名称
  private edit_sure(ev: any, data: any) {
    const $input = ev.target.parentNode.parentNode.querySelector('input')
      || ev.target.parentElement.parentElement.querySelector('input');

    if (!$input) {
      return false;
    } else {
      data.label = $input.value;
      data.isEdit = false;
    }
  }

  // 节点删除
  private nodeDelete(node: any, data: any) {
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const index = children.findIndex((d: any) => d.id === data.id);

    children.splice(index, 1);
  }

  // 节点上移
  private nodeUp(node: any, data: any) {
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const cIndex = children.findIndex((d: any) => d.id === data.id);

    if (parent.level === 0 && cIndex === 0) {
      return;

    } else if (parent.level !== 0 && cIndex === 0) { // 不同父节点中移动

      const parent2: any = parent.parent;
      const children2: any = parent2.data.children || parent2.data;
      const pIndex2: number = parseInt(children2.findIndex((p: any) => p.id === parent.data.id), 10) - 1;



      if (pIndex2 < 0) {
        return;
      }

      children2[pIndex2].children.push(data);
      children.splice(cIndex, 1);
      this.defaultExpand[0] = children2[pIndex2].id;

    } else if ((parent.level === 0 && cIndex !== 0) || (parent.level !== 0 && cIndex !== 0)) {
      const tempChildrenNodex1 = children[cIndex - 1];
      const tempChildrenNodex2 = children[cIndex];

      this.$set(children, cIndex - 1, tempChildrenNodex2);
      this.$set(children, cIndex, tempChildrenNodex1);
      this.defaultExpand[0] = data.id;

    }

    this.tree_key++;
  }

  // 节点下移

  private nodeDown(store: any, node: any, data: any) {
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const cIndex = children.findIndex((d: any) => d.id === data.id);
    const cLength = children.length - 1; // 最边上的节点
    const allLevel = store.data.length - 1; // 树的深度

    if (parent.level === allLevel && cIndex === cLength) { // 最最末的节点
      return;
    } else if (parent.level !== allLevel && cIndex === cLength) { // 父节点不同

      const parent2 = parent.parent;
      const children2 = parent2.data.children || parent2.data;
      const pIndex2 = parseInt((children2.findIndex(p => p.id === parent.data.id)), 10);

      if (pIndex2 === allLevel) {
        return;
      }

      children2[pIndex2 + 1].children.push(data);
      children.splice(cIndex, 1);
      this.defaultExpand[0] = children2[pIndex2 + 1].id;
    } else if ((parent.level === allLevel && cIndex !== cLength)
       || (parent.level !== allLevel && cIndex !== cLength)) { // 父节点相同

      const tempChildrenNodex1 = children[cIndex + 1];
      const tempChildrenNodex2 = children[cIndex];

      this.$set(children, cIndex + 1, tempChildrenNodex2);
      this.$set(children, cIndex, tempChildrenNodex1);
      this.defaultExpand[0] = data.id;
    }

    this.tree_key++;

  }
  // private showOrEdit(data: any) {
  //   if (data.isEdit) {
  //     return (<input type="text" value={data.label} on-blur={ev => this.edit_sure(ev, data)}/>)
  //   } else {
  //     return (<span className="node_labe">{data.label}</span>)
  //   }
  // }
  // // 标题获取焦点后可操作性项展示
  // // 试卷结构树操作group node,
  // // private renderContent(h: any, {node, data, store}: any) {
  // private render(h: any, {node, data, store}: any): VNode {

  //   return (
  //     <div>
  //       <span>
  //         { this.showOrEdit(data) }
  //       </span>
  //       <div class="tree_node_op">
  //         <i class="node_edit" on-click={ (ev) => this.nodeEdit(ev, store, data) }></i>
  //         <i class="node_delete" on-click={ () => this.nodeDelete(node, data) }></i>
  //         <i class="node_up" on-click={ () => this.nodeUp(node, data) }></i>
  //         <i class="node_down" on-click={ () => this.nodeDown(store, node, data) }></i>
  //       </div>
  //     </div>
  //   )
  // }

}

</script>

<template>
<div class="module_tree_configurable">
  <div class="exam_structure">
    <h3 class="title">试卷结构</h3><span class="tip">（可以点击选中对应题目）</span>
    <el-button type="primary" size="small" class="add_new_question" @click="add_new_question"><i></i>添加新大题</el-button>
  </div>

  <div class="question_info_lists">
    <!-- 试卷树 -->
    <el-tree ref="tree" :key="tree_key" node-key="id" :expand-on-click-node="false"
      :data="treeData" :default-expanded-keys="defaultExpand"></el-tree>

    <!-- 新增大题 -->
    <el-row class="add_question" v-show="add_question_flag">
      <el-col :span="12">
        <el-input v-model="new_question_name" placeholder="请输入大题名称"/>
      </el-col>
      <el-col :span="12">
        <el-button size="mini" class="btn_sure" @click.stop="add_question_sure">确定</el-button>
        <el-button size="mini" class="btn_cancel" @click.stop="add_question_cancel">取消</el-button>
      </el-col>
    </el-row>
    
  </div>

    <!-- <el-tree ref="tree" :data="treeData" :key="tree_key" node-key="id" :expand-on-click-node="false"
     :default-expanded-keys="defaultExpand">
      <div class="custom_tree_node" slot-scope="{ node, data }">
        <el-input class="edit_name common_input_32" :value="data.label" @blur="edit_sure($event, data)"/>
        <p class="tree_node_op">
          <i class="el-icon-edit node_edit" @click="nodeEdit($event, data)"></i>
          <i class="el-icon-delete node_delete" @click="nodeDelete(node, data)"></i>
          <i class="el-icon-top node_up" @click="nodeUp(node, data)"></i>
          <i class="el-icon-bottom node_down" @click="nodeDown(node, data)"></i>
        </p>
      </div>
     </el-tree> -->
</div>
</template>

<style lang="stylus" scoped>

.module_tree_configurable
  pass

</style>
