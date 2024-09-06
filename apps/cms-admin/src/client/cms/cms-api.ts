/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export interface UserEntity {
  /**
   * The unique identifier
   * @min 1
   * @example "123"
   */
  id: number
  /**
   * The email address
   * @example "foo@example.com"
   */
  email: string
  /** @example "foo" */
  username: string
  /**
   * The creation datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  createdAt: string
  /**
   * The last update datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  updatedAt: string
  /**
   * The biography of the user
   * @example "This guy is lazy and has left nothing."
   */
  bio?: string
  /**
   * The URL of the user avatar image
   * @format url
   * @example "https://picsum.photos/200"
   */
  image?: string
}

export interface RegisterDto {
  /**
   * @minLength 1
   * @example "admin"
   */
  username: string
  /**
   * The email address
   * @example "foo@example.com"
   */
  email: string
  /**
   * @format password
   * @minLength 6
   * @maxLength 32
   */
  password: string
}

export interface AuthEntity {
  /**
   * The unique identifier
   * @example "123"
   */
  id: number
  /** @example "foo@example.com" */
  email: string
  /** @example "foo" */
  username: string
  /**
   * The creation datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  createdAt: string
  /**
   * The last update datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  updatedAt: string
  /**
   * The biography of the user
   * @example "This guy is lazy and has left nothing."
   */
  bio?: string
  /**
   * The URL of the user avatar image
   * @format url
   * @example "https://picsum.photos/200"
   */
  image?: string
  /** @example "jwt" */
  token: string
}

export interface LoginDto {
  /**
   * @minLength 1
   * @example "admin"
   */
  username: string
  /**
   * @format password
   * @minLength 6
   * @maxLength 32
   */
  password: string
}

export interface CreateArticleDto {
  /**
   * The title of the article
   * @minLength 1
   * @maxLength 60
   * @example "Lorem ipsum"
   */
  title: string
  /**
   * The content of the article
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  content: string
  /**
   * The category ID of the article
   * @min 1
   * @example "123"
   */
  categoryId?: number
  /**
   * The tag keys of the article
   * @example ["semantic-ui","vue"]
   */
  tags?: string[]
}

export interface TagEntity {
  /**
   * The unique identifier
   * @minLength 1
   * @pattern ^[\dA-Za-z\-]+$
   * @example "foo-bar"
   */
  key: string
  /** The name of the tag */
  name: string
  /** The description of the tag */
  description?: string
  /**
   * The creation datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  createdAt: string
  /**
   * The last update datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  updatedAt: string
}

export interface ArticleEntity {
  /**
   * The ID of the article
   * @min 1
   * @example "123"
   */
  id: number
  /** The title of the article */
  title: string
  /** The content of the article */
  content: string
  /**
   * The category ID of the article
   * @min 1
   * @example "123"
   */
  categoryId?: number
  /**
   * The creation datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  createdAt: string
  /**
   * The last update datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  updatedAt: string
  /** The author of the article */
  author: UserEntity
  /** The tags of the article */
  tags: TagEntity[]
}

/** @default "desc" */
export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface CreateCategoryDto {
  /**
   * The identifier of the category
   * @minLength 1
   * @maxLength 32
   * @example "study-notes"
   */
  key: string
  /**
   * The display text of the category
   * @minLength 1
   * @example "Study notes"
   */
  label: string
  /**
   * HTML content
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  description?: string
  /**
   * Category parent ID
   * @min 1
   * @example "123"
   */
  parentId?: number
}

export interface CategoryEntity {
  /**
   * The identifier of the category
   * @min 1
   * @example "123"
   */
  id: number
  /**
   * Category parent ID
   * @min 1
   * @example "123"
   */
  parentId?: number
  /**
   * The key of the category
   * @example "study-notes"
   */
  key: string
  /**
   * The display text of the category
   * @example "Study notes"
   */
  label: string
  /**
   * The description of the category
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  description?: string
  /**
   * The creation datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  createdAt: string
  /**
   * The last update datetime
   * @format date-time
   * @example "2020-08-16T00:04:59.343Z"
   */
  updatedAt: string
}

