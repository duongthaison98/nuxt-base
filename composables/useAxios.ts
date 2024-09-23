interface RequestOptions {
  method: 'get' | 'post' | 'put' | 'delete';
  params?: Record<string, any>;
  data?: Record<string, any>;
}

export default function useAxios(url: string, options: RequestOptions) {
  const nuxtApp: any = useNuxtApp();

  return nuxtApp.$service({
    url,
    method: options.method,
    params: options.params,
    data: options.data,
  });
}
