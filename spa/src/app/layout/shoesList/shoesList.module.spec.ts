import { ShoesListModule } from './shoesList.module';

describe('ShoesListModule', () => {
    let shoesListModule: ShoesListModule;

    beforeEach(() => {
        shoesListModule = new ShoesListModule();
    });

    it('should create an instance', () => {
        expect(shoesListModule).toBeTruthy();
    });
});
