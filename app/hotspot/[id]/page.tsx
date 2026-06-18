import BottomNav from '@/app/components/bottomNav'
import Header from '@/app/components/header'
import HotspotDetail from '@/app/components/HotspotDetail'
import { supabase } from '@/lib/supabase'

export default async function HotspotPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data } = await supabase
    .from('hotspots')
    .select('*')
    .eq('id', id)
    .single()

  const { data: history } = await supabase
    .from('traffic_history')
    .select('*')
    .eq('hotspot_id', id)
    .order('recorded_at', { ascending: true })

  if (!data) return <p>Not found</p>

  return (
    <>
    <Header />
    <HotspotDetail
      id = {data.id}
      name={data.name}
      address={data.address}
      lat={data.lat}
      lng={data.lng}
      trafficRating={data.traffic_rating}
      trafficLevel={data.traffic_level}
      estimatedPeople={data.estimated_people}
      updatedMinsAgo={0}
      history={history || [50, 10, 20,30]}
      suggestion={data.suggestion || 'No suggestions available.'}
    />
    <BottomNav />
    </>
  )
}