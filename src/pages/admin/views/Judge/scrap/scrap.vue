<template>
  <div id="scrap">
    <h5>项目评审 / 投标单位一览表</h5>
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
        <a
          v-if="record.is_scrap_step<=0&&record.is_on==0&&group_leader==1"
          @click="scrap_record"
        >废标</a>
        <!-- 专家组长 -->
        <a
          v-if="record.is_scrap_step<=0&&record.is_edit==1&&group_leader==1"
          @click="scrap_record"
        >修改</a>
        <!-- 专家组长 -->
        <a
          v-if="record.is_scrap_step<=0&&record.is_edit==1&&group_leader==1"
          @click="scrap_record"
        >取消废标</a>
        <!-- 专家组长 -->
        <a
          v-if="record.is_scrap_step<=0&&record.is_on==1&&group_leader==0"
          @click="scrap_record"
        >废标</a>
        <!-- 普通专家 -->
      </template>
    </a-table>
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
      ]
    };
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