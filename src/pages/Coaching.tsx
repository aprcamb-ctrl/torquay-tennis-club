import { useState, useEffect } from 'react';
import client from '../../tina/__generated__/client';
import Events from '../components/Events';
import Programs from '../components/Programs';
import CoachingDetail from '../components/CoachingDetail';

export default function Coaching() {
  const [coachingData, setCoachingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.queries.coaching({ relativePath: 'coaching.json' })
      .then((res) => {
        setCoachingData(res.data.coaching);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching coaching data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pt-24 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!coachingData) {
    return (
      <div className="pt-24 text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Coaching data not found.</h2>
        <p className="text-gray-500 mt-2">Please check the CMS or content files.</p>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <Events events={coachingData.events} />
      <Programs programs={coachingData.programs} />
      <CoachingDetail 
        programDetails={coachingData.programDetails} 
        coaches={coachingData.coaches} 
      />
    </div>
  );
}
