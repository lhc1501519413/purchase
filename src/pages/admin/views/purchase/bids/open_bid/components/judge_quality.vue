<template>
  <div id="judge_quality">
    <section class="content">
      <a-tabs
        tabPosition="top"
        :activeKey="activeKey"
        @prevClick="callback"
        @nextClick="callback"
        @tabClick="callback($event)"
        :tabBarGutter="10"
      >
        <a-tab-pane v-for="item of judge_quality" :key='item.user_id'>
          <h4>资格审查</h4>
          <div slot="tab">{{item.username}}</div>
          <a-table class="table" :dataSource="item.quality_info" :columns="columns" rowKey="supply_id">
            <template slot="status" slot-scope="text">
              <a-select :defaultValue="text" disabled style="width: 120px">
                <a-select-option value="1">符合</a-select-option>
                <a-select-option value="2">不符合</a-select-option>
              </a-select>
            </template>
            <template slot="desc" slot-scope="text">
              <a-input :value="text" disabled></a-input>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </section>
  </div>
</template>

<script>
import {
  get_judge_quality // 获取参与评审供应商
} from "@admin/api/open_bid";
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      priv: this.$store.getters.priv,
      bid_code: this.$route.query.bid_code,
      activeKey: "",
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
      ]
    };
  },
  created() {
    this.father.current = 1;
    this.refresh();
  },
  methods: {
    refresh(){
      get_judge_quality(this.bid_code)
      .then(res => {
        this.judge_quality = res.data || [];
        this.activeKey = res.data[0].user_id;
      })
      .catch(error => this.$message.error(error));
    },
    next() {
      this.$router.push({ path: "/Bid/judge_match", query:{bid_code: this.bid_code }});
    },
    callback(name) {
      this.activeKey = name;
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
#judge_quality {
  @include content;
}
</style>