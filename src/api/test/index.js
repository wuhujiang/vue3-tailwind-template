import api from '../axios';

// 测试GET请求
export function testGet() {
  return api({
    url: '/api/test',
    method: 'get',
  });
}

// 测试POST请求
export function testPost(data) {
  return api({
    url: '/api/test',
    method: 'post',
    data,
  });
}
