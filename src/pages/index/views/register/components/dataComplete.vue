<template>
  <div id="complete">
    <header>
      <svg-icon icon-class="warn" />
      <span>请编辑资料后，返回该页面提交入驻申请</span>
    </header>
    <h4>补充资料</h4>
    <a-button class="margin-left" @click="main_base_list">刷新信息完整度</a-button>
    <section>
      <a-table :dataSource="main_list" :columns="columns" :pagination="false" rowKey="id">
        <template slot="number" slot-scope="text,record,index">
          <span>{{index+1}}</span>
        </template>
        <template slot="status" slot-scope="text, record">
          <span :class="record.status?'dot':'dot-gray'"></span>
          <span>{{record.status|status}}</span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <button @click="handleEdit(record.path)">编辑</button>
        </template>
      </a-table>
    </section>
    <section @click="showDialog" class="rules">
      <a-checkbox @change="checkboxChange">本人已阅读并同意</a-checkbox>
      <span data-key="1">《采购供应商注册须知》</span>
      <span data-key="2">《法律声明》</span>
      <span data-key="3">《隐私协议》</span>
    </section>
    <footer>
      <a-button @click="prev">上一步</a-button>
      <a-button type="primary" @click="submit" :disabled="!submitKey" class="margin-left">提交入驻申请</a-button>
    </footer>
    <a-modal
      class="model"
      :footer="false"
      :title="null"
      :closable="false"
      width="65%"
      v-model="modalVisible"
      @ok="modalVisible = false"
    >
      <h2 class="text-center">{{modalTitle}}</h2>
      <div v-show="modalTitle=='采购供应商注册须知'">
        <p>注册采购供应商应具备以下条件：</p>
        <p class="text-indent-10">1.具有独立承担民事责任的能力；</p>
        <p class="text-indent-10">2.具有良好的商业信誉和健全的财务会计制度；</p>
        <p class="text-indent-10">3.具有履行合同所必需的设备和专业技术能力；</p>
        <p class="text-indent-10">4.有依法缴纳税收和社会保障资金的良好记录；</p>
        <p class="text-indent-10">5.在经营活动中没有重大违法记录；</p>
        <p class="text-indent-10">6.法律、法规规定的其它条件。</p>
        <p>申请采购供应商应填报或扫描录入以下资料：</p>
        <p class="text-indent-10">1.营业执照（或事业单位等其他法人证书）；</p>
        <p class="text-indent-10">2.组织机构代码证（副本）；</p>
        <p class="text-indent-10">3.税务登记证（副本）；</p>
        <p class="text-indent-10">4.社会保险登记证（或相关证明）；</p>
        <p class="text-indent-10">5.法定代表人身份证；</p>
        <p class="text-indent-10">6.最近年度的资产负债表、损益表，验资（出资）报告（如有）；</p>
        <p class="text-indent-10">7.特许生产、经营或安全卫生许可，特定技术或业务资质，IS0质量和环保管理认证，品牌授权代理等有助于证明其经营和管理能力的证书；</p>
        <p class="text-indent-10">8.审查机构认为需要提交或供应商认为可以提供的其他资料（如公司章程、信用报告等）。</p>
        <p
          class="color-red"
        >备注：a、若供应商的营业执照、组织机构代码证、税务登记证、社会保险登记证、统计登记证“五证合一”的，只需扫描录入营业执照；b、若供应商的营业执照、组织机构代码证、税务登记证“三证合一”的，除扫描录入营业执照外，还需扫描录入社会保险登记证（或相关证明）。</p>
        <p class="text-indent-10"></p>
        <p class="text-indent-10"></p>
        <p>注册供应商享有以下权利：</p>
        <p class="text-indent-10">1.使用食采云平台服务，参加网上采购活动，并可提出改进食采云平台的意见和建议；</p>
        <p class="text-indent-10">2.浏览有关采购公告的历史信息，订阅与其经营范围和所注册的产品服务相关的采购信息；</p>
        <p class="text-indent-10">3.直接被系统随机抽取为询价采购的供应商；</p>
        <p class="text-indent-10">4.参加采购活动时，免于提供已注册登记资格信息的相关证明文件，并在预中标成交前免于对该部分资格信息的资格性审查；</p>
        <p class="text-indent-10">5.对采购单位的采购活动的服务水平、工作效率和公正性等进行反馈；</p>
        <p class="text-indent-10">6.法律、法规规定的其他权利。</p>
        <p>注册供应商承担以下义务：</p>
        <p class="text-indent-10">1.自觉遵守采购法律法规和其他相关规定，共同维护采购市场秩序和公平竞争环境，并接受财政部门的监督检查；</p>
        <p class="text-indent-10">2.依法、诚信地参加采购活动，积极参与采购市场诚信体系建设；</p>
        <p class="text-indent-10">3.依法履行采购合同和采购活动中的各项承诺，切实维护国家和社会公共利益以及采购单位的合法权益；</p>
        <p class="text-indent-10">4.对在采购过程中获取的国家秘密和商业秘密负有保密责任；</p>
        <p class="text-indent-10">5.全面、真实地登记供应商相关信息；及时调整变更信息，并按规定报送审查机构审查；</p>
        <p class="text-indent-10">6.法律、法规规定的其他义务。</p>
        <p>其他事项：</p>
        <p class="weight">
          请仔细阅读下列《采购供应商注册协议》。阅读协议的过程中，如果不同意协议中任何内容的，供应商应立即停止注册程序。
        </p>
        <h2 class="text-center">采购供应商注册协议</h2>
        <p>根据《中华人民共和国采购法》、《中华人民共和国招标投标法》、《中华人民共和国著作权法》、《全国人大常委会关于维护互联网安全的决定》、《互联网信息服务管理办法》、《网络交易管理办法》、《电子商务法》等有关法律法规，制定以下条款：</p>
        <p>一、接受条款</p>
        <p
          class="text-indent-10"
        >1、后勤物资采购云平台（以下简称食采云平台）服务由浙江校联信息技术有限公司（以下简称食采云）提供。食采云在此特别提醒用户，本协议内容包括协议正文及食采云平台已经发布或将来可能发布的各类规则。所有规则为协议不可分割的一部分，与协议正文具有同等法律效力。</p>
        <p
          class="text-indent-10 weight"
        >2、用户在申请注册流程中点击同意本协议之前，请务必审慎阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款，以及其他以粗体标识的涉及用户核心利益的重要条款。</p>
        <p class="weight">当用户按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示用户已充分阅读、理解并接受本协议的全部内容。阅读本协议的过程中，如果用户不同意本协议或其中任何内容，用户应立即停止注册程序。另外，用户通过点击平台其它相关位置上的同意按钮，亦表示完成接受了该按钮相关文件中的全部内容。</p>
        <p>二、定义</p>
        <p>后勤物资采购云平台：指以互联网为基础，充分运用云计算和大数据技术，以采购电子化交易和管理为重点，涉及采购全流程、各领域、多用户，集采购网上交易、网上监管和网上服务为一体的综合性云服务平台，包括域名为hqwzcg.com对应的网站及相关客户端。</p>
        <p>食采云平台服务：指食采云基于互联网，以包含食采云平台网站、客户端等在内的各种形态（包括未来技术发展出的新的服务形态）向用户提供的各项服务，包括但不限于账户管理、交易、结算及运营服务等。</p>
        <p>用户：指具有享受食采云平台各项服务相应的民事行为能力，阅读并同意本协议且完成全部注册程序的自然人、法人或其他组织。</p>
        <p>采购人：指在食采云平台完成注册且通过该平台向供应商采购货物、工程和服务的法人或其他组织。</p>
        <p>供应商：指在食采云平台完成注册且通过该平台向采购人提供货物、工程和服务的自然人、法人或其他组织。</p>
        <p>三、账户注册与使用</p>
        <p>1、注册供应商应具备以下条件：</p>
        <p class="text-indent-10">（1）具有独立承担民事责任的能力；</p>
        <p class="text-indent-10">（2）具有良好的商业信誉和健全的财务会计制度；</p>
        <p class="text-indent-10">（3）具有履行合同所必需的设备和专业技术能力；</p>
        <p class="text-indent-10">（4）有依法缴纳税收和社会保障资金的良好记录；</p>
        <p class="text-indent-10">（5）在经营活动中没有重大违法记录；</p>
        <p class="text-indent-10">（6）法律、法规规定的其他条件。</p>
        <p class="weight">2、注册（登记）信息：用户应当向食采云平台提供真实准确的注册（登记）信息，包括但不限于公司名称、住所、联系地址、联系电话、电子邮箱等，以便食采云或其他用户可以通过上述联系方式与用户进行联系，同时便于财政部门进行符合性审查。用户确认并同意登记信息将通过平台向社会公开，接受社会监督。</p>
        <p>注册（登记）信息发生变化的，用户应及时更新，确保信息最新、真实、准确、完整、有效财政部门或其委托机构将依法不时地对用户的信息进行检查核实。</p>
        <p>如因提供虚假登记信息、联系方式不确切或不及时告知变更后的联系方式，用户应自行承担由此可能对其自身、他人及/或食采云产生的全部法律后果。</p>
        <p>3、账户获得</p>
        <p
          class="text-indent-10"
        >（1）当用户按照注册页面提示填写信息且完成全部注册程序后，用户可获得食采云平台账户并成为食采云平台用户。同一家供应商（以营业执照和事业单位法人证书为准）在食采云平台上只能注册一个有效的供应商账户。如有证据证明或食采云根据平台规则判断用户存在不当使用多个账户的情形，食采云平台可采取冻结或关闭账户、取消订单、拒绝提供服务等措施，如因此给食采云及相关方造成损失的，用户还应承担赔偿责任。</p>
        <p class="text-indent-10">
          （2）注册供应商还需通过委托机构审查。供应商应通过食采云平台填报并扫描录入各种经营许可、批准、授权等证明文件，包括但不限于：a、营业执照（或事业单位法人证书）；b、法定代表人身份证；c、特许生产、经营或安全卫生许可，特定技术或业务资质，IS0质量和环保管理认证，品牌授权代理等有助于证明其经营和管理能力的证书；d、审查机构认为需要提交或供应商认为可以提供的其他资料（如公司章程、信用报告等），并应保证上述证明文件在其使用食采云平台服务期间持续合法、有效。
          通过委托机构审查的供应商，即成为正式供应商。
        </p>
        <p>4、账户安全与管理</p>
        <p
          class="text-indent-10 weight"
        >（1）请用户务必保管好账户及其密码，食采云任何时候均不会主动要求用户提供账户密码。若因用户保管不善导致用户账户信息泄露、客户信息泄露，或遭受他人攻击、诈骗等，从而引起的所有损失及不利后果，由用户自行承担全部责任。如发现任何未经授权使用用户账户登录食采云平台或其他可能导致用户账户遭窃、遗失的情况，建议用户立即通知食采云。用户理解食采云对用户的任何请求采取行动均需要合理时间，且食采云应用户请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除食采云存在法定过错外，食采云不承担责任。</p>
        <p
          class="text-indent-10"
        >（2）由于用户账户关联用户个人信息及食采云商业信息，用户账户仅限用户本人使用，不可转让、借用。未经食采云书面同意，用户不得直接或间接授权第三方使用用户账户或获取用户账户项下的信息。如食采云判断用户账户的使用可能危及用户账户安全及/或食采云信息安全的，食采云可拒绝提供相应服务或终止本协议，若因此给用户或第三方造成损失的，用户应自行承担全部责任，与食采云无关。</p>
        <p
          class="text-indent-10 weight"
        >（3）用户进一步确认并同意，除本协议另有规定外，在用户账户登录状态下进行的所有操作均视为用户本人的操作，用户应对其账户项下的所有行为结果（包括但不限于在线签署各类协议，发布信息，提供工程、货物、服务及披露信息）负责，食采云不承担任何责任。</p>
        <p>四、供应商的权利和义务</p>
        <p>（一）供应商根据注册类别，享有以下权利：</p>
        <p class="text-indent-10">1、使用食采云平台服务，参加网上采购活动，并可提出改进食采云平台的意见和建议；</p>
        <p class="text-indent-10">2、浏览有关采购公告的历史信息，发布供销信息，订阅与其经营范围和所注册的产品服务相关的采购信息；</p>
        <p class="text-indent-10">3、直接被系统随机抽取询价采购的供应商；</p>
        <p class="text-indent-10">4、参加采购活动时，免于提供已注册登记资格信息的相关证明文件，并在预中标成交前免于对该部分资格信息的资格性审查；</p>
        <p class="text-indent-10">5、对采购单位的采购活动的服务水平、工作效率和公正性等进行评价；</p>
        <p class="text-indent-10">6、法律、法规规定的其他权利。</p>
        <p>（二）供应商的义务</p>
        <p class="text-indent-10">1、自觉遵守采购法律法规和其他相关规定，共同维护采购市场秩序和公平竞争环境，并接受财政部门的监督检查；</p>
        <p class="text-indent-10">2、依法、诚信地参加采购活动，积极参与采购市场诚信体系建设；</p>
        <p class="text-indent-10">3、在使用食采云平台各项服务时，严格遵守国家有关互联网及其他相关的法律法规，不得存在下列行为：</p>
        <p class="text-indent-20">（1）不得发布任何损害国家、社会公共利益及/或涉及国家安全、政治宣传的信息；</p>
        <p class="text-indent-20">（2）不得发布任何暴力、恐怖或者教唆犯罪的，以及骚扰性、中伤他人、辱骂性、恐吓性、伤害性、庸俗、色情淫秽、封建迷信的信息；</p>
        <p class="text-indent-20">（3）不得发布、销售或提供任何侵犯他人知识产权、隐私、商业秘密或其他合法权益的信息、商品或服务；</p>
        <p class="text-indent-20">（4）不得销售或提供国家禁止或限制的商品、服务；</p>
        <p class="text-indent-20">（5）不得利用食采云平台从事洗钱、窃取商业秘密、个人信息等违法犯罪活动；</p>
        <p class="text-indent-20">（6）不得干扰或试图干扰食采云平台的正常运作；</p>
        <p class="text-indent-20">（7）不得教唆他人从事本款所禁止的行为；</p>
        <p class="text-indent-20">（8）不得发布、从事其他违背法律法规、社会公共利益、社会道德或食采云平台协议、规则的信息、行为。</p>
        <p class="weight">若供应商未遵守以上任一项规定的，食采云有权无需通知供应商，即删除或屏蔽供应商发布的各类不符合法律政策或不真实的信息内容，且有权冻结或关闭账户、取消订单、拒绝提供服务，如因此给食采云及相关方造成损失的，供应商还应承担赔偿责任。</p>
        <p>4、质量担保与权利担保义务</p>
        <p
          class="text-indent-10"
        >供应商应确保所提供的工程、货物、服务应达到相关国家法律、法规、规章规定的质量标准、强制标准、生产企业的质量标准以及行业标准等规定的质量、技术、安全要求（各标准之间规定冲突的，以要求较高者为准），不存在质量缺陷和安全隐患。供应商提供的货物如本身带有赠品或供应商自行承诺赠送赠品的，赠品应同样符合本协议所约定的质量保证及相关要求，如赠品违反前述要求的，供应商仍须按照本协议约定承担相应责任。</p>
        <p
          class="text-indent-10"
        >供应商保证对其提供的货物、工程或服务拥有完整、有效的所有权、处分权，不在任何抵押、担保、租赁及其他侵犯第三方的知识产权或其它合法权益的权利瑕疵。违反前述约定所产生的一切法律责任与费用均由供应商自行承担，若因此给食采云造成损失的，供应商应负责赔偿。</p>
        <p
          class="text-indent-10 weight"
        >若因供应商提供的货物、工程或服务的质量问题而引起采购人投诉、行政机关查处或任何第三方主张权利的，食采云有权立即将涉及争议的相关工程、货物或服务信息删除，供应商应积极按食采云要求并以适当方式协助处理相关索赔或争议，并承担因质量问题、权利瑕疵等问题而产生的全部责任及由此导致的全部赔偿、支出与费用（包括但不限于用户向采购人支付的赔偿或补偿费，食采云因此受到的第三方索赔、诉讼或行政责任、为处理纠纷而支出的律师代理费、诉讼费等）。</p>
        <p>5、依法履行采购合同和采购活动中的各项承诺，包括但不限于发货承诺、价格优惠承诺、品质保障、发票开具、退换货承诺和售后服务承诺等，切实维护国家和社会公共利益以及采购单位的合法权益。若供应商成为各级采购类业务的入围供应商的，供应商还应当遵守采购人所属行政区划政府、采购监管部门及上级主管、采购监管部门关于采购的各项法律规定及对供应商的具体要求，并严格履行各项入围承诺。</p>
        <p>6、供应商有权自行决定工程、货物、服务的促销及推广方式，但供应商的促销推广行为应当符合《价格法》、《反不正当竞争法》等有关法律法规及食采云平台的要求。</p>
        <p>7、若供应商的系统需要对食采云平台进行访问的，供应商应先得到食采云的同意并需保证其系统符合食采云的信息安全策略，并已通过独立第三方机构的测试，例如通过信息系统安全等级保护备案、ISO27001认证等。</p>
        <p>8、法律、法规规定的其他义务。</p>
        <p>五、平台服务费用</p>
        <p class="weight">除食采云平台明示的收费业务外，食采云向用户提供的服务是免费的。如未来食采云向用户收取合理费用，食采云会采取合理途径并以足够合理的期限提前通过法定程序并以本协议第十三条第1款约定的方式通知用户，确保用户有充分选择的权利。如用户选择继续使用服务但未按照食采云平台的规定及时付款的，食采云有权根据用户逾期付款的时间暂停或终止向用户提供服务，由此给用户及/或用户的客户造成损失的，用户应当自行承担全部赔偿责任，与食采云无关。</p>
        <p>六、用户信息的保护及授权</p>
        <p class="text-indent-10">（一）个人信息的保护</p>
        <p
          class="text-indent-20"
        >食采云非常重视对用户个人信息的保护，在用户使用食采云平台各项服务时，用户同意食采云按照《隐私政策》及/或财政部门的要求收集、存储、使用、披露和保护用户的个人信息。隐私声明是本协议不可分割的组成部分。因此，请用户仔细阅读。</p>
        <p class="text-indent-10">（二）非个人信息的保证与授权</p>
        <p class="text-indent-20">1、用户保证对其所发布的信息拥有相应、合法的权利，不得发布含有本协议第四条第2款第3项约定内容的信息。</p>
        <p
          class="text-indent-20 weight"
        >2、对于用户提供、发布及在使用食采云平台服务中形成的除个人信息外的文字、图片、视频、音频等非个人信息，在法律规定的保护期限内，用户免费授予食采云一项全球排他的许可使用权利及再授权给其他第三方使用的权利。用户同意食采云存储、使用、复制、修订、编辑、发布、展示、翻译、分发用户的非个人信息或通过各种形式制作、使用其派生作品。</p>
        <p>七、责任限制及免除</p>
        <p class="text-indent-10">1、对于下述原因导致食采云无法正常提供服务的，食采云不承担任何责任：</p>
        <p class="text-indent-20">（1）因自然灾害、罢工、暴乱、战争等不可抗力因素；</p>
        <p class="text-indent-20">（2）因电力供应故障、通讯网络故障等公共服务因素或食采云平台升级、维护因素；</p>
        <p
          class="text-indent-20"
        >（3）因黑客、病毒、木马、恶意程序攻击、常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全，以及第三方服务瑕疵或政府行为、司法行政命令等因素；</p>
        <p class="text-indent-20">（4）在紧急情况下为维护国家安全、其他用户及/或第三方之权益等因素；</p>
        <p class="text-indent-20">（5）用户操作不当或用户的上网设备软硬件出现故障等非食采云因素；</p>
        <p class="text-indent-20">（6）财政部门作出有关限制操作。</p>
        <p class="text-indent-10">尽管有前款约定，食采云将采取合理行动积极促使服务恢复正常。</p>
        <p class="text-indent-10">2、食采云以事先通知方式修改、中断或终止全部或部分本平台所提供的服务，若由此给用户造成损失的，食采云对该等损失不承担任何责任。</p>
        <p
          class="text-indent-10"
        >3、除法律另有规定外，用户明确知晓并同意在任何情况下食采云不对使用本平台服务或功能导致的任何特殊、附带、偶然或间接的损害进行赔偿，即使食采云已被告知可能发生该等损害，包括但不限于商业利润损失、数据或文档丢失产生的损失、人身伤害、隐私泄漏、因未能履行包括诚信或合理谨慎在内的任何责任或其他损失。</p>
        <p class="weight">八、违约责任</p>
        <p
          class="text-indent-10 weight"
        >1、用户在食采云平台上实施的行为，或虽未在食采云平台上实施但对食采云平台及/或其他用户产生影响的行为构成违约的，食采云可依据相应规则限制用户参加营销活动、中止向用户提供部分或全部服务、扣划违约金等处理措施；如用户的行为构成根本违约的，食采云可查封用户的账户，终止向用户提供服务。</p>
        <p
          class="text-indent-10 weight"
        >2、用户违约的同时存在欺诈、售假、盗用他人账户等特定情形或用户存在危及他人交易安全或账户安全风险时，食采云会依照用户行为的风险程度采取账户保护、账户关闭或指示银行对用户的收款账户实施取消收款、资金止付等强制措施。</p>
        <p
          class="text-indent-10 weight"
        >3、若用户存在违反适用法律、法规或本协议项下的其他行为的，食采云有权依据该行为性质，无需事先通知用户即可采取包括但不限于中断服务、限制使用、终止服务等措施；涉及采购监管权限的，食采云将提请财政部门确认并可建议有关监管部门对其进行处理、处罚。用户同意承担由此给食采云或第三方造成的全部损失。</p>
        <p class="text-indent-10 weight">4、本协议约定的应由用户承担的各项违约金、赔</p>
        <p class="weight">九、协议的变更与终止</p>
        <p
          class="text-indent-10 weight"
        >1、食采云可根据国家法律法规变化及维护交易秩序等需要，不时修改本协议、食采云平台规则，变更后的协议、规则（以下简称变更事项）一旦在域名为hqwzcg.com对应的网站或各级采购相关网站上公布即生效，并代替原版的协议、规则。用户有义务关注并阅读最新版的协议、规则。如用户对已生效的变更事项不同意的，用户应当于变更事项确定的生效之日起停止使用食采云平台服务，变更事项对用户不产生效力；如用户在变更事项生效后仍继续使用食采云平台服务，则视为用户同意已生效的变更事项。</p>
        <p class="text-indent-10 weight">2、用户存在下列任一情形的，食采云有权终止本协议：</p>
        <p
          class="text-indent-20 weight"
        >（1）用户盗用他人账户、发布违禁信息、骗取他人财物、售假、扰乱市场秩序、采取不正当手段谋利等行为，食采云对用户的账户予以查封、注销的；</p>
        <p class="text-indent-20 weight">（2）用户多次违反食采云平台规则相关规定且情节严重的；</p>
        <p class="text-indent-20 weight">（3）用户账户被食采云依据本协议回收的；</p>
        <p class="text-indent-20 weight">（4）其它食采云认为应当终止服务的情况。</p>
        <p
          class="text-indent-10 weight"
        >3、如用户账户存在下列情形之一的，食采云有权回收用户账户，相应服务同时终止：a、无任何交易信息，且连续12个月未登录食采云平台的；b、被采购监管部门列入不良行为记录名单的；c、被列为诚信体系黑名单的。</p>
        <p
          class="text-indent-10 weight"
        >4、用户有权向食采云申请注销用户账户，经食采云审核确认的，食采云注销用户的账户。届时，用户与食采云基于本协议的合同关系即终止。用户账户被注销后，食采云没有义务为用户保留或向用户披露用户账户中的任何信息，也没有义务向用户或第三方转发任何用户未曾阅读或发送过的信息。</p>
        <p
          class="text-indent-10 weight"
        >5、本协议终止后，如用户在服务终止之前已经上传至食采云平台的工程、货物、服务尚未交易的，食采云有权在终止服务的同时删除该工程、货物或服务的相关信息，且不承担任何责任。用户在使用服务期间因使用服务与其他用户之间发生的关系，不因本协议的终止而终止，其他用户仍有权向该用户主张权利，该用户应继续按原先的承诺履行义务。偿金、补偿金及其他费用，用户同意食采云指示银行自用户的收款账户或保证金（如有）中划扣相应款项进行支付。</p>
        <p>十、知识产权及保密条款</p>
        <p
          class="text-indent-10"
        >1、用户知晓并同意，除用户依法发布的用户信息外，食采云所有系统及食采云平台上所有内容，包括但不限于著作、商标、LOGO、域名、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计以及任何有关的衍生作品等，均由食采云或相关权利人依法拥有其相关的著作权、商标权、专利权、域名权、商业秘密及其他合法权利。未经食采云书面同意，用户不得复制、修改、出租、出售、散布或以其他商业方式使用食采云平台内的任何内容，不得进行反向工程、反编译、反汇编，或以其他方式发现、提取、或转换源代码，也不得宣称与食采云有任何授权、合作伙伴等特殊关系，否则视为根本性违约，食采云有权立即单方面终止本协议且没收用户缴纳的全部保证金（如有），并有权要求用户赔偿全部损失（包括但不限于调查取证费用、公证费用、律师费等）。</p>
        <p
          class="text-indent-10"
        >2、用户应对其在使用本平台服务过程中所知悉的属于食采云或其他用户（包括但不限于采购人、代理机构、评审专家等）的保密或专有的信息予以保密，保密期限自用户接收或知悉食采云或其他用户保密信息之日起至该等保密信息公开之日止，但用户与食采云其他用户另有约定的除外。如用户违反保密义务造成食采云或其他用户损失的，用户应自行承担全部赔偿责任；若由此导致其他用户向食采云主张权益、诉讼或索赔的，用户应配合食采云解决争议，并赔偿食采云因此产生的全部损失（包括但不限于调查取证费用、公证费用、诉讼费、律师费等）。</p>
        <p>十一、廉政条款</p>
        <p
          class="text-indent-10"
        >用户承诺将严格遵守采购人或食采云颁布/公布的商业道德规范、廉政政策以及国家有关禁止商业贿赂行为的法律、法规。如用户违反前述规定的，食采云有权依据食采云平台相应规则对用户进行处置；构成犯罪的，由司法机关依法追究用户的刑事责任；尚不构成犯罪的，由行政主管部门依法追究用户的相应责任。</p>
        <p>十二、法律适用及争议解决</p>
        <p
          class="text-indent-10"
        >1、本协议之订立、解释、修订、补充、执行与争议解决，均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及/或行业惯例。</p>
        <p
          class="text-indent-10 weight"
        >2、用户因使用食采云平台服务所产生的或与食采云服务有关的争议，由食采云与用户协商解决。协商不成时，任何一方均可提交杭州仲裁委员会处理。</p>
        <p>十三、其他</p>
        <p
          class="text-indent-10"
        >1、通知：用户同意食采云通过下列任一种方式向用户发送通知：（1）公告；（2）站内信、客户端推送的消息；（3）根据用户预留的联系方式发送的电子邮件、短信、函件等。食采云以前述约定的电子方式发出的书面通知，在发送成功后即视为送达；以纸质载体发出的函件等书面通知，在食采云交邮后的第五个自然日即视为送达。</p>
        <p class="text-indent-10">2、本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。</p>
        <p class="text-indent-10">3、在法律允许的最大范围内，食采云对本协议拥有解释权和修改权。</p>
      </div>
      <div v-show="modalTitle=='法律声明'">
        <p class="weight">重要提示</p>
        <p
          class="weight"
        >食采云提醒您：在您使用食采云平台各项服务前，请您审慎阅读并透彻理解本声明。如对本声明内容有任何疑问的，您可向食采云平台客服（400-999-2350）咨询。如您不同意本声明任何内容的，您应立即停止使用食采云平台服务。在任何情况下，您的使用行为将被视为对本声明全部内容的认可。</p>
        <p>一、权利归属</p>
        <p
          class="text-indent-10"
        >除非食采云另行声明，食采云平台内的所有产品、技术、软件、程序、数据及其他信息（包括但不限于文字、图片、音像、图表、色彩、标志、标识、商标、Logo、域名、版面设计、电子文档以及任何有关的衍生品等，均受《中华人民共和国著作权法》、《中华人民共和国商标法》、《中华人民共和国专利法》等法律法规以及有关国际条约的保护，相应权利（包括但不限于版权、商标权、专利权、域名权、商业秘密及其他合法权利）由食采云及/或相关权利人所有或持有。</p>
        <p
          class="text-indent-10"
        >未经食采云及/或相关权利人授权，任何人不得通过复制、修改、传播、展示、镜像、上载、下载等方式擅自使用食采云平台内的任何内容，或通过非常规方式影响食采云平台的正常服务。否则，食采云将依法追究您的法律责任；若由此导致相关权利人向食采云主张权益、诉讼或索赔，或相关行政部门对食采云作出行政处罚的，您应当赔偿食采云因此产生的全部损失（包括但不限于调查取证费用、诉讼费、律师费）。</p>
        <p>二、知识产权保护</p>
        <p
          class="text-indent-10"
        >食采云重视知识产权保护，打击侵权盗版行为。如果知识产权权利人认为食采云平台内容（包括但不限于食采云用户发布的工程、货物、服务信息等）可能涉嫌侵犯其合法权益的，请以电子邮件方式（邮箱：postmaster@acuit.onaliyun.com）向食采云发出通知，通知内容应包含：（1）权利人的联络信息，包括姓名（名称）、身份证明（自然人为身份证或护照复印件、单位为营业执照（事业单位法人证书）等登记证明复印件）、联系方式、通信地址；（2）权利人对涉嫌侵权内容拥有合法权利的权属证明；（3）涉嫌侵权的内容及其出处（指网络地址或者足以准确定位侵权内容的相关信息）；（4）通知内容真实性声明。</p>
        <p>三、商业秘密保护</p>
        <p
          class="text-indent-10"
        >食采云提醒您，在您使用食采云平台服务过程中所知悉的属于食采云及（或）其用户（包括但不限于采购人、供应商、代理机构、专家等）的保密或专有的信息，您应当予以保密。保密期限自您接收或知悉食采云及（或）其用户保密信息之日起至该等保密信息公开之日止，但您与食采云及（或）其用户另有约定的除外。如您违反保密义务造成食采云及（或）其用户损失的，您应当承担全部赔偿责任；若由此导致食采云用户向食采云主张权益、诉讼或索赔的，您应赔偿食采云因此产生的全部损失（包括但不限于调查取证费用、诉讼费、律师费）。</p>
        <p class="weight">四、免责声明</p>
        <p class="text-indent-10 weight">食采云在此特别声明对下列事宜不承担任何法律责任：</p>
        <p
          class="text-indent-20 weight"
        >1、食采云平台上的店铺、商品信息（包括但不限于店铺名称、公司名称、联系人及联络信息、产品的描述和说明、相关图片、视频等）均由用户自行提供并上传，由用户对其提供并上传的所有信息承担相应法律责任，与食采云无关。</p>
        <p
          class="text-indent-20 weight"
        >2、除法律及（或）食采云平台服务协议另有规定外，食采云对您使用本网站上的信息，或其它与本网站链接的网站信息所导致的损害（包括但不限于直接、间接、特殊、附带或偶然的损害），不承担任何责任。</p>
        <p
          class="text-indent-20 weight"
        >3、食采云对您使用本网站、与本网站相关的任何服务、功能或其它链接至本网站的站点均不作明示、默示保证。因网络状况、通讯线路、第三方网站等任何原因而导致您不能正常使用食采云平台服务的，食采云不承担任何法律责任。</p>
        <p class="text-indent-10 weight">食采云平台内表述的任何意见均属于作者个人意见，并不代表食采云赞同其观点或已经证实其内容的真实性，食采云对此也不承担任何责任。</p>
      </div>
      <div v-show="modalTitle=='隐私协议'">
        <p class="weight">重要提示</p>
        <p
          class="weight"
        >食采云（或简称“我们”）非常重视个人信息的保护！我们深知个人信息对您的重要性，将按法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。鉴于此，我们制定了本《隐私政策》（以下简称“本政策”），在此提醒您：</p>
        <p class="weight">本政策适用于食采云平台所有产品或服务，即您访问食采云平台网站及/或登陆相关客户端使用食采云平台产品或服务的，均适用本政策。</p>
        <p
          class="weight"
        >需要特别说明的是，本政策不适用于通过本网站接入的其他第三方服务。当您使用前述第三方服务时，他们可能会获取您的个人信息，因此食采云在此提醒您额外阅读第三方的隐私政策。食采云不对第三方的行为及后果承担任何责任。</p>
        <p
          class="weight"
        >在使用食采云平台各项产品或服务前，请您务必仔细阅读并理解本政策。如果您不同意本政策任何内容，您应立即停止使用食采云平台产品或服务。在任何情况下，您的使用行为即视为您已充分理解并同意本政策。</p>
        <p>第一部分 定义</p>
        <p
          class="text-indent-10"
        >食采云平台：指以互联网为基础，充分运用云计算和大数据技术，以采购电子化交易和管理为重点，涉及采购全流程、各领域、多用户，集采购网上交易、网上监管和网上服务为一体的综合性云服务平台，包括域名为hqwzcg.com对应的网站及相关客户端。</p>
        <p class="text-indent-10">食采云平台服务提供者：指浙江校联信息技术有限公司</p>
        <p class="text-indent-10">个人信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。</p>
        <p
          class="text-indent-10"
        >个人敏感信息：指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。包括身份证件号码、个人生物识别信息、银行账号、财产信息、行踪轨迹等。</p>
        <p class="text-indent-10">个人信息删除：指在实现日常业务功能所涉及的系统中去除个人信息的行为，使其保持不可被检索、访问的状态。</p>

        <p>第二部分 隐私政策</p>
        <p class="text-indent-10">本隐私政策部分将帮助您了解以下内容：</p>
        <p class="text-indent-20">1、我们如何收集和使用您的个人信息</p>
        <p class="text-indent-20">2、我们如何使用Cookie和同类技术</p>
        <p class="text-indent-20">3、我们如何共享、转让、公开披露您的个人信息</p>
        <p class="text-indent-20">4、我们如何保护您的个人信息</p>
        <p class="text-indent-20">5、您的权利</p>
        <p class="text-indent-20">6、我们如何处理未成年人的个人信息</p>
        <p class="text-indent-20">7、您的个人信息如何在全球范围转移</p>
        <p class="text-indent-20">8、本隐私政策如何更新</p>
        <p class="text-indent-20">9、如何联系我们</p>
        <p class="text-indent-10">一、我们如何收集和使用您的个人信息</p>
        <p class="text-indent-20">我们会出于本政策所述的以下目的，收集和使用您的个人信息：</p>
        <p class="text-indent-10">（一）帮助您成为我们的用户</p>
        <p
          class="text-indent-20"
        >注册成为我们的用户时，为完成创建账号，您需提供以下信息：您的姓名、性别、出生日期、身份证号码/护照号码、手机/电话号码、传真、电子邮箱、地址、员工编号、所属部门及相关附加信息（如您所在的省份和城市等）。如果您仅需使用浏览、搜索等基本服务，您不需要注册成为我们的用户及提供上述信息。</p>
        <p class="text-indent-20">在您主动注销/停用账号时，我们将根据适用法律法规的要求尽快使其匿名或删除您的个人信息。</p>
        <p class="text-indent-10">（二）为您展示和推送商品或服务</p>
        <p
          class="text-indent-20"
        >为改善我们的产品或服务、向您提供个性化的信息搜索及交易服务，我们会根据您的浏览及搜索记录、位置信息、订单信息等，提取您的浏览、搜索偏好位置信息等特征，基于特征标签向您推送工程、货物、服务信息，或通过系统向您展示个性化的第三方推广信息。</p>
        <p class="text-indent-20">如果您不想接受我们给您发送的商业广告，您可通过相应产品退订功能取消。</p>
        <p class="text-indent-10">（三）向您提供商品或服务</p>
        <p class="text-indent-20">1、您向我们提供的信息</p>
        <p
          class="text-indent-20 weight"
        >为便于向您交付商品或服务，我们会记录您提供的信息，例如您提供的联系人姓名、联系电话、收货地址、邮政编码等。如果我们委托第三方向您交付时，我们会在征得您同意后将上述信息共享给第三方。如果您拒绝提供此类信息，我们将无法完成相关交付服务。</p>
        <p class="text-indent-20">2、我们在您使用服务过程中收集的信息</p>
        <p
          class="text-indent-20 weight"
        >为向您提供更契合您需求的页面展示和搜索结果、了解产品适配性、识别账号异常状态，我们会收集关于您使用的服务以及使用方式的信息并将这些信息进行关联，这些信息包括：</p>
        <p
          class="text-indent-20 weight"
        >设备信息：我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（例如设备型号、操作系统版本、设备设置等软硬件特征信息）、设备所在位置相关信息（例如IP地址等传感器信息）。</p>
        <p
          class="text-indent-20 weight"
        >日志信息：当您使用我们的网站或客户端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为有关网络日志保存。例如您的搜索查询内容、IP地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问的网页记录等。</p>
        <p
          class="text-indent-20 weight"
        >请注意，单独的设备信息、日志信息等是无法识别特定自然人身份的信息。如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将该类个人信息做匿名化、去标识化处理。</p>
        <p class="text-indent-20">为展示您账户的订单信息，我们会收集您在使用我们服务过程中产生的订单信息用于向您展示及便于您对订单进行管理。</p>
        <p
          class="text-indent-20 weight"
        >当您与我们联系时，我们可能会保存您的通信/通话记录和内容或您留下的联系方式等信息，以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果。</p>
        <p class="text-indent-20">3、我们通过间接获得方式收集到的您的个人信息</p>
        <p
          class="text-indent-20"
        >为确认交易状态及为您提供售后服务，我们会通过您基于交易所选择的交易对象、物流公司等收集与交易进度相关的您的交易、物流信息，或将您的交易信息共享给上述服务提供者。</p>
        <p class="text-indent-10">（四）为您提供安全保障</p>
        <p
          class="text-indent-20 weight"
        >为确保用户身份真实性、向您提供更好的安全保障，您可以向我们提供身份证、军官证、护照、驾驶证、社保卡、居住证等身份信息、面部特征等生物识别信息完成实名认证。如您拒绝提供上述信息，可能无法使用账户管理、出售商品、继续可能存在风险的交易等服务。</p>
        <p
          class="text-indent-20 weight"
        >为提高您使用我们提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或食采云平台相关协议规则的情况，我们可能使用您的用户信息、交易信息、设备信息、有关网络日志或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。</p>
        <p class="text-indent-10">（五）开展内部审计、数据分析和研究，改善我们的产品或服务</p>
        <p class="text-indent-10">（六）其他用途</p>
        <p class="text-indent-20">我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。</p>
        <p class="text-indent-10">（七）征得授权同意的例外</p>
        <p class="text-indent-20">根据相关法律法规规定，以下情形中收集您的个人信息无需征得您的授权同意：</p>
        <p class="text-indent-20">1、与国家安全、国防安全有关的；</p>
        <p class="text-indent-20">2、与公共安全、公共卫生、重大公共利益有关的；</p>
        <p class="text-indent-20">3、与犯罪侦查、起诉、审判和判决执行等有关的；</p>
        <p class="text-indent-20">4、出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；</p>
        <p class="text-indent-20">5、所收集的个人信息是您自行向社会公众公开的；</p>
        <p class="text-indent-20">6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；</p>
        <p class="text-indent-20">7、根据您的要求签订和履行合同所必需的；</p>
        <p class="text-indent-20">8、用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</p>
        <p class="text-indent-20">9、为合法的新闻报道所必需的；</p>
        <p
          class="text-indent-20"
        >10、学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</p>
        <p class="text-indent-20">11、法律法规规定的其他情形。</p>
        <p
          class="text-indent-20"
        >如我们停止运营食采云平台产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，对所持有的个人信息进行删除或匿名化处理。</p>
        <p>二、我们如何使用Cookie和同类技术</p>
        <p class="text-indent-10">（一）Cookie</p>
        <p
          class="text-indent-20"
        >为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储名为Cookie的小数据文件。Cookie通常包含标识符、站点名称以及一些号码和字符。借助于Cookie，网站能够存储您的偏好或购物篮内的商品等数据。</p>
        <p
          class="text-indent-20"
        >您可根据自己的偏好管理或删除Cookie。有关详情，请参见AboutCookies.org。您可以清除计算机上保存的所有Cookie，大部分网络浏览器都设有阻止Cookie的功能。但如果您这么做，则需要在每一次访问我们的网站时更改用户设置。如需详细了解如何更改浏览器设置，请访问您使用的浏览器的相关设置页面。</p>
        <p class="text-indent-10">（二）网站信标和像素标签</p>
        <p
          class="text-indent-20"
        >除Cookie外，我们还会在网站上使用网站信标和像素标签等其他同类技术。例如，我们向您发送的电子邮件可能含有链接至我们网站内容的地址链接，如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好以便于我们主动改善客户服务体验。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从我们的寄信名单中退订。</p>
        <p>三、我们如何共享、转让、公开披露您的个人信息</p>
        <p class="text-indent-10">（一）共享</p>
        <p class="text-indent-20 weight">我们不会与食采云以外的公司、组织和个人共享您的个人信息，但以下情况除外：</p>
        <p class="text-indent-20 weight">1、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。</p>
        <p class="text-indent-20 weight">2、在法定情形下的共享：我们可能会根据法律法规规定、诉讼争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。</p>
        <p
          class="text-indent-20"
        >3、与授权合作伙伴共享：仅为实现本隐私权政策中声明的目的，我们的某些服务将由我们和授权合作伙伴共同提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。例如，在您上网购买我们的产品时，我们必须与物流服务提供商共享您的个人信息才能安排送货，或者安排合作伙伴提供服务。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于与产品或服务无关的其他用途。</p>
        <p
          class="text-indent-20"
        >目前，我们的授权合作伙伴包括：供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供技术基础设施服务、分析我们服务的使用方式、提供客户服务、支付便利或进行学术研究和调查。</p>
        <p
          class="text-indent-20"
        >对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的数据保护协定，要求他们按照我们的说明、本隐私权政策以及其他任何相关的保密和安全措施来处理个人信息。</p>
        <p class="text-indent-10">（二）转让</p>
        <p class="text-indent-20 weight">我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</p>
        <p class="text-indent-20 weight">1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；</p>
        <p
          class="text-indent-20 weight"
        >2、在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</p>
        <p class="text-indent-10">（三）公开披露</p>
        <p class="text-indent-20">我们仅会在以下情况下，公开披露您的个人信息：</p>
        <p class="text-indent-20">1、获得您明确同意或基于您的主动选择后；</p>
        <p
          class="text-indent-20"
        >2、如果您出现违反法律法规或严重违反食采云平台相关协议规则的情况，或为保护食采云平台其他用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或食采云平台相关协议规则披露关于您的个人信息，包括相关违规行为以及财政部门或食采云平台已对您采取的措施。</p>
        <p class="text-indent-10">（四）共享、转让、公开披露个人信息时事先征得授权同意的例外</p>
        <p class="text-indent-20 weight">以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</p>
        <p class="text-indent-20 weight">1、与国家安全、国防安全有关的；</p>
        <p class="text-indent-20 weight">2、与公共安全、公共卫生、重大公共利益有关的；</p>
        <p class="text-indent-20 weight">3、与犯罪侦查、起诉、审判和判决执行等有关的；</p>
        <p class="text-indent-20 weight">4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；</p>
        <p class="text-indent-20 weight">5、您自行向社会公众公开的个人信息；</p>
        <p class="text-indent-20 weight">6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</p>
        <p
          class="text-indent-20"
        >根据法律规定，共享、转让经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别个人信息主体的，不属于个人信息的对外共享、转让及公开披露行为，对此类数据的保存及处理将无需另行向您通知并征得您的同意。</p>
        <p>四、我们如何保护您的个人信息安全</p>
        <p
          class="text-indent-10"
        >（一）我们已采取符合业界标准、合理可行的安全防护措施保护您提供的个人信息安全，防止个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。例如，在您的浏览器与服务器之间交换数据（如信用卡信息）时受SSL加密保护；我们同时对食采云平台网站提供HTTPS安全浏览方式；我们会使用加密技术提高个人信息的安全性；我们会使用受信赖的保护机制防止个人信息遭到恶意攻击；我们会部署访问控制机制，尽力确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。</p>
        <p
          class="text-indent-10"
        >（二）我们会采取合理可行的措施，尽力避免收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。</p>
        <p
          class="text-indent-10"
        >（三）互联网并非绝对安全的环境，而且电子邮件、即时通讯及与其他平台用户的交流方式并未加密，我们强烈建议您不要通过此类方式发送个人信息。</p>
        <p
          class="text-indent-20"
        >在使用食采云平台服务进行网上交易时，您不可避免地要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或联系地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息尤其是您的账户或密码发生泄露，请您立即联络食采云平台客服，以便我们根据您的申请采取相应措施。</p>
        <p
          class="text-indent-20 weight"
        >请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</p>
        <p
          class="text-indent-20"
        >请使用复杂密码，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。如果因我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。</p>
        <p class="text-indent-10">（四）我们将不定期更新并公开安全风险、个人信息安全影响评估报告等有关内容，您可通过食采云平台公告方式获得。</p>
        <p
          class="text-indent-10"
        >（五）在不幸发生个人信息安全事件后，我们将按照法律法规的要求向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。事件相关情况我们将以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。</p>
        <p class="text-indent-20">同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。</p>
        <p>五、您的权利</p>
        <p class="text-indent-10">您可以通过以下方式访问及管理您的个人信息</p>：
        <p class="text-indent-10">（一）访问您的个人信息</p>
        <p class="text-indent-20">您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：</p>
        <p
          class="text-indent-20"
        >账户信息——如果您希望访问或编辑您的账户中的个人基本资料信息、更改您的密码、添加安全信息或关闭您的账户等，您可以通过以下方式执行此类操作：</p>
        <p class="text-indent-10">（1）登录账号通过“账号信息”执行；</p>
        <p class="text-indent-20">订单信息：您可以在食采云平台中查阅您的订单记录、交易记录等。</p>
        <p class="text-indent-20">如果您无法通过上述路径访问该等个人信息，您可以随时通过食采云平台客服与我们取得联系。我们将在30天内回复您的访问请求。</p>
        <p class="text-indent-20">对于您在使用我们的产品或服务过程中产生的其他个人信息，我们将根据本条“（八）响应您的上述请求”中的相关安排向您提供。</p>
        <p class="text-indent-10">（二）更正或补充您的个人信息</p>
        <p
          class="text-indent-20"
        >当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正或补充。您可以通过“（一）访问您的个人信息”中列明的方式提出更正或补充申请。</p>
        <p class="text-indent-10">（三）删除您的个人信息</p>
        <p class="text-indent-20">您可以通过“（一）访问您的个人信息”中列明的方式删除您的部分个人信息。</p>
        <p class="text-indent-20">在以下情形中，您可以向我们提出删除个人信息的请求：</p>
        <p class="text-indent-20">1、如果我们处理个人信息的行为违反法律法规；</p>
        <p class="text-indent-20">2、如果我们收集、使用您的个人信息，却未征得您的明确同意；</p>
        <p class="text-indent-20">3、如果我们处理个人信息的行为严重违反了与您的约定；</p>
        <p class="text-indent-20">4、如果您不再使用我们的产品或服务，或您主动注销了账号；</p>
        <p class="text-indent-20">5、如果我们不再为您提供产品或服务。</p>
        <p
          class="text-indent-20"
        >若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，要求其及时删除，除非法律法规另有规定，或这些主体获得您的独立授权。当账号注销或删除后，您在该账号下的服务、资料和数据可能被删除或处理，且我们将无义务向您提供、披露、还原任何已删除或处理的信息。</p>
        <p class="text-indent-20">当您从我们的服务中删除信息后，我们可能不会立即从备份系统中删除相应的信息，但会在备份更新时删除这些信息。</p>
        <p class="text-indent-10">（四）改变您授权同意的范围</p>
        <p
          class="text-indent-20"
        >每个业务功能需要一些基本的个人信息才能得以完成（见本政策“第二部分第一条”）。除此之外，对于额外个人信息的收集和使用，您可以联系食采云平台客服给予或收回您的授权同意。</p>
        <p class="text-indent-20">当您收回同意后，我们将不再处理相应的个人信息。但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。</p>
        <p class="text-indent-10">（五）约束信息系统自动决策</p>
        <p
          class="text-indent-20"
        >在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。</p>
        <p class="text-indent-10">（六）响应您的上述请求</p>
        <p class="text-indent-20">为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。</p>
        <p class="text-indent-20">我们将在30天内做出答复。如您不满意，还可以通过食采云平台客服发起投诉。</p>
        <p
          class="text-indent-20"
        >对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。</p>
        <p class="text-indent-20">在以下情形中，按照法律法规要求，我们将无法响应您的请求：</p>
        <p class="text-indent-20">1、与国家安全、国防安全有关的；</p>
        <p class="text-indent-20">2、与公共安全、公共卫生、重大公共利益有关的；</p>
        <p class="text-indent-20">3、与犯罪侦查、起诉、审判和执行判决等有关的；</p>
        <p class="text-indent-20">4、有充分证据表明您存在主观恶意或滥用权利的；</p>
        <p class="text-indent-20">5、响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</p>
        <p class="text-indent-20">6、涉及商业秘密的。</p>
        <p>六、我们如何处理未成年人的个人信息</p>
        <p class="text-indent-10">我们的产品、网站和服务不面向未成年人。如果没有父母或监护人的同意，未成年人不得创建自己的用户账户。</p>
        <p class="text-indent-10">如您为未成年人的，建议您请您的父母或监护人仔细阅读本隐私政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。</p>
        <p
          class="text-indent-10"
        >对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。</p>
        <p>七、您的个人信息如何在全球范围转移</p>
        <p class="text-indent-10">我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内注册、具有相应资质等级的公司服务器上，但法律法规有明确规定的除外。</p>
        <p>八、本隐私权政策如何更新</p>
        <p class="text-indent-10">我们的隐私权政策可能变更。</p>
        <p class="text-indent-10">未经您明确同意，我们不会限制您按照本隐私政策所应享有的权利。我们会在食采云平台页面上发布对隐私政策所做的任何变更。</p>
        <p class="text-indent-10">对于重大变更，我们还会提供更为显著的通知（包括我们会通过食采云平台公示的方式进行通知）。</p>
        <p class="text-indent-10">本政策所指的重大变更包括但不限于：</p>
        <p class="text-indent-20">1、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</p>
        <p class="text-indent-20">2、我们在控制权等方面发生重大变化。如并购重组等引起的所有者变更等；</p>
        <p class="text-indent-20">3、个人信息共享、转让或公开披露的主要对象发生变化；</p>
        <p class="text-indent-20">4、您参与个人信息处理方面的权利及其行使方式发生重大变化；</p>
        <p class="text-indent-20">5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；</p>
        <p class="text-indent-20">6、个人信息安全影响评估报告表明存在高风险时。</p>
        <p>我们还会将本隐私政策的旧版本存档，供您查阅。</p>
        <p>九、如何联系我们</p>
        <p class="text-indent-10">如果您对本政策内容有任何疑问、意见或建议，您可通过食采云平台客服（400-999-2350）与我们联系。</p>
        <p class="text-indent-10">一般情况下，我们将在30天内回复。</p>
        <p class="text-indent-10">如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，您还可以通过杭州仲裁委员会提起仲裁来寻求解决方案。</p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { get_main_base_list, apply } from "@indexApi/user";
