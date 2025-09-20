'use client';

import { generateMarketSegmentationAction } from '@/app/actions';
import { MarketSegmentationOutput } from '@/ai/schemas/market-segmentation-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import { ClipboardCopy, Loader, Sparkles } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MarketSegmentationDiagram } from './market-segmentation-diagram';

export function MarketSegmentGenerator() {
  const [result, setResult] = React.useState<MarketSegmentationOutput | null>(null);
  const [pending, setPending] = React.useState(false);
  const diagramRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      query: '',
    },
  });

  const onSubmit = async (data: { query: string }) => {
    setPending(true);
    setResult(null);
    try {
      const response = await generateMarketSegmentationAction({ marketTopic: data.query });
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!diagramRef.current) return;

    try {
      const canvas = await html2canvas(diagramRef.current, {
        backgroundColor: null, // Use transparent background
        logging: false,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          toast({
            title: 'Copied to clipboard!',
            description: 'The diagram has been copied as an image.',
          });
        }
      });
    } catch (error) {
      console.error('Failed to copy diagram to clipboard', error);
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Failed to copy diagram to clipboard.',
      });
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Market Segmentation Diagram Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Enter a market topic and let AI create a segmentation diagram for you.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-4"
          >
            <Input
              {...form.register('query')}
              placeholder="e.g., Automotive LiDAR Market"
              className="text-base"
              disabled={pending}
            />
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? (
                <Loader className="mr-2 animate-spin" />
              ) : (
                <Sparkles className="mr-2" />
              )}
              Generate
            </Button>
          </form>
        </CardContent>
      </Card>

      {pending && (
        <div className="flex justify-center items-center mt-12">
          <Loader className="size-10 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <div className="mt-12">
          <MarketSegmentationDiagram ref={diagramRef} data={result} />
          <div className="flex justify-center mt-6">
            <Button onClick={handleCopyToClipboard}>
              <ClipboardCopy className="mr-2" />
              Copy Diagram
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
