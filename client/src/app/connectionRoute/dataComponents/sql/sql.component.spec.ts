import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlComponent } from './sql.component';

describe('SqlComponent', () => {
  let component: SqlComponent;
  let fixture: ComponentFixture<SqlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SqlComponent]
    });
    fixture = TestBed.createComponent(SqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