export default {
  data() {
    return {
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "number" },
          align: "center",
          width: "10%"
        },
        {
          title: "资料",
          dataIndex: "name",
          width: "30%"
        },
        {
          title: "状态",
          width: "30%",
          scopedSlots: { customRender: "status" }
        },
        {
          width: "30%",
          title: "操作",
          scopedSlots: { customRender: "operation" }
        }
      ],
      checked: false,
      modalVisible: false,
      modalTitle: "",
      dialogImg: "",
      main_list: [],
      submitKey: false // 禁用提交按钮
    };
  },
  props: ["father"],
  created() {
    this.father.current = 2;
    this.main_base_list();
  },
  filters: {
    status(value) {
      switch (value) {
        case 1:
          return "已完善";
          break;
        default:
          return "未完善";
          break;
      }
    }
  },
  methods: {
    main_base_list() {
      get_main_base_list()
        .then(res => {
          let result = res.data;
          let main_list = [];
          for (let key in result) {
            let obj = {};
            obj.path = key;
            obj.status = result[key].status;
            obj.type = result[key].type;
            obj.name = switch_name(key);
            obj.id = key;
            if (obj.type) main_list.push(obj);
          }
          this.main_list = main_list;
          this.list_key = main_list.every(item => item.status == 1);
          this.submitKey = this.checked && this.list_key;
        })
        .catch();
      function switch_name(key) {
        switch (key) {
          case "basic_info":
            return "基本信息";
            break;
          case "nature_info":
            return "基本资质";
            break;
          case "credit_info":
            return "信用信息";
            break;
          case "investment_info":
            return "出资信息";
            break;
          case "financial_info":
            return "财务信息";
            break;
          case "people_info":
            return "人员信息";
            break;
          default:
            return "特殊资质";
            break;
        }
      }
    },
    handleEdit(path) {
      open(this.global.host + "/admin.html#/" + path);
    },
    showDialog(e) {
      let key = e.target.dataset.key;
      switch (key) {
        case "1":
          this.modalTitle = "政府采购供应商注册须知";
          break;
        case "2":
          this.modalTitle = "法律声明";
          break;
        case "3":
          this.modalTitle = "隐私协议";
          break;
      }
      if (!key) return;
      this.modalVisible = true;
    },
    submit() {
      apply()
        .then(res => {
          this.$message.success(res.msg);
          let time = setTimeout(() => {
            this.$router.push({ path: "/register/dataAudit" });
            clearTimeout(time);
          }, 1000);
        })
        .catch();
    },
    prev() {
      this.$router.push({ path: "/register/baseInfo" });
    },
    checkboxChange(e) {
      this.checked = e.target.checked;
      this.submitKey = e.target.checked && this.list_key;
    }
  }
};
</script>

<style lang="scss" scoped>
#complete {
  width: 100%;
  margin: 0 auto;
  header {
    width: 80%;
    margin: 0 auto 40px;
    background-color: #fffbe8;
    border: 1px solid #f7e8c7;
    padding: 10px;
    @extend .radius;
    span {
      color: #9e7437;
    }
  }
  h4 {
    border-left: 3px solid $primary2;
    margin: 1rem 0;
    margin-left: 10%;
    padding-left: 1rem;
    display: inline-block;
  }
  .ant-table {
    margin: 0 auto;
    button {
      @extend .pointer;
      color: $info;
      margin: 0;
      background: none;
    }
  }
  section {
    width: 80%;
    margin: 0 auto;
  }
  section.rules {
    margin-top: 2rem;
    text-align: center;
    span {
      color: #03f;
      @extend .pointer;
    }
  }
  footer {
    @extend .text-center;
    padding: 1rem 0;
  }
  .dot,
  .dot-gray {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $primary2;
  }
  .dot-gray {
    background-color: $borderColor;
  }
}
</style>
<style lang="scss">
.model {
  .weight {
    font-weight: bold;
  }
}
</style>