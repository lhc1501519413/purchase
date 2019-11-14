<template>
  <div id="peopleInfo">
    <a-row class="first-row">
      <a-col :span="21">
        <span class="title">人员信息管理列表（法定代表人必填）</span>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="new_add">新增</a-button>
      </a-col>
    </a-row>
    <a-table :dataSource="people_list" :columns="columns" :pagination="false">
      <template slot="name" slot-scope="text, record">
        <span @click="show_edit_read(record.id,true)" class="nature-type">{{record.name}}</span>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a @click="show_edit_read(record.id,false)" href="javascript:;">编辑</a>
        <a v-if="record.type!=1&&record.type!=20" @click="on_delete(record.key,record.id)" href="javascript:;">删除</a>
      </template>
    </a-table>
    <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    <a-modal
      :destroyOnClose="true"
      style="top: 10%"
      width="65%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="() => setModalVisible(false)"
      @cancel="() => setModalVisible(false)"
    >
      <template slot="title">
        <h3 align="center">新增人员信息</h3>
      </template>
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item label="姓名" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.name}}</span>
              <a-input
                v-show="!edit_read"
                placeholder="请输入姓名"
                v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入姓名' }],initialValue:formData.name }
              ]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.type_name}}</span>
              <a-tree-select
                :disabled='formData.type==1||formData.type==20'
                v-show="!edit_read"
                showSearch
                allowClear
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="people_type_list"
                placeholder="请选择类型"
                treeNodeFilterProp="title"
                dropdownMatchSelectWidth
                v-decorator="[
                  'type',
                  { rules: [{ required: true, message: '请选择类型' }],initialValue:formData.type }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="部门" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.dep_name}}</span>
              <a-input
                v-show="!edit_read"
                placeholder="请输入部门"
                v-decorator="[
          'dep_name',
          { initialValue:formData.dep_name }
        ]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="职务" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.duty}}</span>
              <a-input
                placeholder="请输入职务"
                v-show="!edit_read"
                v-decorator="[
          'duty',{rules: [{ required: true, message: '请输入职务' }],initialValue:formData.duty }
        ]"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
             <a-form-item label="证件类型" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.cert_type_name}}</span>
              <a-tree-select
                v-show="!edit_read"
                showSearch
                allowClear
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="cert_type_list"
                placeholder="请选择证件类型"
                treeNodeFilterProp="title"
                dropdownMatchSelectWidth
                v-decorator="[
                  'cert_type',
                  { initialValue:formData.cert_type }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="证件号" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.cert_code}}</span>
              <a-input
                v-show="!edit_read"
                placeholder="请输入证件号"
                v-decorator="[
          'cert_code',
          { initialValue:formData.cert_code }
        ]"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="手机" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.mobile}}</span>
              <a-input
                placeholder="请输入手机"
                v-show="!edit_read"
                v-decorator="[
          'mobile',{rules: [{ required: true, message: '请输入手机' },{whitespace:true},{validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}],initialValue:formData.mobile }
        ]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="电话" v-bind="formItemLayout" :help="edit_read?'':'格式如：xxxx-xxxxxxxx'">
              <span v-show="edit_read">{{formData.phone}}</span>
              <a-input
                placeholder="请输入电话"
                v-show="!edit_read"
                v-decorator="[
                  'phone',{rules: [{ required: true, message: '请输入电话' },{validator:(rule, value, callback) => this.vali_phone(rule, value, callback)}],initialValue:formData.phone }
                ]"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="邮箱" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.email}}</span>
              <a-input
                v-show="!edit_read"
                placeholder="请输入邮箱"
                v-decorator="[
          'email',
          { rules:[{type:'email',required:true, message:'请输入正确的邮箱'}],initialValue:formData.email }
        ]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="地址" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.address}}</span>
              <a-input
                v-show="!edit_read"
                placeholder="请输入地址"
                v-decorator="[
          'address',
          { initialValue:formData.address }
        ]"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="邮政编码" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.postcode}}</span>
              <a-input
                v-show="!edit_read"
                placeholder="请输入邮政编码"
                v-decorator="[
                  'postcode',
                  { 
                    initialValue:formData.postcode,
                    rules: [{ required: false }, {validator:(rule, value, callback) => this.vali_postcode(rule, value, callback)}]
                  }]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="负责区域行业" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.regional_industry}}</span>
              <a-input
                v-show="!edit_read"
                placeholder="请输入负责区域行业"
                v-decorator="[
          'regional_industry',
          { initialValue:formData.regional_industry }
        ]"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="备注说明" v-bind="formItemLayout">
              <span v-show="edit_read">{{formData.remark}}</span>
              <a-textarea
                v-show="!edit_read"
                placeholder="请输入备注说明"
                :rows="4"
                v-decorator="[
            'remark',
            { initialValue:formData.remark }
          ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="附件" v-bind="formItemLayout" :help="edit_read?'':'请上传有效期内证件的正反面扫描件，文件大小为20M以内'">
              <ul v-show="edit_read">
                <li class="file-list-item" v-for="(item,index) of formData.file_path" :key="index">
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                </li>
              </ul>
              <a-upload
                v-if="!edit_read"
                :showUploadList="false"
                :customRequest="customRequest"
                :beforeUpload="beforeUpload"
                v-decorator="[
          'file_path',
          { rules: [{ required: true, message: '请选择附件' }],initialValue:formData.file_path }
        ]"
              >
                <a-button>
                  <a-icon type="upload" />上传
                </a-button>
                <ul>
                  <li
                    @click.stop="del"
                    class="file-list-item"
                    v-for="(item,index) of formData.file_path"
                    :key="index"
                  >
                    <svg-icon class="wenjian" icon-class="wenjian" />
                    <span>{{item.file_name}}</span>
                    <svg-icon :data-key="index" class="del" icon-class="del" />
                  </li>
                </ul>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
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
import {
  get_people_list,
  get_people_info,
  save_people_info,
  del_people
} from "@admin/api/baseInfo";
import { POST, all_people_type, all_cert_type } from "@common/js/apis";

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      formData: {
        id: "",
        supply_id: "",
        name: "", //姓名
        type: "", //人员类型
        type_name: "", //人员类型
        dep_name: "", //部门名称
        duty: "", //职务名称
        cert_type: "", //证件类型
        cert_type_name: null, //证件类型名称
        cert_code: "", //证件号码
        mobile: "", //手机
        phone: "", //电话
        email: "", //邮箱
        address: "", //地址
        postcode: "", //邮编
        regional_industry: "", //区域行业
        file_path: [], //附件路径
        remark: "", //备注
        create_time: this.$moment(),
        update_time: this.$moment()
      },
      edit_read: false, // 编辑查看切换
      end_date_ctrl: false, // 是否可输入日期
      ModalVisible: false, // 弹出控制
      people_list: [],
      people_type_list: [],
      cert_type_list: [],
      total: null,
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          width: "10%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "类型",
          dataIndex: "type_name",
          width: "13%"
        },
        {
          title: "部门",
          dataIndex: "dep_name",
          width: "13%"
        },
        {
          title: "职务",
          dataIndex: "duty",
          width: "13%"
        },
        {
          title: "手机",
          dataIndex: "mobile",
          width: "13%"
        },
        {
          title: "电话",
          dataIndex: "phone",
          width: "13%"
        },
        {
          title: "邮箱",
          dataIndex: "email",
          width: "13%"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          width: "30%"
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
        default:
          return "是";
          break;
      }
    }
  },
  props:['father','grand'],
  created() {
    this.grand.selectedKeys = ['basic_info'];
    this.father.activeKey = "people_info";
    this.father.BreadcrumbTwo = '人员信息';
    this.get_people_list_method();
    this.get_tree_data();
  },
  methods: {
    vali_postcode(rule, value, callback) {
      if (value && !/^\d{6}$/.test(value)) {
        callback("请填入正确格式的邮政编码"); // 校验未通过
      } else {
        callback(); // 校验通过
      }
    },
    vali_phone(rule, value, callback) {
      // !this.global.RexConfig.RexPassword.test(value)
      if (value && !this.global.RexConfig.RexPhone.test(value)) {
        callback(); // 校验通过
      } else {
        callback("请填入正确格式的固定电话"); // 校验未通过
      }
    },
    get_tree_data() {
      all_people_type()
        .then(res => {
          this.people_type_list = this.$common.treeSelectFormat(res.data);
        }).catch();
      all_cert_type()
        .then(res => {
          this.cert_type_list = this.$common.treeSelectFormat(res.data);
        }).catch();
    },
    get_people_list_method(page) {
      var page = page || 1;
      get_people_list(page).then(res => {
        let result = res.data.list ||[];
        result.forEach((elem, index) => {
          elem.key = index;
        });
        this.total = +res.data.total_count;
        // this.total = 100;
        this.people_list = result;
      });
    },
    new_add() {
      this.edit_read = false;
      this.formData = {
        id: "",
        supply_id: "",
        name: "", //姓名
        type: "", //人员类型
        type_name: "", //人员类型
        dep_name: "", //部门名称
        duty: "", //职务名称
        cert_type: "", //证件类型
        cert_type_name: null, //证件类型名称
        cert_code: "", //证件号码
        mobile: "", //手机
        phone: "", //电话
        email: "", //邮箱
        address: "", //地址
        postcode: "", //人员类型
        regional_industry: "", //区域行业
        file_path: [], //附件路径
        remark: "", //备注
        create_time: this.$moment(),
        update_time: this.$moment()
      };
      this.setModalVisible(true);
    },
    show_edit_read(id, key) {
      get_people_info(id).then(res=>{
        this.formData = res.data;
        this.formData.cert_type = res.data.cert_type!=0?res.data.cert_type:'';
        this.setModalVisible(true);
        this.edit_read = key;
      })
    },
    on_delete(key, id) {
      var self = this;
      this.$confirm({
        title: "确认删除此项特定资质?",
        onOk() {
          const people_list = [...self.people_list];
          del_people(id).then(res => {
            self.$message.success(res.msg);
            self.people_list = people_list.filter(item => item.key !== key);
          });
        },
        onCancel() {}
      });
    },
    paginationChange(page) {
      this.get_people_list_method(page);
    },
    setModalVisible(ModalVisible) {
      this.ModalVisible = ModalVisible;
    },
    end_date_change(key) {
      // 是否长期有效期
      this.form.setFieldsValue({ [key]: this.$moment("9999-12-31") });
      this.end_date_ctrl = !this.end_date_ctrl;
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
            file_path: this.formData.file_path,
            id: this.formData.id
          };
          save_people_info(values)
            .then(res => {
              this.$message.success(res.msg);
              this.setModalVisible(false);
              this.father.main_base_list();
              // this.father.apply_info2();
              this.formData = {
                id: "",
                supply_id: "",
                name: "", //姓名
                type: "", //人员类型
                type_name: "", //人员类型
                dep_name: "", //部门名称
                duty: "", //职务名称
                cert_type: "", //证件类型
                cert_type_name: null, //证件类型名称
                cert_code: "", //证件号码
                mobile: "", //手机
                phone: "", //电话
                email: "", //邮箱
                address: "", //地址
                postcode: "", //人员类型
                regional_industry: "", //区域行业
                file_path: [], //附件路径
                remark: "", //备注
                create_time: this.$moment(),
                update_time: this.$moment()
              };
              this.get_people_list_method();
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
          this.formData.file_path = this.formData.file_path||[];
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
  @import "~@admin/assets/scss/baseInfoManage/peopleInfo";
</style>