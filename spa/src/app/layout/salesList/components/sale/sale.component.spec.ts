import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaleComponent } from './sale.component';

describe('SaleComponent', () => {
  let component: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  imports: [
        NgbModule.forRoot()
      ],
      declarations: [ SaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});