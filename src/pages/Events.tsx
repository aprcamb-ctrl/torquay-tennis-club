import { useState, useEffect } from 'react';
import client from '../../tina/__generated__/client';
import EventsComponent from '../components/Events';

export default function Events() {
  const [coachingData, setCoachingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.queries.coaching({ relativePath: 'coaching.json' })
      .then((res) => {
        setCoachingData(res.data.coaching);
        setLoading(false);
      })
      .catch(async (err) => {
        console.error('Tina fetch failed, falling back to static data:', err);
        try {
          const staticData = await import('../../content/pages/coaching.json');
          setCoachingData(staticData.default || staticData);
          setLoading(false);
        } catch (staticErr) {
          console.error('Static fallback failed:', staticErr);
          setLoading(false);
        }
      });
  }, []);

  if (loading) {
    return (
      <div className="pt-32 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-12 min-h-[80vh] bg-gray-50">
      {coachingData?.events && coachingData.events.length > 0 ? (
        <EventsComponent events={coachingData.events} />
      ) : (
        <div className="pt-32 text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900">No events found.</h2>
          <p className="text-gray-500 mt-2">Check back later for new event listings.</p>
        </div>
      )}
    </div>
  );
}
