export const required = (Rule: any) => Rule.required().error('This field is required')

export const requiredNumber = (Rule: any) => Rule.required().min(0).error('This field is required and must be a positive number')

export const requiredUrl = (Rule: any) => Rule.required().uri({
  scheme: ['http', 'https']
}).error('Please enter a valid URL') 