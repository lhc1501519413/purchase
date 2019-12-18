<template>
  <div id="addSPurchaseDoc">
    <h5>
      采购文件管理 / 制作投标文件
      <a-button style="right:90px;" @click="back">返回</a-button>
      <a-button type="primary" @click="submit">提交</a-button>
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
      <a-tabs
        tabPosition="top"
        :activeKey="activeKey"
        @prevClick="callback"
        @nextClick="callback"
        @tabClick="callback($event)"
        :tabBarGutter="10"
      >
        <a-tab-pane key="1">
          <div slot="tab">
            <img class="img_point" :src="point" alt="必填" />
            {{tender_complete_info.stock_list.name}}
            <img
              :src="tender_complete_info.stock_list.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <h4 class="relative">
            商品信息
            <a-tooltip placement="top">
              <template slot="title">
                <span>此报价应与投标文件保持一致，若不一致则以在线报价为准。</span>
              </template>
              <a-icon type="info-circle" />
            </a-tooltip>
            <div class="absolute no-margin" style="right:0;top:0;">
              <a-button @click="download_excel" type="primary">下载报价文件</a-button>
              <a-button @click="save_stock_list" :disabled="secret.length!=16" type="primary">保存</a-button>
            </div>
          </h4>
          <a-row>
            <a-col :span="6" :offset="1">采购类别：{{formData.bid_info.cat_name}}</a-col>
            <a-col :span="8">预计配送时间：{{formData.bid_info.shipping_days}}天</a-col>
          </a-row>
          <a-table
            bordered
            class="table stock_table mt-10"
            rowKey="id"
            :columns="columnsStock"
            :dataSource="formData.stock_list"
            :pagination="paginationStock"
          >
            <template
              v-for="(item,index2) of formData.bid_info.area_list"
              :slot="String(item.area_key)"
              slot-scope="text,record"
            >
              <span :key="index2">{{record.area_stock_number[index2].number}}</span>
            </template>
            <template slot="price" slot-scope="value,record">
              <span class="hide">{{record.new_price}}</span>
              <input
                type="text"
                oninput="value=value.replace(/[^\d.)]/g, '')"
                v-model="record.new_price"
              />
            </template>
            <template slot="response_brand" slot-scope="value,record">
              <span class="hide">{{record.response_brand}}</span>
              <input type="text" v-model="record.response_brand" />
            </template>
            <template slot="response_standard" slot-scope="value,record">
              <span class="hide">{{record.response_standard}}</span>
              <input type="text" v-model="record.response_standard" />
            </template>
            <template slot="response_note" slot-scope="value,record">
              <span class="hide">{{record.response_note}}</span>
              <a-textarea placeholder="请输入响应产品参数" :rows="2" v-model="record.response_note" />
            </template>
            <template slot="is_match" slot-scope="value,record">
              <a-select style="width: 100px" v-model="record.is_match">
                <a-select-option value="1">正偏离</a-select-option>
                <a-select-option value="0">无偏离</a-select-option>
                <a-select-option value="-1">负偏离</a-select-option>
              </a-select>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2">
          <div slot="tab">
            <img class="img_point" :src="point" alt="必填" />
            {{tender_complete_info.quality_info.name}}
            <img
              :src="tender_complete_info.quality_info.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <div>
            <div class="header mb-10">
              <h4>资格审查要求</h4>
              <a-button type="primary" @click="save_bid_quality">保存</a-button>
            </div>
            <a-table
              v-if="formData.quality_info&&formData.quality_info.length>0"
              :pagination="pagination_quality_info"
              bordered
              :dataSource="formData.quality_info"
              :columns="columns_quality_info"
              rowKey="id"
            >
              <span slot="nameTitle">
                <img class="img_point" :src="point" alt="必填" />
                审查内容
              </span>
              <template slot="operation" slot-scope="text, record, index">
                <upload
                  @choose-file="quality_grade_change($event,index)"
                  accept="image/png, image/jpg, image/jpeg, application/pdf"
                >
                  <svg-icon icon-class="icon_table_add"></svg-icon>
                </upload>
                <ul>
                  <li
                    class="mt-10"
                    @click.stop="del_quality_info_file($event,index)"
                    v-for="(item,index2) of record.file_list"
                    :key="index2"
                  >
                    <svg-icon class="wenjian" icon-class="wenjian" />
                    <span class="ml-10 mr-10" style="width:10px;">{{item.file_name}}</span>
                    <img :src="del_icon" alt="删除" class="wenjian" :data-key="index2" />
                  </li>
                </ul>
              </template>
            </a-table>
            <div class="ml-20" v-else>本次招标资格审查已在供应商入驻环节完成</div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3">
          <div slot="tab">
            <img class="img_point" :src="point" alt="必填" />
            {{tender_complete_info.quality_grade_info.name}}
            <img
              :src="tender_complete_info.quality_grade_info.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <div>
            <div class="header mb-10">
              <h4>资格评分要求</h4>
              <a-button type="primary" @click="save_bid_quality_grade">保存</a-button>
            </div>
            <a-table
              :pagination="pagination_quality_grade"
              bordered
              :dataSource="formData.quality_grade_info"
              :columns="columns_quality_grade"
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
              <template slot="operation" slot-scope="text, record, index">
                <upload
                  @choose-file="quality_grade_change($event,index)"
                  accept="image/png, image/jpg, image/jpeg, application/pdf"
                >
                  <svg-icon icon-class="icon_table_add"></svg-icon>
                </upload>
                <ul>
                  <li
                    class="mt-10"
                    @click.stop="del_quality_grade_file($event,index)"
                    v-for="(item,index2) of record.file_list"
                    :key="index2"
                  >
                    <svg-icon class="wenjian" icon-class="wenjian" />
                    <span class="ml-10 mr-10">{{item.file_name}}</span>
                    <img :src="del_icon" alt="删除" class="wenjian" :data-key="index2" />
                  </li>
                </ul>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4">
          <div slot="tab">
            <img class="img_point" :src="point" alt="必填" />
            {{tender_complete_info.tender_file.name}}
            <img
              :src="tender_complete_info.tender_file.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <a-alert class="info" type="warning" showIcon>
            <span slot="message">
              上传的投标文件为签章后的文件，未签章文件视为无效文件。点击
              <a @click="signModalVisible = true">去签章</a>
            </span>
          </a-alert>
          <div class="mb-10 ml-10 relative">
            <a-button
              type="primary"
              class="absolute"
              style="top:0;right:0;"
              @click.stop="saveFile"
            >保存</a-button>
            <div>
              <h4>商务技术文件</h4>
              <upload
                class="ml-10"
                @choose-file="quality_grade_change($event,'fileList')"
                accept="image/png, image/jpg, image/jpeg, application/pdf"
              >
                <a-button>
                  <a-icon type="upload" />上传
                </a-button>
              </upload>
              <ul class="ml-10">
                <li
                  @click.stop="del"
                  class="mt-10"
                  v-for="(item,index) of formData.tender_file.file_list"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                  <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
                </li>
              </ul>
            </div>
            <div class="mt-10">
              <h4>价格文件</h4>
              <upload
                class="ml-10"
                @choose-file="quality_grade_change($event,'priceFile')"
                accept="image/png, image/jpg, image/jpeg, application/pdf"
              >
                <a-button>
                  <a-icon type="upload" />上传
                </a-button>
              </upload>
              <ul class="ml-10">
                <li
                  @click.stop="del2"
                  class="mt-10"
                  v-for="(item,index) of formData.tender_file.price_file_list"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                  <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
                </li>
              </ul>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </section>
    <a-modal
      class="supply-purchase-info"
      width="50%"
      :afterClose="afterClose"
      :destroyOnClose="false"
      :visible="signModalVisible"
      @ok="signModalVisible = false"
      @cancel="signModalVisible = false"
      :footer="null"
    >
      <h3 slot="title">签章</h3>
      <a-alert message="注意事项：" type="warning" showIcon>
        <div slot="description">
          <p>1、请将投标文件转换为PDF格式。</p>
          <p>2、签章将直接签署在您的原文件上，建议您将投标文件进行备份。</p>
          <p>3、请将您的投标文件在本机的文件路径及文件名称填写到下框中，以便于将您的文件进行本地签章。</p>
        </div>
      </a-alert>
      <div>
        <p class="mb-10">
          文件路径：
          <a-input
            style="width:30%;margin:0 5px;"
            class="pl-10"
            @keyup.enter="add_sign"
            v-model="file_path"
          />
          <a-button type="primary" @click="add_sign">签章</a-button>
        </p>
        <p class="mb-10">
          例：填写格式为
          <span class="file-path-model">e:\pdf\投标文件.pdf</span>
        </p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import FileSaver from "file-saver"; // 导出Excel
