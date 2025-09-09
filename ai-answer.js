// ========================================
// AI 답변 페이지 JavaScript 기능
// ========================================
// 이 파일은 AI 답변 페이지의 모든 상호작용 기능을 담당합니다.
// 주요 기능: 질의 처리, AI 답변 생성, 탭 전환, 검색, 저장, 채팅 관리 등

// 전역 변수
let currentProcess = 0;        // 현재 AI 처리 단계 (0-4)
let isLiked = false;          // 답변 좋아요 상태
let selectedProject = null;   // 선택된 프로젝트 ID

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});
// ========================================
// 페이지 초기화 및 설정
// ========================================

// 페이지 초기화 함수 - 답변 탭 활성화, 키워드 선택 설정, 쿼리 처리
function initializePage() {
    const answerTab = document.getElementById('answerTab');
    if (answerTab) {
        answerTab.classList.add('active');
    }
    
    const keywordSelect = document.getElementById('keywordSelect');
    if (keywordSelect) {
        keywordSelect.addEventListener('change', function() {
            updateSearchResults(this.value);
        });
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || urlParams.get('query');
    
    if (query) {
        const decodedQuery = decodeURIComponent(query);
        showQueryBubble(decodedQuery);
        startAIProcess();
    } else {
        const defaultQuery = "COVID-19의 실험에서 유전자 편집 기술이 사용된 괄목할만한 성과가 있어?";
        showQueryBubble(defaultQuery);
        startAIProcess();
    }
}
// ========================================
// 검색 결과 및 자료 목록 업데이트
// ========================================

// 키워드에 따른 검색 결과 수 업데이트
function updateSearchResults(keyword) {
    const searchCountNumber = document.getElementById('searchCountNumber');
    if (searchCountNumber) {
        const resultCounts = {
            'COVID-19': '15,456',
            'CRISPR-Cas13': '8,234',
            'RNA': '12,567',
            'SARS-CoV-2': '9,123',
            '유전자편집': '6,789',
            '바이러스': '11,234',
            '진단': '4,567',
            '치료': '7,890'
        };
        
        const count = resultCounts[keyword] || '0';
        searchCountNumber.textContent = count;
    }
    
    updateMaterialList(keyword);
}
// 키워드에 따른 자료 목록 업데이트
function updateMaterialList(keyword) {
    const materialList = document.querySelector('.material-list');
    if (!materialList) return;
    
    const materialData = {
        'COVID-19': [
            { name: '293HEK-293', info: '자원고유번호 : 293[HEK-293] 국문명 : - 자원종류 : 세포·세포주 소재클러스터 : 배양세포' },
            { name: 'CHO-K1', info: '자원고유번호 : 293[HEK-293] 국문명 : - 자원종류 : 세포·세포주 소재클러스터 : 배양세포' },
            { name: 'HCT116', info: '자원고유번호 : 293[HEK-293] 국문명 : - 자원종류 : 세포·세포주 소재클러스터 : 배양세포' }
        ],
        'CRISPR-Cas13': [
            { name: 'Cas13a Protein', info: '자원고유번호 : CAS13A-001 국문명 : Cas13a 단백질 자원종류 : 단백질 소재클러스터 : 합성화합물' },
            { name: 'gRNA Template', info: '자원고유번호 : GRNA-002 국문명 : 가이드 RNA 템플릿 자원종류 : RNA 소재클러스터 : 합성화합물' }
        ],
        'RNA': [
            { name: 'RNA Polymerase', info: '자원고유번호 : RNAP-003 국문명 : RNA 중합효소 자원종류 : 효소 소재클러스터 : 합성화합물' },
            { name: 'mRNA Template', info: '자원고유번호 : MRNA-004 국문명 : 메신저 RNA 템플릿 자원종류 : RNA 소재클러스터 : 합성화합물' }
        ]
    };
    
    const materials = materialData[keyword] || materialData['COVID-19'];
    
    materialList.innerHTML = '';
    
    materials.forEach((material, index) => {
        const materialItem = document.createElement('div');
        materialItem.className = 'material-item';
        materialItem.innerHTML = `
            <div class="material-name">${material.name}</div>
            <div class="material-info">${material.info}</div>
            <div class="material-actions">
                <div class="interest-button">
                    <span>관심소재등록</span>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </div>
            </div>
        `;
        
        if (index > 0) {
            materialItem.style.borderTop = '1px solid #DDDDDD';
            materialItem.style.paddingTop = '30px';
        }
        
        materialList.appendChild(materialItem);
    });
}
// ========================================
// 이벤트 리스너 설정
// ========================================

// 모든 이벤트 리스너 설정 - 버튼 클릭, 입력 이벤트 등
function setupEventListeners() {
    const promptInput = document.getElementById('promptInput');
    if (promptInput) {
        promptInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                performSearch();
            }
        });
        
        promptInput.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    const continueChatInput = document.getElementById('continueChatInput');
    const continueChatSend = document.getElementById('continueChatSend');
    
    if (continueChatInput) {
        continueChatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendContinueQuestion();
            }
        });
        
        continueChatInput.addEventListener('input', function() {
            const hasText = this.value.trim().length > 0;
            continueChatSend.disabled = !hasText;
        });
    }
    
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            selectCategoryTab(this);
        });
    });
}
// ========================================
// 질의 처리 및 AI 답변 생성
// ========================================

