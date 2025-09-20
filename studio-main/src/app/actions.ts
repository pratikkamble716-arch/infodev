'use server';

import {
  generateMarketSegmentation,
} from '@/ai/flows/market-segmentation-flow';
import type { MarketSegmentationInput, MarketSegmentationOutput } from '@/ai/schemas/market-segmentation-schema';


export async function generateMarketSegmentationAction(
  input: MarketSegmentationInput
): Promise<MarketSegmentationOutput> {
  return await generateMarketSegmentation(input);
}
