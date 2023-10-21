interface FeatureFlags {
  isEnabled: boolean
}

export const withToggle = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & FeatureFlags) => {
    if (!props.isEnabled) {
      return null
    }
    return <Component {...(props as P)} />
  }
}
