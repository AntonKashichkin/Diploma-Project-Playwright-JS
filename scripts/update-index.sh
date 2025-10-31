#!/bin/bash
mkdir -p allure-history
cat > allure-history/index.html << 'EOF'
<html>
  <head><title>Allure Reports</title></head>
  <body>
    <h1>Allure Reports</h1>
    <ul>
      <li><a href="./api/index.html">API Report</a></li>
      <li><a href="./e2e/index.html">E2E Report</a></li>
    </ul>
  </body>
</html>
EOF
