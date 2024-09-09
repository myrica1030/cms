import { api } from 'src/client'
import type { CreateArticleDto } from 'src/client/cms/cms-api'
import type { FieldConfig, SelectOption } from 'src/components/form/FormRenderer'

export const articleForm: Required<CreateArticleDto> = {
  title: '',
  categoryId: 1,
  tags: [],
  content: '',
}

export const articleFormConfig: FieldConfig<keyof typeof articleForm>[] = [
  { type: 'text', name: 'title', label: 'Title', required: true },
  {
    type: 'select',
    name: 'categoryId',
    label: 'Category',
    options: async () => {
      // FIXME
      // const { data: items } = await api.category.retrieveRootCategories()
      // return items.map<SelectOption>(c => ({ text: c.label, value: c.id, description: c.description }))
      return []
    },
  },
  {
    type: 'select',
    name: 'tags',
    label: 'Tags',
    multiple: true,
    options: async () => {
      const { data: { items } } = await api.tag.retrieveTags({ limit: 1000 })
      return items.map<SelectOption>(tag => ({ text: tag.name, value: tag.key, description: tag.description }))
    },
    creatable: true,
    onAddItem: async ({ text, value }) => {
      const { data: tag } = await api.tag.createTag({ key: String(value), name: String(text) })
      return { text: tag.name, value: tag.key, description: tag.description }
    },
  },
  { type: 'rich', name: 'content', label: 'Content' },
]
