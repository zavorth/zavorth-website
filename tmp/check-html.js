const http = require('http');
http.get('http://localhost:3002/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const canvasDiv = data.indexOf('h-[120%]');
    const heroId = data.indexOf('id="hero"');
    console.log('hero section found:', heroId !== -1);
    console.log('canvas wrapper div found:', canvasDiv !== -1);
    
    // Extract a snippet around hero
    if (heroId !== -1) {
      console.log('Hero snippet:', data.substring(heroId, heroId + 200));
    }
    if (canvasDiv !== -1) {
      console.log('Canvas snippet:', data.substring(canvasDiv - 100, canvasDiv + 100));
    }
  });
});
