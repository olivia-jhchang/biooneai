# BioOne 프로젝트 변경사항 문서 (2025년 1월 27일)

## 📋 개요
- **작업일**: 2025년 1월 27일
- **주요 목적**: A검색 버튼 추가 및 네비게이션 구조 개선

---

## 🔄 파일명 변경
- `index.html` → `ai-index.html` (AI 검색 메인 페이지)

---

## ➕ 새로 추가된 기능

### 1. A검색 버튼 추가
**위치별 A검색 버튼:**
- **메인 페이지 (index.html)**: 우측 고정 버튼
- **키워드 검색 결과 페이지**: 헤더 우측 중앙 고정 버튼  
- **AI 답변 페이지**: 헤더 우측 중앙 고정 버튼

**새로 추가된 CSS 클래스:**
```css
.fixed-ai-search-btn          /* 메인 페이지 우측 고정 */
.header-fixed-ai-search-btn   /* 헤더 우측 중앙 고정 */
```

### 2. 통합검색 버튼 추가
**위치별 통합검색 버튼:**
- **AI 인덱스 페이지**: 좌측 중앙 고정 버튼
- **AI 답변 페이지**: 헤더 좌측 중앙 고정 버튼

**새로 추가된 CSS 클래스:**
```css
.left-integrated-search-btn      /* 좌측 중앙 고정 */
.header-integrated-search-btn    /* 헤더 좌측 중앙 고정 */
.integrated-search-button        /* 통합검색 버튼 */
.integrated-search-content       /* 통합검색 컨텐츠 */
.integrated-search-icon          /* 통합검색 아이콘 */
.integrated-search-text          /* 통합검색 텍스트 */
```

---

## 🔧 수정된 기능

### 1. 네비게이션 메뉴
**변경사항:**
- 모든 페이지에서 "AI홈" 메뉴 항목 삭제
- AI 검색은 A검색 버튼으로만 접근 가능

**변경 전:**
```html
<li><a href="ai-index.html">AI홈</a></li>
<li><a href="keyword-answer.html">통합검색</a></li>
```

**변경 후:**
```html
<li><a href="keyword-answer.html">통합검색</a></li>
```

### 2. 질의 말풍선 레이아웃
**문제:** 질의 말풍선의 세로 길이가 과도하게 길어짐
**해결:** 패딩 조정

**변경사항:**
```css
/* 변경 전 */
.search-context {
    padding: 20px 0 40px;
}

/* 변경 후 */
.search-context {
    padding: 10px 0 20px;
}
```

### 3. 헤더 높이 조정
**변경사항:**
```css
/* 변경 전 */
.header-bg {
    height: 350px;
}

/* 변경 후 */
.header-bg {
    height: 500px;
}
```

---

## 🏷️ CSS 클래스명 개선

### 1. 질의 말풍선 컨테이너
**변경 이유:** 메인 페이지의 `.search-container`와 충돌 방지

**변경사항:**
```html
<!-- 변경 전 -->
<div class="search-container">

<!-- 변경 후 -->
<div class="query-bubble-container">
```

```css
/* 변경 전 */
.ai-answer-page .search-container { ... }

/* 변경 후 */
.query-bubble-container { ... }
```

### 2. CSS 주석 업데이트
**변경사항:**
```css
/* 변경 전 */
/* index.html 전용 배경 */
/* index.html 검색 영역 */

/* 변경 후 */
/* ai-index.html 전용 배경 */
/* ai-index.html 검색 영역 */
```

---

## 📁 수정된 파일 목록

### HTML 파일
- `index.html` - A검색 버튼 추가, 네비게이션 수정
- `ai-index.html` - 통합검색 버튼 추가, 네비게이션 수정, performSearch 함수 추가
- `keyword-answer.html` - A검색 버튼 추가, 네비게이션 수정
- `ai-answer.html` - 통합검색 버튼 추가, 네비게이션 수정, 질의 말풍선 컨테이너 변경

### CSS 파일
- `styles.css` - 모든 새 버튼 스타일 추가, 질의 말풍선 패딩 수정, 헤더 높이 조정, 클래스명 개선

---

## ⚠️ 주의사항

### 1. 클래스명 충돌 방지
- 질의 말풍선은 `.query-bubble-container` 사용
- 메인 검색 영역은 `.search-container` 사용
- 각각 독립적인 스타일을 가짐

### 2. 네비게이션 구조
- AI 검색 접근은 오직 A검색 버튼을 통해서만 가능
- 네비게이션 메뉴에는 AI홈이 없음

### 3. 버튼 위치
- A검색 버튼: 우측 고정 또는 헤더 우측 중앙
- 통합검색 버튼: 좌측 고정 또는 헤더 좌측 중앙

---

## 📊 핵심 변경사항 요약
1. **파일명 변경**: `index.html` → `ai-index.html`
2. **버튼 추가**: A검색 버튼 3개, 통합검색 버튼 2개
3. **네비게이션 수정**: AI홈 메뉴 삭제
4. **레이아웃 수정**: 질의 말풍선 패딩, 헤더 높이 조정
5. **클래스명 개선**: 충돌 방지를 위한 명명 규칙 적용

---

## 🔍 개발자 참고사항

### JavaScript 함수 추가
- `ai-index.html`에 `performSearch()` 함수 추가
- AI 검색 페이지로 리다이렉트 기능

### CSS 네이밍 컨벤션
- 용도별로 명확한 클래스명 사용
- 충돌 방지를 위한 구체적인 네이밍 규칙 적용

### 레이아웃 고려사항
- 헤더 높이 500px로 통일
- 질의 말풍선은 컴팩트한 크기 유지
- 버튼들은 고정 위치로 배치
