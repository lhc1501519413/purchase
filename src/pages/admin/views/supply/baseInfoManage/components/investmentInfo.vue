<template>
  <div id="investment">
    <a-form :form="form1" @submit="handleSubmit1">
      <a-row class="first-row">
        <div class="title mb-10">
          出资情况
          <span class="help">
            注：如果供应商是非个体工商户，必须上传公司章程（或验资报告），或合伙协议；如果供应商是个体工商户，可以上传情况说明
          </span>
        </div>
        <a-form-item label="附件" 
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-upload
            v-if="!edit_read"
            :showUploadList="false"
            :customRequest="customRequest1"
            :beforeUpload="beforeUpload"
            v-decorator="[
          'investment_file_path',
          { rules: [{ required: true, message: '请选择附件' }],initialValue:formData1.file_path }
        ]"
          >
            <a-button>
              <a-icon type="upload" />上传
            </a-button>
            <ul>
              <li
                @click.stop="del1"
                class="file-list-item"
                v-for="(item,index) of formData1.file_path"
                :key="index"
              >
                <svg-icon class="wenjian" icon-class="wenjian" />
                <span>{{item.file_name}}</span>
                <svg-icon :data-key="index" class="del" icon-class="del" />
              </li>
            </ul>
          </a-upload>
        </a-form-item>
        <a-form-item label="注册资本"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-input
          @blur="set_investment_fund_method"
            placeholder="请输入注册资本"
            v-decorator="[
        'total_fund',
        { rules: [{ required: true, message: '请输入注册资本' }],initialValue:formData1.total_fund}
      ]"
          /> 万元
        </a-form-item>
        <a-form-item label="实缴资本"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-input
          @blur="set_investment_actual_fund_method"
            placeholder="请输入实缴资本"
            v-decorator="[
        'actual_total_fund',
        { rules: [{ required: true, message: '请输入实缴资本' }],initialValue:formData1.actual_total_fund}
      ]"
          /> 万元
        </a-form-item>
      </a-row>
      <a-row class="second-row">
        <a-col :span="21">
          <span class="title">出资人列表</span>
        </a-col>
        <a-col :span="3">
          <a-button type="primary" html-type="submit">新增</a-button>
        </a-col>
      </a-row>
    </a-form>
  <a-table :dataSource="investment_list" :columns="columns" :pagination="false">
      <template slot="name" slot-scope="text, record">
        <span @click="show_edit_read(record.key,true)" class="nature-type">{{record.name}}</span>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a @click="show_edit_read(record.key,false)" href="javascript:;">编辑</a>
        <a @click="on_delete(record.key,record.id)" href="javascript:;">删除</a>
      </template>
    </a-table>
    <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    <a-modal
      :destroyOnClose="true"
      style="top: 15%"
      width="50%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="() => setModalVisible(false)"
      @cancel="() => setModalVisible(false)"
    >
      <template slot="title">
        <h3 align="center">新增出资人</h3>
      </template>
      <a-form :form="form2" @submit="handleSubmit2">
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            出资人类型
            <a-tooltip placement="top" class="tooltip">
              <template slot="title">
                <p>
                  1、如果供应商是非个体工商户，请根据公司章程（或验资报
                  告），或合伙协议中列明的出资人选择出资人类型。 如果出
                  资人是企业、事业单位、社会团体等，选择相应类型的法人；
                  如果出资人是合伙企业，选择合伙企业；如果出资人是自然
                  人，选择自然人。
                </p>
                <p>
                  2、如果供应商是个体工商户，出资人类型选择自然人。
                </p>
              </template>
              <span>
                <svg-icon style="width:17px;height:17px;margin:0;" class="svg" icon-class="help" />
              </span>
            </a-tooltip>
          </span>
          <span v-show="edit_read">{{formData.investor_type_name}}</span>
          <a-tree-select
            v-show="!edit_read"
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="investor_type_list"
            placeholder="请选择出资人类型"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'investor_type',
          { rules: [{ required: true, message: '请选择出资人类型' }],initialValue:formData.investor_type }
        ]"
          />
        </a-form-item>
        <a-form-item label="出资人全称" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.name}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入出资人全称"
            v-decorator="[
        'name',
        { rules: [{ required: true, message: '请输入出资人全称' }],initialValue:formData.name}
      ]"
          />
        </a-form-item>
      <a-row>
        <a-col :span="12">
          <a-form-item label="注册资本" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <span
              v-show="edit_read"
              class="register_fund"
            >{{formData.fund}} {{formData.fund_unit_name}} {{formData.money_type_name}}</span>
            <a-input
              placeholder="请输入注册资本"
              v-show="!edit_read"
              v-decorator="[
          'fund',{rules: [{ required: true, message: '请输入注册资本' }],initialValue:formData.fund}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="3" :offset="1">
          <a-form-item>
            <a-select
              @change="fund_unit_change"
              v-show="!edit_read"
              style="width: 90%;"
              v-decorator="['fund_unit',{initialValue:formData.fund_unit}]"
            >
              <a-select-option value="1">万</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6" :offset="0">
          <a-form-item>
            <a-select
              @change="money_type_change"
              v-show="!edit_read"
              style="width: 90%;"
              v-decorator="['money_type',{initialValue:formData.money_type}]"
            >
              <a-select-option
                v-for="item of money_type_list"
                :key="item.code"
                :value="item.code"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
        <a-form-item label="出资比例" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.fund_rat}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入出资比例"
            v-decorator="[
        'fund_rat',
        { rules: [{ required: true, message: '请输入出资比例' },{validator:(rule, value, callback) => this.vali_fund_rat(rule, value, callback)}],initialValue:formData.fund_rat}
      ]"
          />
          <span style="margin-left:10px;">%</span>
        </a-form-item>
        <a-form-item label="出资时间" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.investment_date}}</span>
          <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
          <a-date-picker
            v-show="false"
            v-decorator="[
              'investment_date',
              { rules: [{ type: 'object',required: true }] }
            ]"
          />
          <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
          <a-date-picker
            v-if="!formData.investment_date && !edit_read"
            placeholder="请选择出资时间"
            v-decorator="[
              'investment_date',
              { rules: [{ type: 'object',required: true, message: '请输入资质有效开始时间' }] }
            ]"
          />
          <a-date-picker
            v-if="formData.investment_date && !edit_read"
            placeholder="请选择出资时间"
            v-decorator="[
              'investment_date',
              { rules: [{ type: 'object',required: true, message: '请输入资质有效开始时间' }],initialValue:$moment(formData.investment_date) }
            ]"
          />
        </a-form-item>
        <a-form-item label="备注" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.remark}}</span>
          <a-textarea
            v-show="!edit_read"
            placeholder="请输入备注"
            :rows="4"
            v-decorator="[
            'remark',
            { initialValue:formData.remark }
          ]"
          />
        </a-form-item>
        <a-form-item v-show="!edit_read">
          <div align="center">
            <a-button @click="()=>setModalVisible(false)">取消</a-button>
            <a-button type="primary" html-type="submit">确定</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { POST,money_type,investor_type } from "@common/js/apis.js";
