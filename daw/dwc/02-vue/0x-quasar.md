# Quasar
Es un framwork basado en Vue que permite crear aplicaciones multiplataforma (web/desktop/mobile) con un sólo código fuente. Para usarlo podemos integrarlo desde n CDN, añadirlo como un plugin a Vue-cli o utilizar su propio entorno, _Quasar CLI_, lo que nos permitirá obtener las máximas prestaciones de este framework. Tenéis una comparativa sobre los 3 métodos en la [documentación de Quasar](https://quasar.dev/start/pick-quasar-flavour).

## Instalar Quasar cli
Necesitamos tener NodeJs instalado y haremos:
```javascript
npm install -S @quasar/cli
```

La opción `-g` es para que se instale globalmente y así poder tenerlo disponible para cualquier proyecto.

## Crear un proyecto
Se crea mendiante
```javascript
quasar createnombre-proyecto
```

### Detección de plataforma
Quasar nos permite saber en qué plataforma se está mostrando mediante `$q.plataform`:
```html
<div v-if="$q.plataform.is.desktop">
  Esto se muestra en un escritorio
</div>
<div v-if="$q.plataform.is.mobile">
  Esto se muestra en un móvil
</div>
```

Otros posibles valores de plataforma son _electron_, _cordova_, ... Para usarlo debemos importar esta característica:
```javascript
import { Plataform } from 'quasar'
```

