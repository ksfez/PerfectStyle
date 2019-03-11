import { SalesListModule } from './salesList.module';

describe('SalesListModule', () => {
    let salesListModule: SalesListModule;

    beforeEach(() => {
        salesListModule = new SalesListModule();
    });

    it('should create an instance', () => {
        expect(salesListModule).toBeTruthy();
    });
});
