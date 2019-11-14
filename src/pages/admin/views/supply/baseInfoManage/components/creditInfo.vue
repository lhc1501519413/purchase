<template>
  <div id="creditInfo">
    <a-row class="first-row">
      <a-col :span="21">
        <span class="title">信用信息列表</span>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="new_add">新增</a-button>
      </a-col>
    </a-row>
    <a-table :dataSource="credit_list" :columns="columns" :pagination="false">
      <template slot="credit_name" slot-scope="text, record">
        <span @click="show_edit_read(record.id,true,record.credit_type)" class="nature-type">{{record.credit_name}}</span>
      </template>
      <template
        slot="timeLimit"
        slot-scope="text, record"
      >{{record.effect_start_date}}~{{record.effect_end_date.indexOf('9999')==-1?record.effect_end_date:'长期'}}</template>
      <template
        slot="is_long_effect"
        slot-scope="text, record"
      >{{record.is_long_effect|is_long_effect}}</template>
      <template slot="file_path" slot-scope="text, record">
        <p v-for="(item,index) of record.file_path" :key="index">{{item.file_name}}</p>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a @click="show_edit_read(record.id,false,record.credit_type)" href="javascript:;">编辑</a>
        <a @click="on_delete(record.key,record.id)" href="javascript:;">删除</a>
      </template>
    </a-table>
    <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    <a-modal
      :destroyOnClose="true"
      style="top: 10%"
      width="50%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="() => setModalVisible(false)"
      @cancel="() => setModalVisible(false)"
    >
      <template slot="title">
        <h3 align="center">新增信用信息</h3>
      </template>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="信用名称" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.credit_name}}</span>
          <a-tree-select
            v-show="!edit_read"
            showSearch
            @change="credit_type_change"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="credit_type_list"
            placeholder="请选择信用名称"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
              'credit_type',
              { rules: [{ required: true, message: '请选择信用名称' }],initialValue:formData.credit_type }
            ]"
          />
        </a-form-item>
        <a-form-item label="信用等级" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.credit_level_name}}</span>
          <a-tree-select
            v-show="!edit_read"
            showSearch
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="credit_type_level"
            placeholder="请选择信用等级"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
              'credit_level',
              { initialValue:formData.credit_level }
            ]"
          />
        </a-form-item>
        <a-form-item label="证件编号" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.certificate_number}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入证件编号"
            v-decorator="[
        'certificate_number',
        { rules: [{ required: true, message: '请输入证件编号' }],initialValue:formData.certificate_number}
      ]"
          />
        </a-form-item>
        <a-form-item label="发证机关名称" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.org_name}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入发证机关名称"
            v-decorator="[
        'org_name',
        { rules: [{ required: true, message: '请输入信用名称' }],initialValue:formData.org_name}
      ]"
          />
        </a-form-item>
        <a-form-item label="信用有效开始时间" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.effect_start_date}}</span>
          <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
          <a-date-picker
            v-show="false"
            v-decorator="[
              'effect_start_date',
              { rules: [{ type: 'object',required: true }] }
            ]"
          />
          <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
          <a-date-picker
            v-if="!formData.effect_start_date && !edit_read"
            placeholder="请选择信用有效开始时间"
            v-decorator="[
              'effect_start_date',
              { rules: [{ type: 'object',required: true, message: '请选择信用有效开始时间' }] }
            ]"
          />
          <a-date-picker
            v-if="formData.effect_start_date && !edit_read"
            placeholder="请选择信用有效开始时间"
            v-decorator="[
              'effect_start_date',
              { rules: [{ type: 'object',required: true, message: '请选择信用有效开始时间' }],initialValue:$moment(formData.effect_start_date) }
            ]"
          />
        </a-form-item>
        <a-form-item label="信用有效结束时间" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.effect_end_date}}</span>
          <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
          <a-date-picker
            v-show="false"
            v-decorator="[
              'effect_end_date',
              { rules: [{ type: 'object',required: true }] }
            ]"
          />
          <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
          <a-date-picker
            v-if="!formData.effect_end_date && !edit_read"
            :disabled="end_date_ctrl"
            placeholder="请选择信用有效结束时间"
            v-decorator="[
              'effect_end_date',
              { rules: [{ type: 'object',required: true, message: '请选择信用有效结束时间' }] }
            ]"
          />
          <a-date-picker
            v-if="formData.effect_end_date && !edit_read"
            :disabled="end_date_ctrl"
            placeholder="请选择信用有效结束时间"
            v-decorator="[
              'effect_end_date',
              { rules: [{ type: 'object',required: true, message: '请选择信用有效结束时间' }],initialValue:$moment(formData.effect_end_date) }
            ]"
          />
          <a-checkbox
            v-show="!edit_read"
            :checked="end_date_ctrl"
            style="margin-left:10px;"
            @change="end_date_change('effect_end_date')"
          >长期有效</a-checkbox>
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
        <a-form-item label="附件" v-bind="formItemLayout">
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
  get_credit_list,
  get_credit_info,
  save_credit_info,
  del_credit
} from "@admin/api/baseInfo";
import {
  POST,
  all_credit_type,
  credit_type_level,
  investor_type,
  money_type
} from "@common/js/apis";
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
        credit_type: "", //信用名称
        credit_name: "", //信用名称
        credit_level: "", //信用等级
        credit_level_name: "", //信用等级名称
        certificate_number: "", //证件编号
        org_name: "", //发证机构名称
        effect_start_date: null, //有效开始时间
        effect_end_date: null, //有效结束时间
        is_long_effect: "", //是否长期有效 0 否 1是
        file_path: [], //附件路径
        remark: "", //备注
        create_time: null,
        update_time: null
      },
      edit_read: false, // 编辑查看切换
      end_date_ctrl: false, // 是否可输入日期
      ModalVisible: false, // 弹出控制
      credit_list: [],
      credit_type_list: [],
      credit_type_level: [],
      total: null,
      columns: [
        {
          title: "信用名称",
          dataIndex: "credit_name",
          width: "15%",
          scopedSlots: { customRender: "credit_name" }
        },
        {
          title: "编号",
          dataIndex: "certificate_number",
          width: "9%"
        },
        {
          title: "信用等级",
          dataIndex: "credit_level_name",
          width: "8%"
        },
        {
          title: "发证机构名称",
          dataIndex: "org_name",
          width: "12%"
        },
        {
          title: "资质有效期限",
          dataIndex: "effect_start_date",
          scopedSlots: { customRender: "timeLimit" },
          width: "17%"
        },
        {
          title: "是否有效",
          dataIndex: "is_long_effect",
          scopedSlots: { customRender: "is_long_effect" },
          width: "10%"
        },
        {
          title: "附件",
          dataIndex: "file_path",
          scopedSlots: { customRender: "file_path" },
          width: "18%"
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
    this.father.activeKey = "credit_info";
    this.father.BreadcrumbTwo = '信用信息';
    this.get_credit_list_method();
    this.get_all_credit_type();
  },
  methods: {
    get_all_credit_type() {
      all_credit_type()
        .then(res => {
          this.credit_type_list = this.$common.treeSelectFormat(res.data);
        }).catch();
    },
    credit_type_change(e) {
      credit_type_level(e).then(res => {
        this.credit_type_level = this.$common.treeSelectFormat(res.data);
      }).catch();
    },
    get_credit_list_method(page) {
      var page = page || 1;
      get_credit_list(page).then(res => {
        let result = res.data.list || [];
        result.forEach((elem, index) => {
          elem.key = index;
        });
        this.total = +res.data.total_count;
        this.credit_list = result;
      });
    },
    new_add() {
      this.edit_read = false;
      this.formData = {
        id: "",
        supply_id: "",
        credit_type: "", //信用名称
        credit_name: "", //信用名称
        credit_level: "", //信用等级
        credit_level_name: "", //信用等级名称
        certificate_number: "", //证件编号
        org_name: "", //发证机构名称
        effect_start_date: null, //有效开始时间
        effect_end_date: null, //有效结束时间
        is_long_effect: "", //是否长期有效 0 否 1是
        file_path: [], //附件路径
        remark: "", //备注
        create_time: null,
        update_time: null
      };
      this.setModalVisible(true);
    },
    show_edit_read(id, key) {
      this.credit_type_change(arguments[2])
      get_credit_info(id).then(res=>{
        var list = res.data;
        this.formData = list;
        this.formData.effect_start_date = list.effect_start_date;
        this.formData.effect_end_date = list.effect_end_date;
        this.setModalVisible(true,this.formData.is_long_effect);
        this.edit_read = key;
      })
    },
    on_delete(key, id) {
      var self = this;
      this.$confirm({
        title: "确认删除此项信用信息?",
        onOk() {
          const credit_list = [...self.credit_list];
          del_credit(id).then(res => {
            self.$message.success(res.msg);
            self.credit_list = credit_list.filter(item => item.key !== key);
          });
        },
        onCancel() {}
      });
    },
    paginationChange(page) {
      this.get_credit_list_method(page);
    },
    setModalVisible(ModalVisible,key) {
      this.end_date_ctrl = !!+key;
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
            effect_start_date: fieldsValue["effect_start_date"].format("YYYY-MM-DD"),
            effect_end_date: fieldsValue["effect_end_date"].format("YYYY-MM-DD"),
            is_long_effect:fieldsValue["effect_end_date"].format("YYYY-MM-DD").indexOf("9999") == -1 ? 0: 1,
            file_path: this.formData.file_path,
            id: this.formData.id
          };
          save_credit_info(values)
            .then(res => {
              this.$message.success(res.msg);
              this.setModalVisible(false);
              this.get_credit_list_method();
              this.father.main_base_list();
              this.father.apply_info2();
            })
            .catch(error => {
              this.$message.error(error.msg);
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
          this.$message.error(error.msg);
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
  @import "~@admin/assets/scss/baseInfoManage/creditInfo";
</style>