import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react'
import FormRenderer from 'src/components/form/FormRenderer'
import useToast from 'src/contexts/toast/toast.context'
import { articleFormConfig } from 'src/pages/content/article/article-form.config'
import { service, useSubmit } from 'src/services'
import type { CreateArticleDto } from 'src/services/api'
import { useRetrieveDetail } from 'src/services/hooks/use-retrieve-detail'

const ArticleEditPage: React.FC = () => {
  const { id = '0' } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const { formRef, submitting, submitRequest } = useSubmit(service.article.updateArticle)
  const { loading, detail } = useRetrieveDetail(service.article.retrieveArticle, +id)
  const form: Required<CreateArticleDto> = useMemo(() => ({
    title: detail?.title ?? '',
    content: detail?.content ?? '',
    tags: detail?.tags.map(t => t.key) ?? [],
    categoryId: detail?.category?.id ?? Number.NaN,
  }), [detail])

  const onSubmit = async (form: CreateArticleDto) => {
    try {
      await submitRequest(+id, form)
      toast.success('Success')
      navigate('..')
    }
    catch (error) {
      console.error(error)
      toast.error('Error')
    }
  }

  return (
    <>
      <Menu attached="top">
        <Menu.Item role="link" icon="angle left" content="Back" onClick={() => navigate(-1)} />
      </Menu>

      <Segment attached="bottom" loading={loading}>
        <Header as="h2">
          <Icon name="edit" />
          <Header.Content>Edit Article</Header.Content>
        </Header>

        <FormRenderer
          ref={formRef}
          initForm={form}
          fields={articleFormConfig}
          submitting={submitting}
          onSubmit={onSubmit}
        />
      </Segment>
    </>
  )
}

export default ArticleEditPage
