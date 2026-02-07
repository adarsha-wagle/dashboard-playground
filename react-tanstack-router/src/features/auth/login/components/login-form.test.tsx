import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LoginForm } from './login-form'
import * as authServices from '../../shared/auth-services'

// Mock the auth services
vi.mock('../../shared/auth-services', () => ({
  useLoginMutation: vi.fn(),
}))

// Mock TanStack Router Link component
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
    useNavigate: () => vi.fn(),
  }
})

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  )
}

// describe('LoginForm Integration Tests', () => {
//   const mockMutate = vi.fn()
//   const mockLoginMutation = {
//     mutate: mockMutate,
//     isPending: false,
//     isError: false,
//     isSuccess: false,
//     error: null,
//     data: undefined,
//     reset: vi.fn(),
//   }

//   beforeEach(() => {
//     vi.clearAllMocks()
//     vi.mocked(authServices.useLoginMutation).mockReturnValue(
//       mockLoginMutation as any,
//     )
//   })

//   describe('Rendering', () => {
//     it('should render the login form with all required fields', () => {
//       renderWithProviders(<LoginForm />)

//       expect(screen.getByText('Login to your account')).toBeInTheDocument()
//       expect(
//         screen.getByText('Enter your email below to login to your account'),
//       ).toBeInTheDocument()
//       expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
//       expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
//       expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
//     })

//     it('should render the sign up link', () => {
//       renderWithProviders(<LoginForm />)

//       const signUpLink = screen.getByRole('link', { name: /sign up/i })
//       expect(signUpLink).toBeInTheDocument()
//       expect(signUpLink).toHaveAttribute('href', '/auth/register')
//     })

//     it('should render card with proper structure', () => {
//       renderWithProviders(<LoginForm />)

//       expect(screen.getByText('Login to your account')).toBeInTheDocument()
//       expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
//     })
//   })

//   //   describe('Form Validation', () => {
//   //     it('should show validation errors when submitting empty form', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       // Wait for validation errors to appear
//   //       await waitFor(() => {
//   //         // Query for validation error messages
//   //         const errors = screen.queryAllByRole('alert')
//   //         expect(errors.length).toBeGreaterThan(0)
//   //       })

//   //       expect(mockMutate).not.toHaveBeenCalled()
//   //     })

//   //     it('should not submit form when username is missing', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const passwordInput = screen.getByLabelText(/password/i)
//   //       await user.type(passwordInput, 'password123')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       // Should show validation error and not call mutate
//   //       expect(mockMutate).not.toHaveBeenCalled()
//   //     })

//   //     it('should not submit form when password is missing', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(/username/i)
//   //       await user.type(usernameInput, 'testuser')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       // Should show validation error and not call mutate
//   //       expect(mockMutate).not.toHaveBeenCalled()
//   //     })
//   //   })

//   //   describe('Form Submission', () => {
//   //     it('should submit form with valid credentials', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(/username/i)
//   //       const passwordInput = screen.getByLabelText(/password/i)

//   //       await user.type(usernameInput, 'testuser')
//   //       await user.type(passwordInput, 'password123')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       await waitFor(() => {
//   //         expect(mockMutate).toHaveBeenCalledWith({
//   //           username: 'testuser',
//   //           password: 'password123',
//   //         })
//   //       })
//   //     })

//   //     it('should call mutation only once on submit', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(/username/i)
//   //       const passwordInput = screen.getByLabelText(/password/i)

//   //       await user.type(usernameInput, 'testuser')
//   //       await user.type(passwordInput, 'password123')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       await waitFor(() => {
//   //         expect(mockMutate).toHaveBeenCalledTimes(1)
//   //       })
//   //     })

//   //     it('should handle successful login mutation', async () => {
//   //       const user = userEvent.setup()
//   //       const successMutation = {
//   //         ...mockLoginMutation,
//   //         isSuccess: true,
//   //         data: { token: 'mock-token', user: { id: 1, username: 'testuser' } },
//   //       }
//   //       vi.mocked(authServices.useLoginMutation).mockReturnValue(
//   //         successMutation as any,
//   //       )

//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(/username/i)
//   //       const passwordInput = screen.getByLabelText(/password/i)

//   //       await user.type(usernameInput, 'testuser')
//   //       await user.type(passwordInput, 'password123')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       await waitFor(() => {
//   //         expect(mockMutate).toHaveBeenCalled()
//   //       })
//   //     })

//   //     it('should handle login error', async () => {
//   //       const user = userEvent.setup()
//   //       const errorMutation = {
//   //         ...mockLoginMutation,
//   //         isError: true,
//   //         error: { message: 'Invalid credentials' },
//   //       }
//   //       vi.mocked(authServices.useLoginMutation).mockReturnValue(
//   //         errorMutation as any,
//   //       )

//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(/username/i)
//   //       const passwordInput = screen.getByLabelText(/password/i)

//   //       await user.type(usernameInput, 'testuser')
//   //       await user.type(passwordInput, 'wrongpassword')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       // If you display error messages in the UI, add assertions here
//   //       // expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
//   //     })

//   //     it('should handle pending state during login', async () => {
//   //       const user = userEvent.setup()
//   //       const pendingMutation = {
//   //         ...mockLoginMutation,
//   //         isPending: true,
//   //       }
//   //       vi.mocked(authServices.useLoginMutation).mockReturnValue(
//   //         pendingMutation as any,
//   //       )

//   //       renderWithProviders(<LoginForm />)

//   //       const submitButton = screen.getByRole('button', { name: /login/i })

//   //       // If you disable the button during pending state, test it here
//   //       // expect(submitButton).toBeDisabled()
//   //     })
//   //   })

