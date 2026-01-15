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
import ControlledInputField from '@/components/reusables/controlled-input-field'

import { LoginSchema, type TLoginSchema } from '../../shared/auth-type'
import { useRegisterMutation } from '../../shared/auth-services'
import { Link } from '@tanstack/react-router'
import { Form } from '@/components/ui/form'

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const registerMutation = useRegisterMutation()

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: TLoginSchema) => {
    await registerMutation.mutateAsync(data)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
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
              <Button type="submit">Register</Button>
              <p className="text-center">
                Already have an account? <Link to="/auth/login">Login</Link>
              </p>
            </Form>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
