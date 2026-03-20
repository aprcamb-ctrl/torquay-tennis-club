import Events from '../components/Events';
import Programs from '../components/Programs';
import CoachingDetail from '../components/CoachingDetail';

export default function Coaching() {
  return (
    <div className="pt-24">
      <Events />
      <Programs />
      <CoachingDetail />
    </div>
  );
}
