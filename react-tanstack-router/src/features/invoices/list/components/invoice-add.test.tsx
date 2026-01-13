import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import InvoiceAdd from './invoice-add'

vi.mock('../../shared/invoice-service', () => ({
  useCreateInvoice: () => ({
    isPending: false,
    mutate: vi.fn(),
  }),
}))
vi.mock('./invoice-form', () => ({
  InvoiceForm: () => <div data-testid="invoice-form" />,
}))

function RenderCounter({
  onRender,
  children,
}: {
  onRender: () => void
  children: React.ReactNode
}) {
  onRender()
  return <>{children}</>
}

describe('InvoiceAdd render count', () => {
  it('renders twice on initial mount in StrictMode', () => {
    const renderSpy = vi.fn()

    render(
      <React.StrictMode>
        <RenderCounter onRender={renderSpy}>
          <InvoiceAdd />
        </RenderCounter>
      </React.StrictMode>,
    )

    expect(renderSpy).toHaveBeenCalledTimes(2)
  })
})