// 질의 말풍선 표시
function showQueryBubble(query) {
    const queryBubble = document.getElementById('queryBubble');
    const queryText = document.getElementById('queryText');
    
    if (queryBubble && queryText) {
        queryText.textContent = `"${query}"`;
        queryBubble.style.display = 'flex';
    }
}
// AI 처리 시작 - 4단계 처리 과정 시뮬레이션
function startAIProcess() {
    const processSection = document.getElementById('aiProcessSection');
    if (processSection) {
        processSection.style.display = 'flex';
        currentProcess = 0;
        showNextProcess();
    }
}
// 이어서 질문하기 AI 처리 시작
function startContinueAIProcess() {
    const lastAnswerSection = document.querySelector('.bioone-answer:last-of-type');
    if (lastAnswerSection) {
        const processSection = document.createElement('div');
        processSection.className = 'bioone-process';
        processSection.innerHTML = `
            <div class="process-title">BioOne AI Process</div>
            <div class="process-detail">
                <div class="process-item">질의분석중입니다.</div>
                <div class="process-item">BioOne이 구축한 VectorDB를 검색중입니다.</div>
                <div class="process-item">LLM이 답변을 생성하고 있습니다.</div>
            </div>
        `;
        
        lastAnswerSection.insertBefore(processSection, lastAnswerSection.firstChild);
        
        currentProcess = 0;
        showContinueNextProcess(processSection);
    }
}
// 다음 AI 처리 단계 표시
function showNextProcess() {
    const processItems = document.querySelectorAll('.process-item');
    
    if (currentProcess < processItems.length) {
        if (currentProcess > 0) {
            processItems[currentProcess - 1].classList.add('completed');
            processItems[currentProcess - 1].classList.remove('active');
        }
        
        processItems[currentProcess].classList.add('active');
        
        currentProcess++;
        
        setTimeout(() => {
            if (currentProcess < processItems.length) {
                showNextProcess();
            } else {
                setTimeout(() => {
                    showAIAnswer();
                }, 1000);
            }
        }, 2000);
    }
}

// 이어서 질문하기 다음 처리 단계 표시
function showContinueNextProcess(processSection) {
    const processItems = processSection.querySelectorAll('.process-item');
    
    if (currentProcess < processItems.length) {
        if (currentProcess > 0) {
            processItems[currentProcess - 1].classList.add('completed');
            processItems[currentProcess - 1].classList.remove('active');
        }
        
        processItems[currentProcess].classList.add('active');
        
        currentProcess++;
        
        setTimeout(() => {
            if (currentProcess < processItems.length) {
                showContinueNextProcess(processSection);
            } else {
                setTimeout(() => {
                    showContinueAIAnswer(processSection);
                }, 1000);
            }
        }, 2000);
    }
}
// AI 답변 표시
function showAIAnswer() {
    const processSection = document.getElementById('aiProcessSection');
    const biooneAnswer = document.getElementById('biooneAnswer');
    const searchContinued = document.getElementById('searchContinued');
    const keywordTags = document.getElementById('keywordTags');
    const answerDetail = document.getElementById('answerDetail');
    
    if (processSection) {
        processSection.style.display = 'none';
    }
    
    if (biooneAnswer) {
        biooneAnswer.style.display = 'block';
    }
    
    if (searchContinued) {
        searchContinued.style.display = 'block';
    }
    
    if (keywordTags) {
        keywordTags.style.display = 'flex';
    }
    
    if (answerDetail) {
        answerDetail.style.display = 'block';
    }
}

