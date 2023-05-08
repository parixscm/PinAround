# 🗺 PinAround

## 💁🏻 소개

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/108685090/236779380-1006f7e4-0bc1-4948-baa2-2cdd8f540647.gif)

유저들과 여행에 대한 추억을 공유할 수 있는 애플리케이션입니다.
<br/>친구들과 여행을 다녀온 이후에 여행지에서 보낸 추억을 기록하기 위해 구현했습니다.
<br/>개인으로 진행한 프로젝트입니다.

<br/>

## 🚀 개발 목표

1. 무분별한 useState 사용을 지양하고 useRef를 대신 사용하는 등 애플리케이션 성능 개선에 대해 고민했습니다.
2. useEffect 훅을 적절하게 사용하는 등 리액트 애플리케이션의 동작 방식에 대한 이해를 높이기 위해 고민했습니다.
3. 타입스크립트를 사용해 개발 과정의 효율을 높이기 위해 고민했습니다.
4. Mapbox 지도 API를 사용하면서 다채로운 애플리케이션을 어떻게 구현할 수 있을지 고민했습니다.

<br/>

## ✅ 구현 사항

### 새로운 Pin 생성하기

## ![ezgif com-video-to-gif (2)](https://user-images.githubusercontent.com/108685090/236784800-c37e3b57-cfa6-432b-a882-19b9839cc7e6.gif)

- 새로운 Pin을 생성하면서 팝업이 깜빡이면서 등장하는 이슈가 발생했습니다.
  - 이는 쾌적한 유저 경험을 저해할 수 있다고 판단해 기존 로직을 수정하는 트러블슈팅 과정을 거쳤습니다.
  - https://velog.io/@jin0e/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%99%94%EB%A9%B4-%EA%B9%9C%EB%B9%A1%EA%B1%B0%EB%A6%BC-%ED%98%84%EC%83%81-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0
- 트러블슈팅 과정을 통해 useEffect 훅에 대한 확실한 이해를 굳힐 수 있었습니다.

### Pin 내용 열람하기

![ezgif com-video-to-gif (1)](https://user-images.githubusercontent.com/108685090/236784668-5b03ccf5-006d-48ff-a219-5e86ac8df823.gif)

- 본인이 작성한 핀과 다른 유저가 작성한 핀이 구별됩니다.
  ex) 본인은 붉은색, 다른 유저는 보라색 핀으로 표시됩니다.
- 타입 관리를 통해 Pin 정보에 접근함으로써 즉각적인 에러 해결이 가능했습니다.
- 이미지 파일도 업로드 하는 기능을 추가할 예정입니다.

<br/>

## 💻 기술 스택

### 클라이언트

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 서버/데이터베이스

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
