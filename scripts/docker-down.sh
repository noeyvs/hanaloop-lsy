#!/bin/bash

# Docker PostgreSQL 컨테이너 중지 스크립트
# 사용법: ./scripts/docker-down.sh

echo "🛑 hanaloop-db 컨테이너를 중지합니다..."

if docker ps --format '{{.Names}}' | grep -q '^hanaloop-db$'; then
  docker stop hanaloop-db
  echo "✅ hanaloop-db 컨테이너가 중지되었습니다."
else
  echo "⚠️  실행 중인 hanaloop-db 컨테이너가 없습니다."
fi
