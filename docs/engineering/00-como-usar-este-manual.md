---
comments: true
---

# Como Usar Este Manual

Este documento define la autoridad y el orden de lectura del manual. Si dos documentos parecen decir cosas distintas, este documento decide como resolverlo.

## Audiencia

El manual esta escrito para tres perfiles:

* un desarrollador que empieza un proyecto nuevo desde cero
* un equipo que quiere mantener varios proyectos con la misma filosofia
* un Codex que recibe solo `docs/` y un repositorio vacio

El lector no debe necesitar consultar el repositorio original para tomar decisiones de arquitectura.

## Jerarquia de Autoridad

Cuando haya duda, aplicar esta prioridad:

1. **Principios obligatorios del manual.** Definen la filosofia que todos los proyectos futuros deben mantener.
2. **Blueprint de proyecto nuevo.** Define la forma recomendada de arrancar desde cero.
3. **Guias por capa.** Backend, base de datos, frontend, pipelines y CRUDs explican como implementar.
4. **Modulos estandar.** Search, feedback, admin, calidad y docs son patrones opcionales segun producto.
5. **Anti patterns y ejemplos.** Definen como evitar degradacion y como aplicar los patrones.
6. **Manual para agentes de IA.** Define como debe operar un agente antes de cambiar codigo.
7. **Mejoras recomendadas.** Son el target para proyectos futuros, incluso si el proyecto original aun no las cumple.
8. **Documentacion especifica del proyecto original.** Sirve como ejemplo historico, no como regla universal.
9. **Codigo original.** Solo se usa para entender de donde nacieron los patrones; no tiene prioridad sobre el target definido aqui.

## Tipos de Regla

El manual usa tres categorias:

**Obligatorio**  
Debe cumplirse en todo proyecto que quiera seguir esta filosofia.

**Recomendado**  
Debe usarse por defecto. Se puede cambiar si existe una razon explicita documentada.

**Ejemplo observado**  
Describe como lo hizo el proyecto original. No obliga a repetirlo si el manual define un target mejor.

## Decisiones Obligatorias

Estas decisiones forman el nucleo de la filosofia:

* backend y frontend separados
* API como frontera entre frontend y datos
* base de datos relacional como sistema de registro para estado duradero
* estructura por dominios y features
* rutas API finas
* persistencia encapsulada en repositorios o adaptadores
* schemas de frontera tipados
* datos ambiguos revisables antes de volverse canonicos
* scripts y pipelines ejecutables por nombres claros
* documentacion y ADRs versionadas

## Decisiones Recomendadas Para Proyectos Nuevos

Estas decisiones corrigen o endurecen cosas que el proyecto original resolvio de forma incremental:

* usar migraciones versionadas desde el inicio
* usar TanStack Query como patron estandar de datos en frontend
* usar un cliente API con errores tipados
* generar o validar contratos API/frontend
* incluir Docker Compose local desde el inicio
* tener tests minimos por capa
* validar configuracion con un sistema tipado
* reemplazar `x-admin-key` por autenticacion real si hay usuarios

## Cuando Crear una Excepcion

Una excepcion solo es aceptable si:

* resuelve un problema real del dominio
* reduce complejidad neta
* queda documentada en una ADR
* no rompe las fronteras principales del sistema

No crear excepciones por preferencia personal o por ahorrar unos minutos de implementacion.

## Prueba de Repositorio Vacio

Antes de usar el manual como plantilla, comprobar mentalmente:

1. Se puede crear la estructura inicial sin mirar codigo antiguo.
2. Se puede definir una entidad con tablas, API y frontend.
3. Se puede anadir un CRUD admin.
4. Se puede decidir donde vive cada archivo.
5. Se puede distinguir dato raw, dato de revision y dato canonico.
6. Se puede arrancar localmente.
7. Se sabe que documentar cuando cambia una decision.

Si alguna respuesta no es clara, mejorar el manual antes de empezar a programar.
