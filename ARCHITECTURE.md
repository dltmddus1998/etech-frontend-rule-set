# ETECH ITSM Portal - Frontend Architecture

## 아키텍처 개요

본 프로젝트는 **클린 아키텍처**와 **Atomic Design** 원칙을 기반으로 설계된 엔터프라이즈급 React + TypeScript 애플리케이션입니다.

## 핵심 설계 원칙

### 1. 관심사의 분리 (Separation of Concerns)
- **프레젠테이션 계층**: 컴포넌트 (UI)
- **비즈니스 로직 계층**: 스토어, 서비스 (State & API)
- **데이터 계층**: 타입, 상수 (Data Model)

### 2. 단방향 데이터 흐로우 (Unidirectional Data Flow)
```
사용자 이벤트 → 액션 → 스토어 업데이트 → UI 리렌더링
```

### 3. 타입 안전성 (Type Safety)
- TypeScript strict 모드
- 모든 API 응답, 상태, Props에 명시적 타입 지정
- 런타임 에러 최소화

### 4. 재사용성 (Reusability)
- 공통 컴포넌트 분리
- 유틸리티 함수 모듈화
- Custom Hooks 활용

## 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   Pages    │  │  Components│  │   Layout   │       │
│  │            │  │            │  │            │       │
│  │ - Login    │  │ - Common   │  │ - Header   │       │
│  │ - Dashboard│  │ - Domain   │  │ - Main     │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│                   Business Logic Layer                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   Stores   │  │  Services  │  │   Hooks    │       │
│  │            │  │            │  │            │       │
│  │ - Auth     │  │ - Auth API │  │ - Custom   │       │
│  │ - Service  │  │ - Service  │  │   Hooks    │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│                      Data Layer                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   Types    │  │  Constants │  │   Utils    │       │
│  │            │  │            │  │            │       │
│  │ - Auth     │  │ - API      │  │ - Storage  │       │
│  │ - Service  │  │ - Routes   │  │ - Validate │       │
│  │ - Common   │  │ - App      │  │            │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│                    External Layer                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   Backend  │  │   MSW Mock │  │  Browser   │       │
│  │    API     │  │  Service   │  │   APIs     │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
```

## 주요 모듈 설명

### 1. 컴포넌트 (Components)

#### 공통 컴포넌트 (Common)
- **Button**: 다양한 variant를 지원하는 재사용 가능한 버튼
- **Input**: 폼 입력 필드 (validation, icon 지원)
- **Card**: 컨텐츠 카드 (header, footer 지원)
- **Loading**: 로딩 스피너 및 오버레이

#### 레이아웃 컴포넌트 (Layout)
- **Header**: 앱 헤더 (로고, 사용자 정보, 로그아웃)
- **MainLayout**: 메인 레이아웃 컨테이너

#### 도메인 컴포넌트 (Domain)
- **ServiceCard**: 대시보드 서비스 카드

### 2. 상태 관리 (State Management)

#### Zustand Store 구조
```typescript
interface AuthState {
  // 상태
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  
  // 액션
  login: (credentials) => Promise<void>
  logout: () => void
}
```

#### 상태 영속성
- localStorage에 인증 정보 저장
- 페이지 새로고침 시에도 상태 유지
- 보안을 위한 토큰 암호화 고려 필요 (추후 구현)

### 3. API 서비스 (Services)

#### Axios 인터셉터
```typescript
// 요청 인터셉터
- 모든 요청에 Access Token 자동 주입
- Request ID 생성 (디버깅용)
- 개발 환경 로깅

// 응답 인터셉터
- 401 에러 시 자동 토큰 갱신
- 에러 핸들링
- 응답 데이터 가공
```

#### 서비스 계층
```typescript
authService
├── login()          // 로그인
├── logout()         // 로그아웃
├── refreshToken()   // 토큰 갱신
└── getProfile()     // 프로필 조회