import {
  get_investment_base_info,
  get_investment_list,
  get_investment_info,
  set_investment_file_list,
  set_investment_fund,
  set_investment_actual_fund,
  save_investment_list,
  del_investment_list,
} from "@admin/api/baseInfo";

export default {
  data() {
    return {
      money_type_list:[],
      investor_type_list:[],
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      formData1: {
        file_path: [], // 附件路径
        total_fund: null, // 应缴金额
        actual_total_fund:null // 实缴金额
      },
      formData: {
        id:'', // 记录ID 有值为编辑
        investor_type:'', // number 出资类型
        investor_type_name:'', // number 出资类型名称
        name:'', // 出资人全称
        fund:'', // 注册资本
        fund_unit:'1', // number 资金单位
        money_type:'CNY', // 资金种类
        money_type_name:'人民币', // 资金种类名称
        fund_rat:'', // number 资金比例
        investment_date:null, // date 出资时间
        remark:'', // 备注
      },
      edit_read: false, // 编辑查看切换
      end_date_ctrl: false, // 是否可输入日期
      ModalVisible: false, // 弹出控制
      investment_list: [],
      total: null,
      columns: [
        {
          title: "出资人",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "出资人类型",
          dataIndex: "investor_type_name",
        },
        {
          title: "出资额(万)",
          dataIndex: "fund",
        },
        {
          title: "货币类型",
          dataIndex: "money_type_name",
        },
        {
          title: "出资比例(%)",
          dataIndex: "fund_rat",
        },
        {
          title: "出资时间",
          dataIndex: "investment_date",
          scopedSlots: { customRender: "investment_date" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        }
      ]
    };
  },
  filters: {
    is_long_effect(value) {
      switch (value) {
        case 0:
          return "否";
          break;
        case '0':
          return "否";
          break;
        default:
          return "是";
          break;
      }
    }
  },
  props:['father','grand'],
  created() {
    this.grand.selectedKeys = ['basic_info'];
    this.get_tree_datas();
    this.get_investment_base_info_method();
    this.get_investment_list_method();
    this.father.activeKey = "investment_info";
    this.father.BreadcrumbTwo = '出资信息';
  },
  methods: {
    vali_fund_rat(rule, value, callback){
      if (value && value<0||value>100) {
        callback('请输入合法比例0-100'); // 校验未通过
      } else {
        callback(); // 校验通过
      }
    },
    get_tree_datas() {
      money_type().then(res => {
        this.money_type_list = this.$common.treeSelectFormat(res.data);
      }).catch();
      investor_type().then(res => {
        this.investor_type_list = this.$common.treeSelectFormat(res.data);
      }).catch();
    },
    get_investment_base_info_method(){
      get_investment_base_info().then(res=>{
        this.formData1.file_path = res.data.file_list||[]; // 附件路径
        this.formData1.total_fund = res.data.total_fund; // 出资总额
        this.formData1.actual_total_fund = res.data.actual_total_fund; // 出资总额
      })
    },
    fund_unit_change(e) {
      // 选择项改变
    },
    money_type_change(e) {
      // 选择项改变
      let index = this.money_type_list.indexOfObj("code", e);
      this.formData.money_type_name = this.money_type_list[index].name;
    },
    customRequest1(data) { // 上传附件
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData1.file_path.push(img_obj);
          this.set_investment_file('附件上传成功','附件上传失败');
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    del1(e) { // 删除附件，同时删除后台数据
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData1.file_path.splice(index, 1);
        this.set_investment_file('删除成功','删除失败')
      }
    },
    set_investment_file(msg_success,msg_fail){
      let file_list = this.formData1.file_path;
      this.form1.setFieldsValue({['investment_file_path']:file_list});
      set_investment_file_list({file_list}).then(res=>{
        if(res.code==200){
          // this.father.apply_info2();
          this.$message.success(msg_success)
        }else{
          this.$message.error(msg_fail)
        }
      })
    },
    set_investment_fund_method(e){ /* 设置注册资本 */
      let total_fund = e.target.value;
      set_investment_fund({total_fund}).then(res=>{
        this.$message.success('添加注册资本成功')
        // this.father.apply_info2();
      }).catch(error=>{
        this.$message.warn(error)
      })
    },
    set_investment_actual_fund_method(e){ /* 设置实缴资本 */
      let actual_total_fund = e.target.value;
      set_investment_actual_fund({actual_total_fund}).then(res=>{
        this.$message.success('添加实缴资本成功')
        // this.father.apply_info2();
      }).catch(error=>{
        this.$message.warn(error)
      })
    },
    handleSubmit1(e) {
      e.preventDefault();
      this.form1.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.new_add();
        }
      });
    },
    get_investment_list_method(page) {
      var page = page || 1;
      get_investment_list(page).then(res => {
        let result = res.data.list||[];
        result.forEach((elem, index) => {
          elem.key = index;
        });
        this.total = +res.data.total_count;
        this.investment_list = result;
      });
    },
    new_add() {
      this.edit_read = false;
      this.formData = {
        id:'', // 记录ID 有值为编辑
        investor_type:'', // number 出资类型
        investor_type_name:'', // number 出资类型名称
        name:'', // 出资人全称
        fund:'', // 注册资本
        fund_unit:'', // number 资金单位
        money_type:'', // 资金种类
        money_type_name:'', // 资金种类名称
        fund_rat:'', // number 资金比例
        investment_date:null, // date 出资时间
        remark:'' // 备注
      };
      this.setModalVisible(true).then(res=>{
        this.form2.setFieldsValue({['fund_unit']:'1',['money_type']:'CNY'});
      });
    },
    show_edit_read(e,key){
      this.formData = Object.assign({}, this.investment_list[e]);
      this.formData.investment_date = this.investment_list[e].investment_date;
      this.setModalVisible(true);
      this.edit_read = key;
    },
    on_delete(key, id) {
      var self=this;
      this.$confirm({
        title: '确认删除此项出资人？',
        onOk() {
          const investment_list = [...self.investment_list];
          del_investment_list(id).then(res => {
            self.$message.success(res.msg);
            self.investment_list = investment_list.filter(
              item => item.key !== key
            );
          }).catch(error=>{
            self.$message.error(error);
          });
        },
        onCancel() {},
      });
    },
    paginationChange(page) {
      this.get_investment_list_method(page);
    },
    setModalVisible(ModalVisible) {
      this.ModalVisible = ModalVisible;
      return new Promise((resolve)=>resolve())
    },
    end_date_change(key) {
      // 是否长期有效期
      this.form.setFieldsValue({ [key]: this.$moment("9999-12-31") });
      this.end_date_ctrl = !this.end_date_ctrl;
    },
    handleSubmit2(e) {
      e.preventDefault();
      this.form2.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            investment_date: fieldsValue["investment_date"].format(
              "YYYY-MM-DD"
            ),
            id: this.formData.id
          };
          save_investment_list(values)
            .then(res => {
              this.father.main_base_list();
              this.$message.success(res.msg);
              this.setModalVisible(false);
              this.formData={
                id:'', // 记录ID 有值为编辑
                investor_type:'', // number 出资类型
                investor_type_name:'', // number 出资类型名称
                name:'', // 出资人全称
                fund:'', // 注册资本
                fund_unit:'1', // number 资金单位
                money_type:'CNY', // 资金种类
                money_type_name:'人民币', // 资金种类名称
                fund_rat:'', // number 资金比例
                investment_date:this.$moment(), // date 出资时间
                remark:'' // 备注
              };
              this.get_investment_list_method();
              // this.father.apply_info2();
            })
            .catch(error => {
              this.$message.error(error);
            });
        }
      });
    },
    customRequest(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData.file_path.push(img_obj);
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    del(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData.file_path.splice(index, 1);
      }
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
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/baseInfoManage/investmentInfo";
</style>