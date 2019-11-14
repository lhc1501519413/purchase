<template>
  <a-form id="manageBaseInfo" :form="form" @submit="handleSubmit">
    <a-row class="first-row">
      <a-col :span="20">
        <span class="title">供应商基本信息</span>
      </a-col>
      <a-col :span="4">
        <a-form-item>
          <a-button type="primary" @click="change_edit_read" v-show="edit_read&&father.status!='1'" html-type="button">编辑</a-button>
          <a-button class="cancel" @click="change_edit_read" v-show="!edit_read" html-type="button">取消</a-button>
          <a-button type="primary" html-type="submit" v-show="!edit_read">保存</a-button>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row style="margin-top:20px;">
      <a-col :span="11">
        <a-form-item label="公司全称：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.supply_name}}</span>
          <a-input
            readOnly
            v-show="!edit_read"
            placeholder="请输入公司全称"
            v-decorator="[
          'name',
          { rules: [{ required: true, message: '公司全称必填' }],initialValue:formData.supply_name }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="英文名称：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.en_name}}</span>
          <a-input placeholder="请输入英文名称" v-show="!edit_read" v-decorator="[
          'en_name',{initialValue:formData.en_name}
        ]"></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="公司简称：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.simple_name}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入公司简称"
            v-decorator="[
          'simple_name',
          { rules: [{ required: true, message: '公司简称必填' }],initialValue:formData.simple_name }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="公司曾用名：" v-bind="formItemLayout" :help="edit_read?'':'如有多个曾用名，请用“，”分割'">
          <span v-show="edit_read">{{formData.used_name}}</span>
          <a-input placeholder="请输入公司曾用名" v-show="!edit_read" v-decorator="[
          'used_name',{initialValue:formData.used_name }
        ]"></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item
          label="公司logo："
          v-bind="formItemLayout"
          :help="edit_read?'':'请上传公司标识或者公司外观拍照,图片大小为20M以内，格式为jpg/png'"
        >
        <div v-show="edit_read" :class="{container:edit_read&&formData.imageUrl}">
          <img class="upload-img" :src="formData.full_logo" v-show="formData.full_logo" alt="logoread">
        </div>
          <a-upload
            v-if="!edit_read"
            name="file"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :customRequest="customRequest"
            :beforeUpload="beforeUpload"
            :fileList="fileList"
            v-decorator="[
              'logo2'
            ]"
          >
            <img class="upload-img" v-if="formData.full_logo" :src="formData.full_logo" alt="logoedit" />
            <div v-else>
              <a-icon type="plus" />
            </div>
          </a-upload>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="公司地址：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.area_detail}}</span>
          <a-cascader
            v-show="!edit_read"
            :fieldNames="{ label: 'name', value: 'id', children: 'child' }"
            placeholder="请输入公司地址"
            :options="addr_options"
            v-decorator="[
          'address_ids',
          { rules: [{ required: true, message: '公司地址必填' }],initialValue:formData.address_ids}
        ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="公司地址详情：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.address}}</span>
          <a-textarea
            v-show="!edit_read"
            placeholder="请输入公司地址详情"
            :rows="4"
            v-decorator="[
            'address',
            { rules: [{ required: true, message: '公司地址详情必填' }],initialValue:formData.address }
          ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            营业执照登记机关所在地
            <a-tooltip placement="top" class="tooltip">
              <template slot="title">
                <span>请查询营业执照右下角登记机关所在地（公章所示机构所在地），填写时请按照所在地所示的详细区县准确填写</span>
              </template>
              <span>
                <svg-icon class="svg" icon-class="help" />
              </span>
            </a-tooltip>
          </span>
          <span v-show="edit_read">{{formData.register_area_detail}}</span>
          <a-cascader
            v-show="!edit_read"
            :fieldNames="{ label: 'name', value: 'id', children: 'child' }"
            placeholder="请选择营业执照登记机关所在地"
            :options="addr_options"
            v-decorator="[
          'register_address_ids',
          { rules: [{ required: true, message: '营业执照登记机关所在地必填' }],initialValue:formData.register_address_ids}
        ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="邮编：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.postcode}}</span>
          <a-input
          v-show="!edit_read"
            placeholder="请输入邮编"
            v-decorator="[
          'postcode',
          { rules: [{ required: true, message: '邮编必填' }],initialValue:formData.postcode }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="网站：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.website}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入网站"
            v-decorator="[
          'website',{initialValue:formData.website}
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="公司成立日期：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.found_date}}</span>
          <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
          <a-date-picker
            v-show="false"
            placeholder="请选择公司成立日期"
            v-decorator="[
          'found_date',
          { rules: [{ type: 'object',required: true, message: '公司成立日期必填' }] }
        ]"
          />
          <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
          <a-date-picker
          v-if="!formData.found_date && !edit_read"
            placeholder="请选择公司成立日期"
            v-decorator="[
          'found_date',
          { rules: [{ type: 'object',required: true, message: '公司成立日期必填' }] }
        ]"
          />
          <a-date-picker
          v-if="formData.found_date && !edit_read"
            placeholder="请选择公司成立日期"
            v-decorator="[
          'found_date',
          { rules: [{ type: 'object',required: true, message: '公司成立日期必填' }],initialValue:$moment(formData.found_date) }
        ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            对外联系电话
            <a-tooltip placement="top" class="tooltip">
              <template slot="title">
                <span>对外联系电话可能用于公示环节对社会公开，请谨慎填写个人手机号码等非对外联系电话，以避免个人信息泄露。</span>
              </template>
              <span>
                <svg-icon class="svg" icon-class="help" />
              </span>
            </a-tooltip>
          </span>
          <span v-show="edit_read">{{formData.out_contact}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入对外联系电话"
            v-decorator="[
          'out_contact',
          { rules: [{ required: true, message: '对外联系电话必填' },{whitespace:true},{validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}],initialValue:formData.out_contact }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="企业电子邮箱：" v-bind="formItemLayout" :help="edit_read?'':'企业电子邮箱'">
          <span v-show="edit_read">{{formData.email}}</span>
          <a-input
          v-show="!edit_read"
            placeholder="请输入企业电子邮箱"
            v-decorator="[
              'email',
              { rules: [{ type: 'email', message: '输入邮箱格式错误'}],initialValue:formData.email }
            ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="企业传真号码：" v-bind="formItemLayout" :help="edit_read?'':'格式如：xxxx-xxxxxxxx'">
          <span v-show="edit_read">{{formData.fax}}</span>
          <a-input
          v-show="!edit_read"
            placeholder="请输入企业传真号码"
            v-decorator="[
          'fax',{initialValue:formData.fax}
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="开户银行：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.bank}}</span>
          <a-input
          v-show="!edit_read"
            placeholder="请输入开户银行"
            v-decorator="[
          'bank',
          { rules: [{ required: true, message: '开户银行必填' }],initialValue:formData.bank }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="银行账号：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.bank_account}}</span>
          <a-input
          v-show="!edit_read"
            placeholder="请输入银行账号"
            v-decorator="[
          'bank_account',
          { rules: [{ required: true, message: '银行账号必填' }],initialValue:formData.bank_account }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="联系人姓名：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.contact_name}}</span>
          <a-input
          v-show="!edit_read"
            placeholder="请输入联系人姓名"
            v-decorator="[
          'contact_name',
          { rules: [{ required: true, message: '联系人姓名必填' }],initialValue:formData.contact_name }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="联系人电话：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.contact_phone}}</span>
          <a-input
          v-show="!edit_read"
            placeholder="请输入联系人电话"
            v-decorator="[
          'contact_phone',
          { rules: [{ required: true, message: '联系人电话必填' }],initialValue:formData.contact_phone }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="企业性质" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.biz_nature_name}}</span>
          <a-tree-select
            v-show="!edit_read"
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="biz_nature"
            placeholder="请选择企业性质"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'biz_nature_id',
          { rules: [{ required: true, message: '请选择企业性质' }],initialValue:formData.biz_nature_id }
        ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="供应类别" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.cat_names}}</span>
          <!-- <a-tree-select
          v-show="!edit_read"
            :treeCheckable="true"
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="category"
            placeholder="请选择供应类别"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'cat_ids',
          { rules: [{ required: true, message: '请选择供应类别' }],initialValue:formData.cat_ids }
        ]"
          /> -->
          <a-tree-select
            v-show="!edit_read"
            allowClear
            multiple
            treeDefaultExpandAll
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            dropdownMatchSelectWidth
            treeNodeLabelProp="label"
            :treeData="category"
            @change="onChange"
            placeholder="请选择供应类别"
            v-decorator="[
              'cat_ids',
              { rules: [{ required: true, message: '请选择供应类别' }],initialValue:formData.cat_ids }
            ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="企业规模" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.biz_scale_name}}</span>
          <a-tree-select
          v-show="!edit_read"
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="biz_scale"
            placeholder="请选择企业规模"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'biz_scale_id',
          { rules: [{ required: true, message: '请选择企业规模' }],initialValue:formData.biz_scale_id }
        ]"
          />
          <span v-show="!edit_read" @click="show_modal" style="color:#3177fd;margin-left:10px;" class="pointer">查看参考标准</span>
        </a-form-item>
      </a-col>
      <!-- <a-col :span="11">
        <a-form-item label="供应商类型" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.supply_type}}</span>
          <a-tree-select
          v-show="!edit_read"
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="supply_type"
            placeholder="请选择供应商类型"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'supply_type_id',
          { rules: [{ required: true, message: '请选择供应商类型' }],initialValue:formData.supply_type_id }
        ]"
          />
        </a-form-item>
      </a-col> -->
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-item label="是否上市：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.is_listed|is_listed_filter}}</span>
          <a-radio-group
            v-show="!edit_read"
            name="radioGroup"
            v-decorator="[
          'is_listed',
          { initialValue:formData.is_listed }
        ]"
          >
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="公司介绍：" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.desc}}</span>
          <a-textarea
          v-show="!edit_read"
            placeholder="请输入公司介绍"
            :rows="4"
            v-decorator="[
            'desc',
            { rules: [{ required: true, message: '公司介绍必填' }],initialValue:formData.desc }
          ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-modal centered :visible="visible" @cancel="handleCancel" :footer="null" :width="980">
      <template slot="title">
        <div align="center">
          <svg-icon class="svg" icon-class="attention" />
          <h3>查看参考标准</h3>
        </div>
      </template>
      <p>一）农、林、牧、渔业。营业收入20000万元以下的为中小微型企业。其中，营业收入500万元及以上的为中型企业，营业收入50万元及以上的为小型企业， 营业收入50万元以下的为微型企业。</p>
      <p>二）工业。从业人员1000人以下或营业收入40000万元以下的为中小微型企业。其中，从业人员300人及以上，且营业收入2000万元及以上的为中型企业； 从业人员20人及以上，且营业收入300万元及以上的为小型企业；从业人员20人以下或营业收入300万元以下的为微型企业。</p>
      <p>三）建筑业。营业收入80000万元以下或资产总额80000万元以下的为中小微型企业。其中，营业收入6000万元及以上，且资产总额5000万元及以上的为中型企业； 营业收入300万元及以上，且资产总额300万元及以上的为小型企业；营业收入300万元以下或资产总额300万元以下的为微型企业。</p>
      <p>四）批发业。从业人员200人以下或营业收入40000万元以下的为中小微型企业。其中，从业人员20人及以上，且营业收入5000万元及以上的为中型企业； 从业人员5人及以上，且营业收入1000万元及以上的为小型企业；从业人员5人以下或营业收入1000万元以下的为微型企业。</p>
      <p>五）零售业。从业人员300人以下或营业收入20000万元以下的为中小微型企业。其中，从业人员50人及以上，且营业收入500万元及以上的为中型企业； 从业人员10人及以上，且营业收入100万元及以上的为小型企业；从业人员10人以下或营业收入100万元以下的为微型企业。</p>
      <p>六）交通运输业。从业人员1000人以下或营业收入30000万元以下的为中小微型企业。其中，从业人员300人及以上，且营业收入3000万元及以上的为中型企业； 从业人员20人及以上，且营业收入200万元及以上的为小型企业；从业人员20人以下或营业收入200万元以下的为微型企业。</p>
      <p>七）仓储业。从业人员200人以下或营业收入30000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入1000万元及以上的为中型企业； 从业人员20人及以上，且营业收入100万元及以上的为小型企业；从业人员20人以下或营业收入100万元以下的为微型企业。</p>
      <p>八）邮政业。从业人员1000人以下或营业收入30000万元以下的为中小微型企业。其中，从业人员300人及以上，且营业收入2000万元及以上的为中型企业； 从业人员20人及以上，且营业收入100万元及以上的为小型企业；从业人员20人以下或营业收入100万元以下的为微型企业</p>
      <p>九）住宿业。从业人员300人以下或营业收入10000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入2000万元及以上的为中型企业； 从业人员10人及以上，且营业收入100万元及以上的为小型企业；从业人员10人以下或营业收入100万元以下的为微型企业。</p>
      <p>十）餐饮业。从业人员300人以下或营业收入10000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入2000万元及以上的为中型企业； 从业人员10人及以上，且营业收入100万元及以上的为小型企业；从业人员10人以下或营业收入100万元以下的为微型企业。</p>
      <p>十一）信息传输业。从业人员2000人以下或营业收入100000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入1000万元及以上的为中型企业； 从业人员10人及以上，且营业收入100万元及以上的为小型企业；从业人员10人以下或营业收入100万元以下的为微型企业。</p>
      <p>十二）软件和信息技术服务业。从业人员300人以下或营业收入10000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入1000万元及以上的为中型企业； 从业人员10人及以上，且营业收入50万元及以上的为小型企业；从业人员10人以下或营业收入50万元以下的为微型企业。</p>
      <p>十三）房地产开发经营。营业收入200000万元以下或资产总额10000万元以下的为中小微型企业。其中，营业收入1000万元及以上， 且资产总额5000万元及以上的为中型企业；营业收入100万元及以上，且资产总额2000万元及以上的为小型企业； 营业收入100万元以下或资产总额2000万元以下的为微型企业。</p>
      <p>十四）物业管理。从业人员1000人以下或营业收入5000万元以下的为中小微型企业。其中，从业人员300人及以上，且营业收入1000万元及以上的为中型企业； 从业人员100人及以上，且营业收入500万元及以上的为小型企业；从业人员100人以下或营业收入500万元以下的为微型企业。</p>
      <p>十五）租赁和商务服务业。从业人员300人以下或资产总额120000万元以下的为中小微型企业。其中，从业人员100人及以上，且资产总额8000万元及以上的为中型企业； 从业人员10人及以上，且资产总额100万元及以上的为小型企业；从业人员10人以下或资产总额100万元以下的为微型企业。</p>
      <a-button type="primary" style="margin:1rem 0 0 48%;" @click="handleCancel">确定</a-button>
    </a-modal>
  </a-form>
