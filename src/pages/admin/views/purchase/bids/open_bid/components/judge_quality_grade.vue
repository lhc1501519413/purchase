<template>
  <div id="judge_quality_grade">
    <section class="content">
      <a-tabs
        tabPosition="top"
        :activeKey="activeKey"
        @prevClick="callback"
        @nextClick="callback"
        @tabClick="callback($event)"
        :tabBarGutter="10"
      >
        <a-tab-pane v-for="item of judge_quality_grade" :key="item.user_id">
          <h4>专家评分</h4>
          <div slot="tab">{{item.username}}</div>
          <a-table
            class="table"
            :dataSource="item.quality_grade_list"
            :columns="columns"
            rowKey="id"
          >
            <template slot="desc" slot-scope="text">
              <a-input :value="text" disabled></a-input>
            </template>
          </a-table>
          <h4>评审意见</h4>
          <!-- <a-row v-for="item of judge_quality_grade" :key="item.user_id" class="mb-10"> -->
          <a-row>
            <a-col :span="3" class="text-right">【{{item.username}}】评审意见：</a-col>
            <a-col :span="13">
              {{item.opinion}}
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </section>
  </div>
</template>

<script>
import {
  get_judge_quality_grade // 获取参与评审供应商
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
      activeKey: "1",
      supply_list: [],
      judge_quality_grade: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "评分项目",
          dataIndex: "name",
          width: "10%"
        },
        {
          title: "评分标准",
          dataIndex: "judge_standard",
          width: "10%"
        },
        {
          title: "最高得分",
          dataIndex: "max_score",
          width: "10%"
        }
      ]
    };
  },
  created() {
    this.father.current = 3;
    this.refresh();
  },
  methods: {
    refresh(){
      get_judge_quality_grade(this.bid_code)
      .then(res => {
        this.judge_quality_grade = res.data.expert_list || [];
        this.activeKey = res.data.expert_list[0].user_id;
        this.supply_list = res.data.supply_list;
        var supply_list = res.data.supply_list;
        supply_list.forEach(elem => {
          let obj = {
            title: elem.supply_name,
            dataIndex: `score_${elem.supply_id}`,
            width: "10%"
          };
          if (this.columns.length != 4 + supply_list.length)
            this.columns.push(obj);
        });
      })
      .catch(error => this.$message.error(error));
    },
    next() {
      this.$router.push({
        path: "/Bid/judge_total_quality_grade",
        query: { bid_code: this.bid_code }
      });
    },
    callback(name) {
      this.activeKey = name;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
#judge_quality_grade {
  @include content;
}
</style>