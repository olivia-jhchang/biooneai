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
        title: "MRC-5 세포주",
        description: "인간 폐 섬유아세포주로 백신 생산에 사용됩니다.",
        resource_number: "MRC-5",
        korean_name: "MRC-5 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell6.jpg"
    },
    {
        id: 7,
        title: "Vero 세포주",
        description: "아프리카 녹색원숭이 신장 세포주로 바이러스 연구에 사용됩니다.",
        resource_number: "Vero",
        korean_name: "Vero 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell7.jpg"
    },
    {
        id: 8,
        title: "A549 세포주",
        description: "인간 폐암 세포주로 폐암 연구에 널리 사용됩니다.",
        resource_number: "A549",
        korean_name: "A549 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell8.jpg"
    },
    {
        id: 9,
        title: "HCT116 세포주",
        description: "인간 대장암 세포주로 암 연구에 사용됩니다.",
        resource_number: "HCT116",
        korean_name: "HCT116 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell9.jpg"
    },
    {
        id: 10,
        title: "MCF-7 세포주",
        description: "인간 유방암 세포주로 유방암 연구에 사용됩니다.",
        resource_number: "MCF-7",
        korean_name: "MCF-7 세포",
        resource_type: "국내소재",
        cluster: "배양세포",
        image_url: "images/cell10.jpg"
    },
    {
        id: 11,
        title: "COVID-19 바이러스 연구 논문",
        description: "COVID-19 바이러스의 유전자 구조와 변이 분석에 관한 연구입니다.",
        resource_number: "PAPER-001",
        korean_name: "COVID-19 연구논문",
        resource_type: "논문",
        cluster: "바이러스",
        image_url: "images/paper1.jpg"
    },
    {
        id: 12,
        title: "CRISPR 진단 기술 특허",
        description: "CRISPR 기반 COVID-19 진단 기술에 관한 특허입니다.",
        resource_number: "PATENT-001",
        korean_name: "CRISPR 진단특허",
        resource_type: "특허",
        cluster: "진단기술",
        image_url: "images/patent1.jpg"
    },
    {
        id: 13,
        title: "바이오 데이터셋",
        description: "생명공학 연구를 위한 대규모 데이터셋입니다.",
        resource_number: "DATA-001",
        korean_name: "바이오데이터",
        resource_type: "데이터",
        cluster: "데이터베이스",
        image_url: "images/data1.jpg"
    },
    {
        id: 14,
        title: "RNA 바이러스 연구 논문",
        description: "RNA 바이러스의 복제 메커니즘에 관한 연구입니다.",
        resource_number: "PAPER-002",
        korean_name: "RNA 바이러스 연구",
        resource_type: "논문",
        cluster: "바이러스",
        image_url: "images/paper2.jpg"
    },
    {
        id: 15,
        title: "단백질 합성 특허",
        description: "효율적인 단백질 합성 방법에 관한 특허입니다.",
        resource_number: "PATENT-002",
        korean_name: "단백질합성특허",
        resource_type: "특허",
        cluster: "단백질",
        image_url: "images/patent2.jpg"
    },
    {
        id: 16,
        title: "유전자 편집 기술 논문",
        description: "CRISPR-Cas9 기술의 최신 발전에 관한 연구입니다.",
        resource_number: "PAPER-003",
        korean_name: "유전자편집연구",
        resource_type: "논문",
        cluster: "유전자편집",
        image_url: "images/paper3.jpg"
    },
    {
        id: 17,
        title: "바이오센서 데이터",
        description: "바이오센서를 이용한 실시간 모니터링 데이터입니다.",
        resource_number: "DATA-002",
        korean_name: "바이오센서데이터",
        resource_type: "데이터",
        cluster: "센서기술",
        image_url: "images/data2.jpg"
    },
    {
        id: 18,
        title: "항체 치료 특허",
        description: "모노클로날 항체를 이용한 암 치료 기술입니다.",
        resource_number: "PATENT-003",
        korean_name: "항체치료특허",
        resource_type: "특허",
        cluster: "항체치료",
        image_url: "images/patent3.jpg"
    },
    {
        id: 19,
        title: "줄기세포 연구 논문",
        description: "iPS 세포의 분화 제어에 관한 최신 연구입니다.",
        resource_number: "PAPER-004",
        korean_name: "줄기세포연구",
        resource_type: "논문",
        cluster: "줄기세포",
        image_url: "images/paper4.jpg"
    },
    {
        id: 20,
        title: "바이오마커 데이터",
        description: "질병 진단을 위한 바이오마커 데이터베이스입니다.",
        resource_number: "DATA-003",
        korean_name: "바이오마커데이터",
        resource_type: "데이터",
        cluster: "진단기술",
        image_url: "images/data3.jpg"
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
        "병원체",
        "배양세포",
        "모델동물",
        "뇌",
        "미생물",
        "천연물",
        "합성화합물",
        "축산",
        "종자",
        "해양생물"
    ],
    resourceTypes: [
        "표본",
        "개체",
        "기관",
        "조직",
        "배아",
        "세포·세포주",
        "오가노이드",
        "세균",
        "진균",
        "바이러스"
    ]
};

// 필터 버튼 데이터
const filterButtonsData = [
    {
        text: "자원목록 검색 이동",
        action: "resource-search"
    },
    {
        text: "KOBIS 검색 이동", 
        action: "kobis-search"
    },
    {
        text: "구조식 검색 이동",
        action: "structure-search"
    }
];

// 카테고리별 실제 카운트를 계산하는 함수
function calculateCategoryCounts() {
    const results = searchResultsData;
    
    // 각 카테고리별 카운트 계산
    const counts = {
        "국내소재": results.filter(item => item.resource_type === "국내소재").length,
        "지식정보": 0, // 현재 데이터에 없음
        "논문": results.filter(item => item.resource_type === "논문").length,
        "특허": results.filter(item => item.resource_type === "특허").length,
        "데이터": results.filter(item => item.resource_type === "데이터").length,
        "통합플랫폼 콘텐츠": 0 // 현재 데이터에 없음
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

function getFilterOptions() {
    return filterOptionsData;
}

function getFilterButtons() {
    return filterButtonsData;
}

function getCategoryTabs() {
    return getCategoryTabsData();
}

// 데이터 추가 함수
function addSearchResult(newResult) {
    searchResultsData.push({
        id: searchResultsData.length + 1,
        ...newResult
    });
}

function addFilterOption(category, option) {
    if (filterOptionsData[category]) {
        filterOptionsData[category].push(option);
    }
}
