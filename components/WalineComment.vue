<template>
  <section class="section comment">
    <h2 id="thumbsup" class="section__title">
      工具评价
    </h2>

    <div id="waline" />
  </section>
</template>

<script setup lang="ts">
import { init, type WalineEmojiInfo, type WalineInstance } from '@waline/client'
import '@waline/client/waline.css'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const path = computed(() => location.origin + location.pathname)
const emoji: WalineEmojiInfo[] = [
  {
    name: '贴吧',
    folder: 'https://cos.timelessq.com/static/emojis/tieba',
    prefix: 'tieba_',
    type: 'png',
    icon: 'antic',
    items: ['laugh', 'joy', 'antic', 'vomit_water', 'sob', 'wink', 'cry', 'dizzy_face', 'heart_eyes', 'huge_sweat', 'rage', 'satisfied', 'sleep', 'smirk', 'sunglasses', 'sweat', 'vomit', 'lovely', 'angry', 'annoyed', 'awkward', 'cute', 'pick_nose', 'shy', 'yum', 'grievance', 'chuckle', 'crazy', 'hurt', 'look_down', 'rolling_eyes', 'agree', 'sorry', 'surprised', 'wow', 'doubt', 'thumbsup', 'v', 'metal', 'ok', 'heart', 'red_scarf', 'sofa', 'moon', 'pill', 'rainbow', 'rose', 'shit', 'banana', 'toilet_paper', 'cake', 'gift', 'candle', 'coffee']
  },
  {
    name: 'QQ',
    folder: 'https://cos.timelessq.com/static/emojis/qq',
    prefix: 'qq_',
    type: 'gif',
    icon: 'grin',
    items: [
      'smile', 'mouth_squirm', 'heart_eyes', 'flushed', 'sunglasses', 'sob', 'shy', 'silent', 'sleep', 'cry', 'awkward', 'rage', 'yum', 'grin', 'confounded', 'sad', 'cool', 'cold_sweat', 'crazy', 'vomit', 'chuckle', 'lovely', 'rolling_eyes', 'arrogant', 'yummy', 'sleepy', 'scared', 'sweat', 'laugh', 'solder', 'fighting', 'scold', 'shush', 'dizzy_face', 'mad', 'feeble', 'skull', 'knock', 'bye', 'pick_nose', 'clap', 'embarassed', 'snigger', 'annoyed_left', 'annoyed_right', 'yawn', 'look_down', 'grievance', 'pensive', 'smirk', 'kiss_right', 'kiss', 'fearful', 'poor', 'wink', 'joy', 'doge', 'cover_face_cry', 'whatever', 'lift_check', 'cute', 'antic', 'vomit_blood', 'surprised', 'pock_face', 'tangled', 'pretty', 'mask_fighting', 'mask_hug', 'mask', 'working', 'busy', 'headache', 'worry', 'cover_face', 'burning_eyes', 'wowyo', 'hair_loss', 'question_mask', 'peep', 'emm', 'waterlemon_face', 'rolling_face', 'hug', 'doubt', 'sweat1', 'white-yum', 'white1', 'white2', 'white_kiss', 'white_shit', 'white_slap', 'white_sunglasses', 'white_thumbsup', 'bear1', 'bear2', 'bear3', 'bear4', 'bear5', 'bird1', 'bird2', 'bird3', 'bird4', 'heart', 'rose', 'rose_dead', 'ghost', 'anger', 'lip', 'broken_heart', 'coffee', 'alpaca', 'hongbao', 'firecracker', 'lantern', 'xi', 'thumbsup', 'ok', 'hold_fist', 'hand_shake', 'come', 'v', 'fist', 'diss', 'thumbsdown', 'metal', 'no', 'lemon_face', 'moon', 'sun', 'pig', 'knife', 'hocho', 'gun', 'tea', 'shit', 'tada', 'candy', 'watermelon', 'rice', 'feeding_bottle', 'beer', 'karaoke', 'cake', 'egg', 'bomb', 'dollar', 'light', 'gift', 'flower', 'plane', 'candle', 'ladybug', 'pill', 'basketball', 'pingpong', 'soccer', 'panda', 'pinwheel', 'ramen', 'umbrella', 'banana', 'toilet_paper', 'bag', 'fa', 'handsome', 'mail', 'balloon', 'board', 'bow', 'boy1', 'boy2', 'bulb', 'car', 'clock', 'cloudy', 'crab', 'example', 'frog', 'rain', 'ring', 'sofa', 'train_body', 'train_tail', 'tran_head', '1', '10', '11', '2', '3', '4', '5', '6', '7', '8', '9', 'surrender', 'taiji_boy', 'taiji_girl'
    ]
  },
  {
    name: 'BiliBili',
    folder: 'https://cos.timelessq.com/static/emojis/bilibili',
    prefix: 'bb_',
    type: 'png',
    icon: 'cute',
    items: [
      'doge', 'sob', 'heart_eyes', 'cry', 'sad', 'smirk', 'sweat', 'antic', 'miantian', 'spit_blodd', 'tiaokan', 'zhoumei', 'bye', 'clap', 'confused', 'crazy', 'cute', 'money', 'rage', 'scared', 'shy', 'think', 'vomit', 'sleepy', 'flushed', 'kiss', 'rolling_eyes', 'thumbsup', 'yum', 'yum1', 'lovely', 'sunglasses', 'pick_nose', 'annoyed', 'awkward', 'grievance', 'no_mouth', 'slap', 'slient', 'sleep', 'greddy', 'chuckle', 'nosebleed', 'not_care', 'trollface', 'face_cry', 'look_down', 'mask', 'dizzy_face', 'test', 'question_mask'
    ]
  },
  {
    name: '微博',
    folder: 'https://cos.timelessq.com/static/emojis/weibo',
    prefix: 'weibo_',
    type: 'png',
    icon: 'watermalon',
    items: [
      'smile', 'lovely', 'blush', 'grin', 'laugh', 'joy', 'angry', 'bye', 'hammer', 'kiss', 'love', 'mask', 'money', 'quiet', 'rage', 'sad', 'shy', 'sick', 'slient', 'smirk', 'slap', 'antic', 'desire', 'longing', 'no_idea', 'look_down', 'clap', 'yum', 'sleep', 'dizzy_face', 'chuckle', 'disappointed', 'flushed', 'heart_eyes', 'no', 'shuai', 'suprised', 'think', 'vomit', 'scream', 'sleepy', 'sob', 'sunglasses', 'greddy', 'pick_nose', 'annoyed', 'awkward', 'confused', 'grievance', 'poor', 'wink', 'rolling_eyes', 'watermalon', 'annoyed_left', 'annoyed_right', 'yawn', 'hufen', 'doge', 'husky', 'dog_annoyed', 'dog_bye', 'dog_consider', 'dog_cry', 'dog_joy', 'dog_laugh', 'dog_sweat', 'dog_think', 'dog_yum', 'cat', 'cat_annoyed', 'cat_bye', 'cat_cry', 'cat_think', 'girl_annoyed', 'boy', 'girl', 'panda', 'pig', 'rabbit', 'ultraman', 'wool_group', 'yan', 'xi', 'soap', 'meng', 'jiong', 'geili', 'shenma', 'alpaca'
    ]
  },
  {
    name: 'B站小黄脸',
    folder: 'https://cos.timelessq.com/static/emojis/bmoji',
    prefix: 'bmoji_',
    type: 'png',
    icon: 'call',
    items: [
      'unavailble_doge', 'hot', 'silme', 'mask', 'doge', 'bravo', 'ok', 'wow', 'not_open', 'onlooker', 'comical', 'grin', 'call', 'hei', 'naughty', 'bao_fu', 'crack_melon_seeds', 'smile_cry', 'tibetan_fox', 'blush', 'give_love', 'dudu', 'oh', 'heartbeat', 'lemon', 'wail', 'blushing', 'what', 'haha', 'smirking', 'hehe', 'titter', 'ah', 'um', 'insidious', 'jiong', 'stagnate', 'heihei', 'wa', 'cute', 'emm', 'good', 'applaud', 'um_2', 'oops', 'sad', 'hem', 'hurt', 'cold', 'ill', 'scared', 'spit', 'palming', 'shh', 'hmm', 'bye', 'roll_eye', 'sleeply', 'hard', 'cool', 'unhappy', 'grimace', 'aaa', 'angry', 'shui_dao', 'koi', 'fu', 'drumstick', 'snow', 'cheers', 'love', 'win', 'strong', 'thanks', 'please', 'thumb_up', 'hug_together', 'knees', 'my_fault', 'abandon'
    ]
  }
]

let waline: WalineInstance | null
onMounted(() => {
  waline = init({
    el: '#waline',
    path: path.value,
    search: false,
    imageUploader: false,
    login: 'disable',
    dark: isDark.value,
    reaction: [
      'https://cos.timelessq.com/static/emojis/tieba/tieba_lovely.png',
      'https://cos.timelessq.com/static/emojis/tieba/tieba_agree.png',
      'https://cos.timelessq.com/static/emojis/tieba/tieba_smirk.png',
      'https://cos.timelessq.com/static/emojis/tieba/tieba_pick_nose.png',
      'https://cos.timelessq.com/static/emojis/tieba/tieba_look_down.png'
    ],
    locale: {
      reactionTitle: '你认为这个工具怎么样？'
    },
    serverURL: location.origin + '/comment',
    emoji
  })
})

watch(() => isDark.value, (val) => {
  waline?.update({
    dark: val
  })
})
</script>

<style lang="scss" scoped>
.comment {
  padding: 16px;

  --waline-theme-color: var(--el-color-primary);
  --waline-active-color: var(--el-color-primary-light-3);
}
</style>
