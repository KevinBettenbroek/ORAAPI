import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { VrijgifteComponent } from './vrijgifte.component';

describe('VrijgifteComponent', () => {
  let component: VrijgifteComponent;
  let fixture: ComponentFixture<VrijgifteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VrijgifteComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VrijgifteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
