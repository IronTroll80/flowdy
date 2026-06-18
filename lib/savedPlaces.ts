import { supabase } from './supabase'


export async function getSavedPlaces(userId: string) {
  const { data, error } = await supabase
    .from('saved_places')
    .select(`
      id,
      place_id,
      created_at,
      hotspots:place_id (
        id,
        name,
        address,
        image_url,
        traffic_rating,
        traffic_level,
        estimated_people,
        updated_at
      )
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('getSavedPlaces error:', error)
    return []
  }

  return data ?? []
}

export async function isPlaceSaved(userId: string, placeId: string) {
  const { data, error } = await supabase
    .from('saved_places')
    .select('id')
    .eq('user_id', userId)
    .eq('place_id', placeId)
    .maybeSingle()

  if (error) {
    console.error('isPlaceSaved error:', error)
    return false
  }

  return !!data
}

export async function savePlace(userId: string, placeId: string) {
  const { error } = await supabase.from('saved_places').insert({
    user_id: userId,
    place_id: placeId,
  })

  if (error) {
    console.error('savePlace error:', error)
  }
}

export async function removeSavedPlace(userId: string, placeId: string) {
  const { error } = await supabase
    .from('saved_places')
    .delete()
    .eq('user_id', userId)
    .eq('place_id', placeId)

  if (error) {
    console.error('removeSavedPlace error:', error)
  }
}


export async function toggleSavePlace(userId: string, placeId: string) {
  const saved = await isPlaceSaved(userId, placeId)

  if (saved) {
    await removeSavedPlace(userId, placeId)
    return false
  } else {
    await savePlace(userId, placeId)
    return true
  }
}