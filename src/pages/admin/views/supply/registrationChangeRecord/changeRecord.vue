<template>
  <div id="changeRecord">
    <h5>
      <span>注册变更记录 / 变更详情</span>
    </h5>
    <section class="content">
      <h4 v-if="JSON.stringify(basic_data)!='{}'">供应商基本信息</h4>
      <a-row v-if="basic_data.name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          公司全称：
        </a-col>
        <a-col :span="7">
          {{basic_data.name.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.en_name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          英文名称：
        </a-col>
        <a-col :span="7">
          {{basic_data.en_name.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.simple_name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
            公司简称：
        </a-col>
        <a-col :span="7">
          {{basic_data.simple_name.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.used_name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          公司曾用名：
        </a-col>
        <a-col :span="7">
          {{basic_data.used_name.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.logo" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          公司logo：
        </a-col>
        <a-col :span="7">
          <img @click="show_pic" :data-imgurl='basic_data.logo.value' class="logo" :src="basic_data.logo.value" alt="logo">
        </a-col>
      </a-row>
      <a-row v-if="basic_data.area_detail" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          公司地址：
        </a-col>
        <a-col :span="7">
          {{basic_data.area_detail.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.address" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          公司地址详情：
        </a-col>
        <a-col :span="7">
          {{basic_data.address.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.register_area_detail" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          营业执照登记机关所在地：
        </a-col>
        <a-col :span="7">
          {{basic_data.register_area_detail.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.postcode" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          邮编：
        </a-col>
        <a-col :span="7">
          {{basic_data.postcode.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.website" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          网站：
        </a-col>
        <a-col :span="7">
          {{basic_data.website.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.found_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          公司成立日期：
        </a-col>
        <a-col :span="7">
          {{basic_data.found_date.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.out_contact" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          对外联系电话：
        </a-col>
        <a-col :span="7">
          {{basic_data.out_contact.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.email" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          企业电子邮箱：
        </a-col>
        <a-col :span="7">
          {{basic_data.email.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.fax" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          企业传真号码：
        </a-col>
        <a-col :span="7">
          {{basic_data.fax.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.bank" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          开户银行：
        </a-col>
        <a-col :span="7">
          {{basic_data.bank.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.bank_account" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          银行账号：
        </a-col>
        <a-col :span="7">
          {{basic_data.bank_account.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.contact_name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          联系人姓名：
        </a-col>
        <a-col :span="7">
          {{basic_data.contact_name.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.contact_phone" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          联系人电话：
        </a-col>
        <a-col :span="7">
          {{basic_data.contact_phone.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.biz_nature_name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          企业性质：
        </a-col>
        <a-col :span="7">
          {{basic_data.biz_nature_name.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.cat_names" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          供应类别：
        </a-col>
        <a-col :span="7">
          {{basic_data.cat_names.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.biz_scale_name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          企业规模：
        </a-col>
        <a-col :span="7">
          {{basic_data.biz_scale_name.value}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.is_listed" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          是否上市：
        </a-col>
        <a-col :span="7">
          {{basic_data.is_listed.value==1?'已上市':'未上市'}}
        </a-col>
      </a-row>
      <a-row v-if="basic_data.desc" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          公司介绍：
        </a-col>
        <a-col :span="7">
          {{basic_data.desc.value}}
        </a-col>
      </a-row>
      <h4 v-if="JSON.stringify(nature_data)!='{}'">基本资质</h4>
      <a-row v-if="nature_data.code" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          营业执照：
        </a-col>
        <a-col :span="7">
          {{nature_data.code.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          登记机关：
        </a-col>
        <a-col :span="7">
          {{nature_data.name.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.found_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          成立日期：
        </a-col>
        <a-col :span="7">
          {{nature_data.found_date.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.effect_start_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          营业有效开始时间：
        </a-col>
        <a-col :span="7">
          {{nature_data.effect_start_date.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.effect_end_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          营业有效结束时间：
        </a-col>
        <a-col :span="7">
          {{nature_data.effect_end_date.value}}
          {{nature_data.effect_end_date.value.indexOf('9999')!=-1?'长期有效':''}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.register_fund" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          注册资本：
        </a-col>
        <a-col :span="7">
          {{nature_data.register_fund.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.business_scope" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          经营范围：
        </a-col>
        <a-col :span="7">
          {{nature_data.business_scope.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.extend_business_scope" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          兼营范围：
        </a-col>
        <a-col :span="7">
          {{nature_data.extend_business_scope.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.remark" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          营业执照备注：
        </a-col>
        <a-col :span="7">
          {{nature_data.remark.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.cert_path" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          营业执照附件：
        </a-col>
        <a-col :span="7">
          <ul class="two">
            <li
              class="ml-10 mb-10"
              v-for="(item,index) of nature_data.cert_path.value"
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
        </a-col>
      </a-row>
      <a-row v-if="nature_data.tax_code" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          税务登记号码：
        </a-col>
        <a-col :span="7">
          {{nature_data.tax_code.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.tax_name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          发证机构：
        </a-col>
        <a-col :span="7">
          {{nature_data.tax_name.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.tax_effect_start_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          有效开始时间：
        </a-col>
        <a-col :span="7">
          {{nature_data.tax_effect_start_date.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.tax_effect_end_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          有效结束时间：
        </a-col>
        <a-col :span="7">
          {{nature_data.tax_effect_end_date.value}}
          {{nature_data.tax_effect_end_date.value.indexOf('9999')!=-1?'长期有效':''}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.tax_remark" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          社会保险登记备注：
        </a-col>
        <a-col :span="7">
          {{nature_data.tax_remark.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.tax_cert_path" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          税务登记扫描件：
        </a-col>
        <a-col :span="7">
          <ul class="two">
            <li
              class="ml-10 mb-10"
              v-for="(item,index) of nature_data.tax_cert_path.value"
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
        </a-col>
      </a-row>
      <a-row v-if="nature_data.org_code" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          组织机构代码：
        </a-col>
        <a-col :span="7">
          {{nature_data.org_code.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.org_code" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          发证机构：
        </a-col>
        <a-col :span="7">
          {{nature_data.org_code.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.org_effect_start_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          有效开始时间：
        </a-col>
        <a-col :span="7">
          {{nature_data.org_effect_start_date.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.org_effect_end_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          有效结束时间：
        </a-col>
        <a-col :span="7">
          {{nature_data.org_effect_end_date.value}}
          {{nature_data.org_effect_end_date.value.indexOf('9999')!=-1?'长期有效':''}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.org_remark" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          组织机构代码证备注：
        </a-col>
        <a-col :span="7">
          {{nature_data.org_remark.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.org_cert_path" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          组织机构代码扫描件：
        </a-col>
        <a-col :span="7">
          <ul class="two">
            <li
              class="ml-10 mb-10"
              v-for="(item,index) of nature_data.org_cert_path.value"
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
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_code" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          社会保险号码：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_code.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_name" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          发证机构：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_name.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_active_number" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          在职人数：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_active_number.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_effect_start_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          有效开始时间：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_effect_start_date.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_effect_end_date" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          有效结束时间：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_effect_end_date.value}}
          {{nature_data.social_effect_end_date.value.indexOf('9999')!=-1?'长期有效':''}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_expends_number" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          社保缴费人数：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_expends_number.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_endowment_number" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          养老保险缴费人数：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_endowment_number.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_unemployment_number" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          失业保险缴费人数：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_unemployment_number.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_remark" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          社会保险登记备注：
        </a-col>
        <a-col :span="7">
          {{nature_data.social_remark.value}}
        </a-col>
      </a-row>
      <a-row v-if="nature_data.social_cert_path" class="mt-10 mb-10">
        <a-col :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col class="text-right mr-10" :span="3">
          <img class="img_point" :src="point" alt="必填" />
          组织机构代码扫描件：
        </a-col>
        <a-col :span="7">
          <ul class="two">
            <li
              class="ml-10 mb-10"
              v-for="(item,index) of nature_data.social_cert_path.value"
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
        </a-col>
      </a-row>
      <h4 v-if="JSON.stringify(special_nature_data)!='[]'">特殊资质</h4>
      <a-row v-for='(item,index) of special_nature_data' :key='index' class="mt-10 mb-10">
        <a-col v-if="item.type==0" :span="1" :offset='1'>
          <span class="add base">
            增
          </span>
        </a-col>
        <a-col v-if="item.type==1" :span="1" :offset='1'>
          <span class="change base">
            改
          </span>
        </a-col>
        <a-col v-if="item.type==2" :span="1" :offset='1'>
          <span class="del base">
            删
          </span>
        </a-col>
        <a-col class="mr-10" :span="4">
          <a href="javascript:;" v-if="item.type!=2" @click="show_modal(item.id)">{{item.special_nature_type}}</a>
          <span v-else>{{item.special_nature_type}}</span>
        </a-col>
      </a-row>
    </section>
    <section class="content" v-if="log_info.flow_list">
      <h3>流转日志</h3>
      <a-row class="mt-10">
        <a-steps progressDot :current="stepsCurrent" direction="vertical">
          <a-step 
            v-for="item of log_info.flow_list" 
            :key='item.id' 
            :title="item.create_time" 
          >
            <template slot="description">
              <div class="step-item">
                <span class="one">
                  {{item.username||item.com_name}}
                  <span class="ml-10" :class="{red:item.status==1,success:item.status==4}">
                    {{item.status|status}}
                  </span>
                </span>
                <span class="mr-10 two">
                  {{item.remark}}
                </span>
              </div>
            </template>
          </a-step>
        </a-steps>
      </a-row>
    </section>
    <lg-pic :father='this' :imgUrl='imgUrl'></lg-pic>
    <a-modal
      class="modal"
      :destroyOnClose="true"
      style="top: 10%"
      width="50%"
      :visible="ModalVisible"
      :footer="null"
      @ok="() => setModalVisible(false)"
      @cancel="() => setModalVisible(false)"
      >
      <h3 slot="title" class="text-center">
        特定资质
      </h3>
      <a-row class="mb-10">
        <a-col class="text-right mr-10" :span="8">
          <img class="img_point" :src="point" alt="必填" />
          资质名称：
        </a-col>
        <a-col :span="14">
          {{formData.special_nature_type}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right mr-10" :span="8">
          <img class="img_point" :src="point" alt="必填" />
          证件编号：
        </a-col>
        <a-col :span="14">
          {{formData.certificate_number}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right mr-10" :span="8">
          <img class="img_point" :src="point" alt="必填" />
          发证机关名称：
        </a-col>
        <a-col :span="14">
          {{formData.org_name}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right mr-10" :span="8">
          <img class="img_point" :src="point" alt="必填" />
          资质有效开始时间：
        </a-col>
        <a-col :span="14">
          {{formData.effect_start_date}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right mr-10" :span="8">
          <img class="img_point" :src="point" alt="必填" />
          资质有效结束时间：
        </a-col>
        <a-col :span="14">
          {{formData.effect_end_date}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right mr-10" :span="8">
          备注：
        </a-col>
        <a-col :span="14">
          {{formData.remark}}
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right mr-10" :span="8">
          附件：
        </a-col>
        <a-col :span="14">
          <p 
            @click="show_pic" 
            :data-imgurl='item.full_path'
            v-for="(item,index) of formData.file_path"
            :key="index">
            {{item.file_name}}
          </p>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import lgPic  from '@components/lg-pic';
import { change_log_info } from '@admin/api/changeRecord';
import { get_special_nature_info } from "@admin/api/baseInfo";
export default {
  props:{
    father:{
      type:[Object,String],
      required:true
    }
  },
  components:{
    lgPic
  },
  data() {
    return {
      id:'',
      point: require("@static/images/icon_point.png"),
      log_info:{},
      stepsCurrent:1,
      imgUrl:'',
      basic_data:{},
      nature_data:{},
      special_nature_data:[],
      ModalVisible:false,
      formData:{},
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
    },
    status(value){
      switch (value) {
        case '1':
          return '提交审核';
          break;
        case '2':
          return '审核不通过';
          break;
        case '3':
          return '撤销审核';
          break;
        case '4':
          return '审核通过';
          break;
      }
    }
  },
  created() {
    this.code=this.$route.query.code;
    this.father.selectedKeys = ['registerChange'];
    this.get_change_log_info();
  },
  methods: {
    get_change_log_info(){
      change_log_info(this.code).then(res=>{
        this.log_info = res.data || {};
        this.stepsCurrent = this.log_info.flow_list?this.log_info.flow_list.length:0;
        this.basic_data = res.data.basic_data?this.formatObj(res.data.basic_data):{};
        this.nature_data = res.data.nature_data?this.formatObj(res.data.nature_data):{};
        this.special_nature_data = res.data.special_nature_data||[];
      }).catch();
    },
    show_pic(e){
      this.imgUrl = e.target.dataset.imgurl;
    },
    formatObj(obj){
      let result = {};
      for(let key in obj){
        Object.assign(result,obj[key])
      }
      return result;
    },
    show_modal(id){
      get_special_nature_info(id).then(res=>{
        this.formData = res.data;
        this.ModalVisible = true;
      })
    },
    setModalVisible(ModalVisible) {
      this.ModalVisible = ModalVisible;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '~@admin/assets/scss/common';
  @import '~@admin/assets/scss/registrationChangeRecord/changeRecord';
  #changeRecord{
    @include component;
    .base{
      display: inline-block;
      width: 22px;
      height: 22px;
      line-height: 22px;
      color: $white;
      @extend .radius;
      @extend .text-center;
    }
    .add{
      background-color: $green;
    }
    .change{
      background-color: $yellow;
    }
    .del{
      background-color: $red;
    }
    .img_point {
      width: 6px;
      height: 6px;
      position: relative;
      bottom: 2px;
    }
    .logo{
      height: 100px;
    }
  }
</style>
<style lang="scss" scoped>
  .ant-modal{
    .img_point {
      width: 6px;
      height: 6px;
      position: relative;
      bottom: 2px;
    }
  }
</style>