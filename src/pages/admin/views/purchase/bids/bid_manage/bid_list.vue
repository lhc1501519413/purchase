<template>
  <div id="bids">
    <h5>招标管理 / 招标项目管理</h5>
    <section class="content">
      <search-condition 
        ref="condition" 
        @change-data="bid_list_method2" 
        :statusKey="status"
        :statusList="statusList" 
        :bid_type_list="bid_type_list" 
        :father="this"
        >
        <template #new_add>
          <a-button v-if="priv.bid_list.add" @click="new_add" class="ml-10" type="primary">新增项目</a-button>
        </template>
      </search-condition>
      <a-table class="table" :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id">
        <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <div v-if="text.status==1||text.status==3">
            <router-link v-if="priv.bid_list.edit" :to="{path:'/addBids',query:{id:text.id,code:text.custom_code}}">
              编辑
            </router-link>
            <router-link v-if="priv.bid_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
            <a @click="del(text.id)" v-if="priv.bid_list.delete" href="javascript:;">删除</a>
            <a @click="submit(text.id)" v-if="priv.bid_list.submit" href="javascript:;">提交</a>
          </div>
          <div v-if="text.status==2">
            <router-link v-if="priv.bid_list.audit" :to="{path:'/auditBid',query:{id:text.id}}">
              审核
            </router-link>
            <a @click="reject(text.id)" v-if="priv.bid_list.refuse" href="javascript:;">驳回</a>
            <router-link v-if="priv.bid_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
          </div>
          <div v-if="text.status==8">
            <router-link v-if="priv.purchase_list.edit" :to="{path:'/addPurchaseDoc',query:{id:text.id}}">
              制作
            </router-link>
            <router-link v-if="priv.bid_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
            <a @click="del(text.id)" v-if="priv.bid_list.delete" href="javascript:;">删除</a>
          </div>
          <div v-if="(text.status==9||text.status==10||text.status==11||text.status==15||text.status==16||text.status==17||text.status==18)&&priv.bid_list.view">
            <router-link :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
          </div>
          <div v-if="(text.status==20||text.status==21)&&priv.bid_list.view">
            <router-link :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
            <a @click="show_bid_fail(text.code)">流标信息</a>
          </div>
          <router-link v-if="priv.bid_list.add&&text.show_copy" :to="{path:'/bidRelevance',query:{bid_code:text.code,code:text.custom_code}}">
            关联
          </router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
    <a-modal
      class="failure-modal"
      :destroyOnClose="true"
      style="top: 10%;"
      width="55%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      >
      <h3 class="text-center" slot="title">流标</h3>
      <a-form :form="form" @submit="handleSubmit">
        <h4>项目基本信息</h4>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">项目编号：</a-col>
          <a-col :span="4">{{formData.custom_code}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">项目名称：</a-col>
          <a-col :span="4">{{formData.title}}</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">采购单位：</a-col>
          <a-col :span="4">{{formData.com_name}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">采购方式：</a-col>
          <a-col :span="4">{{formData.bid_type_name}}</a-col>
        </a-row>
        <a-form-item label="流标原因" v-bind="formItemLayout">
          <a-textarea
            readOnly
            style="width:65%"
            :rows="4"
            placeholder="请输入流标原因"
            v-decorator="[
              'reason',
              { rules: [{ required: true, message: '请输入流标原因' }],initialValue:formData.reason}
            ]"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="附件" v-bind="formItemLayout">
          <ul>
            <li
              class="file-list-item"
              v-for="(item,index) of formData.file_list"
              :key="index"
            >
              <svg-icon class="wenjian" icon-class="wenjian" />
              <span class="ml-10 mr-10">{{item.file_name}}</span>
              <a :href="item.full_path" target="_blank">预览文件</a>
            </li>
          </ul>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { 
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  bid_list, // 招标列表
  submit_bid, // 提交
  refuse_bid, // 驳回
  del_bid // 删除
} from '@admin/api/bids'
import {
  get_bid_fail // 流标详情
} from "@admin/api/open_bid";
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
        {value:'1',label:'待提交'},
        {value:'2',label:'待审核'},
        {value:'3',label:'项目已驳回'},
        {value:'8',label:'采购文件待制作'},
        {value:'9',label:'采购文件待审核'},
        {value:'10',label:'采购文件已驳回'},
        {value:'11',label:'采购公告已发布'},
        {value:'15',label:'待开标'},
        {value:'16',label:'评标中'},
        {value:'17',label:'采购方确认中'},
        {value:'18',label:'采购结果公告已发布'},
        {value:'20,21',label:'已流标'},
        /* {value:'19',label:'中标通知书已发布'},
        {value:'22',label:'合同确认中'},
        {value:'23',label:'合同已导入'},
        {value:'24',label:'合同生效中'},
        {value:'25',label:'合同已结束'}, */
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
      total:0,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      ModalVisible:false,
      formData: {
        reason: "",
        file_list: []
      }
    };
  },
  filters:{
    status:(key)=>{
      switch (key) {
        case '1':
          return '待提交'
        case '2':
          return '待审核'
        case '3':
          return '项目已驳回'
        case '8':
          return '采购文件待制作'
        case '9':
          return '采购文件待审核'
        case '10':
          return '采购文件已驳回'
        case '11':
          return '采购公告已发布'
        case '15':
          return '待开标'
        case '16':
          return '评标中'
        case '17':
          return '采购方确认中'
        case '18':
          return '采购结果公告已发布'
        /* case '19':
          return '中标通知书已发布' */
        case '20':
          return '已流标'
        case '21':
          return '已流标'
        // case '22':
        //   return '合同确认中'
        // case '23':
        //   return '合同已导入'
        // case '24':
        //   return '合同生效中'
        // case '25':
        //   return '合同已结束'
        default:
          return '未知状态'
      }
    }
  },
  created() {
    this.father.selectedKeys = ['/Bid/bid_list'];
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
      this.keyword = this.$refs.condition.keyword;
      this.status = this.$refs.condition.status;
      this.bid_type = this.$refs.condition.bid_type;
      this.bid_list_method();
    },
    bid_list_method(){
      var params={};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      bid_list(params).then(res=>{
        this.dataSource = res.data.list||[];
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    new_add(){
      this.$router.push({name:'addBids'})
    },
    submit(id){
      var self = this;
      this.$confirm({
        title: '确认提交此招标项目？',
        onOk() {
          submit_bid(id).then(res=>{
            self.$message.success(res.msg)
            self.bid_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    reject(id){
      var self = this;
      this.$confirm({
        title: '确认驳回此招标项目？',
        onOk() {
          refuse_bid(id).then(res=>{
            self.$message.success(res.msg)
            self.bid_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    del(id){
      var self = this;
      this.$confirm({
        title: '确认删除此招标项目？',
        onOk() {
          del_bid(id).then(res=>{
            self.$message.success(res.msg)
            self.bid_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    paginationChange(page) {
      this.page = page;
      this.bid_list_method();
    },
    show_bid_fail(bid_code){
      get_bid_fail({bid_code}).then(res=>{
        this.formData = res.data;
        this.ModalVisible = true;
      }).catch(error=>this.$message.error(error))
    },
    handleSubmit(){}
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#bids{
  @include component;
}
</style>
<style lang="scss">
.failure-modal {
  h4 {
    border-left: 4px solid $primary2;
    @extend .pl-10;
    @extend .ml-40;
    @extend .mb-10;
  }
  .wenjian {
    width: 17px;
    height: 17px;
  }
  .ant-input {
    padding-left: 5px;
  }
  .file-list-item {
    height: 20px;
    margin-top: 5px;
  }
}
</style>
