<template>
  <a-form id="add_contract" :form="form" @submit="handleSubmit">
    <h5>
      <span>合同管理 / 合同详情</span>
    </h5>
    <a-form-item class="button-container">
      <div align="center">
        <a-button @click="$router.go(-1)" class="ml">返回</a-button>
      </div>
    </a-form-item>
    <h3>
      <span>
        <span class="mr">合同编号：{{formData.code}}</span>
        <span class="ml">合同名称：{{formData.title}}</span>
      </span>
      <span class="status">状态：{{formData.status==1?'待起草':'待编辑'}}</span>
    </h3>
    <section class="content">
      <h4>基本信息</h4>
      <a-row hidden>
        <a-col :span="8">
          <a-form-item label="合同编号" v-bind="formItemLayout">
            <span
              v-decorator="[
                'code',
                {
                  initialValue:formData.code
                }
              ]"
            >{{formData.code}}</span>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="合同名称" v-bind="formItemLayout">
            <span
              v-decorator="[
                'title',
                {
                  initialValue:formData.title
                }
              ]"
            >{{formData.title}}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="采购项目编号" v-bind="formItemLayout">
            <span
              v-decorator="[
                'custom_code',
                {
                  initialValue:formData.custom_code
                }
              ]"
            >{{formData.custom_code}}</span>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="项目名称" v-bind="formItemLayout">
            <span
              v-decorator="[
                'custom_title',
                {
                  initialValue:formData.custom_title
                }
              ]"
            >{{formData.custom_title}}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="甲方(采购单位)" v-bind="formItemLayout">
            <span
              v-decorator="[
                'com_name',
                {
                  initialValue:formData.com_name
                }
              ]"
            >{{formData.com_name}}</span>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="合同签约地" v-bind="formItemLayout">
            <span>杭州</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="联系人" v-bind="formItemLayout">
            <a-input
              placeholder="请输入联系人"
              v-decorator="[
                  'contact_name',
                  { 
                    rules: [{ required: true, message: '请输入联系人' }],
                    initialValue:formData.contact_name
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="联系电话" v-bind="formItemLayout">
            <a-input
              placeholder="请输入联系电话"
              v-decorator="[
                  'contact_number',
                  { 
                    rules: [{ required: true, message: '请输入联系电话' }],
                    initialValue:formData.contact_number
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="电子邮箱" v-bind="formItemLayout">
            <a-input
              placeholder="请输入电子邮箱"
              v-decorator="[
                  'email',
                  { 
                    rules: [{ required: true, type:'email',message: '请输入电子邮箱' }],
                    initialValue:formData.email
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="详细地址" v-bind="formItemLayout">
            <a-input
              placeholder="请输入详细地址"
              v-decorator="[
                  'address',
                  { 
                    rules: [{ required: true, message: '请输入详细地址' }],
                    initialValue:formData.address
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="传真" v-bind="formItemLayout">
            <a-input
              placeholder="请输入传真"
              v-decorator="[
                  'fax',
                  { 
                    rules: [{ required: true, message: '请输入传真' }],
                    initialValue:formData.fax
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="开户行" v-bind="formItemLayout">
            <a-input
              placeholder="请输入开户行"
              v-decorator="[
                  'bank',
                  { 
                    rules: [{ required: true, message: '请输入开户行' }],
                    initialValue:formData.bank
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="银行账号" v-bind="formItemLayout">
            <a-input
              placeholder="请输入银行账号"
              v-decorator="[
                  'bank_account',
                  { 
                    rules: [{ required: true, message: '请输入银行账号' }],
                    initialValue:formData.bank_account
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="乙方(供应商名称)" v-bind="formItemLayout">{{formData.supply_name}}</a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="供应商地址" v-bind="formItemLayout">{{formData.supply_address}}</a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="电子邮箱" v-bind="formItemLayout">
            <a-input disabled :value="formData.supply_email"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="联系电话" v-bind="formItemLayout">
            <a-input disabled :value="formData.supply_contact_number"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="传真" v-bind="formItemLayout">
            <a-input disabled :value="formData.supply_fax"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item label="开户行" v-bind="formItemLayout">
            <a-input disabled :value="formData.supply_bank"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="银行账号" v-bind="formItemLayout">
            <a-input disabled :value="formData.supply_bank_account"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8'>
          <a-form-item label="是否为唯一供应商" v-bind="formItemLayout">
            <a-radio-group 
            v-decorator="[
                'is_unique',
                {
                  rules: [{ required: true }],
                  initialValue:formData.is_unique
                }
              ]"
            >
              <a-radio value="1">是</a-radio>
              <a-radio value="0">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <contract-components 
        ref='contract'
        :formData='formData' 
        >
        <template #margin_money>
          <a-row>
            <a-col :span="23" :offset="1">
              <a-form-item>
                合同保证金：合同签订时，乙方向甲方交纳合同保证金人民币
                <a-input
                  style="width: 100px;"
                  class="pl-10 mr-10"
                  placeholder
                  v-decorator="[
                    'margin_money',
                    {
                      rules: [{ required: true ,message: '请输入合同保证金' }],
                      initialValue:formData.margin_money
                    }
                  ]"
                />元整，无违约情况，合同期满后无息退还。
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <template #supply_sales>
          <h4 class="mt-10">售后服务</h4>
          <a-row>
            <a-form-item label="供应商产品售后服务热线(固话)" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input disabled :value="formData.supply_sales_phone" style="width: 180px;" />
            </a-form-item>
            <a-form-item label="供应商产品售后服务联系人姓名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input disabled :value="formData.supply_sales_name" style="width: 180px;" />
            </a-form-item>
            <a-form-item label="手机" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input disabled :value="formData.supply_sales_number" style="width: 180px;" />
            </a-form-item>
          </a-row>
        </template>
      </contract-components>
      <h4 class="mt-10">合同文件</h4>
      <a-row class="mt-10">
        <a-col :span="22" :offset="1">
          在线合同：关于{{formData.title}}的采购合同({{formData.code}}).pdf
          <a
            href="javascript:;"
            @click="showContract"
          >预览合同</a>
          <a href="javascript:;" @click="downloadContract">下载合同</a>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22" :offset="1">
          <p>
            请{{formData.status==1?'生成':'编辑'}}合同
            <a-button type="primary" html-type="submit">{{formData.status==1?'保存':'更新'}}合同</a-button>
            <!-- <a-button type="primary" @click="submit">提交合同</a-button> -->
            <a-tooltip placement="top" class="tooltip">
              <template slot="title">
                <p>合同附件中包括：</p>
                <p>1. 廉政协议；</p>
                <p>2. 食品安全承诺书；</p>
                <p>3. 质量服务承诺书；</p>
                <p>4. 经双方确认的供应品种、价格</p>
              </template>
              <span>
                <a-icon type="info-circle" />
              </span>
            </a-tooltip>
          </p>
        </a-col>
      </a-row>
    </section>
  </a-form>
</template>

<script>
import {
  get_bid_base_info, // 合同详情
  save_bid_contract_info // 添加编辑合同
} from "@admin/api/bidsContract";
export default {
  components: {
    contractComponents: () => import("@admin/components/contract_component")
  },
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 }
      },
      code: "",
      formData: {},
    };
  },
  created() {
    this.code = this.$route.query.code;
    this.get_bid_base_info_method(this.code);
    this.father.selectedKeys = ["/Contract/get_bid_contract_list"];
  },
  methods: {
    get_bid_base_info_method(code) {
      get_bid_base_info({ code })
        .then(res => {
          var formData = res.data || [];
          this.$refs['contract'].columns_stock_list[6].children = [];
          formData.area_list.forEach(elem => {
            this.$refs['contract'].columns_stock_list[6].children.push({
              title: elem.area_name,
              dataIndex: elem.area_key,
              align: "center",
              scopedSlots: { customRender: elem.area_key },
              width: "6%"
            });
          });
          /* 插入合计列 */
          if (formData.area_list.length > 1) {
            this.$refs['contract'].columns_stock_list[6].children.push({
              title: "合计数量",
              align: "center",
              dataIndex: "number",
              width: "10%"
            });
          }
          this.formData = formData;
        })
        .catch(error => this.$message.error(error));
    },
    showContract() {
      open(
        this.global.baseUrl +
          "?c=Pcontract&a=pre_view&code=" +
          this.formData.code
      );
    },
    downloadContract() {
      open(
        this.global.baseUrl +
          "?c=Pcontract&a=download&code=" +
          this.formData.code
      );
    },
    handleSubmit(e) {
      var self = this;
      e.preventDefault();
      self.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue
          };
          console.log(values)
          save_bid_contract_info(values)
            .then(res => {
              self.$message.success(res.msg);
              let time = setTimeout(() => {
                self.$router.go(-1);
                clearTimeout(time);
              }, 1500);
            })
            .catch(error => {
              self.$message.error(error);
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#add_contract {
  @include component;
}
</style>