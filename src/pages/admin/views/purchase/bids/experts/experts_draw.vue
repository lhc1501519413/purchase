<template>
  <div id="experts_draw">
    <h5>招标管理 / 专家抽取</h5>
    <section class="content">
      <div class="text-right mb-10" v-if="status !== '4'">
        <a-button type="primary" @click="choose_expert">选择专家</a-button>
        <a-button type="primary" @click="save_expert">保存</a-button>
      </div>
      <a-row>
        <a-col :span="6">
          <img class="img_point" :src="point" alt="必填" />
          <span>抽取类型：</span>
          <a-select
            :disabled="status === '4'"
            allowClear
            v-model="formData.draw_type"
            dropdownMatchSelectWidth
            style="width: 65%"
          >
            <a-select-option
              v-for="item of draw_type_list"
              :value="item.value"
              :key="item.value"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <img class="img_point ml-20" :src="point" alt="必填" />
          评标人数：
          <a-input
            :disabled="status === '4'"
            style="width: 60%"
            v-model="formData.eval_number"
          />
        </a-col>
        <a-col :span="11" :offset='1'>
          评标所需时间：
          <a-input
            class="mr-10"
            :disabled="status === '4'"
            style="width: 55%"
            v-model="formData.eval_time"
          />小时（h）
        </a-col>
      </a-row>
      <a-table
        class="table"
        :dataSource="formData.expert_list"
        :columns="columns"
        :pagination="false"
        rowKey="id"
      >
        <template slot="type" slot-scope="text">{{text==1?'用户代表':'评标专家'}}</template>
        <template slot="operation" slot-scope="text,record,index">
          <a
            :disabled="status === '4'"
            href="javascript:;"
            @click="del(record.user_id,index)"
          >移除</a>
        </template>
      </a-table>
    </section>
    <a-modal
      width="65%"
      title="选择专家"
      :visible="ModalVisible"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      :footer="null"
    >
      <a-row>
        专家类别：
        <a-select
          :disabled="status === '4'"
          allowClear
          v-model="draw_type"
          dropdownMatchSelectWidth
          @change="get_expert_list_method2"
          style="width: 30%"
        >
          <a-select-option
            v-for="item of draw_type_list"
            :value="item.value"
            :key="item.value"
          >{{item.title}}</a-select-option>
        </a-select>
        <a-input
          class="pl-10 ml-10 mr-10"
          placeholder="模糊查询：姓名/专业"
          style="width:20%;"
          v-model="keyword"
        ></a-input>
        <a-button type="primary" @click="get_expert_list_method2">搜索</a-button>
      </a-row>
      <a-table
        class="mt"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns2"
        :dataSource="expert_list"
        rowKey="user_id"
        :customRow="rowClick"
        :pagination="false"
      >
        <template slot="sex" slot-scope="text">{{text==1?'男':'女'}}</template>
        <template slot="type" slot-scope="text">{{text==1?'用户代表':'评标专家'}}</template>
      </a-table>
      <a-pagination
        style="text-align:center"
        class="mt"
        showQuickJumper
        :total="total_count"
        @change="paginationChange"
      />
    </a-modal>
  </div>
</template>

