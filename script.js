const scheduleData = {
    "604호": [
      { day: "월요일", time: "09:00~11:00", subject: "웹프로그래밍", professor: "김지훈" },
      { day: "수요일", time: "13:00~15:00", subject: "자료구조", professor: "이은지" }
    ]
  };

  document.addEventListener("DOMContentLoaded", function() {
    const roomButtons = document.querySelectorAll('.room-btn');
    roomButtons.forEach(function(btn) {
      const room = btn.innerText.trim();
      const info = scheduleData[room];
      if (info && info.length > 0) {
        // 첫 번째 수업의 제목(subject)을 툴팁에 표시 (예: "604호, 웹프로그래밍")
        btn.setAttribute("data-tooltip", room + ", " + info[0].subject);
      } else {
        btn.setAttribute("data-tooltip", room);
      }
    });
  });
  
  const departmentFloors = {
    "컴퓨터공학과": [6, 4],
    "정보보안학과": [3, 5]
  };
  
  function showRoomInfo(room) {
    // 학과 메시지 지우기
    document.getElementById('today-location').innerText = '';
  
    const info = scheduleData[room];
    if (!info) {
      document.getElementById('room-info').innerHTML = '수업 정보가 없습니다.';
      return;
    }
  
    let html = `<h3>${room} 강의 정보</h3><ul>`;
    info.forEach(item => {
      html += `<li>${item.day} | ${item.time} | ${item.subject} | ${item.professor}</li>`;
    });
    html += `</ul>`;

    html += `<button onclick="addToFavorites({ text: 'IT관-${room}', link: 'it6.html?floor=6&room=${room}' })">즐겨찾기 추가</button>`;
  
    document.getElementById('room-info').innerHTML = html;
  }
  
  function showTodaySchedule() {
    // 강의실 정보 지우기
    document.getElementById('room-info').innerHTML = '';
  
    const dept = document.getElementById('departments').value;
    const grade = document.getElementById('grades').value;
  
    if (!dept || !grade) {
      document.getElementById('today-location').innerText = '';
      return;
    }
  
    // 보여주기용 랜덤 메시지 구성 (고정된 예시)
    const mockRooms = {
      "컴퓨터공학과": {
        "1학년": { am: "604호", pm: "401호" },
        "2학년": { am: "502호", pm: "605호" },
        "3학년": { am: "301호", pm: "304호" },
        "4학년": { am: "701호", pm: "702호" }
      },
      "정보보안학과": {
        "1학년": { am: "204호", pm: "208호" },
        "2학년": { am: "302호", pm: "306호" },
        "3학년": { am: "403호", pm: "405호" },
        "4학년": { am: "506호", pm: "508호" }
      }
    };
  
    const rooms = mockRooms[dept]?.[grade];
  
    if (!rooms) {
      document.getElementById('today-location').innerText = '해당 정보가 없습니다.';
      return;
    }
  
    const message = `오늘 수업은  
  오전 : ${rooms.am}  
  오후 : ${rooms.pm}에 있습니다.`;
  
    document.getElementById('today-location').innerText = message;
  }

  let currentFloor = 1;
  
  window.onload = () => {
    changeFloor(1); // 1층 강의실만 표시되도록 초기화
  };

  function changeFloor(floor) {
    if (floor < 1 || floor > 6) return;
  
    currentFloor = floor;
    const floorImg = document.getElementById('floor-image');
    floorImg.src = `images/IT-${floor}.png`;
    floorImg.alt = `${floor}층 이미지`;
  
    // 강의실 버튼 표시/숨김
    const allRoomButtons = document.querySelectorAll('.room-btn');
    allRoomButtons.forEach(btn => {
      const btnFloor = parseInt(btn.dataset.floor);
      btn.style.display = (btnFloor === floor) ? 'block' : 'none';
    });
    
    // 교수실 버튼 표시/숨김
    const allOfficeButtons = document.querySelectorAll('.office-btn');
    allOfficeButtons.forEach(btn => {
      const btnFloor = parseInt(btn.dataset.floor);
      btn.style.display = (btnFloor === floor) ? 'block' : 'none';
    });
    
    // 정보 초기화
    document.getElementById('room-info').innerHTML = '';
    document.getElementById('today-location').innerText = '';
  }
  

  function findProfessorOffice() {
    const prof = document.getElementById('professor-name').value;
    const resultDiv = document.getElementById('search-result');
  
    // 보여주기용 메시지
    const officeMap = {
      "김지훈": { floor: 6, location: "교수실 A (6층)" },
      "이은지": { floor: 3, location: "교수실 B (3층)" }
    };
  
    const data = officeMap[prof];
  
    if (!data) {
      resultDiv.innerText = '';
      return;
    }
  
    // 층 이동 + 메시지 출력
    changeFloor(data.floor);
    resultDiv.innerText = `${prof} 교수님의 연구실은 ${data.location}입니다.`;
  }
  
  function searchLecture() {
    const lecture = document.getElementById('lecture-name').value.trim();
    const resultDiv = document.getElementById('search-result');
  
    // 보여주기용 수업 데이터
    const lectureMap = {
      "웹프로그래밍": { building: "IT관", room: "604호", floor: 6 },
      "자료구조": { building: "IT관", room: "304호", floor: 3 },
      "네트워크": { building: "공학관", room: "201호", floor: 2 }
    };
  
    const info = lectureMap[lecture];
  
    if (!info) {
      resultDiv.innerText = `"${lecture}" 수업 정보를 찾을 수 없습니다.`;
      return;
    }
  
    if (info.building === "IT관") {
      changeFloor(info.floor);
    }
  
    resultDiv.innerText = `"${lecture}" 수업은 ${info.building} ${info.room}에서 진행됩니다.`;
  }

  function showProfessorOffice(prof) {
    // 예시 데이터: 교수님의 정보 (교수명, 소속 학과, 오늘 수업)
    const professorInfo = {
      "김지훈": "김지훈 교수님 - 컴퓨터공학과, 오늘 수업: 웹프로그래밍 (604호)",
      "이은지": "이은지 교수님 - 정보보안학과, 오늘 수업: 자료구조 (304호)"
    };
  
    const resultDiv = document.getElementById('search-result');
    const info = professorInfo[prof];
    if (info) {
      resultDiv.innerText = info;
    } else {
      resultDiv.innerText = "해당 교수님의 정보를 찾을 수 없습니다.";
    }
  }
  
  function performSearch() {
    const query = document.getElementById("room-search").value.trim();
    const resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = ""; // 이전 결과 비우기
  
    if (query === "604호") {
      // 옵션 배열에 실제 기능 옵션과 가짜 옵션 추가
      const options = [
        { text: "IT관-604호", link: "it6.html?floor=6&room=604호" },
        { text: "학생관-604호", link: "#" },
        { text: "본관-604호", link: "#" }
      ];
  
      options.forEach(function(option) {
        const a = document.createElement("a");
        a.href = option.link;
        a.target = "_blank";  // IT관-604호의 경우 새 탭에서 열리도록 설정
        a.className = "search-item";
        a.innerText = option.text;
        resultsDiv.appendChild(a);
      });
  
      resultsDiv.style.display = "block";
    } else {
      resultsDiv.style.display = "none";
      alert("검색 결과가 없습니다.");
    }
  }
  
  
