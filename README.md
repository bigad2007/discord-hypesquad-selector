# Discord HypeSquad House Selector (디스코드 하이프스쿼드 배지 원클릭 선택기)

> [ 본 스크립트는 교육 및 연구 목적으로 제작되었습니다 ]  
> [ FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY ]

<div align="center">

[![YouTube Channel](https://img.shields.io/badge/YouTube-@Bigad2007-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@Bigad2007)
[![Discord Server](https://img.shields.io/badge/Discord-Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/bE5fAxyNWj)
[![Author](https://img.shields.io/badge/Creator-비가드_(Bigad)-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://www.youtube.com/@Bigad2007)

</div>

---

## 📌 언어 선택 / Select Language

- [한국어 (Korean)](#-한국어-korean)
- [English](#-english)

---

## 🇰🇷 한국어 (Korean)

### 1. 개요 (Overview)
`discord-hypesquad-selector.js`는 디스코드 웹 환경에서 별도의 외부 프로그램 설치나 수동 토큰 복사 없이, 브라우저 개발자 도구(`F12`) 콘솔을 통해 3종의 공식 HypeSquad 배지(Bravery, Brilliance, Balance)를 시각적으로 확인하고 원클릭으로 프로필에 영구 등록할 수 있는 도구입니다.

### 2. 공식 커뮤니티 & 유튜브 채널 (Official Links)
- 📺 **공식 유튜브 채널**: **[https://www.youtube.com/@Bigad2007](https://www.youtube.com/@Bigad2007)**  
  비가드 유튜브 채널을 구독하시면 **더 많은 디스코드 유용 스크립트, 자동화 툴, 프로필 커스텀 팁 및 영상 튜토리얼**을 가장 빠르게 확인하실 수 있습니다!
- 💬 **공식 디스코드 서버**: **[https://discord.gg/bE5fAxyNWj](https://discord.gg/bE5fAxyNWj)**  
  스크립트 사용 중 문의 사항이나 최신 업데이트 소식은 공식 디스코드 커뮤니티에서 실시간으로 확인하실 수 있습니다.

### 3. 주요 기능 (Features)
- **네이티브 스타일 팝업 UI**: 디스코드 테마와 완벽히 호환되는 모달 팝업 제공
- **6단계 다중 토큰 자동 스캔**: 격리 스토리지, Webpack 청크 캐시, IndexedDB 등을 자동 탐색하여 유효 토큰 추출 (수동 복사 불필요)
- **401 Unauthorized 방지**: 브라우저 보안 규격에 맞춘 헤더 및 엔드포인트 자동 주입
- **실시간 다국어 지원**: 상단 버튼 클릭 한 번으로 한국어/영어 즉시 전환
- **고화질 공식 벡터/에셋**: 깨짐 없는 고화질 배지 그래픽 렌더링

### 4. 사용 방법 (How to Use)
1. 웹 브라우저(Chrome, Edge 등)에서 [Discord 웹앱](https://discord.com/app)에 접속하여 로그인합니다.
2. 키보드의 `F12` 또는 `Ctrl + Shift + I` (Mac: `Cmd + Option + I`)를 눌러 **콘솔(Console)** 탭을 엽니다.
3. `discord-hypesquad-selector.js` 파일의 전체 코드를 복사하여 콘솔 창에 붙여넣고 `Enter`를 누릅니다.
4. 화면 중앙에 나타난 팝업 창에서 원하는 배지를 클릭하면 즉시 적용됩니다.

| 배지 | 하우스 명칭 | 색상 | 비고 |
| :---: | :--- | :--- | :--- |
| ⚔️ | **Bravery** | 보라색 (`#9b84ee`) | 용기의 하우스 |
| 🔥 | **Brilliance** | 주황색 (`#f47b67`) | 탁월함의 하우스 |
| ⚖️ | **Balance** | 청록색 (`#45ddc0`) | 조화의 하우스 |

> **안내**: 디스코드 정책상 하이프스쿼드 배지는 계정당 한 번에 **1개만** 활성화됩니다. 다른 배지를 클릭하면 기존 배지가 새로운 배지로 자동 교체됩니다.

### 5. 문제 해결 (Troubleshooting / 붙여넣기가 안 될 때)
- ⚠️ **`allow pasting` 경고가 뜨며 코드가 붙여넣어지지 않는 경우**:
  브라우저의 자체 콘솔 보안 보호 기능입니다. 콘솔 입력창에 **`allow pasting`** (또는 한국어 브라우저의 경우 **`붙여넣기 허용`**)을 직접 타이핑하고 `Enter`를 누른 뒤, 다시 코드를 붙여넣으시면 정상 입력됩니다.
- 🔄 **`토큰을 감지하지 못했습니다` 오류가 뜨는 경우**:
  웹 화면을 `F5`로 새로고침한 뒤, 왼쪽 채널 목록이나 채팅창을 마우스로 아무 곳이나 1회 클릭하여 네트워크 세션을 활성화한 상태에서 다시 스크립트를 실행해 주세요.
- ❓ **해결되지 않는 문제가 있는 경우**:
  [공식 디스코드 서버](https://discord.gg/bE5fAxyNWj) 문의 채널을 통해 질문을 남겨주시면 도움을 받으실 수 있습니다.

### 6. 저작권, 재배포 및 사용 규정 (Copyright & Terms)
- **저작권자**: © 2026 비가드 (Bigad). All rights reserved.
- **무단 재배포 금지 (No Redistribution)**: 본 스크립트 코드 및 파생물을 저작권자의 사전 서면 동의 없이 타 웹사이트, 포럼, 디스코드 서버 등에 무단으로 업로드하거나 재배포하는 행위를 엄격히 금지합니다.
- **무단 수정 및 2차 가공 금지 (No Modification)**: 본 소스 코드를 임의로 변형, 난독화 해제 후 재가공, 또는 저작자 표기를 삭제하여 배포하는 행위를 금지합니다.
- **유튜브 및 방송/미디어 활용 가이드라인 (YouTube & Media Policy)**:
  - 본 스크립트를 주제로 유튜브, 틱톡, 트위치, 치지직 등의 영상 콘텐츠를 제작하는 것은 허용됩니다.
  - 단, 영상의 **설명란(더보기) 또는 고정 댓글 최상단에 제작자 채널 링크(`https://www.youtube.com/@Bigad2007`), 디스코드 링크(`https://discord.gg/bE5fAxyNWj`), 제작자 명칭(비가드 / Bigad)을 명확히 기재**해야 합니다.
  - 본 스크립트를 자신이 개발한 것처럼 속이거나 원작자 출처를 고의로 누락하는 행위는 엄격히 금지됩니다.
- **교육 및 연구 목적 (Educational Purpose)**: 본 스크립트는 웹 프론트엔드 환경 분석, Webpack 구조 연구 및 브라우저 DOM 제어 학습을 위한 순수 연구/교육용 프로젝트입니다. Discord 공식 서비스와 무관합니다.

---

## 🇺🇸 English

### 1. Overview
`discord-hypesquad-selector.js` is a lightweight, browser-based utility that allows users to visually select and permanently assign one of the three official Discord HypeSquad badges (Bravery, Brilliance, Balance) via the Developer Console (`F12`), without complex installations or manual token handling.

### 2. Official Community & YouTube Channel
- 📺 **Subscribe on YouTube**: **[https://www.youtube.com/@Bigad2007](https://www.youtube.com/@Bigad2007)**  
  Visit Bigad's official YouTube channel for **more Discord utility scripts, automation tools, profile customization tricks, and detailed video tutorials**!
- 💬 **Official Discord Server**: **[https://discord.gg/bE5fAxyNWj](https://discord.gg/bE5fAxyNWj)**  
  Join our community server for live troubleshooting, project discussions, and the latest release news.

### 3. Key Features
- **Native Discord-Themed Modal**: Clean popup interface that matches the Discord dark theme.
- **6-Stage Multi-Token Auto-Scan**: Automatically retrieves valid session authentication from isolated storage, Webpack module caches, and IndexedDB.
- **401 Unauthorized Prevention**: Guarantees valid header generation and payload dispatching.
- **Real-time Bilingual Support**: Instant toggling between Korean and English via the top navigation switch.
- **High-Resolution Official Assets**: Embedded high-fidelity badge icons with no broken rendering.

### 4. Quick Start
1. Open your web browser and sign in to [Discord Web](https://discord.com/app).
2. Press `F12` or `Ctrl + Shift + I` (Mac: `Cmd + Option + I`) and switch to the **Console** tab.
3. Copy the entire source code from `discord-hypesquad-selector.js`, paste it into the console, and press `Enter`.
4. Click on any of the three house badges displayed in the modal to apply it instantly.

| Badge | House Name | Theme Color | Description |
| :---: | :--- | :--- | :--- |
| ⚔️ | **Bravery** | Purple (`#9b84ee`) | House of Bravery |
| 🔥 | **Brilliance** | Orange (`#f47b67`) | House of Brilliance |
| ⚖️ | **Balance** | Teal (`#45ddc0`) | House of Balance |

> **Notice**: According to Discord platform rules, only **one** HypeSquad badge can be active per account at a time. Selecting another badge will overwrite the previous one.

### 5. Troubleshooting
- ⚠️ **If you see an `allow pasting` warning preventing you from pasting code**:
  This is a built-in security feature in modern browsers. Type **`allow pasting`** directly into the console prompt, hit `Enter`, and then try pasting the script code again.
- 🔄 **If you see `Token not detected`**:
  Refresh the Discord tab with `F5`, click anywhere inside any text channel or the channel list to trigger active network requests, and execute the script again.
- ❓ **Need more help?**:
  Feel free to ask questions in our [Official Discord Server](https://discord.gg/bE5fAxyNWj).

### 6. Copyright, Redistribution & Media Policy
- **Copyright**: © 2026 Bigad (비가드). All rights reserved.
- **No Redistribution**: Unauthorized re-uploading, mirroring, or distributing this source code on external websites, forums, or Discord servers without prior written consent from the author is strictly prohibited.
- **No Modification**: Modifying, reverse-engineering, tampering with credits, or creating unauthorized forks of this script is strictly forbidden.
- **YouTube & Media Guidelines**:
  - You are welcome to create YouTube videos, tutorials, or streams demonstrating this tool.
  - However, you **MUST** provide clear credit to the author (**Bigad / 비가드**) along with direct links to the YouTube channel (**`https://www.youtube.com/@Bigad2007`**) and Discord server (**`https://discord.gg/bE5fAxyNWj`**) at the top of the video description or pinned comment.
  - Claiming ownership or omitting proper credit is strictly prohibited.
- **Educational Purpose**: This script is built strictly for educational, security research, and DOM manipulation study purposes. It is not affiliated with or endorsed by Discord Inc.
