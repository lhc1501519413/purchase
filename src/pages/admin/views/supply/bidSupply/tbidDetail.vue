<template>
  <div id="sbidDetail">
    <h5>投标文件管理 / 查看项目
      <a-button @click="$router.go(-1)">返回</a-button>
    </h5>
    <section class="bid_notice_detail mt-20 content">
      <div class="bigcontent">
        <h2 class="text-center mb-10">{{formData.title}}</h2>
        <div class="text-indent-35 mb-10">{{formData.com_name}}拟对{{formData.project_name}}进行{{formData.bid_type_name}}，现将相关事项公告如下：</div>
        <h3>一、项目编号：{{formData.custom_code}}</h3>
        <h3>二、项目名称：{{formData.project_name}}</h3>
        <h3>三、采购方式：{{formData.bid_type_name}}</h3>
        <h3>四、招标商品信息</h3>
        <div class="text-indent-35 mb-10">采购类别：{{formData.cat_name}}</div>
        <div class="text-indent-35 mb-10">预估采购金额：{{formData.expert_money}}万元</div>
        <div class="text-indent-35 mb-10">需求商家数：{{formData.min_supply}}家</div>
        <div class="text-indent-35 mb-10 area">
          <span>配送区域：</span>
          <ul class="inline-block">
            <li class="text-left" v-for="item of area_list" :key='item.id'>
              {{item.area_name}}：{{item.region_name}}
            </li>
          </ul>
        </div>
        <h3>五、供应商资格要求</h3>
        <div class="text-indent-35 mb-10">{{formData.qualifications}}</div>
        <h3>六、供应商获取采购文件要求</h3>
        <div class="text-indent-35 mb-10">采购文件获取时间：{{formData.start_time}} ~ {{formData.end_time}}</div>
        <div class="text-indent-35 mb-10">采购文件获取方式：后勤物资采购云平台网上注册后按获取流程下载采购文件</div>
        <div class="text-indent-35 mb-10">采购文件售价：人民币0元</div>
        <div class="text-indent-35 mb-10">获取流程：</div>
        <div class="text-indent-35 mb-10">
          （1）尚未注册后勤物资采购云平台（网址：
          <a
            class="ml-10 mr-10"
            :href="global.host"
            target="_blank"
          >{{global.host}}</a>
          ）正式供应商的应先进行注册申请，注册流程详见“后勤物资采购云平台—服务中心—入驻指南”，或网址：
          <a
            class="ml-10 mr-10"
            :href="global.host+'/#/check_in_guide'"
            target="_blank"
          >{{global.host}}/#/check_in_guide</a>。
        </div>
        <div class="text-indent-35 mb-10">
          （2）供应商注册成功后，登录平台选择对应项目的项目公告中点击【获取采购文件】或者点击“我的工作台”，进入“获取采购文件”菜单，点击对应项目中的”获取“按钮，填写获取采购文件的申请信息【联系人姓名、手机号、邮箱、地址为必填项】，填写完整后点击右下角“确定”按钮提交，待采购方审核通过后可下载采购文件。
        </div>
        <h3>七、开标评标时间和地址</h3>
        <div class="text-indent-35 mb-10">开标时间：{{formData.open_time}}</div>
        <div class="text-indent-35 mb-10">开标地址：{{formData.open_address}}</div>
        <div class="text-indent-35 mb-10">投标文件递交方式：</div>
        <div class="text-indent-35 mb-10">
          ①须在线提交电子投标文件、投标文件的备份电子文件（U盘）和纸质投标文件；
        </div>
        <div class="text-indent-35 mb-10">
          ②在线提交电子投标文件：投标截止时间前在后勤物资采购云平台（网址：<a
            class="ml-10 mr-10"
            :href="global.host"
            target="_blank"
          >{{global.host}}</a>）完成电子投标文件的加密传输提交；
        </div>
        <div class="text-indent-35 mb-10">
          ③投标文件的备份电子文件和纸质投标文件：投标截止时间前，提交投标文件的备份电子文件一份（U盘，勿加密）和纸质投标文件一份，提交地址为【{{formData.submit_address}}】
        </div>
        <div class="text-indent-35 mb-10">注：供应商需注册并审核通过，并且在规定时间内在线成功获取采购文件后，可在【投标文件管理】模块在线提交投标文件。</div>
        <h3>八、投标保证金</h3>
        <div
          v-if="formData.is_margin==1"
          class="text-indent-35 mb-10"
        >本次投标保证金为{{formData.margin}}元人民币（可以现金或转账支票形式），请用信封单独封好，信封封面写上投标项目名称并封口加盖投标人单位公章，并按投标文件提交的时间地点要求提交与招标人。投标人必须承诺现金和转账支票的真实有效性，否则责任自负。未中标当场退还，中标的则自动转为合同保证金，合同期满无息退还。</div>
        <div v-else class="text-indent-35 mb-10">无</div>
        <h3>九、特别说明</h3>
        <div class="text-indent-35 mb-10">
          1.本项目实行电子投标，应按照本项目招标文件和后勤物资采购云平台的要求编制；投标人在使用系统进行投标的过程中遇到涉及平台使用的任何问题，可致电后勤物资采购云平台技术支持热线咨询，联系方式：400-999-2350。
        </div>
        <div class="text-indent-35 mb-10">
          2.投标人应在开标前完成CA数字证书办理。完成CA数字证书办理预计一周左右时间，建议各投标人抓紧时间办理，CA锁办理可致电后勤物资采购云平台技术支持热线咨询，联系方式：400-999-2350。
        </div>
        <div class="text-indent-35 mb-10">
          3.电子投标具体流程文档详见“服务中心——投标指南”，或网址：<a
            class="ml-10 mr-10"
            :href="global.host+'/#/tender_guide'"
            target="_blank"
          >{{global.host}}/#/tender_guide</a>。
        </div>
        <h3>十、其他事项</h3>
        <div class="text-indent-35 mb-10">{{formData.desc}}</div>
        <h3>十一、联系方式</h3>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="15">采购单位：{{formData.com_name}}</a-col>
        </a-row>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="6">联系人：{{formData.contact_name}}</a-col>
          <a-col :span="6" :offset="3">联系方式：{{formData.contact_number}}</a-col>
        </a-row>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="20">地址：{{formData.address}}</a-col>
        </a-row>
        <div class="text-right pr-20">{{formData.com_name}}</div>
        <div class="text-right pr-20">{{formData.create_time}}</div>
        <h3>附件信息</h3>
        <ul class="ml-30">
          <li v-for="item of formData.file_list" :key='item.id'>
            <a :href="item.full_path" target="_blank">{{item.file_name}}</a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { get_notice_info_by_code } from '@admin/api/bidsSupply';
export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      formData: {},
      area_list:[]
    };
  },
  created() {
    this.father.selectedKeys = ["/Sbid/tender_list"];
    get_notice_info_by_code({ bid_code: this.$route.query.bid_code })
      .then(res => {
        this.formData = res.data||{};
        this.area_list = res.data.area_list||[];
        this.area_list.forEach(elem=>{
          elem.region_name = elem.region_list.reduce((priv,elem2)=>{
            return priv + elem2.name+'，';
          },'').slice(0,-1)
        })
      })
      .catch(error => this.$message.error(error));
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#sbidDetail{
  @include component;
  .bid_notice_detail {
    width: 100%;
    padding: 0 17.5%;
    & > h4 {
      margin: 8px 0;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      opacity: 1;
    }
    .bigcontent {
      background-color: $white;
      padding: 30px;
      h3 {
        margin-bottom: 10px;
      }
      .text-indent-35 {
        text-indent: 35px;
      }
      .area{
        @include flex(flex-start,flex-start);
        ul{
          text-indent: 0px;
        }
      }
    }
  }
}
</style>