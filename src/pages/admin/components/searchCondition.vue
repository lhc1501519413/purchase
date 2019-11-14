<template>
  <a-row>
    <a-col :span="6">
      <span>模糊搜索：</span>
      <a-input
        class="pl-10"
        style="width: 65%"
        v-model="keyword"
        @keyup.13="$emit('change-data')"
        placeholder="模糊搜索：项目名称/项目编号"
      />
    </a-col>
    <a-col :span="5">
      <span>状态：</span>
      <a-select
        allowClear
        v-model="status"
        dropdownMatchSelectWidth
        style="width: 74%"
        @change="$emit('change-data')"
      >
        <a-select-option
          v-for="item of statusList"
          :value="item.value"
          :key="item.value"
        >{{item.label}}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="6">
      <span>采购方式：</span>
      <a-select
        allowClear
        v-model="bid_type"
        dropdownMatchSelectWidth
        style="width: 65%"
        @change="$emit('change-data')"
      >
        <a-select-option
          v-for="item of bid_type_list"
          :value="item.value"
          :key="item.value"
        >{{item.title}}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="7">
      <slot></slot>
      <slot name="condition"></slot>
      <a-button @click="$emit('change-data')" type="primary" class="ml-10">搜索</a-button>
      <slot name="new_add"></slot>
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    father:{
      type:Object,
      required:true
    },
    statusKey:{
      type:String,
    },
    bid_type_list:{
      type:Array,
      required:true
    },
    statusList:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      keyword:'',
      status:this.statusKey||'0',
      bid_type:'0',
    };
  },
  methods: {
    get_method(){
      this.$emit('change-data');
    }
  }
};
</script>
<style lang="scss" scoped>

</style>