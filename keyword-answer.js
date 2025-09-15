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
    
    // 현재 페이지에서 키워드 업데이트
    updateKeywordDisplay(keyword);
    updateSearchResults(keyword);
    
    // 키워드로 검색 결과 필터링 및 렌더링
    performKeywordSearch(keyword);
    
    // URL 업데이트 (새로고침 없이)
    const url = new URL(window.location);
    url.searchParams.set('keyword', keyword);
    window.history.pushState({}, '', url);
    
    console.log('키워드 검색 실행:', keyword);
}

// 필터 열기 함수
function openFilter() {
    console.log('필터 열기');
    // 필터 기능 구현
}

// 더미 데이터에서 검색 결과를 가져오는 함수
function loadSearchResults() {
    // dummy.js가 로드되었는지 확인
    if (typeof getSearchResults === 'undefined') {
        console.error('getSearchResults 함수를 찾을 수 없습니다. dummy.js가 로드되었는지 확인하세요.');
        return Promise.resolve([]);
    }
    console.log('더미 데이터에서 검색 결과 로드:', getSearchResults());
    return Promise.resolve(getSearchResults());
}

// 키워드 답변 페이지 전용 카테고리 탭 데이터 생성 함수
function getKeywordCategoryTabs() {
    // dummy.js가 로드되었는지 확인
    if (typeof getSearchResults === 'undefined') {
        console.error('getSearchResults 함수를 찾을 수 없습니다. dummy.js가 로드되었는지 확인하세요.');
        return [];
    }
    
    const allResults = getSearchResults();
    const counts = {
        "국내소재": allResults.filter(item => item.resource_type === "국내소재").length,
        "지식정보": allResults.filter(item => item.resource_type === "지식정보").length,
        "논문": allResults.filter(item => item.resource_type === "논문").length,
        "특허": allResults.filter(item => item.resource_type === "특허").length,
        "데이터": allResults.filter(item => item.resource_type === "데이터").length,
        "통합플랫폼 콘텐츠": allResults.filter(item => item.resource_type === "통합플랫폼 콘텐츠").length
    };
    
    const totalCount = allResults.length;
    
    return [
        { name: "AI요약", count: totalCount, active: true },
        { name: "국내소재", count: counts["국내소재"], active: false },
        { name: "지식정보", count: counts["지식정보"], active: false },
        { name: "논문", count: counts["논문"], active: false },
        { name: "특허", count: counts["특허"], active: false },
        { name: "데이터", count: counts["데이터"], active: false },
        { name: "통합플랫폼 콘텐츠", count: counts["통합플랫폼 콘텐츠"], active: false }
    ];
}

// 카테고리 탭을 동적으로 렌더링하는 함수
function renderCategoryTabs() {
    const categoryTabs = getKeywordCategoryTabs();
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
        searchCountNumber.textContent = allResults.length.toLocaleString();
    }
}

// 키워드 표시 업데이트 함수
function updateKeywordDisplay(keyword) {
    const displayKeyword = document.getElementById('displayKeyword');
    if (displayKeyword) {
        displayKeyword.textContent = keyword;
    }
}

