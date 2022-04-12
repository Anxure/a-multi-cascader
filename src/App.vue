<template>
  <div id="app">
    <MultiCascader :data="array" v-model="checkList" value-key="id" label-key="name" children-key="parameters" :onlyLast="onlyLast" @dropdownVisibleChange="dropdownVisibleChange" :isTwoDimensionValue="isTwoDimensionValue" :showLeafLabel="showLeafLabel" @change="change"></MultiCascader>
  </div>
</template>

<script>
import MultiCascader from './components/multiCascader/MultiCascader.vue'

export default {
  name: 'App',
  components: {
    MultiCascader
  },
  data() {
    return {
      array: [
        {
          id: '371711767155610112',
          name: '减税降费',
          acronym: null,
          completeSpelling: null,
          code: '00001',
          description: '减税降费',
          hiddenFlag: null,
          parameters: [
            {
              id: '371712093573124608',
              name: '增值税改革',
              code: '000010001',
              acronym: null,
              completeSpelling: null,
              parentId: '371711767155610112',
              description: '增值税改革',
              children: [],
              sortValue: '2',
              dictionaryId: '329428711772782592',
              hiddenFlag: null,
              createTime: '2022-03-17 16:32:47'
            },
            {
              id: '371712424285606400',
              name: '社保缴费',
              code: '000010002',
              acronym: null,
              completeSpelling: null,
              parentId: '371711767155610112',
              description: '社保缴费',
              children: [],
              sortValue: '3',
              dictionaryId: '329428711772782592',
              hiddenFlag: null,
              createTime: '2022-03-17 16:34:03'
            },
            {
              id: '371712501595017728',
              name: '纳税服务',
              code: '000010003',
              acronym: null,
              completeSpelling: null,
              parentId: '371711767155610112',
              description: '纳税服务',
              children: [],
              sortValue: '4',
              dictionaryId: '329428711772782592',
              hiddenFlag: null,
              createTime: '2022-03-17 16:34:21'
            }
          ]
        },
        {
          id: '371712608969200128',
          name: '稳定和扩大就业',
          acronym: null,
          completeSpelling: null,
          code: '00002',
          description: '稳定和扩大就业',
          hiddenFlag: null,
          parameters: [
            {
              id: '371712724933317120',
              name: '高校毕业生就业',
              code: '000020001',
              acronym: null,
              completeSpelling: null,
              parentId: '371712608969200128',
              description: '高校毕业生就业',
              children: [],
              sortValue: '1',
              dictionaryId: '329428711772782592',
              hiddenFlag: null,
              createTime: '2022-03-17 16:35:13'
            },
            {
              id: '371712836602466816',
              name: '农名工就业',
              code: '000020002',
              acronym: null,
              completeSpelling: null,
              parentId: '371712608969200128',
              description: '农名工就业',
              children: [],
              sortValue: '2',
              dictionaryId: '329428711772782592',
              hiddenFlag: null,
              createTime: '2022-03-17 16:35:39'
            },
            {
              id: '371712901026976256',
              name: '劳务派遣',
              code: '000020003',
              acronym: null,
              completeSpelling: null,
              parentId: '371712608969200128',
              description: '劳务派遣',
              children: [],
              sortValue: '2',
              dictionaryId: '329428711772782592',
              hiddenFlag: null,
              createTime: '2022-03-17 16:35:55'
            },
            {
              id: '371712948271616512',
              name: '职业教育',
              code: '000020004',
              acronym: null,
              completeSpelling: null,
              parentId: '371712608969200128',
              description: '职业教育',
              children: [],
              sortValue: '2',
              dictionaryId: '329428711772782592',
              hiddenFlag: null,
              createTime: '2022-03-17 16:36:06'
            }
          ]
        }
      ],
      checkList: [],
      onlyLast: true, // 是否只有最后一个子集显示可选择框,
      isTwoDimensionValue: false, // 数据格式为全量还是只有最后一级  false为最后一级 true为全量
      showLeafLabel: true // 是否只展示最后一级
    }
  },
  methods: {
    dropdownVisibleChange(visible) {
      console.log(visible)
      if(!visible) {
        console.log(this.checkList)
      }
    },
    // 移除某一个tag的时候触发
    change(){
      console.log(this.checkList)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
