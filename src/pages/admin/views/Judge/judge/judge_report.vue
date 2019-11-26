<template>
  <div class="judge_report">
    <section class="content">
      <h4>报价情况</h4>
      <a-table class="table" :dataSource="judge_report" :columns="columns" rowKey="supply_id">
        <template slot="status" slot-scope="text,record">
          <a-select v-model="record.status" disabled style="width: 120px">
            <a-select-option disabled value>---请选择---</a-select-option>
            <a-select-option value="1">符合</a-select-option>
            <a-select-option value="2">不符合</a-select-option>
          </a-select>
        </template>
        <template slot="desc" slot-scope="text,record">
          <a-input v-model="record.desc"></a-input>
        </template>
      </a-table>
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
          <a-button type="primary" @click="save_judge_report_detail">保存</a-button>
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
            v-for="item of judge_report"
            :key="item.supply_id"
            :value="item.supply_id"
          >{{item.supply_name}}</a-select-option>
        </a-select>
      </div>
      <div class="mt-10 mb-10">
        报价是否有效：
        <a-select v-model='valid' style="width: 100px">
          <a-select-option value="1">有效</a-select-option>
          <a-select-option value="2">无效</a-select-option>
        </a-select>
      </div>
      <a-table
        class="mb-20"
        :dataSource="stock_list"
        :columns="columns2"
        :pagination="false"
        rowKey="id"
      >
        <template slot="is_match" slot-scope="value">{{value==1?'是':'否'}}</template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import {
  get_judge_report, // 获取报价评审列表
  save_judge_report, // 保存报价评审
  get_judge_report_detail, // 获取供应商报价详情
  save_judge_report_detail, // 保存供应商报价详情
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
      judge_report: [],
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
        }
      ],
      ModalVisible: false,
      supply_id: "",
      valid: "",
      stock_list: [],
      columns2: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "5%",
          align: "center"
        },
        {
          title: "商品名称",
          dataIndex: "stock_name",
          width: "7%",
          align: "center"
        },
        {
          title: "品牌",
          dataIndex: "brand",
          width: "5%",
          align: "center"
        },
        {
          title: "规格",
          dataIndex: "standard",
          width: "6%",
          align: "center"
        },
        {
          title: "采购单位",
          dataIndex: "price_unit_name",
          width: "6%",
          align: "center"
        },
        {
          title: "采购数量",
          dataIndex: "number",
          width: "8%",
          align: "center"
        },
        {
          title: "报价单价（元）",
          dataIndex: "price",
          width: "9%",
          align: "center"
        },
        {
          title: "响应品牌",
          dataIndex: "response_brand",
          width: "9%",
          align: "center"
        },
        {
          title: "响应规格",
          dataIndex: "response_standard",
          width: "9%",
          align: "center"
        },
        {
          title: "是否符合",
          dataIndex: "is_match",
          width: "8%",
          align: "center",
          scopedSlots: { customRender: "is_match" }
        }
      ]
    };
  },
  created() {
    this.father.current = 4;
    this.get_judge_report();
  },
  beforeMount() {
    this.father.get_judge_info();
  },
  methods: {
    get_judge_report() {
      get_judge_report(this.bid_code)
        .then(res => {
          this.judge_report = res.data || [];
          this.supply_id = res.data[0].supply_id;
        })
        .catch(error => this.$message.error(error));
    },
    online_judge_report() {
      // 开始在线报价评审
      this.ModalVisible = true;
      this.switch_supply();
    },
    switch_supply() {
      get_judge_report_detail(this.bid_code, this.supply_id)
        .then(res => {
          this.stock_list = res.data.stock_list||[];
          this.valid = res.data.status||'';
        })
        .catch(error => this.$message.error(error));
    },
    save_judge_report_detail() {
      if (this.valid=='') {
        this.$message.info("请选择是否有效");
      } else {
        var formData = {
          bid_code: this.bid_code,
          supply_id: this.supply_id,
          status:this.valid
        };
        save_judge_report_detail(formData)
          .then(res => this.$message.success(res.msg))
          .catch(error => this.$message.error(error));
      }
    },
    afterClose() {
      this.get_judge_report();
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code
      };
      var key1 = self.judge_report.some(elem => elem.status == "");
      if (key1) {
        self.$message.info("供应商报价评审未完成，请评审完成后提交");
      } else if (submit) {
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
        save_judge_report(formData)
          .then(res => {
            self.$message.success(res.msg);
          })
          .catch(error => self.$message.error(error));
      }
    },
    next() {
      if (this.status >= 13) {
        this.$router.push({
          path: "/judge/judge_result",
          query: { bid_code: this.bid_code }
        });
      } else {
        check_judge_next(this.bid_code, 13)
          .then(res => {
            this.$message.success(res.msg);
            this.father.get_judge_info();
            this.$router.push({
              path: "/judge/judge_result",
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
.judge_report {
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