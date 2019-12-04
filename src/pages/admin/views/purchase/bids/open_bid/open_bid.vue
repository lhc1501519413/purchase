<template>
  <div id="open_bid">
    <h5>
      招标管理 / 开标评标管理
      <a-button type="primary" v-if="judge_info.status==14&&judge_info.bid_status!=18&&judge_info.bid_status!=20&&judge_info.bid_status!=21" @click="submit">提交</a-button>
    </h5>
    <section class="content">
      <h4>项目基本信息</h4>
      <a-row>
        <a-col :span="2" class="text-right" :offset="1">项目编号：</a-col>
        <a-col :span="6">{{judge_info.custom_code}}</a-col>
        <a-col :span="2" class="text-right" :offset="1">项目名称：</a-col>
        <a-col :span="6">{{judge_info.title}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="2" class="text-right" :offset="1">采购单位：</a-col>
        <a-col :span="6">{{judge_info.com_name}}</a-col>
        <a-col :span="2" class="text-right" :offset="1">采购方式：</a-col>
        <a-col :span="6">{{judge_info.bid_type_name}}</a-col>
      </a-row>
    </section>
    <section class="content">
      <h4>评前准备</h4>
      <ul class="prepare">
        <li @click="$router.push({path:'/Bid/tender_file_decode',query:{bid_code}})">
          <div>
            <p class="bg">1</p>
            <span>投标（响应）文件签收、解密</span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=2?$router.push({path:'/Bid/judge_group',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=2}">2</p>
            <span>评审小组设置</span>
          </div>
          <a-icon type="right"/>
        </li>
      </ul>
      <h4>开标评标</h4>
      <ul class="prepare">
        <li @click="judge_info.status>=3?$router.push({path:'/Bid/open_record',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=3}">1</p>
            <span>
              <span>
                开标记录（资格商务技术）
              </span>
              <span class="info">
                开标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=4?$router.push({path:'/Bid/judge_quality',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=4}">2</p>
            <span>
              <span>
                资格审查
              </span>
              <span class="warning">
                评标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=5?$router.push({path:'/Bid/judge_match',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=5}">3</p>
            <span>
              <span>
                符合性评审
              </span>
              <span class="warning">
                评标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=6?$router.push({path:'/Bid/judge_quality_grade',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=6}">4</p>
            <span>
              <span>
                商务技术评分
              </span>
              <span class="warning">
                评标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=7?$router.push({path:'/Bid/judge_total_quality_grade',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=7}">5</p>
            <span>
              <span>
                商务技术评分汇总
              </span>
              <span class="warning">
                评标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=8?$router.push({path:'/Bid/business_result',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=8}">6</p>
            <span>
              <span>
                商务技术结果公布
              </span>
              <span class="info">
                开标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=9?$router.push({path:'/Bid/supply_report',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=9}">7</p>
            <span>
              <span>
                开标记录（报价）
              </span>
              <span class="info">
                开标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=12?$router.push({path:'/Bid/judge_report',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=12}">8</p>
            <span>
              <span>
                报价评审
              </span>
              <span class="warning">
                评标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=13?$router.push({path:'/Bid/judge_result',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=13}">9</p>
            <span>
              <span>
                得分汇总
              </span>
              <span class="warning">
                评标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
        <li @click="judge_info.status>=14?$router.push({path:'/Bid/judge_elect_supply',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div>
            <p :class="{bg:judge_info.status>=14}">10</p>
            <span>
              <span>
                结果公布
              </span>
              <span class="info">
                开标
              </span>
            </span>
          </div>
          <a-icon type="right"/>
        </li>
      </ul>
    </section>
    <section class="content judge-result pb-20">
      <h4>评审结果</h4>
      <a-row>
        <a-col :span="4" class="text-right">
          <img class="img_point mr-10" :src="point" alt="必填项" />评审结果附件：
        </a-col>
        <a-col :span="12">
          <upload
            v-if="judge_info.status<=14&&judge_info.bid_status!=18&&judge_info.bid_status!=20&&judge_info.bid_status!=21"
            :disabled='judge_info.status<14'
            class="ml-10"
            @choose-file="result_file_list_change"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
          >
            <a-button>
              <a-icon type="upload" />上传文件
            </a-button>
          </upload>
          <ul class="ml-10">
            <li @click.stop="del" class="mb-10" v-for="(item,index) of result_file_list" :key="index">
              <svg-icon class="wenjian" icon-class="wenjian" />
              <span>{{item.file_name}}</span>
              <img v-if="judge_info.status<=14" :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
              <a v-else :href="item.full_path" target='_blank' class="ml-10">预览</a>
            </li>
          </ul>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4" class="text-right">
          <img class="img_point mr-10" :src="point" alt="必填项" />采购人结果确认附件：
        </a-col>
        <a-col :span="12">
          <upload
            v-if="judge_info.status<=14&&judge_info.bid_status!=18&&judge_info.bid_status!=20&&judge_info.bid_status!=21"
            :disabled='judge_info.status<14'
            class="ml-10"
            @choose-file="confirm_file_list_change"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
          >
            <a-button>
              <a-icon type="upload" class="color" />上传文件
            </a-button>
          </upload>
          <ul class="ml-10">
            <li @click.stop="del2" class="mb-10" v-for="(item,index) of confirm_file_list" :key="index">
              <svg-icon class="wenjian" icon-class="wenjian" />
              <span>{{item.file_name}}</span>
              <img v-if="judge_info.status<=14" :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
              <a v-else :href="item.full_path" target='_blank' class="ml-10">预览</a>
            </li>
          </ul>
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import { POST } from "@common/js/apis";
import {
  get_judge_info, // 获取项目评标中的状态
  submit_judge_result // 提交评审结果
} from '@admin/api/open_bid';

export default {
  components: {
    upload: () => import("@admin/components/upload")
  },
  props: {
    father: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      bid_code: "",
      del_icon: require("@static/icon/icon_close.png"),
      point: require("@static/images/icon_point.png"),
      result_file_list: [],
      confirm_file_list: [],
      judge_info: {},
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length = 10;
          return `共${length}条数据`;
        }
      },
      prepare: {
        first: true,
        second: false
      }
    };
  },
  created() {
    this.bid_code = this.$route.query.bid_code;
    this.father.selectedKeys = ["/Bid/open_bid_list"];
    this.get_judge_info();
  },
  methods: {
    get_judge_info(){ // 获取项目评标中的状态
      get_judge_info(this.bid_code).then(res=>{
        this.judge_info = res.data;
        this.$store.commit('SET_STATUS',res.data.status);
        this.result_file_list = res.data.result_file_list;
        this.confirm_file_list = res.data.confirm_file_list;
      }).catch(error=>this.$message.error(error))
    },
    result_file_list_change() {
      // 添加资格评分要求文件
      var self = this;
      var files = event.target.files;
      if (
        (files[0].type === "image/png" ||
          files[0].type === "image/jpg" ||
          files[0].type === "image/jpeg") &&
        files[0].size / 1024 / 1024 > 0.8
      ) {
        this.$message.error("图片大小必须小于800KB!");
        return;
      } else if (
        files[0].type === "application/pdf" &&
        files[0].size / 1024 / 1024 > 8
      ) {
        this.$message.error("文件大小必须小于 8MB!");
        return;
      }
      const formData = new FormData();
      formData.append("file", files[0]);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.result_file_list.push(img_obj);
        })
        .catch(error=>this.$message.error(error));
    },
    del(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.result_file_list.splice(index, 1);
      }
    },
    confirm_file_list_change() {
      // 添加资格评分要求文件
      var self = this;
      var files = event.target.files;
      if (
        (files[0].type === "image/png" ||
          files[0].type === "image/jpg" ||
          files[0].type === "image/jpeg") &&
        files[0].size / 1024 / 1024 > 0.8
      ) {
        this.$message.error("图片大小必须小于800KB!");
        return;
      } else if (
        files[0].type === "application/pdf" &&
        files[0].size / 1024 / 1024 > 8
      ) {
        this.$message.error("文件大小必须小于 8MB!");
        return;
      }
      const formData = new FormData();
      formData.append("file", files[0]);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.confirm_file_list.push(img_obj);
        })
        .catch(error=>this.$message.error(error));
    },
    del2(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.confirm_file_list.splice(index, 1);
      }
    },
    submit() {
      var self = this;
      var formData = {
        bid_code:self.bid_code,
        result_file_list:self.result_file_list,
        confirm_file_list:self.confirm_file_list
      }
      self.$confirm({
        title: "确认提交评审结果吗？",
        onOk() {
          submit_judge_result(formData).then(res=>{
            self.$message.success('提交成功');
            let time = setTimeout(() => {
              self.$router.push({path:'/Bid/open_bid_list'})
              clearTimeout(time);
            }, 1500);
          }).catch(error=>self.$message.error(error));
        },
        onCancel() {}
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#open_bid {
  @include component;
  h5 {
    position: relative;
    button {
      position: absolute;
      right: 15px;
      top: -9px;
    }
  }
  .ant-row:not(:last-child) {
    @extend .mb-10;
  }
  .prepare {
    @extend .ml-30;
    @extend .mb-10;
    li {
      @extend .pointer;
      @extend .pr-20;
      @include flex(space-between);
      border: 1px solid #e8e8e8;
      height: 42px;
      div {
        display: table;
        height: 100%;
        p {
          display: table-cell;
          vertical-align: middle;
          width: 30px;
          height: 100%;
          @extend .mr-10;
          @extend .text-center;
        }
        p.bg {
          color: $white;
          background-color: $primary2;
        }
        >span {
          display: table-cell;
          vertical-align: middle;
          @extend .pl-10;
          span{
            padding: 2px 4px; 
            @extend .radius;
          }
          .warning{
            color: $warning;
            border: 1px solid $warning;
          }
          .info{
            color: $info;
            border: 1px solid $info;
          }
        }
      }
      .anticon.anticon-right {
        color: rgba(0, 0, 0, 0.25);
        width: 15px;
      }
    }
    li:not(:last-child) {
      border-bottom-width: 0;
    }
  }
  .judge-result {
    .ant-btn {
      color: $primary2;
      border-color: $primary2;
    }
  }
}
</style>