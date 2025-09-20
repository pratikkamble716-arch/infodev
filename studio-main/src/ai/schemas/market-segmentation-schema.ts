import { z } from 'genkit';

export const MarketSegmentationInputSchema = z.object({
  marketTopic: z.string().describe('The market topic to generate a segmentation diagram for.'),
});
export type MarketSegmentationInput = z.infer<typeof MarketSegmentationInputSchema>;

export const MarketSegmentationOutputSchema = z.object({
  market: z.string().describe('The core market topic.'),
  segments: z.array(
    z.object({
      name: z.string().describe('The name of the market segment.'),
      subSegments: z.array(z.string()).describe('A list of sub-segments.'),
    })
  ).describe('A list of market segments.'),
});
export type MarketSegmentationOutput = z.infer<typeof MarketSegmentationOutputSchema>;
