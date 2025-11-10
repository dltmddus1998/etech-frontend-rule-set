module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 새로운 기능 추가
        'fix',      // 버그 수정
        'docs',     // 문서 수정
        'style',    // 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
        'refactor', // 코드 리팩토링
        'perf',     // 성능 개선
        'test',     // 테스트 추가, 테스트 리팩토링
        'chore',    // 빌드 업무 수정, 패키지 매니저 수정
        'revert',   // 커밋 되돌리기
        'build',    // 빌드 시스템 또는 외부 종속성 변경
        'ci',       // CI 설정 파일 및 스크립트 변경
      ],
    ],
    'subject-case': [2, 'always', 'sentence-case'],
  },
}