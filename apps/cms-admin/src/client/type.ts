import type { PaginatedMetadata } from 'src/client/cms/cms-api'

export interface PaginatedEntity<T = never> { items: T[], metadata: PaginatedMetadata }
