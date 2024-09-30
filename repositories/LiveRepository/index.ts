import service from '../BaseRepository';

const entryPoint = '/livestream/api/v1.0/video';

const LiveRepository = {
  getTopVideo() {
    return service.get(`${entryPoint}/top`);
  },
  getFollowVideo() {
    return service.get(`${entryPoint}/follow`);
  },
  getSuggestVideo() {
    return service.get(`${entryPoint}/suggestions`);
  },
  getVideoByShortId(id: string) {
    return service.get(`${entryPoint}/detail/short/${id}`);
  }
}

export default LiveRepository;