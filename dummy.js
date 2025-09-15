// dummy.js - 모든 더미 데이터를 관리하는 중앙 파일

// 검색 결과 데이터
const searchResultsData = [
    {
        id: 1,
        title: "이게되나? 왜 적용이 안되는거지",
        description: "인간 신장 세포주로 널리 사용되는 세포주입니다. 유전자 발현 연구와 바이러스 생산에 적합합니다.",
        resource_number: "안알랴줌",
        korean_name: "-",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell1.jpg"
    },
    {
        id: 2,
        title: "HEK-293 세포주",
        description: "인간 신장 세포주로 널리 사용되는 세포주입니다. 유전자 발현 연구와 바이러스 생산에 적합합니다.",
        resource_number: "293[HEK-293]",
        korean_name: "-",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell2.jpg"
    },
    {
        id: 3,
        title: "HEK-293 세포주",
        description: "인간 신장 세포주로 널리 사용되는 세포주입니다. 유전자 발현 연구와 바이러스 생산에 적합합니다.",
        resource_number: "293[HEK-293]",
        korean_name: "-",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell3.jpg"
    },
    {
        id: 4,
        title: "HeLa 세포주",
        description: "자궁경부암 세포주로 가장 널리 사용되는 세포주입니다. 암 연구의 표준 모델로 활용됩니다.",
        resource_number: "HeLa",
        korean_name: "HeLa 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell4.jpg"
    },
    {
        id: 5,
        title: "CHO 세포주",
        description: "중국 햄스터 난소 세포주로 단백질 생산에 최적화된 세포주입니다.",
        resource_number: "CHO-K1",
        korean_name: "CHO 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell5.jpg"
    },
    {
        id: 6,
        title: "Vero 세포주",
        description: "아프리카 녹원숭이 신장 세포주로 바이러스 연구에 널리 사용됩니다.",
        resource_number: "Vero",
        korean_name: "Vero 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell6.jpg"
    },
    {
        id: 7,
        title: "A549 세포주",
        description: "인간 폐암 세포주로 호흡기 연구에 적합한 세포주입니다.",
        resource_number: "A549",
        korean_name: "A549 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell7.jpg"
    },
    {
        id: 8,
        title: "MCF-7 세포주",
        description: "인간 유방암 세포주로 암 연구의 중요한 모델입니다.",
        resource_number: "MCF-7",
        korean_name: "MCF-7 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell8.jpg"
    },
    {
        id: 9,
        title: "NIH3T3 세포주",
        description: "마우스 섬유아세포주로 세포 생물학 연구에 사용됩니다.",
        resource_number: "NIH3T3",
        korean_name: "NIH3T3 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell9.jpg"
    },
    {
        id: 10,
        title: "RAW264.7 세포주",
        description: "마우스 대식세포주로 면역 연구에 적합한 세포주입니다.",
        resource_number: "RAW264.7",
        korean_name: "RAW264.7 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell10.jpg"
    },
    {
        id: 11,
        title: "COVID-19 바이러스의 유전자 구조와 변이 분석",
        description: "SARS-CoV-2 바이러스의 유전자 구조를 분석하고, 주요 변이체들의 특성을 조사한 연구입니다.",
        resource_number: "COVID-2024-001",
        korean_name: "COVID-19 유전자 분석 연구",
        resource_type: "논문",
        cluster: "바이러스연구",
        image_url: "images/paper1.jpg"
    },
    {
        id: 12,
        title: "CRISPR-Cas9 기술을 이용한 유전자 편집",
        description: "CRISPR-Cas9 기술을 활용한 정밀 유전자 편집 방법에 대한 특허입니다.",
        resource_number: "PATENT-2024-001",
        korean_name: "CRISPR 유전자 편집 특허",
        resource_type: "특허",
        cluster: "유전자편집",
        image_url: "images/patent1.jpg"
    },
    {
        id: 13,
        title: "단백질 발현 데이터베이스",
        description: "다양한 세포주에서의 단백질 발현 패턴 데이터를 수집한 데이터베이스입니다.",
        resource_number: "DATA-2024-001",
        korean_name: "단백질 발현 데이터베이스",
        resource_type: "데이터",
        cluster: "단백질연구",
        image_url: "images/data1.jpg"
    },
    {
        id: 14,
        title: "암세포의 대사 메커니즘 연구",
        description: "암세포의 대사 변화와 에너지 생산 메커니즘에 대한 최신 연구입니다.",
        resource_number: "CANCER-2024-001",
        korean_name: "암세포 대사 연구",
        resource_type: "논문",
        cluster: "암연구",
        image_url: "images/paper2.jpg"
    },
    {
        id: 15,
        title: "항체 생산 기술 특허",
        description: "효율적인 항체 생산을 위한 새로운 기술에 대한 특허입니다.",
        resource_number: "ANTIBODY-2024-001",
        korean_name: "항체 생산 기술 특허",
        resource_type: "특허",
        cluster: "항체연구",
        image_url: "images/patent2.jpg"
    },
    {
        id: 16,
        title: "줄기세포 분화 메커니즘 연구",
        description: "줄기세포의 분화 과정과 조절 메커니즘에 대한 연구입니다.",
        resource_number: "STEM-2024-001",
        korean_name: "줄기세포 분화 연구",
        resource_type: "논문",
        cluster: "줄기세포연구",
        image_url: "images/paper3.jpg"
    },
    {
        id: 17,
        title: "바이오마커 검출 데이터",
        description: "다양한 질병의 바이오마커 검출을 위한 실험 데이터입니다.",
        resource_number: "BIOMARKER-2024-001",
        korean_name: "바이오마커 검출 데이터",
        resource_type: "데이터",
        cluster: "진단기술",
        image_url: "images/data2.jpg"
    },
    {
        id: 18,
        title: "면역치료제 개발 특허",
        description: "새로운 면역치료제 개발을 위한 기술에 대한 특허입니다.",
        resource_number: "IMMUNO-2024-001",
        korean_name: "면역치료제 개발 특허",
        resource_type: "특허",
        cluster: "면역치료",
        image_url: "images/patent3.jpg"
    },
    {
        id: 19,
        title: "신경세포 네트워크 연구",
        description: "뇌 신경세포 간의 네트워크 연결과 신호 전달에 대한 연구입니다.",
        resource_number: "NEURO-2024-001",
        korean_name: "신경세포 네트워크 연구",
        resource_type: "논문",
        cluster: "신경과학",
        image_url: "images/paper4.jpg"
    },
    {
        id: 20,
        title: "바이오마커데이터",
        description: "다양한 질병의 바이오마커 데이터를 수집한 데이터베이스입니다.",
        resource_number: "BIOMARKER-DB-001",
        korean_name: "바이오마커데이터",
        resource_type: "데이터",
        cluster: "진단기술",
        image_url: "images/data3.jpg"
    },
    {
        id: 21,
        title: "COVID-19 바이러스 연구 가이드",
        description: "COVID-19 바이러스 연구를 위한 종합적인 가이드라인과 연구 방법론을 제공합니다.",
        resource_number: "COVID-GUIDE-001",
        korean_name: "COVID-19 연구 가이드",
        resource_type: "지식정보",
        cluster: "연구방법론",
        image_url: "images/guide1.jpg"
    },
    {
        id: 22,
        title: "바이오소재 분류 체계",
        description: "바이오소재의 체계적인 분류와 관리 방법에 대한 지식 정보입니다.",
        resource_number: "BIO-CLASS-001",
        korean_name: "바이오소재 분류 체계",
        resource_type: "지식정보",
        cluster: "분류체계",
        image_url: "images/guide2.jpg"
    },
    {
        id: 23,
        title: "통합 바이오 플랫폼 데이터베이스",
        description: "다양한 바이오 클러스터의 정보를 통합하여 제공하는 플랫폼입니다.",
        resource_number: "PLATFORM-001",
        korean_name: "통합 바이오 플랫폼",
        resource_type: "통합플랫폼 콘텐츠",
        cluster: "통합플랫폼",
        image_url: "images/platform1.jpg"
    },
    {
        id: 24,
        title: "바이오 연구 네트워크",
        description: "전국 바이오 연구기관 간의 협력 네트워크와 공유 정보를 제공합니다.",
        resource_number: "NETWORK-001",
        korean_name: "바이오 연구 네트워크",
        resource_type: "통합플랫폼 콘텐츠",
        cluster: "연구네트워크",
        image_url: "images/platform2.jpg"
    }
];

