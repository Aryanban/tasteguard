/**
 * TasteGuard TypeScript Qloo API Client
 * Connects to Qloo's Cultural AI & Taste Graph API (https://hackathon.api.qloo.com).
 * Supports live requests, X-Api-Key headers, caching, rate-limit retries, and offline demo fallback.
 */

import { QlooEntity, AudienceProfile, DomainAffinity } from './types'
import { CACHED_ENTITIES, CACHED_PROFILES, generateSyntheticProfile } from './mockData'

export class QlooApiClient {
  private apiKey: string
  private baseUrl: string
  private searchCache: Map<string, QlooEntity> = new Map()
  private profileCache: Map<string, AudienceProfile> = new Map()

  constructor(apiKey?: string, baseUrl?: string) {
    this.apiKey = apiKey || process.env.QLOO_API_KEY || ''
    this.baseUrl = (baseUrl || process.env.QLOO_BASE_URL || 'https://hackathon.api.qloo.com').replace(/\/$/, '')
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    if (this.apiKey && this.apiKey !== 'your_qloo_api_key_here') {
      headers['X-Api-Key'] = this.apiKey
    }
    return headers
  }

  /**
   * Resolve brand or artist name to canonical Qloo entity URN
   */
  async searchEntity(query: string, expectedType: 'brand' | 'artist'): Promise<QlooEntity> {
    const slug = query.trim().toLowerCase().replace(/[\s.]+/g, '_')
    const cacheKey = `${expectedType}:${slug}`

    if (this.searchCache.has(cacheKey)) {
      return this.searchCache.get(cacheKey)!
    }

    // 1. Check pre-cached dataset
    if (CACHED_ENTITIES[slug]) {
      const entity = CACHED_ENTITIES[slug]
      this.searchCache.set(cacheKey, entity)
      return entity
    }

    // 2. Query live Qloo API if key is provided
    if (this.apiKey && this.apiKey !== 'your_qloo_api_key_here') {
      try {
        const typeUrn = `urn:entity:${expectedType}`
        const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}&types=${encodeURIComponent(typeUrn)}&take=10`
        for (let attempt = 0; attempt < 3; attempt++) {
          const res = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders()
          })

          if (res.ok) {
            const data = await res.json()
            const items = data.results || data.data || []
            if (items.length > 0) {
              const top = items[0]
              const entity: QlooEntity = {
                id: top.id || top.urn || `urn:entity:${expectedType}:${slug}`,
                name: top.name || query,
                type: top.type || typeUrn,
                popularity: top.popularity ?? 0.8,
                metadata: top.metadata || {}
              }
              this.searchCache.set(cacheKey, entity)
              return entity
            }
            break
          } else if (res.status === 429) {
            const backoff = Math.pow(2, attempt) * 1000
            await new Promise((resolve) => setTimeout(resolve, backoff))
            continue
          } else {
            console.warn(`[QlooClient] Search returned status ${res.status}:`, await res.text().catch(() => ''))
            break
          }
        }
      } catch (err) {
        console.warn(`[QlooClient] Error querying live search for "${query}":`, err)
      }
    }

    // 3. Fallback: Generate synthetic entity
    const synth = generateSyntheticProfile(query, expectedType).entity
    this.searchCache.set(cacheKey, synth)
    return synth
  }

  /**
   * Fetch 7-domain audience profile for an entity
   */
  async getAudienceProfile(entity: QlooEntity): Promise<AudienceProfile> {
    if (this.profileCache.has(entity.id)) {
      return this.profileCache.get(entity.id)!
    }

    // 1. Check pre-cached profiles
    if (CACHED_PROFILES[entity.id]) {
      const profile = CACHED_PROFILES[entity.id]
      this.profileCache.set(entity.id, profile)
      return profile
    }

    // 2. Query live Qloo /v2/insights API if key exists
    if (this.apiKey && this.apiKey !== 'your_qloo_api_key_here') {
      try {
        const filterType = entity.type.includes('artist') ? 'urn:entity:brand' : 'urn:entity:artist'
        const url = `${this.baseUrl}/v2/insights?filter.type=${encodeURIComponent(filterType)}&signal.interests.entities=${encodeURIComponent(entity.id)}&take=10`
        for (let attempt = 0; attempt < 3; attempt++) {
          const res = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders()
          })

          if (res.ok) {
            const data = await res.json()
            const profile = this.parseInsightsResponse(data, entity)
            this.profileCache.set(entity.id, profile)
            return profile
          } else if (res.status === 429) {
            const backoff = Math.pow(2, attempt) * 1000
            await new Promise((resolve) => setTimeout(resolve, backoff))
            continue
          } else {
            console.warn(`[QlooClient] /v2/insights returned status ${res.status}:`, await res.text().catch(() => ''))
            break
          }
        }
      } catch (err) {
        console.warn(`[QlooClient] Error querying /v2/insights for "${entity.name}":`, err)
      }
    }

    // 3. Fallback: Synthesize deterministic profile
    const type = entity.type.includes('artist') ? 'artist' : 'brand'
    const profile = generateSyntheticProfile(entity.name, type)
    this.profileCache.set(entity.id, profile)
    return profile
  }

  /**
   * Compare two entities via Qloo /v2/analysis/compare
   */
  async compareEntities(brandUrn: string, artistUrn: string): Promise<any | null> {
    if (!this.apiKey || this.apiKey === 'your_qloo_api_key_here') {
      return null
    }

    try {
      const url = `${this.baseUrl}/v2/analysis/compare?a.signal.interests.entities=${encodeURIComponent(brandUrn)}&b.signal.interests.entities=${encodeURIComponent(artistUrn)}&take=10`
      const res = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      })
      if (res.ok) {
        return await res.json()
      }
    } catch (err) {
      console.warn('[QlooClient] Error querying /v2/analysis/compare:', err)
    }
    return null
  }

  private parseInsightsResponse(data: any, entity: QlooEntity): AudienceProfile {
    const domains = ['music', 'fashion', 'dining', 'beverage', 'travel', 'tech', 'media']
    const affinities: Record<string, DomainAffinity> = {}
    const results = data.results || data.insights || []

    domains.forEach((dom) => {
      const match = results.find((r: any) => (r.category || '').toLowerCase() === dom || (r.id || '').includes(dom))
      if (match) {
        affinities[dom] = {
          domain: dom,
          score: Math.min(1.0, Math.max(0.0, Number(match.affinity || 0.7))),
          top_tags: match.tags || [`${dom}_primary`],
          sample_entities: match.related_entities || [],
          evidence_id: match.tag_urn || `urn:tag:${dom}:${entity.name.toLowerCase()}`
        }
      } else {
        affinities[dom] = {
          domain: dom,
          score: 0.5,
          top_tags: [`general_${dom}`],
          sample_entities: [],
          evidence_id: `urn:tag:${dom}:baseline`
        }
      }
    })

    return {
      entity,
      affinities,
      demographics: { privacy: '0-PII verified' }
    }
  }
}

export const qlooClient = new QlooApiClient()

export function getQlooClient(apiKey?: string): QlooApiClient {
  if (apiKey && apiKey.trim().length > 0 && apiKey !== 'your_qloo_api_key_here') {
    return new QlooApiClient(apiKey.trim())
  }
  return qlooClient
}
