'use server';
/**
 * @fileOverview A market segmentation diagram generator AI agent.
 *
 * - generateMarketSegmentation - A function that handles the market segmentation generation process.
 */

import {
  MarketSegmentationInput,
  MarketSegmentationInputSchema,
  MarketSegmentationOutput,
  MarketSegmentationOutputSchema,
} from '@/ai/schemas/market-segmentation-schema';
import { ai } from '@/ai/genkit';

export async function generateMarketSegmentation(
  input: MarketSegmentationInput
): Promise<MarketSegmentationOutput> {
  return generateMarketSegmentationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketSegmentationPrompt',
  input: { schema: MarketSegmentationInputSchema },
  output: { schema: MarketSegmentationOutputSchema },
  prompt: `You are an expert market research analyst. Your task is to generate a market segmentation for the given topic.

You should identify 4-6 key segmentation axes and for each axis, provide a list of mutually exclusive sub-segments.

Generate the segmentation for the following market: {{{marketTopic}}}`,
});

const generateMarketSegmentationFlow = ai.defineFlow(
  {
    name: 'generateMarketSegmentationFlow',
    inputSchema: MarketSegmentationInputSchema,
    outputSchema: MarketSegmentationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
