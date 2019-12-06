<template>
  <div id="contract">
    <h5>招标管理 / 公告列表</h5>
    <section class="content">
      <a-row>
        <a-col :span="6">
          <span>模糊搜索：</span>
          <a-input style="width: 65%" v-model="keyword" @keyup.13="notice_list_method2" placeholder="模糊搜索：公告编号/公告名称"/>
        </a-col>
        <a-col :span="6" class="ml">
          <span>公告类别：</span>
          <a-select 
              allowClear 
              v-model="type" 
              style="width: 65%" 
              @change="notice_list_method2"
            >
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">采购公告</a-select-option>
            <a-select-option value="2">中标成交公告</a-select-option>
            <a-select-option value="3">流标公告</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <span>采购方式：</span>
          <a-select
            allowClear
            v-model="bid_type"
            dropdownMatchSelectWidth
            style="width: 65%"
            @change="notice_list_method2"
          >
            <a-select-option
              v-for="item of bid_type_list"
              :value="item.value"
              :key="item.value"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5" class="ml">
          <a-button @click="notice_list_method2" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-table class="table" 
        :dataSource="dataSource" 
        :columns="columns" 
        :pagination="false" 
        rowKey="id"
      >
        <template slot="operation" slot-scope="text,record">
          <router-link v-if='record.type==1' :to="{path:'/Bid/notice_detail',query:{id:record.id}}">
            详情
          </router-link>
          <router-link v-if='record.type==2' :to="{path:'/Bid/notice_detail_deal',query:{id:record.id}}">
            详情
          </router-link>
          <router-link v-if='record.type==3' :to="{path:'/Bid/notice_detail_fail',query:{id:record.id}}">
            详情
          </router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" v-model="page" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import {
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  notice_list // 公告列表
} from '@admin/api/open_bid';
export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      keyword:'',
      type:'0',
      bid_type: '0',
      bid_type_list: [{ value: "0", title: "全部" }],
      page:1,
      dataSource: [],
      columns:[
        {
          title:'序号',
          customRender: (text,record,index)=>`${index+1}`,
          width:'6%',
          align:'center'
        },
        {
          title: '公告标题',
          dataIndex: 'title',
          width:'16%',
        },
        {
          title: '公告类型',
          dataIndex: 'type_name',
          width:'8%',
        },
        {
          title: '项目名称',
          dataIndex: 'project_name',
          width:'10%',
        },
        {
          title: '项目编号',
          dataIndex: 'custom_code',
          width:'10%',
        },
        {
          title: '采购单位',
          dataIndex: 'com_name',
          width:'10%',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          width:'10%',
        }
      ],
      total:0
    };
  },
  created() {
    this.father.selectedKeys = ['/Bid/notice_list'];
    this.notice_list_method();
    this.get_tree_data();
  },
  methods: {
    get_tree_data() {
      get_bid_type()
        .then(res => {
          this.bid_type_list = [
            ...this.bid_type_list,
            ...this.$common.treeSelectFormat(res.data)
          ];
        })
        .catch();
    },
    notice_list_method2(){
      this.page = 1;
      this.notice_list_method();
    },
    notice_list_method(){
      var params = {};
      params.keyword = this.keyword;
      params.type = this.type;
      params.bid_type = this.bid_type;
      params.page = this.page;
      notice_list(params).then(res=>{
        this.dataSource = res.data.list;
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    paginationChange(page) {
      this.page = page;
      this.notice_list_method();
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '~@admin/assets/scss/common';
  #contract{
    @include component;
  }
</style>