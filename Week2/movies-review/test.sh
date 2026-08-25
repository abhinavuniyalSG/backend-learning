#!/bin/bash
set -e
echo "1. Register"
RES=$(curl -s -X POST http://localhost:3002/api/auth/register -H "Content-Type: application/json" -d '{"name": "test2", "mail": "test2@example.com", "password": "password123"}')
echo $RES
TOKEN=$(echo $RES | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

echo "2. Create Movie"
RES=$(curl -s -X POST http://localhost:3002/api/movies -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"title": "The Matrix", "director": "Wachowskis", "genre": "Sci-Fi", "release_year": 1999}')
echo $RES
MOVIE_ID=$(echo $RES | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

echo "3. Get Movies"
curl -s http://localhost:3002/api/movies | head -c 200
echo

echo "4. Create Review"
RES=$(curl -s -X POST http://localhost:3002/api/movies/$MOVIE_ID/reviews -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"rating": 5, "comment": "Great movie"}')
echo $RES
REVIEW_ID=$(echo $RES | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

echo "5. Get Reviews"
curl -s http://localhost:3002/api/movies/$MOVIE_ID/reviews | head -c 200
echo

echo "6. Delete Review"
curl -s -X DELETE http://localhost:3002/api/movies/$MOVIE_ID/reviews/$REVIEW_ID -H "Authorization: Bearer $TOKEN"
echo "Review deleted"

echo "7. Delete Movie"
curl -s -X DELETE http://localhost:3002/api/movies/$MOVIE_ID -H "Authorization: Bearer $TOKEN"
echo "Movie deleted"

