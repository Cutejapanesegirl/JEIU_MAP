const scheduleData = {
    "604호": [
      { day: "월요일", time: "09:00~11:00", subject: "웹프로그래밍", professor: "김지훈" },
      { day: "수요일", time: "13:00~15:00", subject: "자료구조", professor: "이은지" }
    ]
  };
  
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
    const allButtons = document.querySelectorAll('.room-btn');
    allButtons.forEach(btn => {
      const btnFloor = parseInt(btn.dataset.floor);
      btn.style.display = (btnFloor === floor) ? 'block' : 'none';
    });
  
    // 정보 초기화
    document.getElementById('room-info').innerHTML = '';
    document.getElementById('today-location').innerText = '';
  }
  
  