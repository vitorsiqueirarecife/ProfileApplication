export const EVENT_SERVICE = 'IEventService';

export interface IEventService {
  publish<T>({ type, data }: { type: string; data: T }): Promise<void>;
}