// 필터 옵션 데이터
const filterOptionsData = {
    categories: [
        "국내소재",
        "신약정보", 
        "논문",
        "특허",
        "데이터",
        "통합플랫폼 콘텐츠"
    ],
    clusters: [
        "인체유래물",
        "줄기세포",
        "배양세포",
        "천연물",
        "미생물",
        "모델동물",
        "종자",
        "축산",
        "해양생물",
        "뇌",
        "병원체"
    ]
};

// 카테고리별 카운트 계산 함수
function calculateCategoryCounts() {
    const counts = {
        "국내소재": searchResultsData.filter(item => item.resource_type === "국내소재").length,
        "지식정보": searchResultsData.filter(item => item.resource_type === "지식정보").length,
        "논문": searchResultsData.filter(item => item.resource_type === "논문").length,
        "특허": searchResultsData.filter(item => item.resource_type === "특허").length,
        "데이터": searchResultsData.filter(item => item.resource_type === "데이터").length,
        "통합플랫폼 콘텐츠": searchResultsData.filter(item => item.resource_type === "통합플랫폼 콘텐츠").length
    };

    
    console.log('실제 카운트 계산:', counts);
    return counts;
}

// 카테고리 탭 데이터 (동적 계산)
function getCategoryTabsData() {
    const counts = calculateCategoryCounts();
    const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    return [
        { name: "전체", count: totalCount, active: true },
        { name: "국내소재", count: counts["국내소재"], active: false },
        { name: "지식정보", count: counts["지식정보"], active: false },
        { name: "논문", count: counts["논문"], active: false },
        { name: "특허", count: counts["특허"], active: false },
        { name: "데이터", count: counts["데이터"], active: false },
        { name: "통합플랫폼 콘텐츠", count: counts["통합플랫폼 콘텐츠"], active: false }
    ];
}