// 카테고리별 필터링 함수
function filterByCategory(categoryName) {
    // dummy.js가 로드되었는지 확인
    if (typeof getSearchResults === 'undefined') {
        console.error('getSearchResults 함수를 찾을 수 없습니다. dummy.js가 로드되었는지 확인하세요.');
        return;
    }
    const allResults = getSearchResults();
    let filteredResults = allResults;
    
    if (categoryName !== 'AI요약') {
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
    
    // 필터링된 결과를 다시 렌더링 (AI요약 탭인 경우 모든 결과 전달)
    renderSearchResults(categoryName === 'AI요약' ? allResults : filteredResults);
}

// 키워드 검색 결과 탭의 카테고리 탭 업데이트
function updateKeywordCategoryCounts() {
    // dummy.js가 로드되었는지 확인
    if (typeof getSearchResults === 'undefined') {
        console.error('getSearchResults 함수를 찾을 수 없습니다. dummy.js가 로드되었는지 확인하세요.');
        return;
    }
    
    const allResults = getSearchResults();
    const counts = {
        "국내소재": allResults.filter(item => item.resource_type === "국내소재").length,
        "지식정보": allResults.filter(item => item.resource_type === "지식정보").length,
        "논문": allResults.filter(item => item.resource_type === "논문").length,
        "특허": allResults.filter(item => item.resource_type === "특허").length,
        "데이터": allResults.filter(item => item.resource_type === "데이터").length,
        "통합플랫폼 콘텐츠": allResults.filter(item => item.resource_type === "통합플랫폼 콘텐츠").length
    };
    
    const keywordCategoryCounts = document.querySelectorAll('.keyword-category-count');
    keywordCategoryCounts.forEach((countElement, index) => {
        const categories = ['국내소재', '지식정보', '논문', '특허', '데이터', '통합플랫폼 콘텐츠'];
        if (index < categories.length) {
            const category = categories[index];
            keywordCategoryCounts[index + 1].textContent = `(${counts[category]})`;
        }
    });
    
    console.log('키워드 카테고리 카운트가 업데이트되었습니다:', counts);
}

// 각 카테고리별 AI 요약 텍스트 생성 함수 (1000자)
function generateCategoryAISummary(categoryName, results) {
    const keyword = getKeywordFromURL();
    const count = results.length;
    
    const summaries = {
        "국내소재": `"${keyword}" 관련 국내소재 ${count.toLocaleString()}건이 검색되었습니다. 이는 국내에서 개발되거나 보유하고 있는 생물학적 소재들로, 연구 및 산업 활용에 중요한 자원입니다. 주요 소재들은 바이오의약품 개발, 진단 키트 제작, 연구용 시약 등 다양한 분야에서 활용 가능하며, 국내 연구기관과 기업들이 보유한 고유한 생물자원들을 포함하고 있습니다. 이러한 국내소재들은 연구의 독창성과 상업적 가치 창출에 핵심적인 역할을 하며, 바이오산업의 경쟁력 강화에 기여할 것으로 기대됩니다. 특히 국내 바이오산업의 발전과 함께 이러한 소재들의 중요성이 더욱 부각되고 있으며, 연구자들에게는 신뢰할 수 있는 실험 재료를 제공하고 있습니다. 국내소재는 품질 관리와 표준화가 잘 이루어져 있어 연구의 재현성과 신뢰성을 높이는 데 중요한 역할을 합니다. 또한 국내 특유의 환경과 조건에서 개발된 소재들은 특정 연구 분야에서 독특한 장점을 가지고 있어 국제적인 경쟁력 확보에도 기여하고 있습니다. 이러한 소재들은 지속적인 연구와 개발을 통해 더욱 발전하고 있으며, 미래 바이오산업의 핵심 자산으로 자리잡고 있습니다.`,
        
        "지식정보": `"${keyword}" 관련 지식정보 ${count.toLocaleString()}건이 검색되었습니다. 이는 해당 분야의 전문 지식, 연구 방법론, 기술적 노하우 등을 포함한 정보 자원들입니다. 연구자들이 참고할 수 있는 문헌, 가이드라인, 표준 프로토콜, 실험 방법 등이 포함되어 있어 연구의 효율성과 정확성을 높이는 데 도움이 됩니다. 이러한 지식정보는 연구의 기초가 되는 중요한 자원으로, 새로운 연구 방향 설정과 기존 연구의 검증에 활용될 수 있습니다. 특히 최신 연구 동향과 기술 발전에 대한 정보는 연구자들이 앞서 나갈 수 있도록 도와주며, 실험 설계와 데이터 해석에 필요한 전문 지식을 제공합니다. 지식정보는 단순한 데이터가 아닌 체계적으로 정리되고 검증된 지식 체계로, 연구의 품질과 효율성을 크게 향상시킵니다. 또한 이러한 정보들은 연구자들 간의 지식 공유와 협력을 촉진하여 전체 연구 커뮤니티의 발전에 기여합니다. 지속적인 업데이트와 확장을 통해 최신 정보를 제공하고 있으며, 연구자들에게 신뢰할 수 있는 정보 소스로 자리잡고 있습니다.`,
        
        "논문": `"${keyword}" 관련 논문 ${count.toLocaleString()}건이 검색되었습니다. 이는 해당 분야의 최신 연구 성과와 학술적 지식을 담고 있는 중요한 자료들입니다. 연구자들이 참고할 수 있는 최신 연구 동향, 실험 결과, 이론적 배경 등이 포함되어 있어 연구의 깊이와 폭을 확장하는 데 기여합니다. 이러한 논문들은 연구의 신뢰성과 재현성을 높이며, 새로운 연구 아이디어의 발상과 기존 연구의 한계점 파악에 도움이 됩니다. 특히 동료 검토를 거친 학술 논문들은 높은 신뢰성을 가지고 있어 연구의 기준점 역할을 합니다. 논문들은 단순한 연구 결과뿐만 아니라 연구 방법론, 데이터 분석 기법, 해석 방법 등에 대한 상세한 정보를 제공하여 후속 연구자들이 참고할 수 있도록 합니다. 또한 이러한 논문들은 학술적 논의와 토론의 기반이 되어 해당 분야의 발전을 이끌어가는 역할을 합니다. 국제적인 연구 동향과 비교 분석을 통해 연구의 수준을 평가하고 개선할 수 있는 기준을 제공하며, 연구자들의 네트워킹과 협력의 기회를 만들어줍니다.`,
        
        "특허": `"${keyword}" 관련 특허 ${count.toLocaleString()}건이 검색되었습니다. 이는 해당 분야의 기술적 혁신과 지적재산권을 보호하는 중요한 자료들입니다. 특허 정보는 기술의 발전 방향과 상업적 가치를 파악하는 데 핵심적인 역할을 하며, 연구 개발 시 기존 기술의 우회 방안이나 개선점을 찾는 데 도움이 됩니다. 이러한 특허 정보는 연구의 독창성을 확보하고 상업화 가능성을 평가하는 데 중요한 기준이 됩니다. 특허는 기술의 보호뿐만 아니라 기술 정보의 공개를 통해 해당 분야의 기술 발전을 촉진하는 역할도 합니다. 연구자들은 특허 정보를 통해 최신 기술 동향을 파악하고, 자신의 연구 방향을 설정할 수 있습니다. 또한 특허는 상업화 과정에서 중요한 지적재산권으로 작용하여 기술의 경제적 가치를 실현하는 데 필수적입니다. 특허 정보는 기술의 우선순위와 독창성을 판단하는 기준이 되며, 연구 개발 투자의 효율성을 높이는 데 기여합니다. 이러한 특허들은 지속적인 기술 혁신과 발전을 이끌어가며, 바이오산업의 경쟁력 강화에 핵심적인 역할을 합니다.`,
        
        "데이터": `"${keyword}" 관련 데이터 ${count.toLocaleString()}건이 검색되었습니다. 이는 연구에 필요한 실험 데이터, 통계 정보, 측정값 등을 포함한 정량적 자료들입니다. 이러한 데이터는 연구의 객관성과 신뢰성을 뒷받침하는 중요한 근거가 되며, 연구 결과의 검증과 재현에 필수적인 요소입니다. 데이터의 품질과 완성도는 연구의 가치를 결정하는 핵심 요소로, 체계적인 데이터 관리와 분석을 통해 연구의 신뢰성을 높일 수 있습니다. 특히 대용량 데이터와 복잡한 데이터셋은 고급 분석 기법과 통계적 방법을 통해 의미 있는 인사이트를 도출할 수 있도록 합니다. 데이터는 연구의 기초가 되는 객관적 증거로, 가설 검증과 이론 발전에 필수적인 역할을 합니다. 또한 데이터 공유와 개방을 통해 연구 커뮤니티 전체의 발전을 촉진하며, 연구의 투명성과 재현성을 높입니다. 데이터 표준화와 메타데이터 관리가 잘 이루어져 있어 연구자들이 쉽게 접근하고 활용할 수 있으며, 다양한 연구 목적에 맞게 활용할 수 있습니다. 이러한 데이터들은 지속적으로 업데이트되고 확장되어 연구의 깊이와 폭을 넓히는 데 기여하고 있습니다.`,
        
        "통합플랫폼 콘텐츠": `"${keyword}" 관련 통합플랫폼 콘텐츠 ${count.toLocaleString()}건이 검색되었습니다. 이는 다양한 소스에서 수집되고 체계적으로 정리된 종합적인 정보 자원들입니다. 연구자들이 한 곳에서 다양한 유형의 정보에 접근할 수 있도록 통합된 형태로 제공되며, 연구의 효율성과 편의성을 크게 향상시킵니다. 이러한 통합 콘텐츠는 연구의 전 과정에서 참고할 수 있는 종합적인 정보를 제공하여 연구의 질과 완성도를 높이는 데 기여합니다. 통합플랫폼은 분산되어 있던 정보들을 체계적으로 연결하고 통합하여 연구자들에게 일관된 정보 접근 환경을 제공합니다. 이를 통해 연구 시간을 단축하고 정보 검색의 효율성을 높일 수 있으며, 연구의 연속성과 일관성을 확보할 수 있습니다. 또한 다양한 정보 소스 간의 상호 연관성을 파악할 수 있어 연구의 새로운 관점과 접근 방법을 발견할 수 있도록 도와줍니다. 통합플랫폼 콘텐츠는 지속적인 업데이트와 확장을 통해 최신 정보를 제공하며, 연구자들의 협력과 네트워킹을 촉진하는 역할도 합니다. 이러한 통합적 접근은 연구의 혁신과 발전을 이끌어가는 중요한 동력이 되고 있습니다.`
    };
    
    return summaries[categoryName] || `"${keyword}" 관련 ${categoryName} ${count.toLocaleString()}건이 검색되었습니다.`;
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
    
    if (!results || results.length === 0) {
        console.log('검색 결과가 없습니다.');
        materialList.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
        return;
    }
    
    console.log('검색 결과 개수:', results.length);
    
    // 현재 활성화된 탭 확인
    const activeTab = document.querySelector('.category-tab.active');
    const activeTabName = activeTab ? activeTab.querySelector('span').textContent : '';
    const isAISummaryTab = activeTabName === 'AI요약';
    const isAllTab = activeTabName === '전체';
    
    if (isAISummaryTab) {
        // AI요약 탭인 경우 카테고리별로 그룹화하여 각각 AI 요약 표시
        const categoryGroups = groupResultsByCategory(results);
        const html = renderCategoryGroupsWithAISummary(categoryGroups);
        materialList.innerHTML = html;
    } else if (isAllTab) {
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
    
    console.log('검색 결과 렌더링 완료');
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

// 카테고리별 그룹을 렌더링하는 함수
function renderCategoryGroups(categoryGroups) {
    let html = '';
    
    Object.keys(categoryGroups).forEach(categoryName => {
        const results = categoryGroups[categoryName];
        html += `
            <div class="category-group">
                <div class="category-header">
                    <h3 class="category-title">${categoryName}</h3>
                    <span class="category-count">(${results.length.toLocaleString()})</span>
                    <button class="more-button">더보기</button>
                </div>
                <div class="material-list">
                    ${results.map(result => `
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
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    return html;
}

// 카테고리별 그룹을 AI 요약과 함께 렌더링하는 함수
function renderCategoryGroupsWithAISummary(categoryGroups) {
    let html = '';
    
    Object.keys(categoryGroups).forEach(categoryName => {
        const results = categoryGroups[categoryName];
        const aiSummary = generateCategoryAISummary(categoryName, results);
        
        html += `
            <div class="material-filter ai-summary-material-filter">
                <div class="filter-title">${categoryName} (${results.length.toLocaleString()})</div>
                <div class="more-button">
                    <span>더보기</span>
                    <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </div>
            </div>
            <div class="ai-summary-content">
                <p>${aiSummary}</p>
            </div>
        `;
    });
    
    return html;
}

// 키워드 검색 실행 함수
function performKeywordSearch(keyword) {
    console.log('키워드 검색 실행:', keyword);
    
    // dummy.js가 로드되었는지 확인
    if (typeof getSearchResults === 'undefined') {
        console.error('getSearchResults 함수를 찾을 수 없습니다. dummy.js가 로드되었는지 확인하세요.');
        return;
    }
    
    const allResults = getSearchResults();
    console.log('전체 검색 결과:', allResults.length, '개');
    
    // 키워드로 필터링 (간단한 예시)
    const filteredResults = allResults.filter(result => 
        result.korean_name.toLowerCase().includes(keyword.toLowerCase()) ||
        result.resource_number.toLowerCase().includes(keyword.toLowerCase()) ||
        result.resource_type.toLowerCase().includes(keyword.toLowerCase()) ||
        result.cluster.toLowerCase().includes(keyword.toLowerCase())
    );
    
    console.log('필터링된 검색 결과:', filteredResults.length, '개');
    
    // 필터링된 결과 렌더링
    renderSearchResults(filteredResults);
    
    // 검색 결과 개수 업데이트
    const searchCountNumber = document.getElementById('searchCountNumber');
    if (searchCountNumber) {
        searchCountNumber.textContent = filteredResults.length.toLocaleString();
    }
    
    // 카테고리 탭도 업데이트 (필터링된 결과 기준)
    updateCategoryTabsWithFilteredResults(filteredResults);
}

// 필터링된 결과로 카테고리 탭 업데이트 함수
function updateCategoryTabsWithFilteredResults(filteredResults) {
    // 각 카테고리별 카운트 계산
    const counts = {
        "국내소재": filteredResults.filter(item => item.resource_type === "국내소재").length,
        "지식정보": filteredResults.filter(item => item.resource_type === "지식정보").length,
        "논문": filteredResults.filter(item => item.resource_type === "논문").length,
        "특허": filteredResults.filter(item => item.resource_type === "특허").length,
        "데이터": filteredResults.filter(item => item.resource_type === "데이터").length,
        "통합플랫폼 콘텐츠": filteredResults.filter(item => item.resource_type === "통합플랫폼 콘텐츠").length
    };
    
    const totalCount = filteredResults.length;
    
    // 카테고리 탭의 카운트 업데이트
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach((tab, index) => {
        const countSpan = tab.querySelector('.category-count');
        if (countSpan) {
            if (index === 0) { // AI요약 탭
                countSpan.textContent = `(${totalCount.toLocaleString()})`;
            } else {
                const categoryNames = ['국내소재', '지식정보', '논문', '특허', '데이터', '통합플랫폼 콘텐츠'];
                const categoryName = categoryNames[index - 1];
                countSpan.textContent = `(${counts[categoryName].toLocaleString()})`;
            }
        }
    });
    
    console.log('카테고리 탭 카운트 업데이트:', counts);
}

// 검색 결과 업데이트 함수
function updateSearchResults(keyword) {
    // dummy.js가 로드되었는지 확인
    if (typeof getSearchResults === 'undefined') {
        console.error('getSearchResults 함수를 찾을 수 없습니다. dummy.js가 로드되었는지 확인하세요.');
        return;
    }
    
    const allResults = getSearchResults();
    console.log('검색 결과 업데이트:', allResults.length, '개');
    
    // 키워드로 필터링
    const filteredResults = allResults.filter(result => 
        result.korean_name.toLowerCase().includes(keyword.toLowerCase()) ||
        result.resource_number.toLowerCase().includes(keyword.toLowerCase()) ||
        result.resource_type.toLowerCase().includes(keyword.toLowerCase()) ||
        result.cluster.toLowerCase().includes(keyword.toLowerCase())
    );
    
    console.log('필터링된 결과:', filteredResults.length, '개');
    
    // 필터링된 결과 렌더링
    renderSearchResults(filteredResults);
    
    // 검색 결과 개수 업데이트
    const searchCountNumber = document.getElementById('searchCountNumber');
    if (searchCountNumber) {
        searchCountNumber.textContent = filteredResults.length.toLocaleString();
    }
    
    // 카테고리 탭도 업데이트
    updateCategoryTabsWithFilteredResults(filteredResults);
}

// 메인 탭 전환 함수
function switchMainTab(tabType) {
    console.log('탭 전환:', tabType);
    
    // 탭 버튼 상태 업데이트
    const relatedDataTab = document.getElementById('relatedDataTab');
    const keywordResultTab = document.getElementById('keywordResultTab');
    
    if (tabType === 'relatedData') {
        relatedDataTab.classList.add('active');
        keywordResultTab.classList.remove('active');
        
        // 통합검색결과 탭 표시
        const relatedDataSection = document.getElementById('relatedDataSection');
        const keywordSearchResults = document.getElementById('keywordSearchResults');
        
        if (relatedDataSection) relatedDataSection.style.display = 'block';
        if (keywordSearchResults) keywordSearchResults.style.display = 'none';
        
    } else if (tabType === 'keywordResult') {
        relatedDataTab.classList.remove('active');
        keywordResultTab.classList.add('active');
        
        // 연관자료보기 탭 표시
        const relatedDataSection = document.getElementById('relatedDataSection');
        const keywordSearchResults = document.getElementById('keywordSearchResults');
        
        if (relatedDataSection) relatedDataSection.style.display = 'none';
        if (keywordSearchResults) keywordSearchResults.style.display = 'block';
    }
}

// 페이지 로드 시 키워드 설정
document.addEventListener('DOMContentLoaded', function() {
    console.log('키워드 답변 페이지 로드됨');
    
    // URL에서 키워드 가져오기
    const keyword = getKeywordFromURL();
    console.log('URL에서 가져온 키워드:', keyword);
    
    // 키워드 표시 업데이트
    updateKeywordDisplay(keyword);
    
    // 검색 결과 로드 및 렌더링
    loadSearchResults().then(() => {
        console.log('검색 결과 로드 완료');
        
        // 카테고리 탭 렌더링
        renderCategoryTabs();
        
        // 검색 결과 렌더링
        updateSearchResults(keyword);
    });
    
    // 검색 입력창 이벤트 리스너
    const keywordInput = document.getElementById('keywordInput');
    if (keywordInput) {
        keywordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleKeywordSearch();
            }
        });
    }
    
    // 검색 버튼 이벤트 리스너
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleKeywordSearch);
    }
    
    // 필터 버튼 이벤트 리스너
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', openFilter);
    }
});