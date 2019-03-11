import { WorkersListModule } from './workersList.module';

describe('WorkersListModule', () => {
    let workersListModule: WorkersListModule;

    beforeEach(() => {
        workersListModule = new WorkersListModule();
    });

    it('should create an instance', () => {
        expect(workersListModule).toBeTruthy();
    });
});
