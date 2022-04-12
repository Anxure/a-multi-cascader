<template>
  <div style="width:100%;height:100%;">
    <a-select
      style="width:100%"
      v-model="selectedLabels"
      mode="multiple"
      :dropdownClassName="innerPopperClass"
      @change="changeLabel"
      v-bind="$attrs"
      @blur="handleBlur"
      @dropdownVisibleChange="visibleChange"
      @focus="handleFocus"
      @clear="handleClear"
      @deselect="deselect"
      :maxTagCount="maxTagCount"
      allowClear
    >
      <span slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </span>
      <template v-if="!isSearching">
        <a-select-option value="__root">
          <div class="ground" @click.stop>
            <render-list
              :only-last="onlyLast"
              :list="root.childNodes"
              :level="1"
              :active-list="activeList"
              @handle-click="handleClick"
              @handle-check="handleCheck"
              :label-key="labelKey"
              :expand-trigger="expandTrigger"
            ></render-list>
            <template v-for="item in maxLevellist">
              <div
                :class="`floor-item floor-position-left-${item.id + 1}`"
                :key="item.id"
                v-if="item.rendered"
                v-show="activeList.length >= item.id"
              >
                <render-list
                  :only-last="onlyLast"
                  :list="showData[item.id]"
                  :level="item.id + 1"
                  :active-list="activeList"
                  @handle-click="handleClick"
                  @handle-check="handleCheck"
                  :label-key="labelKey"
                  :expand-trigger="expandTrigger"
                ></render-list>
              </div>
            </template>
          </div>
        </a-select-option>
      </template>
      <template v-if="isSearching">
        <a-select-option
          v-for="item in searchResult"
          :value="item.showLabel"
          :key="getKey(item)"
        >
          <div style="width:100%;height:100%" @click.stop="selectOne(item)">
            {{item.totalLabel}}
          </div>
        </a-select-option>
      </template>
    </a-select>
  </div>
</template>

