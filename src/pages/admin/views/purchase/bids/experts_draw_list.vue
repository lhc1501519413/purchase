<template>
  <div id="experts_draw_list">
    <h5>招标管理 / 专家抽取</h5>
    <section class="content">
      <a-row>
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input
            class="pl-10"
            style="width: 65%"
            v-model="keyword"
            @keyup.13="bid_list_method2"
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
            @change="bid_list_method2"
          >
            <a-select-option
              v-for="item of statusList"
              :value="item.value"
              :key="item.value"
            >{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span>采购方式：</span>
          <a-select
            allowClear
            v-model="bid_type"
            dropdownMatchSelectWidth
            style="width: 65%"
            @change="bid_list_method2"
          >
            <a-select-option
              v-for="item of bid_type_list"
              :value="item.value"
              :key="item.value"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span>抽取类型：</span>
          <a-select
            allowClear
            v-model="choose_type"
            dropdownMatchSelectWidth
            style="width: 65%"
            @change="bid_list_method2"
          >
            <a-select-option
              v-for="item of choose_type_list"
              :value="item.value"
              :key="item.value"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-button @click="bid_list_method2" class="ml-10" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-table class="table" :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id">
        <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <a v-if="text.status==2" @click="show_expert" href="javascript:;">查看</a>
          <a v-else @click="choose_expert" href="javascript:;">抽取</a>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import { 
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  bid_list, // 招标列表
} from '@admin/api/bids'
export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      priv:this.$store.getters.priv,
      keyword:'',
      status:'0',
      statusList:[
        {value:'0',label:'全部'},
        {value:'1',label:'待抽取'},
        {value:'2',label:'已抽取'},
      ],
      bid_type:'0',
      bid_type_list:[
        {value:'0',title:'全部'}
      ],
      choose_type:'0',
      choose_type_list:[
        {value:'0',title:'自行组建'}
      ],
      page:'',
      dataSource: [],
      columns:[
        {
          title:'序号',
          customRender: (text,record,index)=>`${index+1}`,
          width:'6%',
          align:'center'
        },
        {
          title: '项目编号',
          dataIndex: 'custom_code',
          width:'10%'
        },
        {
          title: '项目名称',
          dataIndex: 'title',
          width:'10%'
        },
        {
          title: '采购单位',
          dataIndex: 'com_name',
          width:'10%'
        },
        {
          title: '采购方式',
          dataIndex: 'bid_type_name',
          width:'15%'
        },
        {
          title: '抽取类型',
          dataIndex: 'cat_name',
          width:'15%'
        },
        {
          title: '状态',
          dataIndex:'status',
          scopedSlots: { customRender: 'status' },
          width:'10%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          width:'20%'
        }
      ],
      total:0
    };
  },
  filters:{
    status:(key)=>{
      switch (key) {
        case '1':
          return '待抽取'
          break;
        case '2':
          return '已抽取'
          break;
        default:
          return '未知状态'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ['/Bid/experts_draw_list'];
    this.status = this.$route.params.status || '0';
    this.bid_list_method();
    this.get_tree_data();
  },
  methods: {
    get_tree_data() {
      get_bid_type()
        .then(res => {
          this.bid_type_list = [...this.bid_type_list,...this.$common.treeSelectFormat(res.data)];
        })
        .catch();
    },
    bid_list_method2(){
      this.page = 1;
      this.bid_list_method();
    },
    bid_list_method(){
      var params={};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      params.choose_type = this.choose_type;
      bid_list(params).then(res=>{
        this.dataSource = res.data.list||[];
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    paginationChange(page) {
      this.page = page;
      this.bid_list_method();
    },
    show_expert(){
      console.log('查看专家')
    },
    choose_expert(){
      console.log('抽取专家')
    }
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#experts_draw_list{
  @include component;
}
</style>