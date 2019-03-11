import { TopsListModule } from './topsList.module';

describe('TopsListModule', () => {
    let topsListModule: TopsListModule;

    beforeEach(() => {
        topsListModule = new TopsListModule();
    });

    it('should create an instance', () => {
        expect(topsListModule).toBeTruthy();
    });
});
