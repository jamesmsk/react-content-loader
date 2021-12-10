import Button from './Button'

export type ButtonKinds =
  | 'primary'
  | 'ghost'
  | 'tertiary'
  | 'danger'
  | 'danger--ghost'
  | 'danger--tertiary'

export type ButtonSizes = 'default' | 'field' | 'sm'

export type IconPositions = 'top' | 'left' | 'right'

export type ButtonProps<T extends React.ElementType> = {
  as?: T
  prefix?: string
  kind?: ButtonKinds
  children?: React.ReactNode
  className?: string | undefined
  disabled?: boolean
  icon?: string | boolean
  iconOnly?: boolean
  iconPosition?: IconPositions | undefined
  size?: ButtonSizes
} & React.ComponentPropsWithoutRef<T>

export interface MaterialIconProps {
  kind: ButtonKinds
  icon?: string | boolean
}

export default Button
