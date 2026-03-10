import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://api.example.com';

export const report = [
  http.get(`${BASE_URL}/api/test`, () => {
    return HttpResponse.json(
      {
        message: 'GET请求成功',
        data: {
          id: 1,
          name: '测试数据',
          value: 123,
        },
      },
      { code: 200 },
    );
  }),

  http.post(`${BASE_URL}/api/test`, async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json(
      {
        message: 'POST请求成功',
        data: {
          ...data,
          id: Date.now(),
        },
      },
      { code: 201 },
    );
  }),

  http.post(`${BASE_URL}/web/report/list`, async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json(
      {
        code: 200,
        message: '获取报告列表成功',
        data: {
          list: [
            {
              id: 1,
              title: '测试报告1',
              content: '这是测试报告1的内容',
              createTime: '2024-01-01 10:00:00',
            },
            {
              id: 2,
              title: '测试报告2',
              content: '这是测试报告2的内容',
              createTime: '2024-01-02 10:00:00',
            },
          ],
          total: 2,
          page: data.page || 1,
          pageSize: data.pageSize || 10,
        },
      },
      { code: 200 },
    );
  }),
];
