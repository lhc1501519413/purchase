<template>
  <div id="bid_notice_detail">
    <section class="bid_notice_detail mt-20">
      <h4>项目公告 / 采购公告</h4>
      <div class="bigcontent">
        <h2 class="text-center mb-10">{{formData.title}}</h2>
        <h4 class="text-center mb-10">
          <span>发布时间：{{formData.create_time}}</span>
          <span class="ml-10">浏览次数：{{formData.times}}</span>
        </h4>
        <div
          class="text-indent-35 mb-10"
        >{{formData.com_name}}拟对{{formData.project_name}}进行{{formData.bid_type_name}}，现将相关事项公告如下：</div>
        <h3>一、项目编号：{{formData.custom_code}}</h3>
        <h3>二、项目名称：{{formData.project_name}}</h3>
        <h3>三、采购方式：{{formData.bid_type_name}}</h3>
        <h3>四、招标商品信息</h3>
        <div class="text-indent-35 mb-10">采购类别：{{formData.cat_name}}</div>
        <div class="text-indent-35 mb-10">预估采购金额：{{formData.expert_money}}</div>
        <div class="text-indent-35 mb-10">需求商家数：{{formData.min_supply}}</div>
        <div class="text-indent-35 mb-10 area">
          <span>配送区域：</span>
          <ul class="inline-block">
            <li
              class="text-left"
              v-for="item of area_list"
              :key="item.id"
            >{{item.area_name}}：{{item.region_name}}</li>
          </ul>
        </div>
        <h3>五、供应商资格要求</h3>
        <div class="text-indent-35 mb-10">{{formData.qualifications}}</div>
        <h3>六、供应商获取采购文件要求</h3>
        <div class="text-indent-35 mb-10">采购文件获取时间：{{formData.start_time}} ~ {{formData.end_time}}</div>
        <div class="text-indent-35 mb-10">采购文件获取方式：在线直接获取</div>
        <div class="text-indent-35 mb-10">
          供应商通过平台
          <a
            class="ml-10 mr-10"
            href="http://smart.acuit.net/bid/#/index"
            target="_blank"
          >http://smart.acuit.net/bid/#/index</a>商家入驻模块，注册账号、完善信息后提交入驻，经平台审核通过后，可通过项目公告页面的【获取入口】直接在线申请获取采购文件，经采购方审核通过，即可下载采购文件。
        </div>
        <div class="text-indent-35 mb-10">采购文件售价：人民币0元</div>
        <h3>七、开标评标时间和地址</h3>
        <div class="text-indent-35 mb-10">开标时间：{{formData.open_time}}</div>
        <div class="text-indent-35 mb-10">开标地址：{{formData.open_address}}</div>
        <div class="text-indent-35 mb-10">
          投标文件递交地址：供应商通过平台
          <a
            class="ml-10 mr-10"
            href="http://smart.acuit.net/bid/#/index"
            target="_blank"
          >http://smart.acuit.net/bid/#/index</a>在线提交投标文件。
        </div>
        <div class="text-indent-35 mb-10">注：供应商需注册并审核通过，并且在规定时间内在线成功获取采购文件后，可在【投标文件管理】模块在线提交投标文件。</div>
        <h3>八、投标保证金</h3>
        <div
          v-if="formData.is_margin==1"
          class="text-indent-35 mb-10"
        >本次投标保证金为{{formData.margin}}元人民币（可以现金或转账支票形式），请用信封单独封好，信封封面写上投标项目名称并封口加盖投标人单位公章，并按投标文件提交的时间地点要求提交与招标人。投标人必须承诺现金和转账支票的真实有效性，否则责任自负。未中标当场退还，中标的则自动转为合同保证金，合同期满无息退还。</div>
        <div v-else class="text-indent-35 mb-10">无</div>
        <h3>九、其他事项</h3>
        <div class="text-indent-35 mb-10">{{formData.desc}}</div>
        <h3>十、联系方式</h3>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="15">采购单位：{{formData.com_name}}</a-col>
        </a-row>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="6">联系人：{{formData.contact_name}}</a-col>
          <a-col :span="6" :offset="3">联系方式：{{formData.contact_number}}</a-col>
        </a-row>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="6">地址：{{formData.address}}</a-col>
        </a-row>
        <div class="text-right pr-20">{{formData.com_name}}</div>
        <div class="text-right pr-20">{{formData.create_time}}</div>
        <div class="text-center">
          <a-button @click="addSPurchase" type="primary">我要投标</a-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  get_Pbid_notice_info, // 公告详情
  judge_supply_report // 判断供应商是否符合报价要求
} from "@indexApi/common";
export default {
  data() {
    return {
      id: "",
      formData: {},
      area_list: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "14%",
          align: "center"
        },
        {
          title: "商品名称",
          dataIndex: "stock_name",
          width: "14%",
          align: "center"
        },
        {
          title: "品牌",
          dataIndex: "brand",
          width: "14%",
          align: "center"
        },
        {
          title: "规格",
          dataIndex: "standard",
          width: "14%",
          align: "center"
        },
        {
          title: "采购单位",
          dataIndex: "price_unit_name",
          width: "14%",
          align: "center"
        },
        {
          title: "预估采购数量",
          dataIndex: "number",
          width: "14%",
          align: "center"
        },
        {
          title: "提供产品检测报告",
          dataIndex: "is_exam",
          width: "14%",
          align: "center",
          scopedSlots: { customRender: "is_exam" }
        }
      ],
      pagination: {
        showQuickJumper: true,
        showTotal: () => {
          return `共${this.formData.stock_list.length}条数据`;
        }
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.get_Pbid_notice_info_method();
  },
  filters: {
    is_exam(key) {
      switch (key) {
        case 1:
          return "是";
          break;
        case "1":
          return "是";
          break;
        default:
          return "否";
          break;
      }
    }
  },
  methods: {
    get_Pbid_notice_info_method() {
      get_Pbid_notice_info({ id: this.id })
        .then(res => {
          this.formData = res.data || {};
          this.area_list = res.data.area_list || [];
          this.area_list.forEach(elem => {
            elem.region_name = elem.region_list
              .reduce((priv, elem2) => {
                return priv + elem2.name + "，";
              }, "")
              .slice(0, -1);
          });
        })
        .catch(error => this.$message.error(error));
    },
    addSPurchase() {
      var self = this;
      var token = localStorage.getItem("token");
      if (!token) {
        self.$store.commit("SET_TOKEN", null);
        self.$store.commit("SET_TYPE", null);
        self.$store.commit("SET_USERNAME", null);
        self.$confirm({
          title: "请先登录？",
          content: "是否跳转到登录页面",
          okText: "确定",
          cancelText: "取消",
          onOk() {
            self.$router.push({ path: "/login" });
          },
          onCancel() {}
        });
      } else {
        judge_supply_report({ bid_code: this.formData.bid_code })
          .then(res => {
            this.$confirm({
              title: "温馨提示",
              content: "您不符合供应商报价要求",
              okText: "确认",
              cancelText: false
            });
            open(
              this.global.host +
                "/admin.html#/Sbid/tender_list?bid_code=" +
                this.formData.custom_code
            );
          })
          .catch(error => this.$message.error(error));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#bid_notice_detail {
  width: 100%;
  height: 100%;
  .bid_notice_detail {
    width: 100%;
    padding: 0 17.5%;
    & > h4 {
      margin: 8px 0;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      opacity: 1;
    }
    .bigcontent {
      background-color: $white;
      padding: 30px;
      h3 {
        margin-bottom: 10px;
      }
      .text-indent-35 {
        text-indent: 35px;
      }
      .area {
        @include flex(flex-start, flex-start);
        ul {
          text-indent: 0px;
        }
      }
    }
  }
}
</style>