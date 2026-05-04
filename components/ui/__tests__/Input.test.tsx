/**
 * Unit tests for Input component
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'

describe('Input', () => {
  it('should render input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render with label', () => {
    render(<Input label="Name" />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('should show required asterisk when required', () => {
    render(<Input label="Email" required />)
    const label = screen.getByText('Email')
    expect(label.parentElement).toHaveTextContent('*')
  })

  it('should generate id from label', () => {
    render(<Input label="Email Address" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'email-address')
  })

  it('should use custom id when provided', () => {
    render(<Input label="Name" id="custom-id" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'custom-id')
  })

  it('should display error message', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByText('This field is required')).toHaveClass('text-sunset-coral')
  })

  it('should apply error styles to input when error exists', () => {
    render(<Input error="Error" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('border-sunset-coral', 'focus:ring-sunset-coral')
  })

  it('should display helper text', () => {
    render(<Input helperText="Enter your name" />)
    expect(screen.getByText('Enter your name')).toBeInTheDocument()
  })

  it('should hide helper text when error is present', () => {
    render(<Input helperText="Helper text" error="Error message" />)
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('should handle text input', async () => {
    const user = userEvent.setup()
    render(<Input />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })

  it('should handle change events', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Input onChange={handleChange} />)

    await user.type(screen.getByRole('textbox'), 'test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
  })

  it('should accept placeholder', () => {
    render(<Input placeholder="Enter your name" />)
    const input = screen.getByPlaceholderText('Enter your name')
    expect(input).toBeInTheDocument()
  })

  it('should support different input types', () => {
    render(<Input type="email" data-testid="email-input" />)
    const input = screen.getByTestId('email-input')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('should accept custom className', () => {
    render(<Input className="custom-class" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('custom-class')
  })

  it('should forward ref', () => {
    const ref = jest.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('should have focus ring for accessibility', () => {
    render(<Input data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('focus:ring-2', 'focus:ring-ocean-blue')
  })

  it('should render complete input with all features', () => {
    render(
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        helperText="We'll never share your email"
        required
      />
    )

    // Use placeholder text since getByLabelText doesn't handle the asterisk well
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })
})
