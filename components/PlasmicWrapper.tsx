import { PlasmicRootProvider } from '@plasmicapp/loader-nextjs';
import { useGlobalVariant } from '@/contexts/GlobalVariantContext';

type PlasmicWrapperProps = React.ComponentProps<typeof PlasmicRootProvider>;

export function PlasmicWrapper(props: PlasmicWrapperProps) {
    const { children, ...rest } = props;
    const { isDarkMode } = useGlobalVariant();

    return (
      <PlasmicRootProvider {...rest} globalVariants={[{ name: 'Theme', value: isDarkMode ? 'dark' : 'light' }]}>
        {children}
      </PlasmicRootProvider>
    );
  }