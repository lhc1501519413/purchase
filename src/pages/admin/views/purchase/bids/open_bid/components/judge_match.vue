<template>
  <div id="judge_match">
    <section class="content">
      <h4>符合性评审</h4>
      <a-tabs
        tabPosition="top"
        :activeKey="activeKey"
        @prevClick="callback"
        @nextClick="callback"
        @tabClick="callback($event)"
        :tabBarGutter="10"
      >
        <a-tab-pane v-for="item of judge_match" :key='item.user_id'>
          <div slot="tab">{{item.username}}</div>
          <a-table class="table" :dataSource="item.quality_info" :columns="columns" rowKey="supply_id">
            <template slot="status" slot-scope="text">
              <a-select :defaultValue="text" disabled style="width: 120px" @change="handleChange">
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
  get_judge_match // 获取参与评审供应商
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
      code: this.$route.query.code,
      activeKey: "1",
      judge_match: [
        {
          id: "2",
          user_id: "1", //用户ID
          mobile: "15155115022", //手机号
          username: "专家姓名1",
          quality_info: [
            {
              bid_code: "招标单号",
              supply_id: "1",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            },
            {
              bid_code: "招标单号",
              supply_id: "2",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            },
            {
              bid_code: "招标单号",
              supply_id: "3",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            }
          ]
        },
        {
          id: "2",
          user_id: "2", //用户ID
          mobile: "15155115022", //手机号
          username: "专家姓名2",
          quality_info: [
            {
              bid_code: "招标单号",
              supply_id: "1",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            },
            {
              bid_code: "招标单号",
              supply_id: "2",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            },
            {
              bid_code: "招标单号",
              supply_id: "3",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            }
          ]
        },
        {
          id: "2",
          user_id: "3", //用户ID
          mobile: "15155115022", //手机号
          username: "专家姓名3",
          quality_info: [
            {
              bid_code: "招标单号",
              supply_id: "1",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            },
            {
              bid_code: "招标单号",
              supply_id: "2",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            },
            {
              bid_code: "招标单号",
              supply_id: "3",
              supply_name: "供应商名字",
              status: "1", //状态 1符合 2不符合
              desc: "说明" //说明
            }
          ]
        }
      ],
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
      ]
    };
  },
  created() {
    this.father.current = 2;
    get_judge_match(this.code)
      .then(res => {
        // this.judge_match = res.data || [];
      })
      .catch(error => this.$message.error(error));
  },
  methods: {
    next() {
      this.$router.push({ path: "/Bid/judge_quality_grade", query:{code: this.code }});
    },
    callback(name) {
      this.activeKey = name;
    },
    handleChange() {}
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
#judge_match {
  @include content;
}
</style>