/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { FieldConfig, SelectOption } from 'src/components/form/FormRenderer'
import { service } from 'src/services'
import type { CreateArticleDto } from 'src/services/api'

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
      const { data: items } = await service.category.retrieveRootCategories()
      return items.map<SelectOption>(c => ({ text: c.label, value: c.id, description: c.description }))
    },
  },
  {
    type: 'select',
    name: 'tags',
    label: 'Tags',
    multiple: true,
    options: async () => {
      const { data: { items } } = await service.tag.retrieveTags({ limit: 1000 })
      return items.map<SelectOption>(tag => ({ text: tag.name, value: tag.key, description: tag.description }))
    },
    creatable: true,
    onAddItem: async ({ text, value }) => {
      const { data: tag } = await service.tag.createTag({ key: String(value), name: String(text) })
      return { text: tag.name, value: tag.key, description: tag.description }
    },
  },
  { type: 'rich', name: 'content', label: 'Content' },
]
