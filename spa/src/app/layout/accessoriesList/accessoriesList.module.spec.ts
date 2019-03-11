import { AccessoriesListModule } from './accessoriesList.module';

describe(' AccessoriesListModule', () => {
    let  accessoriesListModule: AccessoriesListModule;

    beforeEach(() => {
         accessoriesListModule = new AccessoriesListModule();
    });

    it('should create an instance', () => {
        expect(accessoriesListModule).toBeTruthy();
    });
});
