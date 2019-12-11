<template>
  <div id="confirmContract">
    <h5>
      <span>合同管理 / 合同详情</span>
    </h5>
    <h3>
      <span>
        <span class="mr">
          合同编号：{{formData.code}}
        </span>
        <span class="ml">
          合同名称：{{formData.title}}
        </span>
      </span>
      <span class="status">
        状态：{{formData.status|status}}
      </span>
    </h3>
    <section class="content">
      <h4>基本信息</h4>
      <a-row>
        <a-col :span='3'>
          采购项目编号：
        </a-col>
        <a-col :span='5'>
          {{formData.inquiry_code}}
        </a-col>
        <a-col :span='3'>
          项目名称：
        </a-col>
        <a-col :span='5'>
          {{formData.inquiry_title}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          甲方(采购单位)：
        </a-col>
        <a-col :span='5'>
          {{formData.com_name}}
        </a-col>
        <a-col :span='3'>
          合同签约地：
        </a-col>
        <a-col :span='5'>
          杭州
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          联系人：
        </a-col>
        <a-col :span='5'>
          {{formData.contact_name}}
        </a-col>
        <a-col :span='3'>
          联系电话：
        </a-col>
        <a-col :span='5'>
          {{formData.contact_number}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          电子邮箱：
        </a-col>
        <a-col :span='5'>
          {{formData.email}}
        </a-col>
        <a-col :span='3'>
          详细地址：
        </a-col>
        <a-col :span='5'>
          {{formData.address}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          传真：
        </a-col>
        <a-col :span='5'>
          {{formData.fax}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          开户行：
        </a-col>
        <a-col :span='5'>
          {{formData.bank}}
        </a-col>
        <a-col :span='3'>
          银行账号：
        </a-col>
        <a-col :span='5'>
          {{formData.bank_account}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          乙方(供应商名称)：
        </a-col>
        <a-col :span='5'>
          {{formData.supply_name}}
        </a-col>
        <a-col :span='3'>
          供应商地址：
        </a-col>
        <a-col :span='5'>
          {{formData.supply_address}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          电子邮箱：
        </a-col>
        <a-col :span='5'>
          {{formData.supply_email}}
        </a-col>
        <a-col :span='3'>
          联系电话：
        </a-col>
        <a-col :span='5'>
          {{formData.supply_contact_number}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          传真：
        </a-col>
        <a-col :span='5'>
          {{formData.supply_fax}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          开户行：
        </a-col>
        <a-col :span='5'>
          {{formData.supply_bank}}
        </a-col>
        <a-col :span='3'>
          银行账号：
        </a-col>
        <a-col :span='5'>
          {{formData.supply_bank_account}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='3'>
          是否为唯一供应商：
        </a-col>
        <a-col :span='5'>
           {{formData.is_unique==1?'是':'否'}}
        </a-col>
      </a-row>
      <h4 class="mt-10">询价商品信息</h4>
      <a-row>
        <a-col :span='6' :offset='1'>询价大类：{{formData.inquiry_cat_name}}</a-col>
        <a-col :span='8'>配送区域：{{region_area}}</a-col>
      </a-row>
      <a-table 
        class="table"
        rowKey="id" 
        :columns="columns" 
        :dataSource="formData.stock_list"
        :pagination='false'
      >
      </a-table>
      <h4 class="mt-30">合同</h4>
      <a-row>
        <a-col :span='8' :offset='1'>
          <span>合同期限：按送货量自动截止</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='23' :offset='1'>
            合同保证金：合同签订时，乙方向甲方交纳合同保证金人民币
            <span class="pl-10 pr-10">{{formData.margin_money}}</span>
            元整，无违约情况，合同期满后无息退还。
        </a-col>
      </a-row>
      <h4 class="mt-10">计算方式</h4>
      <a-row>
        <a-col :span='22' :offset='1'>
          <span>货到经甲方验收合格后结算，原则上一月结算一次，隔月支付货款，如有特殊情况，必须经合同甲方同意方可提前支付货款。乙方应满足甲方在货款税务票据方面的具体要求。</span>
        </a-col>
      </a-row>
      <h4 class="mt-10">供应规定</h4>
      <a-row>
        <a-col :span='22' :offset='1'>
          <p class="mb-10">1. 乙方按照甲方各食堂所报数量及要求，按时送到各食堂指定地点（一般为订货时间起24小时内，生鲜类、紧急订货等甲方有特定需求的须首先满足）；</p>
          <p class="mb-10">2. 合同期内不调价；</p>
          <p class="mb-10">3. 甲方要求及甲乙方约定的产品规格、技术标准和其他性状要求等作为实际配送时的验收标准，国家法律法规、标准等规定的要求作为当然验收要求。</p>
        </a-col>
      </a-row>
      <h4 class="mt-10">售后服务</h4>
      <a-row>
        <a-col :span='5' class="text-right">
          供应商产品售后服务热线(固话)：
        </a-col>
        <a-col :span='8'>
          {{formData.supply_sales_phone}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='5' class="text-right">
          供应商产品售后服务联系人姓名：
        </a-col>
        <a-col :span='8'>
          {{formData.supply_sales_name}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='5' class="text-right">
          手机：
        </a-col>
        <a-col :span='8'>
          {{formData.supply_sales_number}}
        </a-col>
      </a-row>
      <h4 class="mt-10">合同文件</h4>
      <a-row class="mt-10">
        <a-col :span='22' :offset='1'>
          在线合同：关于{{formData.title}}的在线询价合同({{formData.code}}).pdf
          <a href="javascript:;" @click="showContract">预览合同</a>
          <!-- <a href="javascript:;" @click="downloadContract">下载合同</a> -->

        </a-col>
      </a-row>
      <a-row class="mt-20">
        <a-col :span='10' :offset='10'>
          <a-button @click='confirm' type="primary">确认</a-button>
          <a-button @click='$router.push({path:"/addContract",query:{code:formData.code}})' type="primary">重新编辑</a-button>
        </a-col>
      </a-row>
      <h4 class="mt-10">流转日志</h4>
      <a-row class="mt-10">
        <a-steps progressDot :current="stepsCurrent" direction="vertical">
          <a-step v-for="(item,index) of formData.log_list||[]" :key="index" :title="item.create_time">
            <template slot="description">
              <div class="step-item">
                <span class="one">
                  {{item.supply_name}}
                </span>
                <span class="mr-10 two">
                  {{item.desc}}
                </span>
              </div>
              <div class="step-item" v-if="item.remark">
                {{item.remark}}
              </div>
            </template>
          </a-step>
        </a-steps>
      </a-row>
    </section>
  </div>
</template>

<script>
import {
  get_base_info, // 合同详情
  confirm_contract // 最终确认
} from '@admin/api/contract';
const columns = [
  {
    title:'序号',
    customRender: (text,record,index)=>`${index+1}`,
    width:'14%',
    align:'center'
  },
  {
    title:'商品名称',
    dataIndex: 'stock_name',
    width:'14%',
    align:'center'
  },
  {
    title:'品牌',
    dataIndex: 'brand',
    width:'14%',
    align:'center'
  },
  {
    title:'规格',
    dataIndex: 'standard',
    width:'14%',
    align:'center'
  },
  {
    title:'采购单位',
    dataIndex: 'price_unit_name',
    width:'14%',
    align:'center'
  },
  {
    title:'预估采购数量',
    dataIndex: 'number',
    width:'14%',
    align:'center'
  },
  {
    title:'单价（元）',
    dataIndex: 'price',
    width:'14%',
    align:'center'
  }
];
export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 }
      },
      columns,
      code:'',
      stepsCurrent:0,
      formData:{},
      region_area:'',
    };
  },
  created() {
    this.code = this.$route.query.code;
    this.get_base_info_method(this.code);
    this.father.selectedKeys = ['/Contract/get_contract_list'];
  },
  filters:{
    status:(key)=>{
      switch (key) {
        case '1':
          return '待起草'
          break;
        case '2':
          return '待供应商确认'
          break;
        case '3':
          return '供应商已退回'
          break;
        case '4':
          return '待确认'
          break;
        case '8':
          return '已完成'
          break;
        default:
          return '未知状态'
          break;
      }
    }
  },
  methods: {
    get_base_info_method(code){
      get_base_info(code)
      .then(res => {
        this.formData = res.data;
        this.formData.log_list = this.formData.log_list||[];
        this.stepsCurrent = this.formData.log_list.length;
        var list = res.data.shipping_region_list;
        var region_area='';
        list.forEach(elem => {
          region_area +=elem.name+'，';
        });
        this.region_area = region_area.slice(0,-1);
      })
      .catch(error => {
        this.$message.error(error)
      });
    },
    showContract(){
      open(this.global.baseUrl + "?c=Pcontract&a=pre_view&code="+this.formData.code);
    },
    confirm(){
      var self = this;
      self.$confirm({
        title: '确认此合同？',
        onOk() {
          confirm_contract(self.formData.code).then(res=>{
            self.$message.success(res.msg);
            let time = setTimeout(()=>{
              self.$router.go(-1);
              clearTimeout(time)
            },1500)
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    // downloadContract(){
    //   open(this.global.baseUrl+"?c=Pcontract&a=download&code="+this.formData.code);
    // }
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
@import '~@admin/assets/scss/enquiry/confirmContract';
@import '~@admin/assets/scss/steps-content';
#confirmContract{
  @include component;
  @include confirmContract;
  @include step-item;
}
</style>