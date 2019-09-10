import { UserEmailPipe } from './user-email.pipe';

describe('UserEmailPipe', () => {
  it('create an instance', () => {
    const pipe = new UserEmailPipe();
    expect(pipe).toBeTruthy();
  });
});
