import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { ShoesListComponent } from './shoesList.component'
import { ShoesListModule } from './shoesList.module'

describe('ShoesListComponent', () => {
  let component: ShoesListComponent
  let fixture: ComponentFixture<ShoesListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ShoesListModule,
          RouterTestingModule
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
