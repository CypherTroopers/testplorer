// SPDX-License-Identifier: LicenseRef-Blockscout

import { Flex, Box, VStack, chakra, Text } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import useIsAuth from 'client/features/account/hooks/useIsAuth';

import * as cookies from 'client/shared/storage/cookies';

import config from 'configs/app';
import { useAppContext } from 'lib/contexts/app';
import useNavItems, { isGroupItem } from 'lib/hooks/useNavItems';
import IconSvg from 'ui/shared/IconSvg';
import NetworkIcon from 'ui/snippets/networkLogo/NetworkIcon';
import NetworkLogo from 'ui/snippets/networkLogo/NetworkLogo';

import NavigationPromoBanner from '../promoBanner/NavigationPromoBanner';
import RollupStageBadge from '../RollupStageBadge';
import TestnetBadge from '../TestnetBadge';
import NavLink from './NavLink';
import NavLinkGroup from './NavLinkGroup';

const NavigationDesktop = () => {
  const appProps = useAppContext();
  const cookiesString = appProps.cookies;

  const isNavBarCollapsedCookie = cookies.get(cookies.NAMES.NAV_BAR_COLLAPSED, cookiesString);
  let isNavBarCollapsed;
  if (isNavBarCollapsedCookie === 'true') {
    isNavBarCollapsed = true;
  }
  if (isNavBarCollapsedCookie === 'false') {
    isNavBarCollapsed = false;
  }

  const { mainNavItems, accountNavItems } = useNavItems();

  const isAuth = useIsAuth();

  const [ isCollapsed, setCollapsedState ] = React.useState<boolean | undefined>(isNavBarCollapsed);

  const handleTogglerClick = React.useCallback(() => {
    setCollapsedState((flag) => !flag);
    cookies.set(cookies.NAMES.NAV_BAR_COLLAPSED, isCollapsed ? 'false' : 'true');
  }, [ isCollapsed ]);

  const handleContainerClick = React.useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleTogglerClick();
    }
  }, [ handleTogglerClick ]);

  const isExpanded = isCollapsed === false;

  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      className="group"
      position="relative"
      flexDirection="column"
      alignItems="stretch"
      borderRight="1px solid"
      borderColor="border.divider"
      px={{ lg: isExpanded ? 6 : 4, xl: isCollapsed ? 4 : 6 }}
      pt={ 12 }
      pb={ 6 }
      width={{ lg: isExpanded ? '229px' : '92px', xl: isCollapsed ? '92px' : '229px' }}
      onClick={ handleContainerClick }
      transitionProperty="width, padding"
      transitionDuration="normal"
      transitionTimingFunction="ease"
    >
      <TestnetBadge position="absolute" pl={ 3 } w="49px" top="34px"/>
      <RollupStageBadge position="absolute" ml={{ lg: isExpanded ? 3 : '10px', xl: isCollapsed ? '10px' : 3 }} top="34px"/>
      <Box
        as="header"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        w="100%"
        pl={{ lg: isExpanded ? 3 : '15px', xl: isCollapsed ? '15px' : 3 }}
        pr={{ lg: isExpanded ? 0 : '15px', xl: isCollapsed ? '15px' : 0 }}
        h={ 10 }
        transitionProperty="padding"
        transitionDuration="normal"
        transitionTimingFunction="ease"
      >
        <Box display={{ base: 'none', lg: isCollapsed === false ? 'block' : 'none', xl: isCollapsed ? 'none' : 'block' }}>
          <NetworkLogo/>
        </Box>
        <Box display={{ base: 'none', lg: isCollapsed === false ? 'none' : 'block', xl: isCollapsed ? 'block' : 'none' }}>
          <NetworkIcon/>
        </Box>
      </Box>
      <chakra.a
        href={ route({ pathname: '/' }) }
        aria-label="Go to top page"
        display="flex"
        alignItems="center"
        justifyContent={{ lg: isExpanded ? 'space-between' : 'center', xl: isCollapsed ? 'center' : 'space-between' }}
        minH="44px"
        w={{ lg: isExpanded ? '100%' : '60px', xl: isCollapsed ? '60px' : '100%' }}
        mt={ 3 }
        px={{ lg: isExpanded ? 3 : 0, xl: isCollapsed ? 0 : 3 }}
        borderWidth="2px"
        borderStyle="solid"
        borderColor="button.header.border"
        borderRadius="base"
        bgColor="button.header.bg"
        color="text.primary"
        fontWeight={ 600 }
        transitionProperty="width, padding, background-color, border-color, color"
        transitionDuration="normal"
        transitionTimingFunction="ease"
        _hover={{
          bgColor: 'button.header.bg.hover',
          borderColor: 'hover',
          color: 'hover',
          textDecoration: 'none',
        }}
      >
        <Text
          display={{ base: 'none', lg: isExpanded ? 'block' : 'none', xl: isCollapsed ? 'none' : 'block' }}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          { config.chain.name }
        </Text>
        <Text as="span" flexShrink={ 0 } fontSize="sm" color="inherit">
          Top
        </Text>
      </chakra.a>
      <Box as="nav" mt={ 3 } w="100%">
        <VStack as="ul" gap="1" alignItems="flex-start">
          { mainNavItems.map((item) => {
            if (isGroupItem(item)) {
              return <NavLinkGroup key={ item.text } item={ item } isCollapsed={ isCollapsed }/>;
            } else {
              return <NavLink key={ item.text } item={ item } isCollapsed={ isCollapsed }/>;
            }
          }) }
        </VStack>
      </Box>
      { isAuth && (
        <Box as="nav" borderTopWidth="1px" borderColor="border.divider" w="100%" mt={ 3 } pt={ 3 }>
          <VStack as="ul" gap="1" alignItems="flex-start">
            { accountNavItems.map((item) => <NavLink key={ item.text } item={ item } isCollapsed={ isCollapsed }/>) }
          </VStack>
        </Box>
      ) }
      <NavigationPromoBanner isCollapsed={ isCollapsed }/>
      <IconSvg
        name="arrows/east-mini"
        width={ 8 }
        height={ 8 }
        _hover={{ color: 'hover' }}
        borderRadius="base"
        bgColor="button.header.bg"
        color="text.primary"
        borderWidth="2px"
        borderColor="button.header.border"
        transform={{ lg: isExpanded ? 'rotate(0)' : 'rotate(180deg)', xl: isCollapsed ? 'rotate(180deg)' : 'rotate(0)' }}
        transformOrigin="center"
        position="absolute"
        top="106px"
        left={{ lg: isExpanded ? '212px' : '76px', xl: isCollapsed ? '76px' : '212px' }}
        cursor="pointer"
        onClick={ handleTogglerClick }
        aria-label="Expand/Collapse menu"
        display="block"
        zIndex={ 1 }
        boxShadow="sm"
        transitionProperty="transform, left, background-color, border-color, color"
        transitionDuration="normal"
        transitionTimingFunction="ease"
      />
    </Flex>
  );
};

export default NavigationDesktop;
