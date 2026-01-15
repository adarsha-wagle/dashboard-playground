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
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <Form {...form}>
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
          <ControlledDatePicker
            control={form.control}
            name="date"
            label="Date"
            placeholder="Select Date"
            required
          />
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
          <ControlledSelectField
            control={form.control}
            label="Select Country"
            name="country"
            options={countries}
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
          <ControlledSelectField
            control={form.control}
            label="Select With Icon"
            name="section"
            options={iconOptions}
            required
            setKey="value"
            showKey="label"
          />
          <ControlledTextAreaField
            control={form.control}
            label="Description"
            name="description"
            placeholder="Enter Description"
            rows={4}
            className="col-span-2"
          />
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
          <ControlledDateRangePicker
            control={form.control}
            fromName="fromDate"
            toName="toDate"
            label="Date Range Picker"
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
          <ControlledSwitch
            control={form.control}
            name="notifications"
            label="Enable notifications"
          />

          <ControlledCheckbox
            control={form.control}
            name="termsAccepted"
            label="Accept terms & conditions"
          />
          <ControlledFileUpload
            control={form.control}
            label="File"
            name="attachment"
            placeholder="Attachment"
          />
        </Form>
        <Button type="submit" className="col-span-2">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default InputFieldsPage
