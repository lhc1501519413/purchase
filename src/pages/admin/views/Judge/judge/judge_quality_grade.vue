<template>
  <div class="judge_quality_grade">
    <section class="content">
      <h4>专家评分</h4>
      <a-table class="table" :dataSource="judge_quality_grade" :columns="columns" rowKey="id"></a-table>
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
    <a-modal
      class="judge-modal"
      :afterClose="afterClose"
      :destroyOnClose="true"
      style="top: 10%;"
      width="70%"
      :visible="ModalVisible"
      :keyboard="false"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
    >
      <h3 slot="title">在线资格评审</h3>
      <h4>
        <span>{{judge_info.title}}</span>
        <div class="text-right pr-20">
          <a-button type="primary" @click="save_judge_quality_grade_detail">保存</a-button>
        </div>
      </h4>
      <div class="mt-10">
        <a-icon type="file-text" />
        项目编号：{{judge_info.custom_code}}
        <a-icon type="user" />
        采购单位：{{judge_info.com_name}}
        <a-icon type="profile" />
        采购方式：{{judge_info.bid_type_name}}
      </div>
      <div class="mt-10 mb-10">
        切换供应商：
        <a-select v-model="supply_id" style="width: 300px" @change="switch_supply">
          <a-select-option
            v-for="item of supply_list"
            :key="item.supply_id"
            :value="item.supply_id"
          >{{item.supply_name}}</a-select-option>
        </a-select>
      </div>
      <a-table
        class="mb-20"
        :dataSource="judge_quality_grade_list"
        :columns="columns2"
        :pagination="false"
        rowKey="id"
      >
        <template slot="file_list" slot-scope="text">
          <ul>
            <li v-for="item of text" :key="item.file_path">
              <a :href="item.full_path" target="_blank">{{item.file_name}}</a>
            </li>
          </ul>
        </template>
        <template slot="score" slot-scope="text,record">
          <a-input type='number' class='pl-10' v-model.number="record.score" />
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import {
  get_judge_quality_grade, // 获取商务技术评分
  save_judge_quality_grade, // 保存（提交）获取商务技术评分
  get_judge_quality_grade_detail, // 获取商务技术评分明细数据
  save_judge_quality_grade_detail, // 保存商务技术评分明细数据
  check_judge_next // 评审下一步操作
} from "@admin/api/judge";
export default {
  props: {
    father: {
      type: Object
    },
    status: {
      type: String
    },
    judge_info: {
      type: Object
    }
  },
  data() {
    return {
      priv: this.$store.getters.priv,
      bid_code: this.$route.query.bid_code,
      user_name: this.global.username,
      opinion: "",
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
          width: "6%"
        }
      ],
      ModalVisible: false,
      supply_list: [],
      supply_id: "",
      judge_quality_grade_list: [],
      columns2: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "评分项目",
          dataIndex: "name",
          width: "15%"
        },
        {
          title: "评分标准",
          dataIndex: "judge_standard",
          width: "15%"
        },
        {
          title: "判定依据",
          dataIndex: "gist",
          width: "15%"
        },
        {
          title: "最高得分",
          dataIndex: "max_score",
          width: "15%"
        },
        {
          title: "附件",
          dataIndex: "file_list",
          scopedSlots: { customRender: "file_list" },
          width: "10%"
        },
        {
          title: "评审分数",
          scopedSlots: { customRender: "score" },
          width: "10%"
        }
      ]
    };
  },
  created() {
    this.father.current = 2;
    this.get_judge_quality_grade();
  },
  methods: {
    get_judge_quality_grade() {
      get_judge_quality_grade(this.bid_code)
        .then(res => {
          // this.judge_quality_grade = res.data || [];
          this.opinion = res.data.opinion;
          this.supply_list = res.data.supply_list;
          this.supply_id = res.data.supply_list[0].supply_id;
          var supply_list = res.data.supply_list;
          supply_list.forEach(elem=> {
            let obj = {
              title: elem.supply_name,
              dataIndex:`score_${elem.supply_id}`,
              width: "10%"
            };
            if (this.columns.length != 4 + supply_list.length) this.columns.push(obj);
          });
          this.judge_quality_grade = res.data.quality_grade_list;
        })
        .catch(error => this.$message.error(error));
    },
    online_judge_quality_grade() {
      // 开始在线资格评审
      this.ModalVisible = true;
      this.switch_supply();
    },
    switch_supply() {
      get_judge_quality_grade_detail(this.bid_code, this.supply_id)
        .then(res => {
          this.judge_quality_grade_list = res.data;
        })
        .catch(error => this.$message.error(error));
    },
    save_judge_quality_grade_detail() {
      var key1 = this.judge_quality_grade_list.some(elem => elem.score == "");
      if (key1) {
        this.$message.info("供应商分数评审未完全，请评审完全后保存");
      } else {
        var formData = {
          bid_code: this.bid_code,
          supply_id: this.supply_id,
          quality_grade_list: this.judge_quality_grade_list.map(elem => {
            var obj = {};
            obj.quality_grade_id = elem.id;
            obj.score = elem.score;
            return obj;
          })
        };
        save_judge_quality_grade_detail(formData)
          .then(res => {
            this.$message.success(res.msg);
          })
          .catch(error => this.$message.error(error));
      }
    },
    afterClose() {
      this.get_judge_quality_grade();
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code,
        opinion: this.opinion
      };
      if(formData.opinion==''){
        this.$message.info("请填写意见");
        return
      }
      if (submit) {
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
        save_judge_quality_grade(formData)
          .then(res => {
            self.$message.success(res.msg);
          })
          .catch(error => self.$message.error(error));
      }
    },
    next() {
      if (this.status >= 7) {
        this.$router.push({
          path: "/judge/judge_total_quality_grade",
          query: { bid_code: this.bid_code }
        });
      } else {
        check_judge_next(this.bid_code, 7)
          .then(res => {
            this.$message.success(res.msg);
            this.father.get_judge_info();
            this.$router.push({
              path: "/judge/judge_total_quality_grade",
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
.judge_quality_grade {
  @include content;
}
</style>
<style lang="scss">
.judge-modal {
  h4 {
    @include flex(space-between);
    font-size: 22px;
    span {
      flex: 4;
    }
    div {
      flex: 1;
    }
  }
}
</style>