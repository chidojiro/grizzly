import { Tracking, TrackingType } from '@sajari/sdk-js/dist/index';
import { v4 as UUID } from 'uuid';

export const defaultTracking: Tracking = {
  queryID: UUID(),
  type: TrackingType.None,
  sequence: 0,
  field: 'id',
};
