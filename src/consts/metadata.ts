import { Tracking, TrackingType } from '@sajari/sdk-js/dist/index';
import { Metadata } from 'types';
import { v4 as UUID } from 'uuid';

export const metadata: Metadata = {
  collection: ['grizzly'],
  project: ['1623269058042651642'],
  'user-agent': ['sajari-sdk-js/2.4.0 (via https://www.grizzly.com)'],
};

export const defaultTracking: Tracking = {
  queryID: UUID(),
  type: TrackingType.None,
  sequence: 0,
  field: 'id',
};
