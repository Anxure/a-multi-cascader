<template>
  <ul style="width:160px;max-height:100%;overflow-x: hidden;overflow-y: auto;">
    <li class="li-style"
      v-for="(node, nodeIndex) in list"
      :key="guid(node)"
      @click="handleClick(node, nodeIndex, level)"
      :class="{'active-li': activeList[level - 1] === node.id}"
      @mousemove="handleMouseMove(node, nodeIndex, level)"
      @mouseout="handleMouseOut"
    >
      <p class="li-label-style" v-toolTip>
        <span @click.stop v-show="!onlyLast || (onlyLast && node.isLeaf)">
          <a-checkbox
          @change="handleCheck($event, node)"
          :checked="node.checked"
          :disabled="node.disabled"
          ></a-checkbox>
        </span>
        <span style="margin-left:5px">{{node[labelKey]}}</span>
        <a-icon v-if="node.childNodes && node.childNodes.length > 0" class="li-label-icon" type="right" />
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  directives: {
    toolTip: {
      inserted: function (el) {
        el.title = el.scrollWidth > el.offsetWidth ? el.innerText : ''
      }
    }
  },
  props: {
    activeList: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    level: {
      type: [Number, String]
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    expandTrigger: {
      type: String,
      default: 'click'
    },
    onlyLast: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      oldValue: {
        oldNode: null,
        oldLevelIndex: null,
        oldLevel: null
      }
    }
  },
  methods: {
    handleMouseOut () {
      this.oldValue = {
        oldNode: null,
        oldLevelIndex: null,
        oldLevel: null
      }
    },
    // mouseEnter会一直触发，然后阻止了click事件，改为mouseMove事件
    handleMouseMove (node, levelIndex, level) {
      if (this.expandTrigger !== 'hover') {
        return false
      }
      const { oldNode, oldLevelIndex, oldLevel } = this.oldValue
      if (
        (node === oldNode) &&
        (oldLevelIndex === levelIndex) &&
        (oldLevel === level)
      ) {
        return false
      } else {
        this.oldValue = {
          oldNode: node,
          oldLevelIndex: levelIndex,
          oldLevel: level
        }
      }
      this.$emit('handle-click', node, levelIndex, level)
    },
    handleClick (node, levelIndex, level) {
      if (this.expandTrigger === 'click') {
        this.$emit('handle-click', node, levelIndex, level)
      }
    },
    handleCheck (v, node) {
      node.checked = v.target.checked
      this.$emit('handle-check', node)
    },
    guid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  }
}
</script>

<style>
</style>
