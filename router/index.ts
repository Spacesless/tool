const routes = [
  {
    name: '文本工具',
    path: 'text',
    icon: 'ion:text-outline',
    description: '',
    children: [
      {
        id: '0f1fa773-eca1-4034-93ae-0eb590bee9c6',
        name: '简繁转换',
        path: 'chinese-convert',
        description: ''
      },
      {
        id: '04a0400f-c13c-4e34-a41e-5c1ae695eac1',
        name: '拼音',
        path: 'pinyin',
        description: ''
      }
    ]
  },
  {
    name: '生活工具',
    path: 'life',
    icon: 'ph:calendar',
    description: '',
    children: [
      {
        id: '0f01528e-5a20-4e01-b241-7b5db2058719',
        name: '星座运势',
        path: 'constellation',
        description: '十二星座每日、每月、每年运势；\n根据日期或星座名称，查询星座详细信息。'
      },
      {
        id: '26969e75-92ae-47b1-8f0d-6e90c8b29e97',
        name: '生活垃圾',
        path: 'garbage',
        description: '生活垃圾分类查询，可回收物、有害垃圾、湿垃圾、干垃圾'
      },
      {
        id: 'cf87456b-71d0-4599-93e2-d50a8e1ececc',
        name: '成语大全',
        path: 'idioms',
        description: '根据成语查询详细信息，如：详解、同义词、反义词、读音等信息；\n目前总计约收录4.5万组成语。'
      },
      {
        id: 'e11519b0-015f-4ded-8b51-1d55db6f63f6',
        name: '车牌归属地',
        path: 'license-plate-territory',
        description: '根据国内车牌号或车牌前缀查询所属归属省份城市'
      },
      {
        id: '220714c8-741b-4242-aa37-7e4ddefc32d8',
        name: '万年历',
        path: 'perpetual-calendar',
        description: ''
      },
      {
        id: 'f8063ccc-7825-4e57-9916-da03b2bf5dcd',
        name: '邮政编码',
        path: 'postcode',
        description: '邮政编码信息查询，根据地区、邮政编码查询相关信息'
      },
      {
        id: 'c1215523-6f71-4559-ac59-bc6f14319984',
        name: '二维码生成',
        path: 'qrcode-generator',
        description: 'QRcode生成器是一种用于生成文本二维码的工具。\n用户可以输入或粘贴文本到工具中，工具会自动生成相应的QR码并在界面上显示出来。'
      },
      {
        id: '3b1906b0-874f-462d-b7c5-c30ccbec2052',
        name: '二十四节气',
        path: 'solar-terms',
        description: '二十四节气查询，根据年份查询相关信息'
      },
      {
        id: 'a7a82359-d367-4c0a-9203-c78e948867ae',
        name: '十二时辰',
        path: 'twelve-hours',
        description: '12个时辰的时段、宜忌黄历等信息'
      }
    ]
  },
  {
    name: '数据换算',
    path: 'conversion',
    icon: 'fluent:convert-range-24-regular',
    description: '',
    children: [
      {
        id: '9d732fed-3f00-4e41-a0c1-d1ed9d09bc31',
        name: '角度换算',
        path: 'angle',
        description: 'deg、rad、grad、arcmin、arcsec换算'
      },
      {
        id: 'ac0400d6-f825-40bb-a785-43e2ffe57625',
        name: '面积换算',
        path: 'area',
        description: 'mm2、cm2、m2、ha、km2、in2、ft2、ac、mi2换算'
      },
      {
        id: '8a2b01cc-3da4-40db-b069-421274aae0fe',
        name: '字节换算',
        path: 'byte',
        description: 'b、Kb、Mb、Gb、Tb、B、KB、MB、GB、TB换算'
      },
      {
        id: '25d7236e-47fd-422b-803f-e6c5206d3306',
        name: '长度换算',
        path: 'length',
        description: 'mm、cm、m、in、ft-us、ft、mi换算'
      },
      {
        id: '6ceba960-46fd-4ef2-919a-e45120ba296c',
        name: '质量换算',
        path: 'mass',
        description: 'mcg、mg、g、kg、lb、oz、mt、t换算'
      },
      {
        id: '223348f5-a30e-43f2-8861-3b47ddfcc452',
        name: '速度换算',
        path: 'speed',
        description: 'm/s、km/h、m/h、knot、ft/s换算'
      },
      {
        id: '739269c0-5a8d-4895-ab95-a54edd5450d2',
        name: '温度换算',
        path: 'temperature',
        description: '摄氏度、华氏度、开尔文、兰氏度换算'
      },
      {
        id: '3418ebc4-c876-4100-b461-7ed0485a4341',
        name: '时间换算',
        path: 'time',
        description: 'ns、mu、ms、s、min、h、d、week、month、year换算'
      },
      {
        id: '593b0634-39a3-4573-8cc6-9a44425e79c4',
        name: '体积换算',
        path: 'volume',
        description: '立方毫米、立方厘米、毫升、升、千升、立方米、立方千米、茶匙、立方英寸、液量盎司、杯子、品脱、夸特、加仑、立方码、立方英尺换算'
      },
      {
        id: '8b26a560-38f1-4eeb-b30a-1f362aa60f26',
        name: '频率换算',
        path: 'frequency',
        description: 'Hz、mHz、kHz、MHz、GHz、THz、rpm、deg/s、rad/s换算'
      },
      {
        id: 'daa7031a-fbf3-4197-9331-e9b8cfab8a14',
        name: '电流换算',
        path: 'current',
        description: 'A、mA、kA换算'
      },
      {
        id: '06cbcd8f-3e03-4a67-941c-2fcfcd94ccb9',
        name: '电压换算',
        path: 'voltage',
        description: 'V、mV、kV换算'
      },
      {
        id: '0e945da7-cf72-494a-9ae7-58f71ca62a37',
        name: '体积流量换算',
        path: 'volume-flow-rate',
        description: 'mm3/s、cm3/s、ml/s、cl/s、dl/s、l/s、l/min、l/h、kl/s、kl/min、kl/h、m3/s、m3/min、m3/h、km3/s换算'
      },
      {
        id: '47d76a77-f8fc-41d8-954e-238233af46ff',
        name: '能量换算',
        path: 'energy',
        description: 'Wh、mWh、kWh、MWh、GWh、J、kJ换算'
      },
      {
        id: '2f7d8706-659d-4cee-ba90-1f744dcc30f3',
        name: '配速换算',
        path: 'pace',
        description: 's/m、min/km、s/ft、min/mi换算'
      },
      {
        id: 'bd741ad9-3f7d-455c-a3fd-0a6c262c4166',
        name: '视在功率换算',
        path: 'apparent-power',
        description: 'VA、mVA、kVA、MVA、GVA换算'
      },
      {
        id: 'aff11c27-eebf-49ce-8966-5ce127cda00f',
        name: '无功能量换算',
        path: 'reactive-energy',
        description: 'VARh、mVARh、kVARh、MVARh、GVARh换算'
      },
      {
        id: '70c83dc1-0880-4248-ab1c-dabdafe26a6f',
        name: '无功功率换算',
        path: 'reactive-power',
        description: 'VAR、mVAR、kVAR、MVAR、GVAR换算'
      }
    ]
  },
  {
    name: '编码工具',
    path: 'code',
    icon: 'ph:code',
    description: '',
    children: [
      {
        id: '270df048-55a6-4b93-b119-05e56ff0865e',
        name: 'MD5哈希',
        path: 'md5-hash',
        description: 'MD5哈希工具是一种加密算法，可为任何给定的输入数据生成唯一的哈希值。\n该工具通常用于数据完整性检查、密码存储和数字签名。'
      },
      {
        id: 'b79d1bee-eeb8-4fef-b6ed-f8aafaa33856',
        name: 'SHA哈希',
        path: 'sha-hash',
        description: 'SHA安全哈希算法主要适用于数字签名标准里面定义的数字签名。\n包括SHA-1、SHA-256、SHA-384、SHA-512。'
      },
      {
        id: 'f222e614-5d59-48ac-89c8-8f51e1e5cde5',
        name: 'AES加密解密',
        path: 'aes-cipher',
        description: ''
      },
      {
        id: 'eaba16be-59f2-44a8-92f4-db85e1500d68',
        name: 'DES加密解密',
        path: 'des-cipher',
        description: ''
      },
      {
        id: 'd9e2131a-c35f-450d-b48e-428f2d71e3a0',
        name: 'TripleDES加密解密',
        path: 'triple-des-cipher',
        description: ''
      },
      {
        id: 'ca8c9a8f-b7d7-4a37-977f-cd49960f7786',
        name: 'Rabbit加密解密',
        path: 'rabbit-cipher',
        description: ''
      },
      {
        id: '2ad37441-1128-4968-88f7-d056ffbcc760',
        name: 'RC4加密解密',
        path: 'rc4-cipher',
        description: ''
      },
      {
        id: 'bf664bca-07ba-4e48-9cb5-a48638b59184',
        name: 'RC4Drop加密解密',
        path: 'rc4-drop-cipher',
        description: ''
      },
      {
        id: 'abf7bb65-3cb8-472c-80e5-4eb1df1aa487',
        name: '编码解码',
        path: 'format-coder',
        description: ''
      },
      {
        id: 'cbdb0d7b-12e3-4fca-af4b-104a32e6390a',
        name: 'URL编码解码',
        path: 'url-coder',
        description: ''
      }
    ]
  }
]

export default routes
