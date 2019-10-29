export interface RPCError {
  errorId: string;
  message: string;
  name: string;
  type: string;
  call?: string;
  payload?: any;
}