<script>
import TreeStore from './lib/tree.js'
import renderList from './RenderList.vue'
// eslint-disable-next-line no-unused-vars
import { _findByObj } from './tool/unit'
export default {
  name: 'el-cascader-multi',
  components: {
    renderList
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    separator: {
      type: String,
      default: '-'
    },
    popperClass: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    expandTrigger: {
      type: String,
      default: 'click'
    },
    onlyLast: {
      type: Boolean,
      default: false
    },
    isTwoDimensionValue: {
      type: Boolean,
      default: true
    },
    showLeafLabel: {
      type: Boolean,
      default: false
    },
    maxTagCount: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      selectedLabels: [],
      selectedIds: [],
      selectedNodes: [],
      activeClass: 'floor-width-1',
      store: {},
      root: [],
      maxLevellist: [],
      showData: {},
      activeList: [],
      searchText: '',
      searchResult: []
    }
  },
  computed: {
    isSearching () {
      return !(this.searchText.trim() === '')
    },
    innerPopperClass () {
      return `${this.popperClass} multi-cascader ${this.isSearching ? '' : 'multi-cascader-style'} ${this.activeClass}`
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.init()
      }
    },
    value: {
      deep: true,
      handler () {
        // this.init()
        this.updateSelect(this.value, true, true)
      }
    },
    selectedNodes () {
      this.$emit('change', this.selectedNodes.map(o => o[this.isTwoDimensionValue ? '_idArr' : this.valueKey]))
    }
  },
  methods: {
    visibleChange (v) {
      this.activeList = []
      this.activeClass = 'floor-width-1'
      if (!v) {
        this.searchText = ''
      }
      this.$emit('dropdownVisibleChange', v)
    },
    handleBlur (e) {
      this.searchText = ''
      this.$emit('blur', e)
    },
    handleFocus (e) {
      this.$emit('focus', e)
    },
    handleClear () {
      this.selectedNodes.forEach(node => {
        node.check(false)
      })
      this.$emit('input', [])
      this.$emit('clear')
    },
    selectOne (item) {
      item.checked = !item.checked
      this.handleCheck(item)
    },
    changeLabel (v) {
      this.store.nodeList.forEach(node => {
        node.check(v.includes(node.showLabel))
      })
       this.selectedNodes.forEach(node => {
        node.check(v.includes(node.showLabel))
      })
      if(v.length === 0) {
         this.$emit('input', [])
      }
    },
    getKey () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    handleClick (node, levelIndex, level) {
      if (this.maxLevellist[level - 1]) {
        this.maxLevellist[level - 1].rendered = true
      }
      this.activeClass = `floor-width-${node.isLeaf ? level : level + 1}`
      const tempList = [...this.activeList]
      if (level < tempList.length) {
        tempList.splice(level)
      }
      tempList[level - 1] = node.id
      this.showData[level] = node.childNodes
      this.activeList = tempList
    },
    handleCheck (node) {
      node.check(node.checked)
      this.selectedIds = this.store.selectedIds
      this.updateSelect(this.store.selectedIds)
      this.$emit('input', this.selectedNodes.map(o => o[this.isTwoDimensionValue ? '_idArr' : this.valueKey]))
    },
    deselect (v) {
      const targetNode = this.selectedNodes.find(o => o.showLabel === v) || {}
      targetNode.checked = false
      this.handleCheck(targetNode)
      this.$emit('deselect', v)
    },
    // eslint-disable-next-line no-unused-vars
    updateSelect (data = [], needCheckNode = false, setValue = false) {
      const tempSelectedNodes = []
      const tempSelectedLabels = []
      const tempSelectedIds = []
      this.store.nodeList.forEach(node => {
        node.checked && node.check(false)
      })
      data.forEach(o => {
        let targetNode
        if (setValue) {
          targetNode = _findByObj(this.store.nodeList, { [this.isTwoDimensionValue ? '_idArr' : this.valueKey]: o }) || {}
          // targetNode = _.find(this.store.nodeList, { [this.isTwoDimensionValue ? '_idArr' : this.valueKey]: o }) || {}
          tempSelectedIds.push(targetNode.id)
        } else {
          targetNode = this.store.nodesMap[o]
          tempSelectedIds.push(o)
        }
        if (targetNode) {
          needCheckNode && targetNode.check(true)
          tempSelectedNodes.push(targetNode)
          tempSelectedLabels.push(targetNode.showLabel)
        }
      })
      this.selectedNodes = tempSelectedNodes
      this.selectedLabels = tempSelectedLabels
      this.selectedIds = tempSelectedIds
    },
    init () {
      this.store = new TreeStore({
        data: this.data,
        separator: this.separator,
        valueKey: this.valueKey,
        labelKey: this.labelKey,
        childrenKey: this.childrenKey,
        showLeafLabel: this.showLeafLabel
      })
      this.root = this.store.root
      console.log(this.root)
      this.maxLevellist = Array.from({ length: this.store.maxLevel - 1 }, (v, i) => {
        this.showData[i + 1] = []
        return {
          id: i + 1,
          rendered: false
        }
      })
      this.updateSelect(this.value, true, true)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less">
.ant-select-dropdown.multi-cascader-style{
  min-width: 160px!important;
  .ant-select-dropdown-menu-item {
    &:hover{
      background: #FFF;
    }
    padding: 0;
    position: relative;
        &.hover {
      background-color: #fff;
    }
  }
  .li-style {
    height: 34px;
    padding: 0px 20px;
    box-sizing: border-box;
    list-style: none;
    width: 160px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 34px;
    &:hover{
      background-color: rgba(69,200,220,.1);
    }
    &.selected {
      color: #45c8dc;
    }
    &.active-li {
      background-color: rgba(69,200,220,.1);
      color: #45c8dc;
    }
    .li-label-style{
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      padding-right: 15px;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .li-label-icon {
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translate(0, -50%);
      }
      .el-checkbox {
        margin-right: 10px;
      }
    }
  }
  .ground {
    width: 100%;
    height: 204px;
    padding: 6px 0;
  }
  .floor-item {
    width: 160px;
    padding: 6px 0;
    border-left: 1px solid #eee;
    position: absolute;
    top: 0;
    height: 204px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.multi-cascader-style {
  p {
    margin: 0;
    padding: 0;
  }
  ol, ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
@width: 160px;
each(range(10), {
   .multi-cascader-style.floor-width-@{value} {
    width: @value * @width;
  }
  .multi-cascader-style .floor-position-left-@{value} {
    left: ( @value - 1) * @width;
  }
})
</style>