// 이어서 질문하기 AI 답변 표시
function showContinueAIAnswer(processSection) {
    if (processSection) {
        processSection.style.display = 'none';
    }
    
    const answerSection = processSection.parentElement;
    const answerHeader = answerSection.querySelector('.answer-header');
    const tabContent = answerSection.querySelector('.tab-content');
    
    if (answerHeader) {
        answerHeader.style.display = 'flex';
    }
    
    if (tabContent) {
        tabContent.style.display = 'flex';
    }
}
// 새로운 답변 섹션 추가
function addNewAnswerSection() {
    const searchContinued = document.getElementById('searchContinued');
    
    const newAnswerSection = document.createElement('div');
    newAnswerSection.className = 'bioone-answer';
    newAnswerSection.innerHTML = `
        <div class="answer-header">
            <div class="answer-container" onclick="switchTab('answer', this)">
                <div class="answer-header-text">BioOne AI 답변</div>
            </div>
            <div class="source-container" onclick="switchTab('source', this)">
                <div class="source-header-text">출처(2)</div>
            </div>
            <div class="collapse-icon" onclick="toggleCollapse(this)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 15l-6-6-6 6"/>
                </svg>
            </div>
        </div>
        
        <div class="tab-content" style="display: flex;">
            <div class="answer-text">
                <p>새로운 질문에 대한 답변을 생성하고 있습니다...</p>
            </div>
            <div class="keyword-tags" style="display: flex;">
                <div class="keyword-container">
                    <div class="keyword-text">새로운 키워드</div>
                </div>
            </div>
            <div class="reference">
                <div class="reference-title">출처</div>
                <div class="reference-link">새로운 출처</div>
            </div>
            <div class="footer">
                <div class="footer-container">
                    <div class="save-icon" onclick="openSaveModal()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1 2 2z" />
                            <polyline points="17,21 17,13 7,13 7,21" />
                            <polyline points="7,3 7,8 15,8" />
                        </svg>
                    </div>
                    <div class="copy-icon" onclick="copyAnswer()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9l2 2h4a2 2 0 0 1 2 2v9" />
                        </svg>
                    </div>
                    <div class="delete-icon" onclick="deleteAnswer()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6" />
                            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                        </svg>
                    </div>
                </div>
                <div class="feedback-container">
                    <div class="feedback-text">전문가의 의견으로 답변을 평가해주세요.</div>
                    <div class="good-icon" onclick="toggleLike()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                    </div>
                    <div class="bad-icon" onclick="openDislikeModal()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    searchContinued.parentNode.insertBefore(newAnswerSection, searchContinued);
    
    newAnswerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// ========================================
// 탭 및 UI 제어
// ========================================

// 메인 탭 전환 (답변/관련자료)
function switchMainTab(tabType) {
    const aiAnswerTab = document.getElementById('aiAnswerTab');
    const relatedDataTab = document.getElementById('relatedDataTab');
    const aiAnswerSection = document.getElementById('biooneAnswer');
    const relatedDataSection = document.getElementById('relatedDataSection');
    const queryBubble = document.getElementById('queryBubble');
    const aiProcessSection = document.getElementById('aiProcessSection');
    
    if (tabType === 'aiAnswer') {
        aiAnswerTab.classList.add('active');
        relatedDataTab.classList.remove('active');
        if (aiAnswerSection) aiAnswerSection.style.display = 'block';
        if (relatedDataSection) relatedDataSection.style.display = 'none';
        if (queryBubble) queryBubble.style.display = 'block';
        if (aiProcessSection) aiProcessSection.style.display = 'none';
    } else if (tabType === 'relatedData') {
        aiAnswerTab.classList.remove('active');
        relatedDataTab.classList.add('active');
        if (aiAnswerSection) aiAnswerSection.style.display = 'none';
        if (relatedDataSection) relatedDataSection.style.display = 'block';
        if (queryBubble) queryBubble.style.display = 'none';
        if (aiProcessSection) aiProcessSection.style.display = 'none';
    }
}
// 서브 탭 전환 (답변상세/키워드/출처)
function switchTab(tabType) {
    const answerTab = document.getElementById('answerTab');
    const sourceTab = document.getElementById('sourceTab');
    const answerContent = document.getElementById('answerContent');
    const sourceContent = document.getElementById('sourceContent');
    
    if (tabType === 'answer') {
        answerTab.classList.add('active');
        sourceTab.classList.remove('active');
        answerContent.style.display = 'flex';
        sourceContent.style.display = 'none';
    } else if (tabType === 'source') {
        answerTab.classList.remove('active');
        sourceTab.classList.add('active');
        answerContent.style.display = 'none';
        sourceContent.style.display = 'flex';
    }
}
// 접기/펼치기 토글
function toggleCollapse(collapseElement) {
    const answerSection = collapseElement.closest('.bioone-answer');
    const answerContent = answerSection.querySelector('.tab-content');
    const collapseIcon = collapseElement.querySelector('svg');
    
    if (answerContent.style.display === 'none') {
        answerContent.style.display = 'flex';
        collapseIcon.style.transform = 'rotate(0deg)';
        answerSection.classList.remove('collapsed');
    } else {
        answerContent.style.display = 'none';
        collapseIcon.style.transform = 'rotate(180deg)';
        answerSection.classList.add('collapsed');
    }
}
// ========================================
// 검색 및 질문 기능
// ========================================

// 검색 실행
function performSearch() {
    const promptInput = document.getElementById('promptInput');
    const query = promptInput.value.trim();
    
    if (query) {
        const url = new URL(window.location);
        url.searchParams.set('query', query);
        window.location.href = url.toString();
    }
}
// 이어서 질문하기 전송
function sendContinueQuestion() {
    const continueChatInput = document.getElementById('continueChatInput');
    const question = continueChatInput.value.trim();
    
    if (!question) return;
    
    addNewQueryBubble(question);
    
    continueChatInput.value = '';
    document.getElementById('continueChatSend').disabled = true;
    
    addContinueAnswerWithProcess();
}
// 새로운 질의 말풍선 추가
function addNewQueryBubble(question) {
    const searchContext = document.querySelector('.search-context');
    
    const newQueryBubble = document.createElement('div');
    newQueryBubble.className = 'search-context';
    newQueryBubble.innerHTML = `
        <div class="search-container">
            <div class="search-text">"${question}"</div>
        </div>
    `;
    
    searchContext.parentNode.insertBefore(newQueryBubble, searchContext.nextSibling);
    
    newQueryBubble.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
// 이어서 질문하기 답변과 처리 과정 추가
function addContinueAnswerWithProcess() {
    const continueChatContainer = document.getElementById('continueChatContainer');
    
    const answerSection = document.createElement('div');
    answerSection.className = 'bioone-answer';
    answerSection.innerHTML = `
        <div class="bioone-process">
            <div class="process-title">BioOne AI Process</div>
            <div class="process-detail">
                <div class="process-item">질의분석중입니다.</div>
                <div class="process-item">BioOne이 구축한 VectorDB를 검색중입니다.</div>
                <div class="process-item">LLM이 답변을 생성하고 있습니다.</div>
            </div>
        </div>
        
        <div class="answer-header" style="display: none;">
            <div class="answer-container" onclick="switchTab('answer', this)">
                <div class="answer-header-text">BioOne AI 답변</div>
            </div>
            <div class="source-container" onclick="switchTab('source', this)">
                <div class="source-header-text">출처(2)</div>
            </div>
            <div class="collapse-icon" onclick="toggleCollapse(this)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 15l-6-6-6 6"/>
                </svg>
            </div>
        </div>
        
        <div class="tab-content" style="display: none;">
            <div class="answer-text">
                <p>이어서 질문하신 내용에 대한 답변입니다. CRISPR-Cas13 기술의 추가적인 특징이나 응용 분야에 대해 더 자세히 설명드릴 수 있습니다.</p>
                <p>특히 RNA 바이러스 치료 분야에서의 최신 연구 동향과 향후 전망에 대해서도 논의할 수 있습니다.</p>
            </div>
            <div class="keyword-tags" style="display: flex;">
                <div class="keyword-container">
                    <div class="keyword-text">추가 질문</div>
                </div>
                <div class="keyword-container">
                    <div class="keyword-text">연관 연구</div>
                </div>
            </div>
            <div class="reference">
                <div class="reference-title">출처</div>
                <div class="reference-link">새로운 출처</div>
            </div>
            <div class="footer">
                <div class="footer-container">
                    <div class="save-icon" onclick="openSaveModal()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1 2 2z" />
                            <polyline points="17,21 17,13 7,13 7,21" />
                            <polyline points="7,3 7,8 15,8" />
                        </svg>
                    </div>
                    <div class="copy-icon" onclick="copyAnswer()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9l2 2h4a2 2 0 0 1 2 2v9" />
                        </svg>
                    </div>
                    <div class="delete-icon" onclick="deleteAnswer()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6" />
                            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                        </svg>
                    </div>
                </div>
                <div class="feedback-container">
                    <div class="feedback-text">전문가의 의견으로 답변을 평가해주세요.</div>
                    <div class="good-icon" onclick="toggleLike()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                    </div>
                    <div class="bad-icon" onclick="openDislikeModal()">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    continueChatContainer.parentNode.insertBefore(answerSection, continueChatContainer);
    
    answerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    currentProcess = 0;
    showContinueNextProcess(answerSection.querySelector('.bioone-process'));
}
function showContinueNextProcess(processSection) {
    const processItems = processSection.querySelectorAll('.process-item');
    
    if (currentProcess < processItems.length) {
        if (currentProcess > 0) {
            processItems[currentProcess - 1].classList.add('completed');
            processItems[currentProcess - 1].classList.remove('active');
        }
        
        processItems[currentProcess].classList.add('active');
        
        currentProcess++;
        
        setTimeout(() => {
            if (currentProcess < processItems.length) {
                showContinueNextProcess(processSection);
            } else {
                setTimeout(() => {
                    showContinueAIAnswer(processSection);
                }, 1000);
            }
        }, 2000);
    }
}
function showContinueAIAnswer(processSection) {
    if (processSection) {
        processSection.style.display = 'none';
    }
    
    const answerSection = processSection.parentElement;
    const answerHeader = answerSection.querySelector('.answer-header');
    const tabContent = answerSection.querySelector('.tab-content');
    
    if (answerHeader) {
        answerHeader.style.display = 'flex';
    }
    
    if (tabContent) {
        tabContent.style.display = 'flex';
    }
}
function switchTab(tabName) {
    const answerTab = document.getElementById('answerTab');
    const sourceTab = document.getElementById('sourceTab');
    const answerContent = document.getElementById('answerContent');
    const sourceContent = document.getElementById('sourceContent');
    
    if (tabName === 'answer') {
        answerTab.classList.add('active');
        sourceTab.classList.remove('active');
        answerContent.style.display = 'block';
        sourceContent.style.display = 'none';
    } else if (tabName === 'source') {
        sourceTab.classList.add('active');
        answerTab.classList.remove('active');
        sourceContent.style.display = 'block';
        answerContent.style.display = 'none';
    }
}
// ========================================
// 답변 상호작용 기능
// ========================================