import XLSX from "xlsx"; // 导出Excel
import upload from "@admin/components/upload";
import {
  get_tender_info, // 获取采购文件全部详情
  get_tender_complete_info, // 获取投标文件是否完善
  save_supply_stock_list, // 报价保存
  save_bid_quality_file, // 保存资质审核要求附件
  save_bid_quality_grade_file, // 保存资质评分要求附件
  save_bid_tender_file, // 保存文件附件
  submit_tender // 提交投标文件
} from "@admin/api/bidsSupply";
import { POST } from "@common/js/apis";
import { encryptAes, decryptAes } from "@common/js/des";
import { encryption } from "@/common/js/ESign";
export default {
  components: {
    upload
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
      tender_complete_info: {
        stock_list: {
          status: 0, //0未完善 1已完善
          name: "报价",
          ico_class: ""
        },
        quality_info: {
          status: 0,
          name: "资格审查要求",
          ico_class: ""
        },
        quality_grade_info: {
          status: 0,
          name: "资质评分要求",
          ico_class: ""
        },
        tender_file: {
          status: 0,
          name: "项目附件",
          ico_class: ""
        }
      },
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
        area_list: [],
        stock_list: [],
        quality_info: [],
        quality_grade_info: [],
        tender_file: {
          file_list: [],
          price_file_list: []
        }
      },
      secret: "",
      secretKey: "",
      point: require("@static/images/icon_point.png"),
      activeKey: "1",
      columnsStock: [
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
          dataIndex: "brand_name",
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
          title: "产品参数",
          dataIndex: "note",
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
          title: "预估采购数量",
          align: "center",
          children: []
        },
        {
          title: "单价（元）",
          dataIndex: "price",
          width: "8%",
          align: "center",
          scopedSlots: { customRender: "price" }
        },
        {
          title: "响应品牌",
          dataIndex: "response_brand",
          width: 100,
          align: "center"
          // scopedSlots: { customRender: "response_brand" }
        },
        {
          title: "响应规格",
          dataIndex: "response_standard",
          width: 100,
          align: "center"
          // scopedSlots: { customRender: "response_standard" }
        },
        {
          title: "响应产品参数",
          dataIndex: "response_note",
          width: 100,
          align: "center",
          scopedSlots: { customRender: "response_note" }
        },
        {
          title: "偏离信息",
          dataIndex: "is_match",
          align: "center",
          scopedSlots: { customRender: "is_match" }
        }
      ],
      paginationStock: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length =
            (this.formData.stock_list && this.formData.stock_list.length) || 0;
          return `共${length}条数据`;
        }
      },
      columns_quality_info: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          slots: { title: "nameTitle" },
          dataIndex: "name",
          width: "18%"
        },
        {
          title: "具备的条件说明（要求）",
          dataIndex: "desc",
          width: "25%"
        },
        {
          title: "判定依据",
          dataIndex: "gist",
          width: "18%"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      pagination_quality_info: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length =
            (this.formData.quality_info && this.formData.quality_info.length) ||
            0;
          return `共${length}条数据`;
        }
      },
      columns_quality_grade: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          slots: { title: "nameTitle" },
          dataIndex: "name",
          width: "14%",
          scopedSlots: { customRender: "name" }
        },
        {
          slots: { title: "judge_standardTitle" },
          dataIndex: "judge_standard",
          width: "40%",
          scopedSlots: { customRender: "judge_standard" }
        },
        {
          slots: { title: "gistTitle" },
          dataIndex: "gist",
          width: "12%",
          scopedSlots: { customRender: "gist" }
        },
        {
          slots: { title: "max_scoreTitle" },
          dataIndex: "max_score",
          width: "10%",
          scopedSlots: { customRender: "max_score" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      pagination_quality_grade: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length =
            (this.formData.quality_grade_info &&
              this.formData.quality_grade_info.length) ||
            0;
          return `共${length}条数据`;
        }
      },
      webSocketUrl: this.global.webSocketUrl,
      ws: null,
      heart_beat_interval: null,
      ping: null,
      file_obj: {},
      tabIndex: null,
      signModalVisible: false,
      file_path: ""
    };
  },
  filters: {
    is_match(key) {
      switch (key) {
        case "1":
          return "正偏离";
        case "0":
          return "无偏离";
        case "-1":
          return "负偏离";
        default:
          return "未知状态";
      }
    }
  },
  created() {
    this.bid_code = this.$route.query.code;
    this.father.selectedKeys = ["/Sbid/tender_list"];
    get_tender_info(this.bid_code)
      .then(res => {
        var formData = res.data || {};
        var columns = [];
        formData.bid_info.area_list.forEach(elem => {
          this.columnsStock[6].children.push({
            title: elem.area_name,
            dataIndex: elem.area_key,
            scopedSlots: { customRender: elem.area_key },
            width: "6%",
            align: "center"
          });
        });
        if (formData.bid_info.area_list.length > 1) {
          this.columnsStock[6].children.push({
            title: "合计数量",
            dataIndex: "number",
            width: "6%",
            align: "center"
          });
        }
        formData.stock_list.forEach(
          elem => {
            elem.new_price = elem.secret_price == "" ? "" : "***"
          });
        this.secret = formData.bid_info.secret;
        this.secretKey = this.secretKey || formData.bid_info.secret;
        if (formData.bid_info.secret) {
          encryption({
            serverName: "{0DADE507-64D6-4306-956A-2ED144FF0ED1}",
            funcName: "DecryptDigitalEnvelope",
            param: `{"digitalEnvelopeB64":"${formData.bid_info.secret}"}`
          })
            .then(res => {
              if (res.data.result != "") {
                this.secret = res.data.result.slice(0, 16);
                formData.stock_list.forEach(elem => {
                  if(elem.secret_price)
                  elem.new_price = this.$common.toDecimal(decryptAes(elem.secret_price, this.secret, this.secret),2);
                });
              } else {
                this.$message.error("请检查是否插入U盾");
              }
            })
            .catch(error => {
              this.$message.error(error);
            });
        }
        this.formData = formData;
      })
      .catch(error => this.$message.error(error));
    this.get_tender_complete_info();
  },
  mounted() {
    this.connect_webSocket();
  },
  beforeDestroy() {
    if (this.ws && this.ws.readyState == 1) this.ws.close();
  },
  methods: {
    get_tender_complete_info() {
      get_tender_complete_info(this.bid_code)
        .then(res => {
          this.tender_complete_info = res.data || {};
        })
        .catch(error => this.$message.error(error));
    },
    connect_webSocket() {
      var self = this;
      if ("WebSocket" in window) {
        self.ws = new WebSocket(self.webSocketUrl);
        self.ws.onopen = function(e) {
          if (!self.secret) {
            self.ws.send(
              JSON.stringify({
                c: "getEncryptKey",
                i: 0,
                m: {
                  id:
                    new Date().Format("YYYYMMDDhhmmssS") +
                    self.$common.getUnix(parseInt(Math.random() * 1000)),
                  file: "",
                  key: ""
                }
              })
            );
          }
        };
        self.ws.onerror = function(e) {
          self.$message.error("加密程序连接失败，请打开加密程序");
        };
        self.ws.onmessage = function(e) {
          var result, controls, code, msg;
          result = JSON.parse(e.data);
          controls = result.c;
          code = result.m.code;
          msg = result.m.msg;
          self.file_obj.file = result.m.file;
          if (code == 200) {
            switch (controls) {
              case "encryptFile":
                POST({ c: "Upload", a: "upload_one_base64" }, self.file_obj)
                  .then(res => {
                    let obj = {
                      file_name: res.data.name,
                      file_path: res.data.savepath,
                      secret: result.m.key
                    };
                    switch (self.activeKey) {
                      case "2":
                        self.formData.quality_info[
                          self.tabIndex
                        ].file_list.push(obj);
                        break;
                      case "3":
                        self.formData.quality_grade_info[
                          self.tabIndex
                        ].file_list.push(obj);
                        break;
                      case "4":
                        if (self.tabIndex == "priceFile") {
                          self.formData.tender_file.price_file_list.push(obj);
                        } else {
                          self.formData.tender_file.file_list.push(obj);
                        }
                        break;
                      default:
                        break;
                    }
                  })
                  .catch(error => {
                    self.$message.error(error);
                  });
                break;
              case "getEncryptKey":
                if (!self.secret) {
                  self.secretKey = result.m.key; // 密文
                  encryption({
                    serverName: "{0DADE507-64D6-4306-956A-2ED144FF0ED1}",
                    funcName: "DecryptDigitalEnvelope",
                    param: `{"digitalEnvelopeB64":"${result.m.key}"}`
                  })
                    .then(res => {
                      if (res.data.result != "") {
                        self.secret = res.data.result.slice(0, 16);
                      } else {
                        self.$message.error("请检查是否插入U盾");
                      }
                    })
                    .catch(error =>
                      self.$message.error("请输入口令后再次执行解密")
                    );
                }
              case "ping":
                self.ping = 0;
              default:
                // self.ws.close();
                break;
            }
          } else {
            self.$message.warn(msg);
          }
        };
        self.ws.onclose = function() {
          clearInterval(self.heart_beat_interval);
        };
        self.heart_beat();
      } else {
        self.$message.info("您的浏览器不支持webSocket链接");
      }
    },
    heart_beat() {
      // 心跳包
      let self = this;
      self.heart_beat_interval = setInterval(function() {
        //每隔30秒钟发送一次心跳，避免websocket连接因超时而自动断开
        if (self.ws && self.ws.readyState == 1 && self.ping < 2) {
          // 分为两种，断开即刻重连，未断开未响应，12秒重连
          self.ws.send(JSON.stringify({ c: "ping", i: 0, m: {} }));
          self.ping++;
        } else {
          clearInterval(self.heart_beat_interval);
          self.connect_webSocket();
        }
      }, 12000);
      self.$once("hook:beforeDestroy", () => {
        clearInterval(self.heart_beat_interval);
      });
    },
    callback(name) {
      this.activeKey = name;
    },
    back() {
      this.$router.go(-1);
    },
    submit() {
      var self = this;
      this.$confirm({
        title: "确认提交投标文件吗？",
        onOk() {
          submit_tender(self.bid_code)
            .then(res => {
              self.$message.success(res.msg);
              let time = setTimeout(() => {
                self.$router.push({ name: "/Sbid/tender_list" });
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
    download_excel() {
      var file_name = `${
        this.formData.bid_info.title
      }商品信息${new Date().Format("YYYYMMDD")}`;
      var wb = XLSX.utils.table_to_book(
        document.querySelector(".stock_table table")
      );
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `${file_name}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    save_stock_list() {
      // 保存报价
      var self, data, key, secret;
      self = this;
      key = false;
      data = {
        bid_code: this.bid_code,
        secret: this.secretKey, // 密文secret
        stock_list: JSON.parse(JSON.stringify(this.formData.stock_list))
      };
      secret = this.secret; // 明文secret
      data.stock_list.forEach(elem => {
        elem.secret_price = encryptAes(elem.new_price, secret);
        let length = this.$common.isArray(elem.new_price.match(/\./g))
          ? elem.new_price.match(/\./g).length
          : 0;
        if (length > 1) key = true;
      });
      if (key) {
        this.$message.warn("请填写正确的数据格式");
        return;
      }
      this.$confirm({
        title: "确认保存报价吗?",
        onOk() {
          save_supply_stock_list(data)
            .then(res => {
              self.$message.success(res.msg);
              self.get_tender_complete_info();
            })
            .catch(error => {
              self.$message.error(error);
            });
        },
        onCancel() {}
      });
    },
    del_quality_info_file(e, index) {
      // 删除资格审查要求文件
      var index2 = e.target.dataset.key;
      if (index2 !== undefined) {
        this.formData.quality_info[index].file_list.splice(index2, 1);
      }
    },
    save_bid_quality() {
      // 保存资格审查文件
      var quality_info, obj, quality_file_list;
      quality_info = this.formData.quality_info;
      quality_file_list = {};
      quality_info.forEach(elem => {
        quality_file_list[elem.id] = elem.file_list;
      });
      obj = {
        bid_code: this.bid_code,
        quality_file_list
      };
      save_bid_quality_file(obj)
        .then(res => {
          this.$message.success(res.msg)
          this.get_tender_complete_info();
        })
        .catch(error => this.$message.error(error));
    },
    add_sign() {
      open(`https://localhost:7688/index.html?file=/${this.file_path}`);
    },
    afterClose() {
      this.file_path = "";
    },
    quality_grade_change(event, index) {
      // 添加资格评分要求文件
      var self = this;
      this.tabIndex = index;
      var files = event.target.files;
      self.file_obj.name = files[0].name + ".tgw";
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
      let reader = new FileReader();
      let obj = {
        c: "encryptFile",
        i: 0,
        m: {
          id:
            new Date().Format("YYYYMMDDhhmmssS") +
            this.$common.getUnix(parseInt(Math.random() * 1000)),
          file: "",
          key: ""
        }
      };
      reader.readAsDataURL(files[0]); //发起异步请求
      reader.onload = function() {
        let file = this.result;
        self.file_obj.file = file;
        obj.m.file = file.split(",")[1];
        if (self.ws.readyState == 0 || self.ws.readyState == 3) {
          self.$info({
            title: "温馨提示",
            content: "加密程序连接失败，请先开启加密程序，再刷新此页面",
            onOk() {}
          });
          return;
        }
        self.ws.send(JSON.stringify(obj));
      };
    },
    del_quality_grade_file(e, index) {
      // 删除资格评分要求文件
      var index2 = e.target.dataset.key;
      if (index2 !== undefined) {
        this.formData.quality_grade_info[index].file_list.splice(index2, 1);
      }
    },
    save_bid_quality_grade() {
      // 保存资质评分文件
      var quality_grade_info, obj, quality_grade_file_list;
      quality_grade_info = this.formData.quality_grade_info;
      quality_grade_file_list = {};
      quality_grade_info.forEach(elem => {
        quality_grade_file_list[elem.id] = elem.file_list;
      });
      obj = {
        bid_code: this.bid_code,
        quality_grade_file_list
      };
      save_bid_quality_grade_file(obj)
        .then(res => {
          this.$message.success(res.msg);
          this.get_tender_complete_info();
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    customRequest(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData.tender_file.file_list.push(img_obj);
        })
        .catch();
    },
    customRequest2(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData.tender_file.price_file_list.push(img_obj);
        })
        .catch();
    },
    del(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData.tender_file.file_list.splice(index, 1);
      }
    },
    del2(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData.tender_file.price_file_list.splice(index, 1);
      }
    },
    beforeUpload(file) {
      const isJPGPDF =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "application/pdf";
      if (!isJPGPDF) {
        this.$message.error("您只可以上传JPG,PNG,PDF格式的文件");
      }
      var isPicLt100KB;
      var isPdfLt2M;
      if (file.type === "image/jpeg" || file.type === "image/png") {
        if (file.size / 1024 / 1024 < 0.8) {
          isPicLt100KB = true;
        } else {
          this.$message.error("图片大小必须小于 800KB!");
          isPicLt100KB = false;
        }
      } else if (file.type === "application/pdf") {
        if (file.size / 1024 / 1024 < 8) {
          isPdfLt2M = true;
        } else {
          this.$message.error("文件大小必须小于 8MB!");
          isPdfLt2M = false;
        }
      }
      return isJPGPDF && isPicLt100KB && isPdfLt2M;
    },
    saveFile() {
      var obj = {};
      obj.bid_code = this.bid_code;
      obj.file_list = this.formData.tender_file.file_list;
      obj.price_file_list = this.formData.tender_file.price_file_list;
      save_bid_tender_file(obj)
        .then(res => {
          this.$message.success(res.msg);
          this.get_tender_complete_info();
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#addSPurchaseDoc {
  @include component;
  // .tabs {
  //   @include flex;
  //   li {
  //     @extend .mr-10;
  //     @extend .text-center;
  //   }
  // }
  .ant-tabs {
    .ant-tabs-tab {
      div {
        .img_point {
          width: 6px;
          height: 6px;
          position: relative;
          bottom: 2px;
        }
        img {
          width: 17px;
          height: 17px;
          margin-bottom: 2px;
        }
      }
    }
  }
  .info {
    margin: 10px 0;
    margin-left: 20px;
    width: 55%;
  }
  .tab-bg {
    background-color: $primary2;
    color: $white;
  }
  h5 {
    position: relative;
    button {
      position: absolute;
      right: 15px;
      top: -9px;
    }
  }
  .header {
    @include flex(space-between);
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
  .table {
    margin: 15px 0;
    input[type="number"],
    input[type="text"] {
      border: 1px solid rgba(0, 0, 0, 0.65);
      padding-left: 5px;
      @extend .radius;
      height: 25px;
      line-height: 1.5;
      width: 80%;
    }
  }
  textarea::-webkit-scrollbar {
    width: 5px;
  }
}
</style>
<style lang="scss">
.supply-purchase-info {
  .ant-alert {
    width: 85% !important;
    margin-bottom: 20px !important;
    p {
      font-size: 12px !important;
    }
  }
  .file-path-model {
    color: $red;
  }
}
</style>