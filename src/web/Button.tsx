import * as React from 'react'

import { ButtonProps, MaterialIconProps } from '.'

const MaterialSharpIcon = ({ kind, icon }: MaterialIconProps) => {
  return (
    <span className={'material-icons-sharp'}>
      {kind.includes('danger') ? 'delete' : icon}
    </span>
  )
}

const Button = <T extends React.ElementType = 'button'>({
  as,
  className,
  children = 'Button',
  disabled,
  kind = 'primary',
  icon,
  iconOnly,
  iconPosition,
  size = 'default',
  prefix = 'bx',
  ...other
}: ButtonProps<T>): JSX.Element => {
  const renderTopOrLeftIcon = () => {
    if (iconPosition === 'top') {
      switch (kind) {
        case 'primary':
        case 'tertiary':
          if (size === 'default')
            return <MaterialSharpIcon kind={kind} icon={icon} />
          break
        default:
          return null
      }
    }
    if (iconPosition === 'left') {
      return <MaterialSharpIcon kind={kind} icon={icon} />
    }
    return null
  }

  const renderRightIcon = () => {
    if (iconPosition === 'right') {
      if (!kind.includes('danger'))
        return <MaterialSharpIcon kind={kind} icon={icon} />
    }
    return null
  }

  const buttonClasses = `${prefix}--btn${
    kind ? ' ' + prefix + '--btn--' + kind : ''
  }${size !== 'default' ? ' ' + prefix + '--btn-' + size : ''}${
    disabled ? ' ' + prefix + '--btn-disabled' : ''
  }${
    iconPosition &&
    !iconOnly &&
    (renderTopOrLeftIcon() !== null || renderRightIcon() !== null)
      ? ' msk-button-icon-' + iconPosition
      : ''
  }${
    iconOnly && (renderTopOrLeftIcon() !== null || renderRightIcon() !== null)
      ? ' ' + prefix + '--btn-icon-only'
      : ''
  }${className ? className : ''}`

  // For rendering other HTML elements besides button
  if (as !== undefined) {
    return React.createElement(
      as,
      {
        disabled: disabled,
        className: buttonClasses,
        ...other,
      },
      renderTopOrLeftIcon(),
      !iconOnly && children,
      renderRightIcon()
    )
  }

  // Default rendering of a button element
  return React.createElement(
    'button',
    {
      as: as,
      disabled: disabled,
      className: buttonClasses,
      ...other,
    },
    renderTopOrLeftIcon(),
    !iconOnly && children,
    renderRightIcon()
  )
}

export default Button
