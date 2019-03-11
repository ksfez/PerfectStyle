import { CasualsListModule } from './casualsList.module';

describe('CasualsListModule', () => {
    let casualsListModule: CasualsListModule;

    beforeEach(() => {
        casualsListModule = new CasualsListModule();
    });

    it('should create an instance', () => {
        expect(casualsListModule).toBeTruthy();
    });
});
