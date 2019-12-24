<template>
  <div id="addPurchaseDoc">
    <h5>
      采购文件管理 / 制作采购文件
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
            公告信息
            <img
              :src="purchase_complete_info.notice_info.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <a-form :form="form" @submit="handleSubmit">
            <h4 class="relative">
              供应商资格要求
              <a-form-item class="absolute no-margin" style="right:0;top:0;">
                <a-button type="primary" html-type="submit">保存</a-button>
              </a-form-item>
            </h4>
            <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="ml-10">
              <a-textarea
                placeholder="请输入供应商资格要求"
                :rows="4"
                v-decorator="[
                  'qualifications',
                  { initialValue:formData.notice_info.qualifications }
                ]"
              />
            </a-form-item>
            <h4>供应商获取采购文件要求</h4>
            <a-row>
              <a-col :span="4" class="text-right" style="height:39px;line-height:39px;">
                <img class="img_point_six" :src="point_six" alt="必填" />
                获取时间：
              </a-col>
              <a-col :span="18">
                <a-form-item class="inline-block">
                  <a-date-picker
                    v-if="formData.notice_info.start_time"
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="开始时间"
                    v-decorator="[
                      'start_time',
                      { 
                        rules: [{ required: true, message: '请选择开始时间' }],
                        initialValue:$moment(formData.notice_info.start_time)
                      }
                    ]"
                  />
                  <a-date-picker
                    v-else
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="开始时间"
                    v-decorator="[
                      'start_time',
                      {
                        rules: [{ required: true, message: '请选择开始时间' }],
                      }
                    ]"
                  />
                </a-form-item>
                <span style="height:39px;line-height:39px;" class="ml-10 mr-10">~</span>
                <a-form-item class="inline-block">
                  <a-date-picker
                    v-if="formData.notice_info.end_time"
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="结束时间"
                    v-decorator="[
                      'end_time',
                      { 
                        rules: [{ required: true, message: '请选择结束时间' }],
                        initialValue:$moment(formData.notice_info.end_time)
                      }
                    ]"
                  />
                  <a-date-picker
                    v-else
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="结束时间"
                    v-decorator="[
                      'end_time',
                      {
                        rules: [{ required: true, message: '请选择结束时间' }],
                      }
                    ]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <h4>招标供应商数量</h4>
            <a-form-item label="需求数量" v-bind="formItemLayout">
              <a-input
                @input="input_min_supply"
                style="width:26%;"
                class="mr-10"
                placeholder="请输入需求数量"
                v-decorator="[
                  'min_supply',
                  { rules: [{ required: true, message: '请输入需求数量' }],initialValue:formData.notice_info.min_supply }
                ]"
              ></a-input>家
            </a-form-item>
            <a-form-item label="中标执行价格" v-bind="formItemLayout">
              <a-radio-group
                v-if="min_supply<2"
                v-decorator="[
                  'exec_price_type',
                  { rules: [{ required: true, message: '请选择中标执行价格' }],initialValue:formData.notice_info.exec_price_type }
                ]"
              >
                <a-radio
                  class="radioStyle"
                  v-for="item of exec_price_type.slice(0,4)"
                  :key="item.id"
                  :value="item.id"
                >{{item.name}}</a-radio>
              </a-radio-group>
              <a-radio-group
                v-else
                v-decorator="[
                  'exec_price_type',
                  { rules: [{ required: true, message: '请选择中标执行价格' }],initialValue:formData.notice_info.exec_price_type }
                ]"
              >
                <a-radio
                  class="radioStyle"
                  v-for="item of exec_price_type.slice(4)"
                  :key="item.id"
                  :value="item.id"
                >
                  {{item.name.split('N')[0]}}
                  <span
                    class="color ml-10 mr-10"
                  >{{item.name.indexOf('N')!=-1?min_supply:''}}</span>
                  {{item.name.split('N')[1]}}
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <h4>开标评标时间地址</h4>
            <a-form-item v-bind="formItemLayout" label="投标截止时间(开标时间)">
              <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                v-if="formData.notice_info.open_time"
                placeholder="请选择时间"
                v-decorator="[
                  'open_time',
                  { rules: [{ type: 'object',required: true, message: '请选择时间' }],initialValue:$moment(formData.notice_info.open_time)}
                ]"
              />
              <a-date-picker
                v-else
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择时间"
                v-decorator="[
                  'open_time',
                  { rules: [{ type: 'object',required: true, message: '请选择时间' }]}
                ]"
              />
            </a-form-item>
            <a-form-item label="开标地址" v-bind="formItemLayout">
              <a-input
                placeholder="请输入开标地址"
                v-decorator="[
                  'open_address',
                  { rules: [{ required: true, message: '请输入开标地址' }],initialValue:formData.notice_info.open_address }
                ]"
              ></a-input>
            </a-form-item>
            <a-form-item label="投标文件递交地址" v-bind="formItemLayout">
              <a-input
                placeholder="请输入投标文件递交地址"
                v-decorator="[
                  'submit_address',
                  {rules: [{ required: true, message: '请输入投标文件递交地址' }],initialValue:formData.notice_info.submit_address }
                ]"
              ></a-input>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="评审时间">
              <a-date-picker
                v-if="formData.notice_info.judge_time"
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择评审时间"
                v-decorator="[
                  'judge_time',
                  { rules: [{ type: 'object',required: true, message: '请选择评审时间' }],initialValue:$moment(formData.notice_info.judge_time)}
                ]"
              />
              <a-date-picker
                v-else
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择时间"
                v-decorator="[
                  'judge_time',
                  { rules: [{ type: 'object',required: true, message: '请选择时间' }]}
                ]"
              />
            </a-form-item>
            <a-form-item label="评审地址" v-bind="formItemLayout">
              <a-input
                placeholder="请输入评审地址"
                v-decorator="[
                  'judge_address',
                  {rules: [{ required: true, message: '请输入评审地址' }],initialValue:formData.notice_info.judge_address }
                ]"
              ></a-input>
            </a-form-item>
            <h4>投标保证金与处罚信息</h4>
            <a-form-item label="是否需要缴纳投标保证金" v-bind="formItemLayout">
              <a-radio-group
                @change="is_margin_change"
                v-decorator="[
                  'is_margin',
                  {rules: [{ required: true,message: '请选择是否缴纳投标保证金' }],initialValue:formData.notice_info.is_margin!=''?+formData.notice_info.is_margin:'' }
                ]"
              >
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
              <div v-if="formData.notice_info.is_margin==1">
                <a-input
                  style="width:30%;margin-right:5px;"
                  placeholder="请输入投标保证金"
                  v-model="margin"
                ></a-input>万元
              </div>
            </a-form-item>
            <a-form-item label="处罚信息" v-bind="formItemLayout">
              由于中标价格原因、配送能力等原因供应商当场放弃中标权利，可对供应商处罚
              <a-input
                style="width:80px;margin-right:5px;"
                placeholder="请输入处罚金额"
                v-decorator="[
                  'fine_money',
                  {rules: [{ required: true,message: '请输入处罚金额' }],initialValue:formData.notice_info.fine_money }
                ]"
              ></a-input>万元
            </a-form-item>
            <h4>公告附件</h4>
            <a-form-item label="附件" v-bind="formItemLayout">
              <a-upload
                :showUploadList="false"
                :customRequest="customRequest2"
                :beforeUpload="beforeUpload"
                v-decorator="[
                  'file_path',
                  { initialValue:formData.notice_info.file_list }
                ]"
              >
                <a-button>
                  <a-icon type="upload" />上传
                </a-button>
                <ul>
                  <li
                    class="mt-10"
                    @click.stop="del_notice_file"
                    v-for="(item,index) of formData.notice_info.file_list"
                    :key="index"
                  >
                    <svg-icon class="wenjian" icon-class="wenjian" />
                    <span class="ml-10 mr-10">{{item.file_name}}</span>
                    <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
                  </li>
                </ul>
              </a-upload>
            </a-form-item>
            <h4>其他事项</h4>
            <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="ml-10">
              <a-textarea
                placeholder="请输入其他事项"
                :rows="4"
                v-decorator="[
                  'desc',
                  { initialValue:formData.notice_info.desc }
                ]"
              />
            </a-form-item>
            <h4>联系信息</h4>
            <a-form-item label="采购人" v-bind="formItemLayout">
              <a-input
                placeholder="请输入采购人"
                readOnly
                v-decorator="[
                  'bid_name',
                  { rules: [{ required: true, message: '请输入采购人' }],initialValue:formData.notice_info.bid_name }
                ]"
              ></a-input>
            </a-form-item>
            <a-form-item label="采购人联系人" v-bind="formItemLayout">
              <a-input
                placeholder="请输入采购人联系人"
                v-decorator="[
                  'contact_name',
                  { rules: [{ required: true, message: '请输入采购人联系人' }],initialValue:formData.notice_info.contact_name }
                ]"
              ></a-input>
            </a-form-item>
            <a-form-item label="采购人联系方式" v-bind="formItemLayout">
              <a-input
                placeholder="请输入采购人联系方式"
                v-decorator="[
                  'contact_number',
                  { rules: [{ required: true, message: '请输入采购人联系方式' }],initialValue:formData.notice_info.contact_number }
                ]"
              ></a-input>
            </a-form-item>
            <a-form-item label="传真" v-bind="formItemLayout">
              <a-input
                placeholder="请输入传真"
                v-decorator="[
                  'fax',
                  { initialValue:formData.notice_info.fax }
                ]"
              ></a-input>
            </a-form-item>
            <a-form-item label="地址" v-bind="formItemLayout">
              <a-input
                placeholder="请输入地址"
                v-decorator="[
                  'address',
                  {
                    rules: [{ required: true, message: '请输入地址' }],
                    initialValue:formData.notice_info.address 
                  }
                ]"
              ></a-input>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2">
          <div slot="tab">
            资格审查要求
            <img
              :src="purchase_complete_info.quality_info.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <div>
            <div class="header">
              <h4>资格审查要求</h4>
              <div>
                <a-button type="primary" class="mb-10 mr-10" @click="handleAdd">添加行</a-button>
                <a-button type="primary" @click="save_bid_quality">保存</a-button>
              </div>
            </div>
            <a-table
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
              <template
                v-for="col in ['name', 'desc', 'gist']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-textarea 
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.key, col, record.id)"
                    :rows="4"
                  />
                </div>
              </template>
              <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                  v-if="formData.quality_info.length"
                  title="确认删除吗？"
                  @confirm="() => onDelete(record.id)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3">
          <div slot="tab">
            <img class="img_point" :src="point" alt="必填" />
            价格评标方法
            <img
              :src="purchase_complete_info.eval_method_info.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <a-form :form="form2" @submit="save_bid_eval_method" class="bid-rule">
            <h4 class="relative">
              评分规则
              <a-form-item class="absolute no-margin" style="right:0;top:0;">
                <a-button type="primary" html-type="submit">保存</a-button>
              </a-form-item>
            </h4>
            <a-form-item v-bind="formItemLayout2">
              <span slot="label">报价分（{{formData.eval_method_info.max_score}}）</span>
              计算公式=
              <a-select
                allowClear
                dropdownMatchSelectWidth
                placeholder="请选择计算公式"
                style="width: 50%"
                v-decorator="[
                  'type',
                  {
                    rules: [{ required: true, message: '请选择计算公式' }],
                    initialValue:formData.eval_method_info.type
                  }
                ]"
              >
                <a-select-option
                  v-for="item of eval_method_info.type"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="最高得分" v-bind="formItemLayout2">
              <a-input
                @input="change_max_score"
                placeholder="请输入最高得分"
                v-decorator="[
                  'max_score',
                  {
                    rules: [{ required: true, message: '请输入最高得分' }],
                    initialValue:formData.eval_method_info.max_score 
                  }
                ]"
              ></a-input>
            </a-form-item>
            <a-form-item label="基准价" v-bind="formItemLayout2">
              <a-radio-group
                @change="standard_price_type_change"
                :options="eval_method_info.standard_price_type"
                v-decorator="[
                'standard_price_type',
                {
                  rules: [{ required: true, message: '请选择基准价' }],
                  initialValue:formData.eval_method_info.standard_price_type
                }
              ]"
              />
            </a-form-item>
            <a-form-item
              label
              v-if="formData.eval_method_info.standard_price_type==3"
              :label-col="{span:5}"
              :wrapper-col="{span:11}"
              class="middle_price_type"
              style
            >
              <a-radio-group
                v-decorator="[
                'middle_price_type',
                {
                  initialValue:formData.eval_method_info.middle_price_type
                }]"
              >
                <a-radio
                  :style="radioStyle"
                  v-for="(item,index) of eval_method_info.middle_price_type"
                  :value="item.value"
                  :key="index"
                >{{item.label}}</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="评分标准" v-bind="formItemLayout2">
              <a-radio-group
                @change="eval_standard_type_change"
                v-decorator="[
                  'eval_standard_type',
                  {
                    rules: [{ required: true, message: '请选择评分标准' }],
                    initialValue:formData.eval_method_info.eval_standard_type 
                  }
                ]"
              >
                <a-radio
                  class="block mb-10"
                  v-for="item of eval_method_info.eval_standard_type"
                  :value="item.value"
                  :key="item.value"
                >
                  {{item.label}}
                  <div
                    v-if="formData.eval_method_info.eval_standard_type === '2' && item.value==='2'"
                  >
                    <div class="ratio">
                      <span>基准价得分：</span>
                      <a-input placeholder="请输入基准价得分" v-model="eval_standard_ext.standard_price" />
                    </div>
                    <div class="ratio">
                      <span>每百分点分值：</span>
                      <a-input
                        placeholder="请输入每百分点分值"
                        v-model="eval_standard_ext.per_percent_point"
                      />
                    </div>
                  </div>
                  <div
                    v-if="formData.eval_method_info.eval_standard_type === '3' && item.value==='3'"
                  >
                    <div class="ratio">
                      <span>正偏离每百分点分值：</span>
                      <a-input
                        placeholder="请输入正偏离每百分点分值"
                        v-model="eval_standard_ext.up_percent_point"
                      />
                    </div>
                    <div class="ratio">
                      <span>负偏离每百分点分值：</span>
                      <a-input
                        placeholder="请输入负偏离每百分点分值"
                        v-model="eval_standard_ext.down_percent_point"
                      />
                    </div>
                  </div>
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="4">
          <div slot="tab">
            <img class="img_point" :src="point" alt="必填" />
            资质评分要求
            <img
              :src="purchase_complete_info.quality_grade_info.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <div>
            <div class="header">
              <h4>资质评分要求</h4>
              <div>
                <span class="mr-10">总分{{total_score}}</span>
                <a-button type="primary" class="mb-10 mr-10" @click="handleAddGrade">添加行</a-button>
                <a-button type="primary" @click="save_bid_quality_grade">保存</a-button>
              </div>
            </div>
            <a-table
              :pagination="pagination2"
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
              <template
                v-for="col in ['name', 'judge_standard', 'gist', 'max_score']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-textarea 
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChangeGrade(e.target.value, record.key, col, record.id)"
                    :rows="4" 
                  />
                </div>
              </template>
              <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                  v-if="formData.quality_grade_info.length"
                  title="确认删除吗？"
                  @confirm="() => onDeleteGrade(record.id)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="5">
          <div slot="tab">
            <img class="img_point" :src="point" alt="必填" />
            项目附件
            <img
              :src="purchase_complete_info.purchase_file.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="是否完善"
            />
          </div>
          <div class="mb-10 relative">
            <h4>采购文件</h4>
            <a-button
              type="primary"
              class="absolute"
              style="right:0;top:0;"
              @click.stop="saveFile"
            >保存</a-button>
            <p class="ml-10">支持 .png .jpg .pdf .docx .doc格式</p>
          </div>
          <a-button type="primary" @click="build_file">
            <a-icon type="upload" />生成采购文件
          </a-button>
          <a-upload
            class="ml-10"
            multiple
            :showUploadList="false"
            :customRequest="customRequest"
            :beforeUpload="beforeUpload"
          >
            <a-button type="primary">
              <a-icon type="upload" />上传文件
            </a-button>
          </a-upload>
          <ul>
            <li
              class="mt-10"
              @click.stop="del"
              v-for="(item,index) of formData.purchase_file"
              :key="index"
            >
              <svg-icon class="wenjian" icon-class="wenjian" />
              <span class="ml-10 mr-10">{{item.file_name}}</span>
              <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
            </li>
          </ul>
        </a-tab-pane>
      </a-tabs>
    </section>
  </div>
