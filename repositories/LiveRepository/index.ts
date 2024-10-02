import service from '../baseRepository';

import type { PayloadChat } from '@/types';

const prefixVideo = '/livestream/api/v1.0/video';
const prefixMessage = '/chat-v2/api/v2.0/livestream/message';

const LiveRepository = {
  getTopVideo() {
    return service.get(`${prefixVideo}/top`);
  },
  getFollowVideo() {
    return service.get(`${prefixVideo}/follow`);
  },
  getSuggestVideo() {
    return service.get(`${prefixVideo}/suggestions`);
  },
  getVideoByShortId(id: string) {
    return service.get(`${prefixVideo}/detail/short/${id}`);
  },
  getAllMessage(videoId: string, params: Object) {
    return service.get(`${prefixMessage}/${videoId}`, params);
  },
  createMessage(data: PayloadChat) {
    return service.post(`${prefixMessage}`, data);
  }
}

export default LiveRepository;