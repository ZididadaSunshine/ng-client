import { HttpErrorPipe } from './http-error.pipe';

describe('HttpErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new HttpErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
