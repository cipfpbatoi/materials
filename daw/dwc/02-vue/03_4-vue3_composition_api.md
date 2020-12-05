# La Composition API de Vue3
Vue3 incluye una importante novedad, la _Composition API_. 

Cúando es imprescindible usarla:
- si queremos soporte total de Typescript
- si nuestro componente es demasiado largo y queremos organizarlo por características (_features_)
- para mejorar la reutilización de código entre componentes

Lo primero que hace un componente que usa esta API es ejecutar su método _setup_, antes de evalluar ninguna otra característica (data, computed, hooks, ...). Por tanto este método no tiene acceso a _this_ como el resto.
