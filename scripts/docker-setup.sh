#!/bin/bash

# Docker PostgreSQL 컨테이너 시작 스크립트
# 사용법: ./scripts/docker-setup.sh

set -e

echo "🐳 Docker PostgreSQL 컨테이너를 시작합니다..."

# 기존 컨테이너가 있는지 확인
if docker ps -a --format '{{.Names}}' | grep -q '^hanaloop-db$'; then
  echo "⏸️  기존 hanaloop-db 컨테이너를 재시작합니다..."
  docker start hanaloop-db
else
  echo "✨ 새로운 hanaloop-db 컨테이너를 생성합니다..."
  docker run --name hanaloop-db \
    -e POSTGRES_PASSWORD=randompassword \
    -e POSTGRES_USER=johndoe \
    -e POSTGRES_DB=hanaloop \
    -p 5432:5432 \
    -d postgres:15
fi

echo "⏳ PostgreSQL 준비 중... (3초 대기)"
sleep 3

echo "✅ PostgreSQL이 준비되었습니다!"
echo ""
echo "📊 데이터베이스 정보:"
echo "  호스트: localhost"
echo "  포트: 5432"
echo "  사용자: johndoe"
echo "  암호: randompassword"
echo "  데이터베이스: hanaloop"
echo ""
echo "🛑 컨테이너를 중지하려면: docker stop hanaloop-db"
echo "🗑️  컨테이너를 제거하려면: docker rm hanaloop-db"