</template>

<script>
import {
  POST,
  all_city,
  // all_supply_type,
  all_category,
  all_biz_nature,
  all_biz_scale
} from "@common/js/apis.js";
import { 
  get_base_info,
  save_basic_info
} from "@admin/api/baseInfo";

export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 }
      },
      edit_read:true,
      formData: {
        supply_name: "",
        en_name: "",
        simple_name: "",
        used_name: "",
        imageUrl: "",
        savepath:"",
        address_ids: [],
        area_detail: '',
        register_address_ids: [],
        register_area_detail: '',
        address: "",
        postcode: "",
        website: "",
        found_date: null,
        out_contact: "",
        email: "",
        fax: "",
        bank: "",
        bank_account: "",
        contact_name: "",
        contact_phone: "",
        // supply_type_id: "",
        // supply_type: "",
        cat_ids: [],
        cat_names: "",
        biz_nature_id: "",
        biz_nature_name: "",
        biz_scale_id: "",
        biz_scale_name: "",
        is_listed: 1,
        desc: ""
      },
      addr_options: [],
      // supply_type: [],
      value: [],
      category: [],
      biz_nature: [],
      biz_scale: [],
      fileList:[],
      visible: false
    };
  },
  props:['father','grand'],
  filters:{
    is_listed_filter:function(value){
      switch (value) {
        case 1:
          return "是";
          break;
        case 0:
          return "否";
          break;
      }
    }
  },
  created() {
    this.grand.selectedKeys = ['basic_info'];
    get_base_info().then(res=>{
      this.formData = res.data.base_info;
      this.formData.extend(res.data.extend_info);
      this.formData.found_date = res.data.base_info.found_date;
      this.formData.is_listed = +res.data.base_info.is_listed;
      
      this.formData.address_ids = check_ids(res.data.base_info.address_ids);
      this.formData.register_address_ids = check_ids(res.data.base_info.register_address_ids);
      this.get_tree_datas();
      function check_ids(param){
        param = param||[];
        param.forEach(elem=>{
          if(elem == 0){
            return null
          }
        })
        return param
      }
    })
    this.father.activeKey = 'basic_info';
    this.father.BreadcrumbTwo = '基本信息';
  },
  methods: {
    result(addr,data){
      var address = "";
      if(typeof addr === 'string'){
        let key = data.indexOfObj("id",addr);
        if(key==-1){
          key = data.indexOfObj("type_id",addr);
        }
        address = data[key].name||data[key].type_name;
        address += "，";
      }else{
        for(let i=0;i<addr.length;i++){
          if(!addr[i]) return '';
          let key = data.indexOfObj("id",addr[i]);
          if(key==-1){
            key = data.indexOfObj("type_id",addr[i]);
          }
          address += data[key].name ||data[key].type_name;
          address += "，";
          if(data[key].name){
            data=data[key].child
          }
        }
      }
      return address.slice(0,-1)
    },
    get_tree_datas() {
      all_city()
        .then(res => {
          this.addr_options = res.data;
          // this.formData.address_title = this.result(this.formData.address_ids,this.addr_options);
          // this.formData.register_address_title = this.result(this.formData.register_address_ids,this.addr_options);
        }).catch(error=>{
          this.$message.warn(error)
        })
      // all_supply_type()
      //   .then(res => {
      //     this.supply_type = this.$common.treeSelectFormat(res.data);
      //     this.formData.supply_type = this.result(this.formData.supply_type_id,this.supply_type);
      //   }).catch(error=>{
      //     this.$message.warn(error)
      //   })
      all_category()
        .then(res => {
          this.category = this.$common.treeSelectFormat(res.data);
          this.add_child(this.category)
          let cat_ids = this.formData.cat_ids||[];
          cat_ids.forEach(elem=>{
            let index = this.category.indexOfObj('value',elem.slice(0,-2));
            this.category[index].children.forEach(elem2=>{
              if(elem2.value!==elem)elem2.disabled = true;
            })
          })
        }).catch(error=>{
          this.$message.warn(error)
        })
      all_biz_nature()
        .then(res => {
          this.biz_nature = this.$common.treeSelectFormat(res.data);
          // this.formData.biz_nature = this.result(this.formData.biz_nature_id,this.biz_nature);
        }).catch(error=>{
          this.$message.warn(error)
        })
      all_biz_scale()
        .then(res => {
          this.biz_scale = this.$common.treeSelectFormat(res.data);
          // this.formData.biz_scale = this.result(this.formData.biz_scale_id,this.biz_scale);
        }).catch(error=>{
          this.$message.warn(error)
        })
    },
    get_base_info_two(){ // 保存成功后重新获取  不需要再进行其他数据的请求，
      get_base_info().then(res=>{
        this.formData = res.data.base_info;
        this.formData.extend(res.data.extend_info);
        this.formData.found_date = res.data.base_info.found_date;
        this.formData.is_listed = +res.data.base_info.is_listed;
        // this.formData.address_title = this.result(this.formData.address_ids,this.addr_options);
        // this.formData.register_address_title = this.result(this.formData.register_address_ids,this.addr_options);
        // this.formData.supply_type = this.result(this.formData.supply_type_id,this.supply_type);
        // this.formData.cat = this.result(this.formData.cat_ids,this.category);
        // this.formData.biz_nature = this.result(this.formData.biz_nature_id,this.biz_nature);
        // this.formData.biz_scale = this.result(this.formData.biz_scale_id,this.biz_scale);
      })
    },
    change_edit_read(){
      this.edit_read = !this.edit_read;
      this.form.resetFields();
    },
    vali_mobile(rule, value, callback) {
      if (value && !/^1[3456789]\d{9}$/.test(value)) {
        this.yzm_disabled = !0;
        callback("请填入正确格式的手机号码"); // 校验未通过
      } else {
        this.yzm_disabled = false;
        callback(); // 校验未通过
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            found_date:fieldsValue['found_date'].format('YYYY-MM-DD'),
            cat_ids:fieldsValue['cat_ids'].join(","),
            // address_ids:fieldsValue['address_ids'].join(","),
            // register_address_ids:fieldsValue['register_address_ids'].join(","),
            logo:this.formData.savepath||this.formData.logo
          }
          save_basic_info(values)
            .then(res => {
              this.father.main_base_list();
              this.$message.success('保存成功');
              this.change_edit_read();
              this.get_base_info_two();
              this.father.main_base_list();
              this.father.apply_info2();
            })
            .catch(error => {
              this.$message.warn(error);
            });
        }
      });
    },
    customRequest (data) {
      const formData = new FormData()
      formData.append('file', data.file)
      POST({'c':'Upload',a:'upload_one'},formData).then((res) => {
        this.formData.full_logo = res.data.img_url;
        this.formData.savepath= res.data.savepath;
      }).catch(error=>{
          this.$message.warn(error)
        })
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.$message.error("您只可以上传JPG或PNG格式的文件");
      }
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("图片大小必须小于 20MB!");
      }
      return isJPG && isLt2M;
    },
    show_modal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    onChange(value) {
      this.category.forEach(elem=>{
        elem.children.forEach(elem2=>{
          elem2.disabled=false;
        })
      })
      this.value = value;
      value.forEach(elem=>{
        let index = this.category.indexOfObj('value',elem.slice(0,-2));
        this.category[index].children.forEach(elem2=>{
          if(elem2.value!==elem)elem2.disabled = true;
        })
      })
    },
    add_child(list){
      list.forEach(elem=>{
        elem.selectable = false;
        elem.disableCheckbox = false;
        elem.children = [
          {
            value:elem.value+'-1',
            title:'生产商',
            label:elem.title+'-生产商',
          },
          {
            value:elem.value+'-2',
            title:'经销商',
            label:elem.title+'-经销商',
          },
        ]
      })
      this.category = list;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/baseInfoManage/baseInfo";
</style>
<style lang="scss">
</style>