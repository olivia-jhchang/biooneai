// 마이페이지 JavaScript 기능

// 메뉴 선택 기능
function selectMenu(menuType) {
    // 모든 메뉴 아이템에서 active 클래스 제거
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 클릭된 메뉴 아이템에 active 클래스 추가
    event.target.closest('.menu-item').classList.add('active');
    
    // 메인 콘텐츠 업데이트
    const contentHeader = document.querySelector('.content-header h2');
    const projectsSection = document.getElementById('projects-section');
    const chatsSection = document.getElementById('chats-section');
    
    if (menuType === 'projects') {
        contentHeader.textContent = '내 프로젝트 관리';
        projectsSection.style.display = 'block';
        chatsSection.style.display = 'none';
    } else if (menuType === 'chats') {
        contentHeader.textContent = '채팅 관리';
        projectsSection.style.display = 'none';
        chatsSection.style.display = 'block';
    }
    
    console.log(`${menuType} 메뉴가 선택되었습니다.`);
}

// 프로젝트 열기 기능
function openProject(projectId) {
    console.log(`프로젝트 ${projectId}를 열었습니다.`);
    // 여기에 프로젝트 상세 페이지로 이동하거나 모달을 여는 로직을 추가할 수 있습니다.
    alert(`프로젝트 ${projectId}를 열었습니다.`);
}

// 프로젝트 편집 기능
function editProject(projectId) {
    event.stopPropagation(); // 카드 클릭 이벤트 방지
    console.log(`프로젝트 ${projectId}를 편집합니다.`);
    // 여기에 편집 모달을 여는 로직을 추가할 수 있습니다.
    alert(`프로젝트 ${projectId} 편집 기능입니다.`);
}

// 프로젝트 삭제 기능
function deleteProject(projectId) {
    event.stopPropagation(); // 카드 클릭 이벤트 방지
    console.log(`프로젝트 ${projectId}를 삭제합니다.`);
    
    if (confirm(`프로젝트 ${projectId}를 정말 삭제하시겠습니까?`)) {
        // 여기에 실제 삭제 로직을 추가할 수 있습니다.
        alert(`프로젝트 ${projectId}가 삭제되었습니다.`);
    }
}

// 채팅 검색 기능
function searchChats() {
    const searchInput = document.getElementById('chatSearchInput');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    console.log(`채팅 검색: ${searchTerm}`);
    // 여기에 실제 검색 로직을 추가할 수 있습니다.
    alert(`"${searchTerm}" 검색 결과를 표시합니다.`);
}

// 채팅 접기/펼치기 기능
function toggleChat(chatId) {
    const chatContent = document.getElementById(`chat-content-${chatId.split('chat')[1]}`);
    const collapseBtn = document.getElementById(`collapse-${chatId}`);
    
    if (chatContent.style.display === 'none') {
        chatContent.style.display = 'block';
        collapseBtn.classList.add('rotated');
    } else {
        chatContent.style.display = 'none';
        collapseBtn.classList.remove('rotated');
    }
}

// 질문 답변 펼치기/접기 기능
function toggleAnswer(questionId) {
    event.stopPropagation(); // 채팅 접기 이벤트 방지
    const answerContent = document.getElementById(`answer-${questionId}`);
    const questionItem = event.target.closest('.question-item');
    
    if (answerContent.style.display === 'none') {
        answerContent.style.display = 'block';
        questionItem.classList.add('expanded');
    } else {
        answerContent.style.display = 'none';
        questionItem.classList.remove('expanded');
    }
}


// 피드백 모달 열기
function openFeedbackModal(event) {
    event.stopPropagation(); // 질문 클릭 이벤트 방지
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

// 피드백 모달 닫기
function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 배경 스크롤 복원
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

// 채팅 편집 기능
function editChat(chatId) {
    const chatItem = document.querySelector(`[onclick*="toggleChat('${chatId}')"]`);
    const chatTitle = chatItem.querySelector('.chat-title');
    const currentTitle = chatTitle.textContent;
    
    // 편집 모드로 전환
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentTitle;
    input.className = 'chat-title-edit';
    input.style.cssText = `
        width: 100%;
        padding: 4px 8px;
        border: 1px solid #3B82F6;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        color: #1F2937;
        background: white;
        outline: none;
    `;
    
    // 기존 제목을 입력 필드로 교체
    chatTitle.innerHTML = '';
    chatTitle.appendChild(input);
    input.focus();
    input.select();
    
    // 저장 함수
    const saveEdit = () => {
        const newTitle = input.value.trim();
        if (newTitle && newTitle !== currentTitle) {
            chatTitle.textContent = newTitle;
            console.log('채팅 제목 수정:', chatId, newTitle);
        } else {
            chatTitle.textContent = currentTitle;
        }
    };
    
    // 이벤트 리스너 추가
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            chatTitle.textContent = currentTitle;
        }
    });
    
    // 케밥 메뉴 닫기
    const dropdown = document.querySelector('.kebab-dropdown.show');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

// 채팅 삭제 기능
function deleteChat(chatId) {
    if (confirm('이 채팅을 삭제하시겠습니까?')) {
        const chatItem = document.querySelector(`[onclick*="toggleChat('${chatId}')"]`).closest('.chat-item');
        chatItem.remove();
        console.log('채팅 삭제:', chatId);
    }
    
    // 케밥 메뉴 닫기
    const dropdown = document.querySelector('.kebab-dropdown.show');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

// 프로젝트 검색 기능
function searchProjects() {
    const searchInput = document.getElementById('projectSearchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const projectTitle = item.querySelector('.project-title').textContent.toLowerCase();
        const projectQuestions = item.querySelectorAll('.question-item');
        let hasMatch = projectTitle.includes(searchTerm);
        
        // 질문 내용에서도 검색
        if (!hasMatch) {
            projectQuestions.forEach(question => {
                if (question.textContent.toLowerCase().includes(searchTerm)) {
                    hasMatch = true;
                }
            });
        }
        
        // 매칭 결과에 따라 표시/숨김
        if (hasMatch || searchTerm === '') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    console.log('프로젝트 검색:', searchTerm);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('마이페이지가 로드되었습니다.');
    
    // 채팅 검색 입력창 이벤트 리스너
    const chatSearchInput = document.getElementById('chatSearchInput');
    if (chatSearchInput) {
        chatSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                searchChats();
            }
        });
    }
    
    // 프로젝트 검색 입력창 이벤트 리스너
    const projectSearchInput = document.getElementById('projectSearchInput');
    if (projectSearchInput) {
        projectSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                searchProjects();
            }
        });
        projectSearchInput.addEventListener('input', searchProjects);
    }
    
    // 모달 배경 클릭 시 닫기
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeFeedbackModal();
            }
        });
    }
});
