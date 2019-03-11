import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { WorkersListComponent } from './workersList.component'
import { WorkersListModule } from './workersList.module'

describe('WorkersListComponent', () => {
  let component: WorkersListComponent
  let fixture: ComponentFixture<WorkersListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          WorkersListModule,
          RouterTestingModule
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
