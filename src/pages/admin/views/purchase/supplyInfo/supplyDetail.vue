<template>
  <div id="manageDetail">
    <h5>
      <span>供应商管理 / 供应商基本信息</span>
    </h5>
    <section class="content">
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          公司全称：
        </a-col>
        <a-col :span="10">
          {{baseInfo.supply_name}}
          <!-- <span v-if="baseInfo.supply_name" class="red">（{{baseInfo.supply_name}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">英文名称：</a-col>
        <a-col :span="10">
          {{baseInfo.en_name}}
          <!-- <span v-if="baseInfo.en_name" class="red">（{{baseInfo.en_name}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          公司简称：
        </a-col>
        <a-col :span="10">
          {{baseInfo.simple_name}}
          <!-- <span v-if="baseInfo.simple_name" class="red">（{{baseInfo.simple_name}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">公司曾用名：</a-col>
        <a-col :span="10">
          {{baseInfo.used_name}}
          <!-- <span v-if="baseInfo.used_name" class="red">（{{baseInfo.used_name}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          公司地址：
        </a-col>
        <a-col :span="10">
          {{baseInfo.area_detail}}
          <!-- <span v-if="baseInfo.area_detail" class="red">（{{baseInfo.area_detail}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          公司地址详情：
        </a-col>
        <a-col :span="10">
          {{baseInfo.address}}
          <!-- <span v-if="baseInfo.address" class="red">（{{baseInfo.address}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          营业执照登记机关所在地：
        </a-col>
        <a-col :span="10">
          {{baseInfo.register_area_detail}}
          <!-- <span v-if="baseInfo.register_area_detail" class="red">（{{baseInfo.register_area_detail}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          邮编：
        </a-col>
        <a-col :span="10">
          {{baseInfo.postcode}}
          <!-- <span v-if="baseInfo.postcode" class="red">（{{baseInfo.postcode}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          网站：
        </a-col>
        <a-col :span="10">
          {{baseInfo.website}}
          <!-- <span v-if="baseInfo.website" class="red">（{{baseInfo.website}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          公司成立日期：
        </a-col>
        <a-col :span="10">
          {{baseInfo.found_date}}
          <!-- <span v-if="baseInfo.found_date" class="red">（{{baseInfo.found_date}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          对外联系电话：
        </a-col>
        <a-col :span="10">
          {{baseInfo.out_contact}}
          <!-- <span v-if="baseInfo.out_contact" class="red">（{{baseInfo.out_contact}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          企业电子邮箱：
        </a-col>
        <a-col :span="10">
          {{baseInfo.email}}
          <!-- <span v-if="baseInfo.email" class="red">（{{baseInfo.email}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          企业传真号码：
        </a-col>
        <a-col :span="10">
          {{baseInfo.fax}}
          <!-- <span v-if="baseInfo.fax" class="red">（{{baseInfo.fax}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          开户银行：
        </a-col>
        <a-col :span="10">
          {{baseInfo.bank}}
          <!-- <span v-if="baseInfo.bank" class="red">（{{baseInfo.bank}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          银行账号：
        </a-col>
        <a-col :span="10">
          {{baseInfo.bank_account}}
          <!-- <span v-if="baseInfo.bank_account" class="red">（{{baseInfo.bank_account}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          联系人姓名：
        </a-col>
        <a-col :span="10">
          {{baseInfo.contact_name}}
          <!-- <span v-if="baseInfo.contact_name" class="red">（{{baseInfo.contact_name}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          联系人电话：
        </a-col>
        <a-col :span="10">
          {{baseInfo.contact_phone}}
          <!-- <span v-if="baseInfo.contact_phone" class="red">（{{baseInfo.contact_phone}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          企业性质：
        </a-col>
        <a-col :span="10">
          {{baseInfo.biz_nature_name}}
          <!-- <span v-if="baseInfo.biz_nature_name" class="red">（{{baseInfo.biz_nature_name}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          供应类别：
        </a-col>
        <a-col :span="10">
          {{baseInfo.cat_names}}
          <!-- <span v-if="baseInfo.cat_names" class="red">（{{baseInfo.cat_names}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          企业规模：
        </a-col>
        <a-col :span="10">
          {{baseInfo.biz_scale_name}}
          <!-- <span v-if="baseInfo.biz_scale_name" class="red">（{{baseInfo.biz_scale_name}}）</span> -->
        </a-col>
      </a-row>
      <!-- <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          供应商类型：
        </a-col>
        <a-col :span="10">
          {{baseInfo.supply_type_name}}
          <span v-if="baseInfo.supply_type_name" class="red">（{{baseInfo.supply_type_name}}）</span>
        </a-col>
      </a-row> -->
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          是否上市：
        </a-col>
        <a-col :span="10">
          {{baseInfo.is_listed=='1'?'是':'否'}}
          <!-- <span v-if="baseInfo.is_listed" class="red">（{{baseInfo.is_listed}}）</span> -->
        </a-col>
      </a-row>
      <!-- <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          上市说明：
        </a-col>
        <a-col :span="10">
          {{baseInfo.address}}
          <span v-if="baseInfo.address" class="red">（{{baseInfo.address}}）</span>
        </a-col>
      </a-row> -->
      <a-row class="mt-10">
        <a-col :span="4" class="text-right mr-10">
          <img class="img_point" :src="point" alt="必填" />
          公司介绍：
        </a-col>
        <a-col :span="10">
          {{baseInfo.desc}}
          <!-- <span v-if="baseInfo.desc" class="red">（{{baseInfo.desc}}）</span> -->
        </a-col>
      </a-row>
      <a-row class="mt-50 mb-10">
        <a-col :span="4">
          <img class="img_point" :src="point" alt="必填" />
          基本资质列表（必填）
        </a-col>
        <a-col :span="1" :offset='19'>
          <span class="arrow pointer" :class="{'arrow-up':!basic_nature_show}" @click="basic_nature_show = !basic_nature_show"></span>
        </a-col>
      </a-row>
      <a-table 
        v-show="basic_nature_show"
        :dataSource="basic_nature_list" 
        :columns="basic_nature_columns" 
        :pagination="pagination" 
        rowKey="id"
        >
        <template slot="titleRender" slot-scope="value,record,index">
          <a href="javascript:;" class="relative" @click="basic_nature_open(record.id,index)">
            {{value}}
            <span v-if="record.stale_date" class="stale-dated">即将过期</span>
            <span v-if="record.stale_dated" class="stale-dated">已过期</span>
          </a>
        </template>
        <template slot="file_path" slot-scope="text, record">
          <p 
            v-for="(item,index) of record.file_path" 
            :key="index"
            @click="show_pic" 
            :data-imgurl='item.full_path'
            >
            {{item.file_name}}
          </p>
        </template>
      </a-table>
      <a-modal
        :destroyOnClose="true"
        style="top: 10%"
        width="50%"
        :visible="basic_nature_model"
        :maskClosable="false"
        :footer="null"
        @ok="basic_nature_model = false"
        @cancel="basic_nature_model = false"
        >
        <template slot="title">
          <h3 align="center">{{basic_nature_model_info.title}}</h3>
        </template>
        <section v-if="basic_nature_model_info.id===1">
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              统一社会信用代码：
            </span>
            <span class="two">
              {{basic_nature_model_info.code}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              发证机构：
            </span>
            <span class="two">
              {{basic_nature_model_info.name}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              成立日期：
            </span>
            <span class="two">
              {{basic_nature_model_info.found_date}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              资质有效期限：
            </span>
            <span class="two">
              {{basic_nature_model_info.effect_start_date}} ~ {{basic_nature_model_info.effect_end_date.indexOf('9999')==-1?basic_nature_model_info.effect_end_date:'长期'}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              注册资本：
            </span>
            <span class="two">
              {{basic_nature_model_info.register_fund}}万{{basic_nature_model_info.money_type|money_type}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              经营范围：
            </span>
            <span class="two">
              {{basic_nature_model_info.business_scope}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              兼营范围：
            </span>
            <span class="two">
              {{basic_nature_model_info.extend_business_scope}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              备注：
            </span>
            <span class="two">
              {{basic_nature_model_info.remark}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              附件：
            </span>
            <ul class="two">
              <li
                class="ml-10 mb-10"
                v-for="(item,index) of basic_nature_model_info.cert_path"
                :key="index"
              >
                <svg-icon class="wenjian" icon-class="wenjian" />
                <span
                  @click="show_pic" 
                  :data-imgurl='item.full_path'
                  >
                  {{item.file_name}}
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section v-if="basic_nature_model_info.id===2">
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              税务登记号码：
            </span>
            <span class="two">
              {{basic_nature_model_info.tax_code}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              发证机构：
            </span>
            <span class="two">
              {{basic_nature_model_info.tax_name}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              资质有效期限：
            </span>
            <span class="two">
              {{basic_nature_model_info.tax_effect_start_date}} ~ {{basic_nature_model_info.tax_effect_end_date.indexOf('9999')==-1?basic_nature_model_info.tax_effect_end_date:'长期'}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              备注：
            </span>
            <span class="two">
              {{basic_nature_model_info.tax_remark}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              税务登记扫描件：
            </span>
            <ul class="two">
              <li
                class="ml-10 mb-10"
                v-for="(item,index) of basic_nature_model_info.tax_cert_path"
                :key="index"
              >
                <svg-icon class="wenjian" icon-class="wenjian" />
                <span
                  @click="show_pic" 
                  :data-imgurl='item.full_path'
                  >
                  {{item.file_name}}
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section v-if="basic_nature_model_info.id===3">
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              组织机构代码：
            </span>
            <span class="two">
              {{basic_nature_model_info.org_code}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              发证机构：
            </span>
            <span class="two">
              {{basic_nature_model_info.org_name}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              资质有效期限：
            </span>
            <span class="two">
              {{basic_nature_model_info.org_effect_start_date}} ~ {{basic_nature_model_info.org_effect_end_date.indexOf('9999')==-1?basic_nature_model_info.org_effect_end_date:'长期'}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              备注：
            </span>
            <span class="two">
              {{basic_nature_model_info.org_remark}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              组织机构代码扫描件：
            </span>
            <ul class="two">
              <li
                class="ml-10 mb-10"
                v-for="(item,index) of basic_nature_model_info.org_cert_path"
                :key="index"
              >
                <svg-icon class="wenjian" icon-class="wenjian" />
                <span
                  @click="show_pic" 
                  :data-imgurl='item.full_path'
                  >
                  {{item.file_name}}
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section v-if="basic_nature_model_info.id===4">
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              社会保险号码：
            </span>
            <span class="two">
              {{basic_nature_model_info.social_code}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              发证机构：
            </span>
            <span class="two">
              {{basic_nature_model_info.social_name}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              在职人数：
            </span>
            <span class="two">
              {{basic_nature_model_info.social_active_number}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              资质有效期限：
            </span>
            <span class="two">
              {{basic_nature_model_info.social_effect_start_date}} ~ {{basic_nature_model_info.social_effect_end_date.indexOf('9999')==-1?basic_nature_model_info.social_effect_end_date:'长期'}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              社保缴费人数：
            </span>
            <span class="two">
              {{basic_nature_model_info.social_expends_number}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              养老保险缴费人数：
            </span>
            <span class="two">
              {{basic_nature_model_info.social_endowment_number}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              失业保险缴费人数：
            </span>
            <span class="two">
              {{basic_nature_model_info.social_unemployment_number}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              备注：
            </span>
            <span class="two">
              {{basic_nature_model_info.social_remark}}
            </span>
          </div>
          <div class="model-item">
            <span class="one text-right">
              <img class="img_point" :src="point" alt="必填" />
              社会保险登记扫描件：
            </span>
            <ul class="two">
              <li
                class="ml-10 mb-10"
                v-for="(item,index) of basic_nature_model_info.social_cert_path"
                :key="index"
              >
                <svg-icon class="wenjian" icon-class="wenjian" />
                <span
                  @click="show_pic" 
                  :data-imgurl='item.full_path'
                  >
                  {{item.file_name}}
                </span>
              </li>
            </ul>
          </div>
        </section>
      </a-modal>
      <a-row class="mt-50 mb-10">
        <a-col :span="4">
          <img class="img_point" :src="point" alt="必填" />
          特定资质列表（必填）
        </a-col>
        <a-col :span="1" :offset='19'>
          <span class="arrow pointer" :class="{'arrow-up':!special_nature_show}" @click="special_nature_show = !special_nature_show"></span>
        </a-col>
      </a-row>
      <a-table 
        v-show="special_nature_show"
        :dataSource="special_nature_list" 
        :columns="special_nature_columns" 
        rowKey='id' 
        :pagination="pagination"
        >
        <template slot="special_nature_type" slot-scope="text,record,index">
          <a 
            href="javascript:;" 
            @click="special_nature_open(record.id,index)" 
            class="nature-type relative"
            >
            {{record.special_nature_type}}
            <span v-if="record.stale_date" class="stale-dated">即将过期</span>
            <span v-if="true||record.stale_dated" class="stale-dated">已过期</span>
          </a>
        </template>
        <template
          slot="timeLimit"
          slot-scope="text, record"
        >{{record.effect_start_date}}~{{record.effect_end_date.indexOf('9999')==-1?record.effect_end_date:'长期'}}</template>
        <template
          slot="is_effect"
          slot-scope="text, record"
        >{{record.is_effect|is_effect}}</template>
        <template slot="file_path" slot-scope="text, record">
          <p 
            v-for="(item,index) of record.file_path" 
            :key="index"
            @click="show_pic" 
            :data-imgurl='item.full_path'
            >
            {{item.file_name}}
          </p>
        </template>
      </a-table>
      <a-modal
        :destroyOnClose="true"
        style="top: 10%"
        width="50%"
        :visible="special_nature_model"
        :maskClosable="false"
        :footer="null"
        @ok="special_nature_model = false"
        @cancel="special_nature_model = false"
      >
        <template slot="title">
          <h3 align="center">特殊资质详情</h3>
        </template>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            资质名称：
          </span>
          <span class="two">
            {{special_nature_model_info.special_nature_type}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            证件编号：
          </span>
          <span class="two">
            {{special_nature_model_info.certificate_number}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            发证机关名称：
          </span>
          <span class="two">
            {{special_nature_model_info.org_name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            资质有效开始时间：
          </span>
          <span class="two">
            {{special_nature_model_info.effect_start_date}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            资质有效结束时间：
          </span>
          <span class="two">
            {{special_nature_model_info.effect_end_date}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            备注：
          </span>
          <span class="two">
            {{special_nature_model_info.remark}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            附件：
          </span>
          <ul class="two">
            <li
              class="ml-10 mb-10"
              v-for="(item,index) of special_nature_model_info.file_path"
              :key="index"
            >
              <svg-icon class="wenjian" icon-class="wenjian" />
              <span
                @click="show_pic" 
                :data-imgurl='item.full_path'
                >
                {{item.file_name}}
              </span>
            </li>
          </ul>
        </div>
      </a-modal>
      <a-row class="mt-50 mb-10">
        <a-col :span="4">
          信用信息列表
        </a-col>
        <a-col :span="1" :offset='19'>
          <span class="arrow pointer" :class="{'arrow-up':!credit_show}" @click="credit_show = !credit_show"></span>
        </a-col>
      </a-row>
      <a-table 
        v-show="credit_show"
        :dataSource="credit_list" 
        :columns="credit_columns" 
        rowKey='id' 
        :pagination="pagination"
        >
        <template slot="credit_name" slot-scope="value, record,index">
          <a href="javascript:;" @click="credit_open(record.id,index)">{{value}}</a>
        </template>
        <template
          slot="timeLimit"
          slot-scope="text, record"
        >{{record.effect_start_date}}~{{record.effect_end_date.indexOf('9999')==-1?record.effect_end_date:'长期'}}</template>
        <template
          slot="is_effect"
          slot-scope="text, record"
        >{{record.is_effect|is_effect}}</template>
        <template slot="file_path" slot-scope="text, record">
          <p 
            v-for="(item,index) of record.file_path" 
            :key="index"
            @click="show_pic" 
            :data-imgurl='item.full_path'
            >
            {{item.file_name}}
          </p>
        </template>
      </a-table>
      <a-modal
        :destroyOnClose="true"
        style="top: 10%"
        width="50%"
        :visible="credit_model"
        :maskClosable="false"
        :footer="null"
        @ok="credit_model = false"
        @cancel="credit_model = false"
      >
        <template slot="title">
          <h3 align="center">信用信息详情</h3>
        </template>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            信用名称：
          </span>
          <span class="two">
            {{credit_model_info.credit_name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            信用等级：
          </span>
          <span class="two">
            {{credit_model_info.credit_level_name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            证件编号：
          </span>
          <span class="two">
            {{credit_model_info.certificate_number}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            发证机关名称：
          </span>
          <span class="two">
            {{credit_model_info.org_name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            信用有效开始时间：
          </span>
          <span class="two">
            {{credit_model_info.effect_start_date}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            信用有效结束时间：
          </span>
          <span class="two">
            {{credit_model_info.effect_end_date}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            备注：
          </span>
          <span class="two">
            {{credit_model_info.remark}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            附件：
          </span>
          <ul class="two">
            <li
              class="ml-10 mb-10"
              v-for="(item,index) of credit_model_info.file_path"
              :key="index"
            >
              <svg-icon class="wenjian" icon-class="wenjian" />
              <span
                @click="show_pic" 
                :data-imgurl='item.full_path'
                >
                {{item.file_name}}
              </span>
            </li>
          </ul>
        </div>
      </a-modal>
      <a-row class="mt-50 mb-10">
        <a-col :span="4">
          <img class="img_point" :src="point" alt="必填" />
          出资情况（必填）
        </a-col>
        <a-col :span="1" :offset='19'>
          <span class="arrow pointer" :class="{'arrow-up':!investment_info}" @click="investment_info = !investment_info"></span>
        </a-col>
      </a-row>
      <ul v-show="investment_info">
        <li
          class="ml-20 mb-10"
          v-for="(item,index) of investment_base_info.file_path"
          :key="index"
        >
          <svg-icon class="wenjian" icon-class="wenjian" />
          <span 
            @click="show_pic" 
            :data-imgurl='item.full_path'
            >
            {{item.file_name}}
          </span>
        </li>
      </ul>
      <a-row class="mt-50 mb-10">
        <a-col :span="4">
          <img class="img_point" :src="point" alt="必填" />
          应缴总额（必填）
        </a-col>
        <a-col :span="1" :offset='19'>
          <span class="arrow pointer" :class="{'arrow-up':!investment_total}" @click="investment_total = !investment_total"></span>
        </a-col>
      </a-row>
      <div v-show="investment_total" class="ml-20">
        <span class="ml-10 mr-10">{{investment_base_info.total_fund}}</span>万人民币
      </div>
      <a-row class="mt-50 mb-10">
        <a-col :span="4">
          <img class="img_point" :src="point" alt="必填" />
          实缴总额（必填）
        </a-col>
        <a-col :span="1" :offset='19'>
          <span class="arrow pointer" :class="{'arrow-up':!investment_actual_total}" @click="investment_actual_total = !investment_actual_total"></span>
        </a-col>
      </a-row>
      <div v-show="investment_actual_total" class="ml-20">
        <span class="ml-10 mr-10">{{investment_base_info.actual_total_fund}}</span>万人民币
      </div>
      <a-row class="mt-50 mb-10">
        <a-col :span="4">
          <img class="img_point" :src="point" alt="必填" />
          出资信息列表（必填）
        </a-col>
        <a-col :span="1" :offset='19'>
          <span class="arrow pointer" :class="{'arrow-up':!investment_show}" @click="investment_show = !investment_show"></span>
        </a-col>
      </a-row>
      <a-table 
        v-show="investment_show"
        :dataSource="investment_list" 
        :columns="investment_columns" 
        rowKey='id' 
        :pagination="pagination"
        >
        <template slot="name" slot-scope="value, record,index">
          <a href="javascript:;" @click="investment_open(record.id,index)">{{value}}</a>
        </template>
      </a-table>
      <a-modal
        :destroyOnClose="true"
        style="top: 10%"
        width="50%"
        :visible="investment_model"
        :maskClosable="false"
        :footer="null"
        @ok="investment_model = false"
        @cancel="investment_model = false"
      >
        <template slot="title">
          <h3 align="center">出资信息详情</h3>
        </template>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            出资人类型：
          </span>
          <span class="two">
            {{investment_model_info.investor_type_name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            出资人全称：
          </span>
          <span class="two">
            {{investment_model_info.name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            出资额：
          </span>
          <span class="two">
            {{investment_model_info.fund}}万{{investment_model_info.money_type|money_type}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            出资比例：
          </span>
          <span class="two">
            {{investment_model_info.fund_rat}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            出资时间：
          </span>
          <span class="two">
            {{investment_model_info.investment_date}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            备注：
          </span>
          <span class="two">
            {{investment_model_info.remark}}
          </span>
        </div>
      </a-modal>
      <a-row class="mt-50 mb-10">
        <a-col :span="4">
          <img class="img_point" :src="point" alt="必填" />
          人员信息列表（必填）
        </a-col>
        <a-col :span="1" :offset='19'>
          <span class="arrow pointer" :class="{'arrow-up':!investment_show}" @click="people_show = !people_show"></span>
        </a-col>
      </a-row>
      <a-table 
        v-show="people_show" 
        :dataSource="people_list" 
        :columns="people_columns" 
        :pagination="pagination"
        rowKey='id' 
        >
        <template slot="name" slot-scope="value,record,index">
          <a href="javascript:;" @click="people_open(record.id,index)">{{value}}</a>
        </template>
      </a-table>
      <a-modal
        :destroyOnClose="true"
        style="top: 10%"
        width="50%"
        :visible="people_model"
        :maskClosable="false"
        :footer="null"
        @ok="people_model = false"
        @cancel="people_model = false"
      >
        <template slot="title">
          <h3 align="center">人员信息详情</h3>
        </template>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            姓名：
          </span>
          <span class="two">
            {{people_model_info.name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            类型：
          </span>
          <span class="two">
            {{people_model_info.type_name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            部门：
          </span>
          <span class="two">
            {{people_model_info.dep_name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            职务：
          </span>
          <span class="two">
            {{people_model_info.duty}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            证件类型：
          </span>
          <span class="two">
            {{people_model_info.cert_type_name}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            证件号：
          </span>
          <span class="two">
            {{people_model_info.cert_code}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
          <img class="img_point" :src="point" alt="必填" />
            手机：
          </span>
          <span class="two">
            {{people_model_info.mobile}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
          <img class="img_point" :src="point" alt="必填" />
            电话：
          </span>
          <span class="two">
            {{people_model_info.phone}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            邮箱：
          </span>
          <span class="two">
            {{people_model_info.email}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            地址：
          </span>
          <span class="two">
            {{people_model_info.address}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            邮政编码：
          </span>
          <span class="two">
            {{people_model_info.postcode}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            负责区域行业：
          </span>
          <span class="two">
            {{people_model_info.regional_industry}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            备注：
          </span>
          <span class="two">
            {{people_model_info.remark}}
          </span>
        </div>
        <div class="model-item">
          <span class="one text-right">
            <img class="img_point" :src="point" alt="必填" />
            附件：
          </span>
          <ul class="two">
            <li
              class="ml-10 mb-10"
              v-for="(item,index) of people_model_info.file_path"
              :key="index"
            >
              <svg-icon class="wenjian" icon-class="wenjian" />
              <span
                @click="show_pic" 
                :data-imgurl='item.full_path'
                >
                {{item.file_name}}
              </span>
            </li>
          </ul>
        </div>
      </a-modal>
    </section>
    <lg-pic :father='this' :imgUrl='imgUrl'></lg-pic>
  </div>
</template>

<script>
import {
  get_base_info,
  get_basic_nature_info,
  get_special_nature_list,
  get_investment_base_info,
  get_investment_list,
  get_credit_list,
  get_people_list,
 } from "@admin/api/supplyManage";
import lgPic  from '@components/lg-pic'
export default {
  components:{
    lgPic
  },
  props: {
    father: {
      type: Object,
      required:true
    }
  },
  data() {
    return {
      supply_id: "",
      point: require("@static/images/icon_point.png"),
      baseInfo: {},
      pagination:{
        showQuickJumper:true,
        showSizeChanger:true,
        pageSizeOptions:['10','20','30'],
        showTotal:(total)=>{
          return `共${total}条数据`
        }
      },
      basic_nature_info:{},
      basic_nature_show:true,
      basic_nature_model:false,
      basic_nature_model_info:{},
      basic_nature_list:[],
      basic_nature_columns:[
        {
          title: "资质名称",
          dataIndex: "title",
          scopedSlots: { customRender: "titleRender" },
          width: "80%"
        },
        {
          title: "附件",
          dataIndex: "file",
          scopedSlots: { customRender: "file_path" },
          width: "10%"
        }
      ],
      special_nature_show:true,
      special_nature_model:false,
      special_nature_model_info:{},
      special_nature_list:[],
      special_nature_columns:[
        {
          title: "资质名称",
          dataIndex: "special_nature_type",
          width: "15%",
          scopedSlots: { customRender: "special_nature_type" }
        },
        {
          title: "编号",
          dataIndex: "certificate_number",
          width: "8%"
        },
        {
          title: "发证机构名称",
          dataIndex: "org_name",
          width: "10%"
        },
        {
          title: "资质有效期限",
          dataIndex: "effect_start_date",
          scopedSlots: { customRender: "timeLimit" },
          width: "10%"
        },
        {
          title: "是否有效",
          dataIndex: "is_effect",
          scopedSlots: { customRender: "is_effect" },
          width: "10%"
        },
        {
          title: "附件",
          dataIndex: "file_path",
          scopedSlots: { customRender: "file_path" },
          width: "18%"
        }
      ],
      credit_show:true,
      credit_model:false,
      credit_model_info:{},
      credit_list:[],
      credit_columns:[
        {
          title: "信用名称",
          dataIndex: "credit_name",
          width: "15%",
          scopedSlots: { customRender: "credit_name" }
        },
        {
          title: "编号",
          dataIndex: "certificate_number",
          width: "9%"
        },
        {
          title: "信用等级",
          dataIndex: "credit_level_name",
          width: "8%"
        },
        {
          title: "发证机构名称",
          dataIndex: "org_name",
          width: "12%"
        },
        {
          title: "资质有效期限",
          dataIndex: "effect_start_date",
          scopedSlots: { customRender: "timeLimit" },
          width: "17%"
        },
        {
          title: "是否有效",
          dataIndex: "is_effect",
          scopedSlots: { customRender: "is_effect" },
          width: "10%"
        },
        {
          title: "附件",
          dataIndex: "file_path",
          scopedSlots: { customRender: "file_path" },
          width: "18%"
        }
      ],
      investment_total:true,
      investment_actual_total:true,
      investment_info:true,
      investment_pic:false,
      investment_img_url:'',
      investment_show:true,
      investment_model:false,
      investment_model_info:{},
      investment_base_info:{},
      investment_list:[],
      investment_columns:[
        {
          title: "出资人",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "出资人类型",
          dataIndex: "investor_type_name",
        },
        {
          title: "出资额(万)",
          dataIndex: "fund",
        },
        {
          title: "货币类型",
          dataIndex: "money_type_name",
        },
        {
          title: "出资比例(%)",
          dataIndex: "fund_rat",
        },
        {
          title: "出资时间",
          dataIndex: "investment_date",
          scopedSlots: { customRender: "investment_date" },
        }
      ],
      people_show:true,
      people_model:false,
      people_model_info:{},
      people_list:[],
      people_columns:[
        {
          title: "姓名",
          dataIndex: "name",
          width: "10%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "类型",
          dataIndex: "type_name",
          width: "13%"
        },
        {
          title: "部门",
          dataIndex: "dep_name",
          width: "13%"
        },
        {
          title: "职务",
          dataIndex: "duty",
          width: "13%"
        },
        {
          title: "手机",
          dataIndex: "mobile",
          width: "13%"
        },
        {
          title: "电话",
          dataIndex: "phone",
          width: "13%"
        },
        {
          title: "邮箱",
          dataIndex: "email",
          width: "13%"
        }
      ],
      remark:'',
      imgUrl:''
    };
  },
  filters:{
    is_effect(value) {
      switch (value) {
        case '0':
          return "否";
          break;
        case 0:
          return "否";
          break;
        default:
          return "是";
          break;
      }
    },
    money_type(value){
      switch (value) {
        case 'CNY':
          return "人民币";
          break;
        case 'USD':
          return '美元';
          break;
        case 'EUR':
          return '欧元';
          break;
        case 'GBP':
          return '英镑';
          break;
        case 'CHF':
          return '瑞士法郎';
          break;
        case 'FRF':
          return '法国法郎';
          break;
        case 'HKD':
          return '港币';
          break;
        case 'JPY':
          return '日元';
          break;
        case 'TWD':
          return '新台币';
          break;
      }
    }
  },
  created() {
    this.supply_id = this.$route.query.supply_id;
    this.father.selectedKeys = ["/Apply/get_supply_list"];
    this.get_main_info();
  },
  methods: {
    /* 获取主要信息 */
    get_main_info(){
      var supply_id,page_size;
      supply_id = this.supply_id;
      page_size = 100;
      get_base_info(supply_id).then(res=>{
        let base_info,extend_info;
        base_info = res.data.base_info;
        extend_info = res.data.extend_info;
        this.baseInfo = Object.assign(base_info,extend_info);
      }).catch();
      get_basic_nature_info(supply_id,page_size).then(res=>{
        let result,obj1,obj2,obj3,obj4;
        result = res.data||{};
        obj1 = {};
        obj1.id = 1;
        obj1.title = '营业执照';
        obj1.code = result.code;
        obj1.name = result.name;
        obj1.found_date = result.found_date;
        obj1.effect_start_date = result.effect_start_date;
        obj1.effect_end_date = result.effect_end_date;
        obj1.stale_date = result.effect_end_date&&new Date(result.effect_end_date).getTime()>new Date().getTime()&&new Date(result.effect_end_date).getTime()-new Date().getTime()<=60*24*3600*1000;
        obj1.stale_dated = result.effect_end_date&&new Date(result.effect_end_date).getTime()<new Date().getTime();
        obj1.register_fund = result.register_fund;
        obj1.money_type = result.money_type;
        obj1.business_scope = result.business_scope;
        obj1.extend_business_scope = result.extend_business_scope;
        obj1.remark = result.remark;
        obj1.file_path = result.cert_path;
        obj1.cert_path = result.cert_path;
        obj4 = {};
        obj4.id = 4;
        obj4.title = '社会保险登记证';
        obj4.file_path = result.social_cert_path;
        obj4.social_code=result.social_code;
        obj4.social_name= result.social_name;
        obj4.social_effect_start_date= result.social_effect_start_date;
        obj4.social_effect_end_date= result.social_effect_end_date;
        obj4.stale_date = result.social_effect_end_date&&new Date(result.social_effect_end_date).getTime()>new Date().getTime()&&new Date(result.social_effect_end_date).getTime()-new Date().getTime()<=60*24*3600*1000;
        obj4.stale_dated = result.social_effect_end_date&&new Date(result.social_effect_end_date).getTime()<new Date().getTime();
        obj4.social_is_effect= result.social_is_effect;
        obj4.social_active_number= result.social_active_number;
        obj4.social_expends_number= result.social_expends_number;
        obj4.social_endowment_number= result.social_endowment_number;
        obj4.social_unemployment_number= result.social_unemployment_number;
        obj4.social_cert_path= result.social_cert_path;
        obj4.social_remark= result.social_remark;
        if(result.type==0){
          obj2 = {};
          obj2.id = 2;
          obj2.title = '税务登记证';
          obj2.file_path = result.tax_cert_path;
          obj2.tax_code=result.tax_code;
          obj2.tax_name=result.tax_name;
          obj2.tax_effect_end_date=result.tax_effect_end_date;
          obj2.tax_effect_start_date=result.tax_effect_start_date;
          obj2.stale_date = result.tax_effect_end_date&&new Date(result.tax_effect_end_date).getTime()>new Date().getTime()&&new Date(result.tax_effect_end_date).getTime()-new Date().getTime()<=60*24*3600*1000;
          obj2.stale_dated = result.tax_effect_end_date&&new Date(result.tax_effect_end_date).getTime()<new Date().getTime();
          obj2.tax_is_effect=result.tax_is_effect;
          obj2.tax_cert_path=result.tax_cert_path;
          obj2.tax_remark=result.tax_remark;
          obj3 = {};
          obj3.id = 3;
          obj3.title = '组织机构代码证';
          obj3.file_path = result.org_cert_path;
          obj3.org_code = result.org_code;
          obj3.org_name = result.org_name;
          obj3.org_effect_end_date = result.org_effect_end_date;
          obj3.org_effect_start_date = result.org_effect_start_date;
          obj3.stale_date = result.org_effect_end_date&&new Date(result.org_effect_end_date).getTime()>new Date().getTime()&&new Date(result.org_effect_end_date).getTime()-new Date().getTime()<=60*24*3600*1000;
          obj3.stale_dated = result.org_effect_end_date&&new Date(result.org_effect_end_date).getTime()<new Date().getTime();
          obj3.org_is_effect = result.org_is_effect;
          obj3.org_cert_path = result.org_cert_path;
          obj3.org_remark = result.org_remark;
          this.basic_nature_list = [obj1,obj2,obj3,obj4];
        }else{
          this.basic_nature_list = [obj1,obj4];
        }
        this.basic_nature_info = result;
      }).catch();
      get_special_nature_list(supply_id,page_size).then(res=>{
        var special_nature_list = res.data.list || [];
        special_nature_list.forEach(elem=>{
          elem.stale_date = new Date(elem.effect_end_date).getTime()>new Date().getTime()&&new Date(elem.effect_end_date).getTime()-new Date().getTime()<=60*24*3600*1000;
          elem.stale_dated = new Date(elem.effect_end_date).getTime()<new Date().getTime()
        })
        this.special_nature_list = special_nature_list;
      }).catch();
      get_credit_list(supply_id,page_size).then(res=>{
        this.credit_list = res.data.list || [];
      }).catch();
      get_investment_base_info(supply_id,page_size).then(res=>{
        this.investment_base_info.file_path = res.data.file_list||[]; // 附件路径
        this.investment_base_info.total_fund = res.data.total_fund; // 应缴总额
        this.investment_base_info.actual_total_fund = res.data.actual_total_fund; // 实缴总额
      })
      get_investment_list(supply_id,page_size).then(res=>{
        this.investment_list = res.data.list || [];
      }).catch();
      get_people_list(supply_id,page_size).then(res=>{
        this.people_list = res.data.list || [];
      }).catch();
    },
    basic_nature_open(id,index){
      this.basic_nature_model = true;
      this.basic_nature_model_info = this.basic_nature_list[index];
    },
    special_nature_open(id,index){
      this.special_nature_model = true;
      this.special_nature_model_info = this.special_nature_list[index];
    },
    credit_open(id,index){
      this.credit_model = true;
      this.credit_model_info = this.credit_list[index];
    },
    investment_open(id,index){
      this.investment_model = true;
      this.investment_model_info = this.investment_list[index];
    },
    people_open(id,index){
      this.people_model = true;
      this.people_model_info = this.people_list[index];
    },
    show_pic(e){
      this.imgUrl = e.target.dataset.imgurl;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
@import "~@admin/assets/scss/supplyManage/manageDetail";
#manageDetail {
  @include component;
  @include manageDetail;
  .stale-dated {
    background: #f00;
    color: white;
    position: absolute;
    top: -16px;
    right: -74px;
    font-size: 12px;
    padding: 0 5px;
    border-radius: 4px;
  }
}
</style>
<style lang="scss">
.ant-modal {
  .img_point {
    width: 6px;
    height: 6px;
    position: relative;
    bottom: 2px;
  }
  .model-item{
    @include flex(space-around,flex-start);
    @extend .pl-40;
    @extend .pr-10;
    @extend .pb-20;
    .one{
      width: 30%;
    }
    .two{
      width: 70%;
    }
  }
}
</style>