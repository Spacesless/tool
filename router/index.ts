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
    name: '数据换算',
    path: 'conversion',
    icon: 'fluent:convert-range-24-regular',
    description: '',
    children: [
      {
        name: '角度换算',
        path: 'angle',
        description: ''
      },
      {
        name: '字节换算',
        path: 'byte',
        description: ''
      },
      {
        name: '长度换算',
        path: 'length',
        description: ''
      },
      {
        name: '质量换算',
        path: 'mass',
        description: ''
      },
      {
        name: '温度换算',
        path: 'temperature',
        description: ''
      },
      {
        name: '时间换算',
        path: 'time',
        description: ''
      },
      {
        name: '体积换算',
        path: 'volume',
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
        description: ''
      },
      {
        name: '生活垃圾',
        path: 'garbage',
        description: ''
      },
      {
        name: '成语大全',
        path: 'idioms',
        description: ''
      },
      {
        name: '车牌号信息',
        path: 'license-plate-territory',
        description: ''
      },
      {
        name: '万年历',
        path: 'perpetual-calendar',
        description: ''
      },
      {
        name: '邮政编码',
        path: 'postcode',
        description: ''
      },
      {
        name: '二维码生成',
        path: 'qrcode-generator',
        description: ''
      },
      {
        name: '二十四节气',
        path: 'solar-terms',
        description: ''
      },
      {
        name: '十二时辰',
        path: 'twelve-hours',
        description: ''
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
        name: 'MD5编码',
        path: 'hash-hex',
        description: 'MD5在线编码，16位、32位大小写'
      },
      {
        name: 'SHA编码',
        path: 'hash-sha',
        description: 'SHA-1、SHA-256、SHA-512编码'
      },
      {
        name: '加密解密',
        path: 'encrypt-decrypt',
        description: 'AES、DES、TripleDES、Rabbit、RC4、RC4Drop加密解密'
      },
      {
        name: '编码解码',
        path: 'encoders',
        description: 'Base64、Utf8、Utf16、Utf16LE、URL编码解码'
      }
    ]
  }
]

export default routes
