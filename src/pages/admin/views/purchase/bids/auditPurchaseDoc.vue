<template>
  <div id="auditPurchaseDoc">
    <h5>
      采购文件管理 / 审核采购文件
      <a-button style="right:90px;" type="primary" @click="audit">审核</a-button>
      <a-button type="primary" class="ml-10" @click="reject">驳回</a-button>
    </h5>
    <section class="content">
      <h3 style="margin:0 0 10px;" class="no-padding">{{formData.bid_info.title}}</h3>
      <div>
        <a-icon type="file-text" />
        项目编号：{{formData.bid_info.custom_code}}
        <a-icon type="user" />
        采购单位：{{formData.bid_info.com_name}}
        <a-icon type="profile" />
        采购方式：{{formData.bid_info.bid_type_name}}
      </div>
    </section>
    <section class="content">
      <h4>供应商资格要求</h4>
      <a-textarea
        readOnly
        class="ml-10 block mb-10"
        :rows="4"
        :value="formData.notice_info.qualifications"
      />
      <h4>供应商获取采购文件要求</h4>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">获取时间：</a-col>
        <a-col :span="10">
          <a-input 
            class="mr-10"
            style="width:195px"
            readOnly
            :value="formData.notice_info.start_time"
            >
            <a-icon slot="suffix" type="calendar" style="color: rgba(0,0,0,.45)" />
          </a-input>
          ~
          <a-input 
            class="ml-10"
            style="width:195px"
            readOnly
            :value="formData.notice_info.end_time"
            >
            <a-icon slot="suffix" type="calendar" style="color: rgba(0,0,0,.45)" />
          </a-input>
        </a-col>
      </a-row>
      <h4>招标供应商数量</h4>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">需求数量：</a-col>
        <a-col :span="10">
          <a-input 
            class="mr-10"
            style="width:26%;"
            readOnly
            :value="formData.notice_info.min_supply"
            >
          </a-input>家
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">中标执行价格：</a-col>
        <a-col :span="10">
          <a-radio-group
            v-if="formData.notice_info.exec_price_type<=4"
            :value='formData.notice_info.exec_price_type'
            >
            <a-radio class="radioStyle" v-for="item of exec_price_type.slice(0,4)" :key='item.id' :value="item.id">{{item.name}}</a-radio>
          </a-radio-group>
          <a-radio-group
            v-else
            :value='formData.notice_info.exec_price_type'
            >
            <a-radio class="radioStyle" v-for="item of exec_price_type.slice(4)" :key='item.id' :value="item.id">
              {{item.name.split('N')[0]}}
              <span class="color ml-10 mr-10">{{item.name.indexOf('N')!=-1?formData.notice_info.min_supply:''}}</span>
              {{item.name.split('N')[1]}}
            </a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
      <h4>开标评标时间地址</h4>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">
          <img class="img_point" :src="point" alt="必填" />
          投标截止时间(开标时间)：
        </a-col>
        <a-col :span="10">
          <a-input 
            style="width:195px"
            readOnly
            :value="formData.notice_info.open_time"
            >
            <a-icon slot="suffix" type="calendar" style="color: rgba(0,0,0,.45)" />
          </a-input>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">
          <img class="img_point" :src="point" alt="必填" />
          开标地址：
        </a-col>
        <a-col :span="10">
          <a-input readOnly :value="formData.notice_info.open_address"></a-input>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">投标文件递交地址：</a-col>
        <a-col :span="10">
          <a-input readOnly :value="formData.notice_info.submit_address"></a-input>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">
          <img class="img_point" :src="point" alt="必填" />
          评审时间：
        </a-col>
        <a-col :span="10">
          <a-input 
            style="width:195px"
            readOnly
            :value="formData.notice_info.judge_time"
            >
            <a-icon slot="suffix" type="calendar" style="color: rgba(0,0,0,.45)" />
          </a-input>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">
          <img class="img_point" :src="point" alt="必填" />
          评审地址：
        </a-col>
        <a-col :span="10">
          <a-input readOnly :value="formData.notice_info.judge_address"></a-input>
        </a-col>
      </a-row>
      <h4>投标保证金</h4>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">
          <img class="img_point" :src="point" alt="必填" />
          是否需要缴纳投标保证金：
        </a-col>
        <a-col :span="10">
          <a-radio-group :value="Number(formData.notice_info.is_margin)">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
      <h4>公告附件</h4>
      <ul class="ml-30">
        <li
          class="mb-10"
          v-for="(item,index) of formData.notice_info.file_list"
          :key="index"
        >
          <svg-icon class="wenjian" icon-class="wenjian" />
          <span class="ml-10 mr-10">{{item.file_name}}</span>
          <a href="JavaScript:;" @click="showFile(item.full_path)">预览采购文件</a>
          <a href="JavaScript:;" @click="downloadFile(item.full_path)">下载采购文件</a>
        </li>
      </ul>
      <h4>其他事项</h4>
      <a-textarea readOnly class="ml-10 mb-10" :rows="4" :value="formData.notice_info.desc" />
      <h4>联系信息</h4>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">
          <img class="img_point" :src="point" alt="必填" />
          采购人：
        </a-col>
        <a-col :span="10">
          <a-input readOnly :value="formData.notice_info.bid_name"></a-input>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">
          <img class="img_point" :src="point" alt="必填" />
          采购人联系人：
        </a-col>
        <a-col :span="10">
          <a-input readOnly :value="formData.notice_info.contact_name"></a-input>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">
          <img class="img_point" :src="point" alt="必填" />
          采购人联系方式：
        </a-col>
        <a-col :span="10">
          <a-input readOnly :value="formData.notice_info.contact_number"></a-input>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">传真：</a-col>
        <a-col :span="10">
          <a-input readOnly :value="formData.notice_info.fax"></a-input>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right vertical-middle">地址：</a-col>
        <a-col :span="10">
          <a-input readOnly :value="formData.notice_info.address"></a-input>
        </a-col>
      </a-row>
      <h4>资格审查要求</h4>
      <a-table
        class="ml-10" 
        :pagination="pagination"
        bordered
        :dataSource="formData.quality_info"
        :columns="columns"
        rowKey="id"
      >
        <span slot="nameTitle">
          <img class="img_point" :src="point" alt="必填" />
          审查内容
        </span>
      </a-table>
      <h4>评分规则</h4>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right">
          <img class="img_point" :src="point" alt="必填" />
          计算公式：
        </a-col>
        <a-col :span="10">
          自动计算报价得分
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right">
          <img class="img_point" :src="point" alt="必填" />
          最高得分：
        </a-col>
        <a-col :span="10">
          {{formData.eval_method_info.max_score}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right">
          <img class="img_point" :src="point" alt="必填" />
          基准价：
        </a-col>
        <a-col :span="10">
          {{formData.eval_method_info.standard_price_type_name}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5" class="text-right">
          <img class="img_point" :src="point" alt="必填" />
          评分标准：
        </a-col>
        <a-col :span="10">
          {{formData.eval_method_info.eval_standard_type_name}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="5"></a-col>
        <a-col :span="10" v-if='formData.eval_method_info.eval_standard_type==2'>
          <div class="mb-10">基准价得分：{{formData.eval_method_info.eval_standard_ext.standard_price}}</div>
          <div>每百分点分值：{{formData.eval_method_info.eval_standard_ext.per_percent_point}}</div>
        </a-col>
        <a-col :span="10" v-else>
          <div class="mb-10">正偏离每百分点分值：{{formData.eval_method_info.eval_standard_ext.up_percent_point}}</div>
          <div>负偏离每百分点分值：{{formData.eval_method_info.eval_standard_ext.down_percent_point}}</div>
        </a-col>
      </a-row>
      <h4>资格评分要求</h4>
      <a-table
        class="ml-10" 
        :pagination="pagination"
        bordered
        :dataSource="formData.quality_grade_info"
        :columns="columns_grade"
        rowKey="id"
      >
        <span slot="nameTitle">
          <img class="img_point" :src="point" alt="必填" />
          评分项目
        </span>
        <span slot="judge_standardTitle">
          <img class="img_point" :src="point" alt="必填" />
          评分标准
        </span>
        <span slot="gistTitle">
          <img class="img_point" :src="point" alt="必填" />
          判定依据
        </span>
        <span slot="max_scoreTitle">
          <img class="img_point" :src="point" alt="必填" />
          最高得分
        </span>
      </a-table>
      <h4>项目附件</h4>
      <ul class="ml-10">
        <li
          class="mt-10"
          v-for="(item,index) of formData.purchase_file"
          :key="index"
          >
          <svg-icon class="wenjian" icon-class="wenjian" />
          <span class="ml-10 mr-10">{{item.file_name}}</span>
          <a href="JavaScript:;" @click="showFile(item.full_path)">预览采购文件</a>
          <a href="JavaScript:;" @click="downloadFile(item.full_path)">下载采购文件</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import {
  get_bid_purchase_info, // 获取采购文件全部详情
  audit_bid_purchase, // 审核采购文件
  refuse_bid_purchase // 驳回采购文件
} from "@admin/api/bids";
import { 
  get_exec_price_type
} from "@common/js/apis";
export default {
  props: {
    father: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      bid_id: "",
      point: require("@static/images/icon_point.png"),
      exec_price_type:[],
      formData: {
        bid_info: {
          id: "",
          title: "",
          custom_code: "",
          code: "",
          com_code: "",
          com_name: "",
          com_id: "",
          shipping_days: "",
          bid_type: "",
          status: "",
          cat_id: "",
          cat_name: "",
          region_id: "",
          supply_id: "",
          total_number: "",
          total_money: "",
          contact_name: "",
          contact_number: "",
          supply_count: "",
          memo: null,
          is_del: "",
          create_time: "",
          update_time: "",
          bid_type_name: "",
          region_name: "",
          shipping_region_list: []
        },
        notice_info: {
          id: "",
          bid_code: "",
          start_time: "",
          end_time: "",
          open_time: "",
          open_address: "",
          submit_address: "",
          judge_time: "",
          judge_address: "",
          is_margin: "",
          desc: "",
          bid_name: "",
          contact_name: "",
          contact_number: "",
          fax: "",
          address: "",
          qualifications: "",
          create_time: "",
          update_time: ""
        },
        quality_info: [],
        quality_eval_method_info: [],
        purchase_file: [],
        eval_method_info: {
          id: "",
          bid_code: "", //单号
          type: "", //计算公式
          max_score: "", //结束时间
          standard_price_type: "", //开标时间
          eval_standard_type: "", //评分标准 1基准价 / 投标报价*最大分值2 基准价得分-（投标人报价-基准价）/基准价*100%*每百分点分值 3最大分值-|投标人报价-基准价| / 基准价*100%*每百分点分值
          eval_standard_ext: { //评分标准扩展说明如下
            standard_price: '',
            per_percent_point: '',
            up_percent_point: '',
            down_percent_point: ''
          }
        }
      },
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          slots: { title: "nameTitle" },
          dataIndex: "name",
          width: "20%"
        },
        {
          title: "具备的条件说明（要求）",
          dataIndex: "desc",
          width: "30%"
        },
        {
          title: "判定依据",
          dataIndex: "gist",
          width: "30%"
        }
      ],
      columns_grade: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          slots: { title: "nameTitle" },
          dataIndex: "name",
          width: "20%"
        },
        {
          slots: { title: "judge_standardTitle" },
          dataIndex: "judge_standard",
          width: "28%"
        },
        {
          slots: { title: "gistTitle" },
          dataIndex: "gist",
          width: "20%"
        },
        {
          slots: { title: "max_scoreTitle" },
          dataIndex: "max_score",
          width: "20%"
        }
      ],
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length =
            (this.formData.quality_info && this.formData.quality_info.length) ||
            0;
          return `共${length}条数据`;
        }
      }
    };
  },
  created() {
    this.bid_id = this.$route.query.id;
    this.father.selectedKeys = ["/Bid/purchase_list"];
    this.get_bid_info();
    this.get_exec_price_type();
  },
  methods: {
    get_bid_info() {
      get_bid_purchase_info(this.bid_id)
        .then(res => {
          this.formData = res.data;
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    get_exec_price_type(){
      get_exec_price_type().then(res=>{
        this.exec_price_type = res.data||[];
      }).catch(error => this.$message.error(error));
    },
    audit() {
      var self = this;
      this.$confirm({
        title: "确认审核此招标文件？",
        onOk() {
          audit_bid_purchase(self.bid_id)
            .then(res => {
              self.$message.success(res.msg);
              let time = setTimeout(() => {
                self.$router.go(-1);
                clearTimeout(time);
              }, 1500);
            })
            .catch(error => {
              self.$message.error(error);
            });
        },
        onCancel() {}
      });
    },
    reject() {
      var self = this;
      this.$confirm({
        title: "确认驳回此招标文件？",
        onOk() {
          refuse_bid_purchase(self.bid_id)
            .then(res => {
              self.$message.success(res.msg);
              let time = setTimeout(() => {
                self.$router.go(-1);
                clearTimeout(time);
              }, 1500);
            })
            .catch(error => {
              self.$message.error(error);
            });
        },
        onCancel() {}
      });
    },
    showFile(full_path){
      open(full_path)
    },
    downloadFile(full_path){
      open(full_path)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#auditPurchaseDoc {
  @include component;
  .ant-input {
    width: 70%;
  }
  .vertical-middle {
    height: 30px;
    line-height: 30px;
  }
  .radioStyle{
    @extend .block;
    height: 30px;
    line-height: 30px;
  }
  h5 {
    position: relative;
    button {
      position: absolute;
      right: 15px;
      top: -9px;
    }
  }
  .img_point {
    width: 8px;
    height: 8px;
    margin-bottom: 3px;
  }
}
</style>