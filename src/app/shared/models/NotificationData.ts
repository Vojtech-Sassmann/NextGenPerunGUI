import {RPCError} from '../../core/models/RPCError';

export interface NotificationData {
  title: string;
  actionText: string;
  description: string;
  type: 'success' | 'error';
  error?: RPCError;
  delay: number;
  icon: string;
  action: () => void;
}
