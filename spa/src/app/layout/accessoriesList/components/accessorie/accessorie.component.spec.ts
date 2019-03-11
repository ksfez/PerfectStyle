import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccessorieComponent } from './Aaccessorie.component';

describe('AccessorieComponent', () => {
  let component: AccessorieComponent;
  let fixture: ComponentFixture<AccessorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  imports: [
        NgbModule.forRoot()
      ],
      declarations: [ AccessorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
