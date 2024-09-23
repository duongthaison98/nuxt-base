<template>
  <div>
    <div v-if="error">
      <p>Error loading data: {{ error.message }}</p>
    </div>
    <div v-else-if="!data">...loading</div>
    <div v-else>
      <div v-for="(item, index) in data.lstTopVideo" :key="index">
        <p>{{ item.title }}</p>
        <img :src="item.thumbnail" alt="">
      </div>
    </div>
  </div>
</template> 

<script setup>
import { getTopVideo, getFollowVideo, getSuggestVideo } from '~/service/login/index';

const lstFake = ref([
  {
    "video_id": "1b263e93-3485-4bf7-9719-4a709733c630",
    "short_uuid": "TXnuoJP6yKtrDYhvsb9Mq6",
    "channel_id": "e793fcce-a66f-49d3-8b38-dbdb1bef9406",
    "game_id": "c4b71fc0-58d2-47d1-a853-3c808f1217fb",
    "category_game_id": "cfac9605-b249-45e1-935c-cbb54214d302",
    "title": "Marvel's Spiderman 2",
    "thumbnail": "https://cdn-data.gplaydev.com/frame/TXnuoJP6yKtrDYhvsb9Mq6/TXnuoJP6yKtrDYhvsb9Mq6_1722531359.jpg",
    "description": "Marvel's Spiderman 2",
    "video_type": 0,
    "replay_url": "",
    "replay_hls": "",
    "public_status": 1,
    "status": 2,
    "live_start_time": 1722529746,
    "live_end_time": 0,
    "live_session_id": "d488a52b-40a7-46ce-aa03-e668aed663fe",
    "banned": 0,
    "notification_status": 1,
    "donate_status": 1,
    "comment_status": 1,
    "created_time": 1722529785,
    "updated_time": 1722529785,
    "channel_info": {
        "channel_id": "e793fcce-a66f-49d3-8b38-dbdb1bef9406",
        "channel_name": "SON_BG AOE",
        "channel_code": "sonbgaoe",
        "status": 0,
        "green_tick": 1,
        "avatar": "https://cdn-data.gplaydev.com/tool-upload/AQWXqQkxlf_1722328211153436133.jpg",
        "description": "Chuyên livestream đế chế",
        "organization": 0,
        "company_name": "Công CPCN GTV Việt Nam",
        "address": "275 Nguyễn Trãi",
        "phone_number": "",
        "email": "",
        "facebook": "https://www.facebook.com/sonbg98",
        "zalo": "0985394361",
        "tiktok": "SonBg",
        "discord": "SonBg",
        "tax_code": "",
        "id_card": "",
        "banned": 0,
        "created_time": 0,
        "updated_time": 0,
        "user_info": null,
        "interact": {
            "view_live": 0,
            "view": 0,
            "comment": 0,
            "like": 0,
            "share": 0,
            "follow": 0,
            "is_follow": false,
            "is_like": false
        },
        "live": null
    },
    "source": {
        "channel_id": "e793fcce-a66f-49d3-8b38-dbdb1bef9406",
        "map_id": "69124",
        "provider_type": 0,
        "rtmp_push_path": "",
        "mobile_rtmp_push_path": "",
        "stream_key": "",
        "stream_alias": "",
        "hls_play_path": "/live/smil:318ca5f8a67175c4308b2d819d8fec58a71/playlist.m3u8",
        "webrtc_play_path": "/live/318ca5f8a67175c4308b2d819d8fec58a71",
        "live_status": 0,
        "live_session_id": "",
        "live_start_time": 0,
        "cdn": {
            "cdn_rtmp": "",
            "cdn_rtmp_mobile": "",
            "cdn_live_hls": "https://video-live-evg.gplaydev.com",
            "cdn_live_webrtc": "wss://video-live-evg.gplaydev.com",
            "cdn_video_hls": "https://s3.ap-southeast-1.amazonaws.com",
            "cdn_video_url": "https://s3.ap-southeast-1.amazonaws.com"
        }
    },
    "interact": {
        "view_live": 0,
        "view": 0,
        "comment": 0,
        "like": 0,
        "share": 0,
        "follow": 0,
        "is_follow": false,
        "is_like": false
    }
}
])

const { data, error } = await useAsyncData('fetchData', async () => {
  if (process.server) {
    console.log('Running on the server');
  } else if (process.client) {
    console.log('Running on the client');
  }

  try {
    const resTopvideo = await getTopVideo();
    return {
      lstTopVideo: resTopvideo.Data || []
    }
    // const [
    //   resTopvideo,
    //   resFollowVideo,
    //   resSuggestVideo
    // ] = await Promise.all([
    //   getTopVideo(),
    //   getFollowVideo(),
    //   getSuggestVideo()
    // ])

    // console.log("resTopvideo", resTopvideo.Data);
    // console.log("resFollowVideo", resFollowVideo.Data);
    // console.log("resSuggestVideo", resSuggestVideo.Data);
    
    // // Return the results as an object
    // return {
    //   lstTopVideo: resTopvideo.Data,
    //   lstFollowVideo: resFollowVideo.Data,
    //   lstSuggestVideo: resSuggestVideo.Data
    // }
  } catch (error) {
    console.log(error);
    return [];
  }
})

</script>