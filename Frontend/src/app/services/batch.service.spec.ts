import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BatchService } from './batch.service';

describe('BatchService', () => {
  let service: BatchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [BatchService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BatchService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBatch() returns right data', () => {
    const mockBatch = {
      batch_NR: '1',
      machine_ID: '5',
      packaging_code: -1,
      DB: 'jan',
      leave_datetime: new Date(),
      forward_datetime: new Date(),
      remarks_end_control: '',
      checked_by: '',
      start_datetime: new Date(),
      end_datetime: new Date(),
      inspector: '',
      batch_started: new Date(),
      total_NR_bags: -1,
      bags_checked: -1,
      total_NR_patients: -1,
      bags_rejected: -1,
      NR_to_double_check: -1,
      double_checked: -1,
    };

    service.getBatch('1').subscribe((batch) => {
      expect(batch.batch_NR).toEqual('1');
    });

    const req = httpTestingController.expectOne(
      'http://localhost:8000/api/batch/1/'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockBatch);
  });

  it('getBatches() returns right data', () => {
    const mockBatches = [
      {
        batch_NR: '1',
        machine_ID: '5',
        packaging_code: -1,
        DB: 'jan',
        leave_datetime: new Date(),
        forward_datetime: new Date(),
        remarks_end_control: '',
        checked_by: '',
        start_datetime: new Date(),
        end_datetime: new Date(),
        inspector: '',
        batch_started: new Date(),
        total_NR_bags: -1,
        bags_checked: -1,
        total_NR_patients: -1,
        bags_rejected: -1,
        NR_to_double_check: -1,
        double_checked: -1,
      },
      {
        batch_NR: '2',
        machine_ID: '5',
        packaging_code: -1,
        DB: 'jan',
        leave_datetime: new Date(),
        forward_datetime: new Date(),
        remarks_end_control: '',
        checked_by: '',
        start_datetime: new Date(),
        end_datetime: new Date(),
        inspector: '',
        batch_started: new Date(),
        total_NR_bags: -1,
        bags_checked: -1,
        total_NR_patients: -1,
        bags_rejected: -1,
        NR_to_double_check: -1,
        double_checked: -1,
      },
    ];

    service.getBatches('1').subscribe((batches) => {
      expect(batches[0].batch_NR).toEqual('1');
      expect(batches[1].batch_NR).toEqual('2');
    });

    const req = httpTestingController.expectOne(
      'http://localhost:8000/api/batch/?orderbatch__order_NR=1'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockBatches);
  });

  it('getBatchDetails() returns right data', () => {
    const mockBatchRows = [
      {
        batch_NR: '1',
        department: 'IC',
        split_NR: 1,
        start_datetime: new Date(),
        end_datetime: new Date(),
        NR_patients: 1,
        NR_bags: 1,
        MC_CD: 'CD',
        remarks: '',
      },
      {
        batch_NR: '1',
        department: 'ICT',
        split_NR: 1,
        start_datetime: new Date(),
        end_datetime: new Date(),
        NR_patients: 1,
        NR_bags: 1,
        MC_CD: 'CD',
        remarks: '',
      },
    ];

    service.getBatchDetails('1').subscribe((batchRow) => {
      expect(batchRow[0].department).toEqual('IC');
      expect(batchRow[1].department).toEqual('ICT');
    });

    const req = httpTestingController.expectOne(
      'http://localhost:8000/api/batchrow?batch_NR=1'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockBatchRows);
  });
});
