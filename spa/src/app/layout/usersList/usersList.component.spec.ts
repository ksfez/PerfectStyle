import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { UsersListComponent } from './usersList.component'
import { UsersListModule } from './usersList.module'

describe('UsersListComponent', () => {
  let component: UsersListComponent
  let fixture: ComponentFixture<UsersListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UsersListModule,
        RouterTestingModule,
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
