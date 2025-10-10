# UI

## Home

- 정보 카드

  - 트레이너
    - 일반형
  - 패킷몬
    - 일반형
      - [ ] 왼쪽 도트 div와 오른쪽 정보 div 높이 맞추기
    - 컴팩트형
      - [ ] 글자 크기 일치시키기

- 걷기 애니메이션

- 메뉴 버튼들 (몇개?)
  - 도감
  - 내 패킷몬 목록
  - 인벤토리

### Pk Dex

- 모든 패킷몬 조회
- 미포획 패킷몬은 도트 검은칠

### My PkMon

- [ ] 클릭시 자세한 정보

### Inventory

## Start

- [ ] 스타팅 선택시에 자세한 정보 알려주기
- [ ] 오박사 도트 만들기

## Encounter

- [ ]페이지 이동시마다 money += 1

### BattleField

- [ ] back버튼 대신 flee버튼으로 교체하기
  - [ ] flee기능 구현
- [ ] ball 타입 아이템 사용 구현(포획)

## 개발자 콘솔

- [x] 인카운터 버튼
  - [x] `encounterEnabled===true`일때만 가능하게
- [x] step버튼 (페이지 이동 모킹)
- [x] 로컬스토리지 삭제 버튼

# 시스템

## 전투

- 전투는 어떻게?
- 자동 전투
- [ ] 브라우저 닫으면 자동으로 `encounterEnalbed = false`
- [x] `encounterEnabled===true`였던 만큼의 시간 Play time으로 기록하기
- [x] `encounterEnabled ==== false`일때 `hp=maxHp`로

## 패킷몬

- 경험치
  - [x] 경험치 필드 추가
  - [x] 레벨업 로직 일단 구현
  - [ ] 레벨업 로직 고도화
- sp

## 설정

- 음량
- 팝업 알림