// 좋아요 토글
function toggleLike() {
    const likeBtn = document.getElementById('likeBtn');
    isLiked = !isLiked;
    
    if (isLiked) {
        likeBtn.classList.add('liked');
    } else {
        likeBtn.classList.remove('liked');
    }
}
// 싫어요 모달 열기
function openDislikeModal() {
    const modal = document.getElementById('dislikeModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}
// 싫어요 모달 닫기
function closeDislikeModal() {
    const modal = document.getElementById('dislikeModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('dislikeReason').value = '';
    }
}
// 싫어요 피드백 제출
function submitDislike() {
    const reason = document.getElementById('dislikeReason').value.trim();
    if (reason) {
        alert('의견이 제출되었습니다. 감사합니다.');
        closeDislikeModal();
    } else {
        alert('의견을 입력해주세요.');
    }
}
// ========================================
// 저장 및 프로젝트 관리
// ========================================

// 저장 모달 열기
function openSaveModal() {
    const modal = document.getElementById('saveModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}
// 저장 모달 닫기
function closeSaveModal() {
    const modal = document.getElementById('saveModal');
    if (modal) {
        modal.style.display = 'none';
        selectedProject = null;
        document.querySelectorAll('.project-item').forEach(item => {
            item.classList.remove('selected');
        });
    }
}
// 프로젝트 선택
function selectProject(element) {
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedProject = element.querySelector('.project-name').textContent;
}
// 새 프로젝트 추가
function addNewProject() {
    const projectName = prompt('새 프로젝트 이름을 입력하세요:');
    if (projectName && projectName.trim()) {
        const projectList = document.querySelector('.project-list');
        const addBtn = document.querySelector('.add-project-btn');
        
        const newProject = document.createElement('div');
        newProject.className = 'project-item';
        newProject.onclick = function() { selectProject(this); };
        newProject.innerHTML = `<span class="project-name">${projectName.trim()}</span>`;
        
        projectList.insertBefore(newProject, addBtn);
    }
}
// 저장 확인
function confirmSave() {
    if (selectedProject) {
        alert(`"${selectedProject}"에 저장되었습니다.`);
        closeSaveModal();
    } else {
        alert('프로젝트를 선택해주세요.');
    }
}
// ========================================
// 답변 조작 기능
// ========================================

// 답변 복사
function copyAnswer() {
    const aiAnswer = document.getElementById('aiAnswer');
    if (aiAnswer) {
        const text = aiAnswer.innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('답변이 클립보드에 복사되었습니다.');
        }).catch(() => {
            alert('복사에 실패했습니다.');
        });
    }
}
// 답변 삭제
function deleteAnswer() {
    if (confirm('답변을 삭제하시겠습니까?')) {
        alert('답변이 삭제되었습니다.');
    }
}
// 관련 질문하기
function askRelatedQuestion(element) {
    const question = element.textContent.trim();
    const url = new URL(window.location);
    url.searchParams.set('query', question);
    window.location.href = url.toString();
}
// 새 질문하기
function askNewQuestion() {
    const newQuestionInput = document.getElementById('newQuestionInput');
    const question = newQuestionInput.value.trim();
    
    if (question) {
        const url = new URL(window.location);
        url.searchParams.set('query', question);
        window.location.href = url.toString();
    }
}
// ========================================
// 유틸리티 함수
// ========================================

// 텍스트영역 자동 크기 조정
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
// 모든 모달 닫기
function closeAllModals() {
    closeSaveModal();
    closeDislikeModal();
}
// ========================================
// 관련자료 섹션 기능
// ========================================

// 카테고리 탭 선택
function selectCategoryTab(clickedTab) {
    const allTabs = document.querySelectorAll('.category-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    clickedTab.classList.add('active');
    
    const categoryName = clickedTab.querySelector('span:first-child').textContent;
    updateMaterialListByCategory(categoryName);
}
// 카테고리별 자료 목록 업데이트
function updateMaterialListByCategory(categoryName) {
    const materialList = document.querySelector('.material-list');
    if (!materialList) return;

    materialList.innerHTML = '';

    const categoryData = {
        '국내소재': [
            { name: '국내 COVID-19 바이러스', info: '자원고유번호 : KOR-001 국문명 : 국내 COVID-19 바이러스 자원종류 : 바이러스 소재클러스터 : 병원체' },
            { name: '국내 진단 키트', info: '자원고유번호 : KOR-002 국문명 : 국내 진단 키트 자원종류 : 진단도구 소재클러스터 : 합성화합물' },
            { name: '국내 백신 원료', info: '자원고유번호 : KOR-003 국문명 : 국내 백신 원료 자원종류 : 백신 소재클러스터 : 합성화합물' }
        ],
        '해외소재': [
            { name: '해외 COVID-19 바이러스', info: '자원고유번호 : INT-001 국문명 : 해외 COVID-19 바이러스 자원종류 : 바이러스 소재클러스터 : 병원체' },
            { name: '해외 진단 키트', info: '자원고유번호 : INT-002 국문명 : 해외 진단 키트 자원종류 : 진단도구 소재클러스터 : 합성화합물' },
            { name: '해외 백신 원료', info: '자원고유번호 : INT-003 국문명 : 해외 백신 원료 자원종류 : 백신 소재클러스터 : 합성화합물' }
        ],
        '기타소재': [
            { name: '기타 바이러스 샘플', info: '자원고유번호 : ETC-001 국문명 : 기타 바이러스 샘플 자원종류 : 바이러스 소재클러스터 : 병원체' },
            { name: '기타 진단 도구', info: '자원고유번호 : ETC-002 국문명 : 기타 진단 도구 자원종류 : 진단도구 소재클러스터 : 합성화합물' },
            { name: '기타 연구 소재', info: '자원고유번호 : ETC-003 국문명 : 기타 연구 소재 자원종류 : 연구용 소재클러스터 : 기타' }
        ]
    };

    const materials = categoryData[categoryName] || [];
    
    materials.forEach((material, index) => {
        const materialItem = document.createElement('div');
        materialItem.className = 'material-item';
        materialItem.innerHTML = `
            <div class="material-name">${material.name}</div>
            <div class="material-info">${material.info}</div>
            <div class="material-actions">
                <div class="interest-button">
                    <span>관심소재등록</span>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </div>
            </div>
        `;
        
        if (index > 0) {
            materialItem.style.borderTop = '1px solid #DDDDDD';
            materialItem.style.paddingTop = '30px';
        }
        
        materialList.appendChild(materialItem);
    });
}

// 키워드 태그 선택
function selectKeywordTag(clickedButton) {
    // 모든 키워드 버튼에서 active 클래스 제거
    const allButtons = document.querySelectorAll('.keyword-button');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 클릭된 버튼에 active 클래스 추가
    clickedButton.classList.add('active');
    
    // 선택된 키워드 텍스트 가져오기
    const selectedKeyword = clickedButton.textContent.trim();
    console.log('선택된 키워드:', selectedKeyword);
    
    // 여기에 키워드에 따른 추가 로직을 구현할 수 있습니다
    // 예: 관련 데이터 필터링, 검색 결과 업데이트 등
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('키워드 태그 기능이 로드되었습니다.');
    
    // 이어서 질문하기 입력창 이벤트 리스너 추가
    const continueChatInput = document.getElementById('continueChatInput');
    const continueChatSend = document.getElementById('continueChatSend');
    
    if (continueChatInput && continueChatSend) {
        // 초기 상태: 버튼 비활성화
        continueChatSend.disabled = true;
        
        // 입력 이벤트 리스너
        continueChatInput.addEventListener('input', function() {
            const hasText = this.value.trim().length > 0;
            continueChatSend.disabled = !hasText;
        });
        
        // Enter 키 이벤트
        continueChatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !continueChatSend.disabled) {
                sendContinueQuestion();
            }
        });
    }
    
    // 채팅 검색 입력창 이벤트 리스너 추가
    const chatSearchInput = document.getElementById('chatSearchInput');
    const chatSearchBtn = document.querySelector('.chat-search-btn');
    
    if (chatSearchInput && chatSearchBtn) {
        // 초기 상태: 버튼 비활성화
        chatSearchBtn.disabled = true;
        
        // 입력 이벤트 리스너
        chatSearchInput.addEventListener('input', function() {
            const hasText = this.value.trim().length > 0;
            chatSearchBtn.disabled = !hasText;
        });
        
        // Enter 키 이벤트
        chatSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !chatSearchBtn.disabled) {
                searchChat();
            }
        });
    }
});