<script>
import {
  get_draw_type // 抽取类型列表
} from "@common/js/apis";
import {
  get_expert_draw_info, // 获取抽取详情
  save_bid_expert, // 保存抽取专家
  expert_list // 专家列表
} from "@admin/api/expert";
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      point: require("@static/images/icon_point.png"),
      priv: this.$store.getters.priv,
      bid_code:'',
      status: "",
      formData: {
        id: "",
        bid_code: "", //单号
        status: "", //状态  1带抽取 2已抽取
        draw_type: "", //抽取类型 1自行组建 2自行抽取 3推荐抽取 4委托抽取
        draw_type_name: "", //抽取类型名称
        eval_number: "", //评标人数
        eval_time: "", //评标时间
        expert_list: []
      },
      draw_type_list: [],
      ModalVisible: false,
      page: 1,
      draw_type: "",
      keyword: "",
      expert_list: [],
      total_count: 0,
      selectedRowKeys: [],
      columns: [
        {
          title: "专家姓名",
          dataIndex: "username",
          width: "10%"
        },
        {
          title: "手机号码",
          dataIndex: "mobile",
          width: "10%"
        },
        {
          title: "专家类别",
          dataIndex: "type",
          scopedSlots: { customRender: "type" },
          width: "10%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "20%"
        }
      ],
      columns2: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "姓名",
          dataIndex: "username",
          width: "10%"
        },
        {
          title: "性别",
          dataIndex: "sex",
          scopedSlots: { customRender: "sex" },
          width: "10%"
        },
        {
          title: "专家类别",
          dataIndex: "type",
          scopedSlots: { customRender: "type" },
          width: "10%"
        },
        {
          title: "手机号码",
          dataIndex: "mobile",
          width: "10%"
        },
        {
          title: "身份证号",
          dataIndex: "id_number",
          width: "10%"
        },
        {
          title: "评标专业",
          dataIndex: "specialty",
          width: "10%"
        },
        {
          title: "工作单位",
          dataIndex: "org"
        }
      ]
    };
  },
  created() {
    this.status = this.$route.query.status;
    this.bid_code = this.$route.query.bid_code;
    this.father.selectedKeys = ["/Bid/experts_draw_list"];
    this.get_tree_data();
    this.get_expert_draw_info_method(); // 丢失部分参数
  },
  methods: {
    get_tree_data() {
      get_draw_type()
        .then(res => {
          this.draw_type_list = [...this.$common.treeSelectFormat(res.data)];
        })
        .catch(error => this.$message.error(error));
    },
    get_expert_draw_info_method() {
      get_expert_draw_info(this.bid_code)
        .then(res => {
          this.formData = res.data;
          this.formData.expert_list = res.data.expert_list||[];
          this.formData.expert_list.forEach(elem=>this.selectedRowKeys.push(elem.user_id));
          this.formData.draw_type = res.data.draw_type==='0'?'':res.data.draw_type;
          this.formData.eval_number = res.data.eval_number==='0'?'':res.data.eval_number;
        })
        .catch(error => this.$message.error(error));
    },
    get_expert_list_method2() {
      this.page = 1;
      this.get_expert_list_method();
    },
    get_expert_list_method() {
      var obj = {
        keyword: this.keyword,
        page: this.page,
        type: this.draw_type
      };
      expert_list(obj)
        .then(res => {
          this.expert_list = res.data.list;
          this.total_count = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    choose_expert() {
      this.page = 1;
      this.get_expert_list_method();
      this.ModalVisible = true;
    },
    del(user_id, index) {
      var self = this;
      this.$confirm({
        title: "确认移除此专家?",
        onOk() {
          self.formData.expert_list.splice(index, 1);
          self.selectedRowKeys.remove(user_id);
        },
        onCancel() {}
      });
    },
    rowClick(record, index) {
      return {
        on: {
          // 事件
          click: () => {
            var data = [...this.formData.expert_list];
            if (this.selectedRowKeys.indexOf(record.user_id) == -1) {
              this.selectedRowKeys.push(record.user_id);
              data.push(record);
            } else {
              this.selectedRowKeys.remove(record.user_id);
            }
            var list = this.selectedRowKeys.merge(data, "user_id");
            this.formData.expert_list = list;
          }
        }
      };
    },
    paginationChange(page) {
      this.page = page;
      this.get_expert_list_method();
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      var data = [...this.formData.expert_list, ...selectedRows];
      var list = this.selectedRowKeys.merge(data, "user_id");
      this.formData.expert_list = list;
    },
    save_expert() {
      if(!this.formData.draw_type){
        this.$message.warn('请选择抽取类型');
        return;
      }
      if(!this.formData.eval_number){
        this.$message.warn('请填写评标人数');
        return;
      }
      var formData={};
      formData.bid_code = this.bid_code;
      formData.draw_type = this.formData.draw_type;
      formData.eval_number = this.formData.eval_number;
      formData.eval_time = this.formData.eval_time;
      formData.expert_list = this.formData.expert_list.map(item=>item['user_id']);
      save_bid_expert(formData).then(res => {
        this.$message.success(res.msg)
        let time = setTimeout(()=>{
          this.$router.go(-1);
          clearTimeout(time)
        },1500)
      }).catch(error => this.$message.error(error));
    },

  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#experts_draw {
  @include component;
  .img_point {
    width: 8px;
    height: 8px;
    margin-bottom: 3px;
  }
}
</style>