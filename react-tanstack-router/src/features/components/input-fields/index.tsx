import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  countries,
  FormSchema,
  iconOptions,
  multiSelectOptions,
  type TFormSchema,
} from './shared/input-fields-type'
import ControlledInputField from '@/components/reusables/controlled-input-field'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useGetPaginatedInvoices } from '../table/shared/invoice-service'
import { ServerAutocompleteInput } from '../server-autocomplete/components/server-autocomplete-input'
import ControlledDatePicker from '@/components/reusables/controlled-date-picker'
import ControlledTextAreaField from '@/components/reusables/controlled-textarea'
import { ControlledSelectField } from '@/components/reusables/controlled-select-field'
import { ControlledMultiSelectField } from '@/components/reusables/controlled-multiselect-field'
import { ControlledSlider } from '@/components/reusables/controlled-slider'
import { ControlledDualSlider } from '@/components/reusables/controlled-dual-slider'
import { ControlledDateRangePicker } from '@/components/reusables/controlled-date-range-picker'
import { ControlledRadioGroup } from '@/components/reusables/controlled-radio'
import { ControlledSwitch } from '@/components/reusables/controlled-switch'
import { ControlledCheckbox } from '@/components/reusables/controlled-checkbox'
import { ControlledFileUpload } from '@/components/reusables/controlled-fileupload'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import SecondaryHeader from '@/components/layouts/authenticated/secondary-header'
import ControlledTextEditor from '@/components/reusables/controlled-text-editor'

function InputFieldsPage() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema) as any,
    defaultValues: {
      budgetRange: [0, 1000],
    },
  })

  const onSubmit = (data: TFormSchema) => {
    console.log('Submitted Data', data)
    toast.info('form submitted')
  }

  return (
    <>
      <PrimaryHeader
        title="Controlled Form Fields"
        description="Integrated with react hook form, zod and Shadcn Components. Easy to use just define your schema, add in your form and no need to configure anything. Ready to send to server. "
      />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <SecondaryHeader title="1. Controlled Text Input Fields" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ControlledInputField
                  control={form.control}
                  name="name"
                  label="Your Name"
                  placeholder="John Doe"
                  required
                />
                <ControlledInputField
                  control={form.control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
                <ControlledInputField
                  control={form.control}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  required
                />
                <ControlledTextAreaField
                  control={form.control}
                  label="Description"
                  name="description"
                  placeholder="Enter Description"
                  rows={4}
                />
              </div>
            </div>
            <div className="space-y-4">
              <SecondaryHeader title="2. Controlled Date Picker" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ControlledDatePicker
                  control={form.control}
                  name="date"
                  label="Date"
                  placeholder="Select Date"
                  required
                />
                <ControlledDateRangePicker
                  control={form.control}
                  fromName="fromDate"
                  toName="toDate"
                  label="Date Range Picker"
                />
              </div>
            </div>
            <div className="space-y-4">
              <SecondaryHeader title="3. Controlled Server Autocomplete" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ServerAutocompleteInput
                  control={form.control}
                  name="customerName"
                  label="Server Autocomplete"
                  placeholder="Search customer..."
                  useQueryHook={useGetPaginatedInvoices}
                  displayField="customer"
                  secondaryField="description"
                  setKey="id"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <SecondaryHeader title="4. Controlled Select Fields" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ControlledSelectField
                  control={form.control}
                  label="Select Country"
                  name="country"
                  options={countries}
                  required
                  setKey="value"
                  showKey="label"
                />

                <ControlledSelectField
                  control={form.control}
                  label="Select With Icon"
                  name="section"
                  options={iconOptions}
                  required
                  setKey="value"
                  showKey="label"
                />
                <ControlledMultiSelectField
                  name="features"
                  label="Select Features"
                  control={form.control}
                  options={multiSelectOptions}
                  placeholder="Choose features"
                  required
                  setKey="value" // what is stored in the form value
                  showKey="label" // what is displayed
                />
              </div>
            </div>
            <div className="space-y-4">
              <SecondaryHeader title="5. Controlled Switch, Checkbox and Radio Group" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ControlledSwitch
                  control={form.control}
                  name="notifications"
                  label="Controlled Switch"
                />
                <ControlledCheckbox
                  control={form.control}
                  name="termsAccepted"
                  label="Controlled Check Box"
                />
                <ControlledRadioGroup
                  control={form.control}
                  name="plan"
                  label="Choose plan"
                  options={[
                    { label: 'Free', value: 'free' },
                    { label: 'Pro', value: 'pro' },
                    { label: 'Enterprise', value: 'enterprise' },
                  ]}
                />
              </div>
            </div>
            <div className="space-y-4">
              <SecondaryHeader title="6. Controlled File Upload" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ControlledFileUpload
                  control={form.control}
                  label="Single File Attachment"
                  name="attachment"
                  placeholder="Attachment"
                  className="col-span-2"
                  multiple={false}
                />
                <ControlledFileUpload
                  control={form.control}
                  label="Multiple File Attachment "
                  name="gallery"
                  placeholder="Gallery"
                  className="col-span-2"
                  multiple
                  maxFiles={4}
                  maxSize={4 * 1024 * 1024}
                />
              </div>
            </div>
            <div className="space-y-4">
              <SecondaryHeader title="7. Controlled File Upload" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ControlledSlider
                  control={form.control}
                  name="price"
                  label="Your Budget"
                  step={10}
                />
                <ControlledDualSlider
                  control={form.control}
                  name="budgetRange"
                  min={100}
                  max={1000}
                  label="Dual Slider Range"
                  step={10}
                />
              </div>
            </div>
            <div className="space-y-4">
              <SecondaryHeader title="8. Controlled Text Editor" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ControlledTextEditor
                  control={form.control}
                  label="Controlled Text Editor"
                  name="fullDescription"
                  className="col-span-2"
                />
              </div>
            </div>
            <Button type="submit" className="col-span-2">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default InputFieldsPage
