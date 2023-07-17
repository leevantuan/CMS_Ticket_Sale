import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';

export default function DataChart() {
  const dispatch = useAppDispatch();
  const listTicketStore = useAppSelector(state => state.tickets.tickets);
  return <div>D</div>;
}
