import api from '../axios';

// 获取用户报告列表
export function getUserReportList(data) {
  return api({
    url: '/web/report/list',
    method: 'post',
    data,
  });
}