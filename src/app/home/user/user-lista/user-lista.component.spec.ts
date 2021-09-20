import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListaComponent } from './user-lista.component';

describe('UserListaComponent', () => {
  let component: UserListaComponent;
  let fixture: ComponentFixture<UserListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