// 페이지가 it6.html에서 로드될 경우에만 실행
if (document.getElementById('floor-image')) { // 예: it6.html에만 존재하는 요소
  window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room"); // 예: "604호"
    
    if (roomParam) {
      // 6층으로 자동 전환 (604호는 6층에 있다고 가정)
      changeFloor(6);
      
      // changeFloor 함수가 완료될 시간을 주기 위한 딜레이 후 604호 버튼 클릭
      setTimeout(function() {
        let roomButton = document.getElementById("btn-604");
        if (roomButton) {
          roomButton.click(); // 604호 버튼 자동 클릭
        } else {
          // 대체 동작
          showRoomInfo(roomParam);
        }
      }, 150); // 딜레이 시간은 필요에 따라 조정
    } else {
      changeFloor(1);
    }
  };
}

// 즐겨찾기 저장: localStorage를 활용
function addToFavorites(item) {
  // item은 {text: 'IT관-604호', link: 'it6.html?room=604호'} 같은 객체로 가정
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  // 이미 즐겨찾기에 없는지 체크
  if (!favorites.find(fav => fav.link === item.link)) {
    favorites.push(item);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

// 즐겨찾기 삭제
function removeFromFavorites(link) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(fav => fav.link !== link);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

// 즐겨찾기 목록 렌더링
function renderFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const listElem = document.getElementById("favorites-list");
  listElem.innerHTML = "";
  favorites.forEach(function(fav) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = fav.link;
    a.target = "_blank"; // 새 탭에서 열기
    a.innerText = fav.text;
    li.appendChild(a);
    
    // 삭제 버튼 (간단하게 X 표시)
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = function() { removeFromFavorites(fav.link); };
    li.appendChild(delBtn);
    
    listElem.appendChild(li);
  });
}

// 페이지 로드시 즐겨찾기 목록 표시
document.addEventListener("DOMContentLoaded", renderFavorites);

  