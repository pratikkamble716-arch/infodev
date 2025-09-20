'use client';

import { MarketSegmentationOutput } from '@/ai/schemas/market-segmentation-schema';
import React from 'react';

const segmentColors = [
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
];

export const MarketSegmentationDiagram = React.forwardRef<
  HTMLDivElement,
  { data: MarketSegmentationOutput }
>(({ data }, ref) => {
  const centralTopic = (
    <div className="bg-gray-800 text-white rounded-lg w-48 h-48 flex items-center justify-center text-center p-4 shadow-lg z-10">
      <h2 className="font-bold text-xl">{data.market}</h2>
    </div>
  );

  const leftSegments = data.segments.filter((_, index) => index % 2 === 0);
  const rightSegments = data.segments.filter((_, index) => index % 2 !== 0);

  const renderSegmentGroup = (
    segments: MarketSegmentationOutput['segments'],
    isLeft: boolean
  ) => {
    return (
      <div
        className={`absolute flex flex-col justify-center gap-12 h-full ${
          isLeft ? 'right-[calc(50%+150px)]' : 'left-[calc(50%+150px)]'
        }`}
      >
        {segments.map((segment) => {
          const segmentIndex = data.segments.findIndex(
            (s) => s.name === segment.name
          );

          return (
            <div
              key={segment.name}
              className={`flex flex-col gap-3 ${
                isLeft ? 'items-end' : 'items-start'
              }`}
            >
              {/* Segment Header */}
              <div
                className={`flex items-center gap-2 rounded-lg py-2 px-4 text-white font-bold shadow-md ${
                  segmentColors[segmentIndex % segmentColors.length]
                } ${isLeft ? 'flex-row-reverse' : ''}`}
              >
                <span>{segment.name}</span>
              </div>

              {/* Sub-segments List */}
              <ul
                className={`flex flex-col gap-2 ${
                  isLeft ? 'items-end' : 'items-start'
                }`}
              >
                {segment.subSegments.map((sub) => (
                  <li
                    key={sub}
                    className={`flex items-center gap-2 text-muted-foreground text-sm ${
                      isLeft ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <span
                      className="border-t-2 border-b-2 border-dotted border-gray-400"
                      style={{ height: 0, width: '12px' }}
                    ></span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={ref} className="relative w-full min-h-[600px] flex items-center justify-center py-10 bg-white">
       <h2 className="absolute top-4 text-2xl font-bold text-center text-black">
        {data.market}
      </h2>
      {centralTopic}
      {/* Left side dashed line */}
      <div className="absolute top-1/4 bottom-1/4 left-[calc(50%-450px)] border-l-2 border-dotted border-gray-400"></div>

      {renderSegmentGroup(leftSegments, true)}
      {renderSegmentGroup(rightSegments, false)}

      {/* Right side dashed line */}
      <div className="absolute top-1/4 bottom-1/4 right-[calc(50%-450px)] border-l-2 border-dotted border-gray-400"></div>
    </div>
  );
});

MarketSegmentationDiagram.displayName = 'MarketSegmentationDiagram';
