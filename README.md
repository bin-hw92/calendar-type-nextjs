# 개인사이드프로젝트
## 달력 항 일 추가 기능 웹 사이트 부분

- 원래 calendar-backend, calendar-type-frontend 프로젝트 내용을 nextjs로 변경한 프로젝트

- backend와 frontend를 합쳐서 하나의 node만으로 작동되게 할려고 했으나... 아직 실력 부족
- **backend**
  - back 부분은 server.js 생성 후 mongoDB에 연결 및 koa를 그대로 사용해서 서버 실행되게 적용
  - DB부분은 backend라는 폴더에 js로 등록되어 있음
- **frontend**
  - calendar-type-frontend 부분을 대부분 가지고 왔으며, 리덕스 스토어 연결 부분만 nextjs에 맞게 변경
  - 리덕스 부분은 store 폴더에 넣어둠

- 일단 calendar-type-frontend 프로젝트에서 새로운 기능 개발 완료 후 계속 nextJs로 마이그레이션하는 작업 진행 예정
- 필요 사항은 https://github.com/bin-hw92/calendar-backend  부분 참조하면 됩니다.
- 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
