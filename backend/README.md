# lancer chaque microservices avec tracing
$env:OTEL_SERVICE_NAME="auth-service"; npm run start $env:OTEL_SERVICE_NAME="user-service"; npm run start $env:OTEL_SERVICE_NAME="admin-service"; npm run start
$env:OTEL_SERVICE_NAME="customer-service"; npm run start

dashboard-service: service dédié à l’agrégation des métriques Prometheus pour le dashboard frontend.

http://localhost:9090/rules:vérifier si les régles sont chargées dans prom