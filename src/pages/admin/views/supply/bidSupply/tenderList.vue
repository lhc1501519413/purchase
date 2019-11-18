<template>
  <div id="tender_list">
    <h5>投标管理 / 投标文件管理</h5>
    <section class="content">
      <search-condition 
        ref="condition" 
        @change-data="tender_list_method2" 
        :statusKey="status"
        :statusList="statusList" 
        :bid_type_list="bid_type_list" 
        :father="this"
        >
      </search-condition>
      <a-table class="table" :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id">
        <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <div v-if="text.status==5">
            <router-link v-if="priv.tender_list.edit" :to="{path:'/addSPurchaseDoc',query:{code:text.bid_code}}">
              制作
            </router-link>
            <router-link v-if="priv.tender_list.view" :to="{path:'/sbidDetail',query:{id:text.bid_id}}">
              查看项目
            </router-link>
          </div>
          <div v-if="priv.tender_list.view&&text.status==8">
            <router-link :to="{path:'/sbidDetail',query:{id:text.bid_id}}">
              查看项目
            </router-link>
            <router-link :to="{path:'/tenderDoc',query:{code:text.bid_code}}">
              查看投标文件
            </router-link>
          </div>
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
  tender_list // 招标列表
} from '@admin/api/bidsSupply'
export default {
  components:{
    'search-condition':()=>import('@admin/components/searchCondition')
  },
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
        {value:'5',label:'待制作'},
        {value:'8',label:'已制作'},
      ],
      bid_type:'',
      bid_type_list:[
        {value:'0',title:'全部'}
      ],
      page:'',
      dataSource: [],
      columns:[
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
          title: '采购类别',
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
        case '5':
          return '待制作'
          break;
        case '8':
          return '已制作'
          break;
        default:
          return '未知状态'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ['/Sbid/tender_list'];
    this.status = this.$route.params.status || '0';
    this.tender_list_method();
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
    tender_list_method2(){
      this.page = 1;
      this.keyword = this.$refs.condition.keyword;
      this.status = this.$refs.condition.status;
      this.bid_type = this.$refs.condition.bid_type;
      this.tender_list_method();
    },
    tender_list_method(){
      var params={};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      tender_list(params).then(res=>{
        this.dataSource = res.data.list;
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    paginationChange(page) {
      this.page = page;
      this.tender_list_method();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#tender_list{
  @include component;
}
</style>