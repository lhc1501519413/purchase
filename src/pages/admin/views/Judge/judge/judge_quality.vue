<template>
  <div class="judge_quality">
    <section class="content">
      <h4>资格审查</h4>
      <a-table class="table" :dataSource="judge_quality" :columns="columns" rowKey="supply_id">
        <template slot="status" slot-scope="text,record">
          <a-select disabled v-model="record.status" style="width: 120px">
            <a-select-option disabled value=''>---请选择---</a-select-option>
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
          <a-button type="primary" @click="save_judge_quality_detail">保存</a-button>
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
            v-for="item of judge_quality"
            :key="item.supply_id"
            :value="item.supply_id"
          >{{item.supply_name}}</a-select-option>
        </a-select>
      </div>
      <a-table
        class="mb-20"
        :dataSource="quality_list"
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
        <template slot="status" slot-scope="text,record">
          <a-select v-model="record.status" style="width: 120px">
            <a-select-option disabled value>---请选择---</a-select-option>
            <a-select-option value="1">符合</a-select-option>
            <a-select-option value="2">不符合</a-select-option>
          </a-select>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import {
  get_judge_quality, // 获取参与评审供应商
  save_judge_quality, // 保存（提交）资格审查列表数据
  get_judge_quality_detail, // 获取资格审查供应商明细数据
  save_judge_quality_detail, // 保存资格审查供应商明细数据
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
      judge_quality: [],
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
          title: "资格审查情况",
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
      ModalVisible: false,
      supply_id: "",
      quality_list: [],
      columns2: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "审查内容",
          dataIndex: "name",
          width: "15%"
        },
        {
          title: "具体的条件说明（要求）",
          dataIndex: "desc",
          width: "15%"
        },
        {
          title: "判定依据",
          dataIndex: "gist",
          width: "15%"
        },
        {
          title: "附件",
          dataIndex: "file_list",
          scopedSlots: { customRender: "file_list" },
          width: "10%"
        },
        {
          title: "资格审查",
          scopedSlots: { customRender: "status" },
          width: "10%"
        }
      ]
    };
  },
  created() {
    this.father.current = 0;
    this.get_judge_quality();
  },
  beforeMount() {
    this.father.get_judge_info();
  },
  methods: {
    get_judge_quality() {
      get_judge_quality(this.bid_code)
        .then(res => {
          this.judge_quality = res.data || [];
          this.supply_id = res.data[0].supply_id;
        })
        .catch(error => this.$message.error(error));
    },
    online_judge_quality() {
      // 开始在线资格评审
      this.ModalVisible = true;
      this.switch_supply();
    },
    switch_supply() {
      get_judge_quality_detail(this.bid_code, this.supply_id)
        .then(res => {
          this.quality_list = res.data||[];
        })
        .catch(error => this.$message.error(error));
    },
    save_judge_quality_detail() {
      var key1 = this.quality_list.some(elem => {
        return elem.status == "";
      });
      if (key1) {
        this.$message.info("供应商资格审查未完成，请评审完成后保存");
      } else {
        var formData = {
          bid_code: this.bid_code,
          supply_id: this.supply_id,
          quality_list: this.quality_list.map(elem => {
            var obj = {};
            obj.quality_id = elem.id;
            obj.status = elem.status;
            return obj;
          })
        };
        save_judge_quality_detail(formData)
          .then(res => {
            this.$message.success(res.msg);
          })
          .catch(error => this.$message.error(error));
      }
    },
    afterClose() {
      this.get_judge_quality();
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code,
        supply_list: this.judge_quality
      };
      var key1 = formData.supply_list.some(elem => {
        return elem.status == "";
      });
      var key2 = formData.supply_list.some(elem => {
        return elem.status == 2 && elem.desc == "";
      });
      if (key1) {
        self.$message.info("供应商资格审查未完成，请评审完全后提交");
      } else if (key2) {
        self.$message.info("请填写不符合说明");
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
        save_judge_quality(formData)
        .then(res => {
          self.$message.success(res.msg);
        })
        .catch(error => self.$message.error(error));
      }
    },
    next() {
      if (this.status >= 5) {
        this.$router.push({
          path: "/judge/judge_match",
          query: { bid_code: this.bid_code }
        });
      } else {
        check_judge_next(this.bid_code, 5)
          .then(res => {
            this.$message.success(res.msg);
            this.father.get_judge_info();
            this.$router.push({
              path: "/judge/judge_match",
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
.judge_quality {
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