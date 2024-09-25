import BaseRepository from '../BaseRepository';

const entryPoint = '/livestream/api/v1.0/video';

export default class LiveRepository extends BaseRepository {
  getTopVideo = () => this.get(`${entryPoint}/top`);
  getFollowVideo = () => this.get(`${entryPoint}/follow`);
  getSuggestVideo = () => this.get(`${entryPoint}/suggestions`);
  getVideoByShortId = (id: string) => this.get(`${entryPoint}/detail/short/${id}`);
}