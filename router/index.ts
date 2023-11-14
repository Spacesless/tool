const routes = [
  {
    name: '文本工具',
    path: 'text',
    icon: 'ion:text-outline',
    description: '',
    children: [
      {
        name: '简繁转换',
        path: 'chinese-convert',
        description: ''
      },
      {
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
        name: '星座运势',
        path: 'constellation',
        description: '十二星座每日、每月、每年运势；\n根据日期或星座名称，查询星座详细信息。'
      },
      {
        name: '生活垃圾',
        path: 'garbage',
        description: '生活垃圾分类查询，可回收物、有害垃圾、湿垃圾、干垃圾'
      },
      {
        name: '成语大全',
        path: 'idioms',
        description: '根据成语查询详细信息，如：详解、同义词、反义词、读音等信息；\n目前总计约收录4.5万组成语。'
      },
      {
        name: '车牌归属地',
        path: 'license-plate-territory',
        description: '根据国内车牌号或车牌前缀查询所属归属省份城市'
      },
      {
        name: '万年历',
        path: 'perpetual-calendar',
        description: ''
      },
      {
        name: '邮政编码',
        path: 'postcode',
        description: '邮政编码信息查询，根据地区、邮政编码查询相关信息'
      },
      {
        name: '二维码生成',
        path: 'qrcode-generator',
        description: 'QRcode生成器是一种用于生成文本二维码的工具。\n用户可以输入或粘贴文本到工具中，工具会自动生成相应的QR码并在界面上显示出来。'
      },
      {
        name: '二十四节气',
        path: 'solar-terms',
        description: '二十四节气查询，根据年份查询相关信息'
      },
      {
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
        name: '角度换算',
        path: 'angle',
        description: 'deg、rad、grad、arcmin、arcsec换算'
      },
      {
        name: '面积换算',
        path: 'area',
        description: 'mm2、cm2、m2、ha、km2、in2、ft2、ac、mi2换算'
      },
      {
        name: '字节换算',
        path: 'byte',
        description: 'b、Kb、Mb、Gb、Tb、B、KB、MB、GB、TB换算'
      },
      {
        name: '长度换算',
        path: 'length',
        description: 'mm、cm、m、in、ft-us、ft、mi换算'
      },
      {
        name: '质量换算',
        path: 'mass',
        description: 'mcg、mg、g、kg、lb、oz、mt、t换算'
      },
      {
        name: '速度换算',
        path: 'speed',
        description: 'm/s、km/h、m/h、knot、ft/s换算'
      },
      {
        name: '温度换算',
        path: 'temperature',
        description: '摄氏度、华氏度、开尔文、兰氏度换算'
      },
      {
        name: '时间换算',
        path: 'time',
        description: 'ns、mu、ms、s、min、h、d、week、month、year换算'
      },
      {
        name: '体积换算',
        path: 'volume',
        description: '立方毫米、立方厘米、毫升、升、千升、立方米、立方千米、茶匙、立方英寸、液量盎司、杯子、品脱、夸特、加仑、立方码、立方英尺换算'
      },
      {
        name: '频率换算',
        path: 'frequency',
        description: 'Hz、mHz、kHz、MHz、GHz、THz、rpm、deg/s、rad/s换算'
      },
      {
        name: '电流换算',
        path: 'current',
        description: 'A、mA、kA换算'
      },
      {
        name: '电压换算',
        path: 'voltage',
        description: 'V、mV、kV换算'
      },
      {
        name: '体积流量换算',
        path: 'volume-flow-rate',
        description: 'mm3/s、cm3/s、ml/s、cl/s、dl/s、l/s、l/min、l/h、kl/s、kl/min、kl/h、m3/s、m3/min、m3/h、km3/s换算'
      },
      {
        name: '能量换算',
        path: 'energy',
        description: 'Wh、mWh、kWh、MWh、GWh、J、kJ换算'
      },
      {
        name: '配速换算',
        path: 'pace',
        description: 's/m、min/km、s/ft、min/mi换算'
      },
      {
        name: '视在功率换算',
        path: 'apparent-power',
        description: 'VA、mVA、kVA、MVA、GVA换算'
      },
      {
        name: '无功能量换算',
        path: 'reactive-energy',
        description: 'VARh、mVARh、kVARh、MVARh、GVARh换算'
      },
      {
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
        name: 'MD5哈希',
        path: 'md5-hash',
        description: 'MD5哈希工具是一种加密算法，可为任何给定的输入数据生成唯一的哈希值。\n该工具通常用于数据完整性检查、密码存储和数字签名。'
      },
      {
        name: 'SHA哈希',
        path: 'sha-hash',
        description: 'SHA安全哈希算法主要适用于数字签名标准里面定义的数字签名。\n包括SHA-1、SHA-256、SHA-384、SHA-512。'
      },
      {
        name: 'AES加密解密',
        path: 'aes-cipher',
        description: ''
      },
      {
        name: 'DES加密解密',
        path: 'des-cipher',
        description: ''
      },
      {
        name: 'TripleDES加密解密',
        path: 'triple-des-cipher',
        description: ''
      },
      {
        name: 'Rabbit加密解密',
        path: 'rabbit-cipher',
        description: ''
      },
      {
        name: 'RC4加密解密',
        path: 'rc4-cipher',
        description: ''
      },
      {
        name: 'RC4Drop加密解密',
        path: 'rc4-drop-cipher',
        description: ''
      },
      {
        name: '编码解码',
        path: 'encoders',
        description: ''
      }
    ]
  }
]

export default routes
