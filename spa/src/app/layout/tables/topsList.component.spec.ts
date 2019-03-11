import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { TopsListComponent } from './topsList.component'
import { TopsListModule } from './topsList.module'

describe('TopsListComponent', () => {
  let component: TopsListComponent
  let fixture: ComponentFixture<TopsListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          TopsListModule,
          RouterTestingModule
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(TopsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
