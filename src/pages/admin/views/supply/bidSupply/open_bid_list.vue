<template>
  <div id="open_bid_list">
    <h5>招标管理 / 开标评标管理</h5>
    <section class="content">
      <a-row>
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input
            class="pl-10"
            style="width: 65%"
            v-model="keyword"
            @keyup.13="open_bid_list_method2"
            placeholder="模糊搜索：项目名称/项目编号"
          />
        </a-col>
        <a-col :span="5">
          <span>状态：</span>
          <a-select
            allowClear
            v-model="status"
            dropdownMatchSelectWidth
            style="width: 74%"
            @change="open_bid_list_method2"
          >
            <a-select-option
              v-for="item of statusList"
              :value="item.value"
              :key="item.value"
            >{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span>采购方式：</span>
          <a-select
            allowClear
            v-model="bid_type"
            dropdownMatchSelectWidth
            style="width: 65%"
            @change="open_bid_list_method2"
          >
            <a-select-option
              v-for="item of bid_type_list"
              :value="item.value"
              :key="item.value"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-button @click="open_bid_list_method2" class="ml-10" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        rowKey="id"
      >
        <template slot="status" slot-scope="value">
          <span>{{value|status}}</span>
        </template>
        <template slot="operation" slot-scope="text,record">
          <a
            v-if="priv.open_sbid_list.decrypt&&record.status==17"
            href="javascript:;"
            @click="get_supply_purchase_info(record.bid_code)"
          >解密</a>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
    <a-modal
      class="supply-purchase-info"
      width="60%"
      :destroyOnClose="false"
      :visible="ModalVisible"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      :footer="null"
    >
      <div slot="title" class="text-center">解密</div>
      <h4>项目基本信息</h4>
      <a-row class="mb-10">
        <a-col :span="4">项目编号：</a-col>
        <a-col :span="7">{{supply_purchase_info.base_info.custom_code}}</a-col>
        <a-col :span="4">项目名称：</a-col>
        <a-col :span="7">{{supply_purchase_info.base_info.title}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="4">采购单位：</a-col>
        <a-col :span="7">{{supply_purchase_info.base_info.bid_type_name}}</a-col>
        <a-col :span="4">采购方式：</a-col>
        <a-col :span="7">{{supply_purchase_info.base_info.bid_type_name}}</a-col>
      </a-row>
      <h4>解密信息</h4>
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="单位名称" v-bind="formItemLayout">
              <span>{{supply_purchase_info.supply_info.supply_name}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="法定代表人" v-bind="formItemLayout">
              <span>{{supply_purchase_info.supply_info.legal_user_name}}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="联系人姓名" v-bind="formItemLayout">
              <a-input
                placeholder="请输入联系人姓名"
                v-decorator="[
              'contact_name',
              { rules: [{ required: true, message: '请输入证件编号' }],initialValue:supply_purchase_info.supply_info.contact_name}
            ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="手机号" v-bind="formItemLayout">
              <a-input
                placeholder="请输入手机号"
                v-decorator="[
              'contact_phone',
              { rules: [{ required: true, message: '请输入手机号' }],initialValue:supply_purchase_info.supply_info.contact_phone}
            ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="投标上传时间" v-bind="formItemLayout">
              {{supply_purchase_info.supply_info.email}}
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="CA序列表" v-bind="formItemLayout">
              {{supply_purchase_info.supply_info.email}}
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item class="text-center" v-if="supply_purchase_info.supply_info.status!=3">
          <a-button class="mr-10" @click="ModalVisible = false">取消</a-button>
          <a-button class="ml-10" type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  open_bid_list // 开标评标列表
} from "@admin/api/open_bid_supply";
import {
  get_supply_purchase_info // 获取获取采购文件信息
} from "@admin/api/bidsSupply";
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      priv: this.$store.getters.priv,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      keyword: "",
      status: "",
      statusList: [
        { value: "0", label: "全部" },
        { value: "15", label: "待开标" },
        { value: "16", label: "评标中" },
        { value: "17", label: "待解密" },
        { value: "18", label: "已确认" },
        { value: "20,21", label: "已流标" }
      ],
      bid_type: "0",
      bid_type_list: [{ value: "0", title: "全部" }],
      page: "",
      dataSource: [
        {
          id: "2",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          bid_code: "191118103955699124", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "15", // 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标
          cat_id: "36", //大类ID
          cat_name: "果蔬类", //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "3",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          bid_code: "191118103955699124", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "16", // 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标
          cat_id: "36", //大类ID
          cat_name: "果蔬类", //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "4",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          bid_code: "191118103955699124", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "18", // 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标
          cat_id: "36", //大类ID
          cat_name: "果蔬类", //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "5",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          bid_code: "191118103955699124", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "20", // 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标
          cat_id: "36", //大类ID
          cat_name: "果蔬类", //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "6",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          bid_code: "191118103955699124", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "21", // 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标
          cat_id: "36", //大类ID
          cat_name: "果蔬类", //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "7",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          bid_code: "191118103955699124", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "17", // 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标
          cat_id: "36", //大类ID
          cat_name: "果蔬类", //大类名称
          open_time: "2019-11-11" //开标时间
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
          width: "15%"
        },
        {
          title: "采购类别",
          dataIndex: "cat_name",
          width: "10%"
        },
        {
          title: "开标时间",
          dataIndex: "open_time",
          width: "10%"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "20%"
        }
      ],
      total: 0,
      ModalVisible: false,
      bid_code: "",
      supply_purchase_info: {
        base_info: {
          bid_code: "191118103955699124",
          custom_code: "111801",
          title: "20191118\u5927\u7c73\u6d4b\u8bd5",
          end_time: "2019-11-19 11:09:13",
          open_time: "2019-11-19 11:09:27"
        },
        supply_info: {
          remark: null,
          supply_name:
            "\u4e1c\u80dc\u795e\u6d32\u50b2\u6765\u56fd\u82b1\u679c\u5c71\u6c34\u5e18\u6d1e\u662f\u592a\u767d\u91d1\u661f\u7684",
          legal_user_name: "\u674e\u957f\u5e9a",
          email: "1333@qq.com",
          address: "\u5317\u4eac\u5e02 \u5e02\u8f96\u533a \u4e1c\u57ce\u533a",
          fax: "",
          contact_name: "\u674e\u661f\u4e91",
          contact_phone: "13126717156",
          file_list: [
            {
              id: "111",
              ukey: "5451",
              type: "supply_bid_ask_purchase",
              file_name: "emilia.jpg",
              file_path: "upload/common/20191114/5dcd09b0ea4db.jpg",
              status: "2",
              secret: null,
              create_time: "1573719258",
              full_path:
                "http://192.168.2.134/upload/common/20191114/5dcd09b0ea4db.jpg"
            },
            {
              id: "112",
              ukey: "5451",
              type: "supply_bid_ask_purchase",
              file_name: "faces.jpg",
              file_path: "upload/common/20191114/5dcd09b2a5ada.jpg",
              status: "2",
              secret: null,
              create_time: "1573719258",
              full_path:
                "http://192.168.2.134/upload/common/20191114/5dcd09b2a5ada.jpg"
            }
          ],
          log_list: null
        }
      }
    };
  },
  filters: {
    status: key => {
      switch (key) {
        case "15":
          return "待开标";
          break;
        case "16":
          return "评标中";
          break;
        case "17":
          return "待解密";
          break;
        case "18":
          return "已确认";
          break;
        case "20":
          return "已流标";
          break;
        case "21":
          return "已流标";
          break;
        default:
          return "未知状态";
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Sbid/open_bid_list"];
    this.status = this.$route.params.status || "0";
    this.get_tree_data();
    // this.open_bid_list_method();
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
    open_bid_list_method2() {
      this.page = 1;
      this.open_bid_list_method();
    },
    open_bid_list_method() {
      var params = {};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      open_bid_list(params)
        .then(res => {
          this.dataSource = res.data.list || [];
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.open_bid_list_method();
    },
    get_supply_purchase_info(bid_code) {
      this.bid_code = bid_code;
      get_supply_purchase_info(bid_code)
        .then(res => {
          this.supply_purchase_info = res.data;
          this.ModalVisible = true;
        })
        .catch(error => this.$message.error(error));
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_code: this.bid_code
          };
          console.log(values);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#open_bid_list {
  @include component;
}
</style>
<style lang="scss">
.supply-purchase-info {
  h4 {
    border-left: 4px solid $primary2;
    @extend .pl-10;
    @extend .ml-10;
    @extend .mb-10;
  }
  .ant-col-4 {
    @extend .text-right;
  }
  .ant-input {
    @extend .pl-10;
  }
  .wenjian {
    width: 17px;
    height: 17px;
  }
}
</style>