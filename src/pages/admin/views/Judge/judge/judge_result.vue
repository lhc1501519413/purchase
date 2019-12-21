<template>
  <div class="judge_result">
    <section class="content">
      <h4>得分汇总列表</h4>
      <a-table 
        class="table" 
        :dataSource="judge_result" 
        :columns="columns" 
        rowKey="supply_id"
        >
      </a-table>
      <!-- <a-table class="table" :customRow="rowClick" :dataSource="judge_result" :columns="columns" rowKey="supply_id" :rowSelection="rowSelection"></a-table> -->
      <h4>评审意见</h4>
      <div class="ml-20 mb-10" v-for="item of opinion_list" :key='item.user_id'>
        【{{item.realname}}】评审意见：{{item.opinion}}
      </div>
      <h4>其他</h4>
      <a-row>
        <a-col :span="3" class="text-right">比较和评价：</a-col>
        <a-col :span="13">
          <a-textarea
            :disabled="status >= '14'"
            v-model="opinion"
            placeholder="请输入为什么选择这个供应商？"
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
  get_judge_result, // 获取商务技术评分汇总
  save_judge_supply_elect, // 推荐标记供应商
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
      judge_result: [],
      opinion:'',
      opinion_list:[],
      columns: [
        /* 去除专家方推荐后添加 */
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "供应商名称",
          dataIndex:'supply_name',
          width: "20%",
        },
        {
          title: "最终报价（元）",
          dataIndex:'report_money',
          width: "15%",
        },
        {
          title: "报价得分",
          dataIndex:'report_score',
          width: "15%",
        },
        {
          title: "技术商务资质得分",
          dataIndex:'business_skill_score',
          width: "15%",
        },
        {
          title: "总得分",
          dataIndex:'total_score',
          width: "15%",
        },
        {
          title: "排名",
          dataIndex:'rank',
          width: "10%",
        },
      ],
      selectedRowKeys:[],
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
  computed:{
    rowSelection(){
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        columnTitle:'推荐中标',
        onChange: selectedRowKeys => this.selectedRowKeys = selectedRowKeys,
        getCheckboxProps: record => ({
          props: {
            disabled: this.status >= '14'||record.is_agree_price==2
          },
        }),
      }
    }
  },
  created() {
    this.father.current = 5;
    this.get_judge_result();
  },
  methods: {
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            if(this.status >= '14'||record.is_agree_price==2) return;
            if (this.selectedRowKeys.indexOf(record.supply_id) == -1) {
              this.selectedRowKeys.push(record.supply_id);
            } else {
              this.selectedRowKeys.remove(record.supply_id);
            }
          }
        }
      };
    },
    get_judge_result() {
      get_judge_result(this.bid_code)
        .then(res => {
          this.judge_result = res.data.supply_list||[];
          this.opinion_list = res.data.opinion_list||[];
          this.opinion = res.data.opinion;
          this.selectedRowKeys=[];
          this.judge_result.forEach(elem=>{
            if(elem.is_elect==1) this.selectedRowKeys.push(elem.supply_id)
          })
        })
        .catch(error => this.$message.error(error));
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code,
        // supply_ids: this.selectedRowKeys.join(','),
        opinion:this.opinion
      };
      self.$confirm({
        title: "温馨提示",
        content: "提交后不可修改，是否确认提交",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          save_fn();
        }
      });
      function save_fn() {
        save_judge_supply_elect(formData)
          .then(res => {
            self.$message.success('提交成功，即将跳转回项目评审列表');
            let time = setTimeout(()=>{
              self.$router.push({path:'/Judge/bid_list'});
              clearTimeout(time);
            },1500)
            self.$once("hook:beforeDestroy", () => {
              clearTimeout(time);
            });
          })
          .catch(error => {
            if(error.code==-10){
              self.formData.reason = error.msg;
              self.ModalVisible2 = true;
            }else{
              self.$message.error(error.msg)
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
.judge_result {
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
