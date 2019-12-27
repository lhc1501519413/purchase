<template>
  <div id="bidswin">
    <h5>招标管理 / 中标通知书</h5>
    <section class="content">
      <search-condition 
        ref="condition" 
        @change-data="win_notice_list_method2" 
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
        <template slot="operation" slot-scope="text,record">
          <div v-if="record.status==1">
            <router-link v-if="priv.win_notice_list.edit" :to="{path:'/add_win',query:{id:record.id}}">
              制作
            </router-link>
            <a v-if="priv.win_notice_list.submit" @click="submit(record.id)">提交</a>
          </div>
          <div v-else>
            <router-link v-if="priv.win_notice_list.view" :to="{path:'/win_detail',query:{id:record.id}}">
              详情
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
  win_notice_list, // 招标列表
  submit_win_notice, // 提交
} from '@admin/api/bidswin';
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
        {value:'1',label:'待制作'},
        {value:'4',label:'待供应商确认'},
        {value:'6',label:'已确认'},
      ],
      bid_type:'',
      bid_type_list:[
        {value:'0',title:'全部'}
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
          dataIndex: 'project_code',
          width:'10%'
        },
        {
          title: '项目名称',
          dataIndex: 'project_title',
          width:'10%'
        },
        {
          title: '采购单位',
          dataIndex: 'com_name',
          width:'10%'
        },
        {
          title: '采购方式',
          dataIndex: 'project_type_name',
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
        case '1':
          return '待制作'
        case '4':
          return '待供应商确认'
        case '6':
          return '已确认'
        default:
          return '未知状态'
      }
    }
  },
  created() {
    this.father.selectedKeys = ['/Bidwin/win_notice_list'];
    this.status = this.$route.params.status || '0';
    this.win_notice_list_method();
    this.get_tree_data();
  },
  methods: {
    get_tree_data() {
      get_bid_type()
        .then(res => {
          this.bid_type_list = [...this.bid_type_list,...this.$common.treeSelectFormat(res.data)];
        })
        .catch(error=>this.$message.error(error));
    },
    win_notice_list_method2(){
      this.page = 1;
      this.keyword = this.$refs.condition.keyword;
      this.status = this.$refs.condition.status;
      this.bid_type = this.$refs.condition.bid_type;
      this.win_notice_list_method();
    },
    win_notice_list_method(){
      var params={};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      win_notice_list(params).then(res=>{
        this.dataSource = res.data.list||[];
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    submit(id){
      var self = this;
      this.$confirm({
        title: '确认提交此中标通知书？',
        onOk() {
          submit_win_notice({id}).then(res=>{
            self.$message.success(res.msg)
            self.win_notice_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    paginationChange(page) {
      this.page = page;
      this.win_notice_list_method();
    }
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#bidswin{
  @include component;
}
</style>
