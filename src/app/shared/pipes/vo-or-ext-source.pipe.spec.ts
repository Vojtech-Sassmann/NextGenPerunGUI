import { UserVoPipe } from './vo-or-ext-source.pipe';

describe('VoOrExtSourcePipe', () => {
  it('create an instance', () => {
    const pipe = new UserVoPipe();
    expect(pipe).toBeTruthy();
  });
});
