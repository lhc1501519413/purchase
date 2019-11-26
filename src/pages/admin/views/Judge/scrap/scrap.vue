<template>
  <div id="scrap">
    <h5>
      <div>项目评审 / 投标单位一览表</div>
      <div>
        <a-button @click="$router.go(-1)">返回</a-button>
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
        <a v-if="record.is_record==1" @click="scrap_record">废标记录</a>
        <a v-if="record.is_scrap_step<=0&&record.is_on==0&&group_leader==1" @click="add_scrap">废标</a>
        <!-- 专家组长 -->
        <a v-if="record.is_scrap_step<=0&&record.is_edit==1&&group_leader==1" @click="edit_scrap">修改</a>
        <!-- 专家组长 -->
        <a
          v-if="record.is_scrap_step<=0&&record.is_edit==1&&group_leader==1"
          @click="cancel_scrap"
        >取消废标</a>
        <!-- 专家组长 -->
        <a v-if="record.is_scrap_step<=0&&record.is_on==1&&group_leader==0" @click="follow_scrap">废标</a>
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
      <a-row>
        <a-col :span="5" class="text-right">供应商名称：</a-col>
        <a-col :span="17">{{scrap_info.supply_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="5" class="text-right">废标节点：</a-col>
        <a-col :span="17">{{scrap_info.supply_key}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="5" class="text-right">关于参与基准值单位设定：</a-col>
        <a-col :span="17">{{scrap_info.step_name_setting}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="5" class="text-right">废标原因：</a-col>
        <a-col :span="17">
          <a-textarea
            v-model="scrap_info.reason"
            placeholder="请输入废标原因"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="5" class="text-right">是否同意废标：</a-col>
        <a-col :span="17">
          <a-radio-group name="radioGroup" v-model="scrap_info.agree_scrap">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="2">否</a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="5" class="text-right">填写专家意见：</a-col>
        <a-col :span="17">
          <a-textarea
            v-if="group_leader==1"
            v-model="scrap_info.expert_opinion"
            placeholder="请填写专家意见"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
          <span v-else>{{scrap_info.expert_opinion}}</span>
        </a-col>
      </a-row>
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
      <div v-for="(item,index) of record_list" :key="index">
        <h3>废标记录{{index+1}}</h3>
        <a-row class="mb-10">
          <a-col :span="4" :offset="1">供应商名称：</a-col>
          <a-col :span="6">{{item.supply_name}}</a-col>
          <a-col :span="4">状态：</a-col>
          <a-col :span="6">{{item.status|status}}</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="4" :offset="1">废标节点：</a-col>
          <a-col :span="6">{{item.step_name}}</a-col>
          <a-col :span="10">
            <a-checkbox disabled :value="item.bid_code">废标单位不参与基准值计算</a-checkbox>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  scrap_supply_list, //废标供应商列表
  get_scrap_list, //获取废标记录
  get_scrap_info, //普通专家获取废标详情
  save_start_scrap, //发起/修改废标
  cancel_scrap, //取消废标
  submit_scrap //提交废标意见
} from "@admin/api/judge";
export default {
  props: {},
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
      ModalVisible2: true,
      scrap_info: {
        bid_code: "招标单号",
        supply_id: "1",
        supply_name: "供应商名字",
        scrap_code: "1", //废标单号
        step: "1", //废标环节
        step_name: "1", //废标环节名称
        reason: "1" //废标原因
      },
      scrap_list: [
        {
          bid_code: "招标单号",
          supply_id: "1",
          supply_name: "供应商名字",
          scrap_code: "1", //废标单号
          step: "1", //废标环节
          step_name: "1", //废标环节名称
          reason: "1", //废标原因
          status: 0, //状态0未废标 1已取消 2已达成废标
          record_list: [
            {
              user_id: "1",
              username: "专家名字",
              opinion: "意见", //
              status: "0" //是否同意状态0不同意 1同意
            }
          ]
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
    },
    scrap_record() {
      console.log("废标记录");
    },
    add_scrap() {
      console.log("组长废标");
    },
    edit_scrap() {
      console.log("组长修改废标");
    },
    cancel_scrap() {
      console.log("组长取消废标");
    },
    follow_scrap() {
      console.log("普通专家废标");
    },
    leader_submit() {
      if (this.group_leader == 1) {
        console.log("组长提交废标");
      } else {
        console.log("普通专家废标");
      }
      console.log(this.scrap_info);
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
  .supply,
  .ant-row {
    @extend .mb-10;
    .ant-input {
      @extend .pl-10;
    }
  }
}
</style>