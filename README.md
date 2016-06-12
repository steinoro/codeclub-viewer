# codeclub-viewer
A viewer to display codeclub lessons

## Getting started
```
git clone https://github.com/NorwegianKiwi/codeclub-viewer.git
git clone https://github.com/kodeklubben/oppgaver.git
cd codeclub-viewer
npm install
npm start
```

## Building with sourcemaps (and serving)
```
npm run build
npm serve
```

## Building for production (and serving)
```
npm run build:prod
npm serve
```

## Running tests
```
npm run test
```

## Running eslint
To check that the code is formatted correctly, run
```
npm run eslint
```


## TODO
See if it is possible to build the md-files in separate chunks. How? Perhaps separate entries?
Or perhaps CommonsChunkPlugin manages that by itself?
Preferrably we want each course in a separate chunk.

Btw, Should the courses be listed in a specific order? What is done on website today?
I guess it would be ok to list the courses manually...

### Server rendering
Mye like kode i webpack.server.config.babel.js, prøv å flytt ut lik kode.
Og så prøv å se om det går an å skrive html i stedet for js-filer, eller noe, sånn at vi får statiske sider.
Så burde det gå an å bruke den opprinnelige "server.js"-filen som bare serverte "statisk".

Kan muligens se litt på src/server.js, men mulig vi kan slette den også. Det var tatt fra siten
https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes

Hvorfor den plutselig går over til den "opprinnelige" siten når den treffer FrontPage?
Jo, fordi det der ligger en index.html. Denne trengs ikke når man bruker server-rendering.
Så lenge den html'en som server leverer tilbake
passer på å laste alle js-filene (som ble laget i build:dev), så går server-rendering bra.

Men hvordan skal vi få laget statiske filer? Kanskje vi kan ha en egen webpack.config.static.babel.js, akkurat
som vi har en egen webpack og build for server? Så kan vi splitte filene som har require.ensure, require.context
m.m. (en versjon per static og client)
