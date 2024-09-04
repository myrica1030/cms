import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react'
import { api, useSubmit } from 'src/client'
import type { CreateArticleDto } from 'src/client/cms/cms-api'
import { useRetrieveDetail } from 'src/client/hooks/use-retrieve-detail'
import FormRenderer from 'src/components/form/FormRenderer'
import useToast from 'src/contexts/toast/toast.context'
import { articleFormConfig } from 'src/pages/content/article/article-form.config'

const ArticleEditPage: React.FC = () => {
  const { id = '0' } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const { formRef, submitting, submitRequest } = useSubmit(api.article.updateArticle)
  const { loading, detail } = useRetrieveDetail(api.article.retrieveArticle, +id)
  const form: Required<CreateArticleDto> = useMemo(() => ({
    title: detail?.title ?? '',
    content: detail?.content ?? '',
    tags: detail?.tags ?? [],
    categoryId: detail?.categoryId ?? Number.NaN,
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
