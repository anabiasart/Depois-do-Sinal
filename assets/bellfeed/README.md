# BellFeed — fotografias

O feed reutiliza quatro ilustrações escolares existentes (512 × 512) nas publicações relacionadas. As miniaturas da cidade (cerca de 155 × 55) aparecem como cartões de localização, sem ampliação. Novas fotografias devem ser armazenadas nesta pasta, preferencialmente em WebP, 1280 × 960 ou maior. Registre os arquivos existentes no objeto `feedPhotography13`, em `src/js/celular/37-bellfeed-dinamico.js`, por exemplo:

```js
const feedPhotography13 = {
  'city:cafe': 'assets/bellfeed/cafe.webp',
  'city:records': 'assets/bellfeed/records.webp'
};
```

Não adicione referências a arquivos inexistentes. As fotos não alteram o salvamento nem os eventos da história. O pacote de ilustrações HD ainda não está incluído.
