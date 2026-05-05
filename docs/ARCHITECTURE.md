# 🏗️ System Architecture

> PCF(Product Carbon Footprint) 분석 대시보드의 시스템 아키텍처 및 설계 명세  
> 참고: [2026-05-05-dashboard-design.md](superpowers/specs/2026-05-05-dashboard-design.md)

---

## 1. 시스템 아키텍처 (3계층)

```text
┌─────────────────────────────────────────────┐
│       Frontend (Next.js 14 + React)         │
│  • 분석 대시보드 (분석가용)                  │
│  • 데이터 임포트 인터페이스                 │
│  • 배출계수 관리 UI                         │
│  • 필터링 & 드릴다운 기능                   │
├─────────────────────────────────────────────┤
│   API Layer (Next.js Route Handlers)        │
│  • /api/dashboard/* (분석 데이터 조회)      │
│  • /api/import/* (Excel 임포트)             │
│  • /api/coefficients/* (배출계수 관리)      │
├─────────────────────────────────────────────┤
│      Backend & Data Layer                   │
│  • PostgreSQL (데이터 저장소)               │
│  • Business Logic (PCF 계산 엔진)           │
│  • Excel Parser (파일 검증 및 임포트)       │
└─────────────────────────────────────────────┘
```

---

## 2. 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **차트**: Recharts
- **상태 관리**: React Query
- **Icons**: Lucide React

### Backend & API
- **Runtime**: Node.js
- **API**: Next.js Route Handlers
- **File Processing**: ExcelJS

### Database
- **DBMS**: PostgreSQL 14+
- **ORM**: Prisma
- **Migrations**: Prisma Migrate

---

## 3. UI/UX 구조

### 3.1 레이아웃 (좌측 사이드바 네비게이션)

```text
┌──────────────┬──────────────────────┐
│  사이드바    │   메인 분석 영역     │
├──────────────┼──────────────────────┤
│ 📊 분석      │ [필터bar]            │
│ 📥 임포트    │ [KPI 카드 × 3]       │
│ ⚙️ 배출계수  │ [차트 2×2]           │
│ 👤 설정      │                      │
└──────────────┴──────────────────────┘
```

### 3.2 메인 화면 구성

#### A) 분석 대시보드

- **필터바** (상단): 제품, 기간, Scope(1,2,3), 공급망 단계 - 모두 조합 가능
- **핵심 지표 카드** (3개 병렬):
  - 총 배출량 (tCO₂e)
  - 월별 감축율 (%)
  - 배출 범위 분류 (Scope 1,2,3)
- **차트 영역** (2×2 그리드):
  - 제품별 PCF (막대 차트)
  - 시간 추이 (선 차트)
  - Scope 비율 (도넛 차트)
  - 공급망 단계별 기여도 (트리맵)

#### B) 데이터 임포트

- 파일 선택 → 검증 → 미리보기 → 저장 (4단계)
- 필수 열 자동 검증
- 배출계수 코드 확인

#### C) 배출계수 관리

- 배출계수 테이블 조회
- 버전 이력 추적
- 적용 기간 관리

#### D) 설정

- 사용자 설정, 회사 정보 등

---

## 4. 데이터 모델

### 4.1 핵심 엔티티

**Products** (제품)
- id, name, description, created_at

**EmissionFactors** (배출계수)
- id, code, description, value, unit, version, applicable_from, created_at, updated_at

**PCFData** (PCF 계산 데이터)
- id, product_id, raw_materials(kg), electricity(kWh), transportation(km), scope(1|2|3), stage(원재료|생산|물류|판매), calculated_pcf, calculated_at, source (manual|import)

**ImportLogs** (임포트 이력)
- id, file_name, row_count, status(success|failed), error_message, imported_at

### 4.2 관계

```text
Products (1) ←→ (N) PCFData
EmissionFactors (1) ←→ (N) PCFData
```

---

## 5. PCF 계산 로직

```text
PCF = (Raw Materials × EF_RM) 
    + (Electricity × EF_EL) 
    + (Transportation × EF_TR)

여기서:
- EF_RM: 원재료 배출계수 (kgCO₂e/kg)
- EF_EL: 전기 배출계수 (kgCO₂e/kWh)
- EF_TR: 운송 배출계수 (kgCO₂e/km)
```

### Scope 분류
- **Scope 1**: 직접 배출 (생산 과정)
- **Scope 2**: 간접 배출 (구매 전기)
- **Scope 3**: 기타 간접 배출 (운송, 폐기 등)

---

## 6. API 엔드포인트 설계

### Dashboard API
- `GET /api/dashboard/summary` - KPI 지표 조회
- `GET /api/dashboard/charts` - 차트 데이터 조회
- `GET /api/dashboard/filter-options` - 필터 옵션 조회

### Import API
- `POST /api/import/validate` - 파일 검증
- `POST /api/import/preview` - 임포트 미리보기
- `POST /api/import/process` - 데이터 임포트

### Coefficient API
- `GET /api/coefficients` - 배출계수 목록
- `GET /api/coefficients/history` - 버전 이력
- `POST /api/coefficients` - 배출계수 추가
- `PUT /api/coefficients/:id` - 배출계수 수정

---

## 7. 폴더 구조 (예정)

```bash
hanaloop_task/
├── docs/
│   ├── ARCHITECTURE.md (현재 파일)
│   ├── AI_USAGE.md
│   └── superpowers/
│       └── specs/
│           └── 2026-05-05-dashboard-design.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── import/
│   │   ├── coefficients/
│   │   └── settings/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Filter.tsx
│   │   │   ├── KPICards.tsx
│   │   │   └── ChartGrid.tsx
│   │   ├── Import/
│   │   ├── Coefficients/
│   │   └── Sidebar.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── db.ts
│   │   └── calculations.ts
│   └── styles/
│       └── globals.css
├── prisma/
│   └── schema.prisma
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 8. 주요 기능

1. **PCF Dashboard**: 필터링 기능과 다각도 시각화로 탄소 발자국 분석
2. **Data Import**: Excel 파일의 간단한 4단계 임포트
3. **Emission Factor Management**: 배출계수의 버전 이력 추적 및 관리
4. **Drill-down Analysis**: 차트 클릭으로 상세 데이터 분석
5. **Real-time Calculation**: PCF 변경 시 즉시 계산 및 업데이트
