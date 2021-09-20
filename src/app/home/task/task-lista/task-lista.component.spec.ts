import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListaComponent } from './task-lista.component';

describe('TaskListaComponent', () => {
  let component: TaskListaComponent;
  let fixture: ComponentFixture<TaskListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
