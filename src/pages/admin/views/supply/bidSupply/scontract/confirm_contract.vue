<template>
  <a-form id="confirmContract" :form="form" @submit="handleSubmit">
    <h5>
      <span>合同管理 / 确认合同</span>
    </h5>
    <a-form-item class="button-container">
      <div align="center">
        <a-button @click="$router.go(-1)" class="ml">返回</a-button>
      </div>
    </a-form-item>
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
        状态：{{status}}
      </span>
    </h3>
    <section class="content">
      <h4>基本信息</h4>
      <a-row hidden>
        <a-col :span='8'>
          <a-form-item label="合同编号" v-bind="formItemLayout">
            <span v-decorator="[
                'code',
                {
                  initialValue:formData.code
                }
              ]"
            >{{formData.code}}
            </span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="采购项目编号" v-bind="formItemLayout">
            {{formData.inquiry_code}}
          </a-form-item>
        </a-col>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="项目名称" v-bind="formItemLayout">
            {{formData.inquiry_title}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="甲方(采购单位)" v-bind="formItemLayout">
            {{formData.com_name}}
          </a-form-item>
        </a-col>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="合同签约地" v-bind="formItemLayout">
            <span>杭州</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="联系人" v-bind="formItemLayout">
            {{formData.contact_name}}
          </a-form-item>
        </a-col>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="联系电话" v-bind="formItemLayout">
            {{formData.contact_number}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="电子邮箱" v-bind="formItemLayout">
            {{formData.email}}
          </a-form-item>
        </a-col>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="详细地址" v-bind="formItemLayout">
            {{formData.address}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="传真" v-bind="formItemLayout">
            {{formData.fax}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="开户行" v-bind="formItemLayout">
            {{formData.bank}}
          </a-form-item>
        </a-col>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="银行账号" v-bind="formItemLayout">
            {{formData.bank_account}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="乙方(供应商名称)" v-bind="formItemLayout">
            {{formData.supply_name}}
          </a-form-item>
        </a-col>
        <a-col :span='8'>
          <a-form-item class="no-margin" label="供应商地址" v-bind="formItemLayout">
            {{formData.supply_address}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item label="电子邮箱" v-bind="formItemLayout">
            <a-input
              placeholder="请输入电子邮箱"
              v-decorator="[
                  'supply_email',
                  { 
                    rules: [{ required: true, type:'email',message: '请输入电子邮箱' }],
                    initialValue:formData.supply_email
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span='8'>
          <a-form-item label="联系电话" v-bind="formItemLayout">
            <a-input
              placeholder="请输入联系电话"
              v-decorator="[
                'supply_contact_number',
                { 
                  rules: [{ required: true, message: '请输入联系电话' }],
                  initialValue:formData.supply_contact_number
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item label="传真" v-bind="formItemLayout">
            <a-input
              placeholder="请输入传真"
              v-decorator="[
                  'supply_fax',
                  {
                    initialValue:formData.supply_fax
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item label="开户行" v-bind="formItemLayout">
            <a-input
              placeholder="请输入开户行"
              v-decorator="[
                  'supply_bank',
                  { 
                    rules: [{ required: true, message: '请输入开户行' }],
                    initialValue:formData.supply_bank
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span='8'>
          <a-form-item label="银行账号" v-bind="formItemLayout">
            <a-input
              placeholder="请输入银行账号"
              v-decorator="[
                  'supply_bank_account',
                  { 
                    rules: [{ required: true, message: '请输入银行账号' }],
                    initialValue:formData.supply_bank_account
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item label="是否为唯一供应商" v-bind="formItemLayout">
            {{formData.is_unique==1?'是':'否'}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="配送区域" :label-col="{ span:3 }" :wrapper-col="{ span:17 }">
      <a-table
        :columns="columns_area"
        :dataSource="formData.area_list"
        rowKey="area_key"
        :pagination="false"
      >
        <template slot-scope="text,record" slot="area_name">{{record.area_name}}</template>
        <template slot="region_list" slot-scope="text,record">
          <ul>
            <li v-for="item of record.region_list" :key="item.id">{{item.name}}</li>
          </ul>
        </template>
      </a-table>
    </a-form-item>
    <a-form-item label="配送要求" :label-col="{ span:3 }" :wrapper-col="{ span:17 }">
      根据合同甲方所定数量与时间（一般为订货时间起 
      <span style="color:#f00;margin:0 5px;">
        {{formData.order_times}}
      </span>
      小时内）送货。如遇合同甲方特殊情况需紧急订货的，商家应首先满足。
    </a-form-item>
    <h4 class="mt-10">商品信息</h4>
    <a-row>
      <a-col :span="6" :offset="1">采购类别：{{formData.bid_cat_name}}</a-col>
      <a-col :span="6" :offset="1">预计配送时间：{{formData.shipping_days}}天</a-col>
      <a-col :span="6" :offset="1">预估采购金额：{{formData.expert_money}}万元</a-col>
    </a-row>
    <a-table
      bordered
      class="mt-10"
      :columns="columns_stock_list"
      :dataSource="formData.stock_list"
      rowKey="stock_id"
      :pagination="pagination_shipping"
    >
      <template slot="note" slot-scope="text">
        <span class="line-wrap" :title="text">{{text}}</span>
      </template>
      <template
        v-for="item of formData.area_list"
        :slot="item.area_key"
        slot-scope="text,record"
      >
        <div :key="item.area_key">{{record.area_stock_number[record.area_stock_number.indexOfObj('area_key',item.area_key)].number}}</div>
      </template>
    </a-table>
      <h4 class="mt-30">合同</h4>
      <a-row>
        <a-col :span='8' :offset='1'>
          <span>合同期限：按送货量自动截止</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='23' :offset='1'>
          <a-form-item>
            合同保证金：合同签订时，乙方向甲方交纳合同保证金人民币
            <span class="ml-10 mr-10">
              {{formData.margin_money}}
            </span>
            元整，无违约情况，合同期满后无息退还。
          </a-form-item>
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
          <p>1. 乙方按照甲方各食堂所报数量及要求，按时送到各食堂指定地点（一般为订货时间起24小时内，生鲜类、紧急订货等甲方有特定需求的须首先满足）；</p>
          <p>2. 合同期内不调价；</p>
          <p>3. 甲方要求及甲乙方约定的产品规格、技术标准和其他性状要求等作为实际配送时的验收标准，国家法律法规、标准等规定的要求作为当然验收要求。</p>
        </a-col>
      </a-row>
      <h4 class="mt-10">售后服务</h4>
      <a-row>
        <a-form-item 
          label="供应商产品售后服务热线(固话)" 
          :label-col = "{ span: 6 }"
          :wrapper-col= "{ span: 18 }"
        >
          <a-input 
            placeholder="请输入供应商产品售后服务热线"
            v-decorator="[
                'supply_sales_phone',
                { 
                  rules: [{ required: true, message: '请输入供应商产品售后服务热线' }],
                  initialValue:formData.supply_sales_phone
                }
              ]"
            style="width: 180px;" 
          />
        </a-form-item>
        <a-form-item 
          label="供应商产品售后服务联系人姓名" 
          :label-col = "{ span: 6 }"
          :wrapper-col= "{ span: 18 }"
        >
          <a-input 
            placeholder="售后服务联系人姓名"
            v-decorator="[
                'supply_sales_name',
                { 
                  rules: [{ required: true, message: '售后服务联系人姓名' }],
                  initialValue:formData.supply_sales_name
                }
              ]"
            style="width: 180px;" 
          />
        </a-form-item>
        <a-form-item 
          label="手机" 
          :label-col = "{ span: 6 }"
          :wrapper-col= "{ span: 18 }"
        >
          <a-input 
            placeholder="售后服务联系手机"
            v-decorator="[
                'supply_sales_number',
                { 
                  rules: [{ required: true, message: '售后服务联系手机' },{whitespace:true},{validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}],
                  initialValue:formData.supply_sales_number
                }
              ]"
            style="width: 180px;" 
          />
        </a-form-item>
      </a-row>
      <a-row>
        <a-col :span='14' :offset='10'>
          <a-button type="primary" html-type="submit">更新合同</a-button>
        </a-col>
      </a-row>
    </section>
    <section class="content">
      <h4 class="mt-10">合同文件</h4>
      <a-row class="mt-10">
        <a-col :span='22' :offset='1'>
          在线合同：关于{{formData.title}}的合同({{formData.code}}).pdf
          <a href="javascript:;" @click="showContract">预览合同</a>
          <a href="javascript:;" @click="downloadContract">下载合同</a>
        </a-col>
      </a-row>
      <a-row class="mt-20">
        <a-col :span='4' :offset='1'>
          <a-button @click='confirm' type="primary">确认</a-button>
          <a-button @click='reject' type="primary">驳回</a-button>
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span='4' :offset='1'>
        <a-textarea
          placeholder="请输入驳回原因"
          :rows="4"
          v-model="remark">
        </a-textarea>
        </a-col>
      </a-row>
      <h4 class="mt-10">流转日志</h4>
      <a-row class="mt-10 ml-10">
        <a-steps progressDot :current="stepsCurrent" direction="vertical">
          <a-step v-for="(item,index) of formData.log_list||[]" :key="index" :title="item.create_time">
            <template slot="description">
              <div class="step-item">
                <span class="one">
                  {{item.supply_name||item.com_name}}
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
  </a-form>
</template>

<script>
import {
  get_bid_base_info, // 合同详情
  save_bid_scontract_info, // 添加编辑合同
  confirm_bid_scontract, // 确认
  reback_bid_scontract, // 退回
  showContract, // 预览
  downloadContract // 下载
} from '@admin/api/bidsContractSupply';
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
      code:'',
      stepsCurrent:0,
      formData:{},
      remark:'',
      status:'待确认',
      columns_area: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          align: "center",
          width: "6%"
        },
        {
          title: "片区名称",
          dataIndex: "area_name",
          scopedSlots: { customRender: "area_name" },
          width: "10%"
        },
        {
          title: "配送区域",
          dataIndex: "region_list",
          scopedSlots: { customRender: "region_list" },
          width: "10%"
        }
      ], // 分区table列数组
      columns_stock_list: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          align: "center",
          width: "6%"
        },
        {
          title: "商品名称",
          dataIndex: "stock_name",
          width: "10%"
        },
        {
          title: "品牌",
          dataIndex: "brand_name",
          width: "6%"
        },
        {
          title: "规格",
          dataIndex: "standard",
          width: "6%"
        },
        {
          title: "产品参数",
          dataIndex: "note",
          width: "6%",
          scopedSlots: { customRender: "note" }
        },
        {
          title: "采购单位",
          dataIndex: "price_unit_name",
          width: "6%"
        },
        {
          title: "预估采购数量",
          children: [],
          width: "50%"
        },
        {
          title: "单价（元）",
          dataIndex: "price",
          align:'center',
          width: "6%"
        }
      ],
      pagination_shipping: {
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"]
      },
    };
  },
  created() {
    this.code = this.$route.query.code;
    this.get_bid_base_info_method(this.code);
    this.father.selectedKeys = ['/Scontract/get_bid_scontract_list'];
  },
  methods: {
    vali_mobile(rule, value, callback) {
      if (value && /^1[3456789]\d{9}$/.test(value)) {
        callback(); // 校验通过
      } else if(value && !/^1[3456789]\d{9}$/.test(value)) {
        callback("请填入正确格式的手机号码"); // 校验未通过
      }else{
        callback(); // 校验未通过
      }
    },
    get_bid_base_info_method(code){
      get_bid_base_info({ code })
        .then(res => {
          var formData = res.data || [];
          this.columns_stock_list[6].children = [];
          formData.area_list.forEach(elem => {
            this.columns_stock_list[6].children.push({
              title: elem.area_name,
              dataIndex: elem.area_key,
              align: "center",
              scopedSlots: { customRender: elem.area_key },
              width: "6%"
            });
          });
          /* 插入合计列 */
          if (formData.area_list.length > 1) {
            this.columns_stock_list[6].children.push({
              title: "合计数量",
              align: "center",
              dataIndex: "number",
              width: "6%"
            });
          }
          this.stepsCurrent = formData.log_list.length;
          this.formData = formData;
        })
        .catch(error => this.$message.error(error));
    },
    handleSubmit(e) {
      var self = this;
      e.preventDefault();
      self.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue
          };
          save_bid_scontract_info(values).then(res=>{
            self.$message.success(res.msg);
          }).catch(error=>{
            self.$message.error(error)
          })
        }
      });
    },
    confirm(){
      var self = this;
      self.$confirm({
        title: '确认此合同？',
        onOk() {
          confirm_bid_scontract({code:self.formData.code}).then(res=>{
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
    reject(){
      var self = this;
      if(self.remark==''){
        self.$message.warn('请先输入驳回原因');
        return;
      }
      self.$confirm({
        title: '确定驳回此合同吗？',
        onOk() {
          reback_bid_scontract({code:self.formData.code,remark:self.remark}).then(res=>{
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
    showContract() {
      showContract(this.formData.code)
    },
    downloadContract() {
      downloadContract(this.formData.code)
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
@import '~@admin/assets/scss/steps-content';
#confirmContract{
  @include component;
  @include step-item;
  .textarea{
    display: block;
    @include horizontalCenter(30%);
  }
}
</style>