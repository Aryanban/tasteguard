/**
 * Agent 1: Entity Resolver
 * Resolves human-readable brand and artist search queries into canonical Qloo URNs.
 */

import { qlooClient, QlooApiClient } from '../qloo/client'
import { QlooEntity, TraceEvent } from '../qloo/types'

export interface ResolverOutput {
  brand: QlooEntity
  artist: QlooEntity
  events: TraceEvent[]
}

export async function runEntityResolver(
  brandQuery: string,
  artistQuery: string,
  client: QlooApiClient = qlooClient
): Promise<ResolverOutput> {
  const events: TraceEvent[] = [
    {
      agent: 'Agent 1: Entity Resolver',
      step: 'Initiating URN Resolution',
      detail: `Querying Qloo GET /search for Brand: "${brandQuery}" and Artist: "${artistQuery}"`,
      timestamp: new Date().toISOString()
    }
  ]

  const [brand, artist] = await Promise.all([
    client.searchEntity(brandQuery, 'brand'),
    client.searchEntity(artistQuery, 'artist')
  ])

  events.push({
    agent: 'Agent 1: Entity Resolver',
    step: 'Canonical Entities Resolved',
    detail: `Matched Brand to ${brand.id} (${brand.name}) and Artist to ${artist.id} (${artist.name})`,
    timestamp: new Date().toISOString()
  })

  return { brand, artist, events }
}
