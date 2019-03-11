import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { CasualsListComponent } from './casualsList.component'
import { CasualsListModule } from './casualsList.module'

describe('CasualsListComponent', () => {
  let component: CasualsListComponent
  let fixture: ComponentFixture<CasualsListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          CasualsListModule,
          RouterTestingModule
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
