import EventEmitter from 'eventemitter3';

const ee = new EventEmitter();

export const emit = ee.emit.bind(ee);
export const on = ee.on.bind(ee);
export const off = ee.off.bind(ee);