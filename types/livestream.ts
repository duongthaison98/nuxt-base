export interface Comments {
  avatar_url: string;
  channel_id: string;
  content: string;
  created_time: number;
  display_name: string;
  message_id: string;
  role: number;
  text_color: string;
  type: number;
  user_uuid: string;
}

export type ListComments = Comments[];

export interface PayloadChat {
  channel_id: string;
  content: string;
  text_color: string;
}

export interface ParamMessage {
  last_time: number | string;
  size: number;
}

export interface VideoData {
  video_id: string;
  short_uuid: string;
  channel_id: string;
  game_id: string;
  category_game_id: string;
  title: string;
  thumbnail: string;
  description: string;
  video_type: number;
  replay_url: string;
  replay_hls: string;
  public_status: number;
  status: number;
  live_start_time: number;
  live_end_time: number;
  live_session_id: string;
  banned: number;
  notification_status: number;
  donate_status: number;
  comment_status: number;
  created_time: number;
  updated_time: number;
  channel_info: ChannelInfo;
  source: Source;
  interact: Interact;
}

export type ListVideo = VideoData[];

export interface ChannelInfo {
  channel_id: string;
  channel_name: string;
  channel_code: string;
  status: number;
  green_tick: number;
  avatar: string;
  description: string;
  organization: number;
  company_name: string;
  address: string;
  phone_number: string;
  email: string;
  facebook: string;
  zalo: string;
  tiktok: string;
  discord: string;
  tax_code: string;
  id_card: string;
  banned: number;
  created_time: number;
  updated_time: number;
  user_info: null | object;
  interact: Interact;
  live: null | object;
}

export interface Source {
  channel_id: string;
  map_id: string;
  provider_type: number;
  rtmp_push_path: string;
  mobile_rtmp_push_path: string;
  stream_key: string;
  stream_alias: string;
  hls_play_path: string;
  webrtc_play_path: string;
  live_status: number;
  live_session_id: string;
  live_start_time: number;
  cdn: Cdn;
}

export interface Cdn {
  cdn_rtmp: string;
  cdn_rtmp_mobile: string;
  cdn_live_hls: string;
  cdn_live_webrtc: string;
  cdn_video_hls: string;
  cdn_video_url: string;
}

export interface Interact {
  view_live: number;
  view: number;
  comment: number;
  like: number;
  share: number;
  follow: number;
  is_follow: boolean;
  is_like: boolean;
}