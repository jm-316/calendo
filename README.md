# 목차

0. [Calendo 🗓️](#Calendo-🗓️)
1. [프로젝트 기획 동기](#프로젝트-기획-동기)
2. [기술 스택](#기술-스택)
4. [시연 영상](#시연-영상)
5. [문제해결 및 프로젝트 후기](#문제-해결-및-프로젝트-후기)
6. [Calendo 실행 명령어](#Calendo-실행-명령어)

<br />

# Calendo 🗓️

캘린두는 To-Do 리스트와  일정 관리를 한 곳에서 쉽게 확인하고 사용할 수 있는 웹 사이트입니다. 

[Calendo 이용해보러 가기](https://mycalendo.vercel.app)

## 프로젝트 기획 동기

Calendo는 내가 자주 사용하는 것을 직접 만들어보자라는 아이디어에서 출발했습니다. <br />
평소 일정 관리를 위해 구글 캘린더를 자주 사용하다보니 이와 유사한 기능을 제공하는 웹 사이트를 만들게 되었습니다.

<br />

## 기술 스택

- **Frontend**: React, React-Query, Redux-Toolkit, TailwindCSS, TypeScript
- **Backend**: Superbase
- **Build**: Vite
- **Deploy**: Vercel
<br />

## 시연 영상

https://github.com/user-attachments/assets/812540bd-290b-400c-bc39-30e24bdd711e

<br />

## 문제 해결 및 프로젝트 후기

### 1. 새로고침 문제

Calendo는 사이드바에 3개의 버튼이 있고, 그중에 Calendar 페이지에서는 사용자가 day 또는 month 뷰를 선택할 수 있게 만들었습니다.  

처음에는 사용자가 원하는 뷰를 선택하고 이동하는 기능까지는 구현했지만, 새로고침할 때마다 이전에 선택했던 상태가 초기화되는 문제가 발생했습니다.

이 문제를 해결하기 위해 몇 가지 방법을 고려했는데, 먼저 DB에 저장하는 방법은 해당 데이터가 영구적으로 저장이 필요한 데이터가 아니라서 제외했습니다. 그리고 Local Storage에 저장하는 방법과 Session Storage에 저장하는 방법 중 Session Storage에 저장하는 방법을 선택했습니다.

해당 프로젝트를 구상할 때 사용자가 처음 사이트에 들어오면 보이는 화면은 Dashboard 페이지이며, Calendar 페이지에서 선택한 부분도 사용하는 동안에만 선택한 뷰가 보이고 종료 후 다시 들어오면 day가 먼저 보이도록 구상했습니다.
그래서 Local Storage의 경우 브라우저를 종료해도 데이터가 유지되므로 DB와 마찬가지로 적합하지 않아서 제외했고, 세션이 종료되면 데이터가 삭제되는 Session Storage에 저장하는 방법으로 문제를 해결했습니다.

또한 상태관리를 redux-toolkit으로 사용하고 있었기 때문에  Session Storage에 데이터를 쉽게 저장할 수 있도록 redux-persist 라이브러리를 사용했습니다. 

### 2. To-Do 입력 오류

To-Do 입력 방식은 구글 캘린더의 할 일 방식을 참고해서 구현했습니다.구글 캘린더에서는 이미 입력된 내용을 수정할 때 페이지 이동이나 모달창 없이 바로 내용을 수정할 수 있는 방식이었습니다.

처음에 영어로 입력할 때는 문제가 없었지만, 한글로 입력할 경우 자금, 모음이 분리되는 현상이 발생했습니다. 

이 문제를 해결하기 위해 검색을 하니 React의 value 속성을 사용하는 경우 controlled component가 되어 필드의 값이 실시간으로 업데이트됩니다. 이때 한글의 경우 자음과 모음을 조합해서 하나의 글자로 완성해야 하는데 필드의 값이 바로 변경되면서 문제가 생긴 게 아닐까 라는 생각이 들었습니다. 그래서 uncontrolled components 방식인 defaultValue를 활용했습니다. 

해당 방법을 사용한 이유는 To-Do에서 내용을 수정하기 전에 DB에서 todos 데이터를 불러와 화면에 먼저 보여줘야 했기 때문에 defaultValue를 사용해서 초깃값으로 렌더링 처리를 하고, 이후 값은 React가 제어하지 않게 되어 한글이 분리되는 문제를 해결할 수  있었습니다. 

### 프로젝트 후기

그동안 팀 프로젝트를 제외하면 강의를 보고 따라 만드는 작업을 주로 하다가 처음으로 혼자서 기획부터 배포까지 모든 과정을 진행했습니다.

진행하면서 아쉬웠던 점은 기획 단계에서 “이 정도면 괜찮겠지”라고 생각했던 부분들이 실제 작업에 들어가면서 세세하게 기획하지 않아 시간이 더 오래 걸리거나 여러 번 수정해야 했습니다.  특히 UI/UX 부분에서 폰트 크기, 색상 조합, 반응형 디자인 등을 자세히 기획하지 않아 기능 구현 후 디자인 조정에 많은 시간이 소요되었습니다.

반면에 이전 프로젝트에서는 상태관리를  Context API로 관리했다면 이번에는  Redux Toolkit으로 상태 관리를 하고 Redux-Persist로 세션 저장소를 구현하는 방법을 배울 수 있었습니다. 또한, Recharts 라이브러리를 활용해 데이터 시각화를 구현하면서 새로운 라이브러리를 공부하고 적용할 수 있어서 좋았습니다.  

이번 프로젝트를 통해 기술적인 부분도 중요하지만 기획의 중요성과 세부적인 작업 계획의 필요성을 깨달았습니다.  다음 프로젝트에서는 아쉬웠던 부분들을 개선해서 더 좋은 결과물을 만들고 싶습니다. 

<br />

## Calendo 실행 명령어

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어를 입력합니다.

```shell
$ npm install
$ npm run dev
```

2. 디렉토리 root 위치에 .env 파일을 생성하여 환경설정을 입력합니다.

```javascript
VITE_SUPABASE_URL = <YOUR_SUPABASE_URL>
VITE_SUPABASE_KEY = <YOUR_SUPABASE_KEY>
```

3.

```shell
$ npm start
```
