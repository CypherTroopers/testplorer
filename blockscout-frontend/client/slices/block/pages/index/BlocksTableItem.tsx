// SPDX-License-Identifier: LicenseRef-Blockscout

import { Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { Block } from 'client/slices/block/types/api';
import type { ClusterChainConfig } from 'types/multichain';

import { route } from 'nextjs-routes';

import AddressEntity from 'client/slices/address/components/entity/AddressEntity';
import BlockPendingUpdateHint from 'client/slices/block/components/BlockPendingUpdateHint';
import BlockEntity from 'client/slices/block/components/entity/BlockEntity';
import GasUsed from 'client/slices/gas/components/GasUsed';

import config from 'configs/app';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { TableCell, TableRow } from 'toolkit/chakra/table';
import { Tooltip } from 'toolkit/chakra/tooltip';
import ChainIcon from 'ui/shared/externalChains/ChainIcon';
import IconSvg from 'ui/shared/IconSvg';
import TimeWithTooltip from 'ui/shared/time/TimeWithTooltip';

interface Props {
  data: Block;
  isLoading?: boolean;
  animation?: string;
  enableTimeIncrement?: boolean;
  chainData?: ClusterChainConfig;
}

const BlocksTableItem = ({ data, isLoading, enableTimeIncrement, animation, chainData }: Props) => {
  return (
    <TableRow animation={ animation }>
      { chainData && (
        <TableCell>
          <ChainIcon data={ chainData } isLoading={ isLoading }/>
        </TableCell>
      ) }
      <TableCell >
        <Flex columnGap={ 2 } alignItems="center" mb={ 2 }>
          { data.celo?.l1_era_finalized_epoch_number && (
            <Tooltip content={ `Finalized epoch #${ data.celo.l1_era_finalized_epoch_number }` }>
              <IconSvg name="checkered_flag" boxSize={ 5 } p="1px" isLoading={ isLoading } flexShrink={ 0 }/>
            </Tooltip>
          ) }
          { data.is_pending_update && <BlockPendingUpdateHint/> }
          <Tooltip disabled={ data.type !== 'reorg' } content="Chain reorganizations">
            <span>
              <BlockEntity
                isLoading={ isLoading }
                number={ data.height }
                hash={ data.type !== 'block' ? data.hash : undefined }
                noIcon
                fontWeight={ 600 }
              />
            </span>
          </Tooltip>
        </Flex>
        <TimeWithTooltip
          timestamp={ data.timestamp }
          enableIncrement={ enableTimeIncrement }
          isLoading={ isLoading }
          color="text.secondary"
          fontWeight={ 400 }
          display="inline-block"
        />
      </TableCell>
      <TableCell >
        <Skeleton loading={ isLoading } display="inline-block">
          { data.size?.toLocaleString() || 'N/A' }
        </Skeleton>
      </TableCell>
      { !config.UI.views.block.hiddenFields?.miner && (
        <TableCell >
          <AddressEntity
            address={ data.miner }
            isLoading={ isLoading }
            truncation="constant"
          />
        </TableCell>
      ) }
      <TableCell isNumeric >
        { data.transactions_count > 0 ? (
          <Skeleton loading={ isLoading } display="inline-block">
            <Link href={ route({
              pathname: '/block/[height_or_hash]',
              query: { height_or_hash: String(data.height), tab: 'txs' },
            }) }>
              { data.transactions_count }
            </Link>
          </Skeleton>
        ) : data.transactions_count }
      </TableCell>
      <TableCell >
        <Skeleton loading={ isLoading } display="inline-block">{ BigNumber(data.gas_used || 0).toFormat() }</Skeleton>
        <Flex mt={ 2 }>
          <GasUsed
            gasUsed={ data.gas_used || undefined }
            gasLimit={ data.gas_limit }
            isLoading={ isLoading }
            gasTarget={ data.gas_target_percentage || undefined }
          />
        </Flex>
      </TableCell>

    </TableRow>
  );
};

export default React.memo(BlocksTableItem);
