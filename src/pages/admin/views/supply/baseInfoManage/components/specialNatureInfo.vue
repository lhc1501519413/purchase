<template>
  <div id="special-nature">
    <a-row class="first-row">
      <a-col :span="21">
        <span class="title">特殊资质列表</span>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" v-show="father.status!='1'" @click="new_add">新增</a-button>
      </a-col>
    </a-row>
    <a-table :dataSource="special_nature_list" :columns="columns" :pagination="false">
      <template slot="special_nature_type" slot-scope="text, record">
        <span @click="show_edit_read(record.id,true)" class="nature-type">{{record.special_nature_type}}</span>
      </template>
      <template
        slot="timeLimit"
        slot-scope="text, record"
      >{{record.effect_start_date}}~{{record.effect_end_date}}</template>
      <template
        slot="is_effect"
        slot-scope="text, record"
      >{{record.is_effect|is_effect}}</template>
      <template slot="file_path" slot-scope="text, record">
        <p v-for="(item,index) of record.file_path" :key="index">{{item.file_name}}</p>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a :disabled="father.status=='1'" @click="show_edit_read(record.id,false)" href="javascript:;">编辑</a>
        <a :disabled="father.status=='1'" v-if="record.priv.show_del==1" @click="on_delete(record.key,record.id)" href="javascript:;">删除</a>
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
        <h3 align="center">{{title}}</h3>
      </template>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="资质名称" v-bind="formItemLayout">
          <span v-show="edit_read">{{formData.special_nature_type}}</span>
          <a-input
            :disabled='!!formData.special_nature_code'
            v-show="!edit_read"
            placeholder="请输入资质名称"
            v-decorator="[
        'special_nature_type',
        { rules: [{ required: true, message: '请输入资质名称' }],initialValue:formData.special_nature_type}
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
        { rules: [{ required: true, message: '请输入资质名称' }],initialValue:formData.org_name}
      ]"
          />
        </a-form-item>
        <a-form-item label="资质有效开始时间" v-bind="formItemLayout">
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
            placeholder="请选择资质有效开始时间"
            v-decorator="[
              'effect_start_date',
              { rules: [{ type: 'object',required: true, message: '请输入资质有效开始时间' }] }
            ]"
          />
          <a-date-picker
            v-if="formData.effect_start_date && !edit_read"
            placeholder="请选择资质有效开始时间"
            v-decorator="[
              'effect_start_date',
              { rules: [{ type: 'object',required: true, message: '请选择资质有效开始时间' }],initialValue:$moment(formData.effect_start_date) }
            ]"
          />
        </a-form-item>
        <a-form-item label="资质有效结束时间" v-bind="formItemLayout">
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
            placeholder="请选择营业有效结束时间"
            v-decorator="[
              'effect_end_date',
              { rules: [{ type: 'object',required: true, message: '请选择营业有效结束时间' }] }
            ]"
          />
          <a-date-picker
            v-if="formData.effect_end_date && !edit_read"
            :disabled="end_date_ctrl"
            placeholder="请选择营业有效结束时间"
            v-decorator="[
              'effect_end_date',
              { rules: [{ type: 'object',required: true, message: '请选择营业有效结束时间' }],initialValue:$moment(formData.effect_end_date)}
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
            <li
              class="file-list-item"
              v-for="(item,index) of formData.file_path"
              :key="index"
            >
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
import { POST } from "@common/js/apis.js";
import {
  get_special_nature_list,
  get_special_nature_info,
  save_special_nature,
  del_special_nature
} from "@admin/api/baseInfo";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      formData: {
        id:'',
        special_nature_type: "",
        special_nature_level: "", // 资质等级
        certificate_number: "", // 证件编号
        org_name: "", // 发证机关名称
        effect_start_date: null, // 有效开始时间
        effect_end_date: null, // 有效结束时间
        is_long_effect: "", //	是	number	是否长期有效 0 否 1是
        is_effect: "", //	是	number	是否长期有效 0 否 1是
        file_path: [], // 附件路径
        remark: "" // 备注
      },
      title:'新增特定资质',
      edit_read: false, // 编辑查看切换
      end_date_ctrl: false, // 是否可输入日期
      ModalVisible: false, // 弹出控制
      special_nature_list: [],
      total: null,
      columns: [
        {
          title: "资质名称",
          dataIndex: "special_nature_type",
          width: "15%",
          scopedSlots: { customRender: "special_nature_type" }
        },
        {
          title: "编号",
          dataIndex: "certificate_number",
          width: "8%"
        },
        {
          title: "发证机构名称",
          dataIndex: "org_name",
          width: "12%"
        },
        {
          title: "资质有效期限",
          width: "20%",
          dataIndex: "effect_start_date",
          scopedSlots: { customRender: "timeLimit" }
        },
        {
          title: "是否有效",
          dataIndex: "is_effect",
          scopedSlots: { customRender: "is_effect" },
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
    is_effect(value) {
      switch (value) {
        case '0':
          return "否";
          break;
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
    this.get_special_nature_list_method();
    this.father.activeKey = "special_nature_info";
    this.father.BreadcrumbTwo = '特定资质';
  },
  methods: {
    get_special_nature_list_method(page) {
      var page = page || 1;
      get_special_nature_list(page).then(res => {
        let result = res.data.list;
        result.forEach((elem, index) => {
          elem.effect_start_date = elem.effect_start_date;
          elem.effect_end_date = !elem.effect_end_date?elem.effect_end_date:elem.effect_end_date.indexOf('9999')==-1?elem.effect_end_date:'长期';
          elem.key = index;
        });
        this.total = +res.data.total_count;
        this.special_nature_list = result;
      });
    },
    new_add() {
      this.title='新增特定资质';
      this.edit_read = false;
      this.formData = {
        id:'',
        special_nature_type: "",
        special_nature_level: "", // 资质等级
        certificate_number: "", // 证件编号
        org_name: "", // 发证机关名称
        effect_start_date: null, // 有效开始时间
        effect_end_date: null, // 有效结束时间
        is_long_effect: "", //	是	number	是否长期有效 0 否 1是
        is_effect: "", //	是	number	是否长期有效 0 否 1是
        file_path: [], // 附件路径
        remark: "" // 备注
      };
      this.setModalVisible(true);
    },
    show_edit_read(id,key){
      key?this.title='特定资质':this.title='编辑特定资质';
      get_special_nature_info(id).then(res=>{
        var list = res.data;
        this.formData = list;
        this.formData.effect_start_date = list.effect_start_date;
        this.formData.effect_end_date = list.effect_end_date;
        this.formData.file_path = list.file_path||[];
        this.setModalVisible(true,this.formData.is_long_effect);
        this.edit_read = key;
      })
    },
    on_delete(key, id) {
      var self=this;
      this.$confirm({
        title: '确认删除此项特定资质?',
        onOk() {
          const special_nature_list = [...self.special_nature_list];
          del_special_nature(id).then(res => {
            self.$message.success(res.msg);
            self.special_nature_list = special_nature_list.filter(
              item => item.key !== key
            );
            self.father.apply_info2();
          });
        },
        onCancel() {},
      });
    },
    paginationChange(page) {
      this.get_special_nature_list_method(page);
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
          save_special_nature(values)
            .then(res => {
              this.$message.success(res.msg);
              this.setModalVisible(false);
              this.get_special_nature_list_method();
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
  @import "~@admin/assets/scss/baseInfoManage/specialNatureInfo";
</style>