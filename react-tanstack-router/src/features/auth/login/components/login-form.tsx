import { Link } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ControlledInputField from '@/components/form/controlled-input-field'

import { LoginSchema, type TLoginSchema } from '../../shared/auth-type'
import { useLoginMutation } from '../../shared/auth-services'
import { Form } from '@/components/ui/form'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const loginMutation = useLoginMutation()

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (data: TLoginSchema) => {
    loginMutation.mutate(data)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Form {...form}>
              <ControlledInputField
                control={form.control}
                name="username"
                label="Username"
                placeholder="Enter your username"
                required
              />
              <ControlledInputField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
              />
              <Button type="submit">Login</Button>
              <p className="text-center">
                Don&apos;t have an account?
                <Link to="/auth/register">Sign up</Link>
              </p>
            </Form>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
