const entryPoint = '/livestream/api/v1.0/video';

export const LivestreamApi = {
  getTopVideo: `${entryPoint}/top`,
  getFollowVideo: `${entryPoint}/follow`,
  getSuggestVideo: `${entryPoint}/suggestions`,
  getVideoByShortId: (id: string) => `${entryPoint}/detail/short/${id}`
}