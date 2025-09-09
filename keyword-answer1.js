// keyword-answer1.js - dummy.js를 사용하는 버전

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
    
    window.location.href = `keyword-answer1.html?keyword=${encodeURIComponent(keyword)}`;
}

// 필터 열기 함수
function openFilter() {
    console.log('필터 열기');
    // 필터 기능 구현
}

// 더미 데이터에서 검색 결과를 가져오는 함수
function loadSearchResults() {
    console.log('더미 데이터에서 검색 결과 로드:', getSearchResults());
    return Promise.resolve(getSearchResults());
}

// 카테고리 탭을 동적으로 렌더링하는 함수
function renderCategoryTabs() {
    const categoryTabs = getCategoryTabs();
    const categoryTabGroup = document.querySelector('.category-tab-group');
    
    if (!categoryTabGroup) {
        console.error('category-tab-group 요소를 찾을 수 없습니다!');
        return;
    }
    
    const html = categoryTabs.map(tab => {
        const isLongText = tab.name === '통합플랫폼 콘텐츠';
        return `
            <div class="category-tab ${tab.active ? 'active' : 'inactive'} ${isLongText ? 'long-text' : ''}">
                <span>${tab.name}</span>
                <span class="category-count">(${tab.count.toLocaleString()})</span>
            </div>
        `;
    }).join('');
    
    categoryTabGroup.innerHTML = html;
    console.log('카테고리 탭이 렌더링되었습니다:', categoryTabs);
    
    // 검색 결과 총 개수 업데이트
    updateTotalSearchCount();
    
    // 탭 클릭 이벤트 추가
    const tabs = categoryTabGroup.querySelectorAll('.category-tab');
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // 모든 탭에서 active 클래스 제거
            tabs.forEach(t => t.classList.remove('active'));
            // 클릭한 탭에 active 클래스 추가
            tab.classList.add('active');
            
            // 탭 이름에 따라 필터링 (필요시 구현)
            const tabName = tab.querySelector('span').textContent;
            console.log('선택된 탭:', tabName);
            
            // 여기에 탭별 필터링 로직 추가 가능
            filterByCategory(tabName);
        });
    });
}

// 검색 결과 총 개수 업데이트 함수
function updateTotalSearchCount() {
    const searchCountNumber = document.getElementById('searchCountNumber');
    if (searchCountNumber) {
        const allResults = getSearchResults();
        const totalCount = allResults.length;
        searchCountNumber.textContent = totalCount.toLocaleString();
        console.log('검색 결과 총 개수 업데이트:', totalCount);
    }
}

// 카테고리별 필터링 함수
function filterByCategory(categoryName) {
    const allResults = getSearchResults();
    let filteredResults = allResults;
    
    if (categoryName !== '전체') {
        // 카테고리명을 resource_type으로 매핑
        const categoryMapping = {
            '국내소재': '국내소재',
            '지식정보': '지식정보',
            '논문': '논문',
            '특허': '특허',
            '데이터': '데이터',
            '통합플랫폼 콘텐츠': '통합플랫폼 콘텐츠'
        };
        
        const resourceType = categoryMapping[categoryName];
        if (resourceType) {
            filteredResults = allResults.filter(result => result.resource_type === resourceType);
        }
    }
    
    console.log(`${categoryName} 필터링 결과:`, filteredResults.length, '개');
    
    // 필터링된 결과를 다시 렌더링 (전체 탭인 경우 모든 결과 전달)
    renderSearchResults(categoryName === '전체' ? allResults : filteredResults);
}

