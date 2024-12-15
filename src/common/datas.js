// 취미 버튼
const hobbies = [
  { label: "slideshow", value: "공연/전시회 관람", id: 0 },
  { label: "slideshow", value: "맛집체험", id: 1 },
  { label: "slideshow", value: "스포츠 관람", id: 2 },
  { label: "slideshow", value: "드라이브", id: 3 },
  { label: "slideshow", value: "독서", id: 4 },
  { label: "slideshow", value: "요리", id: 5 },
  { label: "slideshow", value: "악기연주/노래", id: 6 },
  { label: "slideshow", value: "봉사활동", id: 7 },
  { label: "slideshow", value: "글쓰기/블로그", id: 8 },
  { label: "slideshow", value: "그림", id: 9 },
  { label: "slideshow", value: "웹서핑", id: 10 },
  { label: "slideshow", value: "보드게임", id: 11 },
  { label: "slideshow", value: "PC/모바일게임", id: 12 },
  { label: "slideshow", value: "콘솔게임", id: 13 },
  { label: "slideshow", value: "TV/영화", id: 14 },
  { label: "slideshow", value: "국내여행", id: 15 },
  { label: "slideshow", value: "해외여행", id: 16 },
  { label: "slideshow", value: "테마파크", id: 17 },
  { label: "slideshow", value: "사진촬영", id: 18 },
  { label: "slideshow", value: "동호회/소모임", id: 19 },
  { label: "slideshow", value: "반려동물", id: 20 },
  { label: "slideshow", value: "아이템수집", id: 21 },
  { label: "slideshow", value: "소품만들기", id: 22 },
  { label: "slideshow", value: "홈인테리아", id: 23 },
  { label: "slideshow", value: "서예/캘리그라피", id: 24 },
  { label: "slideshow", value: "명상", id: 25 }
]

// 데이트하고싶은거 버튼
const exercises = [
  { label: "slideshow", value: "캠핑", id: 0 },
  { label: "slideshow", value: "홈트레이닝", id: 0 },
  { label: "slideshow", value: "산책", id: 0 },
  { label: "slideshow", value: "수영", id: 0 },
  { label: "slideshow", value: "등산", id: 0 },
  { label: "slideshow", value: "자전거", id: 0 },
  { label: "slideshow", value: "스키/보드", id: 0 },
  { label: "slideshow", value: "요가", id: 0 },
  { label: "slideshow", value: "필라테스", id: 0 },
  { label: "slideshow", value: "헬스", id: 0 },
  { label: "slideshow", value: "조깅/마라톤", id: 0 },
  { label: "slideshow", value: "댄스", id: 0 },
  { label: "slideshow", value: "복싱", id: 0 },
  { label: "slideshow", value: "테니스", id: 0 },
  { label: "slideshow", value: "배드민턴", id: 0 },
  { label: "slideshow", value: "볼링", id: 0 },
  { label: "slideshow", value: "골프", id: 0 },
  { label: "slideshow", value: "야구", id: 0 },
  { label: "slideshow", value: "축구", id: 0 },
  { label: "slideshow", value: "농구", id: 0 },
  { label: "slideshow", value: "탁구", id: 0 },
  { label: "slideshow", value: "당구", id: 0 },
  { label: "slideshow", value: "낚시", id: 0 },
  { label: "slideshow", value: "클라이밍", id: 0 },
  { label: "slideshow", value: "크로스핏", id: 0 },
  { label: "slideshow", value: "수상레포츠", id: 0 }

  // { label: "slideshow", value: "공연전시회관람", id: 0 },
  // { label: "slideshow", value: "공연전시회관람", id: 0 },
]

// 데이트하고싶은거 버튼
const interestedWithMovie = [
  { label: "slideshow", value: "드라마/로맨스", id: 0 },
  { label: "slideshow", value: "코미디", id: 0 },
  { label: "slideshow", value: "액션", id: 0 },
  { label: "slideshow", value: "SF", id: 0 },
  { label: "slideshow", value: "역사", id: 0 },
  { label: "slideshow", value: "애니메이션", id: 0 },
  { label: "slideshow", value: "심리/스릴러", id: 0 },
  { label: "slideshow", value: "공포", id: 0 },
  { label: "slideshow", value: "판타지", id: 0 },
  { label: "slideshow", value: "뮤지컬", id: 0 },
  { label: "slideshow", value: "스포츠", id: 0 },
  { label: "slideshow", value: "전쟁", id: 0 }

]

const interestedWithMusic = [
  { label: "slideshow", value: "락앤롤", id: 0 },
  { label: "slideshow", value: "재즈", id: 0 },
  { label: "slideshow", value: "클래식", id: 0 },
  { label: "slideshow", value: "발라드/R&B", id: 0 },
  { label: "slideshow", value: "힙합/랩", id: 0 },
  { label: "slideshow", value: "EDM", id: 0 },
  { label: "slideshow", value: "컨트리", id: 0 },
  { label: "slideshow", value: "블루스", id: 0 },
  { label: "slideshow", value: "트로트", id: 0 },
  { label: "slideshow", value: "종교", id: 0 }
  // { label: "slideshow", value: "공연전시회관람", id: 0 },
  // { label: "slideshow", value: "공연전시회관람", id: 0 },

]

const interestedWithTV = [
  { label: "slideshow", value: "시사/뉴스", id: 0 },
  { label: "slideshow", value: "다큐", id: 0 },
  { label: "slideshow", value: "오락/예능", id: 0 },
  { label: "slideshow", value: "스포츠", id: 0 },
  { label: "slideshow", value: "국내드라마", id: 0 },
  { label: "slideshow", value: "해외드라마", id: 0 }
]

export {hobbies, exercises, interestedWithMusic,interestedWithTV, interestedWithMovie}