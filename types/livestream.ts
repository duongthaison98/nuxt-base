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