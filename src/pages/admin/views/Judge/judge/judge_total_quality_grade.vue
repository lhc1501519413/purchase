<template>
  <div class="judge_total_quality_grade">
    <section class="content">
      <h4>专家评分汇总</h4>
      <a-button class="ml-10" v-if='father.group_leader==1' @click="back_expert_judge_score">退回专家打分</a-button>
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
  submit_judge_total_quality_grade, // 保存商务技术评分汇总
  back_expert_judge_score // 退回专家打分
} from "@admin/api/judge";
export default {
  props: {
    father: {
      type: Object
    },
    status: {
      type: String
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
    this.father.current = 3;
    this.get_judge_total_quality_grade();
  },
  methods: {
    get_judge_total_quality_grade() {
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
    back_expert_judge_score(){
      back_expert_judge_score({bid_code:this.bid_code}).then(res=>{
        this.$router.replace({path:'/judge/judge_quality_grade',query:{bid_code:this.bid_code}});
        this.father.get_judge_info();
        this.$message.success(res.msg);
      }).catch(error => this.$message.error(error));
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code
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
        submit_judge_total_quality_grade(formData)
          .then(res => {
            self.$message.success(res.msg);
          })
          .catch(error => self.$message.error(error));
      }
    },
    next() {
      var self = this;
      if (this.status >= 12) {
        this.$router.push({
          path: "/judge/judge_report",
          query: { bid_code: this.bid_code }
        });
        self.$message.success(res.msg);
        self.father.get_judge_info();
      } else {
        self.$confirm({
          title: "温馨提示",
          content: "需要报价标开启完后才可进入下一步。",
          okText: "确认",
          cancelText: "取消",
        });
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