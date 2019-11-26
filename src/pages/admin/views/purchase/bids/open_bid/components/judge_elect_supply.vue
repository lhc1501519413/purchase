<template>
  <div class="judge_elect">
    <section class="content">
      <a-table class="table" :dataSource="judge_elect" :columns="columns" rowKey="supply_id"></a-table>
    </section>
  </div>
</template>

<script>
import {
  get_judge_elect_supply, // 获取推荐供应商
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
      judge_elect: [],
      columns: [
        {
          title:'序号',
          customRender: (text, record, index) => `${index + 1}`,
          width:'6%'
        },
        {
          title: "供应商名称",
          dataIndex:'supply_name',
          width: "20%",
        },
        {
          title: "最终报价（万元）",
          dataIndex:'report_money',
          width: "15%",
        },
        {
          title: "报价得分",
          dataIndex:'report_score',
          width: "15%",
        },
        {
          title: "技术商务资质信得分",
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
    };
  },
  created() {
    this.father.current = 9;
    this.get_judge_elect_supply();
  },
  methods: {
    get_judge_elect_supply() {
      get_judge_elect_supply(this.bid_code)
        .then(res => {
          this.judge_elect = res.data.supply_list||[];
        })
        .catch(error => this.$message.error(error));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.judge_elect {
  @include content;
}
</style>