serviceService
├── getServices()    // 서비스 목록
├── getServiceDetail() // 서비스 상세
└── getServiceStats()  // 서비스 통계
```

### 4. 라우팅 (Routing)

#### 라우트 구조
```
/ (root)
├── /login (public)
├── /dashboard (protected)
│   └── Header + MainLayout
└── /services/* (protected)
    ├── /onpremise-datacenter
    ├── /onpremise-office
    ├── /cloud-aws
    ├── /cloud-azure
    ├── /cloud-gcp
    ├── /retail-store
    └── /other-assets
```

#### 라우트 가드
- **ProtectedRoute**: 인증 확인
- 미인증 시 로그인 페이지로 리다이렉트
- 로그인 후 원래 경로로 복귀

### 5. MSW (Mock Service Worker)

#### Mock API 구조
```
mocks/
├── handlers/
│   ├── authHandlers.ts    // 인증 API 모킹
│   └── serviceHandlers.ts // 서비스 API 모킹
├── data/
│   ├── users.mock.ts      // Mock 사용자 데이터
│   └── services.mock.ts   // Mock 서비스 데이터
└── browser.ts             // MSW 워커 설정
```

#### MSW 활용 이점
- 백엔드 개발 완료 전 프론트엔드 독립 작업 가능
- 실제 API와 동일한 인터페이스 유지
- 네트워크 레벨에서 인터셉트 (브라우저 개발자 도구에서 확인 가능)

## 데이터 플로우

### 로그인 시나리오
```
1. 사용자가 LoginPage에서 ID/PW 입력
   ↓
2. handleSubmit 이벤트 발생
   ↓
3. useAuthActions().login() 호출
   ↓
4. authStore.login() 실행
   ↓
5. authService.login() API 호출
   ↓
6. MSW가 요청 인터셉트 (개발 환경)
   ↓
7. Mock 사용자 데이터 검증
   ↓
8. LoginResponse 반환
   ↓
9. authStore 상태 업데이트
   - isAuthenticated: true
   - user: User 객체
   - accessToken, refreshToken 저장
   ↓
10. localStorage에 상태 영속화
   ↓
11. React Router로 /dashboard 이동
   ↓
12. ProtectedRoute가 인증 확인
   ↓
13. DashboardPage 렌더링
```

### 서비스 목록 조회 시나리오
```
1. DashboardPage 마운트
   ↓
2. useEffect() 훅 실행
   ↓
3. serviceService.getServices() 호출
   ↓
4. Axios 인터셉터가 Access Token 주입
   ↓
5. MSW가 요청 인터셉트
   ↓
6. Mock 서비스 목록 반환
   ↓
7. useState로 services 상태 업데이트
   ↓
8. ServiceCard 컴포넌트들 렌더링
```

## 보안 고려사항

### 1. XSS (Cross-Site Scripting) 방지
- React의 기본 XSS 방어 (dangerouslySetInnerHTML 사용 지양)
- 사용자 입력 데이터 sanitization

### 2. CSRF (Cross-Site Request Forgery) 방지
- SameSite Cookie 설정
- CSRF 토큰 검증 (백엔드 협업)

### 3. 토큰 관리
- Access Token: 짧은 만료 시간 (1시간)
- Refresh Token: 긴 만료 시간 (7일)
- 자동 토큰 갱신 메커니즘

### 4. 민감 정보 보호
- .env 파일을 .gitignore에 포함
- 토큰을 localStorage 대신 httpOnly Cookie 사용 고려 (추후 개선)

## 성능 최적화

### 1. 코드 스플리팅
- React.lazy()를 활용한 페이지별 lazy loading
- Vite의 dynamic import

### 2. 메모이제이션
- React.memo()로 불필요한 리렌더링 방지
- useMemo(), useCallback() 활용

### 3. 번들 최적화
- Vite의 tree shaking
- Tailwind CSS purge 설정

### 4. 이미지 최적화
- WebP 포맷 사용
- Lazy loading
- 적절한 이미지 크기

## 테스트 전략

### 1. 단위 테스트 (Unit Test)
- 유틸리티 함수 테스트
- 커스텀 훅 테스트
- 순수 함수 테스트

### 2. 컴포넌트 테스트
- React Testing Library
- 사용자 상호작용 시뮬레이션
- 스냅샷 테스트

### 3. 통합 테스트 (Integration Test)
- API 서비스 + 스토어 통합 테스트
- MSW를 활용한 API 모킹 테스트

### 4. E2E 테스트
- Playwright or Cypress
- 핵심 사용자 플로우 (로그인, 대시보드, 서비스 이동)

## 확장 가능성

### 1. 새로운 페이지 추가
```typescript
// 1. 페이지 컴포넌트 생성
src/pages/NewPage/NewPage.tsx

// 2. 라우트 추가
src/routes/index.tsx에 Route 추가

// 3. 상수 추가
src/constants/routes.constants.ts에 경로 추가
```

### 2. 새로운 API 서비스 추가
```typescript
// 1. 타입 정의
src/types/newService.types.ts

// 2. 서비스 생성
src/services/newService.ts

// 3. Mock 핸들러 추가
src/mocks/handlers/newHandlers.ts
```

### 3. 새로운 스토어 추가
```typescript
// 1. 스토어 생성
src/stores/newStore.ts

// 2. 타입 정의 (필요 시)
// 3. export 추가
```

## 개발 워크플로우

```
1. Feature 브랜치 생성
   ↓
2. 코드 작성
   ↓
3. Git add
   ↓
4. Husky pre-commit 훅 실행
   - lint-staged로 staged 파일 lint
   - Prettier로 포맷팅
   ↓
5. Git commit
   ↓
6. Commitlint로 커밋 메시지 검증
   ↓
7. Pull Request 생성
   ↓
8. 코드 리뷰
   ↓
9. Merge to main
```

## 배포 전략

### 1. 개발 환경 (Development)
- MSW Mock API 사용
- 개발 서버 (Vite HMR)
- 소스맵 포함

### 2. 스테이징 환경 (Staging)
- 실제 백엔드 API 연결
- 프로덕션 빌드
- 성능 모니터링

### 3. 프로덕션 환경 (Production)
- CDN 배포
- 소스맵 제외
- 에러 모니터링 (Sentry 등)
- 성능 모니터링 (GA, DataDog 등)

## 향후 개선 사항

1. **테스트 커버리지 확대**
   - 단위 테스트 작성
   - E2E 테스트 추가

2. **성능 모니터링**
   - Lighthouse CI 통합
   - Web Vitals 측정

3. **접근성 개선**
   - ARIA 속성 추가
   - 키보드 내비게이션 개선

4. **국제화 (i18n)**
   - react-i18next 도입
   - 다국어 지원

5. **PWA (Progressive Web App)**
   - Service Worker 등록
   - 오프라인 지원

6. **CI/CD 파이프라인**
   - GitHub Actions
   - 자동 빌드 및 배포

## 참고 자료

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Atomic Design](https://atomicdesign.bradfrost.com/)
