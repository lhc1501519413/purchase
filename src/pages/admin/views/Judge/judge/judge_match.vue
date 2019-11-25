<template>
  <div class="judge_match">
    <section class="content">
      <h4>符合性评审</h4>
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
  get_judge_match, // 获取符合性审查列表数据
  save_judge_match, // 保存（提交）符合性审查列表数据
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
    this.get_judge_match();
  },
  methods: {
    get_judge_match() {
      get_judge_match(this.bid_code)
        .then(res => {
          this.judge_match = res.data.match_list || [];
          this.opinion = res.data.opinion || '';
        })
        .catch(error => this.$message.error(error));
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code,
        opinion: this.opinion,
        supply_list: this.judge_match
      };
      var key1 = formData.supply_list.some(elem => {
        return elem.status == "";
      });
      var key2 = formData.supply_list.some(elem => {
        return elem.status == 2 && elem.desc == "";
      });
      if (key1) {
        self.$message.info("供应商符合性审查未完成，请评审完全后提交");
      } else if (key2) {
        self.$message.info("请填写不符合说明");
      } else if(this.opinion==''){
        self.$message.info("请填写意见");
      }else if (submit) {
        self.$confirm({
          title: "温馨提示",
          content: "提交后不可修改，是否确认提交",
          okText: "确认",
          cancelText: "取消",
          onOk() {
            formData.submit = submit;
            save_fn();
          }
        });
      } else {
        save_fn();
      }
      function save_fn() {
        save_judge_match(formData)
          .then(res => {
            self.$message.success(res.msg);
          })
          .catch(error => self.$message.error(error));
      }
    },
    next() {
      if (this.status >= 6) {
        this.$router.push({
          path: "/judge/judge_quality_grade",
          query: { bid_code: this.bid_code }
        });
      } else {
        check_judge_next(this.bid_code, 6)
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