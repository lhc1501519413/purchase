<template>
  <div class="judge_quality">
    <section class="content">
      <h4>资格审查</h4>
      <a-table class="table" :dataSource="judge_quality" :columns="columns" rowKey="supply_id">
        <template slot="status" slot-scope="text,record">
          <a-select disabled v-model="record.status" style="width: 120px">
            <a-select-option disabled value=''>---请选择---</a-select-option>
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
      style="top: 10%;"
      width="70%"
      :visible="ModalVisible"
      :keyboard="false"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
    >
      <h3 slot="title">在线资格评审</h3>
      <h4>
        <span>{{judge_info.title}}</span>
        <div class="text-right pr-20">
          <a-button type="primary" @click="save_judge_quality_detail">保存</a-button>
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
            v-for="item of judge_quality"
            :key="item.supply_id"
            :value="item.supply_id"
          >{{item.supply_name}}</a-select-option>
        </a-select>
      </div>
      <a-table
        class="mb-20"
        :dataSource="quality_list"
        :columns="columns2"
        :pagination="false"
        rowKey="id"
      >
        <template slot="file_list" slot-scope="text">
          <ul>
            <li v-for="item of text" :key="item.file_path">
              <a :href="item.full_path" target="_blank">{{item.file_name}}</a>
            </li>
          </ul>
        </template>
        <template slot="status" slot-scope="text,record">
          <a-select v-model="record.status" style="width: 120px">
            <a-select-option disabled value>---请选择---</a-select-option>
            <a-select-option value="1">符合</a-select-option>
            <a-select-option value="2">不符合</a-select-option>
          </a-select>
        </template>
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
  get_judge_quality, // 获取参与评审供应商
  save_judge_quality, // 保存（提交）资格审查列表数据
  get_judge_quality_detail, // 获取资格审查供应商明细数据
  save_judge_quality_detail, // 保存资格审查供应商明细数据
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
      judge_quality: [],
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
          title: "资格审查情况",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        },
        {
          title: "说明",
          dataIndex: "desc",
          scopedSlots: { customRender: "desc" },
          width: "20%"
        }
      ],
      ModalVisible: false,
      supply_id: "",
      quality_list: [],
      columns2: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "审查内容",
          dataIndex: "name",
          width: "15%"
        },
        {
          title: "具体的条件说明（要求）",
          dataIndex: "desc",
          width: "15%"
        },
        {
          title: "判定依据",
          dataIndex: "gist",
          width: "15%"
        },
        {
          title: "附件",
          dataIndex: "file_list",
          scopedSlots: { customRender: "file_list" },
          width: "10%"
        },
        {
          title: "资格审查",
          scopedSlots: { customRender: "status" },
          width: "10%"
        }
      ],
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
  created() {
    this.father.current = 0;
    this.get_judge_quality();
  },
  beforeMount() {
    this.father.get_judge_info();
  },
  methods: {
    get_judge_quality() {
      get_judge_quality(this.bid_code)
        .then(res => {
          this.judge_quality = res.data || [];
          this.supply_id = res.data[0].supply_id;
        })
        .catch(error => this.$message.error(error));
    },
    online_judge_quality() {
      // 开始在线资格评审
      this.ModalVisible = true;
      this.switch_supply();
    },
    switch_supply() {
      get_judge_quality_detail(this.bid_code, this.supply_id)
        .then(res => {
          this.quality_list = res.data||[];
        })
        .catch(error => this.$message.error(error));
    },
    save_judge_quality_detail() {
      var key1 = this.quality_list.some(elem => {
        return elem.status == "";
      });
      if (key1) {
        this.$message.info("供应商资格审查未完成，请评审完成后保存");
      } else {
        var formData = {
          bid_code: this.bid_code,
          supply_id: this.supply_id,
          quality_list: this.quality_list.map(elem => {
            var obj = {};
            obj.quality_id = elem.id;
            obj.status = elem.status;
            return obj;
          })
        };
        save_judge_quality_detail(formData)
          .then(res => {
            this.$message.success(res.msg);
          })
          .catch(error => this.$message.error(error));
      }
    },
    afterClose() {
      this.get_judge_quality();
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code,
        supply_list: this.judge_quality
      };
      var key1 = formData.supply_list.some(elem => {
        return elem.status == "";
      });
      var key2 = formData.supply_list.some(elem => {
        return elem.status == 2 && elem.desc == "";
      });
      if (key1) {
        self.$message.info("供应商资格审查未完成，请评审完全后提交");
      } else if (key2) {
        self.$message.info("请填写不符合说明");
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
        save_judge_quality(formData)
        .then(res => {
          self.$message.success(res.msg);
        })
        .catch(error => self.$message.error(error));
      }
    },
    next() {
      if (this.status >= 5) {
        this.$router.push({
          path: "/judge/judge_match",
          query: { bid_code: this.bid_code }
        });
      } else {
        check_judge_next(this.bid_code, 5)
          .then(res => {
            this.$message.success(res.msg);
            this.father.get_judge_info();
            this.$router.push({
              path: "/judge/judge_match",
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
.judge_quality {
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
