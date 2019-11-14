<template>
  <div id="auditPurchaseDoc">
    <h5>
      采购文件管理 / 查看采购文件
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
  get_bid_purchase_info // 获取采购文件全部详情
} from "@admin/api/bids";
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
      formData: {
        bid_info: {
          id: "2",
          title: "招标项目11041017",
          custom_code: "11041017",
          code: "191104102056070596",
          com_code: "zdyszx",
          com_name: "浙大饮食中心",
          com_id: "1",
          shipping_days: "123",
          bid_type: "1",
          status: "2",
          cat_id: "36",
          cat_name: "粮油类",
          region_id: "15",
          supply_id: "0",
          total_number: "0.00",
          total_money: "0.0000",
          contact_name: "Tony",
          contact_number: "13355558888",
          supply_count: "0",
          memo: null,
          is_del: "0",
          create_time: "1572834056",
          update_time: "1572838185",
          bid_type_name: "公开招标",
          region_name: "大食堂",
          shipping_region_list: [
            { id: "1", code: "ZJGXQST01", name: "紫金港校区食堂1", pid: "15" },
            { id: "17", code: "YQXQST01", name: "玉泉校区食堂1", pid: "15" },
            { id: "26", code: "XXXQST01", name: "西溪校区食堂", pid: "15" },
            { id: "30", code: "YQXCT02", name: "玉泉二食堂", pid: "15" },
            { id: "31", code: "HCXQ01", name: "华家池校区食堂", pid: "15" },
            { id: "37", code: "ZJXQST02", name: "之江校区食堂", pid: "15" },
            { id: "39", code: "ZJGXQST03", name: "风味餐厅", pid: "15" },
            { id: "40", code: "ZJGXQST04", name: "紫金港清真", pid: "15" },
            { id: "41", code: "SSJLB01", name: "师生交流吧", pid: "15" },
            {
              id: "42",
              code: "ZJGXQST05",
              name: "紫金港易耗品仓库",
              pid: "15"
            },
            { id: "94", code: "YQQJ", name: "玉泉清真", pid: "15" },
            { id: "97", code: "PS00002", name: "西溪清真", pid: "15" },
            { id: "98", code: "PS00003", name: "华家池清真", pid: "15" },
            {
              id: "99",
              code: "PS00004",
              name: "紫金港运行保障组",
              pid: "15"
            },
            { id: "100", code: "PS00005", name: "玉泉运行保障组", pid: "15" },
            { id: "101", code: "PS00006", name: "西溪运行保障组", pid: "15" },
            { id: "114", code: "PS00016", name: "海创园", pid: "15" },
            {
              id: "115",
              code: "PS00017",
              name: "绍兴镜湖校区档口",
              pid: "15"
            },
            { id: "117", code: "PS00018", name: "玉泉易耗品仓库", pid: "15" },
            {
              id: "159",
              code: "PS00054",
              name: "紫金港校区食堂2",
              pid: "15"
            },
            { id: "160", code: "PS00055", name: "玉泉校区食堂2", pid: "15" },
            { id: "164", code: "PS00057", name: "义乌二院食堂", pid: "15" }
          ]
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
          bid_name: "浙大饮食中心",
          contact_name: "Tony",
          contact_number: "13355558888",
          fax: "",
          address: "",
          qualifications: "",
          create_time: "",
          update_time: ""
        },
        quality_info: [
          {
            id: "1",
            bid_code: "190920182116941657", //单号
            name: "adsa", //项目内容
            desc: "asda", //项目描述
            gist: "daas" //依据
          },
          {
            id: "2",
            bid_code: "190920182116941657", //单号
            name: "adsa", //项目内容
            desc: "asda", //项目描述
            gist: "daas" //依据
          }
        ],
        quality_grade_info: null,
        purchase_file: false
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
    @extend .block;
    width: 70%;
  }
  .vertical-middle {
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