<template>
  <div class="judge_report">
    <section class="content">
      <h4>报价情况</h4>
      <a-table class="table" :dataSource="judge_report" :columns="columns" rowKey="supply_id">
        <template slot="status" slot-scope="text,record">
          <a-select v-model="record.status" disabled style="width: 120px">
            <a-select-option disabled value>---请选择---</a-select-option>
            <a-select-option value="1">符合</a-select-option>
            <a-select-option value="2">不符合</a-select-option>
          </a-select>
        </template>
        <template slot="desc" slot-scope="text,record">
          <a-input v-model="record.desc"></a-input>
        </template>
      </a-table>
    </section>
    <a-modal
      class="judge-modal"
      :afterClose="afterClose"
      :destroyOnClose="true"
      style="top: 7%;"
      width="70%"
      :visible="ModalVisible"
      :keyboard="false"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
    >
      <h3 slot="title">在线报价评审</h3>
      <h4>
        <span>{{judge_info.title}}</span>
        <div class="text-right pr-20">
          <a-button type="primary" @click="save_judge_report_detail">保存</a-button>
        </div>
      </h4>
      <div class="mt-10">
        <a-icon type="file-text" />
        项目编号：{{judge_info.custom_code}}
        <a-icon type="user" />
        采购单位：{{judge_info.com_name}}
        <a-icon type="profile" />
        采购方式：{{judge_info.bid_type_name}}
      </div>
      <div class="mt-10 mb-10">
        切换供应商：
        <a-select v-model="supply_id" style="width: 300px" @change="switch_supply">
          <a-select-option
            v-for="item of judge_report"
            :key="item.supply_id"
            :value="item.supply_id"
          >{{item.supply_name}}</a-select-option>
        </a-select>
      </div>
      <div class="mt-10 mb-10">
        报价是否有效：
        <a-select v-model='valid' style="width: 100px">
          <a-select-option value="1">有效</a-select-option>
          <a-select-option value="2">无效</a-select-option>
        </a-select>
      </div>
      <a-table
        class="mb-20"
        :scroll='{
          y:500
        }'
        :dataSource="stock_list"
        :columns="columns2"
        :pagination="false"
        rowKey="id"
      >
        <template slot="is_match" slot-scope="value">{{value|is_match}}</template>
      </a-table>
    </a-modal>
    <a-modal
      class="failure-modal"
      :destroyOnClose="true"
      style="top: 10%;"
      width="55%"
      :visible="ModalVisible2"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible2 = false"
      @cancel="ModalVisible2 = false"
      >
      <h3 class="text-center" slot="title">流标</h3>
      <a-form :form="form" @submit="handleSubmit">
        <h4>项目基本信息</h4>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">项目编号：</a-col>
          <a-col :span="4">{{judge_info.custom_code}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">项目名称：</a-col>
          <a-col :span="4">{{judge_info.title}}</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">采购单位：</a-col>
          <a-col :span="4">{{judge_info.com_name}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">采购方式：</a-col>
          <a-col :span="4">{{judge_info.bid_type_name}}</a-col>
        </a-row>
        <a-form-item label="流标原因" v-bind="formItemLayout">
          <a-textarea
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
          <a-upload
            :showUploadList="false"
            :customRequest="customRequest"
            :beforeUpload="beforeUpload"
            v-decorator="[
              'file_list',
              { rules: [{ required: true, message: '请选择附件' }],initialValue:formData.file_list }
            ]"
          >
            <a-button>
              <a-icon type="upload" />上传
            </a-button>
            <ul>
              <li
                @click.stop="del"
                class="file-list-item"
                v-for="(item,index) of formData.file_list"
                :key="index"
              >
                <svg-icon class="wenjian" icon-class="wenjian" />
                <span class="ml-10 mr-10">{{item.file_name}}</span>
                <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
              </li>
            </ul>
          </a-upload>
        </a-form-item>
        <a-form-item class="text-center">
          <a-button class="mr-10" @click="ModalVisible2 = false">取消</a-button>
          <a-button class="ml-10" type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { POST } from "@common/js/apis";
import {
  get_judge_report, // 获取报价评审列表
  save_judge_report, // 保存报价评审
  get_judge_report_detail, // 获取供应商报价详情
  save_judge_report_detail, // 保存供应商报价详情
  check_judge_next, // 评审下一步操作
  save_bid_fail // 流标
} from "@admin/api/judge";
export default {
  props: {
    father: {
      type: Object
    },
    status: {
      type: String
    },
    judge_info: {
      type: Object
    }
  },
  data() {
    return {
      priv: this.$store.getters.priv,
      bid_code: this.$route.query.bid_code,
      judge_report: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "供应商名称",
          dataIndex: "supply_name",
          width: "10%"
        },
        {
          title: "符合性评审",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        }
      ],
      ModalVisible: false,
      supply_id: "",
      valid: "",
      stock_list: [],
      columns2: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "5%",
          align: "center"
        },
        {
          title: "商品名称",
          dataIndex: "stock_name",
          width: "7%",
          align: "center"
        },
        {
          title: "品牌",
          dataIndex: "brand",
          width: "5%",
          align: "center"
        },
        {
          title: "规格",
          dataIndex: "standard",
          width: "6%",
          align: "center"
        },
        {
          title: "产品参数",
          dataIndex: "note",
          width: "6%",
          align: "center"
        },
        {
          title: "采购单位",
          dataIndex: "price_unit_name",
          width: "6%",
          align: "center"
        },
        {
          title: "采购数量",
          dataIndex: "number",
          width: "8%",
          align: "center"
        },
        {
          title: "报价单价（元）",
          dataIndex: "price",
          width: "9%",
          align: "center"
        },
        // {
        //   title: "响应品牌",
        //   dataIndex: "response_brand",
        //   width: "7%",
        //   align: "center"
        // },
        // {
        //   title: "响应规格",
        //   dataIndex: "response_standard",
        //   width: "7%",
        //   align: "center"
        // },
        // {
        //   title: "响应产品参数",
        //   dataIndex: "response_note",
        //   width: "8%",
        //   align: "center"
        // },
        // {
        //   title: "是否偏离",
        //   dataIndex: "is_match",
        //   width: "7%",
        //   align: "center",
        //   scopedSlots: { customRender: "is_match" }
        // }
      ],
      /* 达成流标条件 */
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      ModalVisible2:false,
      del_icon: require("@static/icon/icon_close.png"),
      formData: {
        reason: "",
        file_list: []
      },
    };
  },
  filters:{
    is_match(key){
      switch (key) {
        case '1':
          return '正偏离'
        case '0':
          return '无偏离'
        case '-1':
          return '负偏离'
      }
    }
  },
  created() {
    this.father.current = 4;
    this.get_judge_report();
  },
  beforeMount() {
    this.father.get_judge_info();
  },
  methods: {
    get_judge_report() {
      get_judge_report(this.bid_code)
        .then(res => {
          this.judge_report = res.data || [];
          this.supply_id = res.data[0].supply_id;
        })
        .catch(error => this.$message.error(error));
    },
    online_judge_report() {
      // 开始在线报价评审
      this.ModalVisible = true;
      this.switch_supply();
    },
    switch_supply() {
      get_judge_report_detail(this.bid_code, this.supply_id)
        .then(res => {
          this.stock_list = res.data.stock_list||[];
          this.valid = res.data.status||'';
        })
        .catch(error => this.$message.error(error));
    },
    save_judge_report_detail() {
      if (this.valid=='') {
        this.$message.info("请选择是否有效");
      } else {
        var formData = {
          bid_code: this.bid_code,
          supply_id: this.supply_id,
          status:this.valid
        };
        save_judge_report_detail(formData)
          .then(res => this.$message.success(res.msg))
          .catch(error => this.$message.error(error));
      }
    },
    afterClose() {
      this.get_judge_report();
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code
      };
      var key1 = self.judge_report.some(elem => elem.status == "");
      if (key1) {
        self.$message.info("供应商报价评审未完成，请评审完成后提交");
      } else if (submit) {
        self.$confirm({
          title: "温馨提示",
          content: "提交后不可修改，是否确认提交",
          okText: "确认",
          cancelText: "取消",
          onOk() {
            formData.submit = submit;
            save_fn();
          }
        });
      } else {
        save_fn();
      }
      function save_fn() {
        save_judge_report(formData)
          .then(res => {
            self.$message.success(res.msg);
          })
          .catch(error => self.$message.error(error));
      }
    },
    next() {
      if (this.status >= 13) {
        this.$router.push({
          path: "/judge/judge_result",
          query: { bid_code: this.bid_code }
        });
      } else {
        check_judge_next(this.bid_code, 13)
          .then(res => {
            this.$message.success(res.msg);
            this.father.get_judge_info();
            this.$router.push({
              path: "/judge/judge_result",
              query: { bid_code: this.bid_code }
            });
          })
          .catch(error => {
            if(error.code==-10){
              this.formData.reason = error.msg;
              this.ModalVisible2 = true;
            }else{
              this.$message.error(error.msg)
            }
          });
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_code: this.bid_code,
            file_list: this.formData.file_list
          };
          save_bid_fail(values)
            .then(res => {
              this.$message.success(res.msg);
              let time = setTimeout(() => {
                this.$router.push({path:'/Judge/bid_list'})
              }, 1000);
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
          this.formData.file_list.push(img_obj);
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    beforeUpload(file) {
      const isJPGPDF =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "application/pdf";
      if (!isJPGPDF) {
        this.$message.error("您只可以上传JPG,PNG,PDF格式的文件");
      }
      var isPicLt100KB;
      var isPdfLt2M;
      if (file.type === "image/jpeg" || file.type === "image/png") {
        if (file.size / 1024 / 1024 < 0.8) {
          isPicLt100KB = true;
        } else {
          this.$message.error("图片大小必须小于 800KB!");
          isPicLt100KB = false;
        }
      } else if (file.type === "application/pdf") {
        if (file.size / 1024 / 1024 < 8) {
          isPdfLt2M = true;
        } else {
          this.$message.error("文件大小必须小于 8MB!");
          isPdfLt2M = false;
        }
      }
      return isJPGPDF && isPicLt100KB && isPdfLt2M;
    },
    del(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData.file_list.splice(index, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.judge_report {
  @include content;
}
</style>
<style lang="scss">
.judge-modal {
  h4 {
    @include flex(space-between);
    font-size: 22px;
    span {
      flex: 4;
    }
    div {
      flex: 1;
    }
  }
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
    padding: 5px;
  }
  .file-list-item {
    margin-top: 5px;
  }
}
</style>
