<template>
  <div class="judge_total_quality_grade">
    <section class="content">
      <h4>专家评分汇总</h4>
      <a-table class="table" :dataSource="judge_total_quality_grade" :columns="columns" rowKey="user_id"></a-table>
      <h4>评审意见</h4>
      <div class="ml-20 mb-10" v-for="item of opinion_list" :key='item.user_id'>
        【{{item.realname}}】评审意见：{{item.opinion}}
      </div>
    </section>
  </div>
</template>

<script>
import {
  get_judge_total_quality_grade, // 获取商务技术评分汇总
  publish_business_result // 商务技术评分汇总下一步
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
      judge_total_quality_grade: [],
      opinion_list:[],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "专家名称",
          dataIndex:'realname',
          width: "10%",
        }
      ],
    };
  },
  created() {
    this.father.current = 4;
    this.refresh();
  },
  methods: {
    refresh() {
      get_judge_total_quality_grade(this.bid_code)
        .then(res => {
          var expert_list = res.data.expert_list || [];
          var index = expert_list.indexOfObj('user_id',0);
          var last_item = expert_list.splice(index,1);
          this.judge_total_quality_grade = [...expert_list,...last_item];
          this.opinion_list = res.data.opinion_list || [];
          var supply_list = res.data.supply_list || [];
          supply_list.forEach(elem => {
            let obj = {
              title: elem.supply_name,
              dataIndex:`score_${elem.supply_id}`,
              width: "10%"
            };
            if (this.columns.length != 2 + supply_list.length) this.columns.push(obj);
          });
        })
        .catch(error => this.$message.error(error));
    },
    next() {
      if(this.$store.getters.judgeStatus>=9){ // 如已技术结果公布完成，则直接跳转，否则需发送请求判断再进行跳转
        this.$router.push({path:'/Bid/business_result',query:{bid_code:this.bid_code}})
      }else{
        publish_business_result({bid_code:this.bid_code}).then(res => {
          this.$router.push({path:'/Bid/business_result',query:{bid_code:this.bid_code}})
        }).catch(error => this.$message.error(error));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.judge_total_quality_grade {
  @include content;
}
</style>