</template>

<script>
import {
  get_bid_purchase_info, // 获取采购文件全部详情
  save_bid_notice, // 添加/编辑公告
  save_bid_quality, // 保存资质审核要求
  save_bid_quality_grade, // 保存资质评分要求
  save_bid_purchase_file, // 保存文件附件
  submit_bid_purchase, // 提交采购文件
  save_bid_eval_method, // 添加/编辑评标方法
  get_purchase_complete_info // 获取采购文件是否完善
} from "@admin/api/bids";
import { POST, get_exec_price_type } from "@common/js/apis";
export default {
  props: {
    father: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 10 }
      },
      formItemLayout2: {
        labelCol: { span: 5 },
        wrapperCol: { span: 11 }
      },
      bid_id: "",
      point: require("@static/images/icon_point.png"),
      del_icon: require("@static/icon/icon_close.png"),
      exec_price_type: [],
      purchase_complete_info: {
        notice_info: {
          status: 0, //0未完善 1已完善
          name: "",
          ico_class: ""
        },
        quality_info: {
          status: 0,
          name: "",
          ico_class: ""
        },
        eval_method_info: {
          status: 0,
          name: "",
          ico_class: ""
        },
        quality_grade_info: {
          status: 0,
          name: "",
          ico_class: ""
        },
        purchase_file: {
          status: 0,
          name: "",
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
          eval_standard_ext: {
            //评分标准扩展说明如下
            standard_price: "",
            per_percent_point: "",
            up_percent_point: "",
            down_percent_point: ""
          }
        }
      },
      min_supply: "",
      margin: "",
      point: require("@static/images/icon_point.png"),
      point_six: require("@static/images/icon_point_six.png"),
      activeKey: "1",
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
          width: "20%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "具备的条件说明（要求）",
          dataIndex: "desc",
          width: "30%",
          scopedSlots: { customRender: "desc" }
        },
        {
          title: "判定依据",
          dataIndex: "gist",
          width: "30%",
          scopedSlots: { customRender: "gist" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: "10%",
          scopedSlots: { customRender: "operation" }
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
          width: "14%",
          scopedSlots: { customRender: "name" }
        },
        {
          slots: { title: "judge_standardTitle" },
          dataIndex: "judge_standard",
          width: "49%",
          scopedSlots: { customRender: "judge_standard" }
        },
        {
          slots: { title: "gistTitle" },
          dataIndex: "gist",
          width: "15%",
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
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "operation" }
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
      },
      pagination2: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length =
            (this.formData.quality_eval_method_info &&
              this.formData.quality_eval_method_info.length) ||
            0;
          return `共${length}条数据`;
        }
      },
      eval_method_info: {
        type: [{ value: "1", label: "自动计算报价得分" }],
        standard_price_type: [
          { value: "1", label: "最低价" },
          { value: "2", label: "次低价" },
          { value: "3", label: "中位值" }
        ],
        eval_standard_type: [
          { value: "1", label: "（1 - | 商家报价 - 最低报价 | / 最低报价） * 最高得分" },
          {
            value: "2",
            label:
              "基准价得分 -（投标人报价 - 基准价）/基准价*100%*每百分点分值"
          },
          {
            value: "3",
            label:
              "最高得分 - |  投标人报价 - 中位值  | / 中位值*100%*每百分点分值"
          }
        ],
        middle_price_type: [
          { value: "1", label: "各商家报价的算术平均数" },
          {
            value: "2",
            label: "【各商家报价之和 - 最高报价 - 最低报价】 / （报价商家数量 - 2）"
          },
          {
            value: "3",
            label: "【次高报价+次低报价】 / 2"
          },
          {
            value: "4",
            label:
              "【（次高报价+次次高报价）*40%+（次低报价+次次低报价）*60%】 / 2"
          }
        ]
      },
      eval_standard_ext: {
        //评分标准扩展说明如下
        standard_price: "",
        per_percent_point: "",
        up_percent_point: "",
        down_percent_point: ""
      },
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      }
    };
  },
  computed:{
    total_score(){
      var total_score = this.formData.quality_grade_info&&this.formData.quality_grade_info.reduce((prev,elem)=>{
        return prev+= +elem.max_score;
      },0)
      return total_score
    }
  },
  created() {
    this.bid_id = this.$route.query.id;
    this.father.selectedKeys = ["/Bid/purchase_list"];
    this.get_bid_info();
    this.get_exec_price_type();
    this.get_purchase_complete_info();
  },
  methods: {
    get_bid_info() {
      get_bid_purchase_info(this.bid_id)
        .then(res => {
          this.formData = res.data;
          this.min_supply = res.data.notice_info.min_supply;
          this.margin = res.data.notice_info.margin;
          this.eval_standard_ext = res.data.eval_method_info
            .eval_standard_ext || {
            //评分标准扩展说明如下
            standard_price: "",
            per_percent_point: "",
            up_percent_point: "",
            down_percent_point: ""
          };
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    get_exec_price_type() {
      get_exec_price_type()
        .then(res => {
          this.exec_price_type = res.data || [];
        })
        .catch(error => this.$message.error(error));
    },
    get_purchase_complete_info() {
      get_purchase_complete_info(this.bid_id)
        .then(res => {
          this.purchase_complete_info = res.data || {};
        })
        .catch(error => this.$message.error(error));
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
        title: "确认提交招标文件吗？",
        onOk() {
          submit_bid_purchase(self.bid_id)
            .then(res => {
              self.$message.success(res.msg);
              let time = setTimeout(() => {
                self.$router.push({ name: "/Bid/purchase_list" });
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
    input_min_supply() {
      this.formData.notice_info.exec_price_type = "";
      if (
        (event.target.value < 2 &&
          this.form.getFieldValue("exec_price_type") > 4) ||
        (event.target.value >= 2 &&
          this.form.getFieldValue("exec_price_type") <= 4)
      ) {
        this.form.resetFields("exec_price_type");
      }
      this.min_supply = event.target.value;
    },
    is_margin_change(e) {
      this.formData.notice_info.is_margin = e.target.value;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            start_time:
              fieldsValue["start_time"] &&
              fieldsValue["start_time"].format("YYYY-MM-DD HH:mm:ss"),
            end_time:
              fieldsValue["end_time"] &&
              fieldsValue["end_time"].format("YYYY-MM-DD HH:mm:ss"),
            judge_time:
              fieldsValue["judge_time"] &&
              fieldsValue["judge_time"].format("YYYY-MM-DD HH:mm:ss"),
            open_time:
              fieldsValue["open_time"] &&
              fieldsValue["open_time"].format("YYYY-MM-DD HH:mm:ss"),
            file_list: this.formData.notice_info.file_list,
            bid_id: this.bid_id,
            margin: this.margin
          };
          save_bid_notice(values)
            .then(res => {
              this.$message.success(res.msg);
              this.get_purchase_complete_info();
            })
            .catch(error => this.$message.error(error));
        }
      });
    },
    handleAdd() {
      // 添加资质审核要求
      const quality_list = this.formData.quality_info || [];
      const newData = {
        id: this.$moment().format("YYYYMMDDHHmmssS"),
        name: "",
        desc: "",
        gist: ""
      };
      this.formData.quality_info = [...quality_list, newData];
    },
    onDelete(id) {
      // 删除资质审核要求
      const quality_list = [...this.formData.quality_info];
      this.formData.quality_info = quality_list.filter(item => item.id !== id);
    },
    handleChange(value, key, column, id) {
      // const elem = event.target;
      // const style = getComputedStyle(elem);
      // const lineHeight = style.lineHeight.slice(0,-2);
      // const {scrollHeight} = elem;
      // let rowsNum = Math.round(scrollHeight / lineHeight)
      // elem.setAttribute('rows', rowsNum)
      const newData = this.formData.quality_info || [];
      let index = newData.indexOfObj("id", id);
      const target = newData.filter(item => key === item.key)[index];
      if (target) {
        target[column] = value;
        this.formData.quality_info = newData;
      }
    },
    save_bid_quality() {
      var quality_info = this.formData.quality_info || [];
      var key = quality_info.every(elem => elem.name !== "");
      if (JSON.stringify(quality_info) === "[]") {
        this.$message.warn("请添加资格审查要求");
        return;
      }
      if (key) {
        let obj = new Object();
        obj.bid_id = this.bid_id;
        obj.quality_list = quality_info;
        save_bid_quality(obj)
          .then(res => {
            this.$message.success(res.msg);
            this.get_purchase_complete_info();
          })
          .catch(error => {
            this.$message.error(error);
          });
      } else this.$message.warn("审查内容不可为空");
    },
    handleAddGrade() {
      // 添加资质评分要求
      const quality_grade_list = this.formData.quality_grade_info || [];
      const newData = {
        id: this.$moment().format("YYYYMMDDHHmmssS"),
        name: "",
        judge_standard: "",
        gist: "",
        max_score: ""
      };
      this.formData.quality_grade_info = [...quality_grade_list, newData];
    },
    onDeleteGrade(id) {
      // 删除资质评分要求
      const quality_grade_list = [...this.formData.quality_grade_info];
      this.formData.quality_grade_info = quality_grade_list.filter(
        item => item.id !== id
      );
    },
    handleChangeGrade(value, key, column, id) {
      const newData = this.formData.quality_grade_info || [];
      let index = newData.indexOfObj("id", id);
      const target = newData.filter(item => key === item.key)[index];
      if (target) {
        target[column] = value;
        this.formData.quality_grade_info = newData;
      }
    },
    save_bid_quality_grade() {
      var quality_grade_info = this.formData.quality_grade_info || [];
      var key = quality_grade_info.every(elem => {
        return (
          elem.name !== "" &&
          elem.judge_standard !== "" &&
          elem.gist !== "" &&
          elem.max_score !== ""
        );
      });
      if (JSON.stringify(quality_grade_info) === "[]") {
        this.$message.warn("请添加资质评分要求");
        return;
      }
      if (key) {
        let obj = new Object();
        obj.bid_id = this.bid_id;
        obj.quality_grade_list = quality_grade_info;
        save_bid_quality_grade(obj)
          .then(res => {
            this.$message.success(res.msg);
            this.get_purchase_complete_info();
          })
          .catch(error => {
            this.$message.error(error);
          });
      } else this.$message.warn("请填写必填项");
    },
    build_file() {
      var bid_id = this.formData.bid_info.id;
      open(`${this.global.baseUrl}/Down/down?bid_id=${bid_id}`)
    },
    customRequest(data) {
      var purchase_file = this.formData.purchase_file || [];
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          purchase_file.push(img_obj);
        })
        .catch(error => {
          this.$message.error(error);
        });
      this.formData.purchase_file = purchase_file;
    },
    customRequest2(data) {
      var file_list = this.formData.notice_info.file_list || [];
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          file_list.push(img_obj);
        })
        .catch(error => {
          this.$message.error(error);
        });
      this.formData.notice_info.file_list = file_list;
    },
    beforeUpload(file) {
      const isJPGPDF =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword";
      if (!isJPGPDF) {
        this.$message.error("您只可以上传JPG,PNG,PDF,DOCX,DOC格式的文件");
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
    del(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData.purchase_file.splice(index, 1);
      }
    },
    del_notice_file(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData.notice_info.file_list.splice(index, 1);
      }
    },
    saveFile() {
      var purchase_file = this.formData.purchase_file || [];
      if (JSON.stringify(purchase_file) === "[]") {
        this.$message.warn("请添加附件");
        return;
      }
      var obj = new Object();
      obj.bid_id = this.bid_id;
      obj.file_list = purchase_file;
      save_bid_purchase_file(obj)
        .then(res => {
          this.get_purchase_complete_info();
          this.$message.success(res.msg);
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    change_max_score(e) {
      this.formData.eval_method_info.max_score = e.target.value;
    },
    standard_price_type_change(e) {
      this.form2.setFieldsValue({ ["standard_price_type"]: e.target.value });
      this.form2.setFieldsValue({ ["eval_standard_type"]: e.target.value });
      this.formData.eval_method_info.standard_price_type = e.target.value;
      this.formData.eval_method_info.eval_standard_type = e.target.value;
    },
    eval_standard_type_change(e) {
      this.form2.setFieldsValue({ ["standard_price_type"]: e.target.value });
      this.form2.setFieldsValue({ ["eval_standard_type"]: e.target.value });
      this.formData.eval_method_info.standard_price_type = e.target.value;
      this.formData.eval_method_info.eval_standard_type = e.target.value;
    },
    save_bid_eval_method(e) {
      e.preventDefault();
      this.form2.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_id: this.bid_id,
            eval_standard_ext: {
              standard_price: this.eval_standard_ext.standard_price,
              per_percent_point: this.eval_standard_ext.per_percent_point,
              up_percent_point: this.eval_standard_ext.up_percent_point,
              down_percent_point: this.eval_standard_ext.down_percent_point
            }
          };
          if (
            values.eval_standard_type === "3" &&
            values.middle_price_type == ""
          ) {
            this.$message.warn("请选择中位值选项");
            return;
          }
          if (
            values.eval_standard_type === "2" &&
            values.eval_standard_ext.standard_price == ""
          ) {
            this.$message.warn("请输入基准价得分");
            return;
          }
          if (
            values.eval_standard_type === "2" &&
            values.eval_standard_ext.per_percent_point == ""
          ) {
            this.$message.warn("请输入每百分点分值");
            return;
          }
          if (
            values.eval_standard_type === "3" &&
            values.eval_standard_ext.up_percent_point == ""
          ) {
            this.$message.warn("请输入正偏离每百分点分值");
            return;
          }
          if (
            values.eval_standard_type === "3" &&
            values.eval_standard_ext.down_percent_point == ""
          ) {
            this.$message.warn("请输入负偏离每百分点分值");
            return;
          }
          save_bid_eval_method(values)
            .then(res => {
              this.$message.success(res.msg);
              this.get_purchase_complete_info();
            })
            .catch(error => this.$message.error(error));
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#addPurchaseDoc {
  @include component;
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
    .middle_price_type {
      position: relative;
      left: 31%;
    }
  }
  .radioStyle {
    @extend .block;
    height: 30px;
    line-height: 30px;
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
  .img_point_six{
    width: 6px;
    height: 6px;
  }
  .wenjian {
    width: 17px;
    height: 17px;
  }
  textarea::-webkit-scrollbar {
    width: 5px;
  }
  .bid-rule {
    .ant-col-11 {
      .ant-input {
        width: 50%;
      }
      .ratio {
        @include flex;
        @extend .mt-10;
        @extend .pl-20;
        width: 85%;
        span {
          flex: 1;
          @extend .text-right;
        }
        .ant-input {
          flex: 2;
        }
      }
    }
  }
}
</style>