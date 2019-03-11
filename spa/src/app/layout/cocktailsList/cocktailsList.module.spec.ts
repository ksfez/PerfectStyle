import { CocktailsListModule } from './cocktailsList.module';

describe('CocktailsListModule', () => {
    let cocktailsListModule: CocktailsListModule;

    beforeEach(() => {
        cocktailsListModule = new CocktailsListModule();
    });

    it('should create an instance', () => {
        expect(cocktailsListModule).toBeTruthy();
    });
});
