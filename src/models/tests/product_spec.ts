import { ProductClass } from '../product';

const _product = new ProductClass();

describe('Product class', () => {
  it('should have index', () => {
    expect(_product.index).toBeDefined();
  });
  it('should have show method', () => {
    expect(_product.show).toBeDefined();
  });
  it('should have create method', () => {
    expect(_product.create).toBeDefined();
  });
  it('should have update method', () => {
    expect(_product.update).toBeDefined();
  });
  it('should have delete method', () => {
    expect(_product.delete).toBeDefined();
  });
  it('should have get current active order', () => {
    expect(_product.topFive).toBeDefined();
  });
  it('should have get compeleted Products', () => {
    expect(_product.showCat).toBeDefined();
  });

  it('Should get that there is no Products in the db', async () => {
    expect(await _product.index()).toEqual([]);
  });

  it('Create New Product Should Return Created Product ', async () => {
    const result = await _product.create({
      name: 'test',
      price: '10.00',
      category: 'test'
    });
    expect(result).toEqual({
      id: 1,
      name: 'test',
      price: '10.00',
      category: 'test'
    });
  });

  it('Get The inserted Product using Show', async () => {
    expect(await _product.show(1)).toEqual({
      id: 1,
      name: 'test',
      price: '10.00',
      category: 'test'
    });
  });

  it('Updating Product name', async () => {
    expect(
      await _product.update(1, {
        id: 1,
        name: 'updated',
        price: '10.00',
        category: 'test'
      })
    ).toEqual({ id: 1, name: 'updated', price: '10.00', category: 'test' });
  });

  it('Should get that there is no Products in the db', async () => {
    expect(await _product.delete(1)).toEqual(true);
  });

  it('No Products After Deleting', async () => {
    expect(await _product.index()).toEqual([]);
  });
});
