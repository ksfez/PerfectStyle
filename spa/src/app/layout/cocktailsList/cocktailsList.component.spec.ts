import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { CocktailsListComponent } from './cocktailsList.component'
import { CocktailsListModule } from './cocktailsList.module'

describe('CocktailsListComponent', () => {
  let component: CocktailsListComponent
  let fixture: ComponentFixture<CocktailsListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          CocktailsListModule,
          RouterTestingModule
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
