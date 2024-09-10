import { createTestingPinia } from '@pinia/testing'
import { userEvent } from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import PrimeVue from 'primevue/config'
import StyleClass from 'primevue/styleclass'
import { mockDeep } from 'vitest-mock-extended'
import { api } from '@/client'
import type { AuthEntity, FormError, HttpResponse } from '@/client/cms/cms-api'
import LoginPage from '@/pages/auth/LoginPage.vue'

vi.mock('primevue/usetoast')

describe('login page', () => {
  const mockedApi = mockDeep(api)

  it('should send api when form is submitted', async () => {
    const result = render(LoginPage, {
      global: {
        directives: {
          styleclass: StyleClass,
        },
        plugins: [
          createTestingPinia(),
          PrimeVue,
        ],
      },
    })

    mockedApi.auth.login.mockResolvedValue({
      data: { token: 'token' },
    } as HttpResponse<AuthEntity, FormError>)

    const username = result.getByRole('textbox', { name: 'Username' })
    const password = result.getByLabelText('Password')
    const submit = result.getByRole('button', { name: 'Sign In' })

    await userEvent.type(username, 'admin')
    await userEvent.type(password, 'password')
    await userEvent.click(submit)

    expect(mockedApi.auth.login).toBeCalledWith({ username: 'admin', password: 'password' })
    expect(mockedApi.setSecurityData('token'))
  })
})
