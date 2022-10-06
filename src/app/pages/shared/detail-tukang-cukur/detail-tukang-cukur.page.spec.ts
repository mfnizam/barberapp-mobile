import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailTukangCukurPage } from './detail-tukang-cukur.page';

describe('DetailTukangCukurPage', () => {
  let component: DetailTukangCukurPage;
  let fixture: ComponentFixture<DetailTukangCukurPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTukangCukurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailTukangCukurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
