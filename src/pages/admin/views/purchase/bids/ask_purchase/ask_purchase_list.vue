<template>
  <div id="ask_purchase_list">
    <h5>招标管理 / 获取采购文件管理</h5>
    <section class="content">
      <search-condition
        ref="condition"
        @change-data="get_ask_purchase_list_method2"
        :statusKey="status"
        :statusList="statusList"
        :bid_type_list="bid_type_list"
        :father="this"
      ></search-condition>
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        rowKey="id"
      >
        <template slot="show_status" slot-scope="value">
          <span>{{value|show_status}}</span>
        </template>
        <template slot="operation" slot-scope="text,record">
          <!-- <a v-if="record.supply_count!=0" href="javascript:;" @click="showModel(text.id,index,text.code)">查看Modal</a> -->
          <router-link :to="{path:'/Bid/check_purchase_info',query:{id:text.id,code:text.code}}" v-if="record.supply_count!=0">查看获取信息</router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
    <a-modal
      class="purchase_list_modal"
      :afterClose="afterClose"
      :destroyOnClose="true"
      style="top: 10%;"
      width="70%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      >
      <h3>项目信息</h3>
      <div class="send-file-btn">
        <a-button type="primary" class="mr-10" @click="give_up">流标</a-button>
        <a-button type="primary" @click="sendFile">发送采购文件</a-button>
      </div>
      <h4>{{formData.title}}</h4>
      <div class="mt-10">
        <a-icon type="file-text" />
        项目编号：{{formData.custom_code}}
        <a-icon type="user" />
        采购单位：{{formData.com_name}}
        <a-icon type="profile" />
        采购方式：{{formData.bid_type_name}}
      </div>
      <a-row class="mt-10 get-situation">
        <a-col :span="6" class="left">
          <h3 class="pb-10 mb-10">供应商获取采购文件情况</h3>
          <a-table
            :scroll="{ y: 400 }"
            :dataSource="dataSource2"
            :columns="columns2"
            :pagination="false"
            :rowClassName="rowClassName"
            rowKey="id"
            :customRow="rowClick"
          >
            <template slot="operation" slot-scope="text">{{text|status}}</template>
          </a-table>
        </a-col>
        <a-col :span="18" class="right">
          <h3 class="pb-10 mb-10">{{supply_info.supply_name}}</h3>
          <h4 class="mb-10">供应商联系信息</h4>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">单位名称：</a-col>
            <a-col :span="8">{{supply_info.supply_name}}</a-col>
            <a-col :span="4" class="text-right">法定代表人：</a-col>
            <a-col :span="8">{{supply_info.legal_user_name}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">联系人姓名：</a-col>
            <a-col :span="8">{{supply_info.contact_name}}</a-col>
            <a-col :span="4" class="text-right">手机号：</a-col>
            <a-col :span="8">{{supply_info.contact_phone}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">邮箱：</a-col>
            <a-col :span="8">{{supply_info.email}}</a-col>
            <a-col :span="4" class="text-right">地址：</a-col>
            <a-col :span="8">{{supply_info.address}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">传真：</a-col>
            <a-col :span="8">{{supply_info.fax}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">附件：</a-col>
            <a-col :span="10">
              <ul>
                <li
                  class="file-list-item"
                  v-for="(item,index) of supply_info.file_list"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span class="ml-10 mr-10">{{item.file_name}}</span>
                  <a :href="item.full_path" target="_blank">下载附件</a>
                </li>
              </ul>
            </a-col>
          </a-row>
          <div v-if="supply_info.status==2">
            <h4 class="mb-10">报名审核</h4>
            <a-row class="mb-10">
              <a-col :span="4" class="text-right">
                <img class="img_point ml-20" :src="point" alt="必填" />
                <span>审核结果：</span>
              </a-col>
              <a-col :span="10">
                <a-radio-group v-model="radio">
                  <a-radio :value="1">通过</a-radio>
                  <a-radio :value="2">不通过</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row class="mb-10">
              <a-col :span="4" class="text-right">审核意见：</a-col>
              <a-col :span="18">
                <a-textarea class="pl-10" placeholder="审核意见" v-model="auditInfo" :rows="4" />
              </a-col>
            </a-row>
          </div>
          <div>
            <h4 v-if="supply_info.log_list" class="mb-10">审核记录</h4>
            <ul class="ml-30">
              <li class="mt-10" v-for="(item,index) of supply_info.log_list" :key='index'>
                <p>操作人员：{{item.com_id!=0?item.com_name:item.supply_name}}</p>
                <p v-if="item.com_id!=0">审核时间：{{item.create_time}}</p>
                <p v-else>提交时间：{{item.create_time}}</p>
                <p v-if="item.com_id!=0">审核结果：{{item.desc}}</p>
                <p v-if="item.com_id!=0">审核意见：{{item.remark}}</p>
              </li>
            </ul>
          </div>
          <div v-if="supply_info.status==2" class="text-right" style="width:92%;">
            <a-button type="primary" @click="save">保存</a-button>
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import {
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  ask_purchase_list, // 获取采购文件列表
  purchase_supply_list, // 查看采购文件获取情况
  audit_purchase_supply, // 审核/驳回 获取采购文件申请
  purchase_supply_info, // 获取获取采购文件信息
  send_purchase_file, // 发送采购文件
  save_bid_fail, // 流标
} from "@admin/api/bids";
export default {
  components: {
    "search-condition": () => import("@admin/components/searchCondition")
  },
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      point: require("@static/images/icon_point.png"),
      priv: this.$store.getters.priv,
      keyword: "",
      status: "0",
      statusList: [
        { value: "0", label: "全部" },
        { value: "1", label: "未截止" },
        { value: "2", label: "已截止" }
      ],
      bid_type: "",
      bid_type_list: [{ value: "0", title: "全部" }],
      page: "",
      dataSource: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "项目编号",
          dataIndex: "custom_code",
          width: "10%"
        },
        {
          title: "项目名称",
          dataIndex: "title",
          width: "10%"
        },
        {
          title: "采购单位",
          dataIndex: "com_name",
          width: "10%"
        },
        {
          title: "采购方式",
          dataIndex: "bid_type_name",
          width: "10%"
        },
        {
          title: "采购类别",
          dataIndex: "cat_name",
          width: "10%"
        },
        {
          title: "获取截止时间",
          dataIndex: "end_time",
          width: "10%"
        },
        {
          title: "获取数量",
          dataIndex: "supply_count",
          width: "10%"
        },
        {
          title: "状态",
          dataIndex: "show_status",
          scopedSlots: { customRender: "show_status" },
          width: "10%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "10%"
        }
      ],
      total: 0,
      dataSource2: [],
      columns2: [
        {
          title: "供应商名称",
          dataIndex: "supply_name",
          width: 150
        },
        {
          title: "审核情况",
          dataIndex: "status",
          width: 130,
          scopedSlots: { customRender: "operation" }
        }
      ],
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          return `共${this.dataSource2.length}条数据`;
        }
      },
      formData: {
        bid_type: "",
        bid_type_name: "",
        cat_id: "",
        cat_name: "",
        code: "",
        com_name: "",
        custom_code: "",
        end_time: "",
        id: "",
        show_status: "",
        status: "",
        supply_count: "",
        title: ""
      },
      ModalVisible: false,
      supply_info: {
        supply_name: "",
        legal_user_name: "",
        contact_name: "",
        contact_phone: "",
        email: "",
        address: "",
        fax: "",
        file_list: [],
        log_list: []
      },
      radio: 1,
      auditInfo: "",
      modalIndex: 0,
      bid_code:'',
      bid_id:'',
      supply_id:''
    };
  },
  filters: {
    show_status: key => {
      switch (key) {
        case "1":
          return "未截止";
          break;
        case "2":
          return "已截止";
          break;
        default:
          return "未知状态";
          break;
      }
    },
    status(key){
      switch (key) {
        case '2':
          return '待审核'
          break;
        case '3':
          return '已驳回'
          break;
        default:
          return '通过'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Bid/ask_purchase_list"];
    this.status = this.$route.params.status || "0";
    this.get_tree_data();
    this.get_ask_purchase_list_method();
  },
  methods: {
    get_tree_data() {
      get_bid_type()
        .then(res => {
          this.bid_type_list = [
            ...this.bid_type_list,
            ...this.$common.treeSelectFormat(res.data)
          ];
        })
        .catch();
    },
    get_ask_purchase_list_method2() {
      this.page = 1;
      this.keyword = this.$refs.condition.keyword;
      this.status = this.$refs.condition.status;
      this.bid_type = this.$refs.condition.bid_type;
      this.get_ask_purchase_list_method();
    },
    get_ask_purchase_list_method() {
      var params = {};
      params.page = this.page;
      params.keyword = this.keyword;
      params.show_status = this.status;
      params.bid_type = this.bid_type;
      ask_purchase_list(params)
        .then(res => {
          this.dataSource = res.data.list;
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    showModel(bid_id, index, bid_code) {
      this.bid_id = bid_id;
      this.bid_code = bid_code;
      this.formData = this.dataSource[index];
      this.purchase_supply_list();
    },
    purchase_supply_list(){
      purchase_supply_list(this.bid_id)
        .then(res => {
          if(!res.data){
            this.$message.warn('暂无供应商申请获取');
            return;
          }
          this.dataSource2 = res.data || [];
          this.supply_id = res.data[0].supply_id;
          purchase_supply_info(this.bid_code,res.data[0].supply_id)
            .then(res2 => {
              this.supply_info = res2.data.supply_info;
              this.ModalVisible = true;
            })
            .catch(error => this.$message.error(error));
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.get_ask_purchase_list_method();
    },
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.modalIndex = index;
            this.supply_id = record.supply_id;
            purchase_supply_info(this.bid_code,this.supply_id)
            .then(res2 => {
              this.supply_info = res2.data.supply_info;
            })
            .catch(error => this.$message.error(error));
          }
        }
      };
    },
    rowClassName(record, index) {
      if (index == this.modalIndex) return "rowClass";
    },
    save() {
      if (this.radio == 2 && !this.auditInfo) {
        this.$message.warn("请输入审核意见");
        return;
      }
      let obj = {
        bid_code:this.bid_code,
        supply_id:this.supply_id,
        status:this.radio,
        remark:this.auditInfo,
      }
      audit_purchase_supply(obj).then(res => {
        this.$message.success(res.msg);
        this.purchase_supply_list();
      })
      .catch(error => this.$message.error(error));
    },
    give_up(){
      save_bid_fail({bid_code:this.bid_code}).then(res => {
        this.ModalVisible = false;
        this.$message.success(res.msg);
      })
      .catch(error => this.$message.error(error));
    },
    sendFile(){
      send_purchase_file(this.bid_code).then(res => {
        this.$message.success(res.msg);
        let time = setTimeout(()=>{
          this.ModalVisible = false;
          clearTimeout(time)
        },1000)
      })
      .catch(error => this.$message.error(error));
    },
    afterClose(){
      this.auditInfo='';
      this.radio = 1;
      this.modalIndex = 0;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#ask_purchase_list {
  @include component;
}
</style>
<style lang="scss">
.purchase_list_modal {
  .send-file-btn{
    position: absolute;
    top: 18px;
    right: 77px;
  }
  .get-situation {
    .ant-table-scroll {
      .ant-table-header,
      .ant-table-body {
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    h3 {
      border-bottom: 2px solid #f1f1f1;
    }
    .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,.rowClass{
      background-color: $primary2;
      color: $white;
    }
    .left {
      @extend .p-10;
      border-right: 2px solid #f1f1f1;
    }
    .right {
      @extend .p-10;
      h4 {
        border-left: 4px solid $primary2;
        @extend .pl-10;
        @extend .ml-10;
      }
      .img_point {
        width: 8px;
        height: 8px;
        margin-bottom: 3px;
      }
      .wenjian {
        width: 17px;
        height: 17px;
      }
    }
    td {
      word-break: break-all;
    }
  }
}
</style>