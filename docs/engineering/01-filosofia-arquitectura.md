---
comments: true
---

# Filosofia de Arquitectura

## Idea Central

Construir aplicaciones como plataformas de datos orientadas a entidades.

La aplicacion no debe ser solo un conjunto de pantallas. Debe tener un nucleo de dominio claro, una base de datos que actua como sistema de registro, una API estable y un frontend que consume esa API sin conocer detalles internos de almacenamiento.

El proyecto original empezo como una solucion incremental y evoluciono hacia una arquitectura con capas reconocibles. Esa evolucion deja una filosofia util para proyectos futuros: avanzar rapido, pero convertir lo que se estabiliza en estructura explicita.

## Capas Principales

Usar una arquitectura por capas:

```text
Fuentes externas / entradas manuales
  -> ingestion o formularios
  -> almacenamiento raw o cola operativa
  -> normalizacion y revision
  -> datos canonicos
  -> repositorios
  -> API
  -> frontend por features
```

No todos los proyectos necesitan scraping o pipelines, pero la separacion conceptual sigue siendo util:

* lo recibido no siempre es lo mismo que lo aceptado
* lo aceptado no siempre es lo mismo que lo canonico
* lo canonico debe ser lo que alimenta la experiencia principal

## Orientacion a Entidades

El sistema debe construirse alrededor de entidades duraderas del negocio.

En un CRM de clubes de futbol, por ejemplo, las entidades podrian ser:

* clubes
* equipos
* jugadores
* entrenadores
* temporadas
* partidos
* competiciones
* instalaciones
* contactos
* incidencias

Cada entidad importante deberia tener un recorrido reconocible por todo el stack:

```text
tabla
  -> repositorio
  -> schema
  -> ruta API
  -> tipo frontend
  -> llamada API
  -> hook
  -> pagina lista
  -> pagina detalle
  -> componentes reutilizables
```

## Separar Raw, Revision y Canonico

Cuando el proyecto trabaja con datos importados, scraped, pegados desde Excel o recibidos desde formularios incompletos, no conviene empujar todo directamente al modelo principal.

Usar tres responsabilidades:

* **raw:** dato tal como llega, preservado para trazabilidad
* **revision/normalizacion:** dato interpretado, pendiente o corregido
* **canonico:** dato limpio que usa la aplicacion

Esta separacion evita perder informacion y reduce decisiones irreversibles.

## Explicito Mejor que Magico

El estilo favorece codigo y estructura faciles de leer:

* SQL explicito en repositorios cuando la consulta expresa bien el dominio
* funciones pequenas por operacion
* schemas Pydantic como contrato visible
* rutas separadas por dominio
* componentes frontend pequenos y nombrados por intencion
* scripts operativos con nombres claros

La abstraccion debe aparecer cuando elimina duplicacion real o fija una convencion que ya se repite.

## Crecimiento Incremental

El proyecto debe poder crecer sin redisenarse en cada feature.

Regla practica:

* si algo ocurre una vez, mantenerlo simple
* si ocurre dos veces, observar el patron
* si ocurre tres veces, documentar o extraer una convencion

Esta filosofia permite empezar con soluciones directas y convertirlas en plataforma cuando el dominio demuestra que lo necesita.

## Humano en el Bucle

Los sistemas de datos reales tienen ambiguedad. La arquitectura debe aceptar que algunas decisiones requieren revision humana.

Patrones recomendados:

* estados `pending`, `resolved`, `unresolved`, `ignored`
* tablas o archivos de alias
* pantallas admin para correcciones
* logs de cambios
* metricas de avance de revision
* sugerencias automaticas con confianza, no decisiones silenciosas

## Documentacion Como Parte de la Arquitectura

La documentacion no debe ser un extra final. Debe capturar:

* principios
* decisiones aceptadas
* restricciones para futuras contribuciones
* contexto para herramientas de IA
* guias de implementacion repetibles

Cada proyecto deberia nacer con una carpeta `docs/` y al menos:

* overview del proyecto
* arquitectura
* modelo de datos
* API
* ADRs
* contexto para IA
* manual de ingenieria

