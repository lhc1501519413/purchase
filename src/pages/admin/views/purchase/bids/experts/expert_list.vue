<template>
  <div id="expert_list">
    <h5>招标管理 / 专家列表</h5>
    <section class="content">
      <a-row>
        <a-col :span="5">
          <span>专家类别：</span>
          <a-select
            allowClear
            v-model="type"
            dropdownMatchSelectWidth
            @change="get_expert_list_method2"
            style="width: 65%"
          >
            <a-select-option :value="0">全部</a-select-option>
            <a-select-option :value="1">用户代表</a-select-option>
            <a-select-option :value="2">评标专家</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <span>模糊搜索：</span>
          <a-input
            class="pl-10"
            style="width: 65%"
            v-model="keyword"
            @keyup.13="get_expert_list_method2"
            placeholder="模糊搜索：姓名"
          />
        </a-col>
        <a-col :span="7">
          <a-button class="mr-10" @click="get_expert_list_method2" type="primary">搜索</a-button>
          <a-button @click="new_add" type="primary">新增</a-button>
        </a-col>
      </a-row>
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        rowKey="id"
      >
        <template slot="sex" slot-scope="text">{{text==1?'男':'女'}}</template>
        <template slot="type" slot-scope="text">{{text|type}}</template>
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="edit(record)">编辑</a>
          <a href="javascript:;" @click="del(record.user_id)">删除</a>
          <!-- <a href="javascript:;" @click="audit(record.user_id)">审核</a> -->
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
    <a-modal
      class="expert_modal"
      :destroyOnClose="true"
      style="top: 10%;"
      width="50%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
    >
      <h3 slot="title" class="text-center">添加专家</h3>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="手机号码" v-bind="formItemLayout">
          <a-input
            :disabled='!!formData.user_id'
            placeholder="请输入手机号码"
            v-decorator="[
              'mobile',
              { rules: [{ required: true, message: '请输入手机号码' },{whitespace:true},{validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}],initialValue:formData.mobile }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="专家姓名" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'username',
                {
                  rules: [{ required: true, message: '请输入' }],
                  initialValue:formData.username 
                },
              ]"
            placeholder="请输入"
          ></a-input>
        </a-form-item>
        <a-form-item label="评标专业" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'specialty',
                {
                  initialValue:formData.specialty 
                },
              ]"
            placeholder="请输入"
          ></a-input>
        </a-form-item>
        <a-form-item label="专家类别" v-bind="formItemLayout">
          <a-radio-group
            v-decorator="[
              'type',
              { 
                initialValue:+formData.type 
              }
            ]"
          >
            <a-radio :value="1">用户代表</a-radio>
            <a-radio :value="2">评标专家</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="性别" v-bind="formItemLayout">
          <a-radio-group
            v-decorator="[
              'sex',
              { 
                rules: [{ required: true, message: '请选择性别' }],
                initialValue:formData.sex?+formData.sex:''
              }
            ]"
          >
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="身份证号" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'id_number',
                {
                  rules:[{whitespace:true},{validator:(rule, value, callback) => this.vali_id_number(rule, value, callback)}],
                  initialValue:formData.id_number 
                },
              ]"
            placeholder="请输入"
          ></a-input>
        </a-form-item>
        <a-form-item label="工作单位" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'org',
                {
                  initialValue:formData.org 
                },
              ]"
            placeholder="请输入"
          ></a-input>
        </a-form-item>
        <a-form-item class="text-center">
          <a-button class="mr-10" @click="ModalVisible = false">取消</a-button>
          <a-button class="ml-10" type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { 
  expert_list, // 专家列表
  save_expert, // 添加/修改
  del_expert, // 删除
} from '@admin/api/expert';
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      point: require("@static/images/icon_point.png"),
      priv: this.$store.getters.priv,
      keyword: "",
      type: 0,
      page: "",
      dataSource: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "姓名",
          dataIndex: "username",
          width: "10%"
        },
        {
          title: "性别",
          dataIndex: "sex",
          scopedSlots: { customRender: "sex" },
          width: "10%"
        },
        {
          title: "专家类别",
          dataIndex: "type",
          scopedSlots: { customRender: "type" },
          width: "10%"
        },
        {
          title: "手机号码",
          dataIndex: "mobile",
          width: "10%"
        },
        {
          title: "身份证号",
          dataIndex: "id_number",
          width: "10%"
        },
        {
          title: "评标专业",
          dataIndex: "specialty",
          width: "10%"
        },
        {
          title: "工作单位",
          dataIndex: "org",
          width: "10%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "10%"
        }
      ],
      total: 0,
      ModalVisible: false,
      formData: {
        id: "",
        user_id: "", //用户ID
        specialty: "", //评标专业
        type: "", //类型 1用户代表 2评标专家
        sex: "", //性别 1男 2女
        id_number: "", //身份证号
        org: "", //单位组织
        mobile: "", //手机号
        username: "" // 用户名
      }
    };
  },
  filters:{
    type(key){
      switch (key) {
        case '1':
          return '用户代表'
        case '2':
          return '评标专家'
        default:
          return ''
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Expert/expert_list"];
    this.get_expert_list_method();
  },
  methods: {
    vali_mobile(rule, value, callback) {
      if (value && !/^1[3456789]\d{9}$/.test(value)) {
        callback("请填入正确格式的手机号码"); // 校验未通过
      } else {
        callback(); // 校验未通过
      }
    },
    vali_id_number(rule, value, callback) {
      if (value && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback("请填入正确格式的身份证号码"); // 校验未通过
      } else {
        callback(); // 校验未通过
      }
    },
    get_expert_list_method2() {
      this.page = 1;
      this.get_expert_list_method();
    },
    get_expert_list_method() {
      var params = {};
      params.page = this.page;
      params.keyword = this.keyword;
      params.type = this.type;
      expert_list(params)
        .then(res => {
          this.dataSource = res.data.list;
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.get_expert_list_method();
    },
    edit(record) {
      this.formData = record;
      this.ModalVisible = true;
    },
    del(user_id) {
      var self = this;
      this.$confirm({
        title: '确认删除此专家?',
        onOk() {
          del_expert(user_id).then(res=>{
            self.$message.success(res.msg)
            self.get_expert_list_method2();
          }).catch(error=>self.$message.error(error))
        },
        onCancel() {},
      });
      
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.user_id = this.formData.user_id;
          save_expert(values)
            .then(res => {
              this.$message.success(res.msg);
              this.ModalVisible = false;
              this.get_expert_list_method2();
            })
            .catch(error => this.$message.error(error));
        }
      });
    },
    new_add() {
      this.formData = {
        id: "",
        user_id: "", //用户ID
        specialty: "", //评标专业
        type: "", //类型 1用户代表 2评标专家
        sex: "", //性别 1男 2女
        id_number: "", //身份证号
        org: "", //单位组织
        mobile: "", //手机号
        username: "" // 用户名
      };
      this.ModalVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#expert_list {
  @include component;
}
</style>
<style lang="scss">
.expert_modal {
  .ant-form {
    width: 65%;
    margin: 0 auto;
  }
  .ant-input {
    @extend .pl-10;
  }
}
</style>