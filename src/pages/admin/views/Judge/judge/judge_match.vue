<template>
  <div class="judge_match">
    <section class="content">
      <h4>符合性评审</h4>
      <a-table class="table" :dataSource="judge_match" :columns="columns" rowKey="supply_id">
        <template slot="status" slot-scope="text,record">
          <a-select v-model="record.status" style="width: 120px">
            <a-select-option disabled value=''>---请选择---</a-select-option>
            <a-select-option value="1">符合</a-select-option>
            <a-select-option value="2">不符合</a-select-option>
          </a-select>
        </template>
        <template slot="desc" slot-scope="text,record">
          <a-input v-model="record.desc"></a-input>
        </template>
      </a-table>
      <h4>评审意见</h4>
      <a-row>
        <a-col :span="3" class="text-right">【{{username}}】评审意见：</a-col>
        <a-col :span="13">
          <a-textarea
            v-model="opinion"
            placeholder="请输入评审意见"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </a-col>
      </a-row>
    </section>
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
      <h3 class="text-center">流标</h3>
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
  get_judge_match, // 获取符合性审查列表数据
  save_judge_match, // 保存（提交）符合性审查列表数据
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
      username: localStorage.getItem('username'),
      opinion:'',
      judge_match: [],
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
        },
        {
          title: "说明",
          dataIndex: "desc",
          scopedSlots: { customRender: "desc" },
          width: "20%"
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
    this.father.current = 1;
    this.get_judge_match();
  },
  methods: {
    get_judge_match() {
      get_judge_match(this.bid_code)
        .then(res => {
          this.judge_match = res.data.match_list || [];
          this.opinion = res.data.opinion || '';
        })
        .catch(error => this.$message.error(error));
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code,
        opinion: this.opinion,
        supply_list: this.judge_match
      };
      var key1 = formData.supply_list.some(elem => {
        return elem.status == "";
      });
      var key2 = formData.supply_list.some(elem => {
        return elem.status == 2 && elem.desc == "";
      });
      if (key1) {
        self.$message.info("供应商符合性审查未完成，请评审完全后提交");
      } else if (key2) {
        self.$message.info("请填写不符合说明");
      } else if(this.opinion==''){
        self.$message.info("请填写意见");
      }else if (submit) {
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
        save_judge_match(formData)
          .then(res => {
            self.$message.success(res.msg);
          })
          .catch(error => self.$message.error(error));
      }
    },
    next() {
      if (this.status >= 6) {
        this.$router.push({
          path: "/judge/judge_quality_grade",
          query: { bid_code: this.bid_code }
        });
      } else {
        check_judge_next(this.bid_code, 6)
          .then(res => {
            this.$message.success(res.msg);
            this.father.get_judge_info();
            this.$router.push({
              path: "/judge/judge_quality_grade",
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
.judge_match {
  @include content;
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
