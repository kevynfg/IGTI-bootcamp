import ev from './events.js';

ev.on('testEvent', () => {
  console.log('Evento do próprio index.js');
});

ev.emit('testEvent', 'Emitiu o evento importado');
