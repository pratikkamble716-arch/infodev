import { MarketSegmentGenerator } from '@/components/market-segment/market-segment-generator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <MarketSegmentGenerator />
    </main>
  );
}
