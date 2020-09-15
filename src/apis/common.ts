import http from '@/utils/http'

export async function apiGetTopics() {
  const url = '/topics'
  return await http.get(url)
}
