import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { StoresComponent } from './stores.component'
import { StoresModule } from './stores.module'

describe('StoresComponent', () => {
  let component: StoresComponent
  let fixture: ComponentFixture<StoresComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoresModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

