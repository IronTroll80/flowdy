import { supabase } from '@/lib/supabase'


export async function getHotspots() {
  const { data, error } = await supabase
    .from('hotspots')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}


export async function getHotspot(id: string) {
  const { data, error } = await supabase
    .from('hotspots')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

/**
 * GET HOTSPOT HISTORY (NEW)
 */
export async function getHotspotHistory(id: string) {
  const { data, error } = await supabase
    .from('hotspot_traffic_history')
    .select('traffic_rating, recorded_at')
    .eq('hotspot_id', id)
    .order('recorded_at', { ascending: true })

  if (error) {
    console.error(error)
    return []
  }

  return data
}