// 채팅 검색 실행
function searchChat() {
    const searchInput = document.getElementById('chatSearchInput');
    const searchBtn = document.querySelector('.chat-search-btn');
    const searchTerm = searchInput.value.trim();
    const resultsContainer = document.getElementById('chatSearchResults');
    
    if (searchTerm === '') {
        resultsContainer.innerHTML = '<div class="no-results">검색어를 입력해주세요.</div>';
        return;
    }
    
    // 검색 후 입력창 비우고 버튼 비활성화
    searchInput.value = '';
    searchBtn.disabled = true;
    
    // 임시 검색 결과 (실제로는 서버에서 데이터를 가져와야 함)
    const mockResults = [
        {
            id: 1,
            query: "COVID-19의 실험에서 유전자 편집 기술이 사용된 괄목할만한 성과가 있어?",
            answer: "네, COVID-19 연구에서 CRISPR-Cas13 기술을 활용한 바이러스 억제 연구가 주목받고 있습니다...",
            date: "2024-01-15",
            isFavorite: false
        },
        {
            id: 2,
            query: "RNA 바이러스 치료 방법은?",
            answer: "RNA 바이러스 치료를 위한 다양한 접근법이 연구되고 있으며...",
            date: "2024-01-14",
            isFavorite: true
        }
    ];
    
    // 검색어가 포함된 결과 필터링
    const filteredResults = mockResults.filter(result => 
        result.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredResults.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
        return;
    }
    
    // 검색 결과 렌더링
    resultsContainer.innerHTML = filteredResults.map(result => `
        <div class="search-result-item">
            <div class="result-query">${result.query}</div>
            <div class="result-answer">${result.answer.substring(0, 100)}...</div>
            <div class="result-meta">
                <span class="result-date">${result.date}</span>
                <button class="favorite-btn ${result.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${result.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

// 필터 토글
function toggleFilter(clickedTag) {
    // 모든 필터 태그에서 active 클래스 제거
    const allTags = document.querySelectorAll('.filter-tag');
    allTags.forEach(tag => tag.classList.remove('active'));
    
    // 클릭된 태그에 active 클래스 추가
    clickedTag.classList.add('active');
    
    // 필터에 따른 검색 결과 업데이트 (실제로는 서버에서 데이터를 가져와야 함)
    console.log('필터 변경:', clickedTag.textContent);
}

// 즐겨찾기 토글
function toggleFavorite(resultId) {
    const favoriteBtn = event.target.closest('.favorite-btn');
    favoriteBtn.classList.toggle('active');
    
    console.log('즐겨찾기 토글:', resultId);
}

// 질의 카드 선택
function selectQuery(queryId) {
    // 모든 질의 카드에서 선택 상태 제거
    const allCards = document.querySelectorAll('.query-card');
    allCards.forEach(card => card.classList.remove('selected'));
    
    // 선택된 카드에 선택 상태 추가
    event.currentTarget.classList.add('selected');
    
    console.log('질의 선택:', queryId);
    
    // 여기에 선택된 질의의 상세 내용을 중앙 영역에 표시하는 로직을 추가할 수 있습니다
    // 예: loadQueryDetails(queryId);
}

// 케밥 메뉴 토글
function toggleKebabMenu(kebabElement) {
    // 모든 케밥 드롭다운 닫기
    const allDropdowns = document.querySelectorAll('.kebab-dropdown');
    allDropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    
    // 클릭된 케밥 메뉴의 드롭다운 토글
    const dropdown = kebabElement.querySelector('.kebab-dropdown');
    dropdown.classList.toggle('show');
}

// 질의 편집
function editQuery(queryId) {
    const queryCard = document.querySelector(`[onclick*="selectQuery(${queryId})"]`);
    const queryTitle = queryCard.querySelector('.query-title');
    const currentTitle = queryTitle.textContent;
    
    // 편집 모드로 전환
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentTitle;
    input.className = 'query-title-edit';
    input.style.cssText = `
        width: 100%;
        padding: 4px 8px;
        border: 1px solid #7D53EB;
        border-radius: 4px;
        font-family: 'Pretendard', sans-serif;
        font-size: 14px;
        outline: none;
    `;
    
    // 기존 제목을 입력 필드로 교체
    queryTitle.style.display = 'none';
    queryTitle.parentNode.insertBefore(input, queryTitle);
    input.focus();
    input.select();
    
    // 저장 함수
    const saveEdit = () => {
        const newTitle = input.value.trim();
        if (newTitle && newTitle !== currentTitle) {
            queryTitle.textContent = newTitle;
            console.log('질의 제목 수정:', queryId, newTitle);
        }
        queryTitle.style.display = 'block';
        input.remove();
    };
    
    // 취소 함수
    const cancelEdit = () => {
        queryTitle.style.display = 'block';
        input.remove();
    };
    
    // 이벤트 리스너 추가
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    });
    
    // 케밥 메뉴 닫기
    const dropdown = queryCard.querySelector('.kebab-dropdown');
    dropdown.classList.remove('show');
}

// 질의 삭제
function deleteQuery(queryId) {
    if (confirm('이 대화를 삭제하시겠습니까?')) {
        const queryCard = document.querySelector(`[onclick*="selectQuery(${queryId})"]`);
        queryCard.remove();
        console.log('질의 삭제:', queryId);
    }
    
    // 케밥 메뉴 닫기
    const dropdown = document.querySelector('.kebab-dropdown.show');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

// 외부 클릭 시 케밥 메뉴 닫기
document.addEventListener('click', function(event) {
    if (!event.target.closest('.kebab-menu')) {
        const allDropdowns = document.querySelectorAll('.kebab-dropdown');
        allDropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    }
});