//   //   describe('User Interactions', () => {
//   //     it('should allow typing in username field', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(
//   //         /username/i,
//   //       ) as HTMLInputElement
//   //       await user.type(usernameInput, 'myusername')

//   //       expect(usernameInput.value).toBe('myusername')
//   //     })

//   //     it('should allow typing in password field', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const passwordInput = screen.getByLabelText(
//   //         /password/i,
//   //       ) as HTMLInputElement
//   //       await user.type(passwordInput, 'mypassword')

//   //       expect(passwordInput.value).toBe('mypassword')
//   //     })

//   //     it('should allow clearing input fields', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(
//   //         /username/i,
//   //       ) as HTMLInputElement
//   //       await user.type(usernameInput, 'testuser')
//   //       await user.clear(usernameInput)

//   //       expect(usernameInput.value).toBe('')
//   //     })

//   //     it('should handle rapid typing in fields', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(
//   //         /username/i,
//   //       ) as HTMLInputElement
//   //       const longUsername = 'verylongusername123456789'

//   //       await user.type(usernameInput, longUsername)

//   //       expect(usernameInput.value).toBe(longUsername)
//   //     })
//   //   })

//   //   describe('Form Behavior', () => {
//   //     it('should preserve form data when validation fails', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(
//   //         /username/i,
//   //       ) as HTMLInputElement
//   //       await user.type(usernameInput, 'testuser')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       // Form should still have the username value
//   //       expect(usernameInput.value).toBe('testuser')
//   //     })

//   //     it('should handle form submission with Enter key', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(/username/i)
//   //       const passwordInput = screen.getByLabelText(/password/i)

//   //       await user.type(usernameInput, 'testuser')
//   //       await user.type(passwordInput, 'password123{Enter}')

//   //       await waitFor(() => {
//   //         expect(mockMutate).toHaveBeenCalledWith({
//   //           username: 'testuser',
//   //           password: 'password123',
//   //         })
//   //       })
//   //     })
//   //   })

//   //   describe('Accessibility', () => {
//   //     it('should have proper form labels', () => {
//   //       renderWithProviders(<LoginForm />)

//   //       expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
//   //       expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
//   //     })

//   //     it('should support keyboard navigation', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       // Tab through form elements
//   //       await user.tab()
//   //       expect(screen.getByLabelText(/username/i)).toHaveFocus()

//   //       await user.tab()
//   //       expect(screen.getByLabelText(/password/i)).toHaveFocus()

//   //       await user.tab()
//   //       expect(screen.getByRole('button', { name: /login/i })).toHaveFocus()
//   //     })

//   //     it('should have accessible button', () => {
//   //       renderWithProviders(<LoginForm />)

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       expect(submitButton).toHaveAttribute('type', 'submit')
//   //     })

//   //     it('should have proper heading hierarchy', () => {
//   //       renderWithProviders(<LoginForm />)

//   //       const heading = screen.getByText('Login to your account')
//   //       expect(heading).toBeInTheDocument()
//   //     })
//   //   })

//   //   describe('Navigation', () => {
//   //     it('should render sign up link with correct href', () => {
//   //       renderWithProviders(<LoginForm />)

//   //       const signUpLink = screen.getByRole('link', { name: /sign up/i })
//   //       expect(signUpLink).toHaveAttribute('href', '/auth/register')
//   //     })

//   //     it('should display sign up prompt text', () => {
//   //       renderWithProviders(<LoginForm />)

//   //       expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
//   //     })
//   //   })

//   //   describe('Component Props', () => {
//   //     it('should apply custom className', () => {
//   //       const { container } = renderWithProviders(
//   //         <LoginForm className="custom-class" />,
//   //       )

//   //       const formContainer = container.firstChild as HTMLElement
//   //       expect(formContainer).toHaveClass('custom-class')
//   //     })

//   //     it('should spread additional props to container', () => {
//   //       const { container } = renderWithProviders(
//   //         <LoginForm data-testid="login-form" />,
//   //       )

//   //       expect(container.firstChild).toHaveAttribute('data-testid', 'login-form')
//   //     })
//   //   })

//   //   describe('Edge Cases', () => {
//   //     it('should handle special characters in username', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(
//   //         /username/i,
//   //       ) as HTMLInputElement
//   //       const passwordInput = screen.getByLabelText(/password/i)

//   //       await user.type(usernameInput, 'user@example.com')
//   //       await user.type(passwordInput, 'password123')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.click(submitButton)

//   //       await waitFor(() => {
//   //         expect(mockMutate).toHaveBeenCalledWith({
//   //           username: 'user@example.com',
//   //           password: 'password123',
//   //         })
//   //       })
//   //     })

//   //     it('should handle special characters in password', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(/username/i)
//   //       const passwordInput = screen.getByLabelText(
//   //         /password/i,
//   //       ) as HTMLInputElement

//   //       await user.type(usernameInput, 'testuser')
//   //       await user.type(passwordInput, 'P@ssw0rd!#$%')

//   //       expect(passwordInput.value).toBe('P@ssw0rd!#$%')
//   //     })

//   //     it('should not submit on double click', async () => {
//   //       const user = userEvent.setup()
//   //       renderWithProviders(<LoginForm />)

//   //       const usernameInput = screen.getByLabelText(/username/i)
//   //       const passwordInput = screen.getByLabelText(/password/i)

//   //       await user.type(usernameInput, 'testuser')
//   //       await user.type(passwordInput, 'password123')

//   //       const submitButton = screen.getByRole('button', { name: /login/i })
//   //       await user.dblClick(submitButton)

//   //       // Should only be called once due to form submission prevention
//   //       await waitFor(() => {
//   //         expect(mockMutate).toHaveBeenCalledTimes(1)
//   //       })
//   //     })
//   //   })
// })
