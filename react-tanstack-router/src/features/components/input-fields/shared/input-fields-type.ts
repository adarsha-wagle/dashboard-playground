import z from 'zod'
import {
  User,
  Star,
  Settings,
  Bell,
  Heart,
  Gift,
  Camera,
  MessageSquare,
  Mail,
} from 'lucide-react'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const singleFileSchema = z
  .union([
    z.instanceof(File),
    z.string().url(), // existing file (edit mode)
    z.null(),
  ])
  .refine(
    (file) => {
      if (!file || typeof file === 'string') return true
      return file.size <= MAX_FILE_SIZE
    },
    { message: 'File size must be less than 10MB' },
  )
  .refine(
    (file) => {
      if (!file || typeof file === 'string') return true
      return IMAGE_TYPES.includes(file.type)
    },
    { message: 'Only JPG, PNG, or WEBP images are allowed' },
  )

export const imageGallerySchema = z
  .array(z.union([z.instanceof(File), z.string().url()]))
  .min(1)
  .max(10)
  .refine(
    (files) =>
      files.every(
        (file) => typeof file === 'string' || IMAGE_TYPES.includes(file.type),
      ),
    { message: 'Only image files are allowed' },
  )
export const multiFileSchema = z
  .array(z.union([z.instanceof(File), z.string().url()]))
  .min(1, { message: 'At least one file is required' })
  .max(5, { message: 'You can upload up to 5 files' })
  .refine(
    (files) =>
      files.every(
        (file) => typeof file === 'string' || file.size <= MAX_FILE_SIZE,
      ),
    { message: 'One or more files exceed the size limit' },
  )
export const requiredSingleFileSchema = z
  .union([z.instanceof(File), z.string().url()])
  .refine((file) => typeof file === 'string' || file.size <= MAX_FILE_SIZE, {
    message: 'File size must be less than 10MB',
  })

export const FormSchema = z.object({
  name: z
    .string()
    .min(4, 'Name must be at least 4 characters long')
    .trim()
    .max(50, 'Name must be at most 50 characters long'),

  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .trim()
    .max(50, 'Password must be at most 50 characters long'),

  email: z
    .string()
    .email('Invalid email address')
    .trim()
    .max(50, 'Email must be at most 50 characters long'),

  date: z.date(),

  customerName: z.coerce
    .number('Customer name is required')
    .min(1, 'Customer name is required'),

  description: z
    .string()
    .trim()
    .max(100, 'Description must be at most 100 characters long'),

  country: z.string(),
  section: z.string(),
  features: z.array(z.string()),
  price: z.coerce.number(),
  budgetRange: z.tuple([z.number(), z.number()]),
  fromDate: z.date(),
  toDate: z.date(),
  notifications: z.boolean(),
  termsAccepted: z.boolean(),
  plan: z.string(),
  thumbnail: requiredSingleFileSchema,
  gallery: imageGallerySchema.optional(),
  attachment: singleFileSchema.optional(),
  fullDescription: z.string().optional(),
})

export type TFormSchema = z.infer<typeof FormSchema>

export const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
]

export const iconOptions = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'favorites', label: 'Favorites', icon: Star },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'notifications', label: 'Notifications', icon: Bell },
  { value: 'likes', label: 'Likes', icon: Heart },
  { value: 'rewards', label: 'Rewards', icon: Gift },
  { value: 'photos', label: 'Photos', icon: Camera },
  { value: 'messages', label: 'Messages', icon: MessageSquare },
]

export const multiSelectOptions = [
  {
    value: 'user',
    label: 'User',
    icon: User,
    description: 'Standard user account',
  },
  {
    value: 'star',
    label: 'Star',
    icon: Star,
    description: 'Featured item',
  },
  {
    value: 'notification',
    label: 'Notification',
    icon: Bell,
    description: 'Alert or notification',
  },
  {
    value: 'favorite',
    label: 'Favorite',
    icon: Heart,
    description: 'Saved as favorite',
  },
  {
    value: 'message',
    label: 'Message',
    icon: Mail,
    description: 'Send a message',
  },
]
