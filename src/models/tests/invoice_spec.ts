import { InvoiceClass } from '../invoice';

const invoices = new InvoiceClass();

describe('invoices class', () => {
  it('should have index', () => {
    expect(invoices.index).toBeDefined();
  });
  it('should have show method', () => {
    expect(invoices.show).toBeDefined();
  });
  it('should have create method', () => {
    expect(invoices.create).toBeDefined();
  });
  it('should have update method', () => {
    expect(invoices.update).toBeDefined();
  });
  it('should have delete method', () => {
    expect(invoices.delete).toBeDefined();
  });
  it('should have get invoices by order', () => {
    expect(invoices.showOrderInvoice).toBeDefined();
  });

  it('Should get that there is no invoices in the db', async () => {
    expect(await invoices.index()).toEqual([]);
  });

  
});
