<template>
  <div id="scrap">
    <h5>
      <div>项目评审 / 投标单位一览表</div>
      <div>
        <a-button class="mr-10" @click="$router.go(-1)">返回</a-button>
        <a-button class="ml-10" type='primary' @click="scrap_supply_list">刷新</a-button>
      </div>
    </h5>
    <a-table
      class="content"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
      rowKey="supply_id"
    >
      <template slot="is_scrap_step" slot-scope="value">
        <span>{{value>0?'已废标':'未废标'}}</span>
      </template>
      <template slot="operation" slot-scope="text,record">
        <a v-if="record.is_record==1" @click="scrap_record(record.supply_id)">废标记录</a>
        <!-- <a
          v-if="record.is_scrap_step<=0&&record.is_on==0&&group_leader==1"
          @click="scrap_record(record.supply_id)"
        >废标记录</a> -->
        <a
          v-if="record.is_scrap_step<=0&&record.is_on==0&&group_leader==1"
          @click="add_scrap(record.supply_id)"
        >废标</a>
        <!-- 专家组长 -->
        <a
          v-if="record.is_scrap_step<=0&&record.is_edit==1&&group_leader==1"
          @click="second_add_scrap(record.supply_id)"
        >修改</a>
        <!-- 专家组长 -->
        <a
          v-if="record.is_scrap_step<=0&&record.is_edit==1&&group_leader==1"
          @click="cancel_scrap(record.scrap_code)"
        >取消废标</a>
        <!-- 专家组长 -->
        <a
          v-if="record.is_scrap_step<=0&&record.is_on==1&&group_leader==0"
          @click="second_add_scrap(record.supply_id)"
        >废标</a>
        <!-- 普通专家 -->
      </template>
    </a-table>
    <a-modal
      class="scrap-modal"
      :afterClose="afterClose"
      :destroyOnClose="true"
      style="top: 10%;"
      width="55%"
      :visible="ModalVisible"
      :keyboard="false"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
    >
      <h3 slot="title">废标</h3>
      <div class="row">供应商名称：{{scrap_info.supply_name}}</div>
      <div class="row">废标节点：{{scrap_info.step_name}}</div>
      <div class="row">关于参与基准值单位设定：废标单位不参与基准值计算</div>
      <div class="row">
        <span>废标原因：</span>
        <a-textarea
          v-if="group_leader==1"
          v-model="scrap_info.reason"
          placeholder="请输入废标原因"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
        <span v-else>{{scrap_info.reason}}</span>
      </div>
      <div class="row">
        是否同意废标：
        <a-radio-group name="radioGroup" v-model="is_agree">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
      <div class="row">
        填写专家意见：
        <a-textarea
          v-model="opinion"
          placeholder="请填写专家意见"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </div>
      <div class="text-center">
        <a-button class="mr-10" @click="ModalVisible=false">取消</a-button>
        <a-button class="ml-10" @click="leader_submit" type="primary">提交</a-button>
      </div>
    </a-modal>
    <a-modal
      class="scrap-modal"
      :afterClose="afterClose"
      :destroyOnClose="true"
      style="top: 10%;"
      width="55%"
      :visible="ModalVisible2"
      :keyboard="false"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible2 = false"
      @cancel="ModalVisible2 = false"
    >
      <h3 slot="title">废标记录</h3>
      <div v-for="(item,index) of scrap_list" :key="index" class="p-10">
        <h3>
          <span>
            废标记录（{{index+1}}）
          </span>
          <span class="ml-20">
            发起时间：{{item.create_time}}
          </span>
        </h3>
        <a-row class="mb-10 mt-10">
          <a-col :span="10" :offset="1">供应商名称：{{item.supply_name}}</a-col>
          <a-col :span="10" :offset="1">状态：{{item.status|status}}</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="10" :offset="1">废标节点：{{item.step_name}}</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="22" :offset="1">关于参与基准值单位设定：废标单位不参与基准值计算</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="22" :offset="1">废标原因：{{item.reason}}</a-col>
        </a-row>
        <a-table
          :dataSource="item.record_list"
          :columns="columns2"
          :pagination="false"
          rowKey="user_id"
        >
        <template slot="status" slot-scope='value'>
          {{value==1?'同意':'不同意'}}
        </template>
        </a-table>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  scrap_supply_list, // 废标供应商列表
  get_scrap_list, // 获取废标记录
  get_start_scrap_info, // 专家组长初始化获取废标信息
  get_scrap_info, // 普通专家获取废标详情
  save_start_scrap, // 组长发起/修改废标
  cancel_scrap, // 取消废标
  submit_scrap // 专家提交废标意见
} from "@admin/api/judge";
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
      priv: this.$store.getters.priv,
      bid_code: this.$route.query.bid_code,
      group_leader: this.$route.query.l_id,
      dataSource: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "单位名称",
          dataIndex: "supply_name",
          width: "10%"
        },
        {
          title: "状态",
          dataIndex: "is_scrap_step",
          scopedSlots: { customRender: "is_scrap_step" },
          width: "10%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "15%"
        }
      ],
      ModalVisible: false,
      is_agree: "", // 是否同意废标
      opinion: "", // 专家意见
      scrap_info: {
        bid_code: "",
        supply_id: "",
        supply_name: "",
        scrap_code: "", //废标单号
        step: "", //废标环节
        step_name: "", //废标环节名称
        reason: "" //废标原因
      },
      ModalVisible2: false,
      scrap_list: [
        {
          bid_code: "", // 招标单号
          supply_id: "", // 供应商id
          supply_name: "", // 供应商名称
          scrap_code: "", //废标单号
          step: "", //废标环节
          step_name: "", //废标环节名称
          reason: "", //废标原因
          status: "", //状态0未废标 1已取消 2已达成废标
          record_list: [
            {
              user_id: "", //专家id
              username: "", // 专家姓名
              opinion: "", // 意见
              status: "" //是否同意状态0不同意 1同意
            }
          ]
        },
        {
          bid_code: "", // 招标单号
          supply_id: "", // 供应商id
          supply_name: "", // 供应商名称
          scrap_code: "", //废标单号
          step: "", //废标环节
          step_name: "", //废标环节名称
          reason: "", //废标原因
          status: "", //状态0未废标 1已取消 2已达成废标
          record_list: [
            {
              user_id: "", //专家id
              username: "", // 专家姓名
              opinion: "", // 意见
              status: "" //是否同意状态0不同意 1同意
            }
          ]
        }
      ],
      columns2: [
        {
          title: "专家姓名",
          dataIndex: "username",
          width: "10%"
        },
        {
          title: "是否同意",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        },
        {
          title: "专家意见",
          dataIndex: "opinion",
          width: "15%"
        }
      ]
    };
  },
  filters: {
    status(key) {
      switch (key) {
        case "0":
          return "未废标";
          break;
        case "1":
          return "已取消";
          break;
        case "2":
          return "已达成废标";
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.scrap_supply_list();
    this.father.selectedKeys = ["/Judge/bid_list"];
  },
  methods: {
    scrap_supply_list() {
      scrap_supply_list(this.bid_code)
        .then(res => {
          this.dataSource = res.data || [];
        })
        .catch(error => this.$message.error(error));
    },
    afterClose() {
      this.scrap_supply_list();
      this.is_agree = '';
      this.opinion = '';
    },
    scrap_record(supply_id) {
      get_scrap_list({ bid_code: this.bid_code, supply_id })
        .then(res => {
          this.ModalVisible2 = true;
          this.scrap_list = res.data || [];
        })
        .catch(error => this.$message.error(error));
    },
    add_scrap(supply_id) {
      this.ModalVisible = true;
      get_start_scrap_info({ bid_code: this.bid_code, supply_id })
        .then(res => {
          this.scrap_info = res.data || {};
        })
        .catch(error => this.$message.error(error));
    },
    second_add_scrap(supply_id) {
      this.ModalVisible = true;
      get_scrap_info({ bid_code: this.bid_code, supply_id })
        .then(res => {
          this.scrap_info = res.data || {};
          this.is_agree = +res.data.status||'';
          this.opinion = res.data.opinion||'';
        })
        .catch(error => this.$message.error(error));
    },
    cancel_scrap(scrap_code) {
      var self = this;
      self.$confirm({
        title: "温馨提示",
        content: "确认取消废标吗？",
        onOk() {
          cancel_scrap(scrap_code)
            .then(res => self.$message.success(res.msg))
            .catch(error => self.$message.error(error));
        }
      });
    },
    leader_submit(scrap_code) {
      var formData = {
        scrap_code: this.scrap_info.scrap_code,
        bid_code: this.bid_code,
        supply_id: this.scrap_info.supply_id,
        step: this.scrap_info.step, // 废标环节
        reason: this.scrap_info.reason, // 废标原因
        status: this.is_agree, // 是否同意废标
        opinion: this.opinion // 专家意见
      };
      if (this.group_leader == 1) {
        save_start_scrap(formData)
          .then(res =>{
            this.$message.success(res.msg)
            this.ModalVisible=false;
          }).catch(error => this.$message.error(error));
      } else {
        submit_scrap({
          scrap_code:this.scrap_info.scrap_code,
          status: this.is_agree, // 是否同意废标
          opinion: this.opinion // 专家意见
        }).then(res => {
          this.$message.success(res.msg)
          this.ModalVisible=false;
        }).catch(error => this.$message.error(error));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#scrap {
  @include component;
}
</style>
<style lang="scss">
.scrap-modal {
  width: 100%;
  .row {
    @include flex(flex-start, flex-start);
    @extend .mb-10;
    .ant-input {
      @extend .pl-10;
      width: 70%;
    }
  }
}
</style>