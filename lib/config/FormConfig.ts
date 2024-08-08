export interface FormFieldConfig {
  id: string
  label: string
  type:
    | 'text'
    | 'number'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'textarea'
    | 'switch'
  options?: string[] // For 'select', 'radio'
  placeholder?: string
  isRequired?: boolean
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }
}

export interface FormConfig {
  fields: FormFieldConfig[]
}
