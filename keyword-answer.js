// 키워드 검색 결과 페이지 JavaScript

// URL에서 검색 키워드 가져오기
function getKeywordFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('keyword') || 'COVID-19';
}

// 키워드 검색 함수
function handleKeywordSearch() {
    const keywordInput = document.getElementById('keywordInput');
    const keyword = keywordInput.value.trim();
    
    if (keyword === '') return;
    
    window.location.href = `keyword-answer.html?keyword=${encodeURIComponent(keyword)}`;
}

// 필터 열기 함수
function openFilter() {
    console.log('필터 열기');
    // 필터 기능 구현
}

// CSV 데이터를 파싱하는 함수
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index] ? values[index].trim() : '';
            });
            data.push(row);
        }
    }
    
    return data;
}

// CSV 데이터를 불러오는 함수
async function loadSearchResults() {
    try {
        const response = await fetch('data/search-results.csv');
        const csvText = await response.text();
        const searchResults = parseCSV(csvText);
        return searchResults;
    } catch (error) {
        console.error('CSV 데이터를 불러오는 중 오류가 발생했습니다:', error);
        return [];
    }
}

// 검색 결과를 HTML로 렌더링하는 함수
function renderSearchResults(results) {
    const materialList = document.getElementById('materialList');
    
    if (!materialList || results.length === 0) {
        materialList.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
        return;
    }
    
    const html = results.map(result => `
        <div class="material-item">
            <div class="material-name">${result.resource_number}</div>
            <div class="material-info">자원고유번호 : ${result.resource_number} 국문명 : ${result.korean_name} 자원종류 : ${result.resource_type} 소재클러스터 : ${result.cluster}</div>
            <div class="material-actions">
                <div class="interest-button">
                    <span>관심소재등록</span>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </div>
            </div>
        </div>
    `).join('');
    
    materialList.innerHTML = html;
}

// 페이지 로드 시 키워드 설정
document.addEventListener('DOMContentLoaded', async function() {
    const keyword = getKeywordFromURL();
    
    // 키워드 입력창에 현재 검색 키워드 설정
    document.getElementById('keywordInput').value = keyword;
    
    // 검색 결과에 따른 동적 내용 업데이트
    updateSearchResults(keyword);
    
    // CSV에서 검색 결과 데이터 로드 및 렌더링
    const searchResults = await loadSearchResults();
    renderSearchResults(searchResults);
    
    // 키워드 입력창 엔터 키 이벤트
    document.getElementById('keywordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleKeywordSearch();
        }
    });
});

// 검색 결과 업데이트 함수
function updateSearchResults(keyword) {
    // 키워드에 따른 검색 결과 수 조정
    const resultCounts = {
        'COVID-19': '15,456',
        'breast cancer': '8,234',
        '폐암': '12,567',
        'KAP240563': '1,234',
        'cancer': '45,678',
        'DNA': '23,456',
        'RNA': '18,901',
        'protein': '34,567',
        'cell': '28,234',
        'tissue': '15,789'
    };
    
    const count = resultCounts[keyword] || '10,000';
    document.getElementById('resultCount').textContent = count;
    document.getElementById('searchCountNumber').textContent = count;
}

// 메인 탭 전환
function switchMainTab(tabName) {
    // 모든 탭 비활성화
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 모든 섹션 숨기기
    document.getElementById('keywordSearchResults').style.display = 'none';
    document.getElementById('relatedDataSection').style.display = 'none';
    
    // 선택된 탭 활성화
    if (tabName === 'keywordResult') {
        document.getElementById('keywordResultTab').classList.add('active');
        document.getElementById('keywordSearchResults').style.display = 'block';
    } else if (tabName === 'relatedData') {
        document.getElementById('relatedDataTab').classList.add('active');
        document.getElementById('relatedDataSection').style.display = 'block';
    }
}

// 프로젝트 관련 함수들
function openProject(projectId) {
    console.log('프로젝트 열기:', projectId);
    // 프로젝트 열기 로직 구현
}

// 채팅 검색 함수
function searchChat() {
    const searchInput = document.getElementById('chatSearchInput');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        console.log('채팅 검색:', searchTerm);
        // 채팅 검색 로직 구현
    }
}

// 쿼리 관련 함수들
function selectQuery(queryId) {
    console.log('쿼리 선택:', queryId);
    // 쿼리 선택 로직 구현
}

function editQuery(queryId) {
    console.log('쿼리 편집:', queryId);
    // 쿼리 편집 로직 구현
}

function deleteQuery(queryId) {
    if (confirm('정말로 이 질문을 삭제하시겠습니까?')) {
        console.log('쿼리 삭제:', queryId);
        // 쿼리 삭제 로직 구현
    }
}

// 케밥 메뉴 토글
function toggleKebabMenu(element) {
    const dropdown = element.querySelector('.kebab-dropdown');
    const isVisible = dropdown.style.display === 'block';
    
    // 모든 다른 케밥 메뉴 닫기
    document.querySelectorAll('.kebab-dropdown').forEach(menu => {
        menu.style.display = 'none';
    });
    
    // 현재 메뉴 토글
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// 이어서 질문하기
function sendContinueQuestion() {
    const continueInput = document.getElementById('continueChatInput');
    const question = continueInput.value.trim();
    
    if (question) {
        console.log('이어서 질문:', question);
        // 질문 전송 로직 구현
        continueInput.value = '';
    }
}

// 키워드 검색 결과 페이지 초기화
console.log('키워드 검색 결과 페이지가 로드되었습니다.');
