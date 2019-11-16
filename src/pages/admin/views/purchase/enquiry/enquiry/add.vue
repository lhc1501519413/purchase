<template>
  <a-form id="addEnquiry" :form="form" @submit="handleSubmit">
    <h5>在线询价 / 询价单管理 / {{code?'编辑询价单':'新增询价单'}}</h5>
    <h3 v-if="code">
      <span>
        询价单编号：{{formData.code}}
      </span>
      <span class="ml-20" v-if="formData.from_inquiry_code">
        关联询价单编号：{{formData.from_inquiry_code}}
      </span>
    </h3>
    <a-form-item class="button-container">
      <div align="center">
        <a-button type="primary" html-type="submit">保存</a-button>
      </div>
    </a-form-item>
    <section class="content">
      <h4>询价基本信息</h4>
      <a-row>
        <a-col :span="7">
          <a-form-item label="询价标题" v-bind="formItemLayout">
            <a-input
              placeholder="请输入询价标题"
              v-decorator="[
                  'title',
                  { 
                    rules: [{ required: true, message: '请输入询价标题' }],
                    initialValue:formData.title
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8" :offset="1">
          <a-form-item label="询价时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
            公告发布之日后
            <a-input
              style="width:58px;margin-right:5px;"
              placeholder="请输入"
              v-decorator="[
                'end_days',
                { 
                  rules: [{ required: true, message: '请输入询价时间' }],
                  initialValue:formData.end_days
                }
              ]"
            ></a-input>个工作日截止
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="7">
          <a-form-item label="询价单位" v-bind="formItemLayout">
            <a-tree-select
              :disabled="!!formData.stock_list.length"
              showSearch
              @change="comChange"
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="user_com_list"
              placeholder="请选择询价单位"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
                'com_id',
                { 
                  rules: [{ required: true, message: '请选择询价单位' }],
                  initialValue:formData.com_id
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="7">
          <a-form-item label="联系人" v-bind="formItemLayout">
            <a-input
              placeholder="请输入联系人"
              v-decorator="[
                'contact_name',
                { 
                  rules: [{ required: true, message: '请输入联系人' }],
                  initialValue:formData.contact_name
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8" :offset="1">
          <a-form-item label="联系方式" v-bind="formItemLayout">
            <a-input
              placeholder="请输入联系方式"
              v-decorator="[
                'contact_number',
                { 
                  rules: [
                    { required: true, message: '请输入联系方式' },
                    {validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}
                  ],
                  initialValue:formData.contact_number                 
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="10">
          <a-form-item label="成交规则" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
            <a-tree-select
              showSearch
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="all_rule_type"
              placeholder="请选择成交规则"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
                'rule_type',
                { 
                  rules: [{ required: true, message: '请选择成交规则' }],
                  initialValue:formData.rule_type  
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="10">
          <a-form-item label="供应商要求" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-textarea
              placeholder="请输入供应商要求"
              :rows="4"
              v-decorator="[
                'remark',
                { 
                  rules: [{ required: true, message: '请输入供应商要求' }],
                  initialValue:formData.remark  
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="10">
          <a-form-item label="配送区域" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-tree-select
              style="width:55%;"
              showSearch
              allowClear
              @change="areaChange"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="com_price_region"
              placeholder="请选择配送区域"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
                'region_id',
                {
                  rules: [{ required: true, message: '请选择配送区域' }],
                  initialValue:formData.region_id
                }
              ]"
            />
            <a-textarea class="mt mb" readOnly v-model="region_area" :rows="4" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="10">
          <a-form-item label="配送要求" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-textarea
              placeholder="请输入配送要求"
              :rows="4"
              v-decorator="[
                'shipping_remark',
                { 
                  rules: [{ required: true, message: '请输入配送要求' }],
                  initialValue:formData.shipping_remark
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </section>
    <section class="content second-area">
      <h4>询价商品信息</h4>
      <a-row>
        <a-col :span="7">
          <a-form-item label="询价大类" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
            <a-tree-select
              style="width:80%;"
              @change="cat_change"
              :disabled="!!formData.stock_list.length"
              showSearch
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="cat_list"
              placeholder="请选择询价大类"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
              'cat_id',
              {
                rules: [{ required: true, message: '请选择询价大类' }],
                initialValue:formData.cat_id 
              }
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item label="预计配送时间" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input
              style="width:68px;margin-right:5px;"
              placeholder="请输入"
              v-decorator="[
              'shipping_days',
              {
                rules: [{ required: true, message: '请输入预计配送时间' }],
                initialValue:formData.shipping_days
              }
            ]"
            />天
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-button type="primary" @click="add_stock">添加商品</a-button>
        </a-col>
      </a-row>
      <table cellspacing="0" width="100%" class="table_header">
        <col width="6%" />
        <col width="10%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <thead>
          <tr>
            <th>序号</th>
            <th>商品名称</th>
            <th>品牌</th>
            <th>规格</th>
            <th>采购单位</th>
            <th>预估采购数量</th>
            <th>提供产品检测报告</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
      <table cellspacing="0" width="100%" class="table_thbody">
        <col width="6%" />
        <col width="10%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <tbody>
          <tr v-for="(stock,index) in formData.stock_list" :key="stock.id">
            <td>{{index+1}}</td>
            <td>{{stock.stock_name}}</td>
            <td>
              <input type="text" v-model="stock.brand" autocomplete="off" />
            </td>
            <td>{{stock.standard}}</td>
            <td>{{stock.price_unit_name}}</td>
            <td>
              <input type="text" oninput="value=value.replace(/[^\d.]/g, '')" v-model="stock.number" autocomplete="off" />
            </td>
            <td>
              <input type="checkbox" v-model='stock.is_exam' />
            </td>
            <td>
              <a href="javascript:;" @click="del(stock.stock_id)">删除</a>
            </td>
          </tr>
          <tr v-show="!formData.stock_list.length">
            <td colspan="8" align="center">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </section>
    <a-modal
      width="80%"
      title="添加商品"
      :visible="ModalVisible"
      @ok="handleOk"
      @cancel="()=>this.setModalVisible(false)"
      :footer='null'
    >
      供应大类：
      <a-tree-select
        disabled
        style="width:15%;"
        class="ml mr"
        v-model="formData.cat_id "
        showSearch
        allowClear
        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
        :treeData="cat_list"
        placeholder="请选择大类"
        treeNodeFilterProp="title"
        dropdownMatchSelectWidth
      />供应小类：
      <a-tree-select
        style="width:15%;"
        class="ml mr"
        @change="sub_cat_change"
        v-model="sub_cat_id"
        showSearch
        allowClear
        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
        :treeData="sub_cat_list"
        placeholder="请选择小类"
        treeNodeFilterProp="title"
        dropdownMatchSelectWidth
      />
      <a-input placeholder="模糊查询：编号/名称/简称" style="width:20%;" @keyup.13="get_stock_by_con_method"  class="ml mr pl" v-model="kw_code"></a-input>
      <a-button type="primary" @click="get_stock_by_con_method">搜索</a-button>
      <a-table
        class="mt"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="stock_list_obj.list"
        rowKey="stock_id"
        :customRow="rowClick"
        :pagination="false"
      >
        <template slot="brand" slot-scope="text">
          <span>{{text}}</span>
        </template>
      </a-table>
      <a-pagination
        style='text-align:center'
        class="mt"
        showQuickJumper
        :total="+stock_list_obj.total_count"
        @change="paginationChange"
      />
    </a-modal>
  </a-form>
</template>

<script>
import {
  get_user_com_list,
  get_com_price_region,
  get_shipping_region
} from "@common/js/comUsedApi";
import { get_all_rule_type, all_category } from "@common/js/apis";
import {
  get_stock_by_con,
  save_inquiry,
  get_inquiry_info
} from "@admin/api/enquiry";
var columns = [
  {
    title: "编号",
    dataIndex: "stock_code",
    width: "17%"
  },
  {
    title: "商品名称",
    dataIndex: "stock_name",
    width: "17%"
  },
  {
    title: "大类",
    dataIndex: "parent_type_name",
    width: "17%"
  },
  {
    title: "小类",
    dataIndex: "type_name",
    width: "17%"
  },
  {
    title: "单位",
    dataIndex: "price_unit_name",
    width: "17%"
  },
  {
    title: "规格",
    dataIndex: "standard",
    width: "17%"
  }
];
export default {
  data() {
    return {
      stock_is_exam:1,
      code: "",
      id: "",
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 }
      },
      formData: {
        id: "",
        title: "", //标题
        code: "", //单号
        com_code: "",
        com_name: "", //采购单位名称
        com_id: "",
        sign_time: null,
        start_date: null, //开始时间
        end_date: null, //结束时间
        end_days: "", //公共发布之日后 个工作日截止
        shipping_days: "", //配送时间
        rule_type: "", //成交规则类型
        remark: "", //供应商要求
        shipping_remark: "", //配送要求
        status: "", //询价单状态 1 待提交（编辑）2待审核 3发布 4待确认 6撤销 8成交 9重新询价 10放弃(取消)
        cat_id: "", //大类ID
        cat_name: null, //大类名称
        region_id: "", //价格区域ID
        region_name: "",
        shipping_region_list: [],
        contact_name: "",
        contact_number: "",
        stock_list: [],
        supply_count: 1
      },
      region_area: "", // 配送区域
      user_com_list: [], // 用户公司列表
      com_price_region: [], // 价格执行区域
      all_rule_type: [], // 成交规则
      cat_list: [], // 大类列表
      sub_cat_list: [], // 小类列表
      cat_id: "", // 大类id
      sub_cat_id: "", // 小类id
      kw_code: "", // 关键字
      page: 1,
      stock_list_obj: {}, // 商品列表
      columns,
      ModalVisible: false,
      selectedRowKeys: []
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  props:{
    father:{
      type:Object
    }
  },
  created() {
    this.father.selectedKeys = ['/Inquiry/get_inquiry_list'];
    this.code = this.$route.query.code;
    this.id = this.$route.query.id;
    this.code && this.get_inquiry_info_method(this.code);
    this.get_tree_data();
  },
  methods: {
    get_inquiry_info_method(code) {
      get_inquiry_info(code)
        .then(res => {
          get_com_price_region(res.data.com_id).then(res2 => {
            var data = res2.data || [];
            this.com_price_region = this.$common.treeSelectFormat(data);
          }).catch();
          var list = res.data.shipping_region_list;
          var region_area='';
          list.forEach(elem => {
            region_area +=elem.name+'，';
          });
          this.region_area = region_area.slice(0,-1);
          var formData = res.data;
          formData.stock_list.forEach(elem=>{
            elem.is_exam = +elem.is_exam;
          })
          this.formData = formData;
        })
        .catch(error => {
          this.$message.error(error)
        });
    },
    get_tree_data() {
      get_user_com_list()
        .then(res => {
          this.user_com_list = this.$common.treeSelectFormat(res.data);
        })
        .catch();
      get_all_rule_type()
        .then(res => {
          this.all_rule_type = this.$common.treeSelectFormat(res.data);
        })
        .catch();
      all_category()
        .then(res => {
          this.cat_list = this.$common.treeSelectFormat(res.data);
        })
        .catch();
    },
    get_stock_by_con_method() {
      var data = {
        com_id:this.form.getFieldsValue(['com_id']).com_id,
        page: this.page,
        cat_id: this.formData.cat_id,
        sub_cat_id: this.sub_cat_id,
        kw_code: this.kw_code
      };
      get_stock_by_con(data)
        .then(res => {
          this.stock_list_obj = res.data;
        })
        .catch();
    },
    vali_mobile(rule, value, callback) {
      if (value && !/^1[3456789]\d{9}$/.test(value)) {
        this.yzm_disabled = !0;
        callback("请填入正确格式的手机号码"); // 校验未通过
      } else {
        this.yzm_disabled = false;
        callback(); // 校验未通过
      }
    },
    add_stock() {
      if(!this.form.getFieldsValue(['com_id']).com_id){
        this.$message.warn('请先选择询价单位');
        return;
      }
      if(!this.form.getFieldsValue(['cat_id']).cat_id){
        this.$message.warn('请先选择大类');
        return;
      }
      all_category(this.formData.cat_id).then(res => {
        var data = res.data||[];
        this.sub_cat_list = [...[{value:'0',title:'全部'}],...this.$common.treeSelectFormat(data)];
      });
      this.get_stock_by_con_method();
      var stock_list = this.formData.stock_list;
      // this.formData.stock_list.forEach(elem=>this.selectedRowKeys.push(elem.stock_id));
      this.ModalVisible = true;
    },
    setModalVisible(ModalVisible) {
      this.ModalVisible = ModalVisible;
    },
    paginationChange(page) {
      this.page = page;
      this.get_stock_by_con_method();
    },
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            var data = [...this.formData.stock_list];
            if (this.selectedRowKeys.indexOf(record.stock_id) == -1) {
              this.selectedRowKeys.push(record.stock_id);
              data.push(record);
            } else {
              this.selectedRowKeys.remove(record.stock_id);
            }
            var list = this.selectedRowKeys.merge(data, "stock_id");
            this.formData.stock_list = list;
          }
        }
      };
    },
    onSelectChange(selectedRowKeys,selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      var data = [...this.formData.stock_list,...selectedRows]
      var list = this.selectedRowKeys.merge(data,'stock_id');
      list.forEach(elem => {
        elem.number = elem.number||"";
        elem.is_exam = elem.is_exam||0;
        elem.brand = elem.brand||"";
      });
      this.formData.stock_list = list;
    },
    handleOk() {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue
          };
          if (!this.formData.stock_list.length) {
            this.$message.warn("请添加商品");
            return;
          } else {
            let stock_list = this.formData.stock_list;
            let key = false;
            stock_list.forEach(elem => {
              if (!elem.number) {
                key = true;
              }
              elem.is_exam = +elem.is_exam;
            });
            if (key) {
              this.$message.warn("商品数量不能为空");
              return;
            }
            values.stock_list = stock_list;
            values.status = 1;
            values.id = this.id;
          }
          save_inquiry(values)
            .then(res => {
              this.$message.success(res.msg);
              let time = setTimeout(()=>{
                this.$router.push({ path: "/enquiry" });
                clearTimeout(time)
              },1500)
            })
            .catch(error => {
              this.$message.error(error);
            });
        }
      });
    },
    comChange(e){
      this.region_area = "";
      this.com_price_region =[];
      this.form.setFieldsValue({ ["region_id"]: '' });
      get_com_price_region(e).then(res => {
        var data = res.data || [];
        this.com_price_region = this.$common.treeSelectFormat(data);
      }).catch();
    },
    areaChange(e) {
      get_shipping_region(e).then(res => {
        let result = res.data||[];
        let region_area = "";
        result.forEach(elem => {
          region_area += elem.name + "，";
        });
        this.region_area = region_area.slice(0, -1);
      });
    },
    cat_change(e) {
      this.formData.cat_id  = e;
      this.sub_cat_id = "";
      this.kw_code = "";
      this.page = 1;
      all_category(e).then(res => {
        var data = res.data||[];
        this.sub_cat_list = [...[{value:'0',title:'全部'}],...this.$common.treeSelectFormat(data)];
      });
      
    },
    sub_cat_change(e) {
      this.sub_cat_id = e;
      this.page = 1;
      this.get_stock_by_con_method();
    },
    del(stock_id) {
      this.selectedRowKeys = this.selectedRowKeys.filter(
        item => item !== stock_id
      );
      this.formData.stock_list = this.formData.stock_list.filter(
        item => item.stock_id !== stock_id
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@common/styles/_table";
@import "~@admin/assets/scss/enquiry/addEnquiry";
</style>