Infraestructura de AWS

Región AWS (22) -> Zonas de disponibilidad (tolerancia a fallos) -> CPDs (no se elije)

Servicios (hay 23 categorías):

- almacenamiento:
  - Amazon S3 (Simple Storage Service)
  - EBS (Elastic Block Store): alto rendimiento, para usarse con EC2
  - EFS (Elastic FS): NFS
  - S3 Glacier: muy bajo costo, para archivar datos
- informática
  - EC2 (Elastic Compute Cloud): capacidad ajustable, virtual
  - EC2 Auto Scaling: añade o elimina automáticamente instancias EC2 según lo que definamos
  - ECS (Elastic Container System): contenedores, compatible con Docker
  - EC2 Container Registry: registro de cotenedores Docker
  - Elastic Beanstalk: para escalar aplicaciones en servicios como apache o IIS
  - Lambda: permite ejecutar código sin aprovisionar servidores
  - EKS: Kubernetes
  - Fargate: permite ejecutar contenedores sin administrar servidores
- BBDD
  - RDS (Relational DB Service): relacional
  - Aurora: compatible con MySQL y PostgreSQL
  - Redshift: análisis en PB
  - DynamoDB: no relacional
- Redes
  - VPC (Virtual Private Cloud): crea una red virtual aislada
  - Elastic Load Balancing: balancea las peticiones entrantes entre los destinos disponibles
  - CDN (CloudFront): entrega de contenido como vídeos, juegos, ...
  - AWS Transit Gateway: para conectar tus VPC a una única GW
  - Route 53: DNS para dirigir a los clientes a nuestras aplicaciones
  - Directo Connect: para conectar nuestro CPD o oficina a AWS
  - VPN
- Seguridad
  - AWS IAM: administrar el acceso
  - Organizations
  - Cognito: autenticación de usuarios
  - Artifact: acceso a informes de seguridad
  - KMS: administrar claves de cifrado
  - Shield: protección frente a DoS
- Admin. de costes
  - Informe de uso y costo
  - Presupuestos: tb avisan si se pasa o se prevee que se paso del presupuesto
  - Cost Explorer:
- Admin. y control
  - Consola de admin. AWS
  - Config: inventario de recursos y cambios
  - CloudWatch: monitorizar recursos y aplicaciones
  - Auto Scaling
  - CLI
  - Trusted advisor: optimizar rendimiento
  - Well Arquitect Tool: revisar cargas de trabajo
  - CloudTrail: seguimiento de la actividad de usuarios y API

## IAM
- Recurso: objetos e identidades que se pueden usar o administrar en AWS
- Identidad: usuario o aplicación que interactúa con AWS
- Entidades: usuarios, grupos, roles, políticas
- Organizaciones: grupos de cuentas de AWS
