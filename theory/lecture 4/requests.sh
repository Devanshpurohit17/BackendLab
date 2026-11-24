#!/bin/sh
# Start the Express server from lecture 3 first.
URL="${1:-http://localhost:3000}"

echo "1. All students";        curl -s "$URL/students"; echo
echo "2. Student 3";           curl -s "$URL/students/3"; echo
echo "3. Unknown student";     curl -s -w " status=%{http_code}" "$URL/students/99"; echo
echo "4. Response headers";    curl -s -D - -o /dev/null "$URL/students"
