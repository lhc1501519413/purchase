<template>
  <div class="business_result">
    <section class="content">
      <h4>专家评分汇总</h4>
      <a-table class="table" :dataSource="business_result" :columns="columns" rowKey="supply_id">
        <template slot="result">
          符合
        </template>
      </a-table>
    </section>
  </div>
</template>

<script>
import {
  get_business_result, // 获取商务技术评分汇总
  open_report // 商务技术评分汇总下一步
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
      business_result: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "供应商",
          dataIndex:'supply_name',
          width: "10%",
        },
        {
          title: "评审结果",
          width: "10%",
          scopedSlots:{ customRender:'result' }
        },
        {
          title: "商务技术得分",
          dataIndex:'business_skill_score',
          width: "10%",
        }
      ],
    };
  },
  created() {
    this.father.current = 5;
    this.get_business_result();
  },
  methods: {
    get_business_result() {
      get_business_result(this.bid_code)
        .then(res => this.business_result = res.data || [] )
        .catch(error => this.$message.error(error));
    },
     next() {
      if(this.status>9){
        this.$router.push({path:'/Bid/supply_report',query:{bid_code:this.bid_code}})
      }else{
        open_report({bid_code:this.bid_code}).then(res => {
          this.$router.push({path:'/Bid/supply_report',query:{bid_code:this.bid_code}})
        }).catch(error => this.$message.error(error));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.business_result {
  @include content;
}
</style>