export interface CreateTagDto {
  /**
   * The key of the tag
   * @minLength 1
   * @pattern ^[\dA-Za-z\-]+$
   * @example "semantic-ui"
   */
  key: string
  /**
   * The display name of the tag
   * @minLength 1
   * @example "Semantic UI"
   */
  name: string
  /**
   * The description of the tag
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  description?: string
}

export interface PaginationQuery {
  /**
   * The page number of the items
   * @min 1
   * @default 1
   */
  page?: number
  /**
   * The limit of the items per page
   * @min 1
   * @max 500
   * @default 10
   */
  limit?: number
  /**
   * The order of the items `createdAt` property
   *
   * Enum name: SortOrder
   * Enum values:
   * ```
   *   Asc = asc,
   *   Desc = desc,
   * ```
   * @default "desc"
   */
  order?: SortOrder
}

export interface PaginatedMetadata {
  /**
   * The number of items per page
   * @example 10
   */
  limit: number
  /**
   * The total number of items
   * @example 24
   */
  total: number
  /**
   * The total number of pages
   * @example 3
   */
  totalPages: number
  /**
   * The current page number
   * @example 1
   */
  currentPage: number
}

export interface PaginatedEntity<T = never> {
  /** The metadata of the paginated items */
  metadata: PaginatedMetadata
  /** The items on the current page */
  items: T[]
}

export enum FormErrorCause {
  IsNotEmpty = 'isNotEmpty',
  IsExist = 'isExist',
  IsNotExist = 'isNotExist',
  IsInvalid = 'isInvalid',
}

export type FormError = Record<string, (FormErrorCause | string)[]>

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown = never, E extends unknown = any> extends Response {
  data: D
  error: E
}

