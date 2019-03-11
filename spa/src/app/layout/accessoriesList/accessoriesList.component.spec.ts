import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AccessoriesListComponent } from './accessoriesList.component'
import { AccessoriesListModule } from './accessoriesList.module'

describe('AccessoriesListComponent', () => {
  let component: AccessoriesListComponent
  let fixture: ComponentFixture<AccessoriesListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AccessoriesListModule,
          RouterTestingModule
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