// 데이터 접근 함수들
function getSearchResults() {
    console.log('getSearchResults 호출됨, 데이터:', searchResultsData);
    return searchResultsData;
}

function getCategoryTabs() {
    return getCategoryTabsData();
}

function getFilterOptions() {
    return filterOptionsData;
}

// 필터링 함수들
function filterByCategory(category) {
    if (category === "전체") {
        return searchResultsData;
    }
    return searchResultsData.filter(item => item.resource_type === category);
}

function filterByCluster(cluster) {
    return searchResultsData.filter(item => item.cluster === cluster);
}

function searchByKeyword(keyword) {
    if (!keyword) return searchResultsData;
    
    const lowerKeyword = keyword.toLowerCase();
    return searchResultsData.filter(item => 
        item.title.toLowerCase().includes(lowerKeyword) ||
        item.description.toLowerCase().includes(lowerKeyword) ||
        item.korean_name.toLowerCase().includes(lowerKeyword) ||
        item.resource_number.toLowerCase().includes(lowerKeyword)
    );
}

// 키워드 검색 결과 데이터
const keywordSearchResultsData = [
    {
        id: 1,
        title: "COVID-19 바이러스의 유전자 구조와 변이 분석",
        type: "논문",
        date: "2024.03.15",
        author: "김바이오 외 3명",
        abstract: "SARS-CoV-2 바이러스의 유전자 구조를 분석하고, 주요 변이체들의 특성을 조사한 연구입니다. 특히 스파이크 단백질의 변이와 전염성, 병원성의 상관관계를 밝혀냈습니다.",
        keywords: ["COVID-19", "SARS-CoV-2", "유전자 변이", "스파이크 단백질"],
        url: "#"
    },
    {
        id: 2,
        title: "COVID-19 진단을 위한 CRISPR 기반 검사법 개발",
        type: "특허",
        date: "2024.02.28",
        author: "이생명공학",
        abstract: "CRISPR-Cas13 기술을 활용한 COVID-19 진단키트 개발에 관한 특허입니다. 기존 PCR 검사보다 빠르고 정확한 진단이 가능한 새로운 방법을 제시했습니다.",
        keywords: ["COVID-19", "CRISPR", "진단키트", "PCR"],
        url: "#"
    },
    {
        id: 3,
        title: "COVID-19 백신 개발을 위한 항원 설계 연구",
        type: "논문",
        date: "2024.01.20",
        author: "박백신연구소",
        abstract: "COVID-19 백신 개발을 위한 최적의 항원 설계 방법에 대한 연구입니다. 다양한 스파이크 단백질 변이체에 대한 면역 반응을 분석했습니다.",
        keywords: ["COVID-19", "백신", "항원설계", "면역반응"],
        url: "#"
    },
    {
        id: 4,
        title: "COVID-19 치료제 개발을 위한 화합물 스크리닝",
        type: "데이터",
        date: "2024.01.10",
        author: "최신약개발",
        abstract: "COVID-19 치료제 후보 화합물들의 스크리닝 결과 데이터입니다. 약 10,000개의 화합물을 대상으로 한 대규모 스크리닝 결과를 포함합니다.",
        keywords: ["COVID-19", "치료제", "화합물", "스크리닝"],
        url: "#"
    },
    {
        id: 5,
        title: "COVID-19 감염 메커니즘과 세포 침입 과정",
        type: "논문",
        date: "2023.12.15",
        author: "정바이러스연구팀",
        abstract: "SARS-CoV-2 바이러스가 인체 세포에 침입하는 과정과 감염 메커니즘에 대한 상세한 연구입니다. ACE2 수용체와의 상호작용을 중심으로 분석했습니다.",
        keywords: ["COVID-19", "감염메커니즘", "ACE2", "세포침입"],
        url: "#"
    }
];

function getKeywordSearchResults() {
    return keywordSearchResultsData;
}