type CancelToken = symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter(key => query[key] !== undefined)
    return keys
      .map(key => Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...params2,
      headers: {
        ...this.baseApiParams.headers,
        ...params1.headers,
        ...params2 && params2.headers,
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const isSecure = typeof secure === 'boolean' ? secure : this.baseApiParams.secure
    const secureParams = (isSecure && await this.securityWorker?.(this.securityData)) || {}
    const requestParams = this.mergeRequestParams(params, secureParams)

    // @ts-expect-error Authorization is existing header
    if (isSecure && !requestParams.headers?.Authorization) {
      throw new Error('Token is required')
    }

    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return await this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...requestParams.headers,
        ...type && type !== ContentType.FormData ? { 'Content-Type': type } : {},
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: body === undefined || body === null ? null : payloadFormatter(body),
    }).then(async response => {
      const r = response.clone() as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = responseFormat
        ? await response[responseFormat]()
          .then(data => {
            if (r.ok) {
              r.data = data
            }
            else {
              r.error = data
            }
            return r
          })
          .catch(error => {
            r.error = error
            return r
          })
        : r

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title CMS
 * @version 0.3.2
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  app = {
    /**
     * No description
     *
     * @tags App
     * @name HealthCheck
     * @summary Health check
     * @request `GET` `/api/hello`
     * @response `200` `string`
     */
    healthCheck: (
      query?: {
        /** @example "foo" */
        name?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/hello`,
        method: 'GET',
        query,
        format: 'json',
        ...params,
      }),
  }

  user = {
    /**
     * No description
     *
     * @tags User
     * @name Profile
     * @request `GET` `/api/user`
     * @secure
     * @response `200` `UserEntity`
     * @response `401` `void` Unauthorized
     */
    profile: (params: RequestParams = {}) =>
      this.request<UserEntity, void>({
        path: `/api/user`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  }

  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name Register
     * @summary register
     * @request `POST` `/api/auth/register`
     * @response `201` `AuthEntity`
     * @response `422` `FormError` Form validation error
     */
    register: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<AuthEntity, FormError>({
        path: `/api/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @summary login
     * @request `POST` `/api/auth/login`
     * @response `200` `AuthEntity`
     * @response `422` `FormError` Form validation error
     */
    login: (data: LoginDto, params: RequestParams = {}) =>
      this.request<AuthEntity, FormError>({
        path: `/api/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }

  article = {
    /**
     * No description
     *
     * @tags Article
     * @name CreateArticle
     * @summary Create article
     * @request `POST` `/api/article`
     * @secure
     * @response `201` `ArticleEntity`
     * @response `401` `void` Unauthorized
     * @response `422` `FormError` Form validation error
     */
    createArticle: (data: CreateArticleDto, params: RequestParams = {}) =>
      this.request<ArticleEntity, FormError>({
        path: `/api/article`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Article
     * @name RetrieveArticles
     * @summary Retrieve articles
     * @request `GET` `/api/article`
     * @response `200` `PaginatedEntity<ArticleEntity>`
     */
    retrieveArticles: (
      query?: {
        /**
         * The page number of the items
         * @default 1
         * @example 1
         */
        page?: number
        /**
         * The limit of the items per page
         * @default 10
         * @example 10
         */
        limit?: number
        /**
         *
         * Enum name: SortOrder
         * Enum values:
         * ```
         *   Asc = asc,
         *   Desc = desc,
         * ```
         */
        order?: SortOrder
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedEntity<ArticleEntity>, any>({
        path: `/api/article`,
        method: 'GET',
        query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Article
     * @name RetrieveArticle
     * @summary Retrieve article by article id
     * @request `GET` `/api/article/{articleId}`
     * @response `200` `ArticleEntity`
     * @response `404` `void`
     */
    retrieveArticle: (articleId: number, params: RequestParams = {}) =>
      this.request<ArticleEntity, void>({
        path: `/api/article/${articleId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Article
     * @name UpdateArticle
     * @summary Update article
     * @request `PUT` `/api/article/{articleId}`
     * @secure
     * @response `200` `ArticleEntity`
     * @response `401` `void` Unauthorized
     * @response `404` `void`
     * @response `422` `FormError` Form validation error
     */
    updateArticle: (articleId: number, data: CreateArticleDto, params: RequestParams = {}) =>
      this.request<ArticleEntity, FormError>({
        path: `/api/article/${articleId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }

  category = {
    /**
     * No description
     *
     * @tags Category
     * @name CreateCategory
     * @summary Create a category
     * @request `POST` `/api/category`
     * @secure
     * @response `201` `CategoryEntity`
     * @response `401` `void` Unauthorized
     * @response `422` `FormError` Form validation error
     */
    createCategory: (data: CreateCategoryDto, params: RequestParams = {}) =>
      this.request<CategoryEntity, FormError>({
        path: `/api/category`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name RetrieveRootCategories
     * @summary Retrieve some categories that not have parent category
     * @request `GET` `/api/category`
     * @response `200` `CategoryEntity[]`
     * @response `404` `void`
     */
    retrieveRootCategories: (params: RequestParams = {}) =>
      this.request<CategoryEntity[], void>({
        path: `/api/category`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name RetrieveCategory
     * @summary Retrieve a category
     * @request `GET` `/api/category/{categoryId}`
     * @response `200` `CategoryEntity`
     * @response `404` `void` Category not found
     */
    retrieveCategory: (categoryId: number, params: RequestParams = {}) =>
      this.request<CategoryEntity, void>({
        path: `/api/category/${categoryId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }

  tag = {
    /**
     * No description
     *
     * @tags Tag
     * @name CreateTag
     * @summary Create tag
     * @request `POST` `/api/tag`
     * @secure
     * @response `201` `TagEntity`
     * @response `401` `void` Unauthorized
     * @response `422` `FormError` Form validation error
     */
    createTag: (data: CreateTagDto, params: RequestParams = {}) =>
      this.request<TagEntity, FormError>({
        path: `/api/tag`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name RetrieveTags
     * @summary Retrieve tags
     * @request `GET` `/api/tag`
     * @response `200` `PaginatedEntity<TagEntity>`
     */
    retrieveTags: (
      query?: {
        /**
         * The page number of the items
         * @default 1
         * @example 1
         */
        page?: number
        /**
         * The limit of the items per page
         * @default 10
         * @example 10
         */
        limit?: number
        /**
         *
         * Enum name: SortOrder
         * Enum values:
         * ```
         *   Asc = asc,
         *   Desc = desc,
         * ```
         */
        order?: SortOrder
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedEntity<TagEntity>, any>({
        path: `/api/tag`,
        method: 'GET',
        query,
        format: 'json',
        ...params,
      }),
  }
}
