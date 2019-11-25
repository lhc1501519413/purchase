<template>
  <div class="judge_match">
    <section class="content">
      <h4>专家评分汇总</h4>
      <a-button @click="reback">退回专家打分</a-button>
      <a-table class="table" :dataSource="judge_match" :columns="columns" rowKey="supply_id">
        <template slot="status" slot-scope="text,record">
          <a-select v-model="record.status" style="width: 120px">
            <a-select-option disabled value=''>---请选择---</a-select-option>
            <a-select-option value="1">符合</a-select-option>
            <a-select-option value="2">不符合</a-select-option>
          </a-select>
        </template>
        <template slot="desc" slot-scope="text,record">
          <a-input v-model="record.desc"></a-input>
        </template>
      </a-table>
      <h4>评审意见</h4>
      <a-row>
        <a-col :span="3" class="text-right">【{{user_name}}】评审意见：</a-col>
        <a-col :span="13">
          <a-textarea
            v-model="opinion"
            placeholder="请输入评审意见"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import {
  get_judge_total_quality_grade, // 获取符合性审查列表数据
  check_judge_next // 评审下一步操作
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
      user_name: this.global.username,
      opinion:'',
      judge_match: [],
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
          title: "符合性评审",
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
      ],
    };
  },
  created() {
    this.father.current = 1;
    this.get_judge_total_quality_grade();
  },
  methods: {
    get_judge_total_quality_grade() {
      get_judge_total_quality_grade(this.bid_code)
        .then(res => {
          this.judge_match = res.data.match_list || [];
          this.opinion = res.data.opinion || '';
        })
        .catch(error => this.$message.error(error));
    },
    reback(){
      console.log('退回专家打分')
    },
    next() {
      if (this.status >= 8) {
        this.$router.push({
          path: "/judge/judge_quality_grade",
          query: { bid_code: this.bid_code }
        });
      } else {
        check_judge_next(this.bid_code, 8)
          .then(res => {
            this.$message.success(res.msg);
            this.father.get_judge_info();
            this.$router.push({
              path: "/judge/judge_quality_grade",
              query: { bid_code: this.bid_code }
            });
          })
          .catch(error => this.$message.error(error));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.judge_match {
  @include content;
}
</style>