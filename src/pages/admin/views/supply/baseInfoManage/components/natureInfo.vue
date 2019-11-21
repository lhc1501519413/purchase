<template>
  <a-form id="natureInfo" :form="form" @submit="handleSubmit">
    <a-row class="first-row">
      <a-col :span="20">
        <span class="title">资质信息</span>
      </a-col>
      <a-col :span="4">
        <a-form-item>
          <a-button
            type="primary"
            @click="change_edit_read"
            v-show="edit_read&&father.status!='1'"
            html-type="button"
          >编辑</a-button>
          <a-button
            class="cancel"
            @click="change_edit_read"
            v-show="!edit_read"
            html-type="button"
          >取消</a-button>
          <a-button type="primary" html-type="submit" v-show="!edit_read">保存</a-button>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="second-row">
      <h3>请选择公司的基本资质证件形式</h3>
      <div class="choose">
        <span>资质证件形式：</span>
        <a-radio-group v-model="formData.type" :disabled="father.status=='1'">
          <a-radio :value="0">普通类型</a-radio>
          <a-radio :value="1">五证合一</a-radio>
        </a-radio-group>
      </div>
    </a-row>
    <!-- 普通类型 -->
    <section v-if="!formData.type">
      <h4>
        营业执照
        <span style="color:#3177fd;" class="pointer" @click="show_modal">查看示例</span>
      </h4>
      <a-row style="margin-top:20px;">
        <a-col :span="12">
          <a-form-item label="营业执照号" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.code}}</span>
            <a-input
              v-show="!edit_read"
              placeholder="请输入营业执照号"
              v-decorator="[
          'code',
          { rules: [{ required: true, message: '请上传营业执照' }],initialValue:formData.code }
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="登记机关" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.name}}</span>
            <a-input
              placeholder="请输入登记机关"
              v-show="!edit_read"
              v-decorator="[
          'name',{rules: [{ required: true, message: '请输入登记机关' }],initialValue:formData.name}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="成立日期：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.found_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'found_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-if="!formData.found_date && !edit_read"
              placeholder="请选择公司成立日期"
              v-decorator="[
                'found_date',
                { rules: [{ type: 'object',required: true, message: '公司成立日期必填' }] }
              ]"
            />
            <a-date-picker
              v-if="formData.found_date && !edit_read"
              placeholder="请选择公司成立日期"
              v-decorator="[
                'found_date',
                { rules: [{ type: 'object',required: true, message: '公司成立日期必填' }],initialValue:$moment(formData.found_date) }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="营业有效开始时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.effect_start_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'effect_start_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-if="!formData.effect_start_date && !edit_read"
              placeholder="请选择营业有效开始时间"
              v-decorator="[
                'effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入营业有效开始时间' }] }
              ]"
            />
            <a-date-picker
              v-if="formData.effect_start_date && !edit_read"
              placeholder="请选择营业有效开始时间"
              v-decorator="[
                'effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入营业有效开始时间' }],initialValue:$moment(formData.effect_start_date) }
              ]"
            />
          </a-form-item>
          <a-form-item label="营业有效结束时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.effect_end_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'effect_end_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              :disabled="end_date_ctrl.effect_end_date"
              v-if="!formData.effect_end_date && !edit_read"
              placeholder="请选择营业有效结束时间"
              v-decorator="[
                'effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入营业有效结束时间' }] }
              ]"
            />
            <a-date-picker
              :disabled="end_date_ctrl.effect_end_date"
              v-if="formData.effect_end_date && !edit_read"
              v-show="!edit_read"
              placeholder="请选择营业有效结束时间"
              v-decorator="[
                'effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入营业有效结束时间' }],initialValue:$moment(formData.effect_end_date) }
              ]"
            />
            <a-checkbox v-show="!edit_read" :checked="end_date_ctrl.effect_end_date" @change="end_date_change('effect_end_date')">长期有效</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          <a-form-item label="注册资本" :label-col="{ span: 18 }" :wrapper-col="{ span: 6 }">
            <span
              v-show="edit_read"
              class="register_fund"
            >{{formData.register_fund}} {{formData.fund_unit_name}} {{formData.money_type_name}}</span>
            <a-input
              placeholder="请输入注册资本"
              v-show="!edit_read"
              v-decorator="[
          'register_fund',{rules: [{ required: true, message: '请输入注册资本' }],initialValue:formData.register_fund}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="1" :offset="1">
          <a-form-item>
            <a-select
              @change="fund_unit_change"
              v-show="!edit_read"
              style="width: 80px;margin-left:10px;"
              v-decorator="['fund_unit',{initialValue:formData.fund_unit}]"
            >
              <a-select-option value="1">万</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :offset="1" :span="3">
          <a-form-item>
            <a-select
              @change="money_type_change"
              v-show="!edit_read"
              style="width: 120px;margin-left:10px;"
              v-decorator="['money_type',{initialValue:formData.money_type}]"
            >
              <a-select-option
                v-for="item of money_type"
                :key="item.code"
                :value="item.code"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="经营范围" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.business_scope}}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入经营范围"
              :rows="4"
              v-decorator="[
            'business_scope',
            { rules: [{ required: true, message: '请输入经营范围' }],initialValue:formData.business_scope }
          ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="兼营范围" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.extend_business_scope}}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入兼营范围"
              :rows="4"
              v-decorator="[
            'extend_business_scope',
            { initialValue:formData.extend_business_scope }
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="备注" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.remark}}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入备注"
              :rows="4"
              v-decorator="[
            'remark',
            { initialValue:formData.remark }
          ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="营业执照" v-bind="formItemLayout">
            <ul class="accessory" v-show="edit_read">
              <li v-for="item of formData.cert_path" :key='item.id'>{{item.file_name}}</li>
            </ul>
            <a-upload
              v-show="!edit_read"
              :showUploadList="false"
              :customRequest="customRequest_cert_path"
              :beforeUpload="beforeUpload"
              v-decorator="[
                'cert_path',
                { rules: [{ required: true, message: '请选择营业执照' }],initialValue:formData.cert_path }
              ]"
            >
              <a-button>
                <a-icon type="upload"/>上传
              </a-button>
              <ul>
                <li
                  @click.stop="del('0',$event)"
                  class="file-list-item"
                  v-for="(item,index) of formData.cert_path"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                  <svg-icon :data-key="index" class="del" icon-class="del" />
                </li>
              </ul>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="12"></a-col>
      </a-row>
      <h4>税务登记证</h4>
      <a-row style="margin-top:20px;">
        <a-col :span="12">
          <a-form-item label="税务登记号码" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.tax_code}}</span>
            <a-input
              v-show="!edit_read"
              placeholder="请输入税务登记号码"
              v-decorator="[
          'tax_code',
          { rules: [{ required: true, message: '请输入税务登记号码' }],initialValue:formData.tax_code }
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="发证机构" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.tax_name}}</span>
            <a-input
              placeholder="请输入发证机构"
              v-show="!edit_read"
              v-decorator="[
          'tax_name',{rules: [{ required: true, message: '请输入发证机构' }],initialValue:formData.tax_name}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="有效开始时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.tax_effect_start_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'tax_effect_start_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-if="!formData.tax_effect_start_date && !edit_read"
              placeholder="请选择有效开始时间"
              v-decorator="[
                'tax_effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效开始时间' }] }
              ]"
            />
            <a-date-picker
              v-if="formData.tax_effect_start_date && !edit_read"
              placeholder="请选择有效开始时间"
              v-decorator="[
                'tax_effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效开始时间' }],initialValue:$moment(formData.tax_effect_start_date) }
              ]"
            />
          </a-form-item>
          <a-form-item label="有效结束时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.tax_effect_end_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'tax_effect_end_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              :disabled="end_date_ctrl.tax_effect_end_date"
              v-if="!formData.tax_effect_end_date && !edit_read"
              placeholder="请选择有效结束时间"
              v-decorator="[
                'tax_effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效结束时间' }] }
              ]"
            />
            <a-date-picker
              :disabled="end_date_ctrl.tax_effect_end_date"
              v-if="formData.tax_effect_end_date && !edit_read"
              placeholder="请选择有效结束时间"
              v-decorator="[
                'tax_effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效结束时间' }],initialValue:$moment(formData.tax_effect_end_date) }
              ]"
            />
            <a-checkbox v-show="!edit_read" :checked="end_date_ctrl.tax_effect_end_date" @change="end_date_change('tax_effect_end_date')">长期有效</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="12"></a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="备注" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.tax_remark }}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入备注"
              :rows="4"
              v-decorator="[
            'tax_remark',
            { initialValue:formData.tax_remark	 }
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="税务登记扫描件" v-bind="formItemLayout">
            <ul class="accessory" v-show="edit_read">
              <li v-for="item of formData.tax_cert_path" :key='item.id'>{{item.file_name}}</li>
            </ul>
            <a-upload
              v-show="!edit_read"
              :showUploadList="false"
              :customRequest="customRequest_tax_cert_path"
              :beforeUpload="beforeUpload"
              v-decorator="[
                'tax_cert_path',
                { rules: [{ required: true, message: '请选择税务登记扫描件' }],initialValue:formData.tax_cert_path }
              ]"
            >
              <a-button>
                <a-icon type="upload" />上传
              </a-button>
              <ul>
                <li
                  @click.stop="del('1',$event)"
                  class="file-list-item"
                  v-for="(item,index) of formData.tax_cert_path"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                  <svg-icon :data-key="index" class="del" icon-class="del" />
                </li>
              </ul>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="12"></a-col>
      </a-row>
      <h4>组织机构代码证</h4>
      <a-row style="margin-top:20px;">
        <a-col :span="12">
          <a-form-item label="组织机构代码" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.org_code}}</span>
            <a-input
              v-show="!edit_read"
              placeholder="请输入组织机构代码"
              v-decorator="[
          'org_code',
          { rules: [{ required: true, message: '请输入组织机构代码' }],initialValue:formData.org_code }
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="发证机构" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.org_name}}</span>
            <a-input
              placeholder="请输入发证机构"
              v-show="!edit_read"
              v-decorator="[
          'org_name',{rules: [{ required: true, message: '请输入发证机构' }],initialValue:formData.org_name}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="有效开始时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.org_effect_start_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'org_effect_start_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-if="!formData.org_effect_start_date && !edit_read"
              placeholder="请选择有效开始时间"
              v-decorator="[
                'org_effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效开始时间' }] }
              ]"
            />
            <a-date-picker
              v-if="formData.org_effect_start_date && !edit_read"
              placeholder="请选择有效开始时间"
              v-decorator="[
                'org_effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效开始时间' }],initialValue:$moment(formData.org_effect_start_date) }
              ]"
            />
          </a-form-item>
          <a-form-item label="有效结束时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.org_effect_end_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'org_effect_end_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              :disabled="end_date_ctrl.org_effect_end_date"
              v-if="!formData.org_effect_end_date && !edit_read"
              placeholder="请选择有效结束时间"
              v-decorator="[
                'org_effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效结束时间' }] }
              ]"
            />
            <a-date-picker
              :disabled="end_date_ctrl.org_effect_end_date"
              v-if="formData.org_effect_end_date && !edit_read"
              placeholder="请选择有效结束时间"
              v-decorator="[
                'org_effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效结束时间' }],initialValue:$moment(formData.org_effect_end_date) }
              ]"
            />
            <a-checkbox v-show="!edit_read" :checked="end_date_ctrl.org_effect_end_date" @change="end_date_change('org_effect_end_date')">长期有效</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="备注" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.org_remark}}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入备注"
              :rows="4"
              v-decorator="[
            'org_remark',
            { initialValue:formData.org_remark }
          ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="组织机构代码扫描件" v-bind="formItemLayout">
            <ul class="accessory" v-show="edit_read">
              <li v-for="item of formData.org_cert_path" :key='item.id'>{{item.file_name}}</li>
            </ul>
            <a-upload
              v-show="!edit_read"
              :showUploadList="false"
              :customRequest="customRequest_org_cert_path"
              :beforeUpload="beforeUpload"
              v-decorator="[
                'org_cert_path',
                { rules: [{ required: true, message: '请选择组织机构代码扫描件' }],initialValue:formData.org_cert_path }
              ]"
            >
              <a-button>
                <a-icon type="upload" />上传
              </a-button>
              <ul>
                <li
                  @click.stop="del('2',$event)"
                  class="file-list-item"
                  v-for="(item,index) of formData.org_cert_path"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                  <svg-icon :data-key="index" class="del" icon-class="del" />
                </li>
              </ul>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
      <h4>社会保险参保证明</h4>
      <a-row style="margin-top:20px;">
        <a-col :span="12">
          <a-form-item label="社会保险号码" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_code}}</span>
            <a-input
              v-show="!edit_read"
              placeholder="请输入社会保险号码"
              v-decorator="[
          'social_code',
          { rules: [{ required: true, message: '请输入社会保险号码' }],initialValue:formData.social_code }
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="发证机构" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_name}}</span>
            <a-input
              placeholder="请输入发证机构"
              v-show="!edit_read"
              v-decorator="[
          'social_name',{rules: [{ required: true, message: '请输入发证机构' }],initialValue:formData.social_name}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="在职人数" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_active_number}}</span>
            <a-input
              placeholder="请输入在职人数"
              v-show="!edit_read"
              v-decorator="[
          'social_active_number',{rules: [{ required: true, message: '请输入在职人数' }],initialValue:formData.social_active_number}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="有效开始时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_effect_start_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'social_effect_start_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-if="!formData.social_effect_start_date && !edit_read"
              placeholder="请选择有效开始时间"
              v-decorator="[
                'social_effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效开始时间' }] }
              ]"
            />
            <a-date-picker
              v-if="formData.social_effect_start_date && !edit_read"
              placeholder="请选择有效开始时间"
              v-decorator="[
                'social_effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效开始时间' }],initialValue:$moment(formData.social_effect_start_date) }
              ]"
            />
          </a-form-item>
          <a-form-item label="有效结束时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_effect_end_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'social_effect_end_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              :disabled="end_date_ctrl.social_effect_end_date"
              v-if="!formData.social_effect_start_date && !edit_read"
              placeholder="请选择有效结束时间"
              v-decorator="[
                'social_effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效结束时间' }] }
              ]"
            />
            <a-date-picker
              :disabled="end_date_ctrl.social_effect_end_date"
              v-if="formData.social_effect_start_date && !edit_read"
              placeholder="请选择有效结束时间"
              v-decorator="[
                'social_effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入有效结束时间' }],initialValue:$moment(formData.social_effect_end_date) }
              ]"
            />
            <a-checkbox v-show="!edit_read" :checked="end_date_ctrl.social_effect_end_date"  @change="end_date_change('social_effect_end_date')">长期有效</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row style="margin-top:20px;">
        <a-col :span="12">
          <a-form-item label="社保缴费人数" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_expends_number}}</span>
            <a-input
              v-show="!edit_read"
              placeholder="请输入社保缴费人数"
              v-decorator="[
          'social_expends_number',
          { rules: [{ required: true, message: '请输入社保缴费人数' }],initialValue:formData.social_expends_number }
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="养老保险缴费人数" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_endowment_number}}</span>
            <a-input
              placeholder="请输入养老保险缴费人数"
              v-show="!edit_read"
              v-decorator="[
          'social_endowment_number',{rules: [{ required: true, message: '请输入养老保险缴费人数' }],initialValue:formData.social_endowment_number}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row style="margin-top:20px;">
        <a-col :span="12">
          <a-form-item label="失业保险缴费人数" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_unemployment_number}}</span>
            <a-input
              v-show="!edit_read"
              placeholder="请输入失业保险缴费人数"
              v-decorator="[
          'social_unemployment_number',
          { rules: [{ required: true, message: '失业保险缴费人数' }],initialValue:formData.social_unemployment_number }
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="备注" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_remark}}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入备注"
              :rows="4"
              v-decorator="[
            'social_remark',
            { initialValue:formData.social_remark }
          ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="社会保险参保证明" :help="!edit_read?'请上传社会保险参保证明扫描件':''" v-bind="formItemLayout">
            <ul class="accessory" v-show="edit_read">
              <li v-for="item of formData.social_cert_path" :key='item.id'>{{item.file_name}}</li>
            </ul>
            <a-upload
              v-show="!edit_read"
              :showUploadList="false"
              :customRequest="customRequest_social_cert_path"
              :beforeUpload="beforeUpload"
              v-decorator="[
                'social_cert_path',
                { rules: [{ required: true, message: '请选择组织结构代码扫描件' }],initialValue:formData.social_cert_path }
              ]"
            >
              <a-button>
                <a-icon type="upload" />上传
              </a-button>
              <ul>
                <li
                  @click.stop="del('3',$event)"
                  class="file-list-item"
                  v-for="(item,index) of formData.social_cert_path"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                  <svg-icon :data-key="index" class="del" icon-class="del" />
                </li>
              </ul>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="12"></a-col>
      </a-row>
    </section>
    <section v-else>
      <h4>
        营业执照
        <span style="color:#3177fd;" class="pointer" @click="show_modal">查看示例</span>
      </h4>
      <a-row style="margin-top:20px;">
        <a-col :span="12">
          <a-form-item label="社会统一信用代码" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.code}}</span>
            <a-input
              v-show="!edit_read"
              placeholder="请输入社会统一信用代码"
              v-decorator="[
          'code',
          { rules: [{ required: true, message: '请输入社会统一信用代码' }],initialValue:formData.code }
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="登记机关" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.name}}</span>
            <a-input
              placeholder="请输入登记机关"
              v-show="!edit_read"
              v-decorator="[
          'name',{rules: [{ required: true, message: '请输入登记机关' }],initialValue:formData.name}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="成立日期：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.found_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'found_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-if="!formData.found_date && !edit_read"
              placeholder="请选择公司成立日期"
              v-decorator="[
                'found_date',
                { rules: [{ type: 'object',required: true, message: '请输入公司成立日期' }] }
              ]"
            />
            <a-date-picker
              v-if="formData.found_date && !edit_read"
              placeholder="请选择公司成立日期"
              v-decorator="[
                'found_date',
                { rules: [{ type: 'object',required: true, message: '请输入公司成立日期' }],initialValue:$moment(formData.found_date)}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="营业有效开始时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.effect_start_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'effect_start_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-if="!formData.effect_start_date && !edit_read"
              placeholder="请选择营业有效开始时间"
              v-decorator="[
                'effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入营业有效开始时间' }] }
              ]"
            />
            <a-date-picker
              v-if="formData.effect_start_date && !edit_read"
              placeholder="请选择营业有效开始时间"
              v-decorator="[
                'effect_start_date',
                { rules: [{ type: 'object',required: true, message: '请输入营业有效开始时间' }],initialValue:$moment(formData.effect_start_date) }
              ]"
            />
          </a-form-item>
          <a-form-item label="营业有效结束时间：" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.effect_end_date}}</span>
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              v-show="false"
              v-decorator="[
                'effect_end_date',
                { rules: [{ type: 'object',required: true }] }
              ]"
            />
            <!-- 此段代码为edit_read为true的情况下显示必须*号 -->
            <a-date-picker
              :disabled="end_date_ctrl.effect_end_date"
              v-if="!formData.effect_end_date && !edit_read"
              placeholder="请选择营业有效结束时间"
              v-decorator="[
                'effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入营业有效结束时间' }] }
              ]"
            />
            <a-date-picker
              :disabled="end_date_ctrl.effect_end_date"
              v-if="formData.effect_end_date && !edit_read"
              placeholder="请选择营业有效结束时间"
              v-decorator="[
                'effect_end_date',
                { rules: [{ type: 'object',required: true, message: '请输入营业有效结束时间' }],initialValue:$moment(formData.effect_end_date) }
              ]"
            />
            <a-checkbox v-show="!edit_read" :checked="end_date_ctrl.effect_end_date" @change="end_date_change('effect_end_date')">长期有效</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          <a-form-item label="注册资本" :label-col="{ span: 18 }" :wrapper-col="{ span: 6 }">
            <span
              v-show="edit_read"
              class="register_fund"
            >{{formData.register_fund}} {{formData.fund_unit_name}} {{formData.money_type_name}}</span>
            <a-input
              placeholder="请输入注册资本"
              v-show="!edit_read"
              v-decorator="[
          'register_fund',{rules: [{ required: true, message: '请输入注册资本' }],initialValue:formData.register_fund}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="1" :offset="1">
          <a-form-item>
            <a-select
              @change="fund_unit_change"
              v-show="!edit_read"
              style="width: 80px;margin-left:10px;"
              v-decorator="['fund_unit',{initialValue:formData.fund_unit}]"
            >
              <a-select-option value="1">万</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :offset="1" :span="3">
          <a-form-item>
            <a-select
              @change="money_type_change"
              v-show="!edit_read"
              style="width: 120px;margin-left:10px;"
              v-decorator="['money_type',{initialValue:formData.money_type}]"
            >
              <a-select-option
                v-for="item of money_type"
                :key="item.code"
                :value="item.code"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="经营范围" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.business_scope}}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入经营范围"
              :rows="4"
              v-decorator="[
            'business_scope',
            { rules: [{ required: true, message: '请输入经营范围' }],initialValue:formData.business_scope }
          ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="备注" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.remark}}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入备注"
              :rows="4"
              v-decorator="[
            'remark',
            { initialValue:formData.remark }
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12"></a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="营业执照" v-bind="formItemLayout">
            <ul class="accessory" v-show="edit_read">
              <li v-for="item of formData.cert_path" :key='item.id'>{{item.file_name}}</li>
            </ul>
            <a-upload
              v-show="!edit_read"
              :showUploadList="false"
              :customRequest="customRequest_cert_path"
              :beforeUpload="beforeUpload"
              v-decorator="[
                'cert_path',
                { rules: [{ required: true, message: '请选择营业执照' }],initialValue:formData.cert_path }
              ]"
            >
              <a-button>
                <a-icon type="upload" />上传
              </a-button>
              <ul>
                <li
                  @click.stop="del('0',$event)"
                  class="file-list-item"
                  v-for="(item,index) of formData.cert_path"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                  <svg-icon :data-key="index" class="del" icon-class="del" />
                </li>
              </ul>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="12"></a-col>
      </a-row>
      <h4>
        社会保险参保证明
        <span style="color:#3177fd;" class="pointer" @click="show_modal">查看示例</span>
      </h4>
      <a-row style="margin-top:20px;">
        <a-col :span="12">
          <a-form-item label="在职人数" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_active_number}}</span>
            <a-input
              v-show="!edit_read"
              placeholder="请输入在职人数"
              v-decorator="[
          'social_active_number',
          { rules: [{ required: true, message: '请输入在职人数' }],initialValue:formData.social_active_number }
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="社保缴费人数" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_expends_number}}</span>
            <a-input
              placeholder="请输入社保缴费人数"
              v-show="!edit_read"
              v-decorator="[
          'social_expends_number',{rules: [{ required: true, message: '请输入社保缴费人数' }],initialValue:formData.social_expends_number}
        ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="备注" v-bind="formItemLayout">
            <span v-show="edit_read">{{formData.social_remark}}</span>
            <a-textarea
              v-show="!edit_read"
              placeholder="请输入备注"
              :rows="4"
              v-decorator="[
                'social_remark',
                { initialValue:formData.social_remark }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="社会保险参保证明" :help="!edit_read?'请上传社会保险参保证明扫描件':''" v-bind="formItemLayout">
            <ul class="accessory" v-show="edit_read">
              <li v-for="item of formData.social_cert_path" :key='item.id'>{{item.file_name}}</li>
            </ul>
            <a-upload
              v-show="!edit_read"
              :showUploadList="false"
              :customRequest="customRequest_social_cert_path"
              :beforeUpload="beforeUpload"
              v-decorator="[
                'social_cert_path',
                { rules: [{ required: true, message: '请选择组织结构代码扫描件' }],initialValue:formData.social_cert_path }
              ]"
            >
              <a-button>
                <a-icon type="upload" />上传
              </a-button>
              <ul>
                <li
                  @click.stop="del('3',$event)"
                  class="file-list-item"
                  v-for="(item,index) of formData.social_cert_path"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span>{{item.file_name}}</span>
                  <svg-icon :data-key="index" class="del" icon-class="del" />
                </li>
              </ul>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
    </section>
  </a-form>
