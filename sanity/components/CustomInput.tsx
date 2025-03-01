import { StringInputProps } from 'sanity'

export function CustomInput(props: StringInputProps) {
  return (
    <div>
      <input
        type="text"
        value={props.value}
        onChange={event => props.onChange(event.target.value)}
      />
    </div>
  )
} 