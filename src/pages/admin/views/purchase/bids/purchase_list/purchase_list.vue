<template>
  <div id="purchase_list">
    <h5>招标管理 / 采购文件管理</h5>
    <section class="content">
      <search-condition 
        ref="condition" 
        @change-data="purchase_list_method2" 
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
          <div v-if="text.status==8||text.status==10">
            <router-link v-if="priv.purchase_list.edit" :to="{path:'/addPurchaseDoc',query:{id:text.id}}">
              制作
            </router-link>
            <router-link v-if="priv.purchase_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
          </div>
          <div v-if="text.status==9">
            <router-link v-if="priv.purchase_list.audit" :to="{path:'/auditPurchaseDoc',query:{id:text.id}}">
              审核
            </router-link>
            <a @click="reject(text.id)" v-if="priv.purchase_list.audit" href="javascript:;">驳回</a>
             <router-link v-if="priv.purchase_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
          </div>
          <div v-if="text.status==11">
            <router-link v-if="priv.purchase_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
            <router-link v-if="priv.purchase_list.view" :to="{path:'/docDetail',query:{id:text.id}}">
              查看采购文件
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
  purchase_list, // 招标列表
  refuse_bid_purchase // 驳回采购文件
} from '@admin/api/bids'
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
        {value:'8',label:'待制作'},
        {value:'9',label:'待审核'},
        {value:'10',label:'已驳回'},
        {value:'11',label:'已审核'}
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
        case '8':
          return '待制作'
          break;
        case '9':
          return '待审核'
          break;
        case '10':
          return '已驳回'
          break;
        case '11':
          return '已审核'
          break;
        default:
          return '未知状态'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ['/Bid/purchase_list'];
    this.status = this.$route.params.status || '0';
    this.purchase_list_method();
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
    purchase_list_method2(){
      this.page = 1;
      this.keyword = this.$refs.condition.keyword;
      this.status = this.$refs.condition.status;
      this.bid_type = this.$refs.condition.bid_type;
      this.purchase_list_method();
    },
    purchase_list_method(){
      var params={};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      purchase_list(params).then(res=>{
        this.dataSource = res.data.list;
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    reject(id){
      var self = this;
      this.$confirm({
        title: '确认驳回此招标文件？',
        onOk() {
          refuse_bid_purchase(id)
            .then(res => {
              self.$message.success(res.msg);
              self.purchase_list_method();
            })
            .catch(error => {
              self.$message.error(error);
            });
        },
        onCancel() {},
      });
    },
    paginationChange(page) {
      this.page = page;
      this.purchase_list_method();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#purchase_list{
  @include component;
}
</style>