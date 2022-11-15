import { UsersClass } from '../users';

const _users = new UsersClass();

describe('users class', () => {
  it('should have index', () => {
    expect(_users.index).toBeDefined();
  });
  it('should have show method', () => {
    expect(_users.show).toBeDefined();
  });
  it('should have create method', () => {
    expect(_users.create).toBeDefined();
  });
  it('should have update method', () => {
    expect(_users.update).toBeDefined();
  });
  it('should have delete method', () => {
    expect(_users.delete).toBeDefined();
  });
  it('should have auth method', () => {
    expect(_users.Authenticate).toBeDefined();
  });
  it('Should get that there is no users in the db', async () => {
    expect(await _users.index()).toEqual([]);
  });

  it('Create New user Should Return Created user ', async () => {
    const result = await _users.create({
      first_name: 'Ahmed',
      last_name: 'osama',
      email: 'test@example.com',
      password: 'test_password'
    });
    expect(result).toEqual({
      id: 1,
      first_name: 'Ahmed',
      last_name: 'osama',
      email: 'test@example.com'
    });
  });

  it('Get The inserted user using Show', async () => {
    expect(await _users.show(1)).toEqual({
      id: 1,
      first_name: 'Ahmed',
      last_name: 'osama',
      email: 'test@example.com'
    });
  });

  it('Authinticate User', async () => {
    expect(
      await _users.Authenticate('test@example.com', 'test_password')
    ).toEqual({
      id: 1,
      first_name: 'Ahmed',
      last_name: 'osama',
      email: 'test@example.com'
    });
  });

  it('Should get that there is no users in the db', async () => {
    expect(await _users.delete(1)).toEqual(true);
  });

  it('No users After Deleting', async () => {
    expect(await _users.index()).toEqual([]);
  });
});
