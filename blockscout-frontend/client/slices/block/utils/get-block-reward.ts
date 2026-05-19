// SPDX-License-Identifier: LicenseRef-Blockscout

import BigNumber from 'bignumber.js';

import type { Block } from 'client/slices/block/types/api';

export default function getBlockReward(block: Block) {
  const txFees = BigNumber(block.transaction_fees || 0);
  const burntFees = BigNumber(block.burnt_fees || 0);
  const primaryReward = block.rewards?.find(({ type }) =>
    type === 'Miner Reward' ||
    type === 'Validator Reward' ||
    type === 'Key Block Reward' ||
    type === 'Tx Block Reward',
  )?.reward;

  const fallbackReward = block.rewards
    ?.map(({ reward }) => BigNumber(reward))
    .reduce((acc, value) => acc.plus(value), BigNumber(0));

  const totalReward = BigNumber(primaryReward || fallbackReward || 0);
  const staticReward = totalReward.minus(txFees).plus(burntFees);

  return {
    totalReward,
    staticReward,
    txFees,
    burntFees,
  };
}
