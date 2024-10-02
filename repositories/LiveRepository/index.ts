import service from '../baseRepository';

import type { PayloadChat, ParamMessage } from '@/types';

const prefixVideo = '/livestream/api/v1.0/video';
const prefixMessage = '/chat-v2/api/v2.0/livestream/message';

export const getTopVideo = () => {
  return service.get(`${prefixVideo}/top`);
}
export const getFollowVideo = () => {
  return service.get(`${prefixVideo}/follow`);
}
export const getSuggestVideo = () => {
  return service.get(`${prefixVideo}/suggestions`);
}
export const getVideoByShortId = (id: string) => {
  return service.get(`${prefixVideo}/detail/short/${id}`);
}
export const getAllMessage = (videoId: string, params: ParamMessage) => {
  return service.get(`${prefixMessage}/${videoId}`, params);
}
export const createMessage = (data: PayloadChat) => {
  return service.post(`${prefixMessage}`, data);
}