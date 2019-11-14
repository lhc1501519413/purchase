<template>
  <a-form id="bids" :form="form" @submit="handleSubmit">
    <h5>招标管理 / 招标项目管理 / {{formData.code?'编辑项目':'新增项目'}}</h5>
    <a-form-item class="button-container">
      <div align="center">
        <a-button type="primary" html-type="submit">保存</a-button>
        <a-button type="primary" class="ml-10" @click="submit">提交</a-button>
      </div>
    </a-form-item>
    <section class="content">
      <h4>项目基本信息</h4>
      <a-row>
        <a-col :span="7">
          <a-form-item label="项目名称" v-bind="formItemLayout">
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
        <a-col :span="7" :offset="1">
          <a-form-item label="项目编号" v-bind="formItemLayout">
            <a-input
              placeholder="请输入项目编号"
              v-decorator="[
                'custom_code',
                {
                  rules: [{ required: true, message: '请输入项目编号' }],
                  initialValue:formData.custom_code
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="7">
          <a-form-item label="采购单位" v-bind="formItemLayout">
            <a-tree-select
              :disabled="!!formData.stock_list.length"
              showSearch
              @change="comChange"
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="user_com_list"
              placeholder="请选择采购单位"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
                'com_id',
                { 
                  rules: [{ required: true, message: '请选择采购单位' }],
                  initialValue:formData.com_id
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-item label="采购方式" v-bind="formItemLayout">
            <a-tree-select
              showSearch
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="bid_type_list"
              placeholder="请选择采购方式"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
                'bid_type',
                { 
                  rules: [{ required: true, message: '请选择采购方式' }],
                  initialValue:formData.bid_type
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="7">
          <a-form-item label="采购联系人" v-bind="formItemLayout">
            <a-input
              placeholder="请输入采购联系人"
              v-decorator="[
                'contact_name',
                { 
                  rules: [{ required: true, message: '请输入采购联系人' }],
                  initialValue:formData.contact_name
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="7" :offset="1">
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
    </section>
    <section class="content second-area">
      <h4>询价商品信息</h4>
      <a-row>
        <a-col :span="7">
          <a-form-item label="采购类别" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
            <a-tree-select
              style="width:80%;"
              @change="cat_change"
              :disabled="!!formData.stock_list.length"
              showSearch
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="cat_list"
              placeholder="请选择采购类别"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
              'cat_id',
              {
                rules: [{ required: true, message: '请选择采购类别' }],
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
        <thead>
          <tr>
            <th>序号</th>
            <th>商品名称</th>
            <th>品牌</th>
            <th>规格</th>
            <th>采购单位</th>
            <th>预估采购数量</th>
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
              <a href="javascript:;" @click="del(stock.stock_id)">删除</a>
            </td>
          </tr>
          <tr v-show="!formData.stock_list.length">
            <td colspan="7" align="center">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </section>
    <a-modal
      width="80%"
      title="添加商品"
      :visible="ModalVisible"
      @ok="()=>this.setModalVisible(false)"
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
      <a-input placeholder="模糊查询：编号/名称/简称" @keyup.13="get_stock_by_con_method" style="width:20%;" class="ml mr pl" v-model="kw_code"></a-input>
      <a-button type="primary" @click="get_stock_by_con_method">搜索</a-button>
      <a-table
        class="mt"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="stock_list_obj.list"
        rowKey="stock_id"
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
  get_user_com_list, // 获取当前账户有效公司列表
  get_com_price_region, // 获取公司价格执行区域列表
  get_shipping_region // 获取公司价格配送区域列表
} from "@common/js/comUsedApi";
import { 
  all_category,  // 大类列表
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  get_stock_by_con, // 商品列表
} from "@admin/api/enquiry";
import {
  save_bid, // 保存
  get_bid_info // 获取详情
} from "@admin/api/bids";

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
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 }
      },
      formData: {
        id: "",
        title: "", //标题
        custom_code: "", //项目编号
        com_id: "", // 公司id
        contact_name: "", // 联系人
        contact_number: "", // 联系方式
        bid_type:"", // 采购方式
        region_id: "", //价格区域ID
        cat_id: "", //大类ID
        shipping_days: "", //配送时间
        status: "", //询价单状态
        stock_list: [],
      },
      region_area: "", // 配送区域
      user_com_list: [], // 用户公司列表
      bid_type_list: [], // 采购方式列表
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
    this.father.selectedKeys = ['/Bid/bid_list'];
    var id = this.$route.query.id;
    id && this.get_bid_info_method(id);
    this.get_tree_data();
  },
  methods: {
    get_bid_info_method(id) {
      get_bid_info(id)
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
      all_category()
        .then(res => {
          this.cat_list = this.$common.treeSelectFormat(res.data);
        })
        .catch();
      get_bid_type()
        .then(res => {
          this.bid_type_list = this.$common.treeSelectFormat(res.data);
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
      this.formData.stock_list.forEach(elem=>this.selectedRowKeys.push(elem.stock_id));
      this.ModalVisible = true;
    },
    setModalVisible(ModalVisible) {
      this.ModalVisible = ModalVisible;
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
    submit(e){
      var self = this;
      this.$confirm({
        title: '确认提交此招标项目？',
        onOk() {
          self.handleSubmit(e,2);
        },
        onCancel() {},
      });
    },
    handleSubmit(e,submitKey) {
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
            values.status = submitKey||1;
            values.id = this.formData.id;
          }
          save_bid(values)
            .then(res => {
              this.$message.success(res.msg);
              let time = setTimeout(()=>{
                this.$router.push({ name: "/Bid/bid_list" });
                clearTimeout(time)
              },1500)
              return new Promise((resolve,reject)=>{
                resolve(res);
              })
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
    },
    paginationChange(page) {
      this.page = page;
      this.get_stock_by_con_method();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@common/styles/_table";
@import '~@admin/assets/scss/common';
#bids{
  @include component;
}
</style>