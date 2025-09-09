function handleKeywordSearch() {
    const keywordInput = document.getElementById('keywordInput');
    const keyword = keywordInput.value.trim();
    
    if (keyword === '') return;
    
    window.location.href = `keyword-answer.html?keyword=${encodeURIComponent(keyword)}`;
}
document.getElementById('keywordInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleKeywordSearch();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('지능형 검색 시스템이 준비되었습니다.');
    
    // 캐러셀 변수
    let currentIndex = 0;
    let autoScrollInterval;
    const keywordsList = document.getElementById('keywordsList');
    const keywordItems = document.querySelectorAll('.keyword-item');
    const carousel = document.querySelector('.keywords-carousel');
    
    // 키워드 배열
    const keywords = Array.from(keywordItems).map(item => item.textContent);
    console.log('키워드 배열:', keywords);
    
    // 아이템 너비 계산
    function getItemWidth() {
        if (keywordItems.length > 0) {
            const firstItem = keywordItems[0];
            const rect = firstItem.getBoundingClientRect();
            const gap = 16; // CSS gap 값
            return rect.width + gap;
        }
        return 200; // 기본값
    }
    
    let itemWidth = getItemWidth();
    console.log('아이템 너비:', itemWidth);
    
    // 꼬리물기 형태의 무한 루프 설정
    function setupInfiniteLoop() {
        // 키워드들을 여러 번 복제하여 꼬리물기 효과 생성
        for (let i = 0; i < 3; i++) {
            keywords.forEach(keyword => {
                const span = document.createElement('span');
                span.className = 'keyword-item';
                span.textContent = keyword;
                keywordsList.appendChild(span);
            });
        }
        
        // 모든 아이템에 클릭 이벤트 추가
        const allItems = keywordsList.querySelectorAll('.keyword-item');
        allItems.forEach(item => {
            item.addEventListener('click', function() {
                const keyword = this.textContent.replace('# ', '');
                const keywordInput = document.getElementById('keywordInput');
                keywordInput.value = keyword;
                handleKeywordSearch();
            });
        });
        
        // 아이템 너비 다시 계산
        itemWidth = getItemWidth();
        console.log('복제 후 아이템 너비:', itemWidth);
    }
    
    // 캐러셀 이동 함수
    function moveCarousel(direction) {
        currentIndex += direction;
        
        const translateX = -currentIndex * itemWidth;
        keywordsList.style.transform = `translateX(${translateX}px)`;
        
        // 원본 아이템 개수만큼 이동했을 때 위치 리셋 (끊김 없이)
        if (currentIndex >= keywords.length) {
            setTimeout(() => {
                currentIndex = 0;
                keywordsList.style.transition = 'none';
                keywordsList.style.transform = `translateX(0px)`;
                setTimeout(() => {
                    keywordsList.style.transition = 'transform 0.3s ease';
                }, 50);
            }, 300);
        }
        
        // 첫 번째 아이템 이전으로 가면 마지막으로 이동
        if (currentIndex < 0) {
            currentIndex = keywords.length - 1;
            setTimeout(() => {
                keywordsList.style.transition = 'none';
                keywordsList.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
                setTimeout(() => {
                    keywordsList.style.transition = 'transform 0.3s ease';
                }, 50);
            }, 300);
        }
        
        console.log('캐러셀 이동:', 'direction:', direction, 'currentIndex:', currentIndex, 'translateX:', translateX);
    }
    
    // 삼각형 버튼 클릭 이벤트
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', function() {
        moveCarousel(1);  // 좌 버튼 클릭 시 우측으로 이동
        resetAutoScroll();
    });
    
    nextBtn.addEventListener('click', function() {
        moveCarousel(-1); // 우 버튼 클릭 시 좌측으로 이동
        resetAutoScroll();
    });
    
    // 자동 스크롤 시작
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            moveCarousel(1);
        }, 2000); // 2초마다 이동
    }
    
    // 자동 스크롤 리셋
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }
    
    // 무한 루프 설정
    setupInfiniteLoop();
    
    // 페이지 로드 후 아이템 너비 다시 계산
    setTimeout(() => {
        itemWidth = getItemWidth();
        console.log('최종 아이템 너비:', itemWidth);
    }, 100);
    
    // 자동 스크롤 시작
    startAutoScroll();
    
    // 마우스 호버 시 자동 스크롤 일시정지
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoScrollInterval);
    });
    
    carousel.addEventListener('mouseleave', function() {
        startAutoScroll();
    });
});