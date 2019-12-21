<template>
  <div id="tender">
    <p class="center first_title">后勤物资采购云平台供应商投标操作指南</p>
    <p class="line-height">电子交易流程</p>
    <img style="height:70%" class="img_center" src="../../assets/images/tender/1.png" alt="">
    <P class="first_title bold">(一) 获取采购文件 </P>
    <P class="line-height"> <span class="bold">说明</span>：采购组织机构发布采购公告后，已注册政采云平台的供应商可登陆平台，申请获取采购文件，待采购组织机构审核通过后，供应商可下载采购文件。</P>
    <p class="line-height">路径：招标管理—获取采购文件。</p>
    <p class="text-indent line-height red bold">注：为了避免页面存在兼容性问题，建议使用谷歌Chrome 浏览器。</p>
    <p class="line-height">1) 在“获取采购文件”标签页下，找到需要获取采购文件的项目，点击操作栏</p>
    <p class="line-height bold">【获取】；</p>
    <img class="img_width" src="../../assets/images/tender/img_2.png" alt="">
    <p class="line-height">2) 在弹框里填写获取采购文件信息，带“*”的为必填项，其中手机号码建议填写项目负责人的，用于接收发布更正公告等短信提醒，完成后点击 <span class="bold">【确定】</span>；</p>
    <img class="img_width" src="../../assets/images/tender/img_3.png" alt="">
    <p class="line-height">3) 弹框提示“提交成功”，获取采购文件申请完成；</p>
    <p class="line-height">4) 采购方审核通过后，状态为“待采购方发送”。</p>
    <img class="img_width" src="../../assets/images/tender/img_1.png" alt="">
    <p class="line-height">5)采购方发送采购文件后，状态为“已获取”。</p>
    <p class="line-height"> <span class="bold">完成状态：</span>供应商获取信息需要通过审核，项目显示状态为“待审核”（审核通过：供应商待采购方发送采购文件后可下载采购文件；审核不通过：供应商可再次发起获取采购文件申请）；</p>
    <p class="first_title bold">(二) 下载采购文件 </p>
    <p class="line-height"> <span class="bold">说明：</span>采购文件的获取状态是“已获取”的状态下，供应商可下载查看采购文件。路径：招标管理—获取采购文件。 </p>
    <p class="line-height">1) 在“获取采购文件”标签页，选择状态为“已获取”的采购文件，点击操作栏 <span class="bold">【下载采购文件】；</span> </p>
    <img class="img_width" src="../../assets/images/tender/img_5.png" alt="">
    <p class="line-height">2) 在弹框里点击 <span class="bold">【下载源文件】</span>，下载完成供应商可打开查看采购文件； </p>
    <p class="first_title bold">(三) 投标文件制作、上传 </p>
    <p class="line-height"> <span class="bold"> 说明：</span>供应商可通过CA登录平台进行投标文件制作。</p>
    <p class="line-height">（ <span class="red bold">注：</span> 供应商先要申领CA，拿到 CA 后在云平台进行投标操作。）</p>
    <p class="line-height red bold">请供应商在使用云平台时，使用 WIN7 及以上操作系统；</p>
    <p class="line-height">1、文件安装</p>
    <p class="line-height">点击链接 <a :href="global.host+'/upload/dl/key_soft.zip'">{{global.host}}/upload/dl/key_soft.zip</a> 获取安装包。</p>
    <p class="line-height">1）ZJCA 数字证书安装软件</p>
    <p class="line-height">选择简体中文语言，点击确认后，按照安装步骤进行安装即可。</p>
    <img class="img_center"  src="../../assets/images/tender/img_11.png" alt="">
    <p class="line-height">2）ESign_安装软件</p>
    <img class="img_center" style="width:50%" src="../../assets/images/tender/img_12.png" alt="">
    <p class="line-height">①点击“一键安装”后，若跳出如下提醒后，将谷歌、火狐等浏览器关闭后点击确定重试。</p>
    <img class="img_center" src="../../assets/images/tender/img_9.png" alt="">
    <p class="line-height">②安装完成后，点击“开始使用”后，跳出如下弹窗，选择UKEY种类，或识别当前UKey。选择完成后，即可使用。</p>
    <img class="img_center" style="width:50%" src="../../assets/images/tender/img_10.png" alt="">
    <p class="line-height">3）打开服务软件</p>
    <p class="line-height">运行bin文件夹中server.exe。</p>
    <p class="line-height bold">2. 投标文件制作</p>
    <p class="line-height">打开云平台登录页面，点击 <span class="bold">【登录】</span> 按钮，使用账号密码直接登录平台；（后期可以CA直接登录）</p>
    <p class="line-height"> <span class="bold">说明：</span> 供应商获取采购文件后，可进行投标文件制作。</p>
    <p class="line-height red">注：此时供应商需将CA插入电脑，保证投标文件的加密性。</p>
    <p class="line-height red">若未插入UKey或者安装文件未安装完全时，则会跳出如下提醒。</p>
    <img class="img_center" src="../../assets/images/tender/img_6.png" alt="">
    <img class="img_center" src="../../assets/images/tender/img_15.png" alt="">
    <p class="line-height">路径：招标管理—投标文件管理。</p>
    <p class="line-height">1)左侧菜单栏选择 <span class="bold">【投标文件管理】</span> ，选择需要制作投标文件的项目，点击 <span class="bold">【制作】</span>；</p>
    <img class="img_width" src="../../assets/images/tender/img_7.png" alt="">
    <p class="line-height">2) 在制作投标文件页面中进行报价信息、资格审查要求、资质评分要求、项目附件的填写；</p>
    <p class="line-height">①报价</p>
    <p class="line-height">在该页面进行商品报价，填写单价、响应产品参数及偏离信息。报价信息填写完成后，可以点击“下载报价文件”，会生成Excel形式报价单。</p>
    <img class="img_width" src="../../assets/images/tender/img_8.png" alt="">
    <p class="line-height">②资格审查要求</p>
    <p class="line-height">资格审查要求是采购文件中提出的要求，供应商按照对应项将需要上传的文件进行上传。填写完成后点击“保存”进行下一步。</p>
    <img class="img_width" src="../../assets/images/tender/img_13.png" alt="">
    <p class="line-height">③资质评分要求</p>
    <p class="line-height">资格审查要求是采购文件中提出的资质评分项，供应商按照对应项将需要上传的文件进行上传。填写完成后点击“保存”进行下一步。</p>
    <img class="img_width" src="../../assets/images/tender/img_14.png" alt="">
    <p class="line-height">④项目附件</p>
    <p class="text-indent line-height" >在该页面将供应商制作的投标文件分为商务技术文件和价格文件两部分进行上传。上传的文件一定为签章后的文件，未签章的文件视为无效文件，不能参与评标。点击“去签章”按钮，将文件进行签章操作。（注：PDF文件不超过 100M）</p>
    <img class="img_width" src="../../assets/images/tender/img_31.png" alt="">
    <p class="text-indent line-height">在签章页面中，将您的投标文件在本机的文件路径及文件名称填写到输入框中，点击“签章”按钮，进行文件的签章操作。</p>
    <img class="img_width" src="../../assets/images/tender/img_16.png" alt="">
    <p class="text-indent line-height">点击右上角“页面签章”可对指定页面指定位置进行签章，将右侧的单位公章拖动到需要盖章的位置，跳出需要签章的页面，可对“当前页”、“所有页”、“指定页”进行签章。页面选择完成后，点击“确定”完成签章。</p>
    <p class="text-indent line-height">点击“骑缝签章”可签骑缝章，将公章拖到位置后跳出需要签订骑缝章的页面，页面选择完成后，点击确定签订完成。签章完成后，点击“确认签章”按钮，则将原文件保存为签章后的文件。</p>
    <img src="../../assets/images/tender/img_33.png" alt="">
    <img src="../../assets/images/tender/img_34.png" alt="">
    <p>注：  1、请将投标文件转换为PDF格式。</p>
    <p class="text-indent">（将制作好的投标文件，选择 Word2007 及以上版本,点击左上角的"office"按钮，点击"另存为",在弹窗单击"保存类型"选择 PDF,输出 PDF 格式文件；）</p>
    <p class="text-indent">2、签章将直接签署在您的原文件上，建议您将投标文件进行备份。</p>
    <p class="text-indent">3、请将您的投标文件在本机的文件路径及文件名称填写到下框中，以便于将您的文件进行本地签章。</p>
    <p class="line-height">文件签章完成后，将文件分别上传即可。</p>
    <p class="line-height">⑤上述投标文件信息填写完成后，点击右上角“提交”按钮，进行提交操作。会进行如下提醒。若确认提价则点击“确定”。提交后不可以撤回，请谨慎提醒。</p>
    <img class="img_center" src="../../assets/images/tender/img_17.png" alt="">
    <p class="first_title bold">(四) 解密投标文件 </p>
    <p class="line-height"><span class="bold">说明：</span>达到开标时间后，供应商在云平台解密投标文件，专家和采购组织机构可查看投标文件，专家依据投标文件进行评审。（<span class="red bold">注：</span>解密投标文件必须插入 CA。） 路径：招标管理—开标管理。 </p>
    <p class="line-height">1) 在“开标管理”标签页下，选择待解密的项目，点击操作栏 <span class="bold">【解密】</span>按钮；</p>
    <p class="line-height">2) 进入投标文件解密页面（<span class="red bold">注：</span>供应商必须插入 CA 才可解锁），点击 <span class="bold">【解密】</span>按钮；若未插入UKey，则会提醒“请检查是否插入U盾”。</p>
    <img class="img_width" src="../../assets/images/tender/img_1_2.png" alt="">
    <p>&nbsp;</p>
    <img src="../../assets/images/tender/img_4.png" alt="">
    <p class="line-height">3) 在弹框里输入 PIN 码，点击 <span class="bold">【确认】</span>；</p>
    <img src="../../assets/images/tender/img_2_2.png" alt="">
    <p class="line-height">4) 投标文件显示“解密中”；</p>
    <img src="../../assets/images/tender/img_3_2.png" alt="">
    <p class="line-height">5) 解密完成，弹框提示“解密成功”；</p>
    <img src="../../assets/images/tender/img_55.png" alt="">
    <p class="line-height">6) 解密结束，进入专家评标；</p>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>


  </div>
</template>

<script>

export default {
  name: "tender",
};
</script>
<style scoped>
  @import url('../../assets/css/server.css');
</style>