// 키워드 검색 결과 탭의 카테고리 탭 업데이트
function updateKeywordCategoryCounts() {
    const counts = calculateCategoryCounts();
    const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    // 전체 카운트 업데이트
    const allTabCount = document.querySelector('[data-category="all"] .keyword-category-count');
    if (allTabCount) {
        allTabCount.textContent = `(${totalCount})`;
    }
    
    // 각 카테고리별 카운트 업데이트
    const keywordCategoryCounts = document.querySelectorAll('.keyword-category-count');
    const categories = ['국내소재', '논문', '특허', '데이터'];
    
    categories.forEach((category, index) => {
        if (keywordCategoryCounts[index + 1]) { // +1 because first is "전체"
            keywordCategoryCounts[index + 1].textContent = `(${counts[category]})`;
        }
    });
    
    console.log('키워드 카테고리 카운트가 업데이트되었습니다:', counts);
}

// 검색 결과를 HTML로 렌더링하는 함수
function renderSearchResults(results) {
    console.log('renderSearchResults 호출됨, results:', results);
    
    const materialList = document.getElementById('materialList');
    console.log('materialList 요소:', materialList);
    
    if (!materialList) {
        console.error('materialList 요소를 찾을 수 없습니다!');
        return;
    }
    
    if (results.length === 0) {
        console.log('검색 결과가 없습니다.');
        materialList.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
        return;
    }
    
    console.log('검색 결과 개수:', results.length);
    
    // 현재 활성화된 탭 확인
    const activeTab = document.querySelector('.category-tab.active');
    const isAllTab = activeTab && activeTab.querySelector('span').textContent === '전체';
    
    if (isAllTab) {
        // 전체 탭인 경우 카테고리별로 그룹화하여 표시
        const categoryGroups = groupResultsByCategory(results);
        const html = renderCategoryGroups(categoryGroups);
        materialList.innerHTML = html;
    } else {
        // 특정 카테고리 탭인 경우 기존 방식으로 표시
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
    
    console.log('HTML이 materialList에 삽입되었습니다.');
}

// 결과를 카테고리별로 그룹화하는 함수
function groupResultsByCategory(results) {
    const groups = {};
    
    results.forEach(result => {
        const category = result.resource_type;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(result);
    });
    
    return groups;
}

// 카테고리 그룹을 HTML로 렌더링하는 함수
function renderCategoryGroups(categoryGroups) {
    const categoryOrder = ['국내소재', '논문', '특허', '데이터', '통합플랫폼 콘텐츠'];
    
    return categoryOrder.map(category => {
        const items = categoryGroups[category] || [];
        if (items.length === 0) return '';
        
        const categoryHtml = items.map(result => `
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
        
        return `
            <div class="category-section">
                <div class="category-title">${category} (${items.length})</div>
                <div class="category-items">
                    ${categoryHtml}
                </div>
            </div>
        `;
    }).join('');
}

// 페이지 로드 시 키워드 설정
document.addEventListener('DOMContentLoaded', async function() {
    const keyword = getKeywordFromURL();
    
    // 키워드 입력창이 있는 경우에만 설정
    const keywordInput = document.getElementById('keywordInput');
    if (keywordInput) {
        keywordInput.value = keyword;
        
        // 키워드 입력창 엔터 키 이벤트
        keywordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleKeywordSearch();
            }
        });
    }
    
    // 검색 결과에 따른 동적 내용 업데이트
    updateSearchResults(keyword);
    
    // 더미 데이터에서 검색 결과 데이터 로드 및 렌더링
    const searchResults = await loadSearchResults();
    renderSearchResults(searchResults);
    
    // 카테고리 탭 렌더링
    renderCategoryTabs();
    
    // 키워드 검색 결과 탭의 카테고리 탭 숫자 업데이트
    updateKeywordCategoryCounts();
    
    console.log('페이지 로드 완료, 검색 결과:', searchResults);
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
    
    // 요소가 존재하는 경우에만 업데이트
    const resultCount = document.getElementById('resultCount');
    const searchCountNumber = document.getElementById('searchCountNumber');
    
    if (resultCount) {
        resultCount.textContent = count;
    }
    if (searchCountNumber) {
        searchCountNumber.textContent = count;
    }
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

// 키워드 검색 결과 페이지1 초기화
console.log('키워드 검색 결과 페이지1이 로드되었습니다.');
