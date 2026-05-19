// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box, chakra } from '@chakra-ui/react';

interface AdBannerProps {
  format?: 'mobile' | 'responsive' | 'desktop';
  isLoading?: boolean;
}

const LOGO_URL = 'https://raw.githubusercontent.com/CypherTroopers/logo/main/CypherTrooper-logo-256-transparent.png';

const sizeByFormat = {
  mobile: { width: '160px', maxWidth: '100%' },
  responsive: { width: '220px', maxWidth: '100%' },
  desktop: { width: '256px', maxWidth: '100%' },
} as const;

const AdBanner = ({ format = 'responsive' }: AdBannerProps) => {
  const size = sizeByFormat[format];

  return (
    <Box display="flex" alignItems="center" justifyContent="center" { ...size }>
      <chakra.img
        src={ LOGO_URL }
        alt="CypherTroopers logo"
        width="100%"
        height="auto"
      />
    </Box>
  );
};

export default chakra(AdBanner);
