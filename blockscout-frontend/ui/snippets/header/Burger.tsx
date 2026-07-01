// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra, Text } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { Button } from 'toolkit/chakra/button';
import { DrawerBody, DrawerContent, DrawerRoot, DrawerTrigger } from 'toolkit/chakra/drawer';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
import IconSvg from 'ui/shared/IconSvg';
import NavigationMobile from 'ui/snippets/navigation/mobile/NavigationMobile';
import RollupStageBadge from 'ui/snippets/navigation/RollupStageBadge';
import TestnetBadge from 'ui/snippets/navigation/TestnetBadge';

interface Props {
  isMarketplaceAppPage?: boolean;
}

const Burger = ({ isMarketplaceAppPage }: Props) => {
  const { open, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <DrawerRoot
      open={ open }
      onOpenChange={ onOpenChange }
      placement="start"
      lazyMount={ false }
    >
      <DrawerTrigger>
        <Button
          type="button"
          onClick={ onOpen }
          variant="header"
          h="40px"
          w="88px"
          px={ 3 }
          columnGap={ 2 }
          flexShrink={ 0 }
          aria-label="Open menu"
        >
          <IconSvg
            name="burger"
            boxSize={ 5 }
            display="block"
            flexShrink={ 0 }
            color={{ _light: 'gray.600', _dark: 'white' }}
          />
          <span>Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent >
        <DrawerBody display="flex" flexDirection="column" overflowX="hidden" overflowY="auto">
          <TestnetBadge alignSelf="flex-start" mb={ 2 }/>
          <RollupStageBadge alignSelf="flex-start" mb={ 2 }/>
          <chakra.a
            href={ route({ pathname: '/' }) }
            aria-label="Go to top page"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            minH="44px"
            w="100%"
            px={ 3 }
            py={ 2 }
            mb={ 4 }
            borderWidth="1px"
            borderStyle="solid"
            borderColor={{ _light: 'blackAlpha.200', _dark: 'whiteAlpha.300' }}
            borderRadius="base"
            bgColor={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.100' }}
            color="text.primary"
            fontWeight={ 600 }
            onClick={ onClose }
            _hover={{
              bgColor: { _light: 'blackAlpha.100', _dark: 'whiteAlpha.200' },
              color: 'hover',
            }}
          >
            <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              { config.chain.name }
            </Text>
            <Text as="span" ml={ 3 } flexShrink={ 0 } fontSize="sm" color="inherit">
              Top
            </Text>
          </chakra.a>
          <NavigationMobile onNavLinkClick={ onClose } isMarketplaceAppPage={ isMarketplaceAppPage }/>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Burger;
