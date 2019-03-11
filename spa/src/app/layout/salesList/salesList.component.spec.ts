import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { SalesListComponent } from './salesList.component'
import { SalesListModule } from './salesList.module'

describe('SalesListComponent', () => {
  let component: SalesListComponent
  let fixture: ComponentFixture<SalesListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          SalesListModule,
          RouterTestingModule
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