</template>

<script>
import { POST, money_type } from "@common/js/apis.js";
import { save_basic_nature,get_basic_nature_info } from "@admin/api/baseInfo";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 }
      },
      edit_read: true,
      end_date_ctrl: {
        effect_end_date: false,
        tax_effect_end_date: false, // 税务证书有效结束时间
        org_effect_end_date: false,
        social_effect_end_date: false
      },
      formData: {
        type: 1,
        code: "", // 社会统一信用代码
        name: "", // 登记机关
        found_date: null, // 公司成立日期
        effect_start_date: null, // 营业开始时间
        effect_end_date: null, // 营业结束日期
        is_long_effect: 0, // 是否长期有效
        register_fund: "", // 注册资本
        fund_unit: "1", // 资金单位
        fund_unit_name: "万", // 资金单位名称
        money_type: "CNY", // 资金种类
        money_type_name: "人民币", // 资金种类名称
        business_scope: "", // 经营范围
        extend_business_scope: "", // 兼营范围
        remark: "", // 备注
        cert_path: [], // 营业执照路径
        tax_code: "", // 税务登记号码
        tax_name: "", // 发证机构
        tax_effect_start_date: null, // 税务证书有效开始时间
        tax_effect_end_date: null, // 税务证书有效结束时间
        tax_is_long_effect: 0, // 税务证书是否长期有效
        tax_cert_path: [], // 税务附件路径
        tax_remark: "", // 税务备注
        org_code: "", // 机构组织代码
        org_name: "", // 机构发证机关名称
        org_effect_start_date: null, // 机构组织有效开始时间
        org_effect_end_date: null, // 机构组织有效结束时间
        org_is_long_effect: "", // 机构组织是否长期有效 0 否 1是
        org_cert_path: [], // 组织结构附件路径
        org_remark: "", // 组织结构备注
        social_code: "", // 社会保险号码
        social_name: "", // 社会保障发证机构
        social_active_number: "", // 社会保障在职人数
        social_effect_start_date: null, // 社会保障有效开始时间
        social_effect_end_date: null, // 社会保障有效结束时间
        social_is_long_effect: "", // 社会保障是否长期有效 0 否 1是
        social_expends_number: "", // 社会保障缴费人数
        social_endowment_number: "", // 社会保障养老保险缴费人数
        social_unemployment_number: "", // 社会保障失业保险缴费人数
        social_cert_path: [], // 社会保障 附件路径
        social_remark: "" // 社会保障备注
      },
      money_type: [],
      visible: false
    };
  },
  props:['father','grand'],
  created() {
    this.grand.selectedKeys = ['basic_info'];
    this.get_basic_nature_info_method();
    this.father.activeKey = 'nature_info';
    this.father.BreadcrumbTwo = '基本资质';
  },
  methods: {
    get_basic_nature_info_method(){
      get_basic_nature_info().then(res=>{
        this.formData = res.data;
        this.formData.found_date = res.data.found_date;
        this.formData.effect_start_date = res.data.effect_start_date;
        this.formData.effect_end_date = res.data.effect_end_date;
        this.formData.tax_effect_start_date = res.data.tax_effect_start_date;
        this.formData.tax_effect_end_date = res.data.tax_effect_end_date;
        this.formData.org_effect_start_date = res.data.org_effect_start_date;
        this.formData.org_effect_end_date = res.data.org_effect_end_date;
        this.formData.social_effect_start_date = res.data.social_effect_start_date;
        this.formData.social_effect_end_date = res.data.social_effect_end_date;
        this.formData.fund_unit = res.data.fund_unit?res.data.fund_unit:'1';
        this.formData.money_type = res.data.money_type?res.data.money_type:'CNY';
        this.formData.type = +res.data.type?+res.data.type:1;
        this.end_date_ctrl = {
          effect_end_date: this.formData.effect_end_date!=null && this.formData.effect_end_date.indexOf('9999')!=-1,
          tax_effect_end_date: this.formData.tax_effect_end_date!=null&&this.formData.tax_effect_end_date.indexOf('9999')!=-1,
          org_effect_end_date: this.formData.org_effect_end_date!=null&&this.formData.org_effect_end_date.indexOf('9999')!=-1,
          social_effect_end_date: this.formData.social_effect_end_date!=null&&this.formData.social_effect_end_date.indexOf('9999')!=-1
        },
        this.get_tree_datas();
      })
    },
    show_modal(e) {
      // 展示营业资料目标
    },
    end_date_change(key) {
      // 是否长期有效期
      this.form.setFieldsValue({ [key]: this.$moment("9999-12-31") });
      this.end_date_ctrl[key] = !this.end_date_ctrl[key];
    },
    fund_unit_change(e) {
      // 选择项改变
    },
    money_type_change(e) {
      // 选择项改变
      let index = this.money_type.indexOfObj("code", e);
      this.formData.money_type_name = this.money_type[index].name;
    },
    get_tree_datas() {
      money_type()
        .then(res => {
          this.money_type = res.data;
        }).catch();
    },
    change_edit_read() {
      this.edit_read = !this.edit_read;
      this.form.resetFields();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          var values;
          if (!this.formData.type) {
            values = {
              ...fieldsValue,
              found_date: fieldsValue["found_date"].format("YYYY-MM-DD"),
              effect_start_date: fieldsValue["effect_start_date"].format(
                "YYYY-MM-DD"
              ),
              effect_end_date: fieldsValue["effect_end_date"].format(
                "YYYY-MM-DD"
              ),
              is_long_effect:
                fieldsValue["effect_end_date"]
                  .format("YYYY-MM-DD")
                  .indexOf("9999") == -1
                  ? 0
                  : 1,
              tax_effect_start_date: fieldsValue[
                "tax_effect_start_date"
              ].format("YYYY-MM-DD"),
              tax_effect_end_date: fieldsValue["tax_effect_end_date"].format(
                "YYYY-MM-DD"
              ),
              tax_is_long_effect:
                fieldsValue["tax_effect_end_date"]
                  .format("YYYY-MM-DD")
                  .indexOf("9999") == -1
                  ? 0
                  : 1,
              org_effect_start_date: fieldsValue[
                "org_effect_start_date"
              ].format("YYYY-MM-DD"),
              org_effect_end_date: fieldsValue["org_effect_end_date"].format(
                "YYYY-MM-DD"
              ),
              org_is_long_effect:
                fieldsValue["org_effect_end_date"]
                  .format("YYYY-MM-DD")
                  .indexOf("9999") == -1
                  ? 0
                  : 1,
              social_effect_start_date: fieldsValue[
                "social_effect_start_date"
              ].format("YYYY-MM-DD"),
              social_effect_end_date: fieldsValue[
                "social_effect_end_date"
              ].format("YYYY-MM-DD"),
              social_is_long_effect:
                fieldsValue["social_effect_end_date"]
                  .format("YYYY-MM-DD")
                  .indexOf("9999") == -1
                  ? 0
                  : 1,
              cert_path: this.formData.cert_path,
              tax_cert_path: this.formData.tax_cert_path,
              org_cert_path: this.formData.org_cert_path,
              social_cert_path: this.formData.social_cert_path,
              type: this.formData.type
            };
          } else {
            values = {
              ...fieldsValue,
              found_date: fieldsValue["found_date"].format("YYYY-MM-DD"),
              effect_start_date: fieldsValue["effect_start_date"].format(
                "YYYY-MM-DD"
              ),
              effect_end_date: fieldsValue["effect_end_date"].format(
                "YYYY-MM-DD"
              ),
              is_long_effect:
                fieldsValue["effect_end_date"]
                  .format("YYYY-MM-DD")
                  .indexOf("9999") == -1
                  ? 0
                  : 1,
              cert_path: this.formData.cert_path,
              social_cert_path: this.formData.social_cert_path,
              type: this.formData.type
            };
          }
          save_basic_nature(values)
            .then(res => {
              this.father.main_base_list();
              this.$message.success('保存成功');
              this.change_edit_read();
              this.get_basic_nature_info_method();
              this.father.main_base_list();
              this.father.apply_info2();
            })
            .catch(error => {
              this.$message.warn(error);
            });
        }
      });
    },
    customRequest_cert_path(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData.cert_path = this.$common.isArray(this.formData.cert_path)?this.formData.cert_path:[];
          this.formData.cert_path.push(img_obj);
        }).catch();
    },
    customRequest_tax_cert_path(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData.tax_cert_path = this.$common.isArray(this.formData.tax_cert_path)?this.formData.tax_cert_path:[];
          this.formData.tax_cert_path.push(img_obj);
        }).catch();
    },
    customRequest_org_cert_path(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData.org_cert_path = this.$common.isArray(this.formData.org_cert_path)?this.formData.org_cert_path:[];
          this.formData.org_cert_path.push(img_obj);
        }).catch();
    },
    customRequest_social_cert_path(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData.social_cert_path = this.$common.isArray(this.formData.social_cert_path)?this.formData.social_cert_path:[];
          this.formData.social_cert_path.push(img_obj);
        }).catch();
    },
    del(key, e) {
      var data;
      switch (key) {
        case "0":
          data = this.formData.cert_path;
          break;
        case "1":
          data = this.formData.tax_cert_path;
          break;
        case "2":
          data = this.formData.org_cert_path;
          break;
        case "3":
          data = this.formData.social_cert_path;
          break;
      }
      let index = e.target.dataset.key;
      if (index !== undefined) {
        data.splice(index, 1);
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.$message.error("您只可以上传JPG或PNG格式的文件");
      }
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("图片大小必须小于 20MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/baseInfoManage/natureInfo";
</style>
<style lang="scss">
#natureInfo{
  .ant-checkbox {
    margin-left: 10px;
  }
}
</style>