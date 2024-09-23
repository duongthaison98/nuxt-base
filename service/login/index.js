import { useNuxtApp } from "nuxt/app";

const entryPoint = '/livestream/api/v1.0/video';

export const getTopVideo = async () => {
  const { $service } = useNuxtApp()
  // console.log("useNuxtApp", useNuxtApp());
  
  return $service({
    url: `${entryPoint}/top`,
    method: 'get',
  })
}

export const getFollowVideo = async () => {
  const { $service } = useNuxtApp()
  return $service({
    url: `${entryPoint}/follow`,
    method: 'get',
  })
}

export const getSuggestVideo = async () => {
  // const service = useService()
  const { $service } = useNuxtApp()
  return $service({
    url: `${entryPoint}/suggestions`,
    method: 'get',
  })
}