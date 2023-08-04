import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsListComponent } from './connections-list.component';

describe('ConnectionsListComponent', () => {
  let component: ConnectionsListComponent;
  let fixture: ComponentFixture<ConnectionsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionsListComponent]
    });
    fixture = TestBed.createComponent(ConnectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
