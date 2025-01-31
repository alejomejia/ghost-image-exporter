export interface GhostExportRoot {
  db: Db[]
}

export interface Db {
  data: Data
}

export interface Data {
  posts: Post[]
}

export interface Post {
  id: string
  uuid: string
  title: string
  slug: string
  mobiledoc?: string
  html: string
  comment_id: string
  plaintext: string
  feature_image?: string
  featured: number
  status: string
  locale: any
  visibility: string
  created_at: string
  updated_at: string
  published_at?: string
  custom_excerpt?: string
  codeinjection_head: any
  codeinjection_foot: any
  custom_template: any
  canonical_url?: string
  type: string
  email_recipient_filter: string
  newsletter_id?: string
  lexical?: string
  show_title_and_feature_image: number
}
