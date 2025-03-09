#Creador de catálogos/carta web para negocio

Para entorno de prueba levantar DB con docker
docker run --name postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=mi_base -p 5432:5432 -d postgres:latest
DATABASE_URL="postgresql://admin:admin123@localhost:5432/mi_base"
