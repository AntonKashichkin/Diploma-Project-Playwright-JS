#!/bin/bash

mkdir -p allure-history

cat > allure-history/index.html << 'EOF'
<html>
  <head><title>Allure Reports</title></head>
  <body>
    <h1>Allure Reports</h1>
    <ul>
EOF

if [ -d "allure-history/api" ] && [ "$(ls -A allure-history/api)" ]; then
    echo '      <li><a href="./api/index.html">API Report</a></li>' >> allure-history/index.html
fi
if [ -d "allure-history/e2e" ] && [ "$(ls -A allure-history/e2e)" ]; then
    echo '      <li><a href="./e2e/index.html">E2E Report</a></li>' >> allure-history/index.html
fi

cat >> allure-history/index.html << 'EOF'
    </ul>
  </body>
</html